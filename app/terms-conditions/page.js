import Footer from "@/components/Footer";
import InnerBanner from "@/components/GenericComponents/InnerBanner";
import TermsAndConditions from "@/components/TermsConditions";
import Navbar from "@/components/Headers/Navbar";

export const metadata = {
  title: "Service Terms | FaresGoFinder",
  description:
    "Review the terms for using FaresGoFinder fare search support, booking assistance, payment authorization, changes, cancellations, and supplier-based travel services.",
};

export default function TermsAndConditionsPage() {
  return (
    <div>
      <Navbar />
      <InnerBanner
        title="Terms For Fare Search Support"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 text-neutral-700 sm:px-6 lg:px-8 lg:py-14">
        <TermsAndConditions />
      </main>
      <Footer />
    </div>
  );
}
