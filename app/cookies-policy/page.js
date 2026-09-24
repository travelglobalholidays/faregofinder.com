import CookiesPolicy from "@/components/CookiesPolicy";
import Footer from "@/components/Footer";
import InnerBanner from "@/components/GenericComponents/InnerBanner";
import Navbar from "@/components/Headers/Navbar";

export const metadata = {
  title: "Cookie And Tracking Notice | FaresGoFinder",
  description:
    "Learn how FaresGoFinder uses cookies, analytics, performance tools, and advertising measurement technologies on faresgofinder.com.",
};

export default function CookiesPolicyPage() {
  return (
    <div>
      <Navbar />
      <InnerBanner
        title="Cookies Used By FaresGoFinder"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cookies Policy" }]}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 text-neutral-700 sm:px-6 lg:px-8 lg:py-14">
        <CookiesPolicy />
      </main>
      <Footer />
    </div>
  );
}
