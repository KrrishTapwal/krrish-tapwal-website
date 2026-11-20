"use client";

import { useState } from "react";
import { categoryLabels, type Video, type VideoCategory } from "@/data/videos";
import { VideoCard } from "./ui";

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [filter, setFilter] = useState<VideoCategory | "all">("all");
  const cats = (Object.keys(categoryLabels) as VideoCategory[]).filter((c) => videos.some((v) => v.category === c));
  const shown = filter === "all" ? videos : videos.filter((v) => v.category === filter);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition ${
      active ? "border-snow bg-snow text-ink" : "border-line text-mist hover:border-black/25 hover:text-snow"
    }`;

  return (
    <>
      <div className="no-scrollbar -mx-4 mb-10 flex gap-2 overflow-x-auto px-4" role="toolbar" aria-label="Filter videos by category">
        <button type="button" className={chip(filter === "all")} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          All ({videos.length})
        </button>
        {cats.map((c) => (
          <button key={c} type="button" className={`${chip(filter === c)} shrink-0`} aria-pressed={filter === c} onClick={() => setFilter(c)}>
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
