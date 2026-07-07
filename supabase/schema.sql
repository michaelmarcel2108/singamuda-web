-- Skema Database untuk Singa Muda Coffee

-- Mengaktifkan ekstensi uuid-ossp (wajib dijalankan pertama kali)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabel untuk pengaturan situs (Site Settings)
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  logo_url TEXT,
  bg_hero TEXT,
  img_story TEXT,
  img_roastery TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Masukkan data awal untuk site settings
INSERT INTO site_settings (logo_url, bg_hero, img_story, img_roastery)
VALUES (
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600'
);

-- Tabel untuk Menu Kafe (Coffee Menu)
CREATE TABLE coffee_menu (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO coffee_menu (name, price, description, image) VALUES 
('Espresso Singa', 'Rp 15.000', 'Ekstrak kopi murni yang pekat dan beraroma tajam.', 'https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=400'),
('Kopi Susu Bali', 'Rp 18.000', 'Kombinasi espresso premium dengan susu manis legit khas Bali.', 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400');

-- Tabel untuk Produk Roastery
CREATE TABLE roastery_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  weight TEXT NOT NULL DEFAULT '250g',
  price TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO roastery_products (name, weight, price, description, image) VALUES
('Kintamani Premium', '250g', 'Rp 65.000', 'Aroma buah jeruk (citrusy) khas pegunungan Kintamani.', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400');

-- Tabel untuk Produk Terlaris (Best Sellers)
CREATE TABLE best_sellers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO best_sellers (name, price, description, image) VALUES
('Signature Aren Latte', 'Rp 22.000', 'Kopi susu gula aren andalan dengan racikan rahasia Singa Muda.', 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400');
