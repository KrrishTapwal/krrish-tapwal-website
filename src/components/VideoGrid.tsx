"use client";

import { useState } from "react";
import { categoryLabels, type Video, type VideoCategory } from "@/data/videos";
import { VideoCard } from "./ui";

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [filter, setFilter] = useState<VideoCategory | "all">("all");
  const cats = (Object.keys(categoryLabels) as VideoCategory[]).filter((c) => videos.some((v) => v.category === c));
  const shown = filter === "all" ? videos : videos.filter((v) => v.category === filter);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition ${
      active ? "bg-coral text-white" : "bg-white text-charcoal hover:bg-charcoal hover:text-white"
    }`;

  return (
    <>
      <div className="no-scrollbar -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 md:justify-center" role="toolbar" aria-label="Filter videos by category">
        <button type="button" className={chip(filter === "all")} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          All ({videos.length})
        </button>
        {cats.map((c) => (
          <button key={c} type="button" className={chip(filter === c)} aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {categoryLabels[c]}
          </button>
        ))}
      </div>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v, i) => (
          <VideoCard key={v.id} video={v} delay={(i % 3) * 80} />
        ))}
      </div>
    </>
  );
}
