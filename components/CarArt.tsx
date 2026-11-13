export type Kind = "sedan" | "suv" | "premium" | "van" | "hatch" | "mpv" | "innova";

export function kindFor(name: string, category: string): Kind {
  const n = name.toLowerCase();
  if (n.includes("innova")) return "innova";
  if (n.includes("glanza") || n.includes("swift") || n.includes("i20")) return "hatch";
  if (n.includes("rumion") || n.includes("ertiga")) return "mpv";
  if (n.includes("urbania") || n.includes("traveller") || n.includes("traveler")) return "van";
  return category as Kind;
}

const BODY: Record<Kind, { body: string; glass: string; color: [string, string]; w1: number; w2: number }> = {
  sedan:   { body: "M20 92 L28 78 Q34 70 52 66 L82 52 Q96 46 126 46 L158 50 Q180 56 192 72 L216 78 Q232 82 234 96 L234 108 L20 108 Z", glass: "M88 56 L124 51 L152 54 Q168 60 176 72 L84 72 Z", color: ["#e2e8f0", "#94a3b8"], w1: 70, w2: 188 },
  suv:     { body: "M16 92 L22 70 Q26 58 44 54 L70 50 Q84 40 120 38 L170 38 Q196 42 206 62 L228 70 Q240 76 240 92 L240 108 L16 108 Z", glass: "M82 50 L118 44 L170 44 Q190 48 196 64 L80 64 Z", color: ["#cbd5e1", "#64748b"], w1: 66, w2: 192 },
  premium: { body: "M14 94 L20 68 Q24 56 44 52 L74 48 Q88 36 124 34 L176 34 Q204 40 214 62 L234 70 Q246 76 246 94 L246 110 L14 110 Z", glass: "M86 46 L122 40 L176 40 Q196 46 202 62 L84 62 Z", color: ["#f1f5f9", "#475569"], w1: 68, w2: 196 },
  hatch:   { body: "M26 94 L32 78 Q38 66 58 62 L86 48 Q102 40 130 40 L166 42 Q184 46 194 62 L206 72 Q222 76 224 92 L224 108 L26 108 Z", glass: "M92 52 L128 46 L160 48 Q174 54 182 66 L88 66 Z", color: ["#f8fafc", "#94a3b8"], w1: 72, w2: 180 },
  mpv:     { body: "M16 94 L22 68 Q26 56 44 52 L72 48 Q88 38 122 36 L170 36 Q198 40 208 62 L230 70 Q242 76 242 94 L242 110 L16 110 Z", glass: "M84 48 L120 42 L168 42 Q188 46 194 62 L82 62 Z", color: ["#e2e8f0", "#64748b"], w1: 68, w2: 192 },
  innova:  { body: "M14 96 L18 64 Q22 48 42 44 L76 40 Q92 24 132 22 L182 24 Q212 30 222 56 L242 64 Q254 70 254 96 L254 112 L14 112 Z", glass: "M88 36 L128 28 L182 30 Q204 36 210 54 L84 54 Z M24 52 L78 46 L80 54 L24 58 Z", color: ["#ffffff", "#64748b"], w1: 70, w2: 198 },
  van:     { body: "M10 96 L10 52 Q10 36 28 34 L176 34 Q200 36 212 56 L240 70 Q252 76 252 94 L252 112 L10 112 Z", glass: "M22 44 L90 44 L90 66 L22 66 Z M98 44 L160 44 L160 66 L98 66 Z M168 44 L186 44 Q200 48 206 62 L168 62 Z", color: ["#f8fafc", "#64748b"], w1: 62, w2: 200 },
};

export default function CarArt({ kind, className = "" }: { kind: Kind; className?: string }) {
  const c = BODY[kind];
  const id = `car-${kind}`;
  const y = kind === "van" ? 114 : 110;
  return (
    <svg viewBox="0 0 260 140" className={className} role="img" aria-label={`${kind} vehicle illustration`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c.color[0]} /><stop offset="1" stopColor={c.color[1]} /></linearGradient>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#bae6fd" /><stop offset="1" stopColor="#0c4a6e" /></linearGradient>
      </defs>
      <ellipse cx="130" cy="126" rx="112" ry="7" fill="#000" opacity=".25" />
      <path d={c.body} fill={`url(#${id})`} />
      <path d={c.glass} fill={`url(#${id}-g)`} opacity=".9" />
      <rect x="20" y="96" width="220" height="3" fill="#0f172a" opacity=".18" />
      {(kind === "innova" || kind === "premium") && (
        <g><rect x="236" y="78" width="16" height="22" rx="3" fill="#0f172a" /><path d="M238 83 H250 M238 88 H250 M238 93 H250" stroke="#e5e7eb" strokeWidth="1.6" /></g>
      )}
      <rect x="234" y="88" width="14" height="6" rx="2" fill="#fde68a" />
      <rect x="10" y="88" width="10" height="6" rx="2" fill="#ef4444" />
      {[c.w1, c.w2].map((x) => (
        <g key={x}>
          <circle cx={x} cy={y} r="17" fill="#0f172a" />
          <circle cx={x} cy={y} r="9" fill="#cbd5e1" />
          <circle cx={x} cy={y} r="3" fill="#475569" />
        </g>
      ))}
    </svg>
  );
}
