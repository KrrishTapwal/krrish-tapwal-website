import type { Metadata } from "next";
import VideoGrid from "@/components/VideoGrid";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { YouTubeIcon } from "@/components/icons";
import { JsonLd, PageHero, SectionTitle, ShortCard } from "@/components/ui";
import { site } from "@/data/site";
import { compactNumber } from "@/lib/format";
import { breadcrumbSchema, graph, videoSchema } from "@/lib/schema";
import { getChannelContent, getChannelStats } from "@/lib/youtube";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Videos & Shorts",
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

      <PageHero title="My Videos" subtitle={site.brand}>
        <p>
          {videos.length} videos, {shorts.length} Shorts, and {compactNumber(live.views)}+ channel views — every story from Himachal in one place.
        </p>
        <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-coral mt-8">
          <YouTubeIcon width={18} height={18} /> Subscribe
        </a>
      </PageHero>

      {featured && (
        <section className="bg-coral pb-16" aria-label="Latest video">
          <YouTubeEmbed id={featured.id} title={featured.title} priority />
        </section>
      )}

      <section className="py-20 md:py-24" aria-labelledby="all-videos">
        <div className="container-x">
          <SectionTitle id="all-videos">All Videos</SectionTitle>
          <VideoGrid videos={videos} />
        </div>
      </section>

      <section id="shorts" className="scroll-mt-24 bg-white py-20 md:py-24" aria-labelledby="shorts-heading">
        <div className="container-x">
          <SectionTitle id="shorts-heading" intro={`${shorts.length} Shorts — quick moments from rides, temples and the mountains.`}>
            Shorts
          </SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {shorts.map((s) => (
              <ShortCard key={s.id} short={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
