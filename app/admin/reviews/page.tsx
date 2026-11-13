import { createClient } from "@/utils/supabase/server";
import { moderateReview } from "@/app/actions";
import Stars from "@/components/Stars";

export default async function AdminReviews() {
  const supabase = await createClient();
  const { data: reviews } = await supabase.from("reviews").select("*").order("approved").order("created_at", { ascending: false });
  const btn = (action: string, label: string, cls: string) => <button name="action" value={action} className={`rounded-lg px-3 py-1 text-sm text-white ${cls}`}>{label}</button>;
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold">Reviews</h1>
      <div className="space-y-3">
        {reviews?.map((r) => (
          <div key={r.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div><Stars n={r.rating} /> <b className="ml-2">{r.name}</b> <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${r.approved ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{r.approved ? "Published" : "Pending"}</span></div>
              <form action={moderateReview} className="flex gap-1"><input type="hidden" name="id" value={r.id} />
                {r.approved ? btn("reject", "Unpublish", "bg-slate-600") : btn("approve", "Approve", "bg-emerald-600")}
                {btn("delete", "Delete", "bg-rose-600")}
              </form>
            </div>
            <p className="mt-2 text-sm text-slate-700">{r.comment}</p>
          </div>
        ))}
        {!reviews?.length && <p className="text-slate-500">No reviews yet.</p>}
      </div>
    </div>
  );
}
