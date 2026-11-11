export const services = [
  {
    id: "ai-automation",
    number: "01",
    name: "AI Automation",
    summary:
      "Custom workflow systems built around how your team already works: intake, follow-up, scheduling and reporting that run without you.",
    points: ["Workflow mapping", "WhatsApp & booking agents", "CRM and sheet integrations"],
    href: "/ai-automation",
    cta: "See the WhatsApp agent",
  },
  {
    id: "websites",
    number: "02",
    name: "Websites & Software",
    summary:
      "Custom-coded sites and web apps that load fast and look expensive. No templates, no page-builder tells, fully responsive.",
    points: ["Design", "Next.js build", "Booking flows & platforms"],
    href: "/work",
    cta: "See the work",
  },
  {
    id: "seo",
    number: "03",
    name: "SEO & Digital Marketing",
    summary:
      "Sites structured so Google understands them and customers find them: technical SEO, local search and pages written around real queries.",
    points: ["Technical SEO", "Local search", "Content structure"],
    href: "/contact",
    cta: "Ask about SEO",
  },
] as const;

export const packages = [
  {
    name: "Single automation",
    for: "One repeated task, taken off your plate.",
    includes: [
      "One workflow mapped and built",
      "Connected to the tools you already use",
      "Walkthrough recording and written guide",
      "30 days of support",
    ],
  },
  {
    name: "Multi-step system",
    for: "Lead to booking to follow-up, as one connected system.",
    includes: [
      "Full workflow diagram and fixed scope",
      "Agent, integrations and reporting",
      "Weekly progress you can review",
      "30 days of support after handover",
    ],
    highlight: true,
  },
  {
    name: "Website, design & build",
    for: "A custom site designed and coded for your business.",
    includes: [
      "Design made for your brand",
      "Responsive Next.js build",
      "On-page SEO, sitemap and analytics",
      "Launch support and handover",
    ],
  },
  {
    name: "Agency white-label",
    for: "Development capacity for agencies, under your name.",
    includes: [
      "Briefed like an in-house developer",
      "Builds delivered under your brand",
      "Fixed price per project",
      "By referral",
    ],
  },
] as const;

export const process = [
  {
    step: "01",
    name: "Diagnose",
    text: "A working session on where the hours actually go. You leave with a written list of what is worth automating or building and what is not.",
  },
  {
    step: "02",
    name: "Map",
    text: "A single-page plan and a fixed scope. Priced before anything gets built, so there are no moving numbers.",
  },
  {
    step: "03",
    name: "Build",
    text: "Three to four weeks, with something to look at every week. You approve as it goes rather than at the end.",
  },
  {
    step: "04",
    name: "Hand over",
    text: "Documentation, a walkthrough recording and thirty days of support. The system is yours, not rented.",
  },
] as const;

export const stack = [
  "Next.js",
  "React",
  "Tailwind",
  "Vercel",
  "Supabase",
  "n8n",
  "OpenAI & Claude APIs",
  "WhatsApp Business API",
] as const;

export const capabilities = [
  "Lead qualification",
  "Support automation",
  "Booking systems",
  "Next.js builds",
  "Technical SEO",
  "Reporting pipelines",
  "Agency white-label",
] as const;
