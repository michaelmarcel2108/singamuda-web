import NewsForm from '../form';

export const metadata = {
  title: "Tambah Berita - Admin Singa Muda",
};

export default function NewNewsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Tambah Berita & Aktivitas</h1>
        <p className="text-stone-500 mt-2">Publikasikan artikel, berita, atau aktivitas terbaru.</p>
      </div>
      
      <NewsForm />
    </div>
  );
}
