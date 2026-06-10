import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// IBM Plex system — one cohesive superfamily (Sans for display + text, Mono for
// labels). The role-based CSS vars (--font-head / --font-body / --font-mono) mean
// a future typeface swap is a one-file change right here, never in globals.css.
// latin-ext carries the Montenegrin diacritics (č ć š ž đ) — without it, ME-language
// text falls back to system fonts mid-word.
const fontHead = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-head",
  display: "swap",
});
const fontBody = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Runs before first paint so returning dark-mode visitors never see a light flash.
// Mirrors the storage key + prefers-color-scheme fallback used in providers.tsx.
const THEME_INIT = `try{var t=localStorage.getItem('ifs-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

// Set the correct lang on <html> before hydration so screen readers / spell-checkers
// / hyphenation see Montenegrin from first paint. Mirrors providers.tsx (same key +
// navigator.language detection); providers re-applies it on toggle.
const LANG_INIT = `try{var l=localStorage.getItem('ifs-lang');if(l!=='en'&&l!=='me'){l=/^(sr|hr|bs|me|cnr)/i.test(navigator.language||'')?'me':'en'}var d=document.documentElement;d.setAttribute('data-lang',l);d.lang=l==='me'?'sr-Latn-ME':'en'}catch(e){}`;

const TITLE = "Infostream — Critical digital infrastructure for Montenegro";
const DESCRIPTION =
  "Infostream builds and operates the platforms that run Montenegro's institutions — the Official Gazette and legal registry, the NGO and political-party register, financial and compliance systems. In production since 2004.";

// Organization structured data — lets search engines build a knowledge panel.
// Honest facts only: no telephone here (the site's ops number is still a placeholder).
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Infostream",
  legalName: "Infostream d.o.o.",
  url: "https://infostream.me",
  logo: "https://infostream.me/logo.webp",
  foundingDate: "2004",
  description: DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Podgorica", addressCountry: "ME" },
  areaServed: "ME",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "contact@infostream.me",
    availableLanguage: ["en", "sr-Latn-ME"],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://infostream.me"),
  title: { default: TITLE, template: "%s · Infostream" },
  description: DESCRIPTION,
  applicationName: "Infostream",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Infostream",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    locale: "en_US",
    alternateLocale: ["sr_ME"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFBF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0F12" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontHead.variable} ${fontBody.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_INIT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
      </head>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
