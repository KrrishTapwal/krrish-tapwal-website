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

export default function Socials({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {activeSocials().map(({ key, href, label, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`${site.name} on ${label}`}
            className="grid size-11 place-items-center rounded-full border border-line bg-white/[0.03] text-mist transition hover:-translate-y-0.5 hover:border-moss/50 hover:text-moss"
          >
            <Icon />
          </a>
        </li>
      ))}
      {site.email && (
        <li>
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.name}`}
            className="grid size-11 place-items-center rounded-full border border-line bg-white/[0.03] text-mist transition hover:-translate-y-0.5 hover:border-moss/50 hover:text-moss"
          >
            <MailIcon />
          </a>
        </li>
      )}
    </ul>
  );
}
