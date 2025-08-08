'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from 'leaflet';

const Map = () => {
  const position: [number, number] = [14.5995, 120.9842]; // Default: Manila

  return (
    <MapContainer
      center={position}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: '80vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          📍 You visited Manila!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
