"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button 
      onClick={handleLogout}
      className="block w-full text-left px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors font-medium text-red-400 hover:text-red-300 mt-4"
    >
      Keluar (Logout)
    </button>
  );
}
