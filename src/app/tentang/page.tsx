import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";

export const revalidate = 0;

export default async function TentangPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "id";
  const dict = getDictionary(locale);

  let settings = null;
  let aboutContents = [];
  try {
    const { data: settingsData } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();
    settings = settingsData;

    const { data: contentsData, error } = await supabase
      .from("about_contents")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: true });
      
    if (!error && contentsData) {
      aboutContents = contentsData;
    }
  } catch (error) {
    console.error("Supabase fetch error or not configured:", error);
  }

  const finalSettings = {
    logoUrl: settings?.logo_url || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300",
    bgHero: settings?.hero_bg_url || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600",
    imgStory: settings?.story_img_url || "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600",
  };

  return (
    <main className="min-h-screen bg-stone-950 flex flex-col">
      <Navbar logoUrl={finalSettings.logoUrl} dict={dict.navbar} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center min-h-[50vh] border-b border-stone-800/60 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={finalSettings.bgHero} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            {dict.story?.header || "Kenali Lebih Jauh"}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            Cerita Singamuda
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-4 max-w-6xl space-y-24">
          
          {aboutContents && aboutContents.length > 0 ? (
            aboutContents.map((content: any, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <div key={content.id} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  
                  {/* Image - Alternates order on desktop */}
                  <div className={`relative group ${!isEven ? 'md:order-2' : ''}`}>
                    <div className="absolute -inset-4 bg-amber-500/10 transform rotate-3 transition-transform duration-500 group-hover:rotate-1"></div>
                    <div className="absolute -inset-4 bg-stone-800/30 transform -rotate-3 transition-transform duration-500 group-hover:-rotate-1"></div>
                    <div className="relative bg-stone-900 p-2 border border-stone-800/80 z-10 flex items-center justify-center min-h-[300px]">
                      {content.image_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                          src={content.image_url} 
                          alt={content.title || "Singamuda Story"} 
                          className="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                        />
                      ) : (
                        <span className="text-stone-600 font-medium">Tanpa Gambar</span>
                      )}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-6">
                    {content.title && (
                      <h2 className="text-3xl font-black text-white uppercase mb-4">
                        {content.title}
                      </h2>
                    )}
                    <div className="prose prose-invert prose-stone max-w-none text-stone-300 leading-loose whitespace-pre-line">
                      <p>{content.content}</p>
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            /* Fallback Content */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-amber-500/10 transform rotate-3 transition-transform duration-500 group-hover:rotate-1"></div>
                <div className="absolute -inset-4 bg-stone-800/30 transform -rotate-3 transition-transform duration-500 group-hover:-rotate-1"></div>
                <div className="relative bg-stone-900 p-2 border border-stone-800/80 z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={finalSettings.imgStory} 
                    alt="Our Story" 
                    className="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-white uppercase mb-6">
                    {settings?.about_title || dict.story?.title || "Filosofi Kopi Kami"}
                  </h2>
                  <div className="prose prose-invert prose-stone max-w-none text-stone-300 leading-loose">
                    {settings?.about_desc ? (
                      <p className="whitespace-pre-line">{settings.about_desc}</p>
                    ) : (
                      <>
                        <p>
                          {dict.story?.p1 || "Singamuda Coffee lahir dari kecintaan mendalam terhadap kekayaan biji kopi lokal Bali, khususnya daerah pegunungan Kintamani yang legendaris."}
                        </p>
                        <p className="mt-4">
                          Kami percaya bahwa setiap cangkir kopi membawa cerita tentang proses panjang dari petani, ketelitian sang roaster, hingga keahlian barista kami. Dari kebun hingga cangkir Anda, kami menjaga setiap detail kualitas.
                        </p>
                        <p className="mt-4">
                          Kami tidak sekadar menyajikan kopi, tapi membangun komunitas dan mengapresiasi setiap kerja keras petani lokal. Bersama Singamuda, kami mengundang Anda menikmati cita rasa Nusantara yang sesungguhnya.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-stone-800">
                  <div>
                    <h3 className="text-4xl font-black text-amber-500 mb-2">100%</h3>
                    <p className="text-stone-400 text-sm font-medium uppercase tracking-wider">Kopi Lokal</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-amber-500 mb-2">Premium</h3>
                    <p className="text-stone-400 text-sm font-medium uppercase tracking-wider">Roastery</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
