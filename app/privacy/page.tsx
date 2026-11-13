import LegalDoc from "@/components/LegalDoc";

export const metadata = {
  title: {
    absolute: "Privacy Policy | SV Tours & Travels",
  },

  description:
    "Read the privacy policy of SV Tours & Travels (SV Enterprises) to understand how we collect, use, store and protect your personal information.",

  alternates: {
    canonical: "/privacy",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Privacy Policy | SV Tours & Travels",
    description:
      "Learn how SV Tours & Travels handles and protects your personal information.",
    url: "https://www.svtourstravel.com/privacy",
    siteName: "SV Tours & Travels",
    locale: "en_IN",
    type: "website",
  },
};

export default function Privacy() {
  return <LegalDoc slug="privacy" />;
}
