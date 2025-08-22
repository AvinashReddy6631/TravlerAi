"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

// Fix marker icons (public folder in Next.js)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

// Types for markers
interface MarkerData {
  id: string | number;
  position: LatLngExpression;
  label: string;
}

interface MapViewProps {
  markers?: MarkerData[];
}

export default function MapView({ markers = [] }: MapViewProps) {
  // Default center → Hyderabad
  const center: LatLngExpression = [17.385044, 78.486671];

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
