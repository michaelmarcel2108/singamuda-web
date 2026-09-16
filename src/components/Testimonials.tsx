'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Testimonial } from '@/app/admin/testimonials/page';
import useEmblaCarousel from 'embla-carousel-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (loading || testimonials.length === 0) {
    return null; // Do not render section if no testimonials or loading
  }

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  return (
    <section className="py-20 bg-stone-950 border-t border-stone-800 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-amber-500 uppercase tracking-widest mb-4">
            Kata Mereka
          </h2>
          <p className="text-stone-400 text-sm max-w-2xl mx-auto font-light">
            Pengalaman dan ulasan dari pengunjung setia Singamuda Coffee.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
              {testimonials.map((item) => (
                <div key={item.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                  <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 h-full flex flex-col hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-1 text-amber-500 text-sm mb-4">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fa-solid fa-star ${i < item.rating ? '' : 'text-stone-700'}`}></i>
                      ))}
                    </div>
                    <p className="text-stone-300 text-sm leading-relaxed mb-6 flex-grow italic">
                      "{item.comment}"
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-stone-800/60">
                      <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center border border-stone-700 text-stone-400 font-bold">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-stone-200 font-semibold text-sm">{item.name}</h4>
                        <span className="text-stone-500 text-xs">Pengunjung</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={scrollPrev}
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-900 border border-stone-800 text-amber-500 flex items-center justify-center hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 transition-all z-10 shadow-lg"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
            onClick={scrollNext}
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-900 border border-stone-800 text-amber-500 flex items-center justify-center hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 transition-all z-10 shadow-lg"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
