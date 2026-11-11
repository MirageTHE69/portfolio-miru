export type Category = "Website" | "Platform" | "Booking" | "Brand";

export type Project = {
  slug: string;
  name: string;
  /** One line under the name on cards and at the top of the case study. */
  tagline: string;
  category: Category;
  industry: string;
  location: string;
  /** What was delivered, shown as small tags. */
  scope: string[];
  /** Search-result description for the case study page. */
  seoDescription: string;
  /** The situation the site had to solve. */
  brief: string;
  /** How the build answers it. */
  approach: string;
  /** Three or four concrete things on the site. */
  highlights: string[];
  image: { src: string; width: number; height: number };
  /** Live link, when the project is public. */
  url?: string;
  featured?: boolean;
};

const shot = (name: string) => ({ src: `/work/${name}.jpg`, width: 1440, height: 900 });
const legacy = (name: string, height = 688) => ({ src: `/work/${name}.jpg`, width: 1568, height });

export const projects: Project[] = [
  {
    slug: "rdcc-healthcare",
    name: "RDCC Healthcare",
    tagline: "A calm front door for a child development and rehabilitation network.",
    category: "Website",
    industry: "Healthcare",
    location: "India · 8 centres",
    scope: ["Web design", "Next.js build", "Content structure"],
    seoDescription:
      "Case study: the RDCC Healthcare (ReLife) website, a multi-centre child development and rehabilitation site with therapy pages, a screener and consultation booking.",
    brief:
      "RDCC Healthcare runs eight child development and rehabilitation centres with eighteen therapies. Parents arrive worried and unsure which therapy applies to them, so the site had to guide rather than list.",
    approach:
      "The home page opens by asking who the visitor is seeking support for, then routes them to the right therapies and the nearest centre. A free consultation request and a two-minute screener sit in the first screen, so a parent can act before reading everything.",
    highlights: [
      "Separate paths for a child and for an adult, from the first screen",
      "Eighteen therapies organised so each has its own clear explanation",
      "Centre finder covering all eight locations",
      "Reading section with guides parents search for, built for organic traffic",
    ],
    image: shot("rdcc"),
    url: "https://rdcc-relife.vercel.app",
    featured: true,
  },
  {
    slug: "bookmynail",
    name: "BookMyNail",
    tagline: "At-home nail and lash bookings that start in the hero.",
    category: "Booking",
    industry: "Beauty · At-home salon",
    location: "Ahmedabad",
    scope: ["Web design", "Booking flow", "Priced service menu"],
    seoDescription:
      "Case study: BookMyNail, an at-home nail and lash studio in Ahmedabad. A luxury booking website where service, date and area are captured in the first screen.",
    brief:
      "BookMyNail sends certified nail artists to homes across Ahmedabad. The site needed to feel as premium as a studio visit while making it effortless to book a slot from a phone.",
    approach:
      "Service, date and area are captured in the hero itself, so a booking starts before the first scroll. Prices are shown up front on every service, and the hygiene promise is given its own section because it is the first thing new customers ask about.",
    highlights: [
      "Booking form inside the hero, with live prices on each service",
      "Eight services plus lashes, each with clear starting prices",
      "Four-step booking explained in plain language",
      "Gallery of recent sets and an Instagram feed for social proof",
    ],
    image: shot("bookmynail"),
    url: "https://bookmynails.in",
    featured: true,
  },
  {
    slug: "bluecollar",
    name: "BlueCollar",
    tagline: "A hiring platform where every check and every fee is visible.",
    category: "Platform",
    industry: "Recruitment",
    location: "Ahmedabad & Vadodara",
    scope: ["Product design", "Web build", "Trust & pricing pages"],
    seoDescription:
      "Case study: BlueCollar, a transparent hiring platform for verified drivers and warehouse staff in Ahmedabad and Vadodara, with published per-hire fees.",
    brief:
      "BlueCollar connects employers with verified drivers and warehouse staff, without a middleman. Both sides have been burned by agencies before, so the product had to earn trust by showing its working.",
    approach:
      "The site explains exactly what “verified” means: four named checks, with each profile showing which ones passed. The per-hire fee is published on the page and shown again before an employer confirms, so nothing happens off-screen.",
    highlights: [
      "Two clear entry points: find work, or hire workers",
      "Example worker profile showing which checks were passed",
      "Published, one-time per-hire fee with no hidden charges",
      "Three-step flow explained separately for workers and employers",
    ],
    image: shot("bluecollar"),
    url: "https://bluecollar-test.netlify.app",
    featured: true,
  },
  {
    slug: "master-spellers",
    name: "Master Spellers",
    tagline: "A national spelling competition made easy to enter.",
    category: "Website",
    industry: "Education",
    location: "India",
    scope: ["Web design", "Next.js build", "Registration journey"],
    seoDescription:
      "Case study: the Master Spellers website, a national language competition for Grades 1 to 12 with four levels, seven age groups and school registration.",
    brief:
      "Master Spellers is a national language competition for Grades 1 to 12, with four levels and seven age groups. Parents, students and schools each need different answers before they register.",
    approach:
      "The competition is laid out as a journey from Preliminaries to the Finals, so a first-time parent understands the format in one scroll. Schools get their own route to run the Preliminaries in-house, and past rankers and parent stories carry the proof.",
    highlights: [
      "Four competition levels shown as a single clear journey",
      "Seven age groups explained so nobody competes out of their age",
      "Dedicated section for schools to host the Preliminaries",
      "Prep book and masterclass options presented before registration",
    ],
    image: shot("master-spellers"),
    url: "https://master-speller.vercel.app",
    featured: true,
  },
  {
    slug: "toum",
    name: "Toum",
    tagline: "A shawarma brand with a loud voice and a WhatsApp order button.",
    category: "Brand",
    industry: "Food & beverage",
    location: "Akota, Vadodara",
    scope: ["Brand site", "Menu", "WhatsApp ordering"],
    seoDescription:
      "Case study: Toum, an authentic Middle Eastern shawarma brand in Akota, Vadodara. A bold brand website with a full menu and WhatsApp ordering.",
    brief:
      "Toum sells authentic Middle Eastern shawarma in Vadodara, built around one idea: no mayo, no cabbage, just garlic toum. The site had to carry that attitude and still get people to order.",
    approach:
      "The brand line leads the page in oversized type, and the menu follows straight after with every wrap, bowl and side. Ordering goes through WhatsApp in one tap, which is how the customers already talk to the shop.",
    highlights: [
      "Bold typographic hero built around the brand line",
      "Full menu of wraps, bowls, sides and drinks",
      "One-tap ordering on WhatsApp",
      "Franchise enquiry section for new cities",
    ],
    image: shot("toum"),
    url: "https://toum-web.vercel.app",
    featured: true,
  },
  {
    slug: "schoolnearyou",
    name: "schoolnearyou",
    tagline: "Preschool discovery for parents who want to compare, not guess.",
    category: "Platform",
    industry: "Education · Marketplace",
    location: "Pune",
    scope: ["Product design", "Search & compare", "School listings"],
    seoDescription:
      "Case study: schoolnearyou, a preschool discovery platform in Pune where parents search, compare fees and facilities, and shortlist preschools.",
    brief:
      "Choosing a first school is a big decision made with very little information. schoolnearyou helps parents in Pune find preschools nearby and compare them on fees, facilities and classrooms.",
    approach:
      "Search starts in the hero with area, child's age, preschool type and budget. Results can be saved and compared side by side, and schools have their own route to list themselves, so the platform grows from both sides.",
    highlights: [
      "Search by area, age, preschool type and budget from the first screen",
      "Side-by-side comparison of fees and facilities",
      "Saved shortlist for parents",
      "Self-serve listing flow for preschools",
    ],
    image: shot("schoolnearyou"),
    url: "https://school-for-you-test.antideploy.app",
    featured: true,
  },
  {
    slug: "foodadda",
    name: "FoodAdda",
    tagline: "A discovery platform built only for the food industry.",
    category: "Platform",
    industry: "B2B marketplace",
    location: "India",
    scope: ["Product design", "Supplier search", "Product scanner"],
    seoDescription:
      "Case study: FoodAdda, a B2B food industry discovery platform that connects food businesses directly with suppliers, manufacturers and brands in India.",
    brief:
      "Food businesses usually find suppliers through middlemen and word of mouth. FoodAdda connects them directly with suppliers, manufacturers and brands, with no commission in between.",
    approach:
      "Supplier search is the first thing on the page. Categories, a supplier-side entry and a product scanner follow, so buyers and sellers each find their path quickly.",
    highlights: [
      "Supplier and product search in the hero",
      "Category browsing across the food industry",
      "Separate entry for suppliers to list their business",
      "Product scanner and industry jobs section",
    ],
    image: shot("foodadda"),
    url: "https://foodconnect-direct.lovable.app",
  },
  {
    slug: "little-millennium-vasna",
    name: "Little Millennium, Vasna",
    tagline: "A cheerful preschool site that turns visits into admissions.",
    category: "Website",
    industry: "Education · Preschool",
    location: "Saiyed Vasna, Vadodara",
    scope: ["Web design", "Admissions flow", "Local SEO"],
    seoDescription:
      "Case study: the Little Millennium Preschool website for Saiyed Vasna, Vadodara, with programs, the Seven Petal curriculum and school visit booking.",
    brief:
      "Little Millennium's Vasna branch teaches children aged two to six. Parents want to see the campus, understand the day, and know how to join, usually from a phone.",
    approach:
      "The site answers those three questions in order: a warm hero with a visit button, the four programs by age, and a simple four-step joining process. WhatsApp chat stays one tap away throughout.",
    highlights: [
      "Book-a-visit and WhatsApp buttons in the first screen",
      "Four programs explained by age group",
      "A day at school shown as a simple timeline",
      "Four-step admissions process and parent FAQs",
    ],
    image: shot("little-millennium"),
    url: "https://littlemillennium-vasna.antideploy.app",
  },
  {
    slug: "india-news-18",
    name: "India News 18",
    tagline: "A fast local news portal for city and district reporting.",
    category: "Platform",
    industry: "News & media",
    location: "Gujarat",
    scope: ["News portal", "Category desks", "Bilingual layout"],
    seoDescription:
      "Case study: India News 18, a local city and district news portal with breaking news, category desks and live updates in English and Gujarati.",
    brief:
      "India News 18 has covered local city and district news since 2016. Readers come for what happened in their ward today, so speed and scannability matter more than decoration.",
    approach:
      "The layout follows a newspaper front page: one lead story, a live ticker and a column of latest reports. Sections for city, crime, politics, business and sports keep each desk one tap away.",
    highlights: [
      "Lead story with a live breaking-news ticker",
      "Category desks for city, crime, politics, business and sports",
      "Headlines in English and Gujarati",
      "Video and share-market sections",
    ],
    image: shot("india-news-18"),
    url: "https://www.indianews18.org",
  },
  {
    slug: "quick-cab",
    name: "Quick Cab",
    tagline: "One-way cab bookings from Vadodara at fixed fares.",
    category: "Booking",
    industry: "Travel · Intercity cabs",
    location: "Vadodara",
    scope: ["Booking website", "Fare pages", "Local SEO"],
    seoDescription:
      "Case study: Quick Cab, a one-way cab booking website in Vadodara with fixed all-inclusive fares, online booking and route pages.",
    brief:
      "Quick Cab has run intercity cabs from Vadodara since 2016. Its promise is simple: one-way trips at a fixed, all-inclusive fare with no return charges.",
    approach:
      "The booking form is the hero. Fares, routes and the three-step booking process follow, and the page titles are written around what people actually search for when they need a one-way cab.",
    highlights: [
      "Online booking form in the first screen",
      "Fixed-fare promise stated up front",
      "Route and fare sections for popular trips",
      "Call and WhatsApp buttons in the header",
    ],
    image: shot("quick-cab"),
    url: "https://thequickcab.com",
  },
  {
    slug: "sinful",
    name: "SINFUL",
    tagline: "A snack brand that sells with attitude.",
    category: "Brand",
    industry: "D2C · Snacks",
    location: "India",
    scope: ["Brand site", "Product storytelling", "Motion"],
    seoDescription:
      "Case study: SINFUL, a D2C snack brand website for crisps, puffs and dark chocolate, built around bold copy and product storytelling.",
    brief:
      "SINFUL makes crisps, puffs and dark chocolate: three products, nine flavours. The brand voice is unapologetic, and the site had to sound like it.",
    approach:
      "Each product is introduced as its own “sin”, with copy doing most of the selling. A dark, cinematic look and a store locator turn the attitude into somewhere to buy.",
    highlights: [
      "Three products presented as three distinct characters",
      "Copy-led sections with a strong brand voice",
      "Customer “confessions” as social proof",
      "Store locator for where to find each craving",
    ],
    image: shot("sinful"),
    url: "https://sinful-cult-craft.lovable.app",
  },
  {
    slug: "discover-digital",
    name: "Discover Digital",
    tagline: "An AI-led marketing agency site built to win strategy calls.",
    category: "Website",
    industry: "Marketing agency",
    location: "Gujarat",
    scope: ["Web design", "Web build", "Lead capture"],
    seoDescription:
      "Case study: Discover Digital, a precision marketing agency website presenting data-driven marketing, creative strategy and AI-powered growth services.",
    brief:
      "Discover Digital is a marketing agency offering data-driven marketing, creative strategy and AI-powered growth. An agency's own site is its first case study, so it had to look sharp and load fast.",
    approach:
      "The site leads with a clear promise, then lays out services and the way the agency works, with enquiry points throughout so interested brands can get in touch at any stage.",
    highlights: [
      "Clear positioning in the first screen",
      "Services presented around outcomes, not jargon",
      "AI strategy call as the main action, repeated through the page",
      "Lightweight build for fast loading",
    ],
    image: shot("discover-digital"),
    url: "https://discdigi.netlify.app",
  },
  {
    slug: "turbo-tech",
    name: "Turbo Tech",
    tagline: "An industrial services site with the quote form front and centre.",
    category: "Website",
    industry: "Industrial engineering",
    location: "Kushinagar",
    scope: ["Full site", "Video hero", "Quote funnel"],
    seoDescription:
      "Case study: Turbo Tech, an industrial engineering website covering EPC, fabrication and manpower services, built around a quote request funnel.",
    brief:
      "Turbo Tech provides EPC, fabrication and manpower services. Buyers in this sector want to see capability quickly and then ask for a quote.",
    approach:
      "The site covers the company's services across seven sections under a video hero, with the quote funnel kept front and centre throughout.",
    highlights: [
      "Video hero showing real work",
      "Seven sections covering each service line",
      "Quote request funnel repeated at key points",
    ],
    image: legacy("turbotech", 710),
  },
  {
    slug: "aesthetics",
    name: "Aesthetics",
    tagline: "A 1972 furnishing house given an editorial site and an AI fabric tool.",
    category: "Brand",
    industry: "Home textiles retail",
    location: "Vadodara",
    scope: ["Brand site", "AI customiser"],
    seoDescription:
      "Case study: Aesthetics, a curtain and upholstery house in Vadodara established in 1972, with an editorial brand website and an AI room fabric visualiser.",
    brief:
      "Aesthetics has sold curtains and upholstery in Vadodara since 1972. Customers struggle to imagine a fabric in their own room from a swatch.",
    approach:
      "The brand was given an editorial site that shows the craft, plus a tool that visualises a chosen fabric in a room, so the decision gets easier before a store visit.",
    highlights: [
      "Editorial layout for a heritage brand",
      "AI tool that previews fabric in a room",
      "Collections organised by use",
    ],
    image: legacy("aesthetics"),
  },
  {
    slug: "siren",
    name: "SIRÈN",
    tagline: "A pre-launch storefront that collects demand before orders open.",
    category: "Brand",
    industry: "Direct-to-consumer",
    location: "India",
    scope: ["Storefront", "Pre-launch capture"],
    seoDescription:
      "Case study: SIRÈN, a direct-to-consumer storefront with four collections and a pre-launch waitlist that captures customer intent before orders open.",
    brief:
      "SIRÈN was preparing to launch four collections and wanted to know which ones people wanted before committing stock.",
    approach:
      "The collections are framed as temperatures, and a waitlist gate collects intent before orders open, so launch decisions are based on real interest.",
    highlights: [
      "Four collections with a distinct mood each",
      "Waitlist gate that records what visitors want",
      "Storefront ready to switch on at launch",
    ],
    image: legacy("siren"),
  },
  {
    slug: "monica-singh",
    name: "Monica Singh",
    tagline: "An anchor's portfolio where event enquiries land in one click.",
    category: "Website",
    industry: "Personal brand",
    location: "Ahmedabad",
    scope: ["Portfolio", "Showreel", "Enquiry flow"],
    seoDescription:
      "Case study: Monica Singh, an event anchor's portfolio website in Ahmedabad with a showreel, gallery, reviews and a one-click enquiry flow.",
    brief:
      "Monica Singh is an event anchor in Ahmedabad. Event planners decide quickly, usually after watching a short clip and reading a few reviews.",
    approach:
      "The showreel, gallery and reviews are arranged in the order a planner checks them, with the enquiry button always within reach.",
    highlights: [
      "Showreel at the top of the page",
      "Gallery and client reviews",
      "One-click event enquiry",
    ],
    image: legacy("monicasingh"),
  },
];

export const categories: Category[] = ["Website", "Platform", "Booking", "Brand"];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
