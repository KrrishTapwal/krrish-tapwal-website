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
      "A Diwali celebration at home with family and the new Scorpio Classic S11, capturing the moments that make the festival special.",
    publishedAt: "2026-11-08T18:30:06-08:00",
    duration: "13:38",
    views: 150,
    category: "life",
  },
  {
    id: "HAmoqYBhXBA",
    title: "Mahindra Scorpio Classic S11 Top — The Real King of Roads 👑",
    description:
      "A closer look at the Mahindra Scorpio Classic S11 Top variant, from its design and performance to its presence on mountain roads.",
    publishedAt: "2026-10-12T00:26:01-07:00",
    duration: "12:09",
    views: 155,
    category: "rides",
  },
  {
    id: "4sH-hzEphD4",
    title: "How I Got My First MIS Job After a Gap | My Real Journey",
    description:
      "An honest account of navigating rejection and a career gap before landing my first MIS Executive role, for anyone facing a similar challenge.",
    publishedAt: "2025-12-07T09:28:12-08:00",
    duration: "5:52",
    views: 64,
    category: "life",
  },
  {
    id: "sY2h1Gsx_ZI",
    title: "Morning Ride in the Mountains 🌄 | Meteor 350 Fireball Black | Royal Enfield Vibes",
    description:
      "A peaceful morning ride through the mountains on the Royal Enfield Meteor 350 Fireball Black.",
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
      "A journey to Kanchana Mata Temple at Anantpur Garh, set high in the hills above Sarkaghat.",
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
      "Explore Kamlah Fort (Kamlahgarh) and Baba Kamlahiya Temple, two historic landmarks in Mandi district.",
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
      "Visit Baba Kamlahiya Temple in Chandpur and enjoy two scenic viewpoints along the trek.",
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
      "Part 2 of the road trip from Chandigarh into the heart of Himachal Pradesh.",
    publishedAt: "2025-06-05T10:04:46-07:00",
    duration: "5:51",
    views: 121,
    category: "travel",
  },
  {
    id: "Zt6EH13HBM8",
    title: "Bengaluru to Himachal Pradesh in 2 Days — Part 1",
    description:
      "The journey from Bengaluru to Himachal Pradesh, including a short stop in Chandigarh.",
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
  { id: "nTN2vw5j7VY", title: "A temple that hosts a grand annual community feast", publishedAt: "2025-06-09T02:02:29-07:00", views: 778 },
];

/** Places explored — Home & About pages par dikhte hain */
export const places = [
  {
    name: "Kamlah Fort",
    area: "Kamlahgarh, Mandi",
    note: "A centuries-old fort perched on a mountain ridge, among Himachal Pradesh's most overlooked historic sites.",
    videoId: "sbHuha-IWzY",
  },
  {
    name: "Kanchana Mata Mandir",
    area: "Anantpur Garh, Sarkaghat",
    note: "A peaceful temple above the clouds at Anantpur Garh, in the hills near Sarkaghat.",
    videoId: "QHAmMv4mdRE",
  },
  {
    name: "Mata Awahdevi Mandir",
    area: "Awahdevi",
    note: "A revered spiritual site dedicated to Mata Awahdevi and Baba Balak Nath.",
    videoId: "49GLZkMXvqE",
  },
  {
    name: "Baba Kamlahiya Mandir",
    area: "Chandpur",
    note: "A scenic trek with two viewpoints and an annual community gathering.",
    videoId: "Ml16dPjXUME",
  },
] as const;

/** Garage — machines that power the adventures */
export const garage = [
  {
    name: "Royal Enfield Meteor 350",
    variant: "Fireball Black",
    note: "A 349cc cruiser for relaxed morning rides through the mountains.",
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
  { date: "Mar 2020", title: "Launching XploreWithKrrish", text: "Started a YouTube channel to share journeys and stories from Himachal." },
  { date: "Jun 2025", title: "Bengaluru → Himachal in 2 Days", text: "A cross-country road trip from Bengaluru to home in the mountains via Chandigarh." },
  { date: "Jun–Jul 2025", title: "Hidden Himachal series", text: "Explored Kamlah Fort, Baba Kamlahiya, Awahdevi, and Kanchana Mata in Mandi." },
  { date: "Oct 2025", title: "Meteor 350 Fireball Black", text: "A new Royal Enfield and a new chapter of mountain rides." },
  { date: "Dec 2025", title: "My first MIS role", text: "Shared the journey to my first MIS Executive role after a career gap and rejections." },
  { date: "Oct 2026", title: "Scorpio Classic S11", text: "Welcomed the Scorpio Classic S11 and crossed 35K views on a Short." },
  { date: "Nov 2026", title: "Diwali with Scorpio", text: "Celebrated Diwali at home with family and the new vehicle." },
] as const;
