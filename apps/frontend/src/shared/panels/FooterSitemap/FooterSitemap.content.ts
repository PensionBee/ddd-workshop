export const SERVICE_LINKS = [
  { href: "/how-it-works", linkText: "How it works" },
  { href: "/combine", linkText: "Combine" },
  { href: "/contribute", linkText: "Contribute" },
  { href: "/pension-withdrawal", linkText: "Withdraw" },
  { href: "/plans", linkText: "Plans" },
  { href: "/self-employed-pension", linkText: "Self-employed" },
  { href: "/fees", linkText: "Fees" },
];

export const ABOUT_LINKS = [
  { href: "/our-vision", linkText: "Vision" },
  { href: "/our-values", linkText: "Values" },
  { href: "/esg", linkText: "ESG" },
  { href: "/our-history", linkText: "History" },
  { href: "/reviews", linkText: "Reviews" },
  { href: "/press", linkText: "Press" },
  { href: "/careers", linkText: "Careers" },
];

export const KNOWLEDGE_LINKS = [
  { href: "/pensions-explained", linkText: "Pensions explained" },
  { href: "/pension-academy-videos", linkText: "Pension Academy videos" },
  { href: "/blog", linkText: "Blog" },
  { href: "/podcast", linkText: "Pension Confident Podcast" },
  { href: "/pension-calculator", linkText: "Pension calculator" },
  { href: "/drawdown-calculator", linkText: "Drawdown calculator" },
  { href: "/pension-landscape", linkText: "Pension landscape" },
];

export const INVESTOR_LINKS = [
  { href: "/investor-relations", linkText: "Overview" },
  {
    href: "/investor-relations/business-model-and-strategy",
    linkText: "Business model & strategy",
  },
  { href: "/investor-relations/esg", linkText: "ESG document hub" },
  { href: "/investor-relations/leadership", linkText: "Leadership" },
  { href: "/investor-relations/regulatory-news", linkText: "Regulatory news" },
  {
    href: "/investor-relations/results-and-reports",
    linkText: "Results and reports",
  },
  {
    href: "/investor-relations/financial-calendar",
    linkText: "Financial calendar",
  },
  {
    href: "/investor-relations/share-price-and-analyst-coverage",
    linkText: "Share price and analyst coverage",
  },
  {
    href: "/investor-relations/annual-general-meeting",
    linkText: "Annual General Meeting",
  },
  { href: "/investor-relations/ipo-centre", linkText: "IPO centre" },
  { href: "/investor-relations/contact-us", linkText: "Contact us" },
];

export const HELP_LINKS = [
  { href: "/contact-us", linkText: "Contact us" },
  { href: "/faq", linkText: "FAQs" },
  { href: "/terms", linkText: "Terms" },
  { href: "/privacy-policy", linkText: "Privacy policy" },
];

export const FOOTER_MENU_SECTIONS = {
  "OUR SERVICE": SERVICE_LINKS,
  "ABOUT US": ABOUT_LINKS,
  KNOWLEDGE: KNOWLEDGE_LINKS,
  "INVESTOR RELATIONS": INVESTOR_LINKS,
  "HELP & FAQS": HELP_LINKS,
} as const;
