import Link from "next/link";
import { Phone, MessageCircle, ShieldCheck, Sparkles, Clock } from "lucide-react";
import HeroScene from "./HeroScene";
import QuickConnect from "./QuickConnect";
import type { Item, Settings } from "@/lib/content";

export default function HeroBanner({ st, stats, phone, whatsapp }: { st: Settings; stats: Item[]; phone: string; whatsapp: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {st.hero_image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={st.hero_image} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 -z-20"><HeroScene /></div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-slate-950/60 to-transparent" />

      <div className="mx-auto grid min-h-[560px] max-w-6xl items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-black/25 px-3.5 py-1.5 text-xs font-semibold tracking-[0.2em] text-amber-300 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> {st.hero_badge}
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.08] drop-shadow-lg md:text-6xl lg:text-[4.25rem]">
            {st.hero_title_a}<br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">{st.hero_title_b}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-200">{st.hero_sub}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/booking" className="rounded-full bg-amber-400 px-8 py-3.5 font-bold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-amber-300">Book Your Ride</Link>
            <a href={`tel:${phone}`} className="flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-semibold backdrop-blur transition hover:bg-white/20"><Phone size={18} /> {phone}</a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener" className="hidden items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 font-semibold transition hover:bg-emerald-400 sm:flex"><MessageCircle size={18} /> WhatsApp</a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-amber-300" /> Verified drivers</span>
            <span className="flex items-center gap-1.5"><Sparkles size={16} className="text-amber-300" /> Clean, sanitised cars</span>
            <span className="flex items-center gap-1.5"><Clock size={16} className="text-amber-300" /> On-time pickup</span>
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-white/20 pt-6">
            {stats.map((x) => (
              <div key={x.title}><p className="text-2xl font-extrabold text-amber-300">{x.title}</p><p className="text-xs text-slate-300">{x.subtitle}</p></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 lg:justify-self-end lg:w-full lg:max-w-md">
          <QuickConnect whatsapp={whatsapp} phone={phone} />
        </div>
      </div>
    </section>
  );
}
