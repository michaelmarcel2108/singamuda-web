import { supabase } from '@/lib/supabase';
import NewsForm from '../form';
import { notFound } from 'next/navigation';

export const revalidate = 0; // Don't cache admin pages

export default async function EditNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  let { data: news, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', decodedSlug)
    .single();

  if (!news) {
    const slugified = decodedSlug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    if (slugified !== decodedSlug) {
      const fallback = await supabase
        .from('news')
        .select('*')
        .eq('slug', slugified)
        .single();
      news = fallback.data;
      error = fallback.error;
    }
  }

  if (error || !news) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Edit Berita</h1>
        <p className="text-stone-500 mt-2">Ubah informasi berita atau aktivitas.</p>
      </div>
      
      <NewsForm initialData={news} />
    </div>
  );
}
