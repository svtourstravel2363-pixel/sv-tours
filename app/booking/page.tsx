import BookingForm from "@/components/BookingForm";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import { getBiz, getItems, placeList } from "@/lib/content";
import { Phone, ShieldCheck, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Book a Cab in Pune – Local, Outstation & Airport",
  description: "Book your ride online in under a minute. No login needed — confirm instantly on WhatsApp. Local, outstation, airport transfer and tour bookings from Pune.",
  alternates: { canonical: "/booking" },
};

export default async function BookingPage({ searchParams }: PageProps<"/booking">) {
  const sp = await searchParams;
  const [BIZ, svc, vt] = await Promise.all([getBiz(), getItems("service"), getItems("vehicle_type")]);
  const q = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-indigo-50">
      <JsonLd data={breadcrumbs([["Booking", "/booking"]])} />
      <div className="mx-auto max-w-4xl px-4 py-14">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Reservations</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">{BIZ.settings.booking_title}</h1>
          <p className="mt-3 text-slate-600">{BIZ.settings.booking_sub}</p>
        </div>
        <BookingForm whatsapp={BIZ.whatsapp} services={svc.items.map((x) => x.title)} vehicles={vt.items.map((x) => x.title)} places={placeList(BIZ.settings)} defaults={{ service: q("service"), pickup: q("pickup"), drop: q("drop"), pickup_date: q("pickup_date"), vehicle: q("vehicle") }} />
        <div className="mt-8 grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-xl bg-white p-4 ring-1 ring-slate-200"><ShieldCheck size={18} className="text-emerald-600" /> Verified drivers, clean cars</div>
          <a href={`tel:${BIZ.phones[0]}`} className="flex items-center gap-2 rounded-xl bg-white p-4 ring-1 ring-slate-200"><Phone size={18} className="text-indigo-700" /> Call {BIZ.phones[0]}</a>
          <a href={`https://wa.me/${BIZ.whatsapp}`} target="_blank" rel="noopener" className="flex items-center gap-2 rounded-xl bg-white p-4 ring-1 ring-slate-200"><MessageCircle size={18} className="text-emerald-600" /> WhatsApp us</a>
        </div>
      </div>
    </div>
  );
}
