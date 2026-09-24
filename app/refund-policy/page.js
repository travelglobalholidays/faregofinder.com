import Footer from "@/components/Footer";
import InnerBanner from "@/components/GenericComponents/InnerBanner";
import Navbar from "@/components/Headers/Navbar";
import RefundPolicy from "@/components/RefundPolicy";

const RefundPolicyPage = () => {
  return (
    <div>
      <Navbar />
      <InnerBanner
        title="Refund And Travel Credit Help"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Refund Policy" }]}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 text-neutral-700 sm:px-6 lg:px-8 lg:py-14">
        <RefundPolicy />
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;
