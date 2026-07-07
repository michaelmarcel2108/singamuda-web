'use client';

import { useEffect, useState, use } from 'react';
import ProductForm from '../form';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (data) setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Produk tidak ditemukan!');
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug, router]);

  if (loading) {
    return <div className="p-8 text-center text-stone-500">Memuat data produk...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Edit Produk</h1>
        <p className="text-stone-500 mt-2">Ubah informasi produk di bawah ini.</p>
      </div>
      
      {product && (
        <ProductForm initialData={product} isEdit={true} />
      )}
    </div>
  );
}
