"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

/* ------------------------------------------------------------------
 * Tiny shared queue: only the first CAP on-screen players may load,
 * so a page full of video cards never runs dozens of YouTube players.
 * ------------------------------------------------------------------ */
const queue: string[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const cap = () => (typeof document !== "undefined" && document.documentElement.classList.contains("lite") ? 3 : 6);
function enter(key: string) {
  if (!queue.includes(key)) queue.push(key);
  emit();
}
function leave(key: string) {
  const i = queue.indexOf(key);
  if (i >= 0) queue.splice(i, 1);
  emit();
}

/**
 * Muted, looping YouTube preview that sits on top of a card's thumbnail.
 * Plays only while the card is on screen; starts at `start` seconds and loops back
 * there (or to 0:00 if the video is shorter than `start`).
 */
export default function AutoPlayer({ id, start = 0, zoom = 118 }: { id: string; start?: number; zoom?: number }) {
  const key = useId();
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const allowed = useSyncExternalStore(
    subscribe,
    () => {
      const i = queue.indexOf(key);
      return i >= 0 && i < cap();
    },
    () => false,
  );

  // Join the queue while visible
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    // Only load a player after the card has stayed on screen briefly, so fast scrolling
    // never spawns a burst of YouTube iframes. Also release all players while the tab is hidden.
    let dwell = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(dwell);
        if (e.isIntersecting) dwell = window.setTimeout(() => !document.hidden && enter(key), 450);
        else leave(key);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    const onVisibility = () => {
      if (document.hidden) leave(key);
      else if (el.getBoundingClientRect().top < window.innerHeight && el.getBoundingClientRect().bottom > 0) enter(key);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(dwell);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      leave(key);
    };
  }, [key]);

  useEffect(() => {
    if (!allowed) {
      playingRef.current = false;
      setPlaying(false);
      return;
    }
    const send = (func: string, args: unknown[] = []) => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");
    const play = () => {
      send("mute");
      send("playVideo");
    };
    let from = start;
    let lastLoop = 0;

    // keep nudging until it plays
    let tries = 0;
    const kicker = window.setInterval(() => {
      if (playingRef.current || ++tries > 60) return clearInterval(kicker);
      play();
    }, 1500);
    // Any interaction nudges a stalled preview to start (throttled; stops once it plays)
    let lastNudge = 0;
    const onGesture = () => {
      const now = Date.now();
      if (playingRef.current || now - lastNudge < 700) return;
      lastNudge = now;
      play();
    };
    const gestures = ["pointermove", "pointerdown", "touchstart", "scroll", "keydown"] as const;
    gestures.forEach((g) => window.addEventListener(g, onGesture, { passive: true }));

    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || typeof e.data !== "string") return;
      try {
        const state = JSON.parse(e.data)?.info?.playerState;
        if (state === 1) {
          playingRef.current = true;
          setPlaying(true);
        }
        if (state === 0) {
          // ended: loop. If it ended right after looping, the video is shorter than `start` → use 0:00
          if (Date.now() - lastLoop < 6000) from = 0;
          lastLoop = Date.now();
          send("seekTo", [from, true]);
          play();
        }
        if (state === 2 || state === 5 || state === -1) play();
      } catch {
        /* not a player message */
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      clearInterval(kicker);
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
      window.removeEventListener("message", onMessage);
    };
  }, [allowed, start]);

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    start: String(start),
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    enablejsapi: "1",
  });

  return (
    <div ref={box} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {allowed && (
        <iframe
          ref={frame}
          src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
          title=""
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          onLoad={() => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: key }), "*")}
          // zoomed in so YouTube's title bar and corner branding fall outside the card
          style={{ width: `${zoom}%`, height: `${zoom}%` }}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
