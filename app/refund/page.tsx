import LegalDoc from "@/components/LegalDoc";

export const metadata = {
  title: "Cancellation & Refund Policy",
  description: "Cancellation and refund rules for SV Tours & Travels bookings.",
  alternates: { canonical: "/refund" },
};

export default function Refund() {
  return <LegalDoc slug="refund" />;
}
