import LegalDoc from "@/components/LegalDoc";

export const metadata = {
  title: "Privacy Policy",
  description: "How SV Tours & Travels (SV Enterprises) collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return <LegalDoc slug="privacy" />;
}
