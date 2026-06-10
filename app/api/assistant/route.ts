import OpenAI from "openai";
import {
  STR,
  STATS,
  INSTITUTIONS,
  PORTFOLIO,
  SECTOR_LABELS,
  PRODUCT_LINES,
  APPROACH,
  TECHNOLOGIES,
  SECTORS,
  type Sector,
} from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lang = "en" | "me";
type Msg = { role: "user" | "assistant"; content: string };

/* The assistant is grounded in the SAME content the website renders
   (lib/content.ts). Building the context from those exports means the AI and
   the site can never drift apart — update the content, and both update. */
function buildSiteContext(): string {
  const products = PRODUCT_LINES.map((p) => `- ${p.name}: ${p.tagline.en}`).join("\n");
  const tech = TECHNOLOGIES.layers.map((l) => `- ${l.name.en} (${l.role.en}): ${l.items.join(", ")}`).join("\n");
  const sectors = SECTORS.items.map((s) => s.name.en).join(", ");
  const institutions = INSTITUTIONS.map((i) => i.name.en).join(", ");
  const stats = STATS.map((s) => `- ${s.v} — ${s.l.en}`).join("\n");
  const sectorOrder: Sector[] = ["gov", "finance", "funds", "defense", "enterprise"];
  const portfolio = sectorOrder
    .map((sec) => {
      const items = PORTFOLIO.filter((p) => p.sector === sec)
        .map(
          (p) =>
            `  • ${p.name.en} — ${p.client.en} [${p.tags.join(", ")}]${
              p.product ? ` (product: ${p.product})` : ""
            }${p.featured ? " (flagship)" : ""}: ${p.blurb.en}`
        )
        .join("\n");
      return `${SECTOR_LABELS[sec].en}:\n${items}`;
    })
    .join("\n");
  const approach = APPROACH.steps.map((s) => `${s.k}. ${s.h.en}: ${s.p.en}`).join("\n");

  return [
    `Overview: ${STR.hero.lead.en}`,
    `\nProducts (the platforms Infostream builds):\n${products}`,
    `\nTechnology stack (the tools Infostream builds on):\n${tech}`,
    `\nSectors served: ${sectors}.`,
    `\nCurrently in production for: ${institutions}.`,
    `\nOperating metrics shown on the site:\n${stats}`,
    `\nDelivered & operated portfolio (the systems we build and run, grouped by sector):\n${portfolio}`,
    `\nHow we work (a four-stage method):\n${approach}`,
  ].join("\n");
}

const SYSTEM = `You are the assistant on the website of INFOSTREAM (Infostream d.o.o., Podgorica, Montenegro) — a software company that has built and operated the digital infrastructure of Montenegro's government and institutions since 2004. Mission-critical, audit-grade, bilingual (Montenegrin/English).

Everything in the section below is the SAME information presented on the infostream.me website. Treat it as your source of truth.

=== INFOSTREAM — SITE CONTENT ===
${buildSiteContext()}

Certifications: ISO 27001 (information security) & ISO 9001 (quality). Security partner: Bitdefender Enterprise.
Contact: ${STR.cta.email} · ${STR.cta.phone} · Podgorica, Montenegro. Enquiries are answered within one business day.

How to answer:
- Be concise, factual and helpful — 2-4 short sentences, or a tight list.
- Answer in the language the user writes in (English or Montenegrin).
- Ground every answer in the site content above. If something genuinely isn't covered there, say so briefly and point them to ${STR.cta.email} — do NOT invent clients, figures, dates or guarantees beyond what is listed.
- You are a knowledgeable guide to the company, not a hard-sell sales bot.`;

// Google Gemini, free tier, via its OpenAI-compatible endpoint.
// Get a free key at https://aistudio.google.com/apikey and set GOOGLE_API_KEY.
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/";
// gemini-2.5-flash is on the free tier (the 2.0-flash models report free-tier "limit: 0").
// Lighter/faster free alternatives: "gemini-2.5-flash-lite" or "gemini-flash-lite-latest".
const MODEL = "gemini-2.5-flash";

const MSG = {
  badRequest: {
    en: "Sorry — I couldn't read that request.",
    me: "Izvinite — nijesam mogao da pročitam zahtjev.",
  },
  noKey: {
    en: "The live AI assistant isn't connected yet (set GOOGLE_API_KEY to enable it). In the meantime: Infostream builds and operates Montenegro's national software infrastructure — tax, finance, registries, defense and document systems — since 2004. Reach the team at contact@infostream.me.",
    me: "AI asistent još nije povezan (postavite GOOGLE_API_KEY da ga uključite). U međuvremenu: Infostream gradi i održava nacionalnu softversku infrastrukturu Crne Gore — poreske, finansijske, registarske, odbrambene i dokument-sisteme — od 2004. Pišite nam na contact@infostream.me.",
  },
  rateLimited: {
    en: "You're sending messages a bit fast — please wait a few seconds and try again.",
    me: "Šaljete poruke malo prebrzo — sačekajte nekoliko sekundi i pokušajte ponovo.",
  },
  busy: {
    en: "The assistant is busy right now — please try again in a moment.",
    me: "Asistent je trenutno zauzet — pokušajte ponovo za trenutak.",
  },
  unavailable: {
    en: "The assistant is temporarily unavailable. Please email contact@infostream.me.",
    me: "Asistent trenutno nije dostupan. Pišite na contact@infostream.me.",
  },
  forbidden: { en: "Forbidden.", me: "Zabranjeno." },
  interrupted: {
    en: "\n\n(Connection interrupted. Please email contact@infostream.me.)",
    me: "\n\n(Veza je prekinuta. Pišite na contact@infostream.me.)",
  },
} as const;

function send(text: string, status = 200): Response {
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      start(c) {
        c.enqueue(encoder.encode(text));
        c.close();
      },
    }),
    { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } }
  );
}

// Only allow calls from our own site — blocks other sites' frontends from
// stealing your Gemini quota. Non-browser clients (no Origin) fall through to
// the per-IP rate limiter below.
function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    if (host === req.headers.get("host")) return true;
    if (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return true;
    const allow = process.env.ALLOWED_ORIGIN;
    if (allow && allow.split(",").map((s) => s.trim()).includes(origin)) return true;
    return false;
  } catch {
    return false;
  }
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Simple in-memory per-IP sliding window. Good enough for a single instance;
// for multi-instance / serverless scale, back this with a shared store
// (e.g. Upstash Redis) instead.
const RL_WINDOW_MS = 60_000;
const RL_MAX = 15;
const rlHits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (rlHits.get(ip) ?? []).filter((t) => now - t < RL_WINDOW_MS);
  arr.push(now);
  rlHits.set(ip, arr);
  if (rlHits.size > 5000) {
    for (const [k, v] of rlHits) if (v.every((t) => now - t >= RL_WINDOW_MS)) rlHits.delete(k);
  }
  return arr.length > RL_MAX;
}

export async function POST(req: Request) {
  let messages: Msg[] = [];
  let lang: Lang = "en";
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
    if (body?.lang === "me") lang = "me";
  } catch {
    return send(MSG.badRequest.en, 400);
  }

  if (!originAllowed(req)) return send(MSG.forbidden[lang], 403);
  if (rateLimited(clientIp(req))) return send(MSG.rateLimited[lang], 429);

  const clean = messages
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return send(MSG.noKey[lang]);

  try {
    const client = new OpenAI({ apiKey, baseURL: GEMINI_BASE_URL });
    const completion = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 700,
      // gemini-2.5-flash is a "thinking" model: by default it spends most of the
      // max_tokens budget on hidden reasoning, then truncates the visible reply
      // mid-sentence (finish_reason "length"). "none" turns thinking off so the
      // whole budget goes to the answer. It's Gemini's value, not in OpenAI's
      // type union, so it's cast through. (Flash supports a zero thinking budget.)
      reasoning_effort: "none" as never,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM },
        ...(clean.length ? clean : [{ role: "user" as const, content: "Hello" }]),
      ],
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const t = chunk.choices?.[0]?.delta?.content;
            if (t) controller.enqueue(encoder.encode(t));
          }
        } catch {
          try {
            controller.enqueue(encoder.encode(MSG.interrupted[lang]));
          } catch {}
        }
        controller.close();
      },
    });
    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (err) {
    const status = (err as { status?: number })?.status;
    if (status === 429) return send(MSG.busy[lang], 429);
    return send(MSG.unavailable[lang], 503);
  }
}
