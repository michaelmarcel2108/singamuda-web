'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type SiteSettings = {
  id: number;
  logo_url: string;
  hero_bg_url: string;
  story_img_url: string;
  roastery_img_url: string;
};

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    id: 1,
    logo_url: '',
    hero_bg_url: '',
    story_img_url: '',
    roastery_img_url: ''
  });

  // State to hold temporary files before saving
  const [files, setFiles] = useState<{
    logo_url: File | null;
    hero_bg_url: File | null;
    story_img_url: File | null;
    roastery_img_url: File | null;
  }>({
    logo_url: null,
    hero_bg_url: null,
    story_img_url: null,
    roastery_img_url: null
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') throw error; 
      
      if (data) {
        setSettings(data);
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
      setFiles(prev => ({ ...prev, [fieldName]: file }));
      
      // Create a local preview URL
      const previewUrl = URL.createObjectURL(file);
      setSettings(prev => ({ ...prev, [fieldName]: previewUrl }));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    
    // Note: Pastikan Anda telah membuat bucket bernama 'images' yang bersifat Publik di Supabase Storage
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

      // Upload files if there are any new ones selected
      if (files.logo_url) updatedSettings.logo_url = await uploadImage(files.logo_url);
      if (files.hero_bg_url) updatedSettings.hero_bg_url = await uploadImage(files.hero_bg_url);
      if (files.story_img_url) updatedSettings.story_img_url = await uploadImage(files.story_img_url);
      if (files.roastery_img_url) updatedSettings.roastery_img_url = await uploadImage(files.roastery_img_url);

      // Save to database
      const { error } = await supabase
        .from('site_settings')
        .upsert([{ ...updatedSettings, updated_at: new Date().toISOString() }], { onConflict: 'id' });

      if (error) throw error;
      
      alert('Pengaturan gambar berhasil disimpan!');
      
      // Clear file states since they are now uploaded
      setFiles({ logo_url: null, hero_bg_url: null, story_img_url: null, roastery_img_url: null });
      router.refresh();
    } catch (error: any) {
      console.error('Error saving settings:', error);
      alert(`Terjadi kesalahan: ${error?.message || 'Pastikan RLS table site_settings diizinkan, dan bucket images sudah ada.'}`);
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
        <h1 className="text-3xl font-bold text-stone-900">Pengaturan Gambar</h1>
        <p className="text-stone-500 mt-2">Pilih file gambar untuk tata letak halaman utama situs Anda.</p>
        
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <strong>Perhatian:</strong> Pastikan Anda telah membuat <em>Storage Bucket</em> bernama <strong>images</strong> dan mengaturnya ke <strong>Public</strong> di dasbor Supabase Anda sebelum menyimpan gambar.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 space-y-6 max-w-2xl">
        <div className="space-y-6">
          
          {/* LOGO */}
          <div className="space-y-2 pb-4 border-b border-stone-100">
            <label className="block text-sm font-semibold text-stone-700">Logo</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'logo_url')}
              className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer outline-none"
            />
            {settings.logo_url && (
              <img src={settings.logo_url} alt="Logo Preview" className="h-16 mt-2 object-contain bg-stone-100 rounded-md p-2 border border-stone-200" />
            )}
          </div>

          {/* HERO BG */}
          <div className="space-y-2 pb-4 border-b border-stone-100">
            <label className="block text-sm font-semibold text-stone-700">Gambar Hero (Background Atas)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'hero_bg_url')}
              className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer outline-none"
            />
            {settings.hero_bg_url && (
              <img src={settings.hero_bg_url} alt="Hero Preview" className="h-32 w-full mt-2 object-cover rounded-md border border-stone-200" />
            )}
          </div>

          {/* STORY IMAGE */}
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

          {/* ROASTERY IMAGE */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-stone-700">Gambar Roastery</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'roastery_img_url')}
              className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer outline-none"
            />
            {settings.roastery_img_url && (
              <img src={settings.roastery_img_url} alt="Roastery Preview" className="h-32 w-full mt-2 object-cover rounded-md border border-stone-200" />
            )}
          </div>
          
        </div>

        <div className="pt-6 border-t border-stone-200 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <i className="fa-solid fa-floppy-disk"></i>
            {saving ? 'Mengunggah & Menyimpan...' : 'Simpan Pengaturan'}
          </button>
        </div>
      </form>
    </div>
  );
}
