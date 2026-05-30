"use client";

import { useCallback, useRef } from "react";

interface PhotonFeature {
  geometry: { coordinates: [number, number] }; // [lon, lat]
  properties: {
    name?: string;
    street?: string;
    housenumber?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
}

interface PhotonResponse {
  features: PhotonFeature[];
}

export interface GeocodingResult {
  address: string;
  latitude: number;
  longitude: number;
}

const PHOTON_BASE = "https://photon.komoot.io";
const MIN_INTERVAL_MS = 500;
// Bias results toward Ghana (center of country)
const BIAS_LAT = 7.9465;
const BIAS_LON = -1.0232;

function formatPhotonAddress(props: PhotonFeature["properties"]): string {
  const parts: string[] = [];
  if (props.name) parts.push(props.name);
  if (props.housenumber && props.street) {
    parts.push(`${props.housenumber} ${props.street}`);
  } else if (props.street) {
    parts.push(props.street);
  }
  if (props.city) parts.push(props.city);
  if (props.state) parts.push(props.state);
  if (props.country) parts.push(props.country);
  // Deduplicate consecutive identical parts (e.g. name === city)
  return parts.filter((p, i) => i === 0 || p !== parts[i - 1]).join(", ");
}

export function useGeocoding() {
  const lastRequestTime = useRef(0);

  const throttledFetch = useCallback(async (url: string): Promise<Response> => {
    const now = Date.now();
    const elapsed = now - lastRequestTime.current;
    if (elapsed < MIN_INTERVAL_MS) {
      await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - elapsed));
    }
    lastRequestTime.current = Date.now();
    return fetch(url);
  }, []);

  const searchAddress = useCallback(
    async (query: string): Promise<GeocodingResult[]> => {
      if (!query || query.length < 3) return [];
      try {
        const params = new URLSearchParams({
          q: query,
          limit: "5",
          lang: "en",
          lat: BIAS_LAT.toString(),
          lon: BIAS_LON.toString(),
        });
        const res = await throttledFetch(`${PHOTON_BASE}/api/?${params}`);
        if (!res.ok) return [];
        const data: PhotonResponse = await res.json();
        return data.features.map((f) => ({
          address: formatPhotonAddress(f.properties),
          latitude: f.geometry.coordinates[1],
          longitude: f.geometry.coordinates[0],
        }));
      } catch {
        return [];
      }
    },
    [throttledFetch]
  );

  const reverseGeocode = useCallback(
    async (lat: number, lng: number): Promise<string> => {
      try {
        const params = new URLSearchParams({
          lat: lat.toString(),
          lon: lng.toString(),
          limit: "1",
          lang: "en",
        });
        const res = await throttledFetch(`${PHOTON_BASE}/reverse?${params}`);
        if (!res.ok) return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        const data: PhotonResponse = await res.json();
        if (data.features.length > 0) {
          return formatPhotonAddress(data.features[0].properties);
        }
        return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      } catch {
        return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      }
    },
    [throttledFetch]
  );

  return { searchAddress, reverseGeocode };
}
