'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebarNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Manajemen Produk' },
    { href: '/admin/news', label: 'Manajemen Berita' },
    { href: '/admin/about', label: 'Pengaturan Tentang (Beranda)' },
    { href: '/admin/tentang', label: 'Konten Halaman Tentang' },
    { href: '/admin/settings', label: 'Pengaturan Gambar Utama' },
    { href: '/admin/testimonials', label: 'Manajemen Testimoni' },
  ];

  return (
    <nav className="flex-1 p-4 space-y-2">
      {links.map((link) => {
        // Match exact for /admin, startswith for others
        const isActive = link.href === '/admin' 
          ? pathname === '/admin' 
          : pathname.startsWith(link.href);

        return (
          <Link 
            key={link.href}
            href={link.href} 
            className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
              isActive 
                ? 'text-amber-500 bg-stone-800/50' 
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
