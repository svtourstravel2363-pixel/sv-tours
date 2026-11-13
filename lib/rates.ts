import { createClient } from "@/utils/supabase/server";
import { LOCAL, OUTSTATION } from "@/lib/data";

export type Rate = {
  id?: string;
  kind: "local" | "outstation";
  category: string;
  cars: string;
  price: number | null;
  extra_km: number | null;
  extra_hour: number | null;
  contact_only: boolean;
};

const TEMPO_LOCAL = "Available in different seating capacities.";
const TEMPO_OUT = "Pricing depends on seating capacity.";

export const DEFAULT_RATES: Rate[] = [
  ...LOCAL.map((r): Rate => ({ kind: "local", category: r.type, cars: r.cars, price: r.price, extra_km: r.km, extra_hour: r.hr, contact_only: false })),
  { kind: "local", category: "Tempo Traveller / Urbania", cars: TEMPO_LOCAL, price: null, extra_km: null, extra_hour: null, contact_only: true },
  ...OUTSTATION.map((r): Rate => ({ kind: "outstation", category: r.type, cars: r.cars, price: r.rate, extra_km: null, extra_hour: null, contact_only: false })),
  { kind: "outstation", category: "Tempo Traveller / Urbania", cars: TEMPO_OUT, price: null, extra_km: null, extra_hour: null, contact_only: true },
];

/** Rates from the database; falls back to the built-in defaults if the table is missing or empty. */
export async function getRates(): Promise<{ rates: Rate[]; fromDb: boolean }> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("rates").select("*").order("sort");
  if (error || !data || data.length === 0) return { rates: DEFAULT_RATES, fromDb: false };
  return {
    fromDb: true,
    rates: data.map((r) => ({
      id: r.id, kind: r.kind, category: r.category, cars: r.cars ?? "",
      price: r.price === null ? null : Number(r.price),
      extra_km: r.extra_km === null ? null : Number(r.extra_km),
      extra_hour: r.extra_hour === null ? null : Number(r.extra_hour),
      contact_only: r.contact_only,
    })),
  };
}
