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
  // Final-answer text mirrored into a polite SR live region; the streaming bubble
  // itself is NOT a live region, so screen readers aren't spammed per character.
  const [announce, setAnnounce] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  // Typewriter: streamed text accumulates in targetRef; a rAF loop reveals it a
  // few characters at a time so the answer is visibly "written out" — even when
  // the whole reply lands in a single network chunk. Decouples display pace from
  // network pace, which is what made short answers pop in all at once before.
  const targetRef = useRef("");
  const shownRef = useRef(0);
  const doneRef = useRef(true);
  const rafRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const abortedRef = useRef(false);

  // Trap focus inside the dialog while open; restore it to the launcher on close.
  useFocusTrap(panelRef, open, inputRef);

  // Stop the typewriter + abort any in-flight request if we unmount mid-answer.
  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    abortRef.current?.abort();
  }, []);

  // Abort an in-flight answer if the panel is closed mid-stream.
  useEffect(() => {
    if (!open && busy) stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  // Reveal targetRef into the last assistant bubble a few chars per frame. Speed
  // scales with the backlog so it stays close to a fast stream but still reads as
  // typing; it keeps running until the stream is done AND fully revealed.
  function startTypewriter() {
    cancelAnimationFrame(rafRef.current);
    let last = 0;
    const frame = (ts: number) => {
      if (!last) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;
      const target = targetRef.current;
      if (shownRef.current < target.length) {
        const backlog = target.length - shownRef.current;
        const advance = Math.max(1, Math.ceil((85 + backlog * 1.5) * dt));
        shownRef.current = Math.min(target.length, shownRef.current + advance);
        setMessages((m) => updateLast(m, target.slice(0, shownRef.current)));
      }
      if (shownRef.current < targetRef.current.length || !doneRef.current) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        rafRef.current = 0;
        setBusy(false);
        setAnnounce(targetRef.current);
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  }

  // Call the API with a given history (no trailing empty assistant placeholder).
  // Streamed bytes accumulate in targetRef; the typewriter writes them out.
  async function run(history: Msg[]) {
    setBusy(true);
    setErrored(false);
    setAnnounce("");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    targetRef.current = "";
    shownRef.current = 0;
    doneRef.current = false;
    abortedRef.current = false;
    const ac = new AbortController();
    abortRef.current = ac;
    if (!reduce) startTypewriter();
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, lang }),
        signal: ac.signal,
      });
      if (!res.body) {
        targetRef.current = await res.text();
      } else {
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          targetRef.current += dec.decode(value, { stream: true });
          if (reduce) setMessages((m) => updateLast(m, targetRef.current));
        }
      }
      if (!res.ok) setErrored(true);
    } catch {
      // An intentional stop (abort) keeps whatever already streamed; a real
      // network error swaps in the friendly error text.
      if (!abortedRef.current) {
        targetRef.current = ASSISTANT.error[lang];
        shownRef.current = 0;
        setErrored(true);
      }
    } finally {
      doneRef.current = true;
      // Reduced-motion, or the rare no-stream fallback where the rAF loop never
      // started: commit the full text now. Otherwise the typewriter finishes
      // revealing and clears busy itself.
      if (reduce || !rafRef.current) {
        setMessages((m) => updateLast(m, targetRef.current));
        setBusy(false);
        setAnnounce(targetRef.current);
      }
    }
  }

  // User-initiated stop: abort the request and freeze the answer at what's shown.
  function stop() {
    if (!busy) return;
    abortedRef.current = true;
    abortRef.current?.abort();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) targetRef.current = targetRef.current.slice(0, shownRef.current);
    doneRef.current = true;
    if (reduce || !rafRef.current) {
      setMessages((m) => updateLast(m, targetRef.current));
      setBusy(false);
      setAnnounce(targetRef.current);
    }
  }

  function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
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

        <div className="asst-body" ref={bodyRef} role="log" aria-live="off">
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
              aria-label={ASSISTANT.placeholder[lang]}
              placeholder={ASSISTANT.placeholder[lang]}
              onChange={(e) => {
                setInput(e.target.value);
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = Math.min(el.scrollHeight, 120) + "px";
              }}
              onKeyDown={(e) => {
                // isComposing guard so IME users (diacritics / Cyrillic) don't send mid-composition
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            {busy ? (
              <button type="button" className="asst-stop" onClick={stop} aria-label={ASSISTANT.stop[lang]}>
                <span className="sq" aria-hidden />
                {ASSISTANT.stop[lang]}
              </button>
            ) : (
              <button className="asst-send" type="submit" disabled={!input.trim()}>
                {ASSISTANT.send[lang]}
              </button>
            )}
          </form>
          <div className="asst-powered">{ASSISTANT.poweredBy[lang]}</div>
        </div>
        <p className="sr-only" aria-live="polite">{announce}</p>
      </aside>
    </>
  );
}
