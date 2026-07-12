"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ logoUrl }: { logoUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800 text-xs uppercase tracking-widest">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center relative">
        <div className="flex items-center gap-3 z-50">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300"}
              alt="Logo"
              className="w-8 h-8 rounded-full object-cover border border-amber-500/30"
            />
            <span className="font-black text-amber-500 tracking-wider">SINGAMUDA COFFEE</span>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-stone-400 hover:text-white focus:outline-none p-1 z-50"
          aria-label="Toggle Menu"
        >
          <i className="fa-solid fa-bars text-lg"></i>
        </button>

        <div
          className={`${isOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 md:top-auto md:left-auto md:right-auto bg-stone-950/95 md:bg-transparent border-b border-stone-800 md:border-none p-6 md:p-0 items-center gap-6 md:gap-8 font-medium w-full md:w-auto box-border text-center`}
        >
          <Link href="/" onClick={() => setIsOpen(false)} className={`nav-link hover:text-amber-500 transition py-2 md:py-0 w-full block ${pathname === '/' ? 'text-amber-500' : ''}`}>Beranda</Link>
          <Link href="/katalog" onClick={() => setIsOpen(false)} className={`nav-link hover:text-amber-500 transition py-2 md:py-0 w-full block ${pathname === '/katalog' ? 'text-amber-500' : ''}`}>Katalog</Link>
          <Link href="/#story" onClick={() => setIsOpen(false)} className="nav-link hover:text-amber-500 transition py-2 md:py-0 w-full block">Filosofi</Link>
          <Link href="/#best-seller" onClick={() => setIsOpen(false)} className="nav-link hover:text-amber-500 transition py-2 md:py-0 w-full block">Favorit</Link>
          <Link href="/#menu-kafe" onClick={() => setIsOpen(false)} className="nav-link hover:text-amber-500 transition py-2 md:py-0 w-full block">Menu</Link>
          <Link href="/#roastery" onClick={() => setIsOpen(false)} className="nav-link hover:text-amber-500 transition py-2 md:py-0 w-full block">Roastery</Link>
          <Link href="/#location" onClick={() => setIsOpen(false)} className="nav-link hover:text-amber-500 transition py-2 md:py-0 w-full block">Lokasi</Link>
        </div>
      </div>
    </nav>
  );
}
