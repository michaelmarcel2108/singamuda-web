import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 60; // revalidate every 60 seconds

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await supabase.from('site_settings').select('logo_url').eq('id', 1).single();
  const logoUrl = data?.logo_url || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300";
  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-100 flex flex-col">
        <div className="p-6 border-b border-stone-800 flex items-center gap-3">
          <img src={logoUrl} alt="Logo" className="w-8 h-8 rounded-full object-cover border border-amber-500/30" />
          <span className="font-black text-amber-500 tracking-wider">SINGAMUDA</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className="block px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors font-medium text-stone-300 hover:text-white"
          >
            Manajemen Produk
          </Link>
          <Link 
            href="/admin/settings" 
            className="block px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors font-medium text-stone-300 hover:text-white"
          >
            Pengaturan Gambar
          </Link>
        </nav>
        <div className="p-4 border-t border-stone-800 text-sm text-stone-500">
          <Link href="/" className="block hover:text-stone-300 transition-colors">
            &larr; Kembali ke Web
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-stone-100 p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
