"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Headers/Navbar";
import GenericBanner from "@/components/GenericComponents/GenericBannner";
import Services from "@/components/Services";
import FlightDealsDescription from "@/components/FlightsContent/FlightDeals";
import Footer from "@/components/Footer";
import MobilePromo from "@/components/GenericComponents/MobilePromo";
import MobilePromoModal from "@/components/GenericComponents/MobileModal";

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
    [dynamicTitle, qstrRaw, utmCampaign, utmSamp]
  );

  return (
    <>
      <MobilePromo headingText="Fare Search Assistance" />

      <Navbar />

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
