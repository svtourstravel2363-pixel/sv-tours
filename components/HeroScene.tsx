/** Built-in banner artwork (used until an admin uploads a banner photo). */
export default function HeroScene() {
  return (
    <svg viewBox="0 0 1600 720" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#070c24" /><stop offset=".55" stopColor="#1b2a6b" /><stop offset=".85" stopColor="#c47a3a" /><stop offset="1" stopColor="#f3b562" /></linearGradient>
        <radialGradient id="hs-sun" cx=".72" cy=".62" r=".35"><stop offset="0" stopColor="#ffe3a3" stopOpacity=".95" /><stop offset="1" stopColor="#ffe3a3" stopOpacity="0" /></radialGradient>
        <linearGradient id="hs-road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a2149" /><stop offset="1" stopColor="#0a0f2b" /></linearGradient>
      </defs>
      <rect width="1600" height="720" fill="url(#hs-sky)" />
      <rect width="1600" height="720" fill="url(#hs-sun)" />
      <g fill="#fff" opacity=".7">{[[120, 70], [310, 130], [520, 50], [760, 110], [960, 60], [1180, 120], [1400, 70], [220, 190], [640, 180], [1320, 200]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" />)}</g>
      <path d="M0 470 L130 360 L230 430 L380 300 L520 420 L640 340 L800 460 L940 330 L1100 440 L1240 350 L1400 450 L1600 380 L1600 720 L0 720Z" fill="#2c3b7d" opacity=".75" />
      <path d="M0 520 L160 420 L280 490 L430 380 L600 500 L740 430 L900 520 L1060 420 L1220 510 L1380 440 L1600 520 L1600 720 L0 720Z" fill="#17214f" />
      <g fill="#0b1233"><path d="M60 600 L84 540 L108 600Z" /><path d="M100 610 L130 530 L160 610Z" /><path d="M1380 600 L1406 535 L1432 600Z" /><path d="M1430 610 L1462 525 L1494 610Z" /><path d="M1500 600 L1524 545 L1548 600Z" /></g>
      <path d="M0 600 Q400 560 800 590 T1600 570 L1600 720 L0 720Z" fill="#0b1233" />
      <path d="M700 720 Q760 640 900 610 Q1080 575 1250 590 Q1450 605 1600 560" fill="none" stroke="url(#hs-road)" strokeWidth="120" strokeLinecap="round" />
      <path d="M700 720 Q760 640 900 610 Q1080 575 1250 590 Q1450 605 1600 560" fill="none" stroke="#d9a441" strokeWidth="3" strokeDasharray="26 22" strokeLinecap="round" />
    </svg>
  );
}
