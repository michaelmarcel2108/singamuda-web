'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  is_published: boolean;
  created_at: string;
}

export default function AdminTestimonialsDashboard() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      showNotification('Gagal mengambil data testimoni.', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function togglePublish(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_published: !currentStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, is_published: !currentStatus } : t
      ));
      
      showNotification(
        !currentStatus ? 'Testimoni berhasil dipublikasikan' : 'Testimoni disembunyikan'
      );
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('Gagal mengubah status publikasi.', 'error');
    }
  }

  async function confirmDelete() {
    if (!deleteConfirmId) return;
    
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', deleteConfirmId);
      if (error) throw error;
      setTestimonials(testimonials.filter(t => t.id !== deleteConfirmId));
      showNotification('Testimoni berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      showNotification('Gagal menghapus testimoni.', 'error');
    } finally {
      setDeleteConfirmId(null);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Manajemen Testimoni</h1>
        <Link 
          href="/admin/testimonials/new"
          className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          Tambah Testimoni
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-stone-500">Memuat data...</div>
        ) : testimonials.length === 0 ? (
          <div className="p-8 text-center text-stone-500">Belum ada testimoni yang ditambahkan.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-500 border-b border-stone-200">
              <tr>
                <th className="p-4 font-semibold">Nama & Komentar</th>
                <th className="p-4 font-semibold">Rating</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {testimonials.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-stone-900">{item.name}</div>
                      <div className="text-sm text-stone-500 max-w-xs">{item.comment}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 text-amber-500 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fa-solid fa-star ${i < item.rating ? '' : 'text-stone-300'}`}></i>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(item.id, item.is_published)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                        item.is_published 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${item.is_published ? 'bg-green-500' : 'bg-stone-400'}`}></div>
                      {item.is_published ? 'Dipublikasikan' : 'Disembunyikan'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setDeleteConfirmId(item.id)}
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <i className="fa-solid fa-triangle-exclamation text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-stone-900">Hapus Testimoni?</h3>
            </div>
            <p className="text-stone-600 mb-6">
              Apakah Anda yakin ingin menghapus testimoni ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${
            notification.type === 'success' ? 'bg-stone-900 text-white' : 'bg-red-600 text-white'
          }`}>
            <i className={`fa-solid ${notification.type === 'success' ? 'fa-circle-check text-amber-500' : 'fa-circle-xmark text-white'} text-xl`}></i>
            <span className="font-medium tracking-wide">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-4 text-stone-400 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
