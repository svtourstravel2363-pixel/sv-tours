import LegalDoc from "@/components/LegalDoc";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for booking cabs and tours with SV Tours & Travels (SV Enterprises), Pune.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return <LegalDoc slug="terms" />;
}
