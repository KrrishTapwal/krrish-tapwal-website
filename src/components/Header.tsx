"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { CloseIcon, MenuIcon, YouTubeIcon } from "./icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} — Home`}>
          <span className="grid size-9 place-items-center rounded-xl bg-snow font-display text-sm font-extrabold text-ink transition group-hover:rotate-[-6deg]">
            KT
          </span>
          <span className="leading-none">
            <span className="block font-display text-[1.05rem] font-bold tracking-tight">{site.name}</span>
            <span className="mt-0.5 block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-mist">{site.brand}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-white/[0.03] p-1 backdrop-blur">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive(l.href) ? "bg-snow text-ink" : "text-mist hover:text-snow"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary hidden !px-4 !py-2.5 text-sm sm:inline-flex">
            <YouTubeIcon width={18} height={18} /> Subscribe
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-500 md:hidden ${open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav aria-label="Mobile" className="container-x pb-6 pt-2">
          <ul className="space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-semibold ${
                    isActive(l.href) ? "bg-white/[0.06] text-moss" : "text-snow"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4 w-full">
            <YouTubeIcon /> Subscribe on YouTube
          </a>
        </nav>
      </div>
    </header>
  );
}
