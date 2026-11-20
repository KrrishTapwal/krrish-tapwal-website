import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Socials from "@/components/Socials";
import { MapPinIcon } from "@/components/icons";
import { JsonLd, PageHero, PlayLabel, SectionTitle } from "@/components/ui";
import { site } from "@/data/site";
import { garage, places, timeline } from "@/data/videos";
import { compactNumber } from "@/lib/format";
import { breadcrumbSchema, faqSchema, graph, profilePageSchema } from "@/lib/schema";
import { getChannelProfileImage, getChannelStats, thumb, watchUrl } from "@/lib/youtube";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "About — CSE Engineer & Data Scientist",
  description:
    "Meet Krrish Tapwal: a Himachal-based explorer, Computer Science Engineering professional, and data scientist sharing travel stories through XploreWithKrrish.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Krrish Tapwal", description: site.shortBio },
};

const faqs = [
  {
    q: "Who is Krrish Tapwal?",
    a: `Krrish Tapwal (also known as Krizz Tapwal) is a Himachal-based explorer, Computer Science Engineering professional, data scientist, and creator of ${site.brand} on YouTube (${site.youtube.handle}).`,
  },
  {
    q: "Where is Krrish Tapwal from?",
    a: "Krrish Tapwal is from Himachal Pradesh, India. His videos feature the Sarkaghat and Mandi region, including Kamlah Fort, Kanchana Mata Temple at Anantpur Garh, Awahdevi, and Chandpur.",
  },
  {
    q: "What is Krrish Tapwal's YouTube channel?",
    a: `His YouTube channel is ${site.brand} — ${site.youtube.url}. Launched in March 2020, it features Himachal travel, treks, historic temples, Royal Enfield Meteor 350 rides, and the Mahindra Scorpio Classic S11.`,
  },
  {
    q: "Which bike and car does Krrish Tapwal ride?",
    a: "Krrish rides a Royal Enfield Meteor 350 Fireball Black and drives a Mahindra Scorpio Classic S11, both featured in his videos.",
  },
  {
    q: "How can I collaborate with Krrish Tapwal?",
    a: "For collaborations, brand partnerships, and travel features, get in touch through his YouTube channel or the social links on this website.",
  },
];

const tileColors = ["bg-teal", "bg-coral", "bg-violet", "bg-leaf", "bg-mustard", "bg-teal"];

export default async function AboutPage() {
  const [live, profileImage] = await Promise.all([getChannelStats(), getChannelProfileImage()]);
  const stats = [
    { k: "Views", v: compactNumber(live.views) },
    { k: "Subscribers", v: compactNumber(live.subscribers) },
    { k: "Uploads", v: `${live.videos}+` },
    { k: "Since", v: `${site.stats.since}` },
  ];

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

      <PageHero
        title={
          <>
            About
            <br />
            {site.name}
          </>
        }
        subtitle={site.role}
        aside={
          <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-full border-[6px] border-coral">
            <Image src={profileImage} alt="Current YouTube profile photo of Krrish Tapwal" fill priority sizes="320px" className="object-cover object-top" />
          </div>
        }
      >
        <p>{site.shortBio}</p>
        <p className="mt-4 inline-flex items-center gap-2 font-normal text-white/80">
          <MapPinIcon width={16} height={16} className="text-coral" /> {site.location.area}, {site.location.region}, {site.location.country}
        </p>
      </PageHero>

      {/* Story + stats (coral band) */}
      <section className="bg-coral pb-20 text-white md:pb-28">
        <div className="container-x grid gap-12 pt-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl font-bold sm:text-5xl">My Story</h2>
            <dl className="mt-10 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.k} className="bg-white/10 p-5">
                  <dd className="text-3xl font-bold tabular-nums">{s.v}</dd>
                  <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-white/80">{s.k}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-white/75">Live YouTube statistics · refreshed every 15 minutes</p>
            <Socials variant="light" className="mt-8" />
          </Reveal>
          <div className="space-y-5 text-[0.98rem] font-extralight leading-relaxed">
            {site.longBio.map((para, i) => (
              <Reveal key={i} delay={i * 70} as="p" className={i === 0 ? "text-lg font-light" : ""}>
                {para}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Places explored */}
      <section className="py-20 md:py-28" aria-labelledby="places-title">
        <div className="container-x">
          <SectionTitle id="places-title" intro="Remarkable places across Mandi and Sarkaghat, from historic forts to hilltop temples.">
            Places I&apos;ve Explored
          </SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {places.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 80} as="article">
                <a href={watchUrl(p.videoId)} target="_blank" rel="noopener noreferrer" className={`group relative block aspect-video overflow-hidden ${tileColors[i]}`}>
                  <Image src={thumb(p.videoId, "hq")} alt={`${p.name}, ${p.area}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-charcoal/50 transition group-hover:bg-charcoal/35" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-white">
                    <span className="text-2xl font-bold sm:text-3xl">{p.name}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-light">
                      <MapPinIcon width={14} height={14} /> {p.area}
                    </span>
                    <span className="mt-3">
                      <PlayLabel label="Watch the Journey" />
                    </span>
                  </span>
                </a>
                <p className="mt-3 text-sm text-muted">{p.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Garage */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="garage-title">
        <div className="container-x">
          <SectionTitle id="garage-title">The Garage</SectionTitle>
          <div className="grid gap-8 md:grid-cols-2">
            {garage.map((g, i) => (
              <Reveal key={g.name} delay={i * 90} as="article" className="text-center">
                <a href={watchUrl(g.videoId)} target="_blank" rel="noopener noreferrer" className={`group relative block aspect-video overflow-hidden ${i ? "bg-teal" : "bg-coral"}`}>
                  <Image src={thumb(g.videoId, "hq")} alt={`${g.name} ${g.variant}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </a>
                <h3 className="mt-5 text-2xl font-semibold">{g.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-coral">{g.variant}</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{g.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28" aria-labelledby="journey-title">
        <div className="container-x">
          <SectionTitle id="journey-title">The Journey So Far</SectionTitle>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal key={t.title} as="li" delay={(i % 4) * 70} className={`p-6 text-white ${["bg-coral", "bg-teal", "bg-violet", "bg-charcoal"][i % 4]}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">{t.date}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug">{t.title}</h3>
                <p className="mt-2 text-sm font-light text-white/90">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 md:pb-28" aria-labelledby="faq-title">
        <div className="container-x">
          <SectionTitle id="faq-title">Questions About Me</SectionTitle>
          <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-coral text-white transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/videos" className="btn btn-coral !px-10">
              Watch My Videos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
