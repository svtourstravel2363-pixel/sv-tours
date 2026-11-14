import { Playfair_Display } from "next/font/google";

const display = Playfair_Display({ subsets: ["latin"], weight: ["700", "800"], display: "swap" });

export function LogoMark({ size = 56 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.svg" alt="SV Tours & Travels logo" width={size} height={size} className="shrink-0" style={{ width: size, height: size }} />
  );
}

/** Header/compact logo: round emblem + readable wordmark. */
export default function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-none">
        <span className={`${display.className} block whitespace-nowrap text-[18px] font-extrabold tracking-wide sm:text-[22px] ${light ? "text-white" : "text-[#0d2255]"}`}>
          SV Tours <span className="text-[#c8942e]">&</span> Travels
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="h-px w-5 bg-[#c8942e]" />
          <span className="hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9a6f1c] min-[420px]:block">Your Journey, Our Responsibility</span>
        </span>
      </span>
    </span>
  );
}

/** Large full logo for footer, login, 404 etc. */
export function LogoFull({ size = 140, className = "" }: { size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.svg" alt="SV Tours & Travels – Your Journey, Our Responsibility" width={size} height={size} className={className} style={{ width: size, height: size }} />
  );
}
