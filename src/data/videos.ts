/**
 * Videos & Shorts — YouTube channel se liye gaye (Nov 2026).
 * Website RSS feed se nayi uploads apne aap bhi utha leti hai (src/lib/youtube.ts),
 * lekin yahan likhi videos ki duration / description / category fixed rehti hai.
 */

export type VideoCategory = "travel" | "temples" | "rides" | "life";

export type Video = {
  id: string;
  title: string;
  description: string;
  publishedAt: string; // ISO
  duration?: string; // "13:38"
  views?: number;
  category: VideoCategory;
  place?: string;
};

export type Short = {
  id: string;
  title: string;
  publishedAt: string;
  views?: number;
};

export const categoryLabels: Record<VideoCategory, string> = {
  travel: "Travel & Treks",
  temples: "Temples & Hidden Gems",
  rides: "Rides & Machines",
  life: "Life & Stories",
};

export const videos: Video[] = [
  {
    id: "xcYFq7LX7Is",
    title: "My First Diwali With Scorpio Classic S11 ❤️ | Diwali Vlog 2026",
    description:
      "Diwali sirf roshni ka tyohaar nahi — apno ke saath bitaye pal hain. Ghar, family aur nayi Scorpio Classic S11 ke saath pehli Diwali ka vlog.",
    publishedAt: "2026-11-08T18:30:06-08:00",
    duration: "13:38",
    views: 150,
    category: "life",
  },
  {
    id: "HAmoqYBhXBA",
    title: "Mahindra Scorpio Classic S11 Top — The Real King of Roads 👑",
    description:
      "Mahindra Scorpio Classic S11 Top variant ka full experience — design, power aur pahadi roads par road presence.",
    publishedAt: "2026-10-12T00:26:01-07:00",
    duration: "12:09",
    views: 155,
    category: "rides",
  },
  {
    id: "4sH-hzEphD4",
    title: "How I Got My First MIS Job After a Gap | My Real Journey",
    description:
      "Rejection, doubt aur ek lamba gap — phir pehli MIS Executive job. Ek real, bina filter ki journey un sab ke liye jo abhi struggle kar rahe hain.",
    publishedAt: "2025-12-07T09:28:12-08:00",
    duration: "5:52",
    views: 64,
    category: "life",
  },
  {
    id: "sY2h1Gsx_ZI",
    title: "Morning Ride in the Mountains 🌄 | Meteor 350 Fireball Black | Royal Enfield Vibes",
    description:
      "Royal Enfield Meteor 350 Fireball Black par ek shaant pahadi morning ride — 349cc engine ke saath har chadhaai aasaan.",
    publishedAt: "2025-10-30T01:59:43-07:00",
    duration: "7:38",
    views: 264,
    category: "rides",
  },
  {
    id: "WMu5MgGjBGQ",
    title: "Royal Enfield Meteor 350 Fireball Black 🖤 at ₹1.91 Lakh after GST",
    description:
      "Royal Enfield Meteor 350 Fireball Black (2025 model) — style, comfort aur power. Price, features aur first impressions.",
    publishedAt: "2025-10-26T07:41:50-07:00",
    duration: "6:04",
    views: 4000,
    category: "rides",
  },
  {
    id: "QHAmMv4mdRE",
    title: "Kanchana Mata Temple | Anantpur Garh | Sarkaghat | Himachal Pradesh",
    description:
      "Badalon ke upar, Sarkaghat ki pahadiyon mein chhupa Kanchana Mata Mandir — Anantpur Garh tak ki poori yatra.",
    publishedAt: "2025-07-07T07:30:19-07:00",
    duration: "17:35",
    views: 229,
    category: "temples",
    place: "Anantpur Garh, Sarkaghat",
  },
  {
    id: "49GLZkMXvqE",
    title: "Mata Awahdevi Mandir | Baba Balak Nath Temple Awahdevi | Himachal Hidden Gem",
    description:
      "Himachal ka ek hidden spiritual gem — Maa Awahdevi Mandir aur Baba Balak Nath Ji ka mandir, Awahdevi.",
    publishedAt: "2025-06-30T07:30:05-07:00",
    duration: "8:45",
    views: 343,
    category: "temples",
    place: "Awahdevi",
  },
  {
    id: "sbHuha-IWzY",
    title: "Kamlah Fort | Kamlahgarh | Baba Kamlahiya Mandir | Mandi, Himachal Pradesh",
    description:
      "Himachal ke hidden gems mein se ek — Kamlah Fort (Kamlahgarh) aur Baba Kamlahiya Mandir, Mandi district.",
    publishedAt: "2025-06-21T07:47:11-07:00",
    duration: "14:18",
    views: 392,
    category: "temples",
    place: "Kamlahgarh, Mandi",
  },
  {
    id: "Ml16dPjXUME",
    title: "Baba Kamlahiya Mandir Chandpur — Trek 1",
    description:
      "Himachal Pradesh ka ek adbhut bhakti sthal — Chandpur ka Baba Kamlahiya Mandir, do sundar viewpoints ke saath.",
    publishedAt: "2025-06-08T20:08:55-07:00",
    duration: "13:32",
    views: 296,
    category: "travel",
    place: "Chandpur",
  },
  {
    id: "JBEH-ZM59To",
    title: "Bengaluru to Himachal Pradesh in 2 Days — Part 2",
    description:
      "Chandigarh se aage, Himachal ke dil ki taraf — mountain road trip ka Part 2.",
    publishedAt: "2025-06-05T10:04:46-07:00",
    duration: "5:51",
    views: 121,
    category: "travel",
  },
  {
    id: "Zt6EH13HBM8",
    title: "Bengaluru to Himachal Pradesh in 2 Days — Part 1",
    description:
      "Bengaluru se Himachal ke pahadon tak ka safar, Chandigarh mein ek chhote stay ke saath.",
    publishedAt: "2025-06-03T06:12:53-07:00",
    duration: "11:01",
    views: 176,
    category: "travel",
  },
];

export const shorts: Short[] = [
  { id: "rMNq-rz7FXg", title: "Scorpio Classic S11 🖤", publishedAt: "2026-11-13T09:37:52-08:00", views: 163 },
  { id: "FXK-smAC_LQ", title: "गाड़ी तो बहुत देखी होंगी, पर SCORPIO वाली बात कहीं और नहीं", publishedAt: "2026-11-12T07:22:57-08:00", views: 1400 },
  { id: "gbh0kNMn7go", title: "Boss Scorpio S11 Top Variant", publishedAt: "2026-11-08T02:26:22-08:00", views: 521 },
  { id: "jXi5VNPuF24", title: "Scorpio Classic S11 Top Variant", publishedAt: "2026-11-05T06:13:00-08:00", views: 35000 },
  { id: "JRmwsNHeLsQ", title: "Reel ❌ Real ✅ Royal Enfield", publishedAt: "2025-10-30T06:08:21-07:00", views: 4900 },
  { id: "hdAgYMn7hXs", title: "When mountain roads meet Royal Enfield power 💪🏍️", publishedAt: "2025-10-29T23:57:41-07:00", views: 1600 },
  { id: "Z62skjJ2TvY", title: "Meteor 350 Fireball Black isn’t just a bike, it’s an emotion 🖤🔥", publishedAt: "2025-10-26T04:37:22-07:00", views: 2200 },
  { id: "UZWr6ntOwXI", title: "Jai Maa Baglamukhi 🙏", publishedAt: "2025-07-29T21:28:40-07:00", views: 1300 },
  { id: "NdLJ6ilUUjo", title: "Monsoon magic in the heart of Himachal — Welcome to Mandi", publishedAt: "2025-07-09T01:06:44-07:00", views: 1500 },
  { id: "cituqHAXbiM", title: "Kanchana Mata Mandir | Anantpur Garh | Sarkaghat", publishedAt: "2025-07-07T07:30:33-07:00", views: 2000 },
  { id: "TkZFTEAF-mw", title: "Not Kasol, Not Tosh. Just Himachal’s Anant Garh", publishedAt: "2025-07-02T21:57:34-07:00", views: 4100 },
  { id: "tw4ZDho0-OQ", title: "Mata Awahdevi Mandir | Baba Balak Nath Temple", publishedAt: "2025-06-30T07:30:41-07:00", views: 660 },
  { id: "z5TH_VFqlQ8", title: "🏰 Kamlah Fort, Kamlahgarh — Himachal Pradesh", publishedAt: "2025-06-21T16:45:01-07:00", views: 1700 },
  { id: "nTN2vw5j7VY", title: "Ek aisa mandir jahan har saal hota hai vishal bhandara!", publishedAt: "2025-06-09T02:02:29-07:00", views: 778 },
];

/** Places explored — Home & About pages par dikhte hain */
export const places = [
  {
    name: "Kamlah Fort",
    area: "Kamlahgarh, Mandi",
    note: "Pahadi chotti par bana sadiyon purana qila — Himachal ke sabse underrated forts mein se ek.",
    videoId: "sbHuha-IWzY",
  },
  {
    name: "Kanchana Mata Mandir",
    area: "Anantpur Garh, Sarkaghat",
    note: "Badalon ke upar chhupa mandir. Kasol nahi, Tosh nahi — bas Himachal ka Anant Garh.",
    videoId: "QHAmMv4mdRE",
  },
  {
    name: "Mata Awahdevi Mandir",
    area: "Awahdevi",
    note: "Maa Awahdevi aur Baba Balak Nath Ji ka pavitra sthal — ek hidden spiritual gem.",
    videoId: "49GLZkMXvqE",
  },
  {
    name: "Baba Kamlahiya Mandir",
    area: "Chandpur",
    note: "Do sundar viewpoints aur har saal hone wala vishal bhandara — Trek #1 yahin se.",
    videoId: "Ml16dPjXUME",
  },
] as const;

/** Garage — machines that power the adventures */
export const garage = [
  {
    name: "Royal Enfield Meteor 350",
    variant: "Fireball Black",
    note: "349cc cruiser — pahadi morning rides ka saathi.",
    videoId: "sY2h1Gsx_ZI",
  },
  {
    name: "Mahindra Scorpio Classic",
    variant: "S11 Top",
    note: "The real king of roads — road trips & family adventures.",
    videoId: "HAmoqYBhXBA",
  },
] as const;

/** Journey timeline */
export const timeline = [
  { date: "Mar 2020", title: "XploreWithKrrish ki shuruaat", text: "YouTube channel shuru kiya — pahadon ki kahaniyan sunane ke liye." },
  { date: "Jun 2025", title: "Bengaluru → Himachal in 2 Days", text: "Desh ke ek kone se doosre kone tak — Chandigarh hote hue ghar, pahadon mein." },
  { date: "Jun–Jul 2025", title: "Hidden Himachal series", text: "Kamlah Fort, Baba Kamlahiya, Awahdevi aur Kanchana Mata — Mandi ke hidden gems." },
  { date: "Oct 2025", title: "Meteor 350 Fireball Black", text: "Nayi Royal Enfield — aur mountain rides ka naya chapter." },
  { date: "Dec 2025", title: "Pehli MIS job ki kahani", text: "Gap aur rejections ke baad pehli MIS Executive job — real journey share ki." },
  { date: "Oct 2026", title: "Scorpio Classic S11", text: "Garage mein aaya 'King of Roads' — aur shorts ne 35K+ views cross kiye." },
  { date: "Nov 2026", title: "Diwali with Scorpio", text: "Family, ghar aur nayi gaadi ke saath pehli Diwali." },
] as const;
