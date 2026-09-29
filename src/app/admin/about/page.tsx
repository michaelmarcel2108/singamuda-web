'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { revalidateHome } from '@/app/actions';

type SiteSettings = {
  id: number;
  story_img_url: string;
  about_title?: string;
  about_desc?: string;
};

export default function AboutSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const [settings, setSettings] = useState<SiteSettings>({
    id: 1,
    story_img_url: '',
    about_title: '',
    about_desc: ''
  });

  const [files, setFiles] = useState<{
    story_img_url: File | null;
  }>({
    story_img_url: null
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('id, story_img_url, about_title, about_desc')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') throw error; 
      
      if (data) {
        setSettings({
          id: data.id,
          story_img_url: data.story_img_url || '',
          about_title: data.about_title || '',
          about_desc: data.about_desc || ''
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof typeof files) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles({ ...files, [fieldName]: file });
      
      const previewUrl = URL.createObjectURL(file);
      setSettings(prev => ({ ...prev, [fieldName]: previewUrl }));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`settings/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(`settings/${fileName}`);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let updatedSettings = { ...settings };

      if (files.story_img_url) {
        updatedSettings.story_img_url = await uploadImage(files.story_img_url);
      }

      const { error } = await supabase
        .from('site_settings')
        .update({ 
          story_img_url: updatedSettings.story_img_url,
          about_title: updatedSettings.about_title,
          about_desc: updatedSettings.about_desc,
          updated_at: new Date().toISOString() 
        })
        .eq('id', 1);

      if (error) throw error;
      
      showNotification('Pengaturan Tentang Kami berhasil disimpan!');
      
      setFiles({ story_img_url: null });
      
      await revalidateHome();
      router.refresh();
    } catch (error: any) {
      console.error('Error saving settings:', error);
      showNotification(error?.message || 'Gagal menyimpan pengaturan.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-stone-500">Memuat pengaturan...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Pengaturan Tentang Kami</h1>
        <p className="text-stone-500 mt-2">Ubah judul, teks, dan gambar untuk bagian Tentang Kami (Our Story) pada situs Anda.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 space-y-6 max-w-2xl">
        <div className="space-y-6">
          <div className="space-y-2 pb-4 border-b border-stone-100">
            <label className="block text-sm font-semibold text-stone-700">Judul Tentang Kami</label>
            <input 
              type="text" 
              value={settings.about_title || ''}
              onChange={(e) => setSettings({ ...settings, about_title: e.target.value })}
              placeholder="Contoh: TENTANG SINGAMUDA COFFEE"
              className="w-full p-3 text-sm border border-stone-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>

          <div className="space-y-2 pb-4 border-b border-stone-100">
            <label className="block text-sm font-semibold text-stone-700">Teks / Deskripsi Tentang Kami</label>
            <textarea 
              value={settings.about_desc || ''}
              onChange={(e) => setSettings({ ...settings, about_desc: e.target.value })}
              placeholder="Ceritakan sejarah atau filosofi di sini..."
              className="w-full h-32 p-3 text-sm border border-stone-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>

          <div className="space-y-2 pb-4 border-b border-stone-100">
            <label className="block text-sm font-semibold text-stone-700">Gambar Cerita (Our Story)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'story_img_url')}
              className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer outline-none"
            />
            {settings.story_img_url && (
              <img src={settings.story_img_url} alt="Story Preview" className="h-32 w-full mt-2 object-cover rounded-md border border-stone-200" />
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </button>
        </div>
      </form>

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
