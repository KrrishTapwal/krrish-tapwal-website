import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { getChannelProfileImage } from "@/lib/youtube";
import Socials from "./Socials";

export default async function Footer() {
  const year = new Date().getFullYear();
  const profileImage = await getChannelProfileImage();
  const handle = site.socials.instagram ? `@${site.socials.instagram.replace(/\/+$/, "").split("/").pop()}` : site.youtube.handle;

  return (
    <footer>
      {/* ===== Follow band (teal) ===== */}
      <section id="follow" className="scroll-mt-24 overflow-hidden bg-teal text-white" aria-labelledby="follow-title">
        <div className="container-x grid items-end gap-10 pt-16 md:grid-cols-2 md:gap-16 md:pt-20">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-[10rem] bg-teal-dark/40 md:order-none">
            <Image
              src={profileImage}
              alt={`${site.name}, ${site.role}`}
              fill
              sizes="(min-width: 768px) 24rem, 80vw"
              className="object-cover object-top"
            />
          </div>

          <div className="pb-16 md:pb-24">
            <h2 id="follow-title" className="text-4xl font-bold sm:text-5xl">Follow Me</h2>
            <Socials variant="light" className="mt-8" />

            <h3 className="mt-12 text-2xl font-semibold">Collaborations</h3>
            <dl className="mt-5 space-y-5 text-[0.95rem]">
              <div>
                <dt className="font-light text-white/85">For business inquiries</dt>
                <dd>
                  {site.email ? (
                    <a href={`mailto:${site.email}`} className="font-medium hover:underline">
                      {site.email}
                    </a>
                  ) : (
                    <a href={site.youtube.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                      Message me on YouTube · {site.youtube.handle}
                    </a>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-light text-white/85">Social</dt>
                <dd className="font-medium">{handle}</dd>
              </div>
              <div>
                <dt className="font-light text-white/85">Based in</dt>
                <dd className="font-medium">
                  {site.location.area}, {site.location.region}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ===== Bottom bar ===== */}
      <div className="bg-paper">
        <div className="container-x flex flex-col gap-3 py-7 text-xs font-medium text-charcoal sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} by {site.name}. {site.brand}.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {[
                { href: "/about", label: "About" },
                { href: "/videos", label: "Videos" },
                { href: "/shop", label: "Shop" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((l, i) => (
                <li key={l.href} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true">|</span>}
                  <Link href={l.href} className="hover:text-coral">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
