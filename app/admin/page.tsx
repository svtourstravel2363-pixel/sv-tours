import Link from "next/link";
import { CalendarCheck, Clock, CheckCircle2, Star, Users, Car } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { STATUS_STYLE } from "@/lib/data";

export default async function AdminHome() {
  const supabase = await createClient();
  const count = async (q: PromiseLike<{ count: number | null }>) => (await q).count ?? 0;
  const head = { count: "exact", head: true } as const;
  const [total, pending, confirmed, reviewsWaiting, users, vehicles, { data: recent }] = await Promise.all([
    count(supabase.from("bookings").select("*", head)),
    count(supabase.from("bookings").select("*", head).eq("status", "pending")),
    count(supabase.from("bookings").select("*", head).eq("status", "confirmed")),
    count(supabase.from("reviews").select("*", head).eq("approved", false)),
    count(supabase.from("profiles").select("*", head)),
    count(supabase.from("vehicles").select("*", head).eq("active", true)),
    supabase.from("bookings").select("id,name,phone,service,pickup,drop_location,pickup_date,status,created_at").order("created_at", { ascending: false }).limit(6),
  ]);
  const cards = [
    [CalendarCheck, "Total Bookings", total, "from-indigo-600 to-indigo-800", "/admin/bookings"],
    [Clock, "Pending", pending, "from-amber-500 to-orange-600", "/admin/bookings?status=pending"],
    [CheckCircle2, "Confirmed", confirmed, "from-emerald-500 to-teal-700", "/admin/bookings?status=confirmed"],
    [Star, "Reviews to Approve", reviewsWaiting, "from-rose-500 to-pink-700", "/admin/reviews"],
    [Users, "Customers", users, "from-sky-500 to-blue-700", "/admin/users"],
    [Car, "Active Vehicles", vehicles, "from-slate-600 to-slate-800", "/admin/vehicles"],
  ] as const;
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([I, l, n, g, h]) => (
          <Link key={l} href={h} className={`group rounded-2xl bg-gradient-to-br ${g} p-5 text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg`}>
            <div className="flex items-center justify-between"><p className="text-sm opacity-90">{l}</p><I size={20} className="opacity-80" /></div>
            <p className="mt-2 text-4xl font-extrabold">{n}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">Recent Bookings</h2><Link href="/admin/bookings" className="text-sm font-semibold text-indigo-700">View all →</Link></div>
        <div className="divide-y divide-slate-100">
          {recent?.map((b) => (
            <div key={b.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
              <div><p className="font-semibold">{b.name} · <a className="text-indigo-700" href={`tel:${b.phone}`}>{b.phone}</a></p><p className="text-slate-500">{b.service} · {b.pickup}{b.drop_location ? ` → ${b.drop_location}` : ""} · {b.pickup_date ?? "-"}</p></div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[b.status]}`}>{b.status}</span>
            </div>
          ))}
          {!recent?.length && <p className="py-6 text-center text-slate-500">No bookings yet. They will appear here as soon as customers book.</p>}
        </div>
      </div>
    </div>
  );
}
