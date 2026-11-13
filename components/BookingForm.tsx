"use client";
import { useActionState, useRef, startTransition } from "react";
import Link from "next/link";
import { createBooking, type Result } from "@/app/actions";
import { Field, inputCls } from "./Field";

export type Defaults = { service?: string; pickup?: string; drop?: string; pickup_date?: string; vehicle?: string };

export default function BookingForm({ defaults = {}, whatsapp, services, vehicles, places }: { defaults?: Defaults; whatsapp: string; services: string[]; vehicles: string[]; places: string[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<Result | null, FormData>(createBooking, null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formRef.current!;
    const fd = new FormData(f);
    const d = Object.fromEntries(fd) as Record<string, string>;
    const text = `*New Booking Enquiry - SV Tours & Travels*\nName: ${d.name}\nMobile: ${d.phone}\nService: ${d.service}\nVehicle: ${d.vehicle}\nPickup: ${d.pickup}\nDrop: ${d.drop || "-"}\nDate: ${d.pickup_date} ${d.pickup_time}\nDrop Date: ${d.drop_date || "-"}\nPassengers: ${d.passengers}\nNotes: ${d.notes || "-"}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    startTransition(() => action(fd));
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid gap-4 rounded-2xl bg-white p-6 shadow-xl md:grid-cols-2">
      <datalist id="places">{places.map((p) => <option key={p} value={p} />)}</datalist>
      <Field label="Your Full Name"><input name="name" required className={inputCls} /></Field>
      <Field label="Mobile Number"><input name="phone" required pattern="[0-9+ ]{10,15}" inputMode="tel" className={inputCls} /></Field>
      <Field label="Select Service"><select name="service" required defaultValue={defaults.service} className={inputCls}>{services.map((s) => <option key={s}>{s}</option>)}</select></Field>
      <Field label="Select Vehicle"><select name="vehicle" required defaultValue={defaults.vehicle} className={inputCls}>{vehicles.map((s) => <option key={s}>{s}</option>)}</select></Field>
      <Field label="Pickup Location"><input name="pickup" list="places" required defaultValue={defaults.pickup} placeholder="e.g. Ambegaon, Pune" className={inputCls} /></Field>
      <Field label="Drop Location"><input name="drop" list="places" defaultValue={defaults.drop} placeholder="e.g. Mumbai Airport" className={inputCls} /></Field>
      <Field label="Pickup Date"><input type="date" name="pickup_date" required defaultValue={defaults.pickup_date} className={inputCls} /></Field>
      <Field label="Pickup Time"><input type="time" name="pickup_time" required className={inputCls} /></Field>
      <Field label="Drop Date (Optional)"><input type="date" name="drop_date" className={inputCls} /></Field>
      <Field label="Number of Passengers"><input type="number" min={1} max={40} name="passengers" required className={inputCls} /></Field>
      <div className="md:col-span-2"><Field label="Additional Requirements"><textarea name="notes" rows={3} className={inputCls} /></Field></div>
      <p className="text-xs text-slate-500 md:col-span-2">By submitting you agree to our <Link href="/terms" className="underline">Terms</Link>, <Link href="/privacy" className="underline">Privacy Policy</Link> and <Link href="/refund" className="underline">Cancellation Policy</Link>.</p>
      <div className="md:col-span-2">
        <button disabled={pending} className="w-full rounded-lg bg-emerald-600 px-6 py-3.5 font-bold text-white hover:bg-emerald-500 disabled:opacity-60 sm:w-auto">{pending ? "Sending..." : "Book & Confirm on WhatsApp"}</button>
        <p className="mt-2 text-xs text-slate-500">No login or registration required. Your enquiry is saved and WhatsApp opens so you can send it to us for confirmation.</p>
      </div>
      {state && <p className={`md:col-span-2 rounded-lg p-3 text-sm ${state.ok ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>{state.message}</p>}
    </form>
  );
}
