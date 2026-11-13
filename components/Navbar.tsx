import Link from "next/link";
import { Phone, User, Shield } from "lucide-react";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { createClient } from "@/utils/supabase/server";

const links = [
  ["Home", "/"], ["Services", "/services"], ["Our Fleet", "/fleet"], ["Contact", "/contact"],
];

export default async function Navbar() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  let isAdmin = false;
  if (auth.user) {
    const { data } = await supabase.from("profiles").select("role").eq("id", auth.user.id).single();
    isAdmin = data?.role === "admin";
  }
  return (
    <header className="relative sticky top-0 z-50 border-b border-amber-200/60 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="SV Tours & Travels home"><Logo light={false} /></Link>
        <nav className="hidden gap-8 text-sm font-medium text-slate-700 lg:flex">
          {links.map(([l, h]) => <Link key={h} href={h} className="hover:text-amber-600">{l}</Link>)}
        </nav>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/booking" className="rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-400">Book Now</Link>
          {isAdmin && <Link href="/admin" className="flex items-center gap-1 rounded-full border border-amber-500 px-3 py-1.5 font-medium text-amber-700"><Shield size={14} /> Admin</Link>}
          <MobileNav links={links} />
          {auth.user
            ? <Link href="/account" className="flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 font-medium text-slate-800 hover:border-amber-500"><User size={14} /> <span className="hidden sm:inline">Account</span></Link>
            : <Link href="/login" className="flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 font-medium text-slate-800 hover:border-amber-500"><User size={14} /> <span className="hidden sm:inline">Login</span></Link>}
        </div>
      </div>
    </header>
  );
}
