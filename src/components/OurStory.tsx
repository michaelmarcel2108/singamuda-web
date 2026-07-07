export default function OurStory({ imgStory }: { imgStory: string }) {
  return (
    <section
      id="story"
      className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b border-stone-800/60"
    >
      <div className="space-y-6">
        <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
          Sejarah & Filosofi
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
          FILOSOFI SINGA MUDA COFFE
        </h2>
        <p className="text-stone-400 text-sm leading-relaxed">
          Singa Muda Coffee lahir dari kecintaan mendalam terhadap kekayaan biji kopi lokal Bali,
          khususnya daerah pegunungan Kintamani yang legendaris. Kami percaya bahwa setiap cangkir kopi
          membawa cerita tentang proses panjang dari petani, ketelitian sang roaster, hingga keahlian
          barista kami.
        </p>
      </div>
      <div className="w-full max-w-md mx-auto bg-stone-950 border border-stone-800/80 p-2">
        <div className="aspect-square overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgStory || "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600"}
            alt="Our Story"
            className="w-full h-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
