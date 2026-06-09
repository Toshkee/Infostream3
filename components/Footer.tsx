"use client";

import { useUI } from "@/app/providers";
import { STR, UI } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer() {
  const { lang } = useUI();
  return (
    <footer id="footer">
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
            <a href="#systems">Tax Filing Portal</a>
          </div>
          <div className="fcol">
            <h4>{STR.footer.colCompany[lang]}</h4>
            <a href="#top">{UI.about[lang]}</a>
            <a href="#security">{STR.nav.security[lang]}</a>
            <a href="#contact">{UI.contact[lang]}</a>
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
          <span>{UI.sinceProd[lang]}</span>
        </div>
      </div>
    </footer>
  );
}
