import CancellationRefundPolicy from "@/components/CancellationRefundPolicy";
import Footer from "@/components/Footer";
import InnerBanner from "@/components/GenericComponents/InnerBanner";
import Navbar from "@/components/Headers/Navbar";

export const metadata = {
  title: "Cancellation, Credits And Refunds | FaresGoFinder",
  description:
    "Understand how FaresGoFinder helps with cancellation, change, refund, and travel credit requests subject to airline and supplier fare rules.",
};

export default function CancellationRefundPolicyPage() {
  return (
    <div>
      <Navbar />
      <InnerBanner
        title="Cancellations, Credits And Refunds"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cancellation & Refund Policy" },
        ]}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 text-neutral-700 sm:px-6 lg:px-8 lg:py-14">
        <CancellationRefundPolicy />
      </main>
      <Footer />
    </div>
  );
}
