-- Tabel untuk Testimoni
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  comment TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO testimonials (name, comment, rating, is_published) VALUES 
('Budi Santoso', 'Kopi terbaik yang pernah saya coba di Bali! Signature Aren Latte sangat direkomendasikan.', 5, true),
('Siti Aminah', 'Tempatnya cozy dan kopinya mantap. Baristanya juga ramah banget.', 5, true);
