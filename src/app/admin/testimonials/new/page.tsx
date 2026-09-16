'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function NewTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: 5,
    is_published: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('testimonials')
        .insert([{
          name: formData.name,
          comment: formData.comment,
          rating: formData.rating,
          is_published: formData.is_published
        }]);

      if (insertError) throw insertError;
      router.push('/admin/testimonials');
    } catch (err: any) {
      console.error('Error saving testimonial:', err);
      setError(err.message || 'Gagal menyimpan testimoni');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/testimonials"
          className="w-10 h-10 bg-white border border-stone-200 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Tambah Testimoni</h1>
          <p className="text-stone-500 mt-1">Masukkan komentar atau ulasan dari pengunjung.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-3">
            <i className="fa-solid fa-triangle-exclamation"></i>
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Nama Pengunjung <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
              placeholder="Contoh: Budi Santoso"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Komentar / Ulasan <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              className="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors resize-none"
              placeholder="Contoh: Kopinya enak banget, suasananya nyaman..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Rating (Bintang)
            </label>
            <div className="flex items-center gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({...formData, rating: star})}
                  className={`text-2xl transition-colors focus:outline-none ${
                    star <= formData.rating ? 'text-amber-500' : 'text-stone-300 hover:text-amber-300'
                  }`}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
              className="w-4 h-4 text-amber-600 bg-stone-100 border-stone-300 rounded focus:ring-amber-500"
            />
            <label htmlFor="is_published" className="text-sm font-medium text-stone-700">
              Publikasikan Testimoni (Tampil di website)
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-100 flex justify-end gap-3">
          <Link
            href="/admin/testimonials"
            className="px-6 py-2.5 font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 font-semibold text-stone-950 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i>
                Menyimpan...
              </>
            ) : (
              'Simpan Testimoni'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
