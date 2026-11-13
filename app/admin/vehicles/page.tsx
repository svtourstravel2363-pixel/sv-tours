import { createClient } from "@/utils/supabase/server";
import { addVehicle, toggleVehicle, deleteVehicle, setVehiclePhoto } from "@/app/actions";
import VehicleVisual from "@/components/VehicleVisual";
import { Field, inputCls } from "@/components/Field";

export default async function AdminVehicles({ searchParams }: PageProps<"/admin/vehicles">) {
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? sp.error : null;
  const supabase = await createClient();
  const { data: vehicles } = await supabase.from("vehicles").select("*").order("created_at", { ascending: false });
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold">Vehicles</h1>
      {error && <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
      <form action={addVehicle} className="mb-8 grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-amber-200 sm:grid-cols-2">
        <h2 className="font-bold sm:col-span-2">Add a vehicle</h2>
        <Field label="Vehicle name (e.g. Toyota Innova Crysta)"><input name="name" required className={inputCls} /></Field>
        <Field label="Category">
          <select name="category" className={inputCls}>
            <option value="sedan">Sedan</option><option value="suv">SUV / MUV</option>
            <option value="premium">Premium SUV</option><option value="van">Tempo Traveller / Urbania</option>
          </select>
        </Field>
        <Field label="Seats (e.g. 7 seats)"><input name="seats" className={inputCls} /></Field>
        <Field label="Vehicle number (e.g. MH12 AB 2362)"><input name="reg_number" className={inputCls} /></Field>
        <div className="sm:col-span-2"><Field label="Vehicle photo (JPG, PNG or WebP, max 4 MB — it is resized and converted to WebP automatically)"><input type="file" name="photo" accept="image/jpeg,image/png,image/webp" className={inputCls + " file:mr-3 file:rounded-md file:border-0 file:bg-amber-100 file:px-3 file:py-1.5 file:font-semibold file:text-amber-800"} /></Field></div>
        <div className="sm:col-span-2"><Field label="Short note"><input name="note" className={inputCls} /></Field></div>
        <button className="rounded-lg bg-slate-900 py-2.5 font-semibold text-white sm:col-span-2">Add Vehicle</button>
      </form>
      <div className="grid gap-4 sm:grid-cols-2">
        {vehicles?.map((v) => (
          <div key={v.id} className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 ${v.active ? "" : "opacity-60"}`}>
            <VehicleVisual name={v.name} category={v.category} image={v.image_url} plate={v.reg_number} />
            <h3 className="mt-3 font-bold">{v.name}</h3>
            <p className="text-sm text-slate-600">{v.seats} {v.reg_number && `· ${v.reg_number}`}</p>
            <form action={setVehiclePhoto} className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <input type="hidden" name="id" value={v.id} />
              <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" className="max-w-[11rem] text-xs file:mr-2 file:rounded-md file:border-0 file:bg-slate-100 file:px-2 file:py-1" />
              <button className="rounded-md bg-slate-900 px-3 py-1.5 font-semibold text-white">{v.image_url ? "Change photo" : "Upload photo"}</button>
              {v.image_url && <button name="remove" value="1" formNoValidate className="text-rose-600">Remove photo</button>}
            </form>
            <div className="mt-3 flex gap-3 text-sm">
              <form action={toggleVehicle}><input type="hidden" name="id" value={v.id} /><input type="hidden" name="active" value={String(!v.active)} /><button className="font-semibold text-indigo-700">{v.active ? "Hide from website" : "Show on website"}</button></form>
              <form action={deleteVehicle}><input type="hidden" name="id" value={v.id} /><button className="text-rose-600">Delete</button></form>
            </div>
          </div>
        ))}
        {!vehicles?.length && <p className="text-slate-500">No vehicles added yet. The website shows the default fleet until you add your own.</p>}
      </div>
    </div>
  );
}
