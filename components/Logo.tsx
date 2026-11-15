import { Playfair_Display } from "next/font/google";

const display = Playfair_Display({ subsets: ["latin"], weight: ["700", "800"], display: "swap" });

/** Emblem only (the "SV" road/mountain mark, without the wordmark). */
export function LogoMark({ size = 56 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-mark.webp" alt="SV Tours & Travels logo" width={size} height={size} className="shrink-0 mix-blend-multiply" style={{ width: size, height: size }} />
  );
}

/** Header/compact logo: emblem + readable wordmark. */
export default function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="sm:hidden"><LogoMark size={46} /></span>
      <span className="hidden sm:block"><LogoMark size={58} /></span>
      <span className="min-w-0 leading-none">
        <span className={`${display.className} block whitespace-nowrap text-[15px] font-extrabold tracking-wide min-[400px]:text-[18px] sm:text-[22px] ${light ? "text-white" : "text-navy-800"}`}>
          <span className={light ? "text-brand-300" : "text-brand-700"}>SV</span> Tours & Travels
        </span>
        <span className="mt-1.5 hidden items-center gap-2 min-[420px]:flex">
          <span className="h-px w-5 bg-brand-600" />
          <span className={`whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] ${light ? "text-brand-200" : "text-brand-700"}`}>Journey Beyond Destination</span>
        </span>
      </span>
    </span>
  );
}

/** Large full logo (emblem + wordmark + tagline) for footer, login, 404 etc. */
export function LogoFull({ size = 140, className = "" }: { size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.webp" alt="SV Tours & Travels – Journey Beyond Destination" width={size} height={size} className={`mix-blend-multiply ${className}`} style={{ width: size, height: size }} />
  );
}
