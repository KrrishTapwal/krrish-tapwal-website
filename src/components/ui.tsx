import Image from "next/image";
import type { ReactNode } from "react";
import { categoryLabels, type Short, type Video } from "@/data/videos";
import { compactNumber, formatDate } from "@/lib/format";
import { shortUrl, thumb, watchUrl } from "@/lib/youtube";
import { PlayCircleIcon, PlayIcon } from "./icons";
import Reveal from "./Reveal";

/** Big centred section heading, as used throughout the template */
export function SectionTitle({ children, id, intro, as: H = "h2", light = false }: { children: ReactNode; id?: string; intro?: ReactNode; as?: "h1" | "h2"; light?: boolean }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <H id={id} className={`section-title ${light ? "!text-white" : ""}`}>
        {children}
      </H>
      {intro && <p className={`mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed ${light ? "text-white/90" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}

/** Charcoal spotlight header used at the top of inner pages */
export function PageHero({ title, subtitle, children, aside }: { title: ReactNode; subtitle?: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="bg-[linear-gradient(to_bottom,var(--color-paper)_0,var(--color-paper)_70%,var(--color-coral)_70%)]">
      <div className="container-x">
        <div className="grid items-center gap-10 bg-[radial-gradient(70%_90%_at_70%_20%,#4a4a4a_0%,#303030_55%,#262626_100%)] px-6 py-14 text-white sm:px-10 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:px-20">
          <Reveal>
            <h1 className="text-[clamp(2.6rem,8vw,4.75rem)] font-bold uppercase leading-[0.95] tracking-tight">{title}</h1>
            {subtitle && <p className="mt-5 text-xl font-semibold text-coral sm:text-2xl">{subtitle}</p>}
            {children && <div className="mt-5 max-w-xl text-[0.95rem] font-extralight leading-relaxed text-white/95">{children}</div>}
          </Reveal>
          {aside && <Reveal delay={120}>{aside}</Reveal>}
        </div>
      </div>
      <div className="h-10 bg-coral md:h-14" />
    </section>
  );
}

/** Play Video text link with circled play icon */
export function PlayLabel({ label = "Play Video" }: { label?: string }) {
  return (
    <span className="play-link">
      <PlayCircleIcon width={26} height={26} />
      <span>{label}</span>
    </span>
  );
}

/** Thumbnail tile with dark overlay, centred title and "Play Video" — the template's video strip */
export function VideoTile({ video, className = "" }: { video: Video; className?: string }) {
  return (
    <a
      href={watchUrl(video.id)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block aspect-video overflow-hidden bg-charcoal ${className}`}
      aria-label={`Play video: ${video.title}`}
    >
      <Image src={thumb(video.id, "hq")} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
      <span className="absolute inset-0 bg-charcoal/55 transition group-hover:bg-charcoal/40" />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-white">
        <span className="line-clamp-2 text-sm font-normal leading-snug sm:text-[0.95rem]">{video.title}</span>
        <PlayLabel />
      </span>
    </a>
  );
}

/** Card for the full videos grid */
export function VideoCard({ video, delay = 0 }: { video: Video; delay?: number }) {
  return (
    <Reveal delay={delay} as="article" className="group">
      <a href={watchUrl(video.id)} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-video overflow-hidden bg-charcoal">
          <Image
            src={thumb(video.id, "hq")}
            alt={video.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 grid place-items-center bg-charcoal/0 transition group-hover:bg-charcoal/45">
            <span className="opacity-0 transition group-hover:opacity-100">
              <PlayLabel />
            </span>
          </span>
          {video.duration && (
            <span className="absolute bottom-3 right-3 bg-charcoal/90 px-2 py-0.5 text-xs font-medium tabular-nums text-white">{video.duration}</span>
          )}
          <span className="absolute left-3 top-3 bg-coral px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-white">
            {categoryLabels[video.category]}
          </span>
        </div>
        <h3 className="mt-4 line-clamp-2 text-lg font-semibold leading-snug text-charcoal transition group-hover:text-coral">{video.title}</h3>
        <p className="mt-1 text-sm text-muted">
          {video.views ? `${compactNumber(video.views)} views · ` : ""}
          <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
        </p>
      </a>
    </Reveal>
  );
}

export function ShortCard({ short, className = "" }: { short: Short; className?: string }) {
  return (
    <a
      href={shortUrl(short.id)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block aspect-[9/16] shrink-0 snap-start overflow-hidden bg-charcoal text-white ${className}`}
    >
      <Image src={thumb(short.id, "hq")} alt={short.title} fill sizes="(min-width: 1024px) 16vw, 45vw" className="object-cover transition duration-700 group-hover:scale-110" />
      <span className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />
      <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-coral text-white">
        <PlayIcon width={13} height={13} className="translate-x-px" />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-3.5">
        <span className="line-clamp-3 text-sm font-medium leading-snug">{short.title}</span>
        {short.views ? <span className="mt-1.5 block text-xs font-semibold text-coral">{compactNumber(short.views)} views</span> : null}
      </span>
    </a>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
