import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { PlayIcon } from "@/components/icons";
import { JsonLd, SectionTitle, ShortCard, VideoTile } from "@/components/ui";
import { products } from "@/data/shop";
import { site } from "@/data/site";
import { places } from "@/data/videos";
import { compactNumber } from "@/lib/format";
import { graph, profilePageSchema, videoSchema } from "@/lib/schema";
import { getChannelContent, getChannelProfileImage, getChannelStats, thumb, watchUrl } from "@/lib/youtube";

// Har 15 minute mein YouTube se nayi videos + stats refresh (ISR)
export const revalidate = 900;

export const metadata: Metadata = {
  title: "Himachal Explorer, CSE Engineer & Data Scientist",
  description:
    "Explore Himachal with Krrish Tapwal, a CSE engineer and data scientist — discover hidden trails, historic temples, mountain journeys, and stories on XploreWithKrrish.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: "Krrish Tapwal — Himachal Travel Vlogs & Adventures",
    description: "Hidden trails, sacred temples, old forts and mountain rides across Himachal Pradesh with XploreWithKrrish.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krrish Tapwal — Himachali Explorer",
    description: "Explore hidden places and real stories from Himachal Pradesh.",
  },
};

/** Gallery photos (video thumbnails) with a backdrop colour that shows while loading */
const galleryShots = [
  { id: places[0].videoId, label: places[0].name, bg: "bg-teal" },
  { id: places[1].videoId, label: places[1].name, bg: "bg-coral" },
  { id: "sY2h1Gsx_ZI", label: "Morning ride, Meteor 350", bg: "bg-teal" },
  { id: "xcYFq7LX7Is", label: "Diwali at home", bg: "bg-leaf" },
  { id: places[2].videoId, label: places[2].name, bg: "bg-violet" },
  { id: "4sH-hzEphD4", label: "My first MIS role", bg: "bg-mustard" },
  { id: places[3].videoId, label: places[3].name, bg: "bg-mustard" },
];

export default async function HomePage() {
  const [{ videos, shorts }, live, profileImage] = await Promise.all([getChannelContent(), getChannelStats(), getChannelProfileImage()]);
  const [featured, ...rest] = videos;
  const strip = rest.slice(0, 4);
  const instaHandle = site.socials.instagram ? `@${site.socials.instagram.replace(/\/+$/, "").split("/").pop()}` : site.youtube.handle;
  const followHref = site.socials.instagram || site.youtube.subscribeUrl;

  const stats = [
    { value: compactNumber(live.views), label: "Views" },
    { value: compactNumber(live.subscribers), label: "Subscribers" },
    { value: `${live.videos}+`, label: "Uploads" },
    { value: `${site.stats.since}`, label: "Since" },
  ];

  return (
    <>
      <JsonLd data={graph(profilePageSchema("/", `${site.name} — Official Website`), ...videos.slice(0, 6).map(videoSchema))} />

      {/* ================= HERO ================= */}
      <section className="bg-[linear-gradient(to_bottom,var(--color-paper)_0,var(--color-paper)_58%,var(--color-coral)_58%)]" aria-labelledby="hero-title">
        <div className="container-x">
          <div className="relative grid overflow-hidden bg-[radial-gradient(70%_80%_at_62%_30%,#4a4a4a_0%,#303030_55%,#262626_100%)] text-white lg:min-h-[38rem] lg:grid-cols-[1fr_1.15fr]">
            {/* Photo */}
            <div className="relative aspect-[4/3] lg:order-2 lg:aspect-auto">
              <Image
                src="/images/krrish-tapwal.jpg"
                alt={`${site.name} standing above a Himalayan lake in Himachal Pradesh`}
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-[78%_35%] [mask-image:linear-gradient(to_top,transparent,#000_35%)] lg:[mask-image:linear-gradient(to_right,transparent,#000_30%)]"
              />
            </div>

            {/* Copy */}
            <div className="relative z-10 flex flex-col justify-center px-6 pb-12 pt-2 sm:px-10 lg:order-1 lg:py-20 lg:pl-20 lg:pr-0">
              <Reveal>
                <h1 id="hero-title" className="text-[clamp(3rem,10vw,5.9rem)] font-bold uppercase leading-[0.95] tracking-tight">
                  {site.firstName}
                  <br />
                  {site.lastName}
                </h1>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-6 text-2xl font-semibold text-coral sm:text-[2.1rem]">{site.role}</p>
                <p className="mt-2 text-sm font-medium tracking-wide text-white/70">Computer Science Engineer · Data Scientist</p>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-sm text-[0.95rem] font-extralight leading-relaxed text-white/95">
                  Field notes from Himachal Pradesh — hidden trails, historic temples, forgotten forts, and the mountain roads in between.
                </p>
              </Reveal>
              <Reveal delay={200} className="mt-9">
                <a href="#videos" className="btn btn-coral !px-8">
                  Watch Me <PlayIcon width={14} height={14} />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THIS IS ME (coral band) ================= */}
      <section className="overflow-hidden bg-coral text-white" aria-labelledby="about-title">
        <div className="container-x grid items-end gap-8 pt-16 md:pt-24 lg:grid-cols-[1fr_1.3fr_1fr] lg:gap-10">
          <div className="duotone relative order-2 hidden aspect-[3/4] lg:order-1 lg:block">
            <Image src={profileImage} alt={`Portrait of ${site.name}`} fill sizes="25vw" className="object-cover object-top" />
          </div>

          <Reveal className="order-1 pb-4 text-center lg:order-2 lg:pb-24">
            <h2 id="about-title" className="text-4xl font-bold sm:text-5xl">
              This is Me!
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[0.95rem] font-extralight leading-relaxed">{site.longBio[0]}</p>
            <p className="mx-auto mt-4 max-w-lg text-[0.95rem] font-extralight leading-relaxed">{site.longBio[1]}</p>
            <dl className="mx-auto mt-9 grid max-w-md grid-cols-4 gap-2">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="text-2xl font-bold tabular-nums sm:text-3xl">{s.value}</dd>
                  <dt className="mt-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-white/80">{s.label}</dt>
                </div>
              ))}
            </dl>
            <Link href="/about" className="btn btn-light mt-9">
              More About Me
            </Link>
          </Reveal>

          <div className="order-3 grid grid-cols-2 gap-4 lg:block">
            <div className="duotone relative aspect-[3/4] lg:hidden">
              <Image src={profileImage} alt="" fill sizes="50vw" className="object-cover object-top" />
            </div>
            <div className="duotone relative aspect-[3/4]">
              <Image src={thumb("QHAmMv4mdRE", "hq")} alt={`${site.name} on the trail to Kanchana Mata Temple`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="scale-[1.34] object-cover object-[35%_center]" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section id="gallery" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="gallery-title">
        <div className="container-x">
          <SectionTitle id="gallery-title">My Best Side</SectionTitle>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {galleryShots.slice(0, 1).map((g) => (
              <GalleryTile key={g.id} {...g} />
            ))}
            <a
              href={followHref}
              target="_blank"
              rel="noopener noreferrer me"
              className="group flex aspect-square flex-col items-center justify-center bg-coral p-4 text-center text-white transition hover:bg-coral-dark"
            >
              <span className="text-2xl font-semibold sm:text-[1.7rem]">Follow Me</span>
              <span className="my-3 h-[3px] w-8 bg-white" />
              <span className="break-all text-sm font-semibold">{instaHandle}</span>
            </a>
            {galleryShots.slice(1).map((g) => (
              <GalleryTile key={g.id} {...g} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= VIDEOS ================= */}
      <section id="videos" className="scroll-mt-24" aria-labelledby="videos-title">
        <div className="container-x">
          <SectionTitle id="videos-title">My Videos</SectionTitle>
        </div>
        {featured && <YouTubeEmbed id={featured.id} title={featured.title} heading={featured.title} />}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {strip.map((v) => (
            <VideoTile key={v.id} video={v} />
          ))}
        </div>
        <div className="container-x mt-10 text-center">
          <Link href="/videos" className="btn btn-coral !px-10">
            All Videos
          </Link>
        </div>

        {/* Shorts */}
        <div className="container-x mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h3 className="text-2xl font-bold sm:text-3xl">Shorts</h3>
            <Link href="/videos#shorts" className="text-sm font-semibold text-coral hover:underline">
              See all
            </Link>
          </div>
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-[max(2.5rem,calc((100vw_-_80rem)/2_+_2.5rem))]">
          {shorts.slice(0, 10).map((s) => (
            <ShortCard key={s.id} short={s} className="w-40 sm:w-48" />
          ))}
        </div>
      </section>

      {/* ================= MERCH ================= */}
      <section className="py-20 md:py-28" aria-labelledby="shop-title">
        <div className="container-x">
          <SectionTitle id="shop-title" intro="XploreWithKrrish merchandise and locally sourced Himachali products — launching soon.">
            Krrish&apos;s Merch Store
          </SectionTitle>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {products.slice(0, 4).map((p, i) => (
              <ProductCard key={p.slug} product={p} delay={i * 80} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/shop" className="btn btn-coral !px-12">
              Shop All
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function GalleryTile({ id, label, bg }: { id: string; label: string; bg: string }) {
  return (
    <a href={watchUrl(id)} target="_blank" rel="noopener noreferrer" className={`group relative block aspect-square overflow-hidden ${bg}`}>
      <Image src={thumb(id, "hq")} alt={label} fill sizes="(min-width: 768px) 25vw, 50vw" className="scale-[1.34] object-cover transition duration-700 group-hover:scale-[1.42]" />
      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-4 opacity-0 transition group-hover:opacity-100">
        <span className="text-sm font-semibold text-white">{label}</span>
      </span>
    </a>
  );
}
