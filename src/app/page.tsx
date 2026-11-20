import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MountainScene from "@/components/MountainScene";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { ArrowRightIcon, ArrowUpRightIcon, BikeIcon, MapPinIcon, MountainIcon, PlayIcon, SparkIcon, TempleIcon, YouTubeIcon } from "@/components/icons";
import { JsonLd, SectionHeading, ShortCard, VideoCard } from "@/components/ui";
import { products } from "@/data/shop";
import { site } from "@/data/site";
import { garage, places, timeline } from "@/data/videos";
import { compactNumber, formatDate } from "@/lib/format";
import { graph, profilePageSchema, videoSchema } from "@/lib/schema";
import { getChannelContent, getChannelStats, thumb, watchUrl } from "@/lib/youtube";

// Har 15 minute mein YouTube se nayi videos + stats refresh (ISR)
export const revalidate = 900;

export const metadata: Metadata = {
  title: "Krrish Tapwal — Himachali Explorer & XploreWithKrrish YouTuber",
  description:
    "Explore Himachal with Krrish Tapwal — hidden treks, ancient temples, forts, Royal Enfield rides and real travel stories on XploreWithKrrish.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: "Krrish Tapwal — Himachal Travel Vlogs & Adventures",
    description:
      "Hidden trails, sacred temples, old forts and mountain rides across Himachal Pradesh with XploreWithKrrish.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krrish Tapwal — Himachali Explorer",
    description: "Explore hidden places and real stories from Himachal Pradesh.",
  },
};

const pillars = [
  { Icon: MountainIcon, title: "Treks & Trails", text: "Gaon ki pagdandiyon se pahadon ki chotiyon tak — har trek ek nayi kahani." },
  { Icon: TempleIcon, title: "Temples & Hidden Gems", text: "Himachal ke woh mandir aur qile jo Google Maps par bhi mushkil se milte hain." },
  { Icon: BikeIcon, title: "Rides & Road Trips", text: "Meteor 350 ki morning rides aur Bengaluru se Himachal jaisi lambi road trips." },
  { Icon: SparkIcon, title: "Real Life Stories", text: "Job, struggle, family aur tyohaar — camera ke peeche ki asli zindagi." },
];

const marqueeItems = ["Sarkaghat", "Mandi", "Kamlah Fort", "Kanchana Mata", "Anantpur Garh", "Awahdevi", "Chandpur", "Baba Kamlahiya", "Himachal Pradesh"];

export default async function HomePage() {
  const [{ videos, shorts }, live] = await Promise.all([getChannelContent(), getChannelStats()]);
  const [featured, ...rest] = videos;
  const latest = rest.slice(0, 6);
  const totalShortViews = shorts.reduce((s, x) => s + (x.views ?? 0), 0);

  const stats = [
    { value: compactNumber(live.views), label: "Channel views" },
    { value: compactNumber(live.subscribers), label: "Subscribers" },
    { value: `${live.videos}+`, label: "Videos & shorts" },
    { value: `${site.stats.since}`, label: "Creating since" },
  ];

  return (
    <>
      <JsonLd data={graph(profilePageSchema("/", `${site.name} — Official Website`), ...videos.slice(0, 6).map(videoSchema))} />

      {/* ================= HERO ================= */}
      <section className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden pb-40 pt-28 md:pt-32" aria-labelledby="hero-title">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_10%,rgb(125_190_120/0.13),transparent_70%),radial-gradient(50%_40%_at_10%_20%,rgb(255_255_255/0.07),transparent_70%)]" />
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="absolute size-[2px] animate-twinkle rounded-full bg-snow"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 23) % 45}%`, animationDelay: `${(i % 7) * 0.6}s` }}
            />
          ))}
        </div>
        <MountainScene className="absolute inset-x-0 bottom-0 -z-10 h-[46%] w-full" />

        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Reveal>
              <p className="eyebrow">{site.role}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 id="hero-title" className="mt-6 text-[clamp(3.6rem,12vw,8.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">
                Krrish
                <br />
                <span className="text-gradient">Tapwal</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist sm:text-xl">
                Himachal Pradesh ka pahadi explorer. Hidden trails, purane mandir, bhoole hue qile aur pahadi roads par rides —{" "}
                <span className="text-snow">raw, real aur thrilling</span> kahaniyan, {site.brand} par.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-9 flex flex-wrap gap-3">
              <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <YouTubeIcon /> Subscribe on YouTube
              </a>
              <Link href="/videos" className="btn btn-ghost">
                <PlayIcon width={16} height={16} /> Watch videos
              </Link>
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs text-fog">{s.label}</dt>
                    <dd className="mt-1 font-display text-3xl font-bold tabular-nums">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-white/10 blur-3xl" />
            <div className="relative aspect-[4/5] rotate-[1.5deg] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60 transition duration-700 hover:rotate-0">
              <Image
                src="/images/krrish-tapwal.jpg"
                alt="Krrish Tapwal standing above a Himalayan lake in Himachal Pradesh"
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-[72%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                <div>
                  <p className="font-display text-xl font-bold">{site.name}</p>
                  <p className="text-sm text-mist">{site.youtube.handle}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
                  <MapPinIcon width={14} height={14} className="text-moss" /> {site.location.region}
                </span>
              </div>
            </div>
            <div className="absolute -left-4 top-10 hidden animate-float rounded-2xl border border-line bg-night/90 px-4 py-3 shadow-xl backdrop-blur sm:block">
              <p className="text-xs text-fog">Top short</p>
              <p className="font-display text-xl font-bold text-sage">35K+ views</p>
            </div>
            <div className="absolute -right-3 bottom-24 hidden animate-float rounded-2xl border border-line bg-night/90 px-4 py-3 shadow-xl backdrop-blur [animation-delay:1.5s] sm:block">
              <p className="text-xs text-fog">Shorts views</p>
              <p className="font-display text-xl font-bold">{compactNumber(totalShortViews)}+</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="relative overflow-hidden border-y border-line bg-night py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl font-semibold text-fog sm:text-3xl">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m} <span className="text-moss">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= ABOUT TEASER ================= */}
      <section className="container-x py-24 md:py-32" aria-labelledby="about-title">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Who is Krrish Tapwal?</p>
            <h2 id="about-title" className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Ek pahadi banda, ek camera, aur <span className="text-moss">Himachal ki anginat kahaniyan.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-mist">{site.longBio[0]}</p>
            <p className="mt-4 text-lg leading-relaxed text-mist">{site.longBio[1]}</p>
            <Link href="/about" className="btn btn-ghost mt-8">
              Meri poori kahani <ArrowRightIcon width={18} height={18} />
            </Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90} className="card group p-6 transition duration-500 hover:-translate-y-1 hover:border-moss/30">
                <span className="grid size-12 place-items-center rounded-2xl bg-moss/10 text-moss transition group-hover:bg-moss group-hover:text-ink">
                  <Icon width={24} height={24} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-mist">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED + LATEST ================= */}
      <section className="container-x py-12 md:py-20" aria-labelledby="latest-title">
        <SectionHeading
          eyebrow="Latest on YouTube"
          title={<span id="latest-title">Fresh from the mountains</span>}
          intro="Seedha website par dekho — ya YouTube par jaa kar like, comment aur subscribe karo."
          action={{ href: "/videos", label: "All videos" }}
        />
        {featured && (
          <Reveal className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
            <YouTubeEmbed id={featured.id} title={featured.title} />
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-moss/10 px-3 py-1 text-xs font-semibold text-moss">
                <span className="size-1.5 animate-pulse rounded-full bg-moss" /> Newest upload
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight">{featured.title}</h3>
              <p className="mt-3 text-mist">{featured.description}</p>
              <p className="mt-4 text-sm text-fog">
                <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                {featured.duration ? ` · ${featured.duration}` : ""}
              </p>
              <a href={watchUrl(featured.id)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6">
                Watch on YouTube <ArrowUpRightIcon width={16} height={16} />
              </a>
            </div>
          </Reveal>
        )}
        <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((v, i) => (
            <VideoCard key={v.id} video={v} delay={(i % 3) * 90} />
          ))}
        </div>
      </section>

      {/* ================= SHORTS ================= */}
      <section className="py-20 md:py-28" aria-labelledby="shorts-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Shorts"
            title={<span id="shorts-title">60 seconds of Himachal</span>}
            intro={`${compactNumber(totalShortViews)}+ views across shorts — Scorpio, Royal Enfield, mandir aur monsoon.`}
            action={{ href: "/videos#shorts", label: "All shorts" }}
          />
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]">
          {shorts.slice(0, 12).map((s) => (
            <ShortCard key={s.id} short={s} />
          ))}
        </div>
      </section>

      {/* ================= PLACES ================= */}
      <section className="container-x py-20 md:py-28" aria-labelledby="places-title">
        <SectionHeading
          eyebrow="Hidden Himachal"
          title={<span id="places-title">Jagahein jo maine explore ki</span>}
          intro="Mandi aur Sarkaghat ke woh hidden gems jo har traveller ki list mein hone chahiye."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {places.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 100} as="article" className="group relative min-h-80 overflow-hidden rounded-3xl border border-line">
              <Image src={thumb(p.videoId, "hq")} alt={`${p.name}, ${p.area} — Himachal Pradesh`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
              <div className="relative flex h-full min-h-80 flex-col justify-end p-7">
                <span className="font-display text-sm font-bold text-moss">0{i + 1}</span>
                <h3 className="mt-1 font-display text-3xl font-bold">{p.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-mist">
                  <MapPinIcon width={14} height={14} /> {p.area}
                </p>
                <p className="mt-3 max-w-md text-snow/85">{p.note}</p>
                <a href={watchUrl(p.videoId)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sage transition hover:gap-3">
                  Watch the journey <ArrowRightIcon width={16} height={16} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= GARAGE + TIMELINE ================= */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="The Garage" title="Machines behind the miles" />
            <div className="space-y-5">
              {garage.map((g, i) => (
                <Reveal key={g.name} delay={i * 100} as="article" className="card group grid grid-cols-[8rem_1fr] items-center gap-5 p-3 sm:grid-cols-[11rem_1fr]">
                  <div className="relative aspect-video overflow-hidden rounded-2xl">
                    <Image src={thumb(g.videoId, "mq")} alt={`${g.name} ${g.variant}`} fill sizes="176px" className="object-cover transition duration-700 group-hover:scale-110" />
                  </div>
                  <div className="pr-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{g.variant}</p>
                    <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">{g.name}</h3>
                    <p className="mt-1 text-sm text-mist">{g.note}</p>
                    <a href={watchUrl(g.videoId)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sage">
                      Watch <ArrowUpRightIcon width={14} height={14} />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="The Journey" title="Ab tak ka safar" />
            <ol className="relative space-y-8 border-l border-line pl-8">
              {timeline.map((t, i) => (
                <Reveal key={t.title} delay={i * 60} as="li" className="relative">
                  <span className="absolute -left-[2.3rem] top-1.5 size-3 rounded-full border-2 border-moss bg-ink" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{t.date}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1 text-mist">{t.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= SHOP TEASER ================= */}
      <section className="container-x py-20 md:py-28" aria-labelledby="shop-title">
        <SectionHeading
          eyebrow="Krrish Store · Coming soon"
          title={<span id="shop-title">Pahadon se, seedha aapke ghar</span>}
          intro="XploreWithKrrish merch, pahadi desi ghee aur Himachali goodies — jaldi aa rahe hain."
          action={{ href: "/shop", label: "Visit the store" }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p, i) => (
            <ProductCard key={p.slug} product={p} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container-x pb-8 pt-12">
        <Reveal className="grain relative isolate overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-pine/40 via-night-2 to-night px-6 py-16 text-center sm:px-12 md:py-24">
          <MountainScene className="absolute inset-x-0 bottom-0 -z-10 h-1/2 w-full opacity-60" variant="footer" />
          <p className="eyebrow justify-center">Join the journey</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-6xl">Agla adventure aapke saath ho?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mist">Subscribe karo, bell icon dabao — aur Himachal ki har nayi kahani sabse pehle dekho.</p>
          <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-9 !px-7 !py-4 text-base">
            <YouTubeIcon /> Subscribe to {site.brand}
          </a>
        </Reveal>
      </section>
    </>
  );
}
