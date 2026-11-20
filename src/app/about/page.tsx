import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MountainScene from "@/components/MountainScene";
import Reveal from "@/components/Reveal";
import Socials from "@/components/Socials";
import { ArrowRightIcon, MapPinIcon, YouTubeIcon } from "@/components/icons";
import { JsonLd, SectionHeading } from "@/components/ui";
import { site } from "@/data/site";
import { garage, places, timeline } from "@/data/videos";
import { compactNumber } from "@/lib/format";
import { breadcrumbSchema, faqSchema, graph, profilePageSchema } from "@/lib/schema";
import { getChannelStats, watchUrl } from "@/lib/youtube";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "About Krrish Tapwal — Himachali Explorer from Sarkaghat",
  description:
    "Who is Krrish Tapwal? Himachali explorer & YouTuber from Sarkaghat, Mandi (Himachal Pradesh), creator of XploreWithKrrish — treks, temples, hidden gems, Royal Enfield rides and real life stories.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Krrish Tapwal", description: site.shortBio },
};

const faqs = [
  {
    q: "Who is Krrish Tapwal?",
    a: `Krrish Tapwal (also known as Krizz Tapwal) is a Himachali explorer and YouTuber from Himachal Pradesh, India. He creates travel, trekking, temple and ride videos on his YouTube channel ${site.brand} (${site.youtube.handle}).`,
  },
  {
    q: "Where is Krrish Tapwal from?",
    a: "Krrish Tapwal is from Himachal Pradesh, India — his videos focus on the Sarkaghat and Mandi region, including Kamlah Fort, Kanchana Mata Mandir (Anantpur Garh), Awahdevi and Chandpur.",
  },
  {
    q: "What is Krrish Tapwal's YouTube channel?",
    a: `His YouTube channel is ${site.brand} — ${site.youtube.url}. It started in March 2020 and features Himachal travel vlogs, treks, hidden temples, Royal Enfield Meteor 350 rides and the Mahindra Scorpio Classic S11.`,
  },
  {
    q: "Which bike and car does Krrish Tapwal ride?",
    a: "Krrish rides a Royal Enfield Meteor 350 Fireball Black and drives a Mahindra Scorpio Classic S11 — both are featured in his videos and shorts.",
  },
  {
    q: "How can I collaborate with Krrish Tapwal?",
    a: "For collaborations, brand deals and travel features, reach out through his YouTube channel or the social links on this website.",
  },
];

export default async function AboutPage() {
  const live = await getChannelStats();
  return (
    <>
      <JsonLd
        data={graph(
          profilePageSchema("/about", "About Krrish Tapwal"),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          faqSchema(faqs),
        )}
      />

      {/* Header */}
      <section className="grain relative isolate overflow-hidden pb-24 pt-32 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_0%,rgb(125_190_120/0.12),transparent_70%)]" />
        <MountainScene className="absolute inset-x-0 bottom-0 -z-10 h-56 w-full opacity-70" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="eyebrow">About me</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-7xl">
              Main hoon <span className="text-gradient">Krrish Tapwal.</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl text-mist">{site.shortBio}</p>
            <p className="mt-6 inline-flex items-center gap-2 text-mist">
              <MapPinIcon className="text-moss" /> {site.location.area}, {site.location.region}, {site.location.country}
            </p>
            <Socials className="mt-8" />
          </Reveal>
          <Reveal delay={150} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-5 -z-10 rounded-full bg-white/10 blur-3xl" />
            <div className="relative aspect-square overflow-hidden rounded-full border-4 border-night-3">
              <Image src="/images/krrish-tapwal-portrait.jpg" alt="Portrait of Krrish Tapwal in Himachal Pradesh" fill priority quality={90} sizes="384px" className="object-cover object-top" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">My story</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight">Pahadon se pyaar, camera se kahani.</h2>
            <dl className="mt-10 grid grid-cols-2 gap-4">
              {[
                { k: "Views", v: compactNumber(live.views) },
                { k: "Subscribers", v: compactNumber(live.subscribers) },
                { k: "Uploads", v: `${live.videos}+` },
                { k: "Since", v: `${site.stats.since}` },
              ].map((s) => (
                <div key={s.k} className="card p-5">
                  <dt className="text-xs text-fog">{s.k}</dt>
                  <dd className="mt-1 font-display text-3xl font-bold">{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-fog">Live YouTube stats · har 15 minute mein update</p>
          </Reveal>
          <div className="space-y-6 text-lg leading-relaxed text-mist">
            {site.longBio.map((para, i) => (
              <Reveal key={i} delay={i * 80} as="p" className={i === 0 ? "text-xl text-snow first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-moss" : ""}>
                {para}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explored + Garage */}
      <section className="container-x py-16 md:py-24">
        <SectionHeading eyebrow="Explored" title="Places & machines" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 80} className="card p-6">
              <p className="inline-flex items-center gap-1.5 text-sm text-moss">
                <MapPinIcon width={14} height={14} /> {p.area}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-2 text-mist">{p.note}</p>
              <a href={watchUrl(p.videoId)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage">
                Watch <ArrowRightIcon width={14} height={14} />
              </a>
            </Reveal>
          ))}
          {garage.map((g, i) => (
            <Reveal key={g.name} delay={(i % 3) * 80} className="card p-6">
              <p className="text-sm text-moss">🏍️ {g.variant}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{g.name}</h3>
              <p className="mt-2 text-mist">{g.note}</p>
              <a href={watchUrl(g.videoId)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage">
                Watch <ArrowRightIcon width={14} height={14} />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-x py-16 md:py-24">
        <SectionHeading eyebrow="Timeline" title="Ab tak ka safar" />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {timeline.map((t, i) => (
            <Reveal key={t.title} as="li" delay={(i % 3) * 80} className="card relative p-6">
              <span className="font-display text-5xl font-extrabold text-white/5">{String(i + 1).padStart(2, "0")}</span>
              <p className="-mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-moss">{t.date}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{t.title}</h3>
              <p className="mt-1 text-mist">{t.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="container-x py-16 md:py-24" aria-labelledby="faq-title">
        <SectionHeading eyebrow="FAQ" title={<span id="faq-title">Krrish Tapwal ke baare mein sawaal</span>} />
        <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-moss transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-mist">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Collab CTA */}
      <section className="container-x pt-8">
        <Reveal className="card flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Collab ya brand deal?</h2>
            <p className="mt-2 max-w-xl text-mist">Himachal travel, tourism, auto aur lifestyle brands ke saath kaam karne ke liye ready hoon.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {site.email ? (
              <a href={`mailto:${site.email}`} className="btn btn-primary">Email me</a>
            ) : (
              <a href={site.youtube.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <YouTubeIcon /> Reach out on YouTube
              </a>
            )}
            <Link href="/videos" className="btn btn-ghost">See my work</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
