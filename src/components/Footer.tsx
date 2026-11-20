import Link from "next/link";
import { navLinks, site } from "@/data/site";
import MountainScene from "./MountainScene";
import Socials from "./Socials";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-night">
      <MountainScene className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full opacity-40" variant="footer" />
      <div className="container-x relative pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              {site.name}
              <span className="text-moss">.</span>
            </p>
            <p className="mt-3 max-w-sm text-mist">{site.shortBio}</p>
            <Socials className="mt-6" />
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fog">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-mist transition hover:text-moss">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fog">Watch</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={site.youtube.url} target="_blank" rel="noopener noreferrer me" className="text-mist transition hover:text-moss">
                  YouTube · {site.youtube.handle}
                </a>
              </li>
              <li>
                <Link href="/videos#shorts" className="text-mist transition hover:text-moss">
                  Shorts
                </Link>
              </li>
              <li>
                <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className="text-mist transition hover:text-moss">
                  Subscribe ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-sm text-fog sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · {site.brand}. All rights reserved.
          </p>
          <p>
            Made with ❤️ in the mountains of {site.location.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
