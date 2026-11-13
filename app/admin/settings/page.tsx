import { getSettings, type Settings } from "@/lib/content";
import { saveSettings } from "@/app/actions";
import { inputCls } from "@/components/Field";

type F = { key: keyof Settings; label: string; area?: boolean; wide?: boolean };
const GROUPS: { title: string; hint?: string; fields: F[] }[] = [
  { title: "Business details", fields: [
    { key: "phone1", label: "Phone 1" }, { key: "phone2", label: "Phone 2" },
    { key: "whatsapp", label: "WhatsApp number (with country code, e.g. 919860740890)" }, { key: "email", label: "Email" },
    { key: "address", label: "Address", area: true, wide: true }, { key: "instagram", label: "Instagram link", wide: true },
  ] },
  { title: "Home page top", fields: [
    { key: "hero_badge", label: "Small badge text", wide: true },
    { key: "hero_title_a", label: "Headline - first line" }, { key: "hero_title_b", label: "Headline - gold second line" },
    { key: "hero_sub", label: "Intro paragraph", area: true, wide: true },
  ] },
  { title: "Section headings", hint: "The title and sub-title above each section.", fields: [
    { key: "services_title", label: "Services - title" }, { key: "services_sub", label: "Services - sub-title" },
    { key: "locations_title", label: "Locations - title" }, { key: "locations_sub", label: "Locations - sub-title" },
    { key: "tours_title", label: "Tour packages - title" }, { key: "tours_sub", label: "Tour packages - sub-title" },
    { key: "fleet_title", label: "Fleet - title" }, { key: "fleet_sub", label: "Fleet - sub-title" },
    { key: "steps_title", label: "How it works - title" }, { key: "steps_sub", label: "How it works - sub-title" },
    { key: "faq_title", label: "FAQ - title" }, { key: "faq_sub", label: "FAQ - sub-title" },
    { key: "contact_title", label: "Contact - title" }, { key: "contact_sub", label: "Contact - sub-title" },
    { key: "reviews_title", label: "Reviews - title" }, { key: "reviews_sub", label: "Reviews - sub-title" },
    { key: "cta_title", label: "Call-to-action band - title" }, { key: "cta_sub", label: "Call-to-action band - text" },
    { key: "booking_title", label: "Booking page - title" }, { key: "booking_sub", label: "Booking page - text", wide: true },
  ] },
  { title: "Booking form place suggestions", hint: "One place per line. These are suggested while customers type pickup and drop locations.", fields: [
    { key: "place_suggestions", label: "Places (one per line)", area: true, wide: true },
  ] },
];

/* eslint-disable @next/next/no-img-element */
export default async function AdminSettings({ searchParams }: PageProps<"/admin/settings">) {
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? sp.error : null;
  const s = await getSettings();
  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold">Website Settings</h1>
      <p className="mb-6 text-sm text-slate-600">Business details and text across the website. Leave a box empty to use the original wording. Changes appear right after you save.</p>
      {error && <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
      <form action={saveSettings} className="space-y-6">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-bold">Home page banner photo</h2>
          <p className="text-xs text-slate-500">A wide landscape photo works best (for example your cars on a scenic road). It is resized to 1920×900 and converted to WebP. Max 4 MB. Without a photo, the built-in mountain and road scene is shown.</p>
          {s.hero_image && <img src={s.hero_image} alt="Current banner" className="mt-3 h-32 w-full max-w-md rounded-lg object-cover" />}
          <input type="file" name="hero_image_file" accept="image/jpeg,image/png,image/webp" className={inputCls + " mt-3 max-w-md"} />
          {s.hero_image && <label className="mt-2 flex items-center gap-2 text-sm text-rose-700"><input type="checkbox" name="hero_image_remove" /> Remove banner photo</label>}
        </section>
        {GROUPS.map((g) => (
          <section key={g.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-bold">{g.title}</h2>
            {g.hint && <p className="text-xs text-slate-500">{g.hint}</p>}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {g.fields.map((f) => (
                <label key={f.key} className={`block text-sm font-medium text-slate-700 ${f.wide ? "sm:col-span-2" : ""}`}>{f.label}
                  {f.area ? <textarea name={f.key} rows={f.key === "place_suggestions" ? 10 : 3} defaultValue={s[f.key]} className={inputCls + " mt-1"} /> : <input name={f.key} defaultValue={s[f.key]} className={inputCls + " mt-1"} />}
                </label>
              ))}
            </div>
          </section>
        ))}
        <button className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700">Save All Settings</button>
      </form>
    </div>
  );
}
