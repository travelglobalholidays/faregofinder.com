import Head from "next/head";
import {
  ShieldCheckIcon,
  AlertTriangle,
  XCircle,
  InfoIcon,
  FileWarning,
  Globe2,
} from "lucide-react";

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Disclaimer - FaresGoFinder</title>
        <meta
          name="description"
          content="Read FaresGoFinder's disclaimer explaining our role as an independent travel assistance service and important information about third-party suppliers."
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-secondary text-white py-20 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
            Disclaimer
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Transparency and responsibility for independent travel assistance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg space-y-12 text-gray-700">
          {/* Introduction */}
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-4 font-heading">
              Disclaimer for Liability
            </h2>
            <p>
              FaresGoFinder provides independent travel assistance and general
              flight booking support. Flight schedules, fares, availability,
              airline policies, taxes, and fees are controlled by airlines and
              travel service providers and may change without notice. Travelers
              should review all itinerary details, fare rules, baggage policies,
              and cancellation terms before confirming a booking.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
