import LegalDoc from "@/components/LegalDoc";

export const metadata = {
  title: {
    absolute: "Cancellation & Refund Policy | SV Tours & Travels",
  },

  description:
    "Read the cancellation and refund policy of SV Tours & Travels. Understand the rules and conditions for cancelling cab bookings and requesting refunds.",

  alternates: {
    canonical: "/refund",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Cancellation & Refund Policy | SV Tours & Travels",
    description:
      "Learn about cab booking cancellation rules and refund conditions at SV Tours & Travels.",
    url: "https://www.svtourstravel.com/refund",
    siteName: "SV Tours & Travels",
    locale: "en_IN",
    type: "website",
  },
};

export default function Refund() {
  return <LegalDoc slug="refund" />;
}
