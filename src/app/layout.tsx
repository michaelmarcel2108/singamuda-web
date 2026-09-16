import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Singa Muda Coffee - Freshly Brewed Every Day",
  description: "Nikmati kopi terbaik dari Singa Muda Coffee. Kami menyajikan kopi segar berkualitas setiap hari dengan berbagai pilihan rasa untuk menemani hari Anda.",
  keywords: ["Singa Muda Coffee", "Kopi", "Coffee Shop", "Kopi Segar", "Cafe", "Tempat Ngopi", "Kopi Nusantara", "Specialty Coffee"],
  authors: [{ name: "Singa Muda Coffee" }],
  openGraph: {
    title: "Singa Muda Coffee",
    description: "Nikmati kopi terbaik dari Singa Muda Coffee. Kami menyajikan kopi segar berkualitas setiap hari.",
    url: "https://singamudacoffee.com",
    siteName: "Singa Muda Coffee",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Singa Muda Coffee Logo",
      }
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logornd.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "id";

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-stone-900 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950 max-w-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
