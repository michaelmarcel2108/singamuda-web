export default function Hero({ logoUrl, bgHero }: { logoUrl: string; bgHero: string }) {
  return (
    <section
      id="home"
      className="hero-bg relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('${bgHero || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600"}')`
      }}
    >
      <div className="absolute inset-0 bg-stone-950/70"></div>
      <div className="relative z-10 text-center px-4 max-w-3xl flex flex-col items-center pt-16 space-y-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300"}
          alt="Logo Utama"
          className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border border-amber-500/40 shadow-2xl mb-2 transition-all duration-300"
        />
        <h1 className="text-xl sm:text-3xl font-black tracking-widest text-white uppercase leading-none">
          SINGA MUDA COFFEE
        </h1>
        <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
          TEKS KETERANGAN SLOGAN SINGAMUDA
        </p>
        <div className="pt-2">
          <a
            href="#menu-kafe"
            className="bg-amber-500 text-stone-950 text-xs font-black px-6 py-3 uppercase tracking-wider hover:bg-amber-400 transition inline-block"
          >
            Lihat Menu Kami
          </a>
        </div>
      </div>
    </section>
  );
}
