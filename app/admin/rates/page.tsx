import { getRates, type Rate } from "@/lib/rates";
import { updateRate, loadDefaultRates } from "@/app/actions";
import { inputCls } from "@/components/Field";

function RateForm({ r }: { r: Rate }) {
  return (
    <form action={updateRate} className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:grid-cols-6">
      <input type="hidden" name="id" value={r.id} />
      <div className="sm:col-span-6"><p className="font-bold">{r.category}</p></div>
      <label className="text-xs font-medium text-slate-600 sm:col-span-6">Vehicles shown<input name="cars" defaultValue={r.cars} className={inputCls + " mt-1"} /></label>
      <label className="text-xs font-medium text-slate-600 sm:col-span-2">{r.kind === "local" ? "Package price (₹)" : "Rate per KM (₹)"}<input name="price" type="number" min={0} step="any" defaultValue={r.price ?? ""} className={inputCls + " mt-1"} /></label>
      {r.kind === "local" ? (
        <>
          <label className="text-xs font-medium text-slate-600 sm:col-span-2">Extra KM (₹)<input name="extra_km" type="number" min={0} step="any" defaultValue={r.extra_km ?? ""} className={inputCls + " mt-1"} /></label>
          <label className="text-xs font-medium text-slate-600 sm:col-span-2">Extra Hour (₹)<input name="extra_hour" type="number" min={0} step="any" defaultValue={r.extra_hour ?? ""} className={inputCls + " mt-1"} /></label>
        </>
      ) : <div className="sm:col-span-4" />}
      <label className="flex items-center gap-2 text-sm sm:col-span-4"><input type="checkbox" name="contact_only" defaultChecked={r.contact_only} className="h-4 w-4" /> Show &ldquo;Contact for Pricing&rdquo; instead of a price</label>
      <div className="sm:col-span-2 sm:text-right"><button className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700">Save</button></div>
    </form>
  );
}

export default async function AdminRates() {
  const { rates, fromDb } = await getRates();
  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold">Rates &amp; Prices</h1>
      <p className="mb-6 text-sm text-slate-600">Changes appear on the public <a className="font-semibold text-indigo-700" href="/services" target="_blank">Services page</a> right after you save.</p>
      {!fromDb ? (
        <div className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200">
          <p className="font-semibold">Rates are not set up in the database yet.</p>
          <p className="mt-1 text-sm text-slate-700">The website is showing the built-in default prices. First run <code>supabase/rates.sql</code> in the Supabase SQL Editor (creates the table), then click the button below to load the current prices so you can edit them.</p>
          <form action={loadDefaultRates} className="mt-4"><button className="rounded-lg bg-amber-500 px-5 py-2.5 font-bold text-slate-950">Load current prices</button></form>
        </div>
      ) : (
        <div className="space-y-8">
          {(["local", "outstation"] as const).map((k) => (
            <section key={k}>
              <h2 className="mb-3 text-lg font-bold">{k === "local" ? "Local Travel Packages (8 hrs / 80 KM)" : "Outstation Rates (per KM)"}</h2>
              <div className="space-y-3">{rates.filter((r) => r.kind === k).map((r) => <RateForm key={r.id} r={r} />)}</div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
