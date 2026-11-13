"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileNav({ links }: { links: string[][] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 text-slate-800">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full border-t border-amber-200 bg-white px-4 py-3 shadow-xl">
          {links.map(([l, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-3 text-slate-800">{l}</Link>
          ))}
        </nav>
      )}
    </div>
  );
}
