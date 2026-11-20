import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { YouTubeIcon } from "@/components/icons";
import { JsonLd } from "@/components/ui";
import { products } from "@/data/shop";
import { site } from "@/data/site";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Shop — XploreWithKrrish Merch, Pahadi Desi Ghee & Himachali Goodies",
  description:
    "Krrish Tapwal's store — XploreWithKrrish merch (tees, hoodies, caps), pure Pahadi desi ghee and Himachali goodies from the mountains. Coming soon.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Krrish Store — Coming soon", description: "Merch, Pahadi desi ghee & Himachali goodies." },
  robots: { index: false, follow: true },
};

const promises = [
  { t: "Seedha pahadon se", d: "Himachal ke gaon aur local makers se sourced." },
  { t: "Shuddh & honest", d: "Jo khud use karta hoon, wahi bechunga." },
  { t: "Community first", d: "Subscribers ko sabse pehle access aur special offers." },
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

      <section className="relative isolate overflow-hidden pb-12 pt-32 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_80%_0%,rgb(125_190_120/0.12),transparent_70%),radial-gradient(40%_50%_at_10%_10%,rgb(255_255_255/0.06),transparent_70%)]" />
        <div className="container-x">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-sage">
              <span className="size-1.5 animate-pulse rounded-full bg-sage" /> Launching soon
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-7xl">
              Krrish <span className="text-gradient">Store</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-mist">
              {site.brand} merch, pahadi desi ghee aur Himachal ki asli cheezein — seedha pahadon se aapke ghar tak.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10 grid gap-4 sm:grid-cols-3">
            {promises.map((p) => (
              <div key={p.t} className="card p-5">
                <p className="font-display text-lg font-semibold">{p.t}</p>
                <p className="mt-1 text-sm text-mist">{p.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat} className="container-x py-12" aria-labelledby={`cat-${cat}`}>
          <h2 id={`cat-${cat}`} className="mb-8 text-3xl font-bold">
            {cat}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((p) => p.category === cat)
              .map((p, i) => (
                <ProductCard key={p.slug} product={p} delay={i * 80} />
              ))}
          </div>
        </section>
      ))}

      <section className="container-x pt-12">
        <Reveal className="card flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Launch miss mat karna!</h2>
            <p className="mt-2 max-w-xl text-mist">Store launch ki announcement sabse pehle YouTube par hogi — subscribe karke bell icon on kar lo.</p>
          </div>
          <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <YouTubeIcon /> Subscribe for updates
          </a>
        </Reveal>
      </section>
    </>
  );
}
