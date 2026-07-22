"use client";
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  image_url: string;
  description: string;
  created_at: string;
};

export default function NewsSection({ newsItems, dict }: { newsItems: NewsItem[]; dict?: any }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (!newsItems || newsItems.length === 0) return null;

  return (
    <section className="py-24 bg-stone-900 overflow-hidden relative">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl font-black text-amber-500 uppercase tracking-widest">
          {dict?.title || 'Berita & Aktivitas'}
        </h2>
        <p className="text-stone-400 mt-3 max-w-2xl mx-auto">
          {dict?.subtitle || 'Ikuti terus perkembangan terbaru dan kegiatan seru di Singa Muda Coffee.'}
        </p>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {newsItems.map((item, index) => {
              const isActive = index === selectedIndex;
              return (
                <div 
                  key={item.id} 
                  className={`flex-[0_0_85%] sm:flex-[0_0_55%] lg:flex-[0_0_45%] min-w-0 px-2 sm:px-4 transition-all duration-700 ease-out ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.92]'
                  }`}
                >
                  <Link href={`/berita/${item.slug}`} className="block group h-full">
                    <div className="bg-stone-950 border border-stone-800/80 rounded-sm overflow-hidden shadow-2xl h-full flex flex-col transition-all duration-300 hover:border-amber-500/50">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={item.image_url || 'https://via.placeholder.com/800x450'} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-stone-950 text-amber-500 border border-amber-500/30 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-md">
                          {item.category}
                        </div>
                      </div>
                      <div className="p-6 sm:p-8 flex-grow flex flex-col">
                        <span className="text-stone-500 text-xs mb-3 block font-medium uppercase tracking-wider">
                          {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide mb-3 group-hover:text-amber-500 transition-colors line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-stone-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                          {item.description}
                        </p>
                        <span className="text-amber-500 text-xs font-black uppercase tracking-wider flex items-center gap-2 mt-auto">
                          {dict?.read_more || 'Baca Selengkapnya'} <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={scrollPrev}
          className="absolute left-2 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-stone-950 hover:bg-amber-500 text-amber-500 hover:text-stone-950 rounded-full border border-amber-500/30 transition-all z-10 shadow-lg group"
        >
          <i className="fa-solid fa-chevron-left text-xl group-hover:-translate-x-0.5 transition-transform"></i>
        </button>
        <button 
          onClick={scrollNext}
          className="absolute right-2 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-stone-950 hover:bg-amber-500 text-amber-500 hover:text-stone-950 rounded-full border border-amber-500/30 transition-all z-10 shadow-lg group"
        >
          <i className="fa-solid fa-chevron-right text-xl group-hover:translate-x-0.5 transition-transform"></i>
        </button>
      </div>
      
      <div className="text-center mt-16">
        <Link href="/berita" className="inline-block bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-stone-950 px-8 py-3 text-sm font-black uppercase tracking-widest transition-colors rounded-sm">
          {dict?.view_all || 'Lihat Semua'}
        </Link>
      </div>
    </section>
  );
}
