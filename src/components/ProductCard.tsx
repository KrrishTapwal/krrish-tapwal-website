import Image from "next/image";
import type { Product } from "@/data/shop";
import { site } from "@/data/site";
import { ArrowUpRightIcon, BellIcon } from "./icons";
import Reveal from "./Reveal";

const tones: Record<Product["tone"], string> = {
  moss: "from-moss/25 via-moss/5 to-transparent",
  pine: "from-pine/50 via-pine/10 to-transparent",
  snow: "from-snow/15 via-white/5 to-transparent",
  dusk: "from-white/10 via-white/[0.03] to-transparent",
};

function notifyHref(p: Product) {
  const msg = `Hi Krrish, I'm interested in "${p.name}". Please let me know when it launches.`;
  if (site.socials.whatsapp) return `${site.socials.whatsapp}${site.socials.whatsapp.includes("?") ? "&" : "?"}text=${encodeURIComponent(msg)}`;
  if (site.email) return `mailto:${site.email}?subject=${encodeURIComponent(`Notify me: ${p.name}`)}&body=${encodeURIComponent(msg)}`;
  if (site.socials.instagram) return site.socials.instagram;
  return site.youtube.subscribeUrl;
}

export default function ProductCard({ product: p, delay = 0 }: { product: Product; delay?: number }) {
  const available = p.status === "available";
  const href = available && p.buyUrl ? p.buyUrl : notifyHref(p);
  return (
    <Reveal delay={delay} as="article" className="card group relative flex flex-col overflow-hidden p-2">
      <div className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.1rem] bg-gradient-to-br ${tones[p.tone]} bg-night-2`}>
        {p.image ? (
          <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <span className="text-7xl transition duration-700 group-hover:-rotate-6 group-hover:scale-110" aria-hidden="true">
            {p.emoji}
          </span>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            available ? "bg-moss text-ink" : "border border-white/15 bg-ink/60 text-sage backdrop-blur"
          }`}
        >
          {available ? "Available" : "Coming soon"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fog">{p.category}</p>
        <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
        <p className="mt-2 flex-1 text-sm text-mist">{p.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-display text-lg font-bold">{available && p.price ? `₹${p.price.toLocaleString("en-IN")}` : "—"}</span>
          <a href={href} target="_blank" rel="noopener noreferrer" className={`btn ${available ? "btn-primary" : "btn-ghost"} !px-4 !py-2.5 text-sm`}>
            {available ? (
              <>
                Order now <ArrowUpRightIcon width={16} height={16} />
              </>
            ) : (
              <>
                <BellIcon width={16} height={16} /> Notify me
              </>
            )}
          </a>
        </div>
      </div>
    </Reveal>
  );
}
