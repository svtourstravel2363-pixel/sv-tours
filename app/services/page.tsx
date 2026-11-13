import Link from "next/link";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import { getRates } from "@/lib/rates";
import { getBiz, getItems, COLOURS } from "@/lib/content";

export const metadata = {
  title: {
    absolute:
      "Cab Services in Pune | Local, Outstation & Airport Taxi – SV Tours",
  },

  description:
    "Explore cab services in Pune with SV Tours & Travels. Book local 8-hour packages, outstation taxis, Pune and Mumbai airport transfers, Sedan, SUV, MUV, Innova Crysta and Tempo Traveller for comfortable travel.",

  alternates: {
    canonical: "/services",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  openGraph: {
    title: "Cab Services in Pune | SV Tours & Travels",
    description:
      "Book local cabs, outstation taxis, airport transfers and tour packages from Pune. Multiple vehicle categories available.",
    url: "https://www.svtourstravel.com/services",
    siteName: "SV Tours & Travels",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Cab Services in Pune | SV Tours & Travels",
    description:
      "Local cab packages, outstation taxi, airport transfers and tour packages from Pune.",
  },
};

const card = "rounded-2xl bg-white p-6 text-center shadow ring-1 ring-slate-200";

export default async function Services() {
  const [{ rates }, BIZ, tours, conditions] = await Promise.all([getRates(), getBiz(), getItems("tour"), getItems("condition")]);
  const local = rates.filter((r) => r.kind === "local");
  const outstation = rates.filter((r) => r.kind === "outstation");
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  return (
    <>
      <JsonLd data={breadcrumbs([["Services", "/services"]])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "OfferCatalog", name: "SV Tours & Travels cab services", itemListElement: rates.filter((r) => !r.contact_only && r.price !== null).map((r) => ({ "@type": "Offer", name: `${r.kind === "local" ? "Local 8 hr / 80 km package" : "Outstation per KM"} – ${r.category}`, description: r.cars, priceCurrency: "INR", price: r.price, itemOffered: { "@type": "Service", name: r.category, areaServed: "Pune, Maharashtra, India", provider: { "@id": "https://svtourstravel.com/#business" } } })) }} />
      <PageHero eyebrow="Our Services" title="Travel solutions for every journey" sub="Local travel, outstation trips, airport transfers and tour packages from Pune, Mumbai and across India." />
      <section id="local" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-extrabold">Local Travel Packages <span className="text-base font-medium text-slate-500">· 8 Hours / 80 KM</span></h2>
        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {local.map((p) => p.contact_only || p.price === null ? (
            <div key={p.category} className={card + " bg-amber-50"}><h3 className="font-bold">{p.category}</h3><p className="mt-1 min-h-10 text-xs text-slate-500">{p.cars}</p><p className="mt-3 text-xl font-bold text-amber-700">Contact for Pricing</p><a href={`tel:${BIZ.phones[0]}`} className="mt-2 inline-block text-sm font-semibold text-indigo-700">Call {BIZ.phones[0]}</a></div>
          ) : (
            <div key={p.category} className={card}>
              <h3 className="font-bold">{p.category}</h3><p className="mt-1 min-h-10 text-xs text-slate-500">{p.cars}</p>
              <p className="mt-3 text-3xl font-extrabold">{inr(p.price)}</p>
              <p className="mt-2 text-sm text-slate-600">{p.extra_km !== null && <>Extra KM: {inr(p.extra_km)}</>}{p.extra_km !== null && p.extra_hour !== null && " · "}{p.extra_hour !== null && <>Extra Hour: {inr(p.extra_hour)}</>}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="outstation" className="bg-slate-100 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold">Outstation Travel Rates</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-4">
            {outstation.map((p) => p.contact_only || p.price === null ? (
              <div key={p.category} className={card + " bg-amber-50"}><h3 className="font-bold">{p.category}</h3><p className="mt-1 min-h-10 text-xs text-slate-500">{p.cars}</p><p className="mt-3 text-xl font-bold text-amber-700">Contact for Pricing</p></div>
            ) : (
              <div key={p.category} className={card}><h3 className="font-bold">{p.category}</h3><p className="mt-1 min-h-10 text-xs text-slate-500">{p.cars}</p><p className="mt-3 text-3xl font-extrabold">{inr(p.price)}<span className="text-base font-medium text-slate-500"> / KM</span></p></div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200">
            <h3 className="font-bold">Outstation Booking Conditions</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">{conditions.items.map((c) => <li key={c.title} className="flex items-center gap-2 text-sm"><Check size={16} className="text-emerald-600" />{c.title}</li>)}</ul>
          </div>
        </div>
      </section>
      <section id="airport" className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-amber-100 to-indigo-50 p-8 ring-1 ring-amber-200 md:flex-row">
          <div><h2 className="text-2xl font-extrabold">Airport Pickup & Drop</h2><p className="text-slate-600">Reliable transfers to Pune and Mumbai airports for all vehicle categories. Contact for pricing.</p></div>
          <Link href="/booking?service=Airport%20Pickup%20%26%20Drop" className="rounded-full bg-slate-900 px-6 py-3 font-bold text-white">Book Airport Transfer</Link>
        </div>
      </section>
      <section id="tours" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-extrabold">Tour Packages</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tours.items.map((t) => (
            <div key={t.title} className="overflow-hidden rounded-2xl bg-white shadow ring-1 ring-slate-200">
              {t.extra3 ? (
                  <div className="relative h-32 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.extra3} alt={t.title} loading="lazy" className="h-full w-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8 text-lg font-extrabold text-white">{t.title}</span>
                  </div>
                ) : (
                  <div className={`grid h-28 place-items-center bg-gradient-to-br ${COLOURS[t.extra] ?? COLOURS.amber} px-2 text-center text-xl font-extrabold text-white`}>{t.title}</div>
                )}
              <div className="p-5"><p className="text-sm text-slate-600">{t.subtitle}</p><Link href={`/booking?service=${encodeURIComponent("Tour Packages")}&drop=${encodeURIComponent(t.title)}`} className="mt-3 inline-block text-sm font-semibold text-indigo-700">{t.extra2 || "Contact for Packages & Details"} →</Link></div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-600">Questions? Call <a className="font-semibold" href={`tel:${BIZ.phones[0]}`}>{BIZ.phones[0]}</a></p>
      </section>
    </>
  );
}
