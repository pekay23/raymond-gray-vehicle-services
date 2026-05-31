import type { MetadataRoute } from "next";

const BASE = "https://vehicleservices.raymond-gray.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
