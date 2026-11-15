import Link from "next/link";
import { User, Shield } from "lucide-react";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { createClient } from "@/utils/supabase/server";

const links = [
  ["Home", "/"], ["Services", "/services"], ["Our Fleet", "/fleet"], ["Car Rental", "/car-rental"], ["Contact", "/contact"],
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
    <header className="relative sticky top-0 z-50 border-b border-brand-200/60 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-4 sm:py-3">
        <Link href="/" aria-label="SV Tours & Travels home" className="min-w-0"><Logo light={false} /></Link>
        <nav className="hidden gap-8 text-sm font-medium text-slate-700 lg:flex">
          {links.map(([l, h]) => <Link key={h} href={h} className="hover:text-brand-700">{l}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2 text-sm">
          <Link href="/booking" className="hidden rounded-full bg-brand-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700 min-[480px]:block">Book Now</Link>
          {isAdmin && <Link href="/admin" className="hidden items-center sm:flex gap-1 rounded-full border border-brand-500 px-3 py-1.5 font-medium text-brand-700"><Shield size={14} /> Admin</Link>}
          <MobileNav links={[...links, ["Book a Cab", "/booking"], ...(isAdmin ? [["Admin Panel", "/admin"]] : [])]} />
          {auth.user
            ? <Link href="/account" className="flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 font-medium text-navy-800 hover:border-brand-500"><User size={14} /> <span className="hidden sm:inline">Account</span></Link>
            : <Link href="/login" className="flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 font-medium text-navy-800 hover:border-brand-500"><User size={14} /> <span className="hidden sm:inline">Login</span></Link>}
        </div>
      </div>
    </header>
  );
}
