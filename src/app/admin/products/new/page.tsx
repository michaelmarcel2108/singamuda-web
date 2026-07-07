import ProductForm from '../form';

export const metadata = {
  title: "Tambah Produk - Admin Singa Muda",
};

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Tambah Produk Baru</h1>
        <p className="text-stone-500 mt-2">Tambahkan menu kopi atau produk roastery baru ke dalam database.</p>
      </div>
      
      <ProductForm />
    </div>
  );
}
