import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/fx/Cursor";
import { ScrollChrome } from "@/components/fx/ScrollChrome";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Splash } from "@/components/fx/Splash";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/Sections";
import { site } from "@/lib/site";
import { splashBootScript } from "@/lib/splash";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MirageDevo — AI automation, websites & SEO",
    template: "%s | MirageDevo",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "MirageDevo — AI automation, websites & SEO",
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "MirageDevo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MirageDevo — AI automation, websites & SEO",
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0d17",
  colorScheme: "dark",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  logo: `${site.url}/brand/icon-512.png`,
  image: `${site.url}/og.jpg`,
  description: site.description,
  areaServed: "IN",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vadodara",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  knowsAbout: ["AI automation", "Web development", "Next.js", "SEO", "WhatsApp automation"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${serif.variable}`}
      // The head script below sets data-splash and a class before React loads.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashBootScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Splash />
        <SmoothScroll />
        <Cursor />
        <ScrollChrome />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-heat focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
