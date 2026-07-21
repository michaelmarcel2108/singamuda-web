interface SocialReviewsProps {
  embedTiktok?: string;
  embedInstagram?: string;
  embedYoutube?: string;
}

export default function SocialReviews({ embedTiktok, embedInstagram, embedYoutube }: SocialReviewsProps) {
  // Jika semuanya kosong, kita bisa memilih untuk tidak merender section ini sama sekali
  // Tapi untuk saat ini, kita tampilkan placeholder jika kosong.

  const processEmbed = (html: string | undefined, platform: 'tiktok' | 'instagram') => {
    if (!html) return '';
    let processed = html;
    if (platform === 'tiktok' && !processed.includes('data-theme=')) {
      processed = processed.replace('<blockquote ', '<blockquote data-theme="dark" ');
    } else if (platform === 'instagram' && !processed.includes('data-instgrm-theme=')) {
      processed = processed.replace('<blockquote ', '<blockquote data-instgrm-theme="dark" ');
    }
    return processed;
  };

  return (
    <section id="reviews" className="py-20 bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-amber-500 uppercase tracking-widest mb-4">
            Social Review
          </h2>
          <p className="text-stone-400 text-sm max-w-2xl mx-auto font-light">
            Review dan cerita kopi masa kini dari sobat Singamuda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-start">
          {/* Slot untuk Embed TikTok */}
          <div className="w-full max-w-[320px] flex flex-col items-center justify-start min-h-[300px]">
            {embedTiktok ? (
              <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: processEmbed(embedTiktok, 'tiktok') }} className="w-full flex justify-center overflow-hidden rounded-xl color-scheme-dark" style={{ colorScheme: 'dark' }} />
            ) : (
              <div className="w-full h-full border border-dashed border-stone-700/50 rounded-xl flex flex-col items-center justify-center p-4">
                <i className="fa-brands fa-tiktok text-4xl text-stone-600 mb-4"></i>
                <p className="text-stone-500 text-xs uppercase tracking-wider text-center">
                  Tempat Embed <br /> Video TikTok
                </p>
              </div>
            )}
          </div>

          {/* Slot untuk Embed Instagram Reels */}
          <div className="w-full max-w-[320px] flex flex-col items-center justify-start min-h-[300px]">
            {embedInstagram ? (
              <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: processEmbed(embedInstagram, 'instagram') }} className="w-full flex justify-center overflow-hidden rounded-xl color-scheme-dark" style={{ colorScheme: 'dark' }} />
            ) : (
              <div className="w-full h-full border border-dashed border-stone-700/50 rounded-xl flex flex-col items-center justify-center p-4">
                <i className="fa-brands fa-instagram text-4xl text-stone-600 mb-4"></i>
                <p className="text-stone-500 text-xs uppercase tracking-wider text-center">
                  Tempat Embed <br /> Instagram Reels
                </p>
              </div>
            )}
          </div>

          {/* Slot untuk Embed lainnya / YouTube */}
          <div className="w-full max-w-[320px] flex flex-col items-center justify-start min-h-[300px] md:hidden lg:flex">
            {embedYoutube ? (
              <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: embedYoutube }} className="w-full flex justify-center overflow-hidden rounded-xl" />
            ) : (
              <div className="w-full h-full border border-dashed border-stone-700/50 rounded-xl flex flex-col items-center justify-center p-4">
                <i className="fa-solid fa-video text-4xl text-stone-600 mb-4"></i>
                <p className="text-stone-500 text-xs uppercase tracking-wider text-center">
                  Tempat Embed <br /> Video Lainnya
                </p>
              </div>
            )}
          </div>
        </div>

        <script async src="https://www.tiktok.com/embed.js"></script>
        <script async src="//www.instagram.com/embed.js"></script>
      </div>
    </section>
  );
}
