import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { NewsItem } from "@/components/NewsSection";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";

export const revalidate = 60;

export const metadata = {
  title: "Berita & Aktivitas - Singa Muda Coffee",
  description: "Ikuti terus perkembangan terbaru dan kegiatan seru di Singa Muda Coffee.",
};

export default async function BeritaPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "id";
  const dict = getDictionary(locale);

  // Fetch settings for Navbar and Footer
  const { data: settingsData } = await supabase.from("site_settings").select("*").limit(1).single();
  const logoUrl = settingsData?.logo_url || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300";

  // Fetch all news
  const { data: newsData } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  const newsItems: NewsItem[] = newsData || [];

  return (
    <main className="bg-stone-900 min-h-screen">
      <Navbar logoUrl={logoUrl} dict={dict.navbar} />
      
      <div className="pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            {dict.news?.title?.split(' ')[0] || 'Berita'} <span className="text-amber-500">{dict.news?.title?.split(' ').slice(1).join(' ') || '& Aktivitas'}</span>
          </h1>
          <p className="text-stone-400 max-w-2xl mx-auto">
            {dict.news?.subtitle || 'Ikuti terus perkembangan terbaru dan kegiatan seru di Singa Muda Coffee.'}
          </p>
        </div>

        {newsItems.length === 0 ? (
          <div className="text-center py-20 bg-stone-950 border border-stone-800 rounded-lg">
            <p className="text-stone-500">{dict.news?.empty || 'Belum ada berita yang diterbitkan.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map(item => (
              <Link href={`/berita/${item.slug}`} key={item.id} className="block group">
                <div className="bg-stone-950 border border-stone-800 rounded-lg overflow-hidden shadow-xl h-full flex flex-col transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/800x450'} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-stone-950 text-amber-500 border border-amber-500/30 text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-sm">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <span className="text-stone-500 text-xs mb-2 block font-medium uppercase tracking-wider">
                      {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <h3 className="text-xl font-black text-white uppercase tracking-wide mb-3 group-hover:text-amber-500 transition-colors line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-stone-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {item.description}
                    </p>
                    <span className="text-amber-500 text-xs font-black uppercase tracking-wider flex items-center gap-2 mt-auto">
                      {dict.news?.read_more || 'Baca Selengkapnya'} <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer dict={dict.footer} />
    </main>
  );
}
