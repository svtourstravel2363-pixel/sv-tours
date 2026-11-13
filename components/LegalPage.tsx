import { getBiz } from "@/lib/content";

export type Section = { h: string; p: string[] };

export default async function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: Section[] }) {
  const BIZ = await getBiz();
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className="mt-1 text-sm text-slate-500">Last updated: {updated}</p>
      <p className="mt-6 text-slate-700">{intro}</p>
      {sections.map((s, i) => (
        <section key={s.h} className="mt-8">
          <h2 className="text-lg font-bold">{i + 1}. {s.h}</h2>
          {s.p.map((t, j) => <p key={j} className="mt-2 text-slate-700">{t}</p>)}
        </section>
      ))}
      <section className="mt-10 rounded-2xl bg-slate-100 p-5 text-sm text-slate-700">
        <b>{BIZ.legal}</b> (trading as SV Tours & Travels, {BIZ.site})<br />{BIZ.address}<br />
        Phone: {BIZ.phones.join(" / ")} · Email: {BIZ.email}
      </section>
    </div>
  );
}
