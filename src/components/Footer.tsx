import Link from 'next/link';

export default function Footer({ dict }: { dict?: any }) {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-500 text-xs uppercase tracking-widest py-8 text-center">
      <p>&copy; {new Date().getFullYear()} {dict?.copyright || 'Singa Muda Coffee. All Rights Reserved.'}</p>
    </footer>
  );
}
