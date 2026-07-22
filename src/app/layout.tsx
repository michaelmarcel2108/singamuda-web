import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Singa Muda Coffee",
  description: "Singa Muda Coffee - Freshly Brewed Every Day",
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
