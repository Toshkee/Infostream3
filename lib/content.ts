export type Lang = "en" | "me";
export interface T {
  en: string;
  me: string;
}

/** Sector buckets that drive the unified Platform explorer's filter bar. */
export type Sector = "gov" | "finance" | "funds" | "defense" | "enterprise";

/** One canonical record of work — merges the old SYSTEMS + FLAGSHIPS + WORK_GROUPS.
 *  Items with `video`/`mini` get a live preview; `product` links to a PRODUCT_LINE. */
export interface PortfolioItem {
  id: string;
  sector: Sector;
  name: T;
  client: T;
  blurb: T;
  tags: string[];
  product?: string;
  featured?: boolean;
  /** optional looping product footage (in /public/media) */
  video?: string;
  poster?: string;
  /** fallback mini-UI style when there is no live footage */
  mini?: "dash" | "table" | "form";
}

export interface Institution {
  name: T;
}

export const STR = {
  nav: {
    platform: { en: "Platform", me: "Platforma" },
    systems: { en: "Systems", me: "Sistemi" },
    security: { en: "Security", me: "Bezbjednost" },
    company: { en: "Company", me: "Kompanija" },
    status: { en: "All systems operational", me: "Svi sistemi rade" },
    talk: { en: "Talk to us", me: "Kontakt" },
  },
  hero: {
    kicker: { en: "National digital infrastructure", me: "Nacionalna digitalna infrastruktura" },
    title: {
      en: "We build and run the systems a country depends on.",
      me: "Gradimo i održavamo sisteme na koje se država oslanja.",
    },
    lead: {
      en: "For two decades, Infostream has built and operated the platforms that run Montenegro's institutions — the Official Gazette and legal registry, the NGO and political-party register, financial and compliance systems. Engineered for longevity, audited by default.",
      me: "Već dvije decenije Infostream gradi i održava platforme koje pokreću crnogorske institucije — Službeni list i pravni registar, registar NVO i političkih partija, finansijske i sisteme usaglašenosti. Projektovano za trajnost, spremno za reviziju.",
    },
    cta1: { en: "Explore the platform", me: "Istražite platformu" },
    cta2: { en: "Talk to us", me: "Kontaktirajte nas" },
    frameLabel: { en: "Legal Information System · live", me: "Pravni informacioni sistem · uživo" },
  },
  trust: {
    label: { en: "In production for", me: "U produkciji za" },
  },
  stats: {
    label: { en: "Operating metrics", me: "Operativni pokazatelji" },
  },
  systems: {
    kicker: { en: "The platform", me: "Platforma" },
    title: { en: "Systems we build — and run in production.", me: "Sistemi koje gradimo — i održavamo u produkciji." },
    lead: {
      en: "Platforms operating across the state, for institutions that cannot afford downtime.",
      me: "Platforme u radu širom države, za institucije koje ne smiju da stanu.",
    },
  },
  why: {
    kicker: { en: "Why infostream", me: "Zašto infostream" },
    statement: {
      en: "Continuity is the product. Everything else is implementation.",
      me: "Kontinuitet je proizvod. Sve ostalo je implementacija.",
    },
    cols: [
      {
        n: "01",
        h: { en: "Built for longevity", me: "Građeno za trajnost" },
        p: {
          en: "Stable, well-understood tooling — Oracle, .NET, Java, modern web — chosen for audit-trail and operational predictability over novelty.",
          me: "Stabilni, dobro poznati alati — Oracle, .NET, Java, savremeni web — birani zbog revizije i predvidivosti, ne zbog novine.",
        },
      },
      {
        n: "02",
        h: { en: "Audit-grade by default", me: "Spremno za reviziju" },
        p: {
          en: "Every action produces evidence — change logs, access trails, deploy records, digital signatures — a regulator can read without an interpreter.",
          me: "Svaka radnja proizvodi dokaze — dnevnike izmjena, tragove pristupa, zapise o isporuci, digitalne potpise — koje regulator čita bez prevodioca.",
        },
      },
      {
        n: "03",
        h: { en: "We operate what we build", me: "Održavamo ono što gradimo" },
        p: {
          en: "The team that designed the stack is the same team running it years later — on a line that does not go quiet.",
          me: "Tim koji je projektovao sistem isti je tim koji ga održava godinama kasnije — na liniji koja ne ćuti.",
        },
      },
    ],
  },
  arch: [
    { name: { en: "Citizens", me: "Građani" }, role: { en: "request in", me: "zahtjev ulazi" } },
    { name: { en: "Gateway", me: "Gateway" }, role: { en: "authenticated", me: "autentifikacija" } },
    { name: { en: "Services", me: "Servisi" }, role: { en: "business rules", me: "poslovna pravila" } },
    { name: { en: "Registry & Ledger", me: "Registar i evidencija" }, role: { en: "system of record", me: "sistem evidencije" } },
    { name: { en: "Audit", me: "Revizija" }, role: { en: "immutable log", me: "nepromjenljiv zapis" } },
  ],
  security: {
    kicker: { en: "Security & compliance", me: "Bezbjednost i usaglašenost" },
    title: { en: "Externally audited. Built to stay up.", me: "Eksterno revidirano. Građeno da traje." },
    lead: {
      en: "Independently certified to international standards and partnered for enterprise-grade threat protection — security here is verified by outside bodies, not self-declared.",
      me: "Nezavisno sertifikovano po međunarodnim standardima, uz partnerstvo za zaštitu na nivou preduzeća — bezbjednost provjeravaju eksterna tijela, ne mi sami.",
    },
    certs: [
      {
        code: "ISO 27001",
        icon: "shield" as const,
        name: { en: "Information Security Management", me: "Upravljanje bezbjednošću informacija" },
        desc: {
          en: "The international standard for protecting data, controlling access and keeping operations continuous.",
          me: "Međunarodni standard za zaštitu podataka, kontrolu pristupa i kontinuitet rada.",
        },
        tag: { en: "Externally audited", me: "Eksterno revidirano" },
      },
      {
        code: "ISO 9001",
        icon: "quality" as const,
        name: { en: "Quality Management", me: "Upravljanje kvalitetom" },
        desc: {
          en: "Consistent, documented processes across everything we build and operate.",
          me: "Dosljedni, dokumentovani procesi u svemu što gradimo i održavamo.",
        },
        tag: { en: "Externally audited", me: "Eksterno revidirano" },
      },
      {
        code: "Bitdefender",
        icon: "bolt" as const,
        name: { en: "Enterprise threat protection", me: "Zaštita od prijetnji za preduzeća" },
        desc: {
          en: "Enterprise-grade endpoint and threat defense across our systems.",
          me: "Zaštita krajnjih tačaka i odbrana od prijetnji na nivou preduzeća.",
        },
        tag: { en: "Security partner", me: "Bezbjednosni partner" },
      },
    ],
  },
  cta: {
    kicker: { en: "Get in touch", me: "Kontakt" },
    title: { en: "If you run something critical, we should talk.", me: "Ako vodite nešto kritično, treba da razgovaramo." },
    lead: {
      en: "We respond to enquiries within one business day. For incidents, use the operations line.",
      me: "Na upite odgovaramo u roku od jednog radnog dana. Za incidente koristite operativnu liniju.",
    },
    button: { en: "Start a conversation", me: "Započnite razgovor" },
    ops: { en: "Operations line · 24/7", me: "Operativna linija · 0–24" },
    email: "contact@infostream.me",
    // TODO(client): replace placeholder with the real operations number before launch.
    phone: "+382 20 000 000",
  },
  footer: {
    about: {
      en: "Critical digital infrastructure for Montenegro's institutions. Built and operated in Podgorica since 2004.",
      me: "Kritična digitalna infrastruktura za crnogorske institucije. Građeno i održavano u Podgorici od 2004.",
    },
    colPlatform: { en: "Platform", me: "Platforma" },
    colCompany: { en: "Company", me: "Kompanija" },
    colTrust: { en: "Trust", me: "Povjerenje" },
    rights: { en: "Podgorica, Montenegro", me: "Podgorica, Crna Gora" },
  },
};

/* NOTE: stats + client list carried over from the brand's existing sites.
   Marked representative — confirm real figures with the client. */
export const STATS: { v: string; l: T; count?: number; suffix?: string; decimals?: number }[] = [
  { v: "99.99%", l: { en: "Sustained uptime", me: "Raspoloživost" }, count: 99.99, suffix: "%", decimals: 2 },
  { v: "€14.2B", l: { en: "Settled / yr · Settlement Ledger", me: "Poravnano / god · poravnanje" } },
  { v: "1,700+", l: { en: "Peak transactions / sec", me: "Transakcija / sek (vrh)" }, count: 1700, suffix: "+" },
  { v: "6", l: { en: "National institutions", me: "Nacionalnih institucija" }, count: 6 },
  { v: "20+", l: { en: "Years in production", me: "Godina u radu" }, count: 20, suffix: "+" },
];

export const INSTITUTIONS: Institution[] = [
  { name: { en: "Ministry of Finance", me: "Ministarstvo finansija" } },
  { name: { en: "Central Bank of Montenegro", me: "Centralna banka Crne Gore" } },
  { name: { en: "Parliament of Montenegro", me: "Skupština Crne Gore" } },
  { name: { en: "Ministry of Interior", me: "Ministarstvo unutrašnjih poslova" } },
  { name: { en: "Tax Authority", me: "Poreska uprava" } },
  { name: { en: "Ministry of Defense", me: "Ministarstvo odbrane" } },
];

/* Filter bar for the unified Platform explorer. "products" shows the product
   lines; the rest filter PORTFOLIO by sector. */
export const SECTOR_FILTERS: { key: Sector | "all" | "products"; label: T }[] = [
  { key: "all", label: { en: "All", me: "Sve" } },
  { key: "gov", label: { en: "Government", me: "Vlada" } },
  { key: "finance", label: { en: "Tax & Finance", me: "Porezi i finansije" } },
  { key: "funds", label: { en: "Funds & Agencies", me: "Fondovi i agencije" } },
  { key: "defense", label: { en: "Defense & Security", me: "Odbrana i bezbjednost" } },
  { key: "enterprise", label: { en: "Banking & Enterprise", me: "Banke i privreda" } },
  { key: "products", label: { en: "Products", me: "Proizvodi" } },
];

export const SECTOR_LABELS: Record<Sector, T> = {
  gov: { en: "Government", me: "Vlada i ministarstva" },
  finance: { en: "Tax & Public Finance", me: "Porezi i javne finansije" },
  funds: { en: "Funds & Agencies", me: "Fondovi i agencije" },
  defense: { en: "Defense & Security", me: "Odbrana i bezbjednost" },
  enterprise: { en: "Banking & Enterprise", me: "Banke i privreda" },
};

/* The single canonical body of work. Items with video/mini render a live
   preview in the explorer; the rest render a terminal "record" view.
   The AI assistant (app/api/assistant) is grounded in this same array. */
export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "legal", sector: "gov", featured: true,
    name: { en: "Legal Information System", me: "Pravni informacioni sistem" },
    client: { en: "Official Gazette of Montenegro", me: "Službeni list Crne Gore" },
    blurb: {
      en: "End-to-end management of laws and regulations — enter, classify, verify and publish, with a full workflow and immutable audit trail.",
      me: "Upravljanje zakonima i propisima od početka do kraja — unos, klasifikacija, verifikacija i objava, uz potpuni tok rada i nepromjenjiv trag revizije.",
    },
    tags: [".NET", "Angular", "Oracle"],
    video: "/media/zadaci.mp4", poster: "/media/zadaci.jpg",
  },
  {
    id: "tax", sector: "finance", featured: true, product: "UCG3 · Taxis",
    name: { en: "National Tax System — UCG3 (Taxis) & VAT Refund", me: "Nacionalni poreski sistem — UCG3 (Taxis) i povraćaj PDV-a" },
    client: { en: "Tax Administration of Montenegro", me: "Uprava prihoda i carina Crne Gore" },
    blurb: {
      en: "The state's central tax processing platform, including the citizen-facing online VAT credit refund service.",
      me: "Centralna državna platforma za obradu poreza, sa onlajn servisom za povraćaj PDV-a za građane.",
    },
    tags: ["UCG3", "Tax", "Revenue"],
    mini: "form",
  },
  {
    id: "sprintgov", sector: "gov", featured: true, product: "SPRINTgov",
    name: { en: "SPRINTgov — Government ERP across the Cabinet", me: "SPRINTgov — državni ERP u Vladi" },
    client: { en: "Ministries of European Affairs, Economic Development, Energy & Mining, Maritime Security", me: "Ministarstva evropskih poslova, ekonomskog razvoja, energetike i rudarstva, Uprava pomorske sigurnosti" },
    blurb: {
      en: "One standardized financial and operational ERP, rolled out ministry by ministry across the executive branch.",
      me: "Jedan standardizovani finansijski i operativni ERP, uveden ministarstvo po ministarstvo u izvršnoj vlasti.",
    },
    tags: ["SPRINTgov", "Government", "ERP"],
  },
  {
    id: "settlement", sector: "finance",
    name: { en: "National Settlement Ledger", me: "Nacionalni sistem poravnanja" },
    client: { en: "Central Bank of Montenegro", me: "Centralna banka Crne Gore" },
    blurb: {
      en: "Real-time interbank settlement and reconciliation across the central-bank estate.",
      me: "Poravnanje i usaglašavanje među bankama u realnom vremenu.",
    },
    tags: ["Oracle", "APEX"],
    mini: "dash",
  },
  {
    id: "pension", sector: "funds", featured: true,
    name: { en: "Pension & Disability Insurance Fund — National IS", me: "Fond PIO — nacionalni informacioni sistem" },
    client: { en: "Pension and Disability Insurance Fund of Montenegro", me: "Fond penzijskog i invalidskog osiguranja Crne Gore" },
    blurb: {
      en: "The core system calculating and disbursing benefits to the nation's pensioners — operated and upgraded continuously for over a decade.",
      me: "Ključni sistem za obračun i isplatu prava penzionerima — kontinuirano održavan i unaprjeđivan više od decenije.",
    },
    tags: ["National Fund", "Mission-critical"],
  },
  {
    id: "ngo", sector: "gov",
    name: { en: "NGO & Party Registry", me: "Registar NVO i partija" },
    client: { en: "Min. of Public Administration", me: "Min. javne uprave" },
    blurb: {
      en: "Public registry platform for associations, foundations and political parties — registration, search and management.",
      me: "Javna registarska platforma za udruženja, fondacije i političke partije — upis, pretraga i upravljanje.",
    },
    tags: ["Angular", "SQL"],
    video: "/media/NVO.mp4", poster: "/media/NVO.jpg",
  },
  {
    id: "crps", sector: "finance", featured: true,
    name: { en: "Central Register of Business Entities (CRPS) & eFirma", me: "Centralni registar privrednih subjekata (CRPS) i eFirma" },
    client: { en: "Tax Administration of Montenegro", me: "Uprava prihoda i carina Crne Gore" },
    blurb: {
      en: "The authoritative national register of every company in Montenegro, with fully online incorporation through eFirma.",
      me: "Mjerodavni nacionalni registar svih privrednih subjekata, sa potpuno onlajn registracijom kroz eFirma.",
    },
    tags: ["Registry", "e-Service"],
  },
  {
    id: "treasury", sector: "finance",
    name: { en: "Treasury & Budget Execution", me: "Trezor i izvršenje budžeta" },
    client: { en: "Ministry of Finance", me: "Ministarstvo finansija" },
    blurb: {
      en: "Budget execution, commitment control and statutory reporting for the state treasury.",
      me: "Izvršenje budžeta, kontrola obaveza i zakonsko izvještavanje za državni trezor.",
    },
    tags: ["Oracle", "SQL"],
    mini: "table",
  },
  {
    id: "defense", sector: "defense", product: "INFODMS",
    name: { en: "INFODMS & Financial IS — Ministry of Defense", me: "INFODMS i finansijski IS — Ministarstvo odbrane" },
    client: { en: "Ministry of Defense of Montenegro", me: "Ministarstvo odbrane Crne Gore" },
    blurb: {
      en: "Secure document management, including Military Intelligence, plus the ministry's financial system of record.",
      me: "Bezbjedno upravljanje dokumentima, uključujući Vojnoobavještajnu službu, i finansijski sistem ministarstva.",
    },
    tags: ["INFODMS", "Defense"],
  },
  {
    id: "parliament", sector: "gov", product: "ERPStream",
    name: { en: "ERPStream — Parliament of Montenegro", me: "ERPStream — Skupština Crne Gore" },
    client: { en: "Parliament of Montenegro", me: "Skupština Crne Gore" },
    blurb: {
      en: "The enterprise resource system for the national legislature.",
      me: "Sistem za upravljanje resursima nacionalnog parlamenta.",
    },
    tags: ["ERPStream", "Government"],
  },
  {
    id: "erste", sector: "enterprise", product: "ERPStream",
    name: { en: "ERPStream on Oracle 12c — ERSTE Bank", me: "ERPStream na Oracle 12c — ERSTE banka" },
    client: { en: "ERSTE Bank AD Podgorica", me: "ERSTE banka AD Podgorica" },
    blurb: {
      en: "ERP upgrade and migration to current Oracle 12c infrastructure for a major commercial bank.",
      me: "Unaprjeđenje i migracija ERP-a na Oracle 12c za veliku poslovnu banku.",
    },
    tags: ["ERPStream", "Banking"],
  },
  {
    id: "intel", sector: "defense",
    name: { en: "ERP — Intelligence Agency", me: "ERP — Agencija za nacionalnu bezbjednost" },
    client: { en: "Intelligence Agency of Montenegro", me: "Agencija za nacionalnu bezbjednost" },
    blurb: {
      en: "Enterprise resource platform delivered for the national intelligence service.",
      me: "Sistem za upravljanje resursima za nacionalnu obavještajnu službu.",
    },
    tags: ["ERP", "High-Trust"],
  },
  {
    id: "interior", sector: "defense",
    name: { en: "Licensing & Financial IS — Ministry of Interior", me: "Licenciranje i finansijski IS — MUP" },
    client: { en: "Ministry of Interior of Montenegro", me: "Ministarstvo unutrašnjih poslova" },
    blurb: {
      en: "Registration and licensing of security activities, automated forced-collection of fines, and the ministry's financial backbone.",
      me: "Registracija i licenciranje bezbjednosnih djelatnosti, prinudna naplata kazni i finansijska osnova ministarstva.",
    },
    tags: ["Licensing", "Finance"],
  },
  {
    id: "address", sector: "gov",
    name: { en: "Address Register of Montenegro", me: "Adresni registar Crne Gore" },
    client: { en: "Government of Montenegro", me: "Vlada Crne Gore" },
    blurb: {
      en: "The official national addressing authority underpinning logistics, emergency services and e-government.",
      me: "Zvanični nacionalni adresni sistem za logistiku, hitne službe i e-upravu.",
    },
    tags: ["Registry", "Infrastructure"],
  },
  {
    id: "regulations", sector: "gov",
    name: { en: "Register of Consolidated Regulations", me: "Registar prečišćenih propisa" },
    client: { en: "Official Gazette of Montenegro", me: "Službeni list Crne Gore" },
    blurb: {
      en: "The legally authoritative, always-current text of every law and regulation in force.",
      me: "Pravno mjerodavan i uvijek ažuran tekst svih važećih zakona i propisa.",
    },
    tags: ["Legal", "Registry"],
  },
  {
    id: "hrma", sector: "gov",
    name: { en: "Human Resources Management IS", me: "Sistem za upravljanje ljudskim resursima" },
    client: { en: "Human Resources Management Authority (HRMA)", me: "Uprava za kadrove (HRMA)" },
    blurb: {
      en: "The whole-of-government HR platform managing Montenegro's civil service workforce.",
      me: "Platforma za ljudske resurse cijele uprave koja vodi državnu službu.",
    },
    tags: ["HR", "Platform"],
  },
  {
    id: "einovacije", sector: "funds",
    name: { en: "einovacije.gov.me — National Innovation Portal", me: "einovacije.gov.me — nacionalni inovacioni portal" },
    client: { en: "Innovation Fund of Montenegro", me: "Fond za inovacije Crne Gore" },
    blurb: {
      en: "Montenegro's official gateway to innovation programs, funding and the Register of Innovative Business Entities.",
      me: "Zvanična kapija ka inovacionim programima, finansiranju i Registru inovativnih subjekata.",
    },
    tags: ["Portal", "Innovation"],
  },
  {
    id: "ecofund", sector: "funds",
    name: { en: "Eco Fund Information System", me: "Informacioni sistem Eko-fonda" },
    client: { en: "Eco Fund of Montenegro", me: "Eko-fond Crne Gore" },
    blurb: {
      en: "Manages environmental subsidy and incentive programs nationwide.",
      me: "Upravlja programima ekoloških subvencija na nivou cijele države.",
    },
    tags: ["National Fund", "Environment"],
  },
  {
    id: "eces", sector: "finance",
    name: { en: "eCES — EU Funds Contract Execution", me: "eCES — izvršenje ugovora EU fondova" },
    client: { en: "Directorate for Finance & Contracting of EU Assistance Funds", me: "Direkcija za finansiranje i ugovaranje sredstava EU" },
    blurb: {
      en: "The system through which Montenegro administers and reports on EU pre-accession assistance contracts.",
      me: "Sistem za administriranje i izvještavanje o ugovorima pretpristupne pomoći EU.",
    },
    tags: ["EU", "Compliance"],
  },
  {
    id: "covid", sector: "gov",
    name: { en: "COVID-19 Subsidy Platform", me: "Platforma za COVID-19 subvencije" },
    client: { en: "Government of Montenegro", me: "Vlada Crne Gore" },
    blurb: {
      en: "A crisis-scale public platform that disbursed emergency aid to companies and employees under deadline pressure.",
      me: "Platforma kriznih razmjera koja je isplaćivala hitnu pomoć kompanijama i zaposlenima pod pritiskom rokova.",
    },
    tags: ["Crisis Response", "Public Finance"],
  },
  {
    id: "grants", sector: "gov",
    name: { en: "Economy Competitiveness Grants Platform", me: "Platforma za grantove konkurentnosti" },
    client: { en: "Government of Montenegro", me: "Vlada Crne Gore" },
    blurb: {
      en: "Online application and management portal for national economic-competitiveness incentives.",
      me: "Onlajn portal za prijavu i upravljanje podsticajima konkurentnosti privrede.",
    },
    tags: ["Portal", "Grants"],
  },
  {
    id: "rtcg", sector: "enterprise",
    name: { en: "Integrated IS — RTCG National Broadcaster", me: "Integrisani IS — RTCG" },
    client: { en: "Radio and Television of Montenegro", me: "Radio i Televizija Crne Gore" },
    blurb: {
      en: "End-to-end integrated information system for the national public broadcaster.",
      me: "Integrisani informacioni sistem za nacionalnog javnog emitera.",
    },
    tags: ["Media", "Integration"],
  },
  {
    id: "finstream", sector: "enterprise", product: "FINStream",
    name: { en: "FINStream — Accounting Agencies & SMEs", me: "FINStream — agencije i MSP" },
    client: { en: "Mijons, Praksis, Mils, Agens, Platon and others", me: "Mijons, Praksis, Mils, Agens, Platon i drugi" },
    blurb: {
      en: "Finance and accounting deployed across a portfolio of agencies and SMEs — the platform scales down-market.",
      me: "Finansije i računovodstvo kod niza agencija i MSP — platforma je skalabilna.",
    },
    tags: ["FINStream", "SME"],
  },
  {
    id: "unido", sector: "enterprise",
    name: { en: "UNIDO — Industry & Cluster Web Portals", me: "UNIDO — portali za industriju i klastere" },
    client: { en: "United Nations Industrial Development Organization", me: "Organizacija UN za industrijski razvoj (UNIDO)" },
    blurb: {
      en: "Multiple public web portals delivered for a United Nations agency, including the metal-cluster platform.",
      me: "Više javnih portala za agenciju UN, uključujući platformu za metalski klaster.",
    },
    tags: ["UN", "International"],
  },
];

export function t(s: T, lang: Lang): string {
  return s[lang];
}

/* ------------------------------------------------------------------ */
/* Products + curated work (from the full 64-project portfolio)        */
/* ------------------------------------------------------------------ */

export interface ProductLine {
  name: string;
  tagline: T;
  color: string;
}

export const PRODUCT_LINES: ProductLine[] = [
  { name: "SPRINTgov", color: "#0A8C7B", tagline: { en: "The government ERP standard, deployed across Montenegro's ministries.", me: "Standard državnog ERP-a, primijenjen u ministarstvima Crne Gore." } },
  { name: "ERPStream", color: "#E5484D", tagline: { en: "Enterprise ERP trusted by parliament, banks, ports and broadcasters.", me: "Poslovni ERP kojem vjeruju parlament, banke, luke i mediji." } },
  { name: "FINStream", color: "#2563EB", tagline: { en: "Finance & accounting that scales from institutions to SMEs.", me: "Finansije i računovodstvo, od institucija do MSP." } },
  { name: "INFODMS", color: "#7C3AED", tagline: { en: "Secure document management for the most sensitive institutions.", me: "Bezbjedno upravljanje dokumentima za najosjetljivije institucije." } },
  { name: "UCG3 · Taxis", color: "#D97706", tagline: { en: "The central tax platform powering national revenue collection.", me: "Centralna poreska platforma za naplatu državnih prihoda." } },
];

/* The unified Platform section reuses STR.systems for its header; per-item and
   per-sector copy lives on PORTFOLIO / SECTOR_FILTERS above. */

/* Slim conversion bands placed at peak-conviction points in the scroll
   (right after proof, right after compliance) — see app/page.tsx. */
export const CTA_STRIPS = {
  work: {
    text: { en: "Running one of these? Talk to the team that built them.", me: "Vodite neki od ovih sistema? Razgovarajte sa timom koji ih je napravio." },
    btn: { en: "Talk to us", me: "Kontaktirajte nas" },
  },
} satisfies Record<string, { text: T; btn: T }>;

/* Beyond public infrastructure — R&D + commercial work, kept as a footnote so it
   doesn't dilute the "systems a country depends on" thesis. */
export const RND_NOTE: T = {
  en: "Beyond public infrastructure, our R&D and commercial work includes DotBond — a C# ⇄ TypeScript developer tool — and KLEFIS, hospitality-management software.",
  me: "Pored javne infrastrukture, naš R&D i komercijalni rad uključuje DotBond — alat za C# ⇄ TypeScript — i KLEFIS, softver za upravljanje u hotelijerstvu.",
};

export const HERO_PREFIX: T = { en: "We build and run", me: "Gradimo i održavamo" };
export const HERO_ROTATE: T[] = [
  { en: "Montenegro's tax system.", me: "poreski sistem Crne Gore." },
  { en: "the Official Gazette.", me: "Službeni list." },
  { en: "the Pension Fund.", me: "Fond PIO." },
  { en: "the state treasury.", me: "državni trezor." },
  { en: "the company registry.", me: "registar privrede." },
  { en: "a country's institutions.", me: "institucije države." },
];

export const APPROACH = {
  kicker: { en: "Process", me: "Proces" },
  title: { en: "How we work", me: "Kako radimo" },
  lead: {
    en: "The same four-stage method behind every system we've shipped — and the reason we can still run them years later.",
    me: "Isti metod u četiri faze iza svakog sistema koji smo isporučili — i razlog što ih održavamo godinama.",
  },
  steps: [
    { k: "01", h: { en: "Discovery", me: "Analiza" }, p: { en: "We sit with the people accountable for the system and map the real constraints — legal, operational, political.", me: "Sjedimo sa ljudima odgovornim za sistem i mapiramo stvarna ograničenja — pravna, operativna, politička." } },
    { k: "02", h: { en: "Architecture", me: "Arhitektura" }, p: { en: "Data models, integrations, security boundaries and failure modes — signed off before a line is written.", me: "Modeli podataka, integracije, bezbjednosne granice i scenariji otkaza — potvrđeni prije prve linije koda." } },
    { k: "03", h: { en: "Build", me: "Razvoj" }, p: { en: "Engineered against acceptance criteria, hardened against the threat model, reviewed before release.", me: "Razvijeno prema kriterijumima prihvatanja, ojačano prema modelu prijetnji, pregledano prije objave." } },
    { k: "04", h: { en: "Operate", me: "Održavanje" }, p: { en: "The team that designed the stack runs it — on a line that doesn't go quiet. Continuity is the product.", me: "Tim koji je projektovao sistem ga i održava — na liniji koja ne ćuti. Kontinuitet je proizvod." } },
  ],
};

export const TECHNOLOGIES = {
  kicker: { en: "The stack", me: "Tehnologija" },
  title: { en: "The stack underneath", me: "Tehnologija u osnovi" },
  lead: {
    en: "Stable, well-understood tooling — chosen for longevity, audit-trail and operational predictability over novelty.",
    me: "Stabilni, dobro poznati alati — birani zbog trajnosti, revizije i predvidivosti, ne zbog novine.",
  },
  layers: [
    {
      name: { en: "Interface", me: "Interfejs" },
      role: { en: "What people and institutions actually touch", me: "Ono sa čime ljudi i institucije zaista rade" },
      items: ["Angular", "JavaScript"],
    },
    {
      name: { en: "Application", me: "Aplikacija" },
      role: { en: "Business logic, workflows and rules", me: "Poslovna logika, tokovi i pravila" },
      items: ["C#", ".NET"],
    },
    {
      name: { en: "Data & platform", me: "Podaci i platforma" },
      role: { en: "The system of record and runtime", me: "Sistem evidencije i izvršno okruženje" },
      items: ["Oracle Database", "Oracle APEX", "SQL"],
    },
  ],
};

export const SECTORS = {
  kicker: { en: "Sectors", me: "Sektori" },
  title: { en: "Built for institutions that can't go down", me: "Za institucije koje ne smiju da stanu" },
  lead: {
    en: "Two decades of work across the public and private sector.",
    me: "Dvije decenije rada u javnom i privatnom sektoru.",
  },
  items: [
    {
      icon: "gov" as const,
      name: { en: "Government & ministries", me: "Vlada i ministarstva" },
      note: { en: "Ministries and central administration", me: "Ministarstva i centralna uprava" },
    },
    {
      icon: "tax" as const,
      name: { en: "Tax & public finance", me: "Porezi i javne finansije" },
      note: { en: "Revenue, treasury and budgeting", me: "Prihodi, trezor i budžet" },
    },
    {
      icon: "defense" as const,
      name: { en: "Defense & security", me: "Odbrana i bezbjednost" },
      note: { en: "Armed forces and security agencies", me: "Vojska i bezbjednosne agencije" },
    },
    {
      icon: "funds" as const,
      name: { en: "Funds & agencies", me: "Fondovi i agencije" },
      note: { en: "Public funds and agencies", me: "Javni fondovi i agencije" },
    },
    {
      icon: "bank" as const,
      name: { en: "Banking & enterprise", me: "Banke i privreda" },
      note: { en: "Banks and enterprise operations", me: "Banke i privredni subjekti" },
    },
    {
      icon: "media" as const,
      name: { en: "Media & utilities", me: "Mediji i komunalije" },
      note: { en: "Broadcasters and utilities", me: "Mediji i komunalna preduzeća" },
    },
  ],
};

export const FAQ = {
  kicker: { en: "Questions", me: "Pitanja" },
  title: { en: "Frequently asked", me: "Česta pitanja" },
  lead: {
    en: "Straight answers to what institutions and partners ask us most.",
    me: "Direktni odgovori na ono što nas institucije i partneri najčešće pitaju.",
  },
  items: [
    {
      q: { en: "Do you operate the systems after delivery, or only build them?", me: "Da li održavate sisteme nakon isporuke ili ih samo gradite?" },
      a: {
        en: "We operate what we build. The team that designs a system is the same team running it years later — continuity is the product, not an afterthought.",
        me: "Održavamo ono što gradimo. Tim koji projektuje sistem isti je tim koji ga održava godinama kasnije — kontinuitet je proizvod, ne naknadna misao.",
      },
    },
    {
      q: { en: "How do you handle security and compliance?", me: "Kako rješavate bezbjednost i usaglašenost?" },
      a: {
        en: "We are certified to ISO 27001 (information security) and ISO 9001 (quality), partner with Bitdefender Enterprise, and build audit trails, access logs and digital signatures into every system by default.",
        me: "Sertifikovani smo po ISO 27001 (bezbjednost informacija) i ISO 9001 (kvalitet), partner nam je Bitdefender Enterprise, a tragove revizije, dnevnike pristupa i digitalne potpise ugrađujemo u svaki sistem.",
      },
    },
    {
      q: { en: "What technologies do you build on?", me: "Na kojim tehnologijama gradite?" },
      a: {
        en: "Stable, well-understood tooling chosen for longevity: Oracle Database, Oracle APEX and SQL for data; C# and .NET for application logic; Angular and JavaScript on the interface.",
        me: "Stabilni, dobro poznati alati birani zbog trajnosti: Oracle Database, Oracle APEX i SQL za podatke; C# i .NET za logiku; Angular i JavaScript na interfejsu.",
      },
    },
    {
      q: { en: "Do you work outside Montenegro?", me: "Da li radite van Crne Gore?" },
      a: {
        en: "Our home is Montenegro's public sector, but we've delivered for international bodies too — including the United Nations (UNIDO) and EU pre-accession assistance programs.",
        me: "Naš dom je javni sektor Crne Gore, ali smo isporučivali i za međunarodne institucije — uključujući Ujedinjene nacije (UNIDO) i programe pretpristupne pomoći EU.",
      },
    },
    {
      q: { en: "How long have your systems been in production?", me: "Koliko dugo su vaši sistemi u produkciji?" },
      a: {
        en: "Infostream has been building and running Montenegro's institutional software since 2004 — many of our systems have been live and continuously maintained for well over a decade.",
        me: "Infostream gradi i održava institucionalni softver Crne Gore od 2004 — mnogi naši sistemi su u radu i kontinuirano se održavaju više od decenije.",
      },
    },
    {
      q: { en: "How do we start a conversation?", me: "Kako da započnemo razgovor?" },
      a: {
        en: "Email contact@infostream.me and we'll respond within one business day. If you operate something critical, we're glad to talk it through.",
        me: "Pišite na contact@infostream.me i odgovorićemo u roku od jednog radnog dana. Ako vodite nešto kritično, rado ćemo razgovarati.",
      },
    },
  ],
};

/* Shared UI microcopy — keep all chrome/labels bilingual (no hardcoded English). */
export const UI = {
  menu: { en: "Menu", me: "Meni" },
  openMenu: { en: "Open menu", me: "Otvori meni" },
  closeMenu: { en: "Close menu", me: "Zatvori meni" },
  backToTop: { en: "Back to top", me: "Na vrh" },
  skipToContent: { en: "Skip to content", me: "Pređi na sadržaj" },
  contact: { en: "Contact", me: "Kontakt" },
  about: { en: "About", me: "O nama" },
  sinceProd: { en: "In production since 2004", me: "U produkciji od 2004." },
  // work registry
  flagshipSystems: { en: "flagship systems", me: "ključni sistemi" },
  live: { en: "live", me: "uživo" },
  colId: { en: "ID", me: "ID" },
  colSystem: { en: "System", me: "Sistem" },
  colAuthority: { en: "Authority", me: "Institucija" },
  colStatus: { en: "Status", me: "Status" },
  records: { en: "records", me: "zapisa" },
  // why pipeline
  requestLifecycle: { en: "request lifecycle", me: "životni ciklus zahtjeva" },
  endToEnd: { en: "end-to-end · audited", me: "od kraja do kraja · revidirano" },
  enforced: { en: "enforced", me: "sprovedeno" },
} satisfies Record<string, T>;

export const DOC_TITLE: T = {
  en: "Infostream — Critical digital infrastructure for Montenegro",
  me: "Infostream — Kritična digitalna infrastruktura za Crnu Goru",
};

export const ASSISTANT = {
  title: { en: "Ask Infostream", me: "Pitajte Infostream" },
  greeting: { en: "Ask about our systems, products or track record.", me: "Pitajte o našim sistemima, proizvodima ili iskustvu." },
  placeholder: { en: "Ask a question…", me: "Postavite pitanje…" },
  open: { en: "Ask Infostream", me: "Pitajte Infostream" },
  send: { en: "Send", me: "Pošalji" },
  subtitle: { en: "Product guide", me: "Vodič kroz proizvode" },
  close: { en: "Close", me: "Zatvori" },
  stop: { en: "Stop", me: "Zaustavi" },
  retry: { en: "Retry", me: "Pokušaj ponovo" },
  error: {
    en: "Something went wrong. Please try again, or email contact@infostream.me.",
    me: "Došlo je do greške. Pokušajte ponovo ili pišite na contact@infostream.me.",
  },
  poweredBy: {
    en: "AI-powered · grounded in Infostream's portfolio",
    me: "Pokreće AI · zasnovano na Infostream portfoliju",
  },
  chips: [
    { en: "What is SPRINTgov?", me: "Šta je SPRINTgov?" },
    { en: "SPRINTgov vs ERPStream?", me: "SPRINTgov ili ERPStream?" },
    { en: "How do you handle security & ISO 27001?", me: "Kako rješavate bezbjednost i ISO 27001?" },
    { en: "What's a typical implementation timeline?", me: "Koliko traje implementacija?" },
  ] as T[],
};
