import Link from "next/link";
import { Phone, MessageCircle, ChevronDown } from "lucide-react";
import ContentIcon from "@/components/ContentIcon";
import { getBiz, getItems, COLOURS } from "@/lib/content";
import InstagramIcon from "@/components/InstagramIcon";
import VehicleVisual from "@/components/VehicleVisual";
import HeroBanner from "@/components/HeroBanner";
import Stars from "@/components/Stars";
import { createClient } from "@/utils/supabase/server";
import { FLEET } from "@/lib/data";

const H = ({ t, s }: { t: string; s: string }) => (
  <div className="mb-10 text-center"><h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{t}</h2><p className="mt-2 text-slate-600">{s}</p><div className="mx-auto mt-3 h-1 w-16 rounded bg-amber-400" /></div>
);

export default async function Home() {
  const supabase = await createClient();
  const [biz, svc, locs, tours, faqs, trust, steps, stats] = await Promise.all([getBiz(), getItems("service"), getItems("location"), getItems("tour"), getItems("faq"), getItems("trust"), getItems("step"), getItems("stat")]);
  const st = biz.settings;
  const { data: reviews } = await supabase.from("reviews").select("id,name,rating,comment").eq("approved", true).order("created_at", { ascending: false }).limit(9);
  const { data: dbVehicles } = await supabase.from("vehicles").select("*").eq("active", true).order("created_at");
  const fleet = dbVehicles && dbVehicles.length ? dbVehicles.map((v) => ({ type: ({ sedan: "Sedan", suv: "SUV / MUV", premium: "Premium SUV", van: "Tempo Traveller / Urbania" } as const)[v.category as "sedan"], model: v.name, note: v.note ?? "", seats: v.seats ?? "", image: v.image_url as string | null, plate: v.reg_number as string | null, kind: v.category as "sedan" | "suv" | "premium" | "van" })) : FLEET;
  const avg = reviews && reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;

  return (
    <>
      <HeroBanner st={st} stats={stats.items} phone={biz.phones[0]} whatsapp={biz.whatsapp} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {trust.items.map((x) => (
            <div key={x.title} className="flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-indigo-50 text-indigo-700"><ContentIcon name={x.extra} /></span><div><p className="font-bold">{x.title}</p><p className="text-xs text-slate-500">{x.subtitle}</p></div></div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-4 py-20">
        <H t={st.services_title} s={st.services_sub} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {svc.items.map((x) => (
            <div key={x.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-100 text-amber-600"><ContentIcon name={x.extra} size={24} /></span>
              <h3 className="mt-4 text-lg font-bold">{x.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{x.subtitle}</p>
              {x.extra2 && <Link href={x.extra3 || "/services"} className="mt-4 inline-block text-sm font-semibold text-indigo-700">{x.extra2} →</Link>}
            </div>
          ))}
        </div>
      </section>

      <section id="locations" className="mx-auto max-w-6xl px-4 py-20">
        <H t={st.locations_title} s={st.locations_sub} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {locs.items.map((l) => (
            <Link key={l.title} href={`/booking?drop=${encodeURIComponent(l.title)}&pickup=${encodeURIComponent("Pune")}`} className="group flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-amber-400">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700 transition group-hover:bg-amber-400 group-hover:text-slate-950"><ContentIcon name={l.extra} /></span>
              <span className="min-w-0"><span className="block truncate text-sm font-bold">{l.title}</span><span className="block truncate text-xs text-slate-500">{l.subtitle}</span></span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">Going somewhere else? We run trips <b>anywhere in India</b> — <Link href="/booking" className="font-semibold text-indigo-700">tell us your destination →</Link></p>
      </section>

      <section id="tours" className="bg-slate-100 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <H t={st.tours_title} s={st.tours_sub} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tours.items.map((t) => (
              <div key={t.title} className="overflow-hidden rounded-2xl bg-white shadow ring-1 ring-slate-200">
                {t.extra3 ? (
                  <div className="relative h-32 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.extra3} alt={t.title} loading="lazy" className="h-full w-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8 text-lg font-extrabold text-white">{t.title}</span>
                  </div>
                ) : (
                  <div className={`grid h-32 place-items-center bg-gradient-to-br ${COLOURS[t.extra] ?? COLOURS.amber} px-2 text-center text-2xl font-extrabold text-white`}>{t.title}</div>
                )}
                <div className="p-5"><p className="text-sm text-slate-600">{t.subtitle}</p><Link href={`/booking?service=${encodeURIComponent("Tour Packages")}&drop=${encodeURIComponent(t.title)}`} className="mt-3 inline-block text-sm font-semibold text-indigo-700">{t.extra2 || "Contact for Packages & Details"} →</Link></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fleet" className="mx-auto max-w-6xl px-4 py-20">
        <H t={st.fleet_title} s={st.fleet_sub} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((v) => (
            <div key={v.model} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
              <VehicleVisual name={v.model} category={v.kind} image={v.image} plate={"plate" in v ? v.plate : null} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-amber-600">{v.type}</p>
              <h3 className="text-lg font-bold">{v.model}</h3><p className="text-sm text-slate-600">{v.note}</p><p className="mt-2 text-xs text-slate-500">{v.seats}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <H t={st.steps_title} s={st.steps_sub} />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.items.map((x, i) => (
            <div key={x.title} className="relative rounded-2xl bg-white p-6 pt-10 shadow-sm ring-1 ring-slate-200"><span className="absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full bg-amber-400 text-lg font-extrabold text-slate-950 shadow">{i + 1}</span><h3 className="font-bold">{x.title}</h3><p className="mt-1 text-sm text-slate-600">{x.subtitle}</p></div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-16 text-white">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left">
          <div><h2 className="text-3xl font-extrabold md:text-4xl">{st.cta_title}</h2><p className="mt-2 text-slate-300">{st.cta_sub}</p></div>
          <Link href="/booking" className="shrink-0 rounded-full bg-amber-400 px-8 py-4 font-bold text-slate-950 shadow-lg transition hover:bg-amber-300">Book Your Ride →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        <H t={st.faq_title} s={st.faq_sub} />
        <div className="space-y-3">
          {faqs.items.map((f) => (
            <details key={f.title} className="group rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{f.title}<ChevronDown size={18} className="transition group-open:rotate-180" /></summary>
              <p className="mt-2 text-sm text-slate-600">{f.subtitle}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
        <H t={st.contact_title} s={st.contact_sub} />
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow ring-1 ring-slate-200">
          <h3 className="text-xl font-bold">SV Tours & Travels</h3><p className="mt-1 text-sm text-slate-600">{biz.address}</p>
          <div className="mt-5 grid gap-3">
            {biz.phones.map((p) => <a key={p} href={`tel:${p}`} className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 font-semibold text-white"><Phone size={18} /> {p} · Call Now</a>)}
            <a href={`https://wa.me/${biz.whatsapp}`} target="_blank" className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 font-semibold text-white"><MessageCircle size={18} /> WhatsApp Us</a>
            <a href={biz.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 py-3 font-semibold text-white"><InstagramIcon size={18} /> Follow on Instagram</a>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-slate-100 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <H t={st.reviews_title} s={st.reviews_sub} />
          {avg > 0 && <p className="-mt-6 mb-8 text-center text-slate-700"><Stars n={Math.round(avg)} /> <b>{avg.toFixed(1)}</b> / 5 from {reviews!.length} review(s)</p>}
          {reviews && reviews.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200"><Stars n={r.rating} /><p className="mt-2 text-sm text-slate-700">“{r.comment}”</p><p className="mt-3 text-sm font-semibold">— {r.name}</p></div>
              ))}
            </div>
          ) : <p className="text-center text-slate-500">No reviews yet. Be the first!</p>}
          <p className="mt-8 text-center"><Link href="/account#review" className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white">Write a Review</Link></p>
        </div>
      </section>
    </>
  );
}
