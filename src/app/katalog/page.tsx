import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";

export const revalidate = 0; // Disable cache so admin changes appear immediately

export const metadata = {
  title: "Katalog Produk - Singa Muda Coffee",
  description: "Jelajahi seluruh menu kopi dan produk roastery Singa Muda.",
};

export default async function KatalogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "id";
  const dict = getDictionary(locale);
  const params = await searchParams;

  // Fetch settings for Navbar and Footer
  const { data: settingsData } = await supabase.from("site_settings").select("*").limit(1).single();
  const logoUrl = settingsData?.logo_url || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300";

  // Fetch all products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const allProducts = products || [];
  const searchQuery = params?.q?.toLowerCase() || "";
  
  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery) || 
    (p.description && p.description.toLowerCase().includes(searchQuery))
  );
  
  const coffeeProducts = filteredProducts.filter(p => p.category === 'coffee');
  const foodProducts = filteredProducts.filter(p => p.category === 'food');
  const roasteryProducts = filteredProducts.filter(p => p.category === 'roastery');
  const otherProducts = filteredProducts.filter(p => !['coffee', 'food', 'roastery'].includes(p.category));

  return (
    <main className="bg-stone-900 min-h-screen">
      <Navbar logoUrl={logoUrl} dict={dict.navbar} />
      
      <div className="pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            {dict.catalog?.title_1 || 'Katalog'} <span className="text-amber-500">{dict.catalog?.title_2 || 'Produk'}</span>
          </h1>
          {searchQuery ? (
            <p className="text-stone-400 max-w-2xl mx-auto">
              {dict.catalog?.search_results || 'Hasil pencarian untuk:'} <strong className="text-white">"{params?.q}"</strong>
            </p>
          ) : (
            <p className="text-stone-400 max-w-2xl mx-auto">
              {dict.catalog?.subtitle || 'Temukan sajian kopi terbaik, menu makanan lezat, dan biji kopi pilihan langsung dari roastery kami.'}
            </p>
          )}
        </div>

        {searchQuery ? (
          /* Search Results Section - Show all matching items in one unified grid */
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8 border-b border-stone-800 pb-4">
              <i className="fa-solid fa-search text-2xl text-amber-500"></i>
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">
                {dict.catalog?.search_results || 'Hasil Pencarian'} ({filteredProducts.length})
              </h2>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-stone-950 border border-stone-800/40 rounded-lg">
                <i className="fa-solid fa-mug-hot text-4xl text-stone-600 mb-3 block"></i>
                <p className="text-stone-400 font-medium">{dict.catalog?.empty || 'Produk atau menu yang Anda cari tidak ditemukan.'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} dict={dict.product} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Coffee Menu Section */}
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-8 border-b border-stone-800 pb-4">
                <i className="fa-solid fa-mug-hot text-2xl text-amber-500"></i>
                <h2 className="text-2xl font-black text-white uppercase tracking-wider">{dict.catalog?.category_coffee || 'Menu Kopi'}</h2>
              </div>
              
              {coffeeProducts.length === 0 ? (
                <div className="text-center py-10 bg-stone-950 border border-stone-800/40 rounded-lg">
                  <p className="text-stone-500">{dict.catalog?.empty || 'Produk tidak ditemukan.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {coffeeProducts.map(product => (
                    <ProductCard key={product.id} product={product} dict={dict.product} />
                  ))}
                </div>
              )}
            </section>

            {/* Food Menu Section */}
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-8 border-b border-stone-800 pb-4">
                <i className="fa-solid fa-utensils text-2xl text-amber-500"></i>
                <h2 className="text-2xl font-black text-white uppercase tracking-wider">{dict.catalog?.category_food || 'Makanan & Snack'}</h2>
              </div>
              
              {foodProducts.length === 0 ? (
                <div className="text-center py-10 bg-stone-950 border border-stone-800/40 rounded-lg">
                  <p className="text-stone-500">{dict.catalog?.empty || 'Produk tidak ditemukan.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {foodProducts.map(product => (
                    <ProductCard key={product.id} product={product} dict={dict.product} />
                  ))}
                </div>
              )}
            </section>

            {/* Roastery Section */}
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-8 border-b border-stone-800 pb-4">
                <i className="fa-solid fa-fire text-2xl text-amber-500"></i>
                <h2 className="text-2xl font-black text-white uppercase tracking-wider">{dict.catalog?.category_roastery || 'Produk Roastery'}</h2>
              </div>
              
              {roasteryProducts.length === 0 ? (
                <div className="text-center py-10 bg-stone-950 border border-stone-800/40 rounded-lg">
                  <p className="text-stone-500">{dict.catalog?.empty || 'Produk tidak ditemukan.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {roasteryProducts.map(product => (
                    <ProductCard key={product.id} product={product} dict={dict.product} />
                  ))}
                </div>
              )}
            </section>

            {/* Other Products Section (if any) */}
            {otherProducts.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8 border-b border-stone-800 pb-4">
                  <i className="fa-solid fa-star text-2xl text-amber-500"></i>
                  <h2 className="text-2xl font-black text-white uppercase tracking-wider">Produk Lainnya</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {otherProducts.map(product => (
                    <ProductCard key={product.id} product={product} dict={dict.product} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <Footer dict={dict.footer} />
    </main>
  );
}
