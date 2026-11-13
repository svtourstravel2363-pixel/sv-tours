import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import CarArt from "@/components/CarArt";
import VehicleVisual from "@/components/VehicleVisual";
import { createClient } from "@/utils/supabase/server";
import { FLEET } from "@/lib/data";
import { getSettings } from "@/lib/content";

export const metadata = {
  title: "Cars on Rent in Pune – Sedan, SUV, Innova, Urbania",
  description: "Hire a Toyota Glanza, Dzire, Rumion, Ertiga, Creta, Innova Crysta or Force Urbania with driver in Pune. Clean, comfortable vehicles with experienced drivers.",
  alternates: { canonical: "/fleet" },
};
const LABEL = { sedan: "Sedan", suv: "SUV", mpv: "MUV", premium: "Premium SUV", van: "Tempo Traveller / Urbania" } as const;

export default async function Fleet() {
  const st = await getSettings();
  const supabase = await createClient();
  const { data } = await supabase.from("vehicles").select("*").eq("active", true).order("created_at");
  const fleet = data && data.length ? data.map((v) => ({ type: LABEL[v.category as keyof typeof LABEL], model: v.name, note: v.note ?? "", seats: v.seats ?? "", image: v.image_url as string | null, plate: v.reg_number as string | null, kind: v.category as keyof typeof LABEL })) : FLEET;
  return (
    <>
      <JsonLd data={breadcrumbs([["Our Fleet", "/fleet"]])} />
      <PageHero eyebrow="Our Fleet" title={st.fleet_sub} sub="Well-maintained, sanitised vehicles with experienced drivers." />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((v) => (
            <div key={v.model} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
              <VehicleVisual name={v.model} category={v.kind} image={v.image} plate={"plate" in v ? v.plate : null} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-amber-700">{v.type}</p>
              <h2 className="text-lg font-bold" style={{ fontFamily: "inherit" }}>{v.model}</h2>
              <p className="text-sm text-slate-600">{v.note}</p><p className="mt-1 text-xs text-slate-500">{v.seats}</p>
              <Link href={`/booking?vehicle=${encodeURIComponent(v.type)}`} className="mt-4 inline-block text-sm font-semibold text-indigo-700">Book this vehicle →</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
