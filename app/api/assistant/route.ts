import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Grounding context for the on-site assistant. Kept in one cacheable block. */
const SYSTEM = `You are the assistant on the website of INFOSTREAM (Infostream d.o.o., Podgorica, Montenegro).

About Infostream: a software company that has built and operated the digital infrastructure of Montenegro's government and institutions since 2004. Deadly-serious, mission-critical, audit-grade, bilingual (Montenegrin/English).

Product lines: SPRINTgov (government ERP), ERPStream (enterprise ERP), FINStream (finance & accounting), KLEFIS, INFODMS (document management).

Representative work: Legal Information System / Official Gazette (register of regulations), Central Register of Business Entities (CRPS) & eFirma for the Tax Administration, the Address Register of Montenegro, the Pension & Disability Insurance Fund IS, financial & document systems for the Ministries of Defense, Interior, Finance and the Intelligence Agency, the NGO & Political-Party Registry (ngo.gov.me), Innovation Fund / Eco Fund / einovacije.gov.me, eCES for EU assistance funds, the COVID-19 subsidy application, plus ERP for Parliament, banks (ERSTE, Opportunity Bank), insurers (Grawe), media (RTCG, Vijesti) and UNIDO (UN) portals.

Certifications: ISO 27001 & ISO 9001. Security partner: Bitdefender. Contact: contact@infostream.me · +382 20 000 000 · Podgorica, Montenegro.

How to answer:
- Be concise, factual and helpful. 2-4 short sentences or a tight list.
- Answer in the language the user writes in (English or Montenegrin).
- Only claim what is supported above; if unsure, say so and point them to contact@infostream.me.
- Never invent figures, clients or guarantees. You are a guide to the company, not a sales bot.`;

type Msg = { role: "user" | "assistant"; content: string };

function stream(text: string): Response {
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      start(c) {
        c.enqueue(encoder.encode(text));
        c.close();
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } }
  );
}

export async function POST(req: Request) {
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return stream("Sorry — I couldn't read that request.");
  }

  const clean = messages
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return stream(
      "The live AI assistant isn't connected yet (set ANTHROPIC_API_KEY to enable it). " +
        "In the meantime: Infostream builds and operates Montenegro's national software infrastructure — " +
        "tax, finance, registries, defense and document systems — since 2004. Reach the team at contact@infostream.me."
    );
  }

  try {
    const client = new Anthropic({ apiKey });
    const anthropicStream = client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 700,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: clean.length ? clean : [{ role: "user", content: "Hello" }],
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream({
      start(controller) {
        anthropicStream.on("text", (t) => controller.enqueue(encoder.encode(t)));
        anthropicStream.on("end", () => controller.close());
        anthropicStream.on("error", (err) => {
          try {
            controller.enqueue(encoder.encode("\n\n(Connection interrupted. Please email contact@infostream.me.)"));
          } catch {}
          controller.close();
          void err;
        });
      },
    });
    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch {
    return stream("The assistant is temporarily unavailable. Please email contact@infostream.me.");
  }
}
