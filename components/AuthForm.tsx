"use client";
import { useActionState, useState } from "react";
import { login, signup, type Result } from "@/app/actions";
import { Field, inputCls } from "./Field";
import { LogoFull } from "./Logo";

export default function AuthForm({ next }: { next: string }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [ls, la, lp] = useActionState<Result | null, FormData>(login, null);
  const [ss, sa, sp] = useActionState<Result | null, FormData>(signup, null);
  const state = mode === "login" ? ls : ss;
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
      <div className="mb-3 flex justify-center"><LogoFull size={96} /></div>
      <h1 className="text-center text-2xl font-extrabold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
      <p className="text-center text-sm text-slate-500">SV Tours & Travels — manage your bookings.</p>
      <div className="mt-5 grid grid-cols-2 rounded-lg bg-slate-100 p-1 text-sm font-semibold">
        {(["login", "signup"] as const).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-md py-2 ${mode === m ? "bg-white shadow" : "text-slate-500"}`}>{m === "login" ? "Login" : "Sign Up"}</button>
        ))}
      </div>
      {mode === "login" ? (
        <form action={la} className="mt-5 grid gap-4">
          <input type="hidden" name="next" value={next} />
          <Field label="Email"><input type="email" name="email" required className={inputCls} /></Field>
          <Field label="Password"><input type="password" name="password" required className={inputCls} /></Field>
          <button disabled={lp} className="rounded-lg bg-amber-400 py-3 font-bold text-slate-950 disabled:opacity-60">{lp ? "Signing in..." : "Login"}</button>
        </form>
      ) : (
        <form action={sa} className="mt-5 grid gap-4">
          <Field label="Full Name"><input name="full_name" required className={inputCls} /></Field>
          <Field label="Mobile Number"><input name="phone" required className={inputCls} /></Field>
          <Field label="Email"><input type="email" name="email" required className={inputCls} /></Field>
          <Field label="Password (min 6 characters)"><input type="password" name="password" minLength={6} required className={inputCls} /></Field>
          <button disabled={sp} className="rounded-lg bg-amber-400 py-3 font-bold text-slate-950 disabled:opacity-60">{sp ? "Creating..." : "Create Account"}</button>
        </form>
      )}
      {state && <p className={`mt-4 rounded-lg p-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>{state.message}</p>}
    </div>
  );
}
