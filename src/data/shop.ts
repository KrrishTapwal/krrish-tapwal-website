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
  tone: "coral" | "violet" | "teal" | "silver" | "mustard" | "leaf"; // tile ka background colour
};

export const products: Product[] = [
  {
    slug: "xplore-tee",
    name: "XploreWithKrrish Tee",
    category: "Merch",
    description: "A heavyweight cotton tee featuring mountain line art and the XploreWithKrrish design.",
    status: "coming-soon",
    emoji: "👕",
    tone: "coral",
  },
  {
    slug: "mountain-hoodie",
    name: "Himachal Mountain Hoodie",
    category: "Merch",
    description: "A warm fleece hoodie featuring an original Himachal-inspired mountain graphic.",
    status: "coming-soon",
    emoji: "🧥",
    tone: "violet",
  },
  {
    slug: "pahadi-desi-ghee",
    name: "Pahadi Desi Ghee",
    category: "Pahadi Kitchen",
    description: "Traditional ghee sourced from local producers in Himachal Pradesh.",
    status: "coming-soon",
    emoji: "🧈",
    tone: "teal",
  },
  {
    slug: "himachali-goodies",
    name: "Himachali Goodies Box",
    category: "Himachali Goodies",
    description: "A curated selection of regional spices, rajma, honey, and local Himachali specialties.",
    status: "coming-soon",
    emoji: "🎁",
    tone: "silver",
  },
  {
    slug: "xplore-cap",
    name: "Explorer Cap",
    category: "Merch",
    description: "An embroidered XploreWithKrrish cap for treks, rides, and everyday wear.",
    status: "coming-soon",
    emoji: "🧢",
    tone: "mustard",
  },
  {
    slug: "sticker-pack",
    name: "Pahadi Sticker Pack",
    category: "Merch",
    description: "A collection of Himachal-inspired stickers for helmets, laptops, and more.",
    status: "coming-soon",
    emoji: "🏔️",
    tone: "leaf",
  },
];
