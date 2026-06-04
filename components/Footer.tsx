"use client";

import { useUI } from "@/app/providers";
import { STR } from "@/lib/content";
import { Logo } from "./Logo";
import { StreamLayer } from "./StreamLayer";

export function Footer() {
  const { lang } = useUI();
  return (
    <footer id="footer">
      <StreamLayer flip />
      <div className="wrap">
        <div className="fgrid">
          <div className="fcol about">
            <a className="brand" href="#top" aria-label="Infostream">
              <Logo height={20} />
            </a>
            <p>{STR.footer.about[lang]}</p>
          </div>
          <div className="fcol">
            <h4>{STR.footer.colPlatform[lang]}</h4>
            <a href="#systems">Legal Information System</a>
            <a href="#systems">NGO &amp; Party Registry</a>
            <a href="#systems">Treasury &amp; Budget</a>
            <a href="#systems">DotBond</a>
          </div>
          <div className="fcol">
            <h4>{STR.footer.colCompany[lang]}</h4>
            <a href="#top">About</a>
            <a href="#security">Security</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="fcol">
            <h4>{STR.footer.colTrust[lang]}</h4>
            <a href="#security">ISO 27001</a>
            <a href="#security">ISO 9001</a>
            <a href="#security">Bitdefender partner</a>
          </div>
        </div>
        <div className="fbot">
          <span>© 2026 Infostream d.o.o. · {STR.footer.rights[lang]}</span>
          <span>In production since 2004</span>
        </div>
      </div>
    </footer>
  );
}
