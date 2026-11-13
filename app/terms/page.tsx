import LegalDoc from "@/components/LegalDoc";

export const metadata = {
  title: {
    absolute: "Terms & Conditions | SV Tours & Travels",
  },

  description:
    "Read the terms and conditions for booking cabs, airport transfers and tours with SV Tours & Travels (SV Enterprises), Pune. Understand the booking rules and service conditions.",

  alternates: {
    canonical: "/terms",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Terms & Conditions | SV Tours & Travels",
    description:
      "Review the booking terms and service conditions of SV Tours & Travels in Pune.",
    url: "https://www.svtourstravel.com/terms",
    siteName: "SV Tours & Travels",
    locale: "en_IN",
    type: "website",
  },
};

export default function Terms() {
  return <LegalDoc slug="terms" />;
}
