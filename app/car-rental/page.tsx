import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle, ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero";
import JsonLd, { breadcrumbs, SITE } from "@/components/JsonLd";
import { getRates } from "@/lib/rates";
import { getBiz } from "@/lib/content";
import { LOCATIONS } from "@/lib/locations";

const title = "Car Rental Near Me in Pune & Mumbai | Cab with Driver – SV Tours";
const description = "Car rental with driver near you in Pune and Mumbai. Doorstep pickup in Katraj, Kothrud, Hinjewadi, Wakad, Hadapsar, Kharadi, Andheri, Thane, Navi Mumbai and more. Local, airport and outstation cabs.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/car-rental" },
  openGraph: { title, description, url: `${SITE}/car-rental`, siteName: "SV Tours & Travels", locale: "en_IN", type: "website" },
};

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const h2 = "text-2xl font-extrabold text-navy-900 md:text-3xl";

export default async function CarRental() {
  const [{ rates }, biz] = await Promise.all([getRates(), getBiz()]);
  const min = (kind: "local" | "outstation") => rates.filter((r) => r.kind === kind && r.price !== null && !r.contact_only).sort((a, b) => a.price! - b.price!)[0];
  const lo = min("local"), out = min("outstation");
  const faqs: [string, string][] = [
    ["Is there a car rental near me in Pune?", "We pick up from your doorstep across Pune and Pimpri-Chinchwad, including Katraj, Kothrud, Hinjewadi, Wakad, Baner, Hadapsar, Kharadi and Viman Nagar. Our office is in Dattanagar, Ambegaon."],
    ["Do you provide car rental in Mumbai?", "Yes, for trips between Mumbai and Pune and for outstation travel. We pick up from Mumbai Airport, Andheri, Bandra, Dadar, Thane, Navi Mumbai, Borivali, Powai and Panvel."],
    ["What does it cost to rent a car with driver?", `${lo ? `Local 8 hr / 80 km packages in Pune start at ${inr(lo.price!)}. ` : ""}${out ? `Outstation trips start at ${inr(out.price!)} per km with a minimum of 300 km per day. ` : ""}Toll, parking and driver allowance are extra.`],
    ["Do you offer self-drive car rental?", "No. Every car comes with an experienced, verified driver, included in the package."],
    ["How do I book?", `Use the booking form, call ${biz.phones[0]} or message us on WhatsApp. We call back to confirm the vehicle, fare and driver details.`],
  ];
  return (
    <>
      <JsonLd data={breadcrumbs([["Car Rental", "/car-rental"]])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Car rental locations", itemListElement: LOCATIONS.map((l, i) => ({ "@type": "ListItem", position: i + 1, name: `Car rental in ${l.name}, ${l.city}`, url: `${SITE}/car-rental/${l.slug}` })) }} />

      <PageHero eyebrow="Car Rental · Pune & Mumbai" title="Car Rental Near You, with Driver" sub="Doorstep pickup across Pune and Mumbai for local travel, airport transfers and outstation trips. Choose your area below." />

      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/booking" className="rounded-full bg-brand-600 px-7 py-3 text-center font-bold text-white shadow hover:bg-brand-700">Book a car</Link>
          <a href={`tel:${biz.phones[0]}`} className="flex items-center justify-center gap-2 rounded-full bg-navy-900 px-7 py-3 font-semibold text-white"><Phone size={18} /> {biz.phones[0]}</a>
          <a href={`https://wa.me/${biz.whatsapp}`} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3 font-semibold text-white"><MessageCircle size={18} /> WhatsApp</a>
        </div>

        {(["Pune", "Mumbai"] as const).map((city) => (
          <section key={city} className="mt-10">
            <h2 className={h2}>Car rental in {city}</h2>
            <p className="mt-2 text-slate-600">{city === "Pune" ? "Local 8 hr / 80 km packages, Pune and Mumbai airport transfers, and outstation trips from every part of the city." : "One-way and round trips between Mumbai and Pune, airport connections and outstation travel, with pickup at your address."}</p>
            <div className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3">
              {LOCATIONS.filter((l) => l.city === city).map((l) => (
                <Link key={l.slug} href={`/car-rental/${l.slug}`} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:ring-brand-400">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700"><MapPin size={18} /></span>
                  <span className="min-w-0"><span className="block truncate text-sm font-bold">{l.name}</span><span className="block truncate text-xs text-slate-500">{l.landmarks.slice(0, 2).join(" · ")}</span></span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-10">
          <h2 className={h2}>Car rental questions</h2>
          <div className="mt-4 space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold">{q}<ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" /></summary>
                <p className="mt-2 text-sm text-slate-600">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">See full prices on the <Link href="/services" className="font-semibold text-navy-700">services and rates page</Link> or view <Link href="/fleet" className="font-semibold text-navy-700">our fleet</Link>.</p>
        </section>
      </div>
    </>
  );
}
