import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyActions from "@/components/StickyActions";
import Script from "next/script";

const playfair = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const viewport: Viewport = { themeColor: "#0d2255", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL("https://www.svtourstravel.com"),
  title: { default: "SV Tours & Travels | Cab, Outstation & Tour Packages in Pune", template: "%s | SV Tours & Travels" },
  description: "Book reliable cabs in Pune: local 8hr/80km packages, outstation taxi, Pune & Mumbai airport transfers, Innova Crysta, Tempo Traveller and tour packages to Goa, Mahabaleshwar and Lonavala.",
  applicationName: "SV Tours & Travels",
  authors: [{ name: "SV Enterprises" }],
  creator: "SV Enterprises",
  publisher: "SV Enterprises",
  category: "travel",
  keywords: ["cab service in Pune", "taxi service Pune", "outstation cab Pune", "Pune to Mumbai cab", "Pune airport taxi", "Mumbai airport taxi from Pune", "Innova Crysta on rent Pune", "tempo traveller on rent Pune", "Pune to Goa cab", "Mahabaleshwar tour from Pune", "Lonavala cab", "car rental Ambegaon Pune", "SV Tours & Travels"],
  formatDetection: { telephone: true, address: true, email: true },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    title: "SV Tours & Travels – Cab, Outstation & Tour Packages in Pune",
    description: "Comfortable rides, reliable service. Local, outstation, airport transfers and tour packages from Pune across Maharashtra and India.",
    url: "https://svtourstravel.com", siteName: "SV Tours & Travels", locale: "en_IN", type: "website",
    images: [{ url: "/og-logo.png", width: 1024, height: 1024, alt: "SV Tours & Travels - Your Journey, Our Responsibility" }],
  },
  twitter: { card: "summary_large_image", title: "SV Tours & Travels | Cab Service in Pune", description: "Local, outstation, airport and tour packages from Pune.", images: ["/og-logo.png"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "TaxiService"],
      "@id": "https://www.svtourstravel.com/#business",
      name: "SV Tours & Travels",
      legalName: "SV Enterprises",
      url: "https://www.svtourstravel.com",
      logo: "https://www.svtourstravel.com/og-logo.png",
      image: "https://www.svtourstravel.com/og-logo.png",
      telephone: ["+919860740890", "+919881372700"],
      email: "svtourstravel2363@gmail.com",
      slogan: "Your Journey, Our Responsibility",
      description:
        "Cab service in Pune: local packages, outstation taxi, airport transfers and tour packages.",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Lane no. 8, Telco Colony, Dattanagar, Ambegaon, Jambhulwadi Road",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411046",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Pune" },
        { "@type": "City", name: "Mumbai" },
        { "@type": "State", name: "Maharashtra" },
        { "@type": "Country", name: "India" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      sameAs: ["https://www.instagram.com/sv_tours_and_travels"],
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Bank Transfer",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.svtourstravel.com/#website",
      url: "https://www.svtourstravel.com",
      name: "SV Tours & Travels",
      inLanguage: "en-IN",
      publisher: {
        "@id": "https://www.svtourstravel.com/#business",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geistSans.variable} ${playfair.variable} antialiased`}>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-P9JC7PDM"
    height="0"
    width="0"
    style={{ display: "none", visibility: "hidden" }}
  />
</noscript>

<Script id="google-tag-manager" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-P9JC7PDM');
  `}
</Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyActions />
      </body>
    </html>
  );
}
