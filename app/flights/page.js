"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";

import FlightDealsDescription from "@/components/FlightsContent/FlightDeals";
import Footer from "@/components/Footer";
import GenericBanner from "@/components/GenericComponents/GenericBannner";
import MobilePromoModal from "@/components/GenericComponents/MobileModal";
import MobilePromo from "@/components/GenericComponents/MobilePromo";
import Navbar from "@/components/Headers/Navbar";
import Services from "@/components/Services";

const formatText = (text) =>
  text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function FlightDealsContent() {
  const searchParams = useSearchParams();

  // read params ONLY if present
  const qstrRaw = searchParams.get("qstr");
  const utmCampaign = searchParams.get("utm_campaign");
  const utmSamp = searchParams.get("utm_samp");

  // ✅ Dynamic heading (works in both cases)
  const dynamicTitle = useMemo(() => {
    return qstrRaw ? formatText(qstrRaw) : "Flight Fare Finder";
  }, [qstrRaw]);

  // ✅ Modal condition: ONLY when UTM exists
  const shouldShowModal = Boolean(utmCampaign || utmSamp);

  const initialValues = useMemo(
    () => ({
      keyword: qstrRaw ? dynamicTitle : undefined,
      campaign: qstrRaw || undefined,
      utm_campaign: utmCampaign || undefined,
      utm_samp: utmSamp || undefined,
    }),
    [dynamicTitle, qstrRaw, utmCampaign, utmSamp],
  );

  return (
    <>
      <MobilePromo headingText="Cheap Flight Deals" />

      {/* MobilePromo provides the mobile CTA and compact topbar. */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      <GenericBanner
        title={dynamicTitle}
        subheading="Compare routes, schedules, fare conditions, and itinerary choices with independent FaresGoFinder support."
        initialValues={initialValues}
      />

      <Services />
      <FlightDealsDescription />
      <Footer />

      {shouldShowModal && <MobilePromoModal />}
    </>
  );
}

export default function FlightDealsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading flights...</div>}>
      <FlightDealsContent />
    </Suspense>
  );
}
