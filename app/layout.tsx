import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const TITLE = "Infostream — Critical digital infrastructure for Montenegro";
const DESCRIPTION =
  "Infostream builds and operates the platforms that run Montenegro's institutions — the Official Gazette and legal registry, the NGO and political-party register, financial and compliance systems. In production since 2004.";

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
      className={`${archivo.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
