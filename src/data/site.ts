/**
 * ============================================================
 *  SITE CONFIG — Saari personal details yahin se badlo.
 *  Edit this one file to update name, bio, links & stats.
 * ============================================================
 */

export const site = {
  // Live domain (bina trailing slash ke)
  url: "https://krrishtapwal.space",

  name: "Krrish Tapwal",
  firstName: "Krrish",
  lastName: "Tapwal",
  // Doosre naam jinse log search karte hain — SEO ke liye
  alternateNames: ["Krrish Tapwal", "KRRISH TAPWAL", "Krizz Tapwal", "XploreWithKrrish", "Xplore With Krrish"],
  brand: "XploreWithKrrish",
  role: "Himachali Explorer & YouTuber",
  tagline: "Exploring Himachal — treks, temples, rides & real stories from the mountains.",
  location: {
    region: "Himachal Pradesh",
    area: "Sarkaghat, Mandi",
    country: "India",
    countryCode: "IN",
  },

  shortBio:
    "Krrish Tapwal is a Himachali explorer and the creator of XploreWithKrrish on YouTube — bringing raw, real and cinematic adventures from the heart of the Himalayas.",

  longBio: [
    "Main hoon Krrish Tapwal — Himachal Pradesh ka ek pahadi banda jo apne camera ke saath un jagahon tak jaata hai jinke baare mein bahut kam log jaante hain. Hidden village trails, pahadon ke upar bane purane mandir, bhooli hui forts aur lambi road trips — yahi meri duniya hai.",
    "Maine apna YouTube channel XploreWithKrrish 2020 mein shuru kiya tha. Aaj is channel par Himachal ke hidden gems — Kamlah Fort, Kanchana Mata Mandir (Anantpur Garh), Mata Awahdevi Mandir aur Baba Kamlahiya Mandir — ki cinematic journeys hain, saath hi Bengaluru se Himachal tak ki road trip aur Royal Enfield Meteor 350 par mountain rides bhi.",
    "Camera ke peeche ki zindagi bhi utni hi real hai. Ek lambe gap aur kai rejections ke baad maine apni pehli MIS Executive job paayi — aur woh poori journey bhi maine bina filter ke share ki, taaki jo log usi raaste par hain unhe himmat mile.",
    "Mera maqsad simple hai: Himachal ki asli khoobsurati, uski aastha aur uske logon ki kahaniyan duniya tak pahunchana — raw, real aur thrilling.",
  ],

  youtube: {
    channelId: "UCQxlcJ5k9U9l6jwr-VV-sfQ",
    handle: "@KRRISHTAPWAL001",
    url: "https://www.youtube.com/@KRRISHTAPWAL001",
    subscribeUrl: "https://www.youtube.com/@KRRISHTAPWAL001?sub_confirmation=1",
    joined: "2020-03-27",
  },

  // Stats — YouTube se liye gaye (Nov 2026). Time-time par update karte rehna.
  stats: {
    subscribers: 962,
    views: 64714,
    videos: 25,
    since: 2020,
    asOf: "November 2026",
  },

  /**
   * SOCIAL LINKS — YouTube channel par abhi koi aur link nahi tha.
   * Apna Instagram / Facebook / X / WhatsApp link yahan daal do,
   * khali ("") chhodoge to website par woh icon nahi dikhega.
   */
  socials: {
    youtube: "https://www.youtube.com/@KRRISHTAPWAL001",
    instagram: "",
    facebook: "",
    x: "",
    linkedin: "",
    whatsapp: "", // e.g. "https://wa.me/91XXXXXXXXXX"
  } as Record<"youtube" | "instagram" | "facebook" | "x" | "linkedin" | "whatsapp", string>,

  // Business / collab email — khali chhodoge to email button nahi dikhega
  email: "" as string,

  keywords: [
    "Krrish Tapwal",
    "Krrish Tapwal YouTube",
    "Krrish Tapwal Himachal",
    "Krrish Tapwal Sarkaghat",
    "Tapwal",
    "Krizz Tapwal",
    "XploreWithKrrish",
    "Xplore With Krrish",
    "Krrish Himachal vlogger",
    "Himachal vlogger",
    "Himachali YouTuber",
    "Sarkaghat vlogger",
    "Mandi Himachal Pradesh vlog",
    "Kamlah Fort vlog",
    "Kanchana Mata Mandir",
    "Awahdevi Mandir",
    "Baba Kamlahiya Mandir",
    "Himachal treks",
    "Royal Enfield Meteor 350 Fireball Black",
    "Scorpio Classic S11",
  ],
} as const;

export type SocialKey = keyof typeof site.socials;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/videos", label: "Videos" },
  { href: "/shop", label: "Shop" },
] as const;
