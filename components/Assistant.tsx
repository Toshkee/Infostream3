"use client";

import { useEffect, useRef, useState } from "react";
import { useUI } from "@/app/providers";
import { useFocusTrap } from "@/lib/useFocusTrap";
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

// Infostream logomark: four teal equalizer bars + a red "i", on a white plate
// so it stays legible on the button's teal background.
function BrandMark() {
  return (
    <span className="fab-mark" aria-hidden>
      <svg width="21" height="17" viewBox="0 0 27 22" fill="none">
        <g fill="#0A8C7B">
          <rect x="1" y="6.5" width="3" height="9" rx="1.5" />
          <rect x="6" y="3.5" width="3" height="15" rx="1.5" />
          <rect x="11" y="5.5" width="3" height="11" rx="1.5" />
          <rect x="16" y="2.5" width="3" height="17" rx="1.5" />
        </g>
        <g fill="#E5484D">
          <circle cx="23.5" cy="5" r="1.9" />
          <rect x="22" y="8.5" width="3" height="11" rx="1.5" />
        </g>
      </svg>
    </span>
  );
}

export function Assistant() {
  const { lang } = useUI();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [errored, setErrored] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  // Trap focus inside the dialog while open; restore it to the launcher on close.
  useFocusTrap(panelRef, open, inputRef);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-assistant", handler);
    return () => window.removeEventListener("open-assistant", handler);
  }, []);

  // Esc to close (initial focus + focus trapping handled by useFocusTrap)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [messages, open, busy]);

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

  // Call the API with a given history (no trailing empty assistant placeholder),
  // streaming the answer into the last assistant bubble.
  async function run(history: Msg[]) {
    setBusy(true);
    setErrored(false);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, lang }),
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
      if (!res.ok) setErrored(true);
    } catch {
      setMessages((m) => updateLast(m, ASSISTANT.error[lang]));
      setErrored(true);
    } finally {
      setBusy(false);
    }
  }

  function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    run(next);
  }

  function retry() {
    if (busy) return;
    let hist = messages.slice();
    while (hist.length && hist[hist.length - 1].role === "assistant") hist.pop();
    if (!hist.length) return;
    setMessages([...hist, { role: "assistant", content: "" }]);
    run(hist);
  }

  const lastAi = messages.length > 0 && messages[messages.length - 1].role === "assistant";
  const streaming = busy && lastAi && !messages[messages.length - 1].content;

  return (
    <>
      <button className="fab" onClick={() => setOpen(true)} aria-label={ASSISTANT.open[lang]}>
        <BrandMark />
        {ASSISTANT.open[lang]}
      </button>

      <div className={`asst-overlay${open ? " open" : ""}`} onClick={() => setOpen(false)} />
      <aside
        ref={panelRef}
        className={`asst${open ? " open" : ""}`}
        role="dialog"
        aria-modal={open}
        aria-label={ASSISTANT.title[lang]}
        aria-hidden={!open}
      >
        <div className="asst-head">
          <span className="asst-badge">
            <Waveform />
          </span>
          <div>
            <div className="ht">{ASSISTANT.title[lang]}</div>
            <div className="hs">{ASSISTANT.subtitle[lang]}</div>
          </div>
          <button className="close" onClick={() => setOpen(false)} aria-label={ASSISTANT.close[lang]}>
            ×
          </button>
        </div>

        <div className="asst-body" ref={bodyRef} role="log" aria-live="polite">
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
          {messages.map((m, i) => {
            const isLast = i === messages.length - 1;
            const isErr = errored && isLast && m.role === "assistant";
            return (
              <div key={i} className={`bubble ${m.role === "user" ? "user" : "ai"}${isErr ? " err" : ""}`}>
                {m.content ||
                  (streaming && isLast ? (
                    <span className="dots3" aria-label="…">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    ""
                  ))}
              </div>
            );
          })}
          {errored && !busy && (
            <button className="asst-retry" onClick={retry}>
              ↻ {ASSISTANT.retry[lang]}
            </button>
          )}
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
              ref={inputRef}
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
            <button className="asst-send" type="submit" disabled={busy || !input.trim()}>
              {ASSISTANT.send[lang]}
            </button>
          </form>
          <div className="asst-powered">{ASSISTANT.poweredBy[lang]}</div>
        </div>
      </aside>
    </>
  );
}
