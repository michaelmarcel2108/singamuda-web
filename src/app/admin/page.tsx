'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type Product = {
  id: string;
  category: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  weight: string | null;
  image_url: string | null;
  is_best_seller: boolean;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Gagal mengambil data produk dari Supabase.');
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
      alert('Produk berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Gagal menghapus produk. Pastikan akses tulis (RLS) diizinkan.');
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Manajemen Produk</h1>
        <Link 
          href="/admin/products/new"
          className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-stone-500">Memuat data...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-stone-500">Belum ada produk yang ditambahkan.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-500 border-b border-stone-200">
              <tr>
                <th className="p-4 font-semibold">Nama Produk</th>
                <th className="p-4 font-semibold">Kategori</th>
                <th className="p-4 font-semibold">Harga</th>
                <th className="p-4 font-semibold">Terlaris</th>
                <th className="p-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-stone-200 rounded-md flex items-center justify-center">
                          <i className="fa-solid fa-image text-stone-400"></i>
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-stone-900">{product.name}</div>
                        <div className="text-sm text-stone-500 truncate max-w-xs">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.category === 'coffee' ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-800'}`}>
                      {product.category === 'coffee' ? 'Kopi' : 'Roastery'}
                    </span>
                  </td>
                  <td className="p-4 text-stone-600 font-medium">{formatPrice(product.price)}</td>
                  <td className="p-4">
                    {product.is_best_seller ? (
                      <i className="fa-solid fa-star text-amber-500"></i>
                    ) : (
                      <span className="text-stone-300">-</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/products/${product.slug || product.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
