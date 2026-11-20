import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { JsonLd } from "@/components/ui";
import { site } from "@/data/site";
import { graph, personSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const title = `${site.name} — ${site.role} | ${site.brand}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} (Krizz Tapwal) is a Himachal-based explorer, Computer Science Engineering professional, and data scientist. Discover his travel stories, historic sites, and mountain journeys on ${site.brand}.`,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Travel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: site.firstName,
    lastName: site.lastName,
    username: site.youtube.handle,
    url: site.url,
    siteName: site.name,
    title,
    description: site.shortBio,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.shortBio,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
  // Google Search Console verification — code milne par yahan daalo:
  // verification: { google: "XXXXXXXXXXXX" },
};

export const viewport: Viewport = {
  themeColor: "#f5f2f2",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={poppins.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-coral focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <JsonLd data={graph(personSchema(), websiteSchema())} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
