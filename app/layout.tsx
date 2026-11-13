import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyActions from "@/components/StickyActions";

const playfair = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SV Tours & Travels | Cab, Outstation & Tour Packages in Pune",
  description: "Comfortable rides, reliable service. Local, outstation, airport transfers and tour packages from Pune. Book with SV Tours & Travels.",
  metadataBase: new URL("https://svtourstravel.com"),
  alternates: { canonical: "/" },
  keywords: ["cab service in Pune", "outstation taxi Pune", "Pune to Mumbai cab", "Pune airport taxi", "Innova Crysta on rent Pune", "tempo traveller Pune", "SV Tours & Travels"],
  openGraph: { title: "SV Tours & Travels – Your Journey, Our Responsibility", description: "Cab, outstation, airport transfers and tour packages from Pune.", url: "https://svtourstravel.com", siteName: "SV Tours & Travels", images: [{ url: "/og-logo.png", width: 1024, height: 1024, alt: "SV Tours & Travels" }], locale: "en_IN", type: "website" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "SV Tours & Travels",
  legalName: "SV Enterprises",
  url: "https://svtourstravel.com",
  logo: "https://svtourstravel.com/og-logo.png",
  image: "https://svtourstravel.com/og-logo.png",
  telephone: ["+919860740890", "+919881372700"],
  email: "svtourstravel2363@gmail.com",
  slogan: "Your Journey, Our Responsibility",
  address: { "@type": "PostalAddress", streetAddress: "Lane no. 8, Telco Colony, Dattanagar, Ambegaon, Jambhulwadi Road", addressLocality: "Pune", addressRegion: "Maharashtra", postalCode: "411046", addressCountry: "IN" },
  sameAs: ["https://www.instagram.com/sv_tours_and_travels"],
  areaServed: ["Pune", "Mumbai", "Maharashtra", "India"],
  priceRange: "₹₹",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} antialiased`}>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyActions />
      </body>
    </html>
  );
}
