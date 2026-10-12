import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { FlightProvider } from "@/context/FlightContext";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://faresgofinder.com"),
  title: {
    default: "FaresGoFinder | Compare Fares With Travel Support",
    template: "%s | FaresGoFinder",
  },
  description:
    "FaresGoFinder helps travelers review flight fares, compare itinerary options, and get independent booking support for domestic and international trips.",
  robots: "index, follow",
  alternates: {
    canonical: "https://faresgofinder.com",
  },
  openGraph: {
    type: "website",
    url: "https://faresgofinder.com",
    title: "FaresGoFinder | Compare Fares With Travel Support",
    description:
      "Search smarter with FaresGoFinder. Review flight options, fare rules, trip details, and booking support before you confirm travel.",
    siteName: "FaresGoFinder",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FaresGoFinder Travel Assistance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FaresGoFinder | Fare Search And Booking Help",
    description:
      "Independent fare review and flight booking assistance for travelers who want clearer choices before ticketing.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Theme & Mobile Meta */}
        <meta name="theme-color" content="#0f766e" />
        <meta name="format-detection" content="telephone=no" />

        {/* Favicon */}
        <link rel="icon" href="/images/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "FaresGoFinder",
              url: "https://faresgofinder.com",
              description:
                "FaresGoFinder is an independent travel assistance service helping customers compare fares, review itineraries, and request booking support.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                areaServed: "US",
                availableLanguage: "English",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
            }),
          }}
        />
      </head>

      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>
          <FlightProvider>{children}</FlightProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
