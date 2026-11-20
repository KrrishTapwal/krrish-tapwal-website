"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { CloseIcon, MenuIcon, MountainIcon, YouTubeIcon } from "./icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  const isActive = (href: string) => (href.includes("#") ? false : href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`sticky top-0 z-50 bg-paper/95 backdrop-blur transition-shadow duration-300 ${scrolled || open ? "shadow-[0_1px_0_rgb(48_48_48/0.08)]" : ""}`}>
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 md:h-24">
        <Link href="/" className="group flex items-center gap-2" aria-label={`${site.name} — Home`}>
          <MountainIcon width={30} height={30} className="text-coral transition group-hover:-translate-y-0.5" strokeWidth={2.2} />
          <span className="text-[1.05rem] font-bold uppercase tracking-tight text-charcoal sm:text-lg">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`text-[0.72rem] font-semibold uppercase tracking-[0.04em] transition ${
                    isActive(l.href) ? "text-coral" : "text-charcoal hover:text-coral"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.youtube.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-sm font-medium text-coral transition hover:text-coral-dark sm:inline-flex"
          >
            <span className="grid size-8 place-items-center rounded-full bg-coral text-white">
              <YouTubeIcon width={16} height={16} />
            </span>
            Subscribe
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-charcoal lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden bg-paper transition-[max-height,opacity] duration-500 lg:hidden ${open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav aria-label="Mobile" className="container-x pb-8 pt-2">
          <ul className="divide-y divide-line border-y border-line">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-4 text-sm font-semibold uppercase tracking-[0.06em] ${isActive(l.href) ? "text-coral" : "text-charcoal"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-coral mt-6 w-full">
            <YouTubeIcon width={18} height={18} /> Subscribe on YouTube
          </a>
        </nav>
      </div>
    </header>
  );
}
