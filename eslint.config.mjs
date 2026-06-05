import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
      // Downgraded to a warning: this project intentionally reads browser-only
      // APIs (localStorage, window.matchMedia) inside useEffect and sets state
      // on mount — the SSR-safe pattern, since those APIs don't exist on the
      // server. The rule (new in eslint-plugin-react-hooks v6) flags that as an
      // error, but here it's correct, not a bug. Kept as a warning so genuine
      // misuse still shows up.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
