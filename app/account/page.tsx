import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProfileForm from "@/components/ProfileForm";
import ReviewForm from "@/components/ReviewForm";
import Stars from "@/components/Stars";
import { STATUS_STYLE } from "@/lib/data";

export const metadata = { title: "My Account", robots: { index: false, follow: false } };

export default async function Account() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login?next=/account");
  const [{ data: profile }, { data: bookings }, { data: reviews }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", auth.user.id).single(),
    supabase.from("bookings").select("*").eq("user_id", auth.user.id).order("created_at", { ascending: false }),
    supabase.from("reviews").select("*").eq("user_id", auth.user.id).order("created_at", { ascending: false }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-extrabold">Hello, {profile?.full_name || "Traveller"} 👋</h1><p className="text-slate-600">Manage your bookings, profile and reviews.</p></div>
        <div className="flex gap-2">
          <Link href="/booking" className="rounded-full bg-amber-400 px-5 py-2.5 font-bold text-slate-950">+ New Booking</Link>
          {profile?.role === "admin" && <Link href="/admin" className="rounded-full bg-indigo-900 px-5 py-2.5 font-semibold text-white">Admin Panel</Link>}
          <form action="/auth/signout" method="post"><button className="rounded-full border border-slate-300 px-5 py-2.5 font-semibold">Logout</button></form>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-3 text-xl font-bold">My Bookings</h2>
          {bookings && bookings.length > 0 ? (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold">{b.service} · {b.vehicle}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[b.status]}`}>{b.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{b.pickup}{b.drop_location ? ` → ${b.drop_location}` : ""}</p>
                  <p className="text-sm text-slate-500">{b.pickup_date} {b.pickup_time} · {b.passengers} passenger(s)</p>
                </div>
              ))}
            </div>
          ) : <p className="rounded-2xl bg-white p-6 text-slate-500 ring-1 ring-slate-200">No bookings yet. <Link href="/booking" className="font-semibold text-indigo-700">Book your first ride →</Link></p>}

          <h2 id="review" className="mb-3 mt-10 text-xl font-bold">Write a Review</h2>
          <ReviewForm defaultName={profile?.full_name ?? ""} />
          {reviews && reviews.length > 0 && (
            <div className="mt-4 space-y-2">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-xl bg-white p-4 text-sm ring-1 ring-slate-200">
                  <Stars n={r.rating} /> <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${r.approved ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{r.approved ? "Published" : "Awaiting approval"}</span>
                  <p className="mt-1 text-slate-700">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>
        <aside>
          <h2 className="mb-3 text-xl font-bold">My Profile</h2>
          <ProfileForm name={profile?.full_name ?? ""} phone={profile?.phone ?? ""} email={auth.user.email ?? ""} />
        </aside>
      </div>
    </div>
  );
}
