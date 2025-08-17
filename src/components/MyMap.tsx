"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ReactDOMServer from "react-dom/server";

import L from "leaflet";
import { MapPin } from "lucide-react";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const center: [number, number] = [-3.656097, 103.774133];

export default function MyMap() {
  const lucideHtml = ReactDOMServer.renderToString(
    <MapPin size={36} strokeWidth={1} color="#f7f4eb" fill="#cd5b43" />
  );
  const markerIcon = L.divIcon({
    html: lucideHtml,
    className: "",
    iconSize: [36, 36],
  });

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: "400px", width: "100%" }}
      className="z-40">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center} icon={markerIcon}>
        <Popup>Lokasi di sini</Popup>
      </Marker>
    </MapContainer>
  );
}
