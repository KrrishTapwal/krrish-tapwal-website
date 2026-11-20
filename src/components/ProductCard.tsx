import Image from "next/image";
import type { Product } from "@/data/shop";
import { site } from "@/data/site";
import Reveal from "./Reveal";

const tones: Record<Product["tone"], string> = {
  coral: "bg-coral",
  violet: "bg-violet",
  teal: "bg-teal",
  silver: "bg-silver",
  mustard: "bg-mustard",
  leaf: "bg-leaf",
};

function notifyHref(p: Product) {
  const msg = `Hi Krrish, I'm interested in "${p.name}". Please let me know when it launches.`;
  if (site.socials.whatsapp) return `${site.socials.whatsapp}${site.socials.whatsapp.includes("?") ? "&" : "?"}text=${encodeURIComponent(msg)}`;
  if (site.email) return `mailto:${site.email}?subject=${encodeURIComponent(`Notify me: ${p.name}`)}&body=${encodeURIComponent(msg)}`;
  if (site.socials.instagram) return site.socials.instagram;
  return site.youtube.subscribeUrl;
}

/** Square colour tile + centred name/price, with a "Quick View"-style bar on hover */
export default function ProductCard({ product: p, delay = 0, showDescription = false }: { product: Product; delay?: number; showDescription?: boolean }) {
  const available = p.status === "available";
  const href = available && p.buyUrl ? p.buyUrl : notifyHref(p);
  return (
    <Reveal delay={delay} as="article" className="group text-center">
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        <div className={`relative grid aspect-square place-items-center overflow-hidden ${tones[p.tone]}`}>
          {p.image ? (
            <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
          ) : (
            <span className="text-[5.5rem] drop-shadow-sm transition duration-700 group-hover:scale-110 sm:text-8xl" aria-hidden="true">
              {p.emoji}
            </span>
          )}
          {!available && <span className="absolute left-0 top-4 bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-charcoal">Coming soon</span>}
          <span className="absolute inset-x-0 bottom-0 translate-y-full bg-white/90 py-3 text-sm font-medium text-charcoal transition duration-300 group-hover:translate-y-0">
            {available ? "Order now" : "Notify me"}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-charcoal sm:text-[1.35rem]">{p.name}</h3>
        <p className="mt-1 text-sm font-light text-muted">{available && p.price ? `₹${p.price.toLocaleString("en-IN")}` : "Launching soon"}</p>
        {showDescription && <p className="mx-auto mt-2 max-w-xs text-sm font-light text-muted">{p.description}</p>}
      </a>
    </Reveal>
  );
}
