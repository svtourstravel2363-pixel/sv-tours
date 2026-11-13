"use client";
import { useActionState } from "react";
import { updateProfile, type Result } from "@/app/actions";
import { Field, inputCls } from "./Field";

export default function ProfileForm({ name, phone, email }: { name: string; phone: string; email: string }) {
  const [state, action, pending] = useActionState<Result | null, FormData>(updateProfile, null);
  return (
    <form action={action} className="grid gap-4 rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
      <Field label="Email"><input value={email} disabled className={inputCls + " bg-slate-100"} /></Field>
      <Field label="Full Name"><input name="full_name" defaultValue={name} required className={inputCls} /></Field>
      <Field label="Mobile Number"><input name="phone" defaultValue={phone} required className={inputCls} /></Field>
      <button disabled={pending} className="rounded-lg bg-slate-900 py-2.5 font-semibold text-white disabled:opacity-60">{pending ? "Saving..." : "Save Profile"}</button>
      {state && <p className={`rounded-lg p-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>{state.message}</p>}
    </form>
  );
}
