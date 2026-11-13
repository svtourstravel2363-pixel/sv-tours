import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { DEFAULT_ITEMS, COLOURS, type Kind } from "@/lib/content";
import { saveItem, addItem, deleteItem, seedKind } from "@/app/actions";
import { inputCls } from "@/components/Field";

type FieldDef = { name: "title" | "subtitle" | "extra" | "extra2" | "extra3"; label: string; type?: "text" | "area" | "select"; options?: string[] };
const ICONS = ["plane", "city", "hill", "beach", "temple", "train"];
const SERVICE_ICONS = ["car", "map", "plane", "mountain"];

const TRUST_ICONS = ["user", "clock", "rupee", "shield"];

const CONFIG: Record<string, { kind: Kind; label: string; help: string; fields: FieldDef[] }> = {
  locations: { kind: "location", label: "Popular Locations", help: "Cards on the home page. Clicking one pre-fills the booking form.", fields: [{ name: "title", label: "Place name" }, { name: "subtitle", label: "Small text (e.g. Lohegaon)" }, { name: "extra", label: "Icon", type: "select", options: ICONS }] },
  tours: { kind: "tour", label: "Tour Packages", help: "Shown on the Services page and the home page.", fields: [{ name: "title", label: "Destination" }, { name: "subtitle", label: "Description", type: "area" }, { name: "extra", label: "Card colour", type: "select", options: Object.keys(COLOURS) }, { name: "extra2", label: "Price / link text (e.g. From ₹6,500 or Contact for Packages & Details)" }] },
  services: { kind: "service", label: "Services", help: "Service cards on the home page. These names are also the choices in the booking form.", fields: [{ name: "title", label: "Service name" }, { name: "subtitle", label: "Description", type: "area" }, { name: "extra", label: "Icon", type: "select", options: SERVICE_ICONS }, { name: "extra2", label: "Button text" }, { name: "extra3", label: "Button link (e.g. /services#local or /booking)" }] },
  faqs: { kind: "faq", label: "FAQs", help: "Questions and answers on the home page.", fields: [{ name: "title", label: "Question" }, { name: "subtitle", label: "Answer", type: "area" }] },
  trust: { kind: "trust", label: "Trust Strip", help: "The 4 reassurance points under the home page banner.", fields: [{ name: "title", label: "Heading" }, { name: "subtitle", label: "Small text" }, { name: "extra", label: "Icon", type: "select", options: TRUST_ICONS }] },
  steps: { kind: "step", label: "How It Works", help: "The numbered steps on the home page (numbered by Order).", fields: [{ name: "title", label: "Step title" }, { name: "subtitle", label: "Step text", type: "area" }] },
  stats: { kind: "stat", label: "Home Page Stats", help: "The 3 small figures under the home page buttons (e.g. 24×7 — Booking support).", fields: [{ name: "title", label: "Figure (e.g. 24×7)" }, { name: "subtitle", label: "Label" }] },
  "vehicle-types": { kind: "vehicle_type", label: "Booking Form Vehicle Types", help: "The choices in the booking form's vehicle drop-down.", fields: [{ name: "title", label: "Vehicle type" }] },
  conditions: { kind: "condition", label: "Outstation Conditions", help: "The tick-list under Outstation rates on the Services page.", fields: [{ name: "title", label: "Condition" }] },
};

function Input({ f, value }: { f: FieldDef; value?: string }) {
  if (f.type === "area") return <textarea name={f.name} rows={2} defaultValue={value} className={inputCls + " mt-1"} />;
  if (f.type === "select") return <select name={f.name} defaultValue={value || f.options![0]} className={inputCls + " mt-1"}>{f.options!.map((o) => <option key={o}>{o}</option>)}</select>;
  return <input name={f.name} defaultValue={value} required={f.name === "title"} className={inputCls + " mt-1"} />;
}

/* eslint-disable @next/next/no-img-element */
export default async function AdminContent({ params, searchParams }: PageProps<"/admin/content/[kind]">) {
  const { kind: slug } = await params;
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? sp.error : null;
  const cfg = CONFIG[slug];
  if (!cfg) notFound();
  const supabase = await createClient();
  const { data: rows } = await supabase.from("content_items").select("*").eq("kind", cfg.kind).order("sort").order("created_at");
  const lbl = "block text-xs font-medium text-slate-600";
  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold">{cfg.label}</h1>
      <p className="mb-6 text-sm text-slate-600">{cfg.help}</p>
      {error && <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}

      {!rows?.length && (
        <div className="mb-6 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
          <p className="text-sm text-slate-700">Nothing saved yet — the website is showing the built-in {DEFAULT_ITEMS[cfg.kind].length} default items. Load them here to edit, or add your own below. (If this fails, run <code>supabase/content.sql</code> in the Supabase SQL Editor first.)</p>
          <form action={seedKind} className="mt-3"><input type="hidden" name="kind" value={cfg.kind} /><button className="rounded-lg bg-amber-500 px-5 py-2 font-bold text-slate-950">Load current items</button></form>
        </div>
      )}

      <div className="space-y-3">
        {rows?.map((r) => (
          <form key={r.id} action={saveItem} className={`grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2 ${r.active ? "" : "opacity-60"}`}>
            <input type="hidden" name="id" value={r.id} />
            {cfg.fields.map((f) => <label key={f.name} className={lbl + (f.type === "area" || f.name === "title" ? " sm:col-span-2" : "")}>{f.label}<Input f={f} value={r[f.name] ?? ""} /></label>)}
            {cfg.kind === "tour" && (
              <div className="sm:col-span-2">
                {r.extra3 && <img src={r.extra3} alt="" className="mb-2 h-24 w-40 rounded-lg object-cover" />}
                <label className={lbl}>Cover image (optional, replaces the colour card) — JPG, PNG or WebP, max 4 MB<input type="file" name="image" accept="image/jpeg,image/png,image/webp" className={inputCls + " mt-1"} /></label>
                {r.extra3 && <label className="mt-1 flex items-center gap-2 text-xs text-rose-700"><input type="checkbox" name="remove_image" /> Remove current image</label>}
              </div>
            )}
            <label className={lbl}>Order<input name="sort" type="number" defaultValue={r.sort} className={inputCls + " mt-1"} /></label>
            <label className="flex items-center gap-2 self-end pb-2 text-sm"><input type="checkbox" name="active" defaultChecked={r.active} className="h-4 w-4" /> Show on website</label>
            <div className="flex gap-3 sm:col-span-2">
              <button className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white">Save</button>
              <button formAction={deleteItem} formNoValidate className="rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">Delete</button>
            </div>
          </form>
        ))}
      </div>

      <form action={addItem} className="mt-8 grid gap-3 rounded-2xl bg-white p-5 shadow-sm ring-2 ring-amber-200 sm:grid-cols-2">
        <h2 className="font-bold sm:col-span-2">Add new</h2>
        <input type="hidden" name="kind" value={cfg.kind} />
        {cfg.fields.map((f) => <label key={f.name} className={lbl + (f.type === "area" || f.name === "title" ? " sm:col-span-2" : "")}>{f.label}<Input f={f} /></label>)}
        {cfg.kind === "tour" && <label className={lbl + " sm:col-span-2"}>Cover image (optional) — JPG, PNG or WebP, max 4 MB<input type="file" name="image" accept="image/jpeg,image/png,image/webp" className={inputCls + " mt-1"} /></label>}
        <label className={lbl}>Order<input name="sort" type="number" defaultValue={(rows?.length ?? 0) + 1} className={inputCls + " mt-1"} /></label>
        <div className="sm:col-span-2"><button className="rounded-lg bg-amber-500 px-5 py-2 font-bold text-slate-950">Add</button></div>
      </form>
    </div>
  );
}
