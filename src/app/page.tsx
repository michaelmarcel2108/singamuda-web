import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import BestSellerSection from "@/components/BestSeller";
import CoffeeMenu from "@/components/CoffeeMenu";
import Roastery from "@/components/Roastery";
import Footer from "@/components/Footer";

import SocialReviews from "@/components/SocialReviews";

export const revalidate = 60; // revalidate every 60 seconds

export default async function Home() {
  // Fetch data from Supabase
  let settings = null;
  let allProducts = [];

  try {
    const [
      { data: settingsData },
      { data: productsData }
    ] = await Promise.all([
      supabase.from("site_settings").select("*").limit(1).single(),
      supabase.from("products").select("*").order("created_at", { ascending: true })
    ]);

    settings = settingsData;
    allProducts = productsData || [];
  } catch (error) {
    console.error("Supabase fetch error or not configured:", error);
  }

  // Use fallback if data is empty (likely because Supabase is not connected yet)
  const finalSettings = {
    logoUrl: settings?.logo_url || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300",
    bgHero: settings?.hero_bg_url || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600",
    imgStory: settings?.story_img_url || "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600",
    imgRoastery: settings?.roastery_img_url || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600",
    embedTiktok: settings?.embed_tiktok || "",
    embedInstagram: settings?.embed_instagram || "",
    embedYoutube: settings?.embed_youtube || "",
  };

  // Filter products by category and best seller flag
  const bestSellers = allProducts.filter(p => p.is_best_seller);
  const regularMenu = allProducts; // Pass all to CoffeeMenu, it will filter by tabs
  const roasteryProducts = allProducts.filter(p => p.category === 'roastery');

  return (
    <main>
      <Navbar logoUrl={finalSettings.logoUrl} />
      <Hero logoUrl={finalSettings.logoUrl} bgHero={finalSettings.bgHero} />
      <OurStory imgStory={finalSettings.imgStory} />
      <BestSellerSection bestSellers={bestSellers} />
      <CoffeeMenu menuList={regularMenu} />
      <Roastery imgRoastery={finalSettings.imgRoastery} products={roasteryProducts} />
      <SocialReviews 
        embedTiktok={finalSettings.embedTiktok}
        embedInstagram={finalSettings.embedInstagram}
        embedYoutube={finalSettings.embedYoutube}
      />
      <Footer />
    </main>
  );
}
