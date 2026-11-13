import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { getBiz } from "@/lib/content";

export default async function StickyActions() {
  const BIZ = await getBiz();
  return (
    <>
      <a href={`https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent("Hi SV Tours & Travels, I want to book a cab.")}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp"
        className="fixed bottom-20 right-4 z-40 hidden h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl transition hover:scale-110 md:grid">
        <MessageCircle size={26} />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-slate-200 bg-white text-xs font-semibold shadow-[0_-4px_16px_rgba(0,0,0,.08)] md:hidden">
        <a href={`tel:${BIZ.phones[0]}`} className="flex flex-col items-center gap-0.5 py-2.5 text-slate-800"><Phone size={18} />Call</a>
        <a href="/booking" className="flex flex-col items-center gap-0.5 bg-amber-400 py-2.5 text-slate-950"><CalendarCheck size={18} />Book Now</a>
        <a href={`https://wa.me/${BIZ.whatsapp}`} target="_blank" rel="noopener" className="flex flex-col items-center gap-0.5 py-2.5 text-emerald-700"><MessageCircle size={18} />WhatsApp</a>
      </div>
    </>
  );
}
