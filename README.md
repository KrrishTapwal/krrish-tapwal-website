# Krrish Tapwal — Official Website

Next.js 16 + Tailwind CSS 4 · Domain: **krrishtapwal.space**

## Chalana (local)

```bash
npm install      # pehli baar
npm run dev      # http://localhost:3000 par khulegi
npm run build    # production build check
```

## Kya kahan edit karna hai

| Kya badalna hai | File |
|---|---|
| Naam, bio, stats, **social links**, email | `src/data/site.ts` |
| Videos, shorts, places, garage, timeline | `src/data/videos.ts` |
| Shop products (merch, ghee…) | `src/data/shop.ts` |
| Aapki photo | `public/images/krrish-tapwal.jpg` (aur `krrish-tapwal-portrait.jpg`) |
| Colors / fonts | `src/app/globals.css` (`@theme` block) |

**Nayi YouTube videos apne aap aati hain.** Website har **15 minute** mein aapka channel check karti hai:
- Nayi video ya short upload karte hi woh Home (sabse upar "Newest upload"), Videos page aur sitemap mein aa jaati hai.
- Category title dekh kar khud tay hoti hai (mandir/fort → Temples, Scorpio/bike → Rides, job/diwali → Life, baaki → Travel).
- Subscribers, views aur video count bhi live update hote hain. YouTube kabhi block kare to `site.ts` wale numbers dikhte hain.
- Kisi video ki duration ya apni description dikhani ho to use `videos.ts` mein add kar do (optional).

Yeh feature tab chalta hai jab site Vercel jaise server par live ho. Local `npm run dev` mein page refresh karne par bhi nayi video dikh jaati hai.

**Shop chalu karna:** `shop.ts` mein product ka `status: "available"`, `price` aur `buyUrl` set karo
(WhatsApp link, Instamojo, Razorpay payment page, ya Amazon). Photo `public/images/shop/` mein daal kar `image` path do.

## Domain par live karna (Vercel, free)

1. Code ko GitHub par push karo.
2. vercel.com → *Add New Project* → GitHub repo import → Deploy.
3. Vercel → Project → *Settings → Domains* → `krrishtapwal.space` aur `www.krrishtapwal.space` add karo.
4. Apne domain provider ke DNS mein Vercel ke bataye hue records (A / CNAME) daal do.

## SEO checklist (taaki "Krrish Tapwal" / "Tapwal" search par yahi site aaye)

Code mein pehle se hai: title/description, keywords, canonical URLs, Open Graph image, `sitemap.xml`,
`robots.txt`, JSON-LD (Person, WebSite, ProfilePage, VideoObject, FAQ, Breadcrumb), fast loading aur mobile-friendly layout.

Live hone ke baad yeh **aapko karna hai**:

1. **Google Search Console** (search.google.com/search-console) → domain add karo → verify karo →
   *Sitemaps* mein `sitemap.xml` submit karo → homepage ke liye *Request indexing* karo.
2. **Bing Webmaster Tools**: wahi sitemap submit karo (Bing results ke liye).
3. **Har profile par website ka link daalo.** Yeh sabse important hai:
   YouTube *About → Links*, Instagram bio, Facebook, aur har video ki description mein `krrishtapwal.space`.
4. Apne Instagram/Facebook links `src/data/site.ts` → `socials` mein bhar do. Isse Google aapke saare profiles ko ek insaan se jod paata hai.
5. Naam hamesha ek jaisa likho: **Krrish Tapwal**.
6. Search Console mein verification code mile to `src/app/layout.tsx` mein `verification` wali line uncomment karke code daal do.
