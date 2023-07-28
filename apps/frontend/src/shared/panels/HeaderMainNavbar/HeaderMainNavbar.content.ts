import type { NavMenuItem } from "@shared/components/Nav/Nav.types";

export const NAV_MENU_CONTENT = [
  {
    children: "Our service",
    subList: [
      { children: "How it works", href: "/how-it-works" },
      { children: "Combine", href: "/combine" },
      { children: "Contribute", href: "/contribute" },
      {
        children: "Withdraw",
        subList: [
          {
            children: "About pension withdrawals",
            href: "/pension-withdrawal",
          },
          { children: "Drawdown", href: "/drawdown" },
          { children: "Annuities", href: "/annuity" },
        ],
      },
      {
        children: "Plans",
        subList: [
          { children: "Plans", href: "/plans" },
          {
            children: "Fossil fuel free investing",
            href: "/fossil-fuel-free-pension",
          },
        ],
      },
      { children: "Self-employed", href: "/self-employed-pension" },
      { children: "Fees", href: "/fees" },
    ],
  },
  {
    children: "About us",
    subList: [
      { children: "Vision", href: "/our-vision" },
      { children: "Values", href: "/values" },
      { children: "ESG", href: "/esg" },
      { children: "History", href: "/our-history" },
      { children: "Reviews", href: "/reviews" },
      { children: "Press", href: "/press" },
      { children: "Careers", href: "/careers" },
    ],
  },
  {
    children: "Knowledge",
    subList: [
      { children: "Pensions explained", href: "/pensions-explained" },
      { children: "Pension Academy videos", href: "/pension-academy-videos" },
      { children: "Blog", href: "/blog" },
      { children: "Pension calculator", href: "/pension-calculator" },
      { children: "Drawdown calculator", href: "/drawdown-calculator" },
      { children: "Pension landscape", href: "/pension-landscape" },
    ],
  },
  {
    children: "Help & FAQs",
    subList: [
      { children: "Contact us", href: "/contact-us" },
      { children: "FAQs", href: "/faq" },
      { children: "Terms", href: "/terms" },
      { children: "Privacy policy", href: "/privacy-policy" },
    ],
  },
] satisfies NavMenuItem[];
