import { useEffect, useState } from "react";

// `wiki` is the Wikipedia page whose lead photo we show; `query` is what gets pre-filled in the trip form.
export const DESTINATIONS = [
  { name: "Goa", query: "Goa, India", region: "India", wiki: "Goa", tag: "Beaches & nightlife", currency: "INR", budget: 25000 },
  { name: "Jaipur", query: "Jaipur, India", region: "India", wiki: "Hawa_Mahal", tag: "Palaces & royal food", currency: "INR", budget: 20000 },
  { name: "Kerala", query: "Alleppey, Kerala, India", region: "India", wiki: "Alleppey", tag: "Backwaters & houseboats", currency: "INR", budget: 30000 },
  { name: "Manali", query: "Manali, India", region: "India", wiki: "Rohtang_Pass", tag: "Snow & mountain roads", currency: "INR", budget: 22000 },
  { name: "Ladakh", query: "Leh Ladakh, India", region: "India", wiki: "Pangong_Tso", tag: "High passes & lakes", currency: "INR", budget: 45000 },
  { name: "Udaipur", query: "Udaipur, India", region: "India", wiki: "Udaipur", tag: "City of lakes", currency: "INR", budget: 24000 },
  { name: "Bali", query: "Bali, Indonesia", region: "International", wiki: "Uluwatu_Temple", tag: "Temples & surf", currency: "INR", budget: 90000 },
  { name: "Dubai", query: "Dubai, UAE", region: "International", wiki: "Burj_Khalifa", tag: "Skyline & desert", currency: "AED", budget: 6000 },
  { name: "Paris", query: "Paris, France", region: "International", wiki: "Paris", tag: "Art, cafes & romance", currency: "EUR", budget: 1800 },
  { name: "Tokyo", query: "Tokyo, Japan", region: "International", wiki: "Shibuya_Crossing", tag: "Neon & street food", currency: "JPY", budget: 250000 },
  { name: "Santorini", query: "Santorini, Greece", region: "International", wiki: "Oia,_Greece", tag: "Sunsets & white villages", currency: "EUR", budget: 2000 },
  { name: "Singapore", query: "Singapore", region: "International", wiki: "Marina_Bay_Sands", tag: "Gardens & food streets", currency: "SGD", budget: 2500 },
];

const cache = new Map();

// Fetches a photo from Wikipedia's public API (no key needed). Falls back to null -> gradient.
export function useWikiImage(title, width = 900) {
  const [src, setSrc] = useState(cache.get(title) ?? null);
  useEffect(() => {
    if (!title || cache.has(title)) return;
    let live = true;
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const thumb = d?.thumbnail?.source;
        const url = thumb ? thumb.replace(/\/\d+px-/, `/${width}px-`) : null;
        cache.set(title, url);
        if (live) setSrc(url);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [title, width]);
  return src;
}
