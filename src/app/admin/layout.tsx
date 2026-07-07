import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-100 flex flex-col">
        <div className="p-6 border-b border-stone-800">
          <h2 className="text-xl font-bold tracking-tight text-amber-500">Singa Muda Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className="block px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors font-medium text-stone-300 hover:text-white"
          >
            <i className="fa-solid fa-box-open w-6 text-center mr-2"></i>
            Manajemen Produk
          </Link>
          <Link 
            href="/admin/settings" 
            className="block px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors font-medium text-stone-300 hover:text-white"
          >
            <i className="fa-solid fa-image w-6 text-center mr-2"></i>
            Pengaturan Gambar
          </Link>
        </nav>
        <div className="p-4 border-t border-stone-800 text-sm text-stone-500">
          <Link href="/" className="flex items-center gap-2 hover:text-stone-300 transition-colors">
            <i className="fa-solid fa-arrow-left"></i>
            Kembali ke Web
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
