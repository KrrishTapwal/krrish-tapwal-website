import { site } from "@/data/site";
import type { Video } from "@/data/videos";
import { isoDuration } from "./format";
import { thumb, watchUrl } from "./youtube";

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export const sameAs = () => Object.values(site.socials).filter(Boolean);

export function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    givenName: site.firstName,
    familyName: site.lastName,
    alternateName: site.alternateNames,
    url: site.url,
    image: `${site.url}/images/krrish-tapwal.jpg`,
    description: site.shortBio,
    jobTitle: ["YouTuber", "Content Creator", "Travel Vlogger"],
    nationality: { "@type": "Country", name: site.location.country },
    homeLocation: {
      "@type": "Place",
      name: `${site.location.area}, ${site.location.region}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sarkaghat",
        addressRegion: site.location.region,
        addressCountry: site.location.countryCode,
      },
    },
    knowsAbout: ["Himachal Pradesh travel", "Trekking", "Temples of Himachal", "Travel vlogging", "Motorcycle rides", "Video creation"],
    sameAs: sameAs(),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: `${site.name} — Official Website`,
    alternateName: [site.brand, "Krrish Tapwal", "Tapwal"],
    inLanguage: ["en-IN", "hi-IN"],
    publisher: { "@id": personId },
    about: { "@id": personId },
  };
}

export function profilePageSchema(path: string, name: string) {
  return {
    "@type": "ProfilePage",
    "@id": `${site.url}${path}#page`,
    url: `${site.url}${path}`,
    name,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    dateModified: new Date().toISOString(),
  };
}

export function videoSchema(v: Video) {
  return {
    "@type": "VideoObject",
    "@id": `${watchUrl(v.id)}#video`,
    name: v.title,
    description: v.description,
    thumbnailUrl: [thumb(v.id, "hq"), thumb(v.id, "max")],
    uploadDate: v.publishedAt,
    duration: isoDuration(v.duration),
    contentUrl: watchUrl(v.id),
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    author: { "@id": personId },
    creator: { "@id": personId },
    ...(v.views ? { interactionStatistic: { "@type": "InteractionCounter", interactionType: { "@type": "WatchAction" }, userInteractionCount: v.views } } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
