import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { categoryLabels, type Short, type Video } from "@/data/videos";
import { compactNumber, formatDate } from "@/lib/format";
import { shortUrl, thumb, watchUrl } from "@/lib/youtube";
import { ArrowRightIcon, PlayIcon } from "./icons";
import Reveal from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  as: H = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: { href: string; label: string };
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <H className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">{title}</H>
        {intro && <p className="mt-4 text-lg text-mist">{intro}</p>}
      </div>
      {action && (
        <Link href={action.href} className="btn btn-ghost self-start md:self-auto">
          {action.label} <ArrowRightIcon width={18} height={18} />
        </Link>
      )}
    </Reveal>
  );
}

export function VideoCard({ video, delay = 0 }: { video: Video; delay?: number }) {
  return (
    <Reveal delay={delay} as="article" className="group">
      <a href={watchUrl(video.id)} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-night-2">
          <Image
            src={thumb(video.id, "hq")}
            alt={video.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
          <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-snow text-ink opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100">
            <PlayIcon width={22} height={22} className="translate-x-0.5" />
          </span>
          {video.duration && (
            <span className="absolute bottom-3 right-3 rounded-md bg-black/85 px-2 py-0.5 text-xs font-semibold tabular-nums text-white">
              {video.duration}
            </span>
          )}
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-ink/60 px-2.5 py-1 text-[0.7rem] font-medium text-snow backdrop-blur">
            {categoryLabels[video.category]}
          </span>
        </div>
        <h3 className="mt-4 line-clamp-2 font-display text-lg font-semibold leading-snug transition group-hover:text-sage">
          {video.title}
        </h3>
        <p className="mt-1.5 text-sm text-fog">
          {video.views ? `${compactNumber(video.views)} views · ` : ""}
          <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
        </p>
      </a>
    </Reveal>
  );
}

export function ShortCard({ short }: { short: Short }) {
  return (
    <a
      href={shortUrl(short.id)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[9/16] w-44 shrink-0 snap-start overflow-hidden rounded-2xl bg-night-2 text-white sm:w-52"
    >
      <Image
        src={thumb(short.id, "hq")}
        alt={short.title}
        fill
        sizes="208px"
        className="object-cover transition duration-700 group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />
      <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-snow group-hover:text-ink">
        <PlayIcon width={14} height={14} />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-3.5">
        <span className="line-clamp-3 text-sm font-semibold leading-snug">{short.title}</span>
        {short.views ? <span className="mt-1.5 block text-xs text-sage">{compactNumber(short.views)} views</span> : null}
      </span>
    </a>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
