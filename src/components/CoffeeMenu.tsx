'use client';

import { useState } from "react";
import ProductCard from "./ProductCard";

export default function CoffeeMenu({ menuList }: { menuList: any[] }) {
  const [activeTab, setActiveTab] = useState<'minuman' | 'makanan' | 'beans'>('minuman');

  // Filter based on category
  const filteredMenu = menuList.filter((item) => {
    if (activeTab === 'minuman') return item.category === 'coffee';
    if (activeTab === 'makanan') return item.category === 'food';
    if (activeTab === 'beans') return item.category === 'roastery';
    return false;
  });

  return (
    <section id="menu-kafe" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 border-b border-stone-800/60">
      <div className="text-center max-w-lg mx-auto space-y-2 mb-10">
        <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
          Freshly Brewed & Prepared
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          VARIASI MENU
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-stone-900 border border-stone-800 p-1 rounded-full">
          <button
            onClick={() => setActiveTab('minuman')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-colors ${
              activeTab === 'minuman' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-400 hover:text-white'
            }`}
          >
            Minuman
          </button>
          <button
            onClick={() => setActiveTab('makanan')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-colors ${
              activeTab === 'makanan' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-400 hover:text-white'
            }`}
          >
            Makanan
          </button>
          <button
            onClick={() => setActiveTab('beans')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-colors ${
              activeTab === 'beans' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-400 hover:text-white'
            }`}
          >
            Beans
          </button>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMenu.length === 0 && (
          <p className="text-stone-500 text-center col-span-full py-10">Belum ada menu di kategori ini.</p>
        )}
        {filteredMenu.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
