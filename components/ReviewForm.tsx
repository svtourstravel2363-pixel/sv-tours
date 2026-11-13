"use client";
import { useActionState } from "react";
import { submitReview, type Result } from "@/app/actions";
import { Field, inputCls } from "./Field";

export default function ReviewForm({ defaultName = "" }: { defaultName?: string }) {
  const [state, action, pending] = useActionState<Result | null, FormData>(submitReview, null);
  return (
    <form action={action} className="grid gap-4 rounded-2xl bg-white p-6 shadow">
      <Field label="Your Name"><input name="name" defaultValue={defaultName} required className={inputCls} /></Field>
      <Field label="Your Rating">
        <select name="rating" defaultValue="5" className={inputCls}>
          <option value="5">★★★★★ - Excellent</option><option value="4">★★★★ - Good</option>
          <option value="3">★★★ - Average</option><option value="2">★★ - Poor</option><option value="1">★ - Bad</option>
        </select>
      </Field>
      <Field label="Write your experience..."><textarea name="comment" rows={4} required minLength={10} className={inputCls} /></Field>
      <button disabled={pending} className="rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-60">{pending ? "Submitting..." : "Submit Review"}</button>
      <p className="text-xs text-slate-500">Your review will be published after admin approval.</p>
      {state && <p className={`rounded-lg p-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>{state.message}</p>}
    </form>
  );
}
