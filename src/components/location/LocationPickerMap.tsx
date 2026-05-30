"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon paths for Next.js/webpack
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationPickerMapProps {
  position: [number, number] | null;
  onPositionChange: (lat: number, lng: number) => void;
  center: [number, number];
  zoom: number;
}

function MapClickHandler({ onPositionChange }: { onPositionChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapCenterUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  const prevCenter = useRef(center);

  useEffect(() => {
    if (prevCenter.current[0] !== center[0] || prevCenter.current[1] !== center[1]) {
      map.flyTo(center, zoom, { duration: 0.8 });
      prevCenter.current = center;
    }
  }, [center, zoom, map]);

  return null;
}

export default function LocationPickerMap({ position, onPositionChange, center, zoom }: LocationPickerMapProps) {
  const markerRef = useRef<L.Marker>(null);

  const handleDragEnd = useCallback(() => {
    const marker = markerRef.current;
    if (marker) {
      const latlng = marker.getLatLng();
      onPositionChange(latlng.lat, latlng.lng);
    }
  }, [onPositionChange]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full rounded-xl z-0"
      style={{ minHeight: "250px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />
      <MapClickHandler onPositionChange={onPositionChange} />
      <MapCenterUpdater center={center} zoom={zoom} />
      {position && (
        <Marker
          position={position}
          draggable
          ref={markerRef}
          eventHandlers={{ dragend: handleDragEnd }}
        />
      )}
    </MapContainer>
  );
}
