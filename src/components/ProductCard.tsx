import React from 'react';

type Product = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  weight?: string | null;
  image_url?: string | null;
  is_best_seller: boolean;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-stone-950 border border-stone-800/60 p-3 sm:p-5 flex flex-row sm:flex-col justify-between gap-4 sm:gap-4 shadow-xl relative overflow-hidden group h-full">
      {/* Badge BEST SELLER */}
      {product.is_best_seller && (
        <div className="absolute top-2 right-2 bg-amber-500 text-stone-950 font-black text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 uppercase tracking-wider rounded-sm z-10">
          <i className="fa-solid fa-star"></i> BEST SELLER
        </div>
      )}

      {/* Gambar & Deskripsi */}
      <div className="flex flex-row sm:flex-col gap-3 sm:space-y-3 w-full min-w-0 flex-grow">
        <div className="w-20 h-20 sm:w-full sm:h-auto sm:aspect-square bg-stone-900 border border-stone-800 p-1 overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image_url || 'https://via.placeholder.com/400x400?text=No+Image'}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            alt={product.name}
          />
        </div>
        <div className="space-y-1 flex-grow flex flex-col justify-between sm:justify-start min-w-0 pt-1 sm:pt-0">
          <div>
            <h3 className="font-black text-sm sm:text-base text-white uppercase tracking-wide line-clamp-2 pr-2 sm:pr-0">
              {product.name}
            </h3>
            <p className="text-stone-400 text-[11px] sm:text-xs font-light leading-relaxed line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>
          <div className="sm:hidden mt-2">
            <span className="text-amber-500 font-black text-sm">{formatPrice(product.price)}</span>
            {product.weight && <span className="text-stone-500 text-xs ml-2">({product.weight})</span>}
          </div>
        </div>
      </div>

      {/* Info Harga & Footer Card Desktop */}
      <div className="hidden sm:flex justify-between items-center pt-3 border-t border-stone-800 mt-auto flex-shrink-0">
        <div>
          <span className="text-amber-500 font-black text-sm">{formatPrice(product.price)}</span>
          {product.weight && <span className="text-stone-500 text-xs ml-2">/ {product.weight}</span>}
        </div>
      </div>
    </div>
  );
}
