'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type ProductFormData = {
  category: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  weight: string;
  image_url: string;
  is_best_seller: boolean;
};

type Props = {
  initialData?: ProductFormData & { id: string };
  isEdit?: boolean;
};

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export default function ProductForm({ initialData, isEdit = false }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    category: initialData?.category || 'coffee',
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    weight: initialData?.weight || '',
    image_url: initialData?.image_url || '',
    is_best_seller: initialData?.is_best_seller || false,
  });

  // Auto generate slug if not editing and name changes
  useEffect(() => {
    if (!isEdit && formData.name && !formData.slug) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.name) }));
    }
  }, [formData.name, isEdit, formData.slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image_url: previewUrl }));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('images')
      .upload(`products/${fileName}`, file, { cacheControl: '3600', upsert: false });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(`products/${fileName}`);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.image_url;

      // Upload file if selected
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const dataToSave = {
        ...formData,
        image_url: finalImageUrl,
        weight: formData.category === 'roastery' ? formData.weight : null,
        updated_at: new Date().toISOString()
      };

      if (isEdit && initialData?.id) {
        const { error } = await supabase
          .from('products')
          .update(dataToSave)
          .eq('id', initialData.id);
        
        if (error) throw error;
        alert('Produk berhasil diperbarui!');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([dataToSave]);
        
        if (error) throw error;
        alert('Produk berhasil ditambahkan!');
      }
      
      router.push('/admin');
      router.refresh();
    } catch (error: any) {
      console.error('Error saving product:', error);
      alert(`Gagal menyimpan produk: ${error?.message || 'Periksa kembali koneksi, struktur tabel (apakah kolom slug sudah ada?), atau RLS Supabase.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-stone-700">Kategori</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            required
          >
            <option value="coffee">Coffee Menu</option>
            <option value="roastery">Roastery Product</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-stone-700">Nama Produk</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            placeholder="Contoh: Kopi Susu Bali"
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-stone-700">Slug (URL)</label>
          <input 
            type="text" 
            name="slug" 
            value={formData.slug} 
            onChange={handleChange}
            placeholder="kopi-susu-bali"
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-stone-50"
            required
          />
          <p className="text-xs text-stone-500">Slug digunakan untuk URL: /admin/products/<strong>slug-anda</strong></p>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-stone-700">Harga (Rp)</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange}
            placeholder="Contoh: 18000"
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            required
          />
        </div>

        {formData.category === 'roastery' && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-stone-700">Berat (Khusus Roastery)</label>
            <input 
              type="text" 
              name="weight" 
              value={formData.weight} 
              onChange={handleChange}
              placeholder="Contoh: 250g"
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              required={formData.category === 'roastery'}
            />
          </div>
        )}

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-semibold text-stone-700">Deskripsi Singkat</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            rows={3}
            placeholder="Penjelasan singkat mengenai produk ini..."
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          ></textarea>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-semibold text-stone-700">Gambar Produk</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer outline-none"
          />
          {formData.image_url && (
             <img src={formData.image_url} alt="Preview" className="h-20 mt-2 object-cover rounded-md border border-stone-200" />
          )}
          <p className="text-xs text-stone-500 mt-1">Anda dapat langsung mengunggah foto produk dari komputer.</p>
        </div>

        <div className="space-y-2 md:col-span-2 flex items-center gap-3">
          <input 
            type="checkbox" 
            id="is_best_seller"
            name="is_best_seller" 
            checked={formData.is_best_seller} 
            onChange={handleChange}
            className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500 border-stone-300 cursor-pointer"
          />
          <label htmlFor="is_best_seller" className="text-sm font-semibold text-stone-700 cursor-pointer">
            Jadikan sebagai Produk Terlaris (Best Seller)
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-stone-200 flex justify-end gap-4">
        <Link 
          href="/admin"
          className="px-6 py-2 rounded-lg font-semibold text-stone-600 hover:bg-stone-100 transition-colors border border-stone-300"
        >
          Batal
        </Link>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Produk'}
        </button>
      </div>
    </form>
  );
}
