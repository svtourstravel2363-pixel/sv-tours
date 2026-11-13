import Link from "next/link";
import { Home, Car, Phone, CalendarCheck } from "lucide-react";
import { getBiz } from "@/lib/content";
import { LogoFull } from "@/components/Logo";

export const metadata = { title: "Page not found | SV Tours & Travels", robots: { index: false } };

export default async function NotFound() {
  const BIZ = await getBiz();
  return (
    <section className="grid min-h-[70vh] place-items-center bg-gradient-to-br from-amber-50 via-white to-indigo-50 px-4 py-16">
      <div className="max-w-xl text-center">
        <div className="mb-4 flex justify-center"><LogoFull size={110} /></div>
        <p className="text-7xl font-extrabold text-amber-500 md:text-8xl" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>404</p>
        <h1 className="mt-2 text-2xl font-extrabold md:text-3xl">Looks like you took a wrong turn</h1>
        <p className="mt-3 text-slate-600">The page you are looking for does not exist or has moved. Let us get you back on the road.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white"><Home size={18} /> Home</Link>
          <Link href="/booking" className="flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-bold text-slate-950"><CalendarCheck size={18} /> Book a Ride</Link>
          <Link href="/fleet" className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold"><Car size={18} /> Our Fleet</Link>
        </div>
        <a href={`tel:${BIZ.phones[0]}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700"><Phone size={16} /> Need help? Call {BIZ.phones[0]}</a>
      </div>
    </section>
  );
}
