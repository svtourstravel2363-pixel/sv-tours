"use client";
import { useState } from "react";
import Image from "next/image";
import CarArt, { kindFor } from "./CarArt";

export default function VehicleVisual({ name, category, image, plate }: { name: string; category: string; image?: string | null; plate?: string | null }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-900">
      {image && !failed ? (
        image.startsWith("/") ? (
          <Image src={image} alt={name} width={640} height={400} sizes="(max-width: 640px) 90vw, 280px" quality={75} onError={() => setFailed(true)} className="h-40 w-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-40 w-full object-cover" />
        )
      ) : (
        <div className="p-3"><CarArt kind={kindFor(name, category)} className="mx-auto w-full max-w-[260px]" /></div>
      )}
      {plate && (
        <span className="absolute bottom-2 left-2 rounded-[5px] border-2 border-slate-900 bg-white px-2 py-0.5 text-[11px] font-extrabold tracking-[0.12em] text-slate-900 shadow">
          <span className="mr-1 border-r border-slate-300 pr-1 text-[8px] text-blue-700">IND</span>{plate}
        </span>
      )}
    </div>
  );
}
