'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('id');

  useEffect(() => {
    // Read the current cookie on mount
    const match = document.cookie.match(new RegExp('(^| )NEXT_LOCALE=([^;]+)'));
    if (match) {
      setCurrentLang(match[2]);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    // Set cookie that lasts for 1 year
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
    setCurrentLang(lang);
    
    // Refresh the router to trigger server components re-rendering with new cookie
    router.refresh();
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 text-stone-400 hover:text-amber-500 transition-colors font-medium text-sm">
        <i className="fa-solid fa-globe"></i>
        <span>{currentLang.toUpperCase()}</span>
      </button>
      <div className="absolute right-0 top-full mt-2 min-w-32 bg-stone-900 border border-stone-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <button 
          onClick={() => changeLanguage('id')}
          className={`block w-full whitespace-nowrap text-left px-4 py-2 text-sm hover:bg-stone-800 transition-colors ${currentLang === 'id' ? 'text-amber-500 font-bold' : 'text-stone-300'}`}
        >
          ID (Indo)
        </button>
        <button 
          onClick={() => changeLanguage('en')}
          className={`block w-full whitespace-nowrap text-left px-4 py-2 text-sm hover:bg-stone-800 transition-colors ${currentLang === 'en' ? 'text-amber-500 font-bold' : 'text-stone-300'}`}
        >
          EN (Eng)
        </button>
      </div>
    </div>
  );
}
