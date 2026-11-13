import { createClient } from "@/utils/supabase/server";
import { BIZ, POPULAR, TOURS, FAQ, CONDITIONS, VEHICLES, PLACE_SUGGESTIONS } from "@/lib/data";

export type Kind = "location" | "tour" | "service" | "faq" | "condition" | "trust" | "step" | "stat" | "vehicle_type";
export type Item = { id?: string; kind: Kind; sort: number; active: boolean; title: string; subtitle: string; extra: string; extra2: string; extra3: string };

const it = (kind: Kind, sort: number, title: string, subtitle = "", extra = "", extra2 = "", extra3 = ""): Item => ({ kind, sort, active: true, title, subtitle, extra, extra2, extra3 });

export const DEFAULT_ITEMS: Record<Kind, Item[]> = {
  location: POPULAR.map((p, i) => it("location", i + 1, p.name, p.sub, p.icon)),
  tour: TOURS.map((t, i) => it("tour", i + 1, t.name, t.desc, t.colour, "Contact for Packages & Details")),
  service: [
    it("service", 1, "Local Travel", "Comfortable local travel packages for your daily journeys.", "car", "View Packages", "/services#local"),
    it("service", 2, "Outstation Trips", "Enjoy safe and comfortable long-distance journeys.", "map", "View Rates", "/services#outstation"),
    it("service", 3, "Airport Pickup & Drop", "Convenient airport transfers for individuals and families.", "plane", "Enquire Now", "/booking"),
    it("service", 4, "Tour Packages", "Explore beautiful destinations with comfortable travel.", "mountain", "Explore Tours", "/services#tours"),
  ],
  faq: FAQ.map(([q, a], i) => it("faq", i + 1, q, a)),
  condition: CONDITIONS.map((c, i) => it("condition", i + 1, c)),
  trust: [
    it("trust", 1, "Verified Drivers", "Experienced, polite and licensed", "user"),
    it("trust", 2, "On-Time Pickup", "We value your schedule", "clock"),
    it("trust", 3, "Transparent Pricing", "Published rates, no hidden fees", "rupee"),
    it("trust", 4, "Safe & Clean Cars", "Sanitised, well-maintained fleet", "shield"),
  ],
  step: [
    it("step", 1, "Share your trip", "Fill the booking form or message us on WhatsApp with pickup, drop and date."),
    it("step", 2, "We confirm", "Our team calls you, confirms the vehicle, fare and driver details."),
    it("step", 3, "Enjoy the ride", "Your driver arrives on time. Travel comfortably and pay as agreed."),
  ],
  stat: [it("stat", 1, "24×7", "Booking support"), it("stat", 2, "4+", "Vehicle categories"), it("stat", 3, "All India", "Tour coverage")],
  vehicle_type: VEHICLES.map((v, i) => it("vehicle_type", i + 1, v)),
};

export const COLOURS: Record<string, string> = {
  green: "from-emerald-500 to-teal-700",
  blue: "from-sky-500 to-blue-700",
  lime: "from-lime-500 to-green-700",
  amber: "from-amber-500 to-orange-700",
  purple: "from-violet-500 to-purple-700",
  rose: "from-rose-500 to-pink-700",
};

export async function getItems(kind: Kind): Promise<{ items: Item[]; fromDb: boolean }> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("content_items").select("*").eq("kind", kind).eq("active", true).order("sort").order("created_at");
  if (error || !data || data.length === 0) return { items: DEFAULT_ITEMS[kind], fromDb: false };
  return {
    fromDb: true,
    items: data.map((r) => ({ id: r.id, kind, sort: r.sort, active: r.active, title: r.title, subtitle: r.subtitle ?? "", extra: r.extra ?? "", extra2: r.extra2 ?? "", extra3: r.extra3 ?? "" })),
  };
}

export const SETTING_DEFAULTS = {
  phone1: BIZ.phones[0],
  phone2: BIZ.phones[1],
  whatsapp: BIZ.whatsapp,
  email: BIZ.email,
  address: BIZ.address,
  instagram: BIZ.instagram,
  hero_badge: "AVAILABLE 24×7 · PUNE",
  hero_image: "",
  hero_title_a: "Cab Service in Pune",
  hero_title_b: "Local, Outstation & Airport Taxi",
  hero_sub: "Book reliable cabs in Pune with SV Tours & Travels. Choose from Sedan, SUV, MUV, Innova Crysta and Tempo Traveller for local travel, outstation trips and airport transfers.",
  services_title: "Our Services", services_sub: "Travel solutions for every journey.",
  locations_title: "Popular Locations", locations_sub: "Most-booked pickups and destinations around Pune, Mumbai and across India.",
  tours_title: "Tour Packages", tours_sub: "Plan your next trip with SV Tours & Travels.",
  fleet_title: "Our Fleet", fleet_sub: "Choose a vehicle that suits your journey.",
  steps_title: "How It Works", steps_sub: "Book a ride in three simple steps.",
  faq_title: "Frequently Asked Questions", faq_sub: "Quick answers before you book.",
  contact_title: "Contact Us", contact_sub: "We are ready to make your journey comfortable.",
  reviews_title: "Customer Reviews", reviews_sub: "Share your travel experience with SV Tours & Travels.",
  cta_title: "Ready for a comfortable journey?", cta_sub: "Book in under a minute. No login required.",
  booking_title: "Book Your Ride", booking_sub: "No login needed. Fill in your travel details and confirm instantly on WhatsApp.",
  place_suggestions: PLACE_SUGGESTIONS.join("\n"),
};
export type Settings = typeof SETTING_DEFAULTS;

export async function getSettings(): Promise<Settings> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key,value");
  const out: Settings = { ...SETTING_DEFAULTS };
  for (const r of data ?? []) if (r.key in out && r.value.trim() !== "") (out as Record<string, string>)[r.key] = r.value.trim();
  return out;
}

/** Business info shaped like BIZ, with admin-edited values applied. */
export async function getBiz() {
  const s = await getSettings();
  const handle = "@" + (s.instagram.split("instagram.com/")[1]?.split(/[/?#]/)[0] || BIZ.instagramHandle.slice(1));
  return { ...BIZ, phones: [s.phone1, s.phone2].filter(Boolean), whatsapp: s.whatsapp.replace(/\D/g, ""), email: s.email, address: s.address, instagram: s.instagram, instagramHandle: handle, settings: s };
}

export const placeList = (s: Settings) => s.place_suggestions.split("\n").map((x) => x.trim()).filter(Boolean);
