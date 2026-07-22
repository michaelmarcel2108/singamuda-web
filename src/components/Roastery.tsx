import ProductCard from "./ProductCard";
import Link from 'next/link';

export default function Roastery({
  imgRoastery,
  products,
  dict,
  dictProduct
}: {
  imgRoastery: string;
  products: any[];
  dict?: any;
  dictProduct?: any;
}) {
  return (
    <section id="roastery" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="space-y-6 lg:sticky lg:top-28 h-fit">
        <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
          Whole Bean & Grounds
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-amber-500 uppercase tracking-widest">
          {dict?.title_1 || 'FRESH'} <span className="text-white">{dict?.title_2 || 'ROASTERY'}</span>
        </h2>
        <p className="text-stone-400 mt-3 max-w-2xl mx-auto">
          {dict?.subtitle || 'Biji kopi segar hasil sangrai sendiri untuk kebutuhan kafe dan kedai Anda. Kami melayani pembelian grosir (Wholesale).'}
        </p>
        <div className="aspect-video bg-stone-950 border border-stone-800/80 p-2 mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgRoastery || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600"}
            alt="Roastery Gallery"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {products.length === 0 && (
          <p className="text-stone-500 text-center col-span-full">Belum ada produk roastery.</p>
        )}
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
