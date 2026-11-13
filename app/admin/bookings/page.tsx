import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { setBookingStatus, deleteBooking } from "@/app/actions";
import { STATUS_STYLE, BIZ } from "@/lib/data";

const TABS = ["all", "pending", "confirmed", "completed", "cancelled"];

export default async function AdminBookings({ searchParams }: PageProps<"/admin/bookings">) {
  const sp = await searchParams;
  const status = typeof sp.status === "string" && TABS.includes(sp.status) ? sp.status : "all";
  const supabase = await createClient();
  let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
  if (status !== "all") query = query.eq("status", status);
  const { data: bookings } = await query;
  return (
    <div>
      <h1 className="mb-4 text-2xl font-extrabold">Bookings</h1>
      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => <Link key={t} href={t === "all" ? "/admin/bookings" : `/admin/bookings?status=${t}`} className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${status === t ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-amber-400"}`}>{t}</Link>)}
      </div>
      <div className="space-y-3">
        {bookings?.map((b) => (
          <div key={b.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-bold">{b.name} · <a className="text-indigo-700" href={`tel:${b.phone}`}>{b.phone}</a></h3>
                <p className="text-sm text-slate-600">{b.service} · {b.vehicle} · {b.passengers} pax</p>
                <p className="text-sm text-slate-600">{b.pickup}{b.drop_location ? ` → ${b.drop_location}` : ""}</p>
                <p className="text-sm text-slate-500">{b.pickup_date} {b.pickup_time}{b.drop_date ? ` · drop ${b.drop_date}` : ""}</p>
                {b.notes && <p className="mt-1 text-sm italic text-slate-500">“{b.notes}”</p>}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[b.status]}`}>{b.status}</span>
                <form action={setBookingStatus} className="flex gap-1">
                  <input type="hidden" name="id" value={b.id} />
                  <select name="status" defaultValue={b.status} className="rounded-lg border border-slate-300 px-2 py-1 text-sm">
                    {["pending", "confirmed", "completed", "cancelled"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <button className="rounded-lg bg-slate-900 px-3 py-1 text-sm text-white">Update</button>
                </form>
                <a target="_blank" rel="noopener" className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white" href={`https://wa.me/91${b.phone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(`Hello ${b.name}, your booking with SV Tours & Travels (${b.service}, ${b.pickup_date} ${b.pickup_time}, pickup: ${b.pickup}) is ${b.status === "cancelled" ? "cancelled" : "confirmed"}. Thank you! - SV Tours & Travels, ${BIZ.phones[0]}`)}`}>Confirm via WhatsApp</a>
                <form action={deleteBooking}><input type="hidden" name="id" value={b.id} /><button className="text-xs text-rose-600 hover:underline">Delete</button></form>
              </div>
            </div>
          </div>
        ))}
        {!bookings?.length && <p className="text-slate-500">No bookings yet.</p>}
      </div>
    </div>
  );
}
