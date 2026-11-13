"use client";
import Link from "next/link";
import { useEffect } from "react";
import { BIZ } from "@/lib/data";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="grid min-h-[70vh] place-items-center bg-gradient-to-br from-amber-50 via-white to-indigo-50 px-4 py-16">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-extrabold md:text-3xl">Something went wrong</h1>
        <p className="mt-3 text-slate-600">We hit a temporary problem loading this page. Please try again. If it continues, call us and we will book you directly.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white">Try again</button>
          <Link href="/" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold">Go Home</Link>
        </div>
        <a href={`tel:${BIZ.phones[0]}`} className="mt-5 inline-block text-sm font-semibold text-indigo-700">Call {BIZ.phones[0]}</a>
      </div>
    </section>
  );
}
