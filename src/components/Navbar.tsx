"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ logoUrl, dict }: { logoUrl: string, dict?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();


  useEffect(() => {
    setActiveHash(window.location.hash);
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  const handleNavClick = (hash: string) => {
    setIsOpen(false);
    setActiveHash(hash);
  };

  const isActive = (path: string, hash: string = "") => {
    if (pathname !== path) return false;
    if (hash === "" && (activeHash === "" || activeHash === "#home")) return true;
    return activeHash === hash;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800 text-xs uppercase tracking-widest">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between relative">
        
        {/* Left: Logo */}
        <div className="flex-1 flex items-center justify-start z-50">
          <Link href="/#home" onClick={() => handleNavClick("#home")} className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300"}
              alt="Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-amber-500/30"
            />
          </Link>
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8 font-medium">
          <Link href="/#home" onClick={() => handleNavClick("#home")} className={`nav-link hover:text-amber-500 transition ${isActive('/', '') ? 'text-amber-500' : ''}`}>{dict?.home || 'Beranda'}</Link>
          <Link href="/katalog" onClick={() => handleNavClick("")} className={`nav-link hover:text-amber-500 transition ${isActive('/katalog', '') ? 'text-amber-500' : ''}`}>{dict?.catalog || 'Katalog'}</Link>
          <Link href="/berita" onClick={() => handleNavClick("")} className={`nav-link hover:text-amber-500 transition ${isActive('/berita', '') ? 'text-amber-500' : ''}`}>{dict?.news || 'Berita'}</Link>
          <Link href="/#story" onClick={() => handleNavClick("#story")} className={`nav-link hover:text-amber-500 transition ${isActive('/', '#story') ? 'text-amber-500' : ''}`}>{dict?.story || 'Filosofi'}</Link>
          <Link href="/#best-seller" onClick={() => handleNavClick("#best-seller")} className={`nav-link hover:text-amber-500 transition ${isActive('/', '#best-seller') ? 'text-amber-500' : ''}`}>{dict?.best_seller || 'Favorit'}</Link>
          <Link href="/#menu-kafe" onClick={() => handleNavClick("#menu-kafe")} className={`nav-link hover:text-amber-500 transition ${isActive('/', '#menu-kafe') ? 'text-amber-500' : ''}`}>{dict?.menu || 'Menu'}</Link>
          <Link href="/#roastery" onClick={() => handleNavClick("#roastery")} className={`nav-link hover:text-amber-500 transition ${isActive('/', '#roastery') ? 'text-amber-500' : ''}`}>{dict?.roastery || 'Roastery'}</Link>
        </div>

        {/* Right: Search & Mobile Menu Toggle */}
        <div className="flex-1 flex items-center justify-end gap-4 z-50">
          <form action="/katalog" method="GET" className="relative hidden sm:block">
            <input 
              type="text" 
              name="q"
              placeholder={dict?.search_placeholder || "Cari..."}
              className="bg-stone-900 border border-stone-800 text-white text-xs rounded-full px-4 py-2 focus:outline-none focus:border-amber-500 w-32 md:w-40 lg:w-48 transition-all"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-500">
              <i className="fa-solid fa-search"></i>
            </button>
          </form>

          <LanguageSwitcher />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-stone-400 hover:text-white focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            <i className="fa-solid fa-bars text-lg"></i>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`${isOpen ? "flex" : "hidden"
            } md:hidden flex-col absolute top-full left-0 right-0 bg-stone-950/95 border-b border-stone-800 p-6 items-center gap-6 font-medium text-center shadow-2xl`}
        >
          <form action="/katalog" method="GET" className="relative w-full mb-2 sm:hidden">
            <input 
              type="text" 
              name="q"
              placeholder={dict?.search_placeholder || "Cari produk..."}
              className="bg-stone-900 border border-stone-800 text-white text-xs rounded-full px-4 py-3 focus:outline-none focus:border-amber-500 w-full transition-all"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-500">
              <i className="fa-solid fa-search"></i>
            </button>
          </form>

          <Link href="/#home" onClick={() => handleNavClick("#home")} className={`nav-link hover:text-amber-500 transition w-full block ${isActive('/', '') ? 'text-amber-500' : ''}`}>{dict?.home || 'Beranda'}</Link>
          <Link href="/katalog" onClick={() => handleNavClick("")} className={`nav-link hover:text-amber-500 transition w-full block ${isActive('/katalog', '') ? 'text-amber-500' : ''}`}>{dict?.catalog || 'Katalog'}</Link>
          <Link href="/berita" onClick={() => handleNavClick("")} className={`nav-link hover:text-amber-500 transition w-full block ${isActive('/berita', '') ? 'text-amber-500' : ''}`}>{dict?.news || 'Berita'}</Link>
          <Link href="/#story" onClick={() => handleNavClick("#story")} className={`nav-link hover:text-amber-500 transition w-full block ${isActive('/', '#story') ? 'text-amber-500' : ''}`}>{dict?.story || 'Filosofi'}</Link>
          <Link href="/#best-seller" onClick={() => handleNavClick("#best-seller")} className={`nav-link hover:text-amber-500 transition w-full block ${isActive('/', '#best-seller') ? 'text-amber-500' : ''}`}>{dict?.best_seller || 'Favorit'}</Link>
          <Link href="/#menu-kafe" onClick={() => handleNavClick("#menu-kafe")} className={`nav-link hover:text-amber-500 transition w-full block ${isActive('/', '#menu-kafe') ? 'text-amber-500' : ''}`}>{dict?.menu || 'Menu'}</Link>
          <Link href="/#roastery" onClick={() => handleNavClick("#roastery")} className={`nav-link hover:text-amber-500 transition w-full block ${isActive('/', '#roastery') ? 'text-amber-500' : ''}`}>{dict?.roastery || 'Roastery'}</Link>
        </div>
      </div>
    </nav>
  );
}
