import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import BestSellerSection from "@/components/BestSeller";
import CoffeeMenu from "@/components/CoffeeMenu";
import Roastery from "@/components/Roastery";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

import SocialReviews from "@/components/SocialReviews";
import Location from "@/components/Location";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";

export const revalidate = 0; // Disable cache so admin changes appear immediately

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "id";
  const dict = getDictionary(locale);

  // Fetch data from Supabase
  let settings = null;
  let allProducts = [];
  let newsItems = [];

  try {
    const [
      { data: settingsData },
      { data: productsData },
      { data: newsData }
    ] = await Promise.all([
      supabase.from("site_settings").select("*").limit(1).single(),
      supabase.from("products").select("*").order("created_at", { ascending: true }),
      supabase.from("news").select("*").order("created_at", { ascending: false }).limit(6)
    ]);

    settings = settingsData;
    allProducts = productsData || [];
    newsItems = newsData || [];
  } catch (error) {
    console.error("Supabase fetch error or not configured:", error);
  }

  // Use fallback if data is empty (likely because Supabase is not connected yet)
  const finalSettings = {
    logoUrl: settings?.logo_url || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300",
    heroLogoUrl: settings?.hero_logo_url || "/logo.png",
    bgHero: settings?.hero_bg_url || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600",
    bgHeroMobile: settings?.hero_bg_mobile_url || "",
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
      <Navbar logoUrl={finalSettings.logoUrl} dict={dict.navbar} />
      <Hero logoUrl={finalSettings.heroLogoUrl} bgHero={finalSettings.bgHero} bgHeroMobile={finalSettings.bgHeroMobile} dict={dict.hero} />
      <OurStory imgStory={finalSettings.imgStory} dict={dict.story} />
      <BestSellerSection bestSellers={bestSellers} dict={dict.best_seller} dictProduct={dict.product} />
      <CoffeeMenu menuList={regularMenu} dict={dict.coffee_menu} dictProduct={dict.product} />
      <Roastery imgRoastery={finalSettings.imgRoastery} products={roasteryProducts} dict={dict.roastery} dictProduct={dict.product} />
      <NewsSection newsItems={newsItems} dict={dict.news} />
      <SocialReviews 
        embedTiktok={finalSettings.embedTiktok}
        embedInstagram={finalSettings.embedInstagram}
        embedYoutube={finalSettings.embedYoutube}
      />
      <Location />
      <Footer dict={dict.footer} />
    </main>
  );
}
