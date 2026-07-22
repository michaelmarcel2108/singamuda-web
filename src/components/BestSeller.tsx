import ProductCard from "./ProductCard";
import Link from 'next/link';

export default function BestSellerSection({ bestSellers, dict, dictProduct }: { bestSellers: any[]; dict?: any; dictProduct?: any }) {
  return (
    <section
      id="best-seller"
      className="max-w-7xl mx-auto px-4 sm:px-8 py-20 bg-stone-950 border border-stone-800/40 my-10"
    >
      <div className="text-center max-w-lg mx-auto space-y-2 mb-12">
        <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
          <i className="fa-solid fa-fire"></i> Terfavorit Bulan Ini
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-widest">
          {dict?.title_1 || 'PILIHAN'} <span className="text-amber-500">{dict?.title_2 || 'TERFAVORIT'}</span>
        </h2>
        <p className="text-stone-400 mt-3 max-w-2xl mx-auto">
          {dict?.subtitle || 'Kopi dan sajian andalan kami yang selalu jadi incaran pelanggan setiap hari.'}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {bestSellers.length === 0 && (
          <p className="text-stone-500 text-center col-span-full">Belum ada data best seller.</p>
        )}
        {bestSellers.map((item) => (
          <ProductCard key={item.id} product={item} dict={dictProduct} />
        ))}
      </div>
    </section>
  );
}
