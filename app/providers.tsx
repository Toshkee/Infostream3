"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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
  const [theme, setTheme] = useState<Theme>("light");

  // hydrate from storage; fall back to the visitor's browser language on first visit
  useEffect(() => {
    const stored = localStorage.getItem("ifs-lang") as Lang | null;
    const detected: Lang = /^(sr|hr|bs|me|cnr)/i.test(navigator.language || "") ? "me" : "en";
    const l: Lang = stored ?? detected;
    const t = (localStorage.getItem("ifs-theme") as Theme) || "light";
    setLangState(l);
    setTheme(t);
  }, []);

  useEffect(() => {
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
