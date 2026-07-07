import ProductCard from "./ProductCard";

export default function BestSellerSection({ bestSellers }: { bestSellers: any[] }) {
  return (
    <section
      id="best-seller"
      className="max-w-7xl mx-auto px-4 sm:px-8 py-20 bg-stone-950 border border-stone-800/40 my-10"
    >
      <div className="text-center max-w-lg mx-auto space-y-2 mb-12">
        <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
          <i className="fa-solid fa-fire"></i> Terfavorit Bulan Ini
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          PRODUK TERLARIS KAMI
        </h2>
        <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-3"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestSellers.length === 0 && (
          <p className="text-stone-500 text-center col-span-full">Belum ada data best seller.</p>
        )}
        {bestSellers.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
