"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ReactDOMServer from "react-dom/server";

import L from "leaflet";
import { MapPin } from "lucide-react";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const center: [number, number] = [-3.656097, 103.774133];

export default function MyMap() {
  // Build DivIcon with Lucide SVG
  const lucideHtml = ReactDOMServer.renderToString(
    <MapPin size={36} strokeWidth={1} color="#f7f4eb" fill="#cd5b43" />
  );
  const markerIcon = L.divIcon({
    html: lucideHtml,
    className: "", // prevent leaflet default styles
    iconSize: [36, 36], // optional
  });

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: "400px", width: "100%" }}
      className="z-40">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* @typescript-eslint/no-explicit-any */}
      <Marker position={center} icon={markerIcon}>
        <Popup>Lokasi di sini</Popup>
      </Marker>
    </MapContainer>
  );
}
