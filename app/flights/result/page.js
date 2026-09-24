"use client";

import Footer from "@/components/Footer";
import ResultBanner from "@/components/Flights/ResultBanner";
import Navbar from "@/components/Headers/Navbar";
import FlightList from "@/components/ResultComponent/FlightList";
import NoFlightsFound from "@/components/ResultComponent/NoResult";
import { CONTACT_INFO } from "@/config/ContactInfo";
import { useFlight } from "@/context/FlightContext";
import axiosInstance from "@/lib/axiosInstance";
import {
  normalizeFlightOffers,
  parseFlightSearchParams,
} from "@/lib/flightSearchUrl";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

export default function ResultPage() {
  const {
    results,
    loading,
    setResults,
    setSearchData,
    setLoading,
    setError,
  } = useFlight();
  const router = useRouter();
  const restoredSearchRef = useRef(false);
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [restoringResults, setRestoringResults] = useState(false);

  useEffect(() => {
    if (!results || results.length === 0) return;

    const timer = setTimeout(() => setShowExpiryModal(true), 60 * 1000);
    return () => clearTimeout(timer);
  }, [results]);

  useEffect(() => {
    if (restoredSearchRef.current || (results && results.length > 0)) return;

    const restored = parseFlightSearchParams(window.location.search);
    if (!restored) return;

    restoredSearchRef.current = true;

    const fetchRestoredResults = async () => {
      try {
        setRestoringResults(true);
        setLoading(true);
        setError("");
        setSearchData(restored);

        const response = await axiosInstance.post("/flights/search", restored);
        setResults(normalizeFlightOffers(response));
      } catch (err) {
        console.error("Restored search error:", err);
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Search failed. Please try again.",
        );
      } finally {
        setLoading(false);
        setRestoringResults(false);
      }
    };

    fetchRestoredResults();
  }, [results, setError, setLoading, setResults, setSearchData]);

  const banner = (
    <Suspense fallback={null}>
      <ResultBanner />
    </Suspense>
  );

  if ((loading || restoringResults) && (!results || results.length === 0)) {
    return (
      <>
        <Navbar />
        {banner}
        <div className="flex min-h-[45vh] items-center justify-center bg-blue-50 px-4 text-center">
          <div className="rounded-2xl bg-white p-6 shadow-theme">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-theme"></div>
            <h2 className="text-xl font-bold text-dark">Loading Flights</h2>
            <p className="mt-2 text-sm text-gray-500">
              Finding matching flight options for your search.
            </p>
            <a
              href={CONTACT_INFO.phoneHref}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-theme px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-dark"
            >
              Call {CONTACT_INFO.phoneDisplayDashed}
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!results || results.length === 0) {
    return (
      <>
        <Navbar />
        {banner}
        <NoFlightsFound agencyName={CONTACT_INFO.brandName} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {banner}
      <FlightList />
      <Footer />

      {showExpiryModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 text-center shadow-2xl">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Flight Prices May Have Changed
            </h2>
            <p className="text-sm text-gray-600">
              Airline fares are dynamic. Refresh your search to review the
              latest available flight options and pricing.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setShowExpiryModal(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-600 transition hover:bg-gray-50"
              >
                Continue Browsing
              </button>
              <button
                onClick={() => router.refresh()}
                className="rounded-md bg-theme px-5 py-2 text-white transition hover:bg-dark"
              >
                Refresh Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
