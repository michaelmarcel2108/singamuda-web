import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { NewsItem } from "@/components/NewsSection";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  let { data: news } = await supabase
    .from("news")
    .select("title, description")
    .eq("slug", decodedSlug)
    .single();

  if (!news) {
    const slugified = decodedSlug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    if (slugified !== decodedSlug) {
      const fallback = await supabase
        .from("news")
        .select("title, description")
        .eq("slug", slugified)
        .single();
      news = fallback.data;
    }
  }

  if (!news) {
    return { title: "Berita Tidak Ditemukan" };
  }

  return {
    title: `${news.title} - Singa Muda Coffee`,
    description: news.description,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "id";
  const dict = getDictionary(locale);
  
  const { data: settingsData } = await supabase.from("site_settings").select("*").limit(1).single();
  const logoUrl = settingsData?.logo_url || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300";

  const decodedSlug = decodeURIComponent(slug);
  let { data: newsData } = await supabase
    .from("news")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (!newsData) {
    const slugified = decodedSlug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    if (slugified !== decodedSlug) {
      const fallback = await supabase
        .from("news")
        .select("*")
        .eq("slug", slugified)
        .single();
      newsData = fallback.data;
    }
  }

  if (!newsData) {
    notFound();
  }

  const news: NewsItem = newsData;
  const contentParagraphs = news.content.split('\n').filter(p => p.trim() !== '');

  return (
    <main className="bg-stone-900 min-h-screen">
      <Navbar logoUrl={logoUrl} dict={dict.navbar} />
      
      <div className="pt-32 pb-20 px-4 sm:px-8 max-w-4xl mx-auto">
        <Link href="/berita" className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-500 transition-colors mb-8 text-sm font-black uppercase tracking-wider">
          <i className="fa-solid fa-arrow-left"></i> {dict.news?.back_to_news || 'Kembali ke Berita'}
        </Link>
        
        <article className="bg-stone-950 border border-stone-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden">
            <img 
              src={news.image_url || 'https://via.placeholder.com/1200x600'} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-stone-950 text-amber-500 border border-amber-500/30 text-xs font-black px-4 py-2 uppercase tracking-widest rounded-sm shadow-md">
              {news.category}
            </div>
          </div>
          
          <div className="p-6 sm:p-12">
            <header className="mb-10 border-b border-stone-800 pb-8">
              <span className="text-stone-500 text-sm mb-3 block font-medium uppercase tracking-wider">
                {new Date(news.created_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                {news.title}
              </h1>
            </header>
            
            <div className="prose prose-invert prose-stone max-w-none">
              {contentParagraphs.map((paragraph, index) => (
                <p key={index} className="text-stone-300 mb-6 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>

      <Footer dict={dict.footer} />
    </main>
  );
}
