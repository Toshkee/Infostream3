"use client";

import { useEffect, useRef, useState } from "react";
import { useUI } from "@/app/providers";
import { ASSISTANT } from "@/lib/content";

type Msg = { role: "user" | "assistant"; content: string };

function Waveform({ n = 3 }: { n?: number }) {
  return (
    <span className="wf" aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

export function Assistant() {
  const { lang } = useUI();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-assistant", handler);
    return () => window.removeEventListener("open-assistant", handler);
  }, []);

  useEffect(() => {
    if (open) bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, busy]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.body) {
        const txt = await res.text();
        setMessages((m) => updateLast(m, txt));
      } else {
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += dec.decode(value, { stream: true });
          setMessages((m) => updateLast(m, acc));
        }
      }
    } catch {
      setMessages((m) => updateLast(m, "Sorry — something went wrong. Please email contact@infostream.me."));
    } finally {
      setBusy(false);
    }
  }

  function updateLast(m: Msg[], content: string): Msg[] {
    const copy = m.slice();
    for (let i = copy.length - 1; i >= 0; i--) {
      if (copy[i].role === "assistant") {
        copy[i] = { role: "assistant", content };
        break;
      }
    }
    return copy;
  }

  const lastAi = messages.length && messages[messages.length - 1].role === "assistant";
  const streaming = busy && lastAi && !messages[messages.length - 1].content;

  return (
    <>
      <button className="fab" onClick={() => setOpen(true)} aria-label={ASSISTANT.open[lang]}>
        <Waveform />
        {ASSISTANT.open[lang]}
      </button>

      <div className={`asst-overlay${open ? " open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`asst${open ? " open" : ""}`} role="dialog" aria-label={ASSISTANT.title[lang]} aria-hidden={!open}>
        <div className="asst-head">
          <span className="asst-badge">
            <Waveform />
          </span>
          <div>
            <div className="ht">{ASSISTANT.title[lang]}</div>
            <div className="hs">{lang === "en" ? "Product guide" : "Vodič kroz proizvode"}</div>
          </div>
          <button className="close" onClick={() => setOpen(false)} aria-label="Close">
            ×
          </button>
        </div>

        <div className="asst-body" ref={bodyRef}>
          {messages.length === 0 && (
            <>
              <div className="asst-greet">{ASSISTANT.greeting[lang]}</div>
              <div className="chips">
                {ASSISTANT.chips.map((c) => (
                  <button key={c.en} className="chip-q" onClick={() => send(c[lang])}>
                    {c[lang]}
                  </button>
                ))}
              </div>
            </>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role === "user" ? "user" : "ai"}`}>
              {m.content || (streaming && i === messages.length - 1 ? <span className="dots3"><i /><i /><i /></span> : "")}
            </div>
          ))}
        </div>

        <div className="asst-foot">
          <form
            className="asst-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <textarea
              rows={1}
              value={input}
              placeholder={ASSISTANT.placeholder[lang]}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            <button className="asst-send" type="submit" disabled={busy}>
              {ASSISTANT.send[lang]}
            </button>
          </form>
          <div className="asst-powered">Powered by Claude · grounded in Infostream&apos;s portfolio</div>
        </div>
      </aside>
    </>
  );
}
