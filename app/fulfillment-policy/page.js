import Footer from "@/components/Footer";
import FulfillmentPolicy from "@/components/FulfillmentPolicy";
import InnerBanner from "@/components/GenericComponents/InnerBanner";
import Navbar from "@/components/Headers/Navbar";

export const metadata = {
  title: "Confirmation And Ticket Delivery | FaresGoFinder",
  description:
    "See how FaresGoFinder handles booking request fulfillment, confirmation delivery, e-ticket communication, delays, and customer review responsibilities.",
};

export default function FulfillmentPolicyPage() {
  return (
    <div>
      <Navbar />
      <InnerBanner
        title="Booking Confirmation And Delivery"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Fulfillment Policy" },
        ]}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 text-neutral-700 sm:px-6 lg:px-8 lg:py-14">
        <FulfillmentPolicy />
      </main>
      <Footer />
    </div>
  );
}
