'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setNotification({ message: 'Nama dan komentar harus diisi.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setNotification(null);

    try {
      const { error } = await supabase.from('testimonials').insert([
        {
          name: name.trim(),
          rating,
          comment: comment.trim(),
          is_published: false, // Default false, agar admin harus menyetujui dulu
        },
      ]);

      if (error) throw error;

      setNotification({ message: 'Terima kasih! Review Anda telah dikirim dan menunggu persetujuan admin.', type: 'success' });
      setName('');
      setRating(5);
      setComment('');
      
      // Tutup otomatis notifikasi setelah beberapa detik jika sukses
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error('Error submitting review:', error);
      setNotification({ message: 'Gagal mengirim review. Silakan coba lagi.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-950/50 border border-stone-800 rounded-2xl w-full p-6 sm:p-8 shadow-xl">
      <h3 className="text-xl font-bold text-amber-500 mb-6 text-center">Tulis Review Anda</h3>
      
      {notification && (
        <div className={`mb-6 p-4 rounded-lg text-sm ${
          notification.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
        }`}>
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-300 mb-1.5">Nama Anda</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            placeholder="Masukkan nama Anda"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-300 mb-2">Rating</label>
          <div className="flex gap-2 text-2xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`transition-colors focus:outline-none ${
                  star <= rating ? 'text-amber-500' : 'text-stone-700 hover:text-stone-500'
                }`}
              >
                <i className="fa-solid fa-star"></i>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-stone-300 mb-1.5">Komentar</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
            placeholder="Bagaimana pengalaman Anda?"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i>
              Mengirim...
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane"></i>
              Kirim Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}
