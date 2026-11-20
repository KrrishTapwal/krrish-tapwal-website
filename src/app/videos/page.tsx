import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import VideoGrid from "@/components/VideoGrid";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { YouTubeIcon } from "@/components/icons";
import { JsonLd, ShortCard } from "@/components/ui";
import { site } from "@/data/site";
import { compactNumber } from "@/lib/format";
import { breadcrumbSchema, graph, videoSchema } from "@/lib/schema";
import { getChannelContent, getChannelStats } from "@/lib/youtube";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Videos — Krrish Tapwal YouTube Vlogs, Treks & Shorts",
  description:
    "Watch all videos by Krrish Tapwal (XploreWithKrrish): Himachal travel vlogs, Kamlah Fort, Kanchana Mata Mandir, Awahdevi, Bengaluru to Himachal road trip, Royal Enfield Meteor 350, Scorpio Classic S11 and shorts.",
  alternates: { canonical: "/videos" },
  openGraph: { url: "/videos", title: "Videos by Krrish Tapwal", description: "Himachal travel vlogs, treks, temples, rides & shorts." },
};

export default async function VideosPage() {
  const [{ videos, shorts }, live] = await Promise.all([getChannelContent(), getChannelStats()]);
  const [featured] = videos;

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Videos", path: "/videos" },
          ]),
          {
            "@type": "ItemList",
            name: "Videos by Krrish Tapwal",
            itemListElement: videos.map((v, i) => ({ "@type": "ListItem", position: i + 1, item: videoSchema(v) })),
          },
        )}
      />

      <section className="relative isolate overflow-hidden pb-12 pt-32 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_20%_0%,rgb(125_190_120/0.11),transparent_70%)]" />
        <div className="container-x">
          <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">{site.brand}</p>
              <h1 className="mt-5 text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-7xl">
                Videos <span className="text-gradient">&amp; Shorts</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-mist">
                {videos.length} long videos, {shorts.length} shorts aur {compactNumber(live.views)}+ views — Himachal ki har kahani, ek jagah.
              </p>
            </div>
            <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary self-start md:self-auto">
              <YouTubeIcon /> Subscribe
            </a>
          </Reveal>
          {featured && (
            <Reveal delay={120} className="mt-12">
              <YouTubeEmbed id={featured.id} title={featured.title} priority />
              <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">{featured.title}</h2>
              <p className="mt-2 max-w-3xl text-mist">{featured.description}</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="container-x py-16" aria-labelledby="all-videos">
        <h2 id="all-videos" className="mb-8 text-3xl font-bold sm:text-4xl">All videos</h2>
        <VideoGrid videos={videos} />
      </section>

      <section id="shorts" className="scroll-mt-24 py-16" aria-labelledby="shorts-heading">
        <div className="container-x">
          <h2 id="shorts-heading" className="mb-8 text-3xl font-bold sm:text-4xl">
            Shorts <span className="text-fog">({shorts.length})</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 [&>a]:w-full">
            {shorts.map((s) => (
              <ShortCard key={s.id} short={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
