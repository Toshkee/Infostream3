import type { MetadataRoute } from "next";

// Single-page marketing site — one canonical entry. (Language is a client-side
// toggle on the same URL, so there are no separate /en /me URLs to list.)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://infostream.me",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
