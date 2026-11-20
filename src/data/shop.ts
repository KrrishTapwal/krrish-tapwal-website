/**
 * SHOP — Baad mein jo bhi bechna ho (merch, ghee, pahadi products) yahan add karo.
 *
 *  status: "coming-soon"  -> "Coming Soon" badge + "Notify me" button
 *  status: "available"    -> price + "Buy / Order" button (buyUrl par jaayega:
 *                            WhatsApp link, Instamojo, Razorpay page, Amazon, etc.)
 */

export type Product = {
  slug: string;
  name: string;
  category: "Merch" | "Pahadi Kitchen" | "Himachali Goodies";
  description: string;
  price?: number; // INR
  status: "coming-soon" | "available";
  buyUrl?: string;
  emoji: string; // photo aane tak placeholder
  image?: string; // e.g. "/images/shop/ghee.jpg" (public/ folder mein daalo)
  tone: "moss" | "pine" | "snow" | "dusk";
};

export const products: Product[] = [
  {
    slug: "xplore-tee",
    name: "XploreWithKrrish Tee",
    category: "Merch",
    description: "Heavyweight cotton tee — pahadon ki line-art aur ‘Xplore With Krrish’ print ke saath.",
    status: "coming-soon",
    emoji: "👕",
    tone: "dusk",
  },
  {
    slug: "mountain-hoodie",
    name: "Himachal Mountain Hoodie",
    category: "Merch",
    description: "Pahadi thand ke liye — cozy fleece hoodie, cinematic mountain graphic.",
    status: "coming-soon",
    emoji: "🧥",
    tone: "pine",
  },
  {
    slug: "pahadi-desi-ghee",
    name: "Pahadi Desi Ghee",
    category: "Pahadi Kitchen",
    description: "Himachal ke gaon se, pahadi gaayon ka shuddh desi ghee — ghar jaisa swaad.",
    status: "coming-soon",
    emoji: "🧈",
    tone: "moss",
  },
  {
    slug: "himachali-goodies",
    name: "Himachali Goodies Box",
    category: "Himachali Goodies",
    description: "Pahadi masale, rajmah, shahad aur local specialities — Himachal ka swaad ek box mein.",
    status: "coming-soon",
    emoji: "🎁",
    tone: "snow",
  },
  {
    slug: "xplore-cap",
    name: "Explorer Cap",
    category: "Merch",
    description: "Treks aur rides ke liye — embroidered XploreWithKrrish cap.",
    status: "coming-soon",
    emoji: "🧢",
    tone: "dusk",
  },
  {
    slug: "sticker-pack",
    name: "Pahadi Sticker Pack",
    category: "Merch",
    description: "Helmet, laptop, gaadi — har jagah Himachal ki vibe.",
    status: "coming-soon",
    emoji: "🏔️",
    tone: "pine",
  },
];
