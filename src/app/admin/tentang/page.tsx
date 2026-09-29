'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type AboutContent = {
  id: string;
  title: string;
  content: string;
  image_url: string;
  order_index: number;
};

export default function TentangAdminPage() {
  const router = useRouter();
  const [contents, setContents] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<AboutContent>>({
    title: '',
    content: '',
    image_url: '',
    order_index: 0
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  async function fetchContents() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('about_contents')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: true });

      if (error && error.code !== '42P01') throw error; // Ignore relation does not exist error initially
      
      if (data) {
        setContents(data);
      }
    } catch (error) {
      console.error('Error fetching about contents:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`tentang/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(`tentang/${fileName}`);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = formData.image_url;

      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const payload = {
        title: formData.title || '',
        content: formData.content || '',
        image_url: finalImageUrl || '',
        order_index: formData.order_index || 0
      };

      if (editingId) {
        const { error } = await supabase
          .from('about_contents')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
        showNotification('Konten berhasil diperbarui!');
      } else {
        const { error } = await supabase
          .from('about_contents')
          .insert([payload]);
        if (error) throw error;
        showNotification('Konten baru berhasil ditambahkan!');
      }

      resetForm();
      fetchContents();
      router.refresh();
    } catch (error: any) {
      console.error('Error saving content:', error);
      showNotification(error?.message || 'Gagal menyimpan konten. Pastikan tabel about_contents sudah dibuat.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus konten ini?')) return;
    
    try {
      const { error } = await supabase
        .from('about_contents')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      showNotification('Konten berhasil dihapus!');
      fetchContents();
      router.refresh();
    } catch (error: any) {
      console.error('Error deleting:', error);
      showNotification('Gagal menghapus konten.', 'error');
    }
  };

  const handleEdit = (item: AboutContent) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      content: item.content,
      image_url: item.image_url,
      order_index: item.order_index
    });
    setImagePreview(item.image_url || '');
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', content: '', image_url: '', order_index: 0 });
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Konten Halaman Tentang</h1>
        <p className="text-stone-500 mt-2">Kelola blok konten dan paragraf untuk halaman detail Tentang Singamuda.</p>
      </div>

      {/* Form Tambah/Edit */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 space-y-6 max-w-3xl mb-12">
        <h2 className="text-xl font-bold text-stone-800 border-b pb-2">
          {editingId ? 'Edit Konten' : 'Tambah Konten Baru'}
        </h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-stone-700">Judul Bagian (Opsional)</label>
            <input 
              type="text" 
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Contoh: Filosofi Kopi Kami"
              className="w-full p-3 text-sm border border-stone-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-stone-700">Teks / Paragraf</label>
            <textarea 
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Isi teks paragraf di sini..."
              required
              className="w-full h-32 p-3 text-sm border border-stone-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-stone-700">Gambar (Opsional)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer outline-none"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="h-32 w-full mt-2 object-cover rounded-md border border-stone-200" />
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-stone-700">Urutan (Angka)</label>
              <input 
                type="number" 
                value={formData.order_index || 0}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                className="w-full p-3 text-sm border border-stone-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
              <p className="text-xs text-stone-500">Angka lebih kecil akan tampil lebih dulu di halaman.</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 flex justify-end gap-3">
          {editingId && (
            <button 
              type="button" 
              onClick={resetForm}
              className="px-6 py-2 rounded-lg font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              Batal
            </button>
          )}
          <button 
            type="submit" 
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Tambah Konten')}
          </button>
        </div>
      </form>

      {/* List Konten */}
      <div>
        <h2 className="text-xl font-bold text-stone-800 border-b pb-2 mb-4">Daftar Konten</h2>
        {loading ? (
          <p className="text-stone-500">Memuat data...</p>
        ) : contents.length === 0 ? (
          <p className="text-stone-500 bg-stone-50 p-4 rounded-lg border border-stone-100 text-center">Belum ada konten. (Pastikan tabel about_contents sudah dibuat di Supabase)</p>
        ) : (
          <div className="space-y-4">
            {contents.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex flex-col md:flex-row gap-4 items-start md:items-center">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full md:w-32 h-32 md:h-24 object-cover rounded-lg" />
                ) : (
                  <div className="w-full md:w-32 h-32 md:h-24 bg-stone-100 rounded-lg flex items-center justify-center text-stone-400 text-sm">Tanpa Gambar</div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-stone-100 text-stone-500 text-xs px-2 py-1 rounded font-mono">Urutan: {item.order_index}</span>
                    <h3 className="font-bold text-stone-900 text-lg">{item.title || '(Tanpa Judul)'}</h3>
                  </div>
                  <p className="text-stone-600 text-sm line-clamp-2">{item.content}</p>
                </div>
                
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    title="Edit"
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    title="Hapus"
                  >
                    <i className="fa-solid fa-trash"></i> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${
            notification.type === 'success' ? 'bg-stone-900 text-white' : 'bg-red-600 text-white'
          }`}>
            <span className="font-medium tracking-wide">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-4 text-stone-400 hover:text-white transition-colors" type="button">
              <span className="text-xl leading-none">&times;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
