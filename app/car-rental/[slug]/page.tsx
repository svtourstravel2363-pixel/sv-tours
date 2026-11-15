import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Phone, MessageCircle, MapPin, Check, ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero";
import JsonLd, { breadcrumbs, SITE } from "@/components/JsonLd";
import { getRates } from "@/lib/rates";
import { getBiz, getItems } from "@/lib/content";
import { LOCATIONS, ROUTES, locBySlug, place } from "@/lib/locations";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const l = locBySlug((await params).slug);
  if (!l) return {};
  const title = `Car Rental in ${place(l)} | Cab with Driver – SV Tours & Travels`;
  const description = l.city === "Pune"
    ? `Car rental with driver in ${place(l)}. Sedan, SUV, Innova Crysta and Tempo Traveller for local 8 hr/80 km packages, airport transfers and outstation trips. Call or WhatsApp to book.`
    : `Car rental with driver from ${place(l)} to Pune, Lonavala, Shirdi and more. Sedan, SUV, Innova Crysta and Tempo Traveller, one-way or round trip. Call or WhatsApp to book.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/car-rental/${l.slug}` },
    openGraph: { title, description, url: `${SITE}/car-rental/${l.slug}`, siteName: "SV Tours & Travels", locale: "en_IN", type: "website" },
  };
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const h2 = "text-2xl font-extrabold text-navy-900 md:text-3xl";
const card = "rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200";

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const l = locBySlug((await params).slug);
  if (!l) notFound();
  const [{ rates }, biz, conditions] = await Promise.all([getRates(), getBiz(), getItems("condition")]);
  const local = rates.filter((r) => r.kind === "local");
  const outstation = rates.filter((r) => r.kind === "outstation");
  const p = place(l);
  const isPune = l.city === "Pune";
  const other = isPune ? "Mumbai" : "Pune";
  const cheapestLocal = local.filter((r) => r.price !== null && !r.contact_only).sort((a, b) => a.price! - b.price!)[0];
  const cheapestOut = outstation.filter((r) => r.price !== null && !r.contact_only).sort((a, b) => a.price! - b.price!)[0];
  const nearby = LOCATIONS.filter((x) => x.city === l.city && x.slug !== l.slug);
  const bookHref = `/booking?pickup=${encodeURIComponent(p)}`;

  const faqs: [string, string][] = [
    [`How do I book a car rental in ${p}?`, `Fill in the booking form, call ${biz.phones[0]} or message us on WhatsApp with your pickup point in ${l.name}, destination, date and time. We call back to confirm the vehicle, fare and driver details.`],
    [`How much does a car rental in ${l.name} cost?`, `${isPune && cheapestLocal ? `Local 8 hr / 80 km packages start at ${inr(cheapestLocal.price!)}. ` : ""}${cheapestOut ? `Outstation trips start at ${inr(cheapestOut.price!)} per km, with a minimum running of 300 km per day. ` : ""}Toll, parking and driver allowance are extra. Ask us for an exact quote for your route.`],
    ["Is the driver included? Do you offer self-drive cars?", "Every car comes with an experienced, verified driver, and the driver is included in the package. We do not offer self-drive rentals."],
    [`Can I book a one-way cab from ${l.name} to ${other}?`, `Yes. ${l.name} to ${other} is a regular route for us, one-way or round trip, including drops at ${other} Airport. Share your timing and we will confirm the fare.`],
    [`Which cars are available in ${l.name}?`, "Sedans (Dzire, Aura, Xcent, Glanza), SUVs and MUVs (Ertiga, Rumion, Carens), Toyota Innova Crysta, and Tempo Traveller / Urbania for groups."],
  ];

  return (
    <>
      <JsonLd data={breadcrumbs([["Car Rental", "/car-rental"], [l.name, `/car-rental/${l.slug}`]])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Service", serviceType: "Car rental with driver", name: `Car rental in ${p}`,
        url: `${SITE}/car-rental/${l.slug}`, provider: { "@id": `${SITE}/#business` },
        areaServed: [{ "@type": "Place", name: p }, ...l.landmarks.map((n) => ({ "@type": "Place", name: `${n}, ${l.city}` }))],
        ...(cheapestOut ? { offers: { "@type": "Offer", priceCurrency: "INR", price: cheapestOut.price, description: "Outstation rate per km, from" } } : {}),
      }} />

      <PageHero eyebrow={`Car Rental · ${l.city}`} title={`Car Rental in ${p}`} sub={`Cab with driver for ${isPune ? "local travel, airport transfers and outstation trips" : `trips to ${other} and outstation travel`}, picked up from your doorstep in ${l.name}.`} />

      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href={bookHref} className="rounded-full bg-brand-600 px-7 py-3 text-center font-bold text-white shadow hover:bg-brand-700">Book a car in {l.name}</Link>
          <a href={`tel:${biz.phones[0]}`} className="flex items-center justify-center gap-2 rounded-full bg-navy-900 px-7 py-3 font-semibold text-white"><Phone size={18} /> {biz.phones[0]}</a>
          <a href={`https://wa.me/${biz.whatsapp}?text=${encodeURIComponent(`Hi SV Tours & Travels, I need a car in ${p}.`)}`} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3 font-semibold text-white"><MessageCircle size={18} /> WhatsApp</a>
        </div>

        <section className="mt-10">
          <h2 className={h2}>Cab with driver in {l.name}</h2>
          <p className="mt-3 text-slate-700">{l.intro}</p>
          <p className="mt-3 text-slate-700">
            SV Tours & Travels is a Pune-based car rental and taxi service. {isPune
              ? `In ${l.name} you can book a car for a few hours of local running, an airport transfer, or a one-way or round trip out of the city.`
              : `From ${l.name} you can book a one-way or round trip to Pune and other cities, or an airport connection, with pickup at your address.`} Every booking is confirmed by phone with the vehicle, fare and driver details before the trip.
          </p>
        </section>

        <section className="mt-10">
          <h2 className={h2}>Areas we cover in and around {l.name}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-700 min-[420px]:grid-cols-2 md:grid-cols-3">
            {l.landmarks.map((n) => <li key={n} className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-600" /> {n}</li>)}
          </ul>
        </section>

        {isPune && local.length > 0 && (
          <section className="mt-10">
            <h2 className={h2}>Local car rental rates <span className="text-base font-semibold text-slate-500">· 8 hours / 80 km</span></h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {local.map((r) => (
                <div key={r.category} className={card}>
                  <h3 className="font-bold">{r.category}</h3><p className="text-xs text-slate-500">{r.cars}</p>
                  {r.contact_only || r.price === null
                    ? <p className="mt-3 font-bold text-navy-800">Contact for pricing</p>
                    : <><p className="mt-3 text-2xl font-extrabold text-navy-900">{inr(r.price)}</p><p className="text-xs text-slate-600">{r.extra_km !== null && `Extra km: ₹${r.extra_km}`}{r.extra_km !== null && r.extra_hour !== null && " · "}{r.extra_hour !== null && `Extra hour: ₹${r.extra_hour}`}</p></>}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className={h2}>Outstation rates from {l.name}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outstation.map((r) => (
              <div key={r.category} className={card}>
                <h3 className="font-bold">{r.category}</h3><p className="text-xs text-slate-500">{r.cars}</p>
                {r.contact_only || r.price === null
                  ? <p className="mt-3 font-bold text-navy-800">Contact for pricing</p>
                  : <p className="mt-3 text-2xl font-extrabold text-navy-900">₹{r.price}<span className="text-sm font-semibold text-slate-500"> / km</span></p>}
              </div>
            ))}
          </div>
          <ul className="mt-4 grid gap-1 text-sm text-slate-700 sm:grid-cols-2">
            {[...conditions.items.map((c) => c.title), "Fare confirmed by phone before the trip"].map((c) => <li key={c} className="flex items-center gap-2"><Check size={16} className="shrink-0 text-emerald-600" /> {c}</li>)}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className={h2}>Popular trips from {l.name}</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-4">
            {ROUTES[l.city].map((r) => (
              <Link key={r.to} href={`/booking?pickup=${encodeURIComponent(p)}&drop=${encodeURIComponent(r.to)}`} className={`${card} transition hover:ring-brand-400`}>
                <span className="block text-sm font-bold">{l.name} to {r.to}</span>
                <span className="block text-xs text-slate-500">approx. {r.km} km from {l.city}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className={h2}>Questions about car rental in {l.name}</h2>
          <div className="mt-4 space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold">{q}<ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" /></summary>
                <p className="mt-2 text-sm text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className={h2}>Car rental in other {l.city} areas</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {nearby.map((x) => <Link key={x.slug} href={`/car-rental/${x.slug}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-800 ring-1 ring-slate-200 hover:ring-brand-400">{x.name}</Link>)}
            <Link href="/car-rental" className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white">All locations →</Link>
          </div>
        </section>
      </div>
    </>
  );
}
