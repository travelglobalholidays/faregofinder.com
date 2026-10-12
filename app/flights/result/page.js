"use client";

import Footer from "@/components/Flights/FlightsFooter";
import ResultBanner from "@/components/Flights/ResultBanner";
import Navbar from "@/components/Headers/Navbar";
import FlightList from "@/components/ResultComponent/FlightList";
import NoFlightsFound from "@/components/ResultComponent/NoResult";
import { CONTACT_INFO } from "@/config/ContactInfo";
import { useFlight } from "@/context/FlightContext";
import { flightSearchKey, searchFlights } from "@/lib/flightSearch";
import { parseFlightSearchParams } from "@/lib/flightSearchUrl";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

function FlightResults() {
  const {
    results, loading, error, searchData, hydrated, completedSearchKey,
    setCompletedSearchKey, setResults, setFilteredResults, setSearchData, setLoading, setError,
  } = useFlight();
  const params = useSearchParams();
  const query = params.toString();
  const currentSearch = parseFlightSearchParams(query) || (!query ? searchData : null);
  const currentKey = currentSearch ? flightSearchKey(currentSearch) : null;
  const [refreshCount, setRefreshCount] = useState(0);
  const [restoring, setRestoring] = useState(true);
  const [showExpiry, setShowExpiry] = useState(false);
  const expiryDialog = useRef(null);
  const lastRefresh = useRef(0);

  useEffect(() => {
    if (!hydrated) return;
    if (!currentSearch) {
      setRestoring(false);
      setLoading(false);
      setResults([]);
      setError(query ? "This search link is invalid. Enter your travel details to search again." : "");
      return;
    }
    if (completedSearchKey === currentKey && lastRefresh.current === refreshCount) {
      setRestoring(false);
      return;
    }
    const controller = new AbortController();
    const restore = async () => {
      setRestoring(true);
      setLoading(true);
      setError("");
      setResults([]);
      setFilteredResults(null);
      setSearchData(currentSearch);
      try {
        const offers = await searchFlights(currentSearch, { signal: controller.signal });
        if (controller.signal.aborted) return;
        lastRefresh.current = refreshCount;
        setResults(offers);
        setCompletedSearchKey(currentKey);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err.response?.data?.message || err.response?.data?.error || err.message || "Search failed. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setRestoring(false);
        }
      }
    };
    restore();
    return () => controller.abort();
    // The URL/key controls requests; result state must not start another search.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, query, currentKey, refreshCount]);

  useEffect(() => {
    setShowExpiry(false);
    if (!results.length || loading) return;
    const timer = setTimeout(() => setShowExpiry(true), 60 * 1000);
    return () => clearTimeout(timer);
  }, [results, loading]);

  useEffect(() => {
    if (showExpiry) expiryDialog.current?.showModal();
    else expiryDialog.current?.close();
  }, [showExpiry]);

  const pending = !hydrated || restoring || loading || (currentKey && completedSearchKey !== currentKey && !error);
  const refresh = () => { setShowExpiry(false); setRefreshCount((count) => count + 1); };

  return (
    <>
      <Navbar compact />
      <ResultBanner />
      {pending ? (
        <main className="flex min-h-[40vh] items-center justify-center bg-light-grey px-4 py-10" aria-busy="true">
          <div role="status" className="text-center">
            <div aria-hidden="true" className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
            <h2 className="text-xl font-semibold text-dark">Loading Flights</h2>
            <p className="mt-2 text-sm text-body">Finding flight options for your search.</p>
          </div>
        </main>
      ) : error ? (
        <main className="bg-light-grey px-4 py-12 text-center">
          <p role="alert" className="text-sm text-red-700">{error}</p>
          {currentSearch && <button type="button" onClick={refresh} className="mt-4 min-h-11 rounded-md bg-theme px-5 text-sm font-semibold text-white">Retry Search</button>}
        </main>
      ) : results.length ? (
        <FlightList key={completedSearchKey} />
      ) : (
        <NoFlightsFound agencyName={CONTACT_INFO.brandName} />
      )}
      <Footer light />
      <dialog ref={expiryDialog} onClose={() => setShowExpiry(false)} aria-labelledby="fare-expiry-title" className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-md rounded-lg border border-subtle bg-white p-6 text-center text-dark backdrop:bg-black/50">
        <h2 id="fare-expiry-title" className="text-lg font-semibold">Flight Prices May Have Changed</h2>
        <p className="mt-3 text-sm leading-relaxed text-body">Refresh your search to review current availability and fares.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => setShowExpiry(false)} className="min-h-11 rounded-md border border-subtle px-4 text-sm">Continue Browsing</button>
          <button type="button" onClick={refresh} className="min-h-11 rounded-md bg-theme px-4 text-sm font-semibold text-white">Refresh Results</button>
        </div>
      </dialog>
    </>
  );
}

export default function ResultPage() {
  return <Suspense fallback={<div className="p-6" role="status">Loading flight search...</div>}><FlightResults /></Suspense>;
}
