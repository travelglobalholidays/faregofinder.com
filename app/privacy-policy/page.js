import Footer from "@/components/Footer";
import InnerBanner from "@/components/GenericComponents/InnerBanner";
import Navbar from "@/components/Headers/Navbar";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export const metadata = {
  title: "Privacy And Data Use | FaresGoFinder",
  description:
    "Read how FaresGoFinder collects, uses, shares, and protects information for fare review, booking support, customer service, analytics, and security.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Navbar />
      <InnerBanner
        title="How FaresGoFinder Uses Data"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 text-neutral-700 sm:px-6 lg:px-8 lg:py-14">
        <PrivacyPolicy />
      </main>
      <Footer />
    </div>
  );
}
