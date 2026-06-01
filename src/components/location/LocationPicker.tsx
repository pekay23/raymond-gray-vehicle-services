"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Search, Crosshair, MapPin, Loader2, X } from "lucide-react";
import { useGeocoding, type GeocodingResult } from "./useGeocoding";

const LocationPickerMap = dynamic(() => import("./LocationPickerMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[250px] rounded-xl bg-muted/30 border border-border flex items-center justify-center">
      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
    </div>
  ),
});

export interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
}

interface LocationPickerProps {
  value?: LocationData | null;
  onChange: (location: LocationData) => void;
  required?: boolean;
}

const DEFAULT_CENTER: [number, number] = [7.9465, -1.0232]; // Center of Ghana
const DEFAULT_ZOOM = 7;

export function LocationPicker({ value, onChange, required }: LocationPickerProps) {
  const { searchAddress, reverseGeocode } = useGeocoding();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState("");
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mapCenter: [number, number] = value
    ? [value.latitude, value.longitude]
    : DEFAULT_CENTER;
  const mapZoom = value ? 16 : DEFAULT_ZOOM;
  const markerPosition: [number, number] | null = value
    ? [value.latitude, value.longitude]
    : null;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = useCallback(
    (q: string) => {
      setQuery(q);
      setGeoError("");
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      if (q.length < 3) {
        setResults([]);
        setShowResults(false);
        return;
      }
      setIsSearching(true);
      searchTimeout.current = setTimeout(async () => {
        const res = await searchAddress(q);
        setResults(res);
        setShowResults(res.length > 0);
        setIsSearching(false);
      }, 400);
    },
    [searchAddress]
  );

  const selectResult = useCallback(
    (result: GeocodingResult) => {
      onChange(result);
      setQuery(result.address);
      setShowResults(false);
    },
    [onChange]
  );

  const handleMapPositionChange = useCallback(
    async (lat: number, lng: number) => {
      const address = await reverseGeocode(lat, lng);
      onChange({ address, latitude: lat, longitude: lng });
      setQuery(address);
    },
    [onChange, reverseGeocode]
  );

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const address = await reverseGeocode(latitude, longitude);
        onChange({ address, latitude, longitude });
        setQuery(address);
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setGeoError("Location permission denied. Please allow access in your browser settings.");
            break;
          case err.POSITION_UNAVAILABLE:
            setGeoError("Location unavailable. Please try again.");
            break;
          case err.TIMEOUT:
            setGeoError("Location request timed out. Please try again.");
            break;
          default:
            setGeoError("Could not get your location. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [onChange, reverseGeocode]);

  const clearLocation = useCallback(() => {
    setQuery("");
    setResults([]);
    onChange({ address: "", latitude: 0, longitude: 0 });
  }, [onChange]);

  return (
    <div className="space-y-3" ref={containerRef}>
      <label 
        className="font-mono text-[11px] tracking-widest uppercase text-rg-ink-mute transition-colors font-bold gap-x-1.5 leading-none min-h-[12px]"
        style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}
      >
        <span>Location</span>
        {required && <span className="text-rg-accent font-bold leading-none">*</span>}
      </label>

      {/* Search + Use My Location */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for a location..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => results.length > 0 && setShowResults(true)}
            className="w-full pr-10 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            style={{ paddingLeft: '44px' }}
          />
          {(query || isSearching) && (
            <button
              type="button"
              onClick={clearLocation}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Search Results Dropdown */}
          {showResults && (
            <ul className="absolute z-50 top-full mt-1 w-full bg-background border border-border rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto">
              {results.map((r, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => selectResult(r)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-muted/50 transition-colors flex items-start gap-3 border-b border-border/50 last:border-0"
                  >
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{r.address}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={isLocating}
          className="shrink-0 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/5 hover:border-primary/30 transition-all flex items-center justify-center gap-2 text-sm font-semibold text-foreground disabled:opacity-50"
          title="Use my current location"
        >
          {isLocating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Crosshair className="w-4 h-4" />
          )}
          <span>My Location</span>
        </button>
      </div>

      {geoError && (
        <p className="text-xs text-destructive font-medium">{geoError}</p>
      )}

      {/* Map */}
      <div className="h-[280px] sm:h-[320px] rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
        <LocationPickerMap
          position={markerPosition}
          onPositionChange={handleMapPositionChange}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <p className="text-[11px] text-muted-foreground">
        Search for an address, use your current location, or tap the map to place a pin.
      </p>

      {/* Selected Location Display */}
      {value && value.latitude !== 0 && (
        <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/20 rounded-xl">
          <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground line-clamp-2">{value.address}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {value.latitude.toFixed(5)}, {value.longitude.toFixed(5)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
