"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayCircleIcon } from "./icons";

/**
 * Full-width featured video banner (lite embed).
 * Shows the thumbnail with a centred title + "Play Video"; the real YouTube
 * player only loads after a click, which keeps the page fast.
 */
export default function YouTubeEmbed({
  id,
  title,
  heading,
  priority = false,
  className = "",
}: {
  id: string;
  title: string;
  heading?: string;
  priority?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const [hd, setHd] = useState(true);

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-charcoal md:aspect-[21/9] ${className}`}>
      {active ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 size-full cursor-pointer" aria-label={`Play video: ${title}`}>
          <Image
            src={`https://i.ytimg.com/vi/${id}/${hd ? "maxresdefault" : "hqdefault"}.jpg`}
            alt={title}
            fill
            onError={() => setHd(false)}
            priority={priority}
            sizes="100vw"
            className="object-cover transition duration-1000 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-charcoal/45 transition group-hover:bg-charcoal/35" />
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white">
            <span className="max-w-3xl text-2xl font-bold leading-tight drop-shadow sm:text-4xl md:text-5xl">{heading ?? title}</span>
            <span className="play-link">
              <PlayCircleIcon width={30} height={30} />
              <span>Play Video</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
