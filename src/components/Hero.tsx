export default function Hero({ logoUrl, bgHero, bgHeroMobile, dict }: { logoUrl: string; bgHero: string; bgHeroMobile?: string; dict?: any }) {
  const isVideoDesktop = bgHero && bgHero.match(/\.(mp4|webm|ogg|mov)$/i);
  const isVideoMobile = bgHeroMobile && bgHeroMobile.match(/\.(mp4|webm|ogg|mov)$/i);
  const mobileBgUrl = bgHeroMobile || bgHero; // Fallback to desktop if mobile not provided
  const isVideoMob = isVideoMobile || (mobileBgUrl.match(/\.(mp4|webm|ogg|mov)$/i) && !bgHeroMobile); // fallback logic

  return (
    <section
      id="home"
      className="hero-bg relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Desktop Background */}
      <div className="hidden sm:block absolute inset-0 w-full h-full">
        {isVideoDesktop ? (
          <video
            src={bgHero}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${bgHero || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600"}')` }}
          />
        )}
      </div>

      {/* Mobile Background */}
      <div className="block sm:hidden absolute inset-0 w-full h-full">
        {isVideoMob ? (
          <video
            src={mobileBgUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${mobileBgUrl || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600"}')` }}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-stone-950/40"></div>
      <div className="relative z-10 text-center px-4 max-w-3xl flex flex-col items-center pt-16 space-y-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl || "/logo.png"}
          alt="Logo Utama"
          className="w-48 sm:w-64 object-contain mb-8 transition-all duration-300"
        />

        <div className="pt-2 flex flex-col items-center gap-4">
          <a
            href="#menu-kafe"
            className="bg-amber-500 text-stone-950 text-xs font-black px-6 py-3 uppercase tracking-wider hover:bg-amber-400 transition inline-block"
          >
            {dict?.cta_primary || 'Lihat Menu Kami'}
          </a>
          <div className="flex items-center gap-6 mt-4">
            <a
              href="https://instagram.com/singamudacoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-500 transition flex items-center gap-2"
            >
              <i className="fa-brands fa-instagram text-2xl"></i>
              <span className="text-xs uppercase tracking-wider hidden sm:inline-block">@singamudacoffee</span>
            </a>
            <a
              href="https://wa.me/6287767167168"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-500 transition flex items-center gap-2"
            >
              <i className="fa-brands fa-whatsapp text-2xl"></i>
              <span className="text-xs uppercase tracking-wider hidden sm:inline-block">WhatsApp Kami</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
