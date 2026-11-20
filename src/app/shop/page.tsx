import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { YouTubeIcon } from "@/components/icons";
import { JsonLd, PageHero, SectionTitle } from "@/components/ui";
import { products } from "@/data/shop";
import { site } from "@/data/site";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The upcoming Krrish Tapwal store will feature XploreWithKrrish merchandise and locally sourced products from Himachal Pradesh.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Krrish Store — Coming soon", description: "Merch, Pahadi desi ghee & Himachali goodies." },
  robots: { index: false, follow: true },
};

const promises = [
  { t: "Sourced locally", d: "Products from Himachal's villages and local makers.", bg: "bg-teal" },
  { t: "Quality first", d: "Thoughtfully selected products with clear information.", bg: "bg-violet" },
  { t: "Community focused", d: "Early access and updates for subscribers.", bg: "bg-charcoal" },
];

export default function ShopPage() {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]),
        )}
      />

      <PageHero title="Merch Store" subtitle="Launching soon">
        <p>{site.brand} merchandise and selected products from Himachal Pradesh, delivered to your home.</p>
      </PageHero>

      <section className="bg-coral pb-16">
        <div className="container-x grid gap-2 sm:grid-cols-3">
          {promises.map((p, i) => (
            <Reveal key={p.t} delay={i * 80} className={`p-6 text-white ${p.bg}`}>
              <p className="text-lg font-semibold">{p.t}</p>
              <p className="mt-1 text-sm font-light text-white/90">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat} className="pt-20 md:pt-24" aria-labelledby={`cat-${cat}`}>
          <div className="container-x">
            <SectionTitle id={`cat-${cat}`}>{cat}</SectionTitle>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              {products
                .filter((p) => p.category === cat)
                .map((p, i) => (
                  <ProductCard key={p.slug} product={p} delay={i * 80} showDescription />
                ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 md:py-28">
        <div className="container-x text-center">
          <h2 className="section-title">Stay Updated</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">The store launch will be announced on YouTube. Subscribe to be among the first to know.</p>
          <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-coral mt-8 !px-10">
            <YouTubeIcon width={18} height={18} /> Subscribe for Updates
          </a>
        </div>
      </section>
    </>
  );
}
