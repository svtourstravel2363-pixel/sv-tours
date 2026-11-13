import Link from "next/link";
import { getBiz } from "@/lib/content";
import { LogoFull } from "./Logo";
import InstagramIcon from "./InstagramIcon";

export default async function Footer() {
  const BIZ = await getBiz();
  return (
    <footer className="bg-white pb-14 text-slate-600 md:pb-0 border-t border-amber-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <LogoFull size={132} />
          <p className="mt-3 text-amber-700">{BIZ.tagline}.</p>
          <p className="mt-3 text-sm">{BIZ.legal} · {BIZ.site}</p>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-semibold text-slate-900">Contact</h4>
          <p>{BIZ.address}</p>
          {BIZ.phones.map((p) => <p key={p}><a href={`tel:${p}`}>📞 {p}</a></p>)}
          <p><a href={BIZ.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-amber-700"><InstagramIcon size={15} /> {BIZ.instagramHandle}</a></p>
          <p>{BIZ.email}</p>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-semibold text-slate-900">Explore</h4>
          <ul className="space-y-1">
            <li><Link href="/services" className="hover:text-amber-700">Cab Services in Pune</Link></li>
            <li><Link href="/services#outstation" className="hover:text-amber-700">Outstation Taxi Rates</Link></li>
            <li><Link href="/fleet" className="hover:text-amber-700">Our Fleet</Link></li>
            <li><Link href="/booking" className="hover:text-amber-700">Book a Cab</Link></li>
            <li><Link href="/contact" className="hover:text-amber-700">Contact Us</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-semibold text-slate-900">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="/terms" className="hover:text-amber-700">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-amber-700">Privacy Policy</Link></li>
            <li><Link href="/refund" className="hover:text-amber-700">Cancellation & Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs">
        © 2026 SV Tours & Travels (operated by {BIZ.legal}). All Rights Reserved. Subject to Pune jurisdiction.
      </div>
    </footer>
  );
}
