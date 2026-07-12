export default function Hero({ logoUrl, bgHero }: { logoUrl: string; bgHero: string }) {
  const isVideo = bgHero && bgHero.match(/\.(mp4|webm|ogg|mov)$/i);

  return (
    <section
      id="home"
      className="hero-bg relative h-screen flex items-center justify-center overflow-hidden"
    >
      {isVideo ? (
        <video
          src={bgHero}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${bgHero || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600"}')` }}
        />
      )}
      <div className="absolute inset-0 bg-stone-950/70"></div>
      <div className="relative z-10 text-center px-4 max-w-3xl flex flex-col items-center pt-16 space-y-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300"}
          alt="Logo Utama"
          className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border border-amber-500/40 shadow-2xl mb-2 transition-all duration-300"
        />
        <h1 className="text-xl sm:text-3xl font-black tracking-widest text-white uppercase leading-none">
          SINGAMUDA COFFEE
        </h1>
        <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
          Cerita kopi masa kini
        </p>
        <div className="pt-2 flex flex-col items-center gap-4">
          <a
            href="#menu-kafe"
            className="bg-amber-500 text-stone-950 text-xs font-black px-6 py-3 uppercase tracking-wider hover:bg-amber-400 transition inline-block"
          >
            Lihat Menu Kami
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
