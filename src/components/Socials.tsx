import { site, type SocialKey } from "@/data/site";
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon, WhatsAppIcon, XIcon, YouTubeIcon } from "./icons";

const meta: Record<SocialKey, { label: string; Icon: typeof YouTubeIcon }> = {
  youtube: { label: "YouTube", Icon: YouTubeIcon },
  instagram: { label: "Instagram", Icon: InstagramIcon },
  facebook: { label: "Facebook", Icon: FacebookIcon },
  x: { label: "X (Twitter)", Icon: XIcon },
  linkedin: { label: "LinkedIn", Icon: LinkedInIcon },
  whatsapp: { label: "WhatsApp", Icon: WhatsAppIcon },
};

export function activeSocials() {
  return (Object.keys(site.socials) as SocialKey[])
    .filter((k) => site.socials[k])
    .map((k) => ({ key: k, href: site.socials[k], ...meta[k] }));
}

/**
 * Round social buttons.
 *  - "light": white circles with a teal glyph (used on the teal Follow band)
 *  - "dark":  charcoal circles with a white glyph (used on paper backgrounds)
 */
export default function Socials({ className = "", variant = "dark" }: { className?: string; variant?: "light" | "dark" }) {
  const circle =
    variant === "light"
      ? "bg-white text-teal hover:bg-charcoal hover:text-white"
      : "bg-charcoal text-white hover:bg-coral";
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {activeSocials().map(({ key, href, label, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`${site.name} on ${label}`}
            className={`grid size-10 place-items-center rounded-full transition hover:-translate-y-0.5 ${circle}`}
          >
            <Icon width={18} height={18} />
          </a>
        </li>
      ))}
      {site.email && (
        <li>
          <a href={`mailto:${site.email}`} aria-label={`Email ${site.name}`} className={`grid size-10 place-items-center rounded-full transition hover:-translate-y-0.5 ${circle}`}>
            <MailIcon width={18} height={18} />
          </a>
        </li>
      )}
    </ul>
  );
}
