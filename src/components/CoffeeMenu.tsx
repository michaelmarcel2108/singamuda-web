import ProductCard from "./ProductCard";

export default function CoffeeMenu({ menuList }: { menuList: any[] }) {
  return (
    <section id="menu-kafe" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 border-b border-stone-800/60">
      <div className="text-center max-w-lg mx-auto space-y-2 mb-16">
        <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
          Freshly Brewed Every Day
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          VARIASI MENU KAFE
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuList.length === 0 && (
          <p className="text-stone-500 text-center col-span-full">Belum ada menu kafe.</p>
        )}
        {menuList.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
