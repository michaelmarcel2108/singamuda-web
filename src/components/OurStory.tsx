import Link from 'next/link';

export default function OurStory({ 
  imgStory, 
  title,
  content,
  dict 
}: { 
  imgStory: string; 
  title?: string;
  content?: string;
  dict?: any 
}) {
  return (
    <section
      id="story"
      className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b border-stone-800/60"
    >
      <div className="space-y-6">
        <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
          {dict?.header || "Tentang Kami"}
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
          {title || dict?.title || "TENTANG SINGAMUDA COFFEE"}
        </h2>
        <p className="text-stone-400 text-sm leading-relaxed whitespace-pre-line">
          {content || dict?.p1 || "Singamuda Coffee lahir dari kecintaan mendalam terhadap kekayaan biji kopi lokal Bali..."}
        </p>
        <div className="pt-4">
          <Link
            href="/tentang"
            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-3 transition-colors duration-300"
          >
            {dict?.read_more || "Baca Selengkapnya"}
          </Link>
        </div>
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
