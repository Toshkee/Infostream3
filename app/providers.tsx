"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang } from "@/lib/content";

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

  // hydrate from storage
  useEffect(() => {
    const l = (localStorage.getItem("ifs-lang") as Lang) || "en";
    const t = (localStorage.getItem("ifs-theme") as Theme) || "light";
    setLangState(l);
    setTheme(t);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ifs-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
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
