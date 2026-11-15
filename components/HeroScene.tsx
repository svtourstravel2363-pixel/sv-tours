/** Built-in banner artwork (used until an admin uploads a banner photo). Colours follow the logo: teal-navy sky, lake, green hills, soft sun. */
export default function HeroScene() {
  return (
    <svg viewBox="0 0 1600 720" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#042433" /><stop offset=".5" stopColor="#0f5876" /><stop offset=".82" stopColor="#8fc7d6" /><stop offset="1" stopColor="#fde9b0" /></linearGradient>
        <radialGradient id="hs-sun" cx=".72" cy=".6" r=".32"><stop offset="0" stopColor="#fecc5b" stopOpacity=".95" /><stop offset="1" stopColor="#fecc5b" stopOpacity="0" /></radialGradient>
        <linearGradient id="hs-road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b3246" /><stop offset="1" stopColor="#041b27" /></linearGradient>
      </defs>
      <rect width="1600" height="720" fill="url(#hs-sky)" />
      <rect width="1600" height="720" fill="url(#hs-sun)" />
      <circle cx="1150" cy="430" r="46" fill="#fecc5b" opacity=".9" />
      <path d="M0 470 L130 360 L230 430 L380 300 L520 420 L640 340 L800 460 L940 330 L1100 440 L1240 350 L1400 450 L1600 380 L1600 720 L0 720Z" fill="#3f7f96" opacity=".8" />
      <path d="M0 520 L160 420 L280 490 L430 380 L600 500 L740 430 L900 520 L1060 420 L1220 510 L1380 440 L1600 520 L1600 720 L0 720Z" fill="#1d5a4a" />
      <g fill="#123d22"><path d="M60 600 L84 540 L108 600Z" /><path d="M100 610 L130 530 L160 610Z" /><path d="M1380 600 L1406 535 L1432 600Z" /><path d="M1430 610 L1462 525 L1494 610Z" /><path d="M1500 600 L1524 545 L1548 600Z" /></g>
      <path d="M0 600 Q400 560 800 590 T1600 570 L1600 720 L0 720Z" fill="#2c4f14" />
      <path d="M700 720 Q760 640 900 610 Q1080 575 1250 590 Q1450 605 1600 560" fill="none" stroke="url(#hs-road)" strokeWidth="120" strokeLinecap="round" />
      <path d="M700 720 Q760 640 900 610 Q1080 575 1250 590 Q1450 605 1600 560" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="26 22" strokeLinecap="round" opacity=".85" />
    </svg>
  );
}
