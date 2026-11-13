import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import InstagramIcon from "@/components/InstagramIcon";
import { getBiz } from "@/lib/content";

export const metadata = {
  title: {
    absolute: "Contact SV Tours & Travels | Cab Service in Pune",
  },

  description:
    "Contact SV Tours & Travels in Pune to book local cabs, outstation taxis and airport transfers. Call, WhatsApp or visit our office in Dattanagar, Ambegaon, Pune.",

  alternates: {
    canonical: "/contact",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  openGraph: {
    title: "Contact SV Tours & Travels | Pune",
    description:
      "Get in touch with SV Tours & Travels for cab bookings, outstation trips and airport transfers in Pune.",
    url: "https://www.svtourstravel.com/contact",
    siteName: "SV Tours & Travels",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact SV Tours & Travels | Pune",
    description:
      "Call or WhatsApp SV Tours & Travels for cab bookings in Pune.",
  },
};

export default async function Contact() {
  const BIZ = await getBiz();
  const row = "flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200";
  return (
    <>
      <JsonLd data={breadcrumbs([["Contact", "/contact"]])} />
      <PageHero eyebrow="Contact Us" title={BIZ.settings.contact_sub} sub="Call, WhatsApp or visit us. We respond quickly." />
      <section className="mx-auto grid max-w-3xl gap-4 px-4 py-14">
        {BIZ.phones.map((p) => <a key={p} href={`tel:${p}`} className={row}><Phone className="text-indigo-700" /><span className="font-semibold">{p}</span><span className="ml-auto text-sm text-slate-500">Call Now</span></a>)}
        <a href={`https://wa.me/${BIZ.whatsapp}`} target="_blank" rel="noopener" className={row}><MessageCircle className="text-emerald-600" /><span className="font-semibold">WhatsApp Us</span></a>
        <a href={BIZ.instagram} target="_blank" rel="noopener noreferrer" className={row}><InstagramIcon className="text-pink-600" /><span className="font-semibold">Follow us on Instagram</span><span className="ml-auto text-sm text-slate-500">{BIZ.instagramHandle}</span></a>
        <a href={`mailto:${BIZ.email}`} className={row}><Mail className="text-amber-700" /><span className="font-semibold">{BIZ.email}</span></a>
        <div className={row}><MapPin className="text-rose-600" /><span>{BIZ.address}</span></div>
        <iframe title="Map" className="h-72 w-full rounded-2xl border-0" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent("Telco Colony, Dattanagar, Ambegaon, Pune 411046")}&output=embed`} />
      </section>
    </>
  );
}
