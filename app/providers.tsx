"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { DOC_TITLE, type Lang } from "@/lib/content";

type Theme = "light" | "dark";

interface UICtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Ctx = createContext<UICtx | null>(null);

export function useUI(): UICtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useUI must be used within <Providers>");
  return c;
}

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  // Start at "light" on BOTH server and first client render (no hydration
  // mismatch); the real theme is synced from the DOM in the effect below.
  const [theme, setTheme] = useState<Theme>("light");
  const themeMounted = useRef(false);

  // hydrate from storage; fall back to browser language / the theme the blocking
  // inline script (layout.tsx) already applied pre-paint.
  useEffect(() => {
    const stored = localStorage.getItem("ifs-lang") as Lang | null;
    const detected: Lang = /^(sr|hr|bs|me|cnr)/i.test(navigator.language || "") ? "me" : "en";
    setLangState(stored ?? detected);
    const domTheme = document.documentElement.getAttribute("data-theme");
    if (domTheme === "dark" || domTheme === "light") setTheme(domTheme);
    // Allow the .35s fade for user toggles from now on; the initial paint stays instant.
    document.documentElement.classList.add("theme-ready");
  }, []);

  // Apply the theme on user toggle. Skip the initial run — the inline script
  // already set data-theme before paint, so we must not clobber it (which would
  // cause exactly the flash this is meant to prevent).
  useEffect(() => {
    if (!themeMounted.current) {
      themeMounted.current = true;
      return;
    }
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ifs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-lang", lang);
    el.lang = lang === "me" ? "sr-Latn-ME" : "en";
    document.title = DOC_TITLE[lang];
    localStorage.setItem("ifs-lang", lang);
  }, [lang]);

  return (
    <Ctx.Provider
      value={{
        lang,
        setLang: setLangState,
        theme,
        toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
