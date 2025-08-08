'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false, // Only run on client side (Leaflet needs browser)
});

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">🌍 Cloud Travel Memory Map</h1>
      <Map />
    </main>
  );
}
