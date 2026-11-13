"use client";
import { useActionState, startTransition } from "react";
import { MessageCircle } from "lucide-react";
import { createBooking, type Result } from "@/app/actions";
import { inputCls } from "./Field";

export default function QuickConnect({ whatsapp, phone }: { whatsapp: string; phone: string; services?: string[] }) {
  const [state, action, pending] = useActionState<Result | null, FormData>(createBooking, null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const text = `*Quick Enquiry - SV Tours & Travels*\nName: ${d.name}\nMobile: ${d.phone}\nTrip: ${d.pickup || "Please call me back"}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    const fd = new FormData();
    fd.set("name", d.name);
    fd.set("phone", d.phone);
    fd.set("service", "Quick Enquiry");
    fd.set("pickup", d.pickup || "Not specified (call back)");
    startTransition(() => action(fd));
  }

  return (
    <form onSubmit={onSubmit} className="relative z-10 rounded-2xl bg-white p-6 text-slate-900 shadow-2xl ring-1 ring-amber-200">
      <h2 className="text-xl font-extrabold">Connect with us directly</h2>
      <p className="mb-4 text-sm text-slate-500">Just your name and mobile — we reply on WhatsApp.</p>
      <div className="grid gap-3">
        <input name="name" required placeholder="Your name" autoComplete="name" className={inputCls} />
        <input name="phone" required placeholder="Mobile number" inputMode="tel" autoComplete="tel" pattern="[0-9+ ]{10,15}" className={inputCls} />
        <input name="pickup" placeholder="Where do you want to go? (optional)" className={inputCls} />
        <button disabled={pending} className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3.5 font-bold text-white shadow hover:bg-emerald-500 disabled:opacity-60">
          <MessageCircle size={20} /> {pending ? "Sending..." : "Send on WhatsApp"}
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">No login needed. Or <a href={`tel:${phone}`} className="font-semibold text-indigo-700">call {phone}</a> · <a href="/booking" className="font-semibold text-indigo-700">full booking form</a></p>
      {state?.ok && <p className="mt-3 rounded-lg bg-emerald-50 p-2 text-center text-sm text-emerald-800">Thank you! We will contact you shortly.</p>}
    </form>
  );
}
