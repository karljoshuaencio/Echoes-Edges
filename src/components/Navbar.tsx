'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full px-8 py-4 flex items-center justify-between shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-3xl bg-white/10 border-b border-white/30 rounded-b-[2rem]">
      <h1 className="text-xl font-semibold text-white drop-shadow">Echoes & Edges</h1>
      <nav className="flex space-x-6 text-white">
        <Link href="/dashboard" className="hover:underline transition-all duration-200 ease-in-out">Dashboard</Link>
        <Link href="/map" className="hover:underline transition-all duration-200 ease-in-out">Map</Link>
        <Link href="/add-pin" className="hover:underline transition-all duration-200 ease-in-out">Feed</Link>
        <Link href="/profile" className="hover:underline transition-all duration-200 ease-in-out">Profile</Link>
      </nav>
    </header>
  );
}
