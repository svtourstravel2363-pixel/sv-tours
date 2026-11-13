export default function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <section className="bg-gradient-to-br from-amber-50 via-white to-indigo-50">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">{sub}</p>
      </div>
    </section>
  );
}
