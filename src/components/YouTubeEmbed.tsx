"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayIcon } from "./icons";

/**
 * Lite YouTube embed — pehle sirf thumbnail load hota hai (fast page),
 * click karne par hi asli YouTube player load hota hai.
 */
export default function YouTubeEmbed({
  id,
  title,
  priority = false,
  className = "",
}: {
  id: string;
  title: string;
  priority?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const [hd, setHd] = useState(true);

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-[1.25rem] bg-night-2 ${className}`}>
      {active ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 size-full cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/${hd ? "maxresdefault" : "hqdefault"}.jpg`}
            alt={title}
            fill
            onError={() => setHd(false)}
            priority={priority}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-snow text-ink shadow-[0_0_0_10px_rgb(255_255_255/0.15)] transition duration-500 group-hover:scale-110 group-hover:bg-sage group-hover:shadow-[0_0_0_16px_rgb(125_190_120/0.2)]">
            <PlayIcon width={30} height={30} className="translate-x-0.5" />
          </span>
        </button>
      )}
    </div>
  );
}
