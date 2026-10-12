"use client";

import FlightSearchForm from "@/components/FlightSearchForm";
import { useFlight } from "@/context/FlightContext";
import { flightSearchKey } from "@/lib/flightSearch";
import { parseFlightSearchParams } from "@/lib/flightSearchUrl";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";

const displayDate = (value) => {
  const date = value ? parseISO(value) : null;
  return date && isValid(date) ? format(date, "d MMM yyyy") : "Select dates";
};

const toFormValues = (searchData) => {
  if (!searchData) return {};

  return {
    from: searchData.fromLocation || searchData.fromDisplay || searchData.origin || "",
    to:
      searchData.toLocation ||
      searchData.toDisplay ||
      searchData.destination ||
      "",
    tripType: searchData.tripType === "oneway" ? "One Way" : "Roundtrip",
    travelClass: searchData.travelClass || searchData.cabinClass || "Economy",
    passengers: searchData.passengers || { adults: 1, children: 0, infants: 0 },
    startDate: searchData.departureDate,
    endDate: searchData.returnDate,
  };
};

const ResultBanner = () => {
  const { searchData } = useFlight();
  const params = useSearchParams();
  const query = params.toString();
  const currentSearch = parseFlightSearchParams(query) || (!query ? searchData : null);
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  const button = useRef(null);
  const previousQuery = useRef(query);
  const formKey = currentSearch
    ? flightSearchKey(currentSearch)
    : "empty-search";
  const passengers = currentSearch?.passengers;
  const travelerCount = passengers ? passengers.adults + passengers.children + passengers.infants : 1;
  const cabin = (currentSearch?.travelClass || currentSearch?.cabinClass || "Economy").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  const closeSearch = () => { setOpen(false); button.current?.focus({ preventScroll: true }); };

  useEffect(() => {
    if (previousQuery.current !== query) {
      setOpen(false);
      previousQuery.current = query;
    }
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    const onKey = (event) => { if (event.key === "Escape") closeSearch(); };
    document.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(frame); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <section aria-label="Current flight search" className="sticky top-[88px] z-40 border-b border-subtle bg-white shadow-sm md:top-[92px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:py-4">
          <div className="min-w-0">
            <h1 className="flex flex-wrap items-center gap-2 text-base font-semibold text-heading sm:text-lg">
              {currentSearch ? <><span>{currentSearch.origin}</span><ArrowRight size={16} className="text-theme" aria-hidden="true" /><span>{currentSearch.destination}</span></> : "Flight Results"}
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-body sm:text-sm">
              {currentSearch ? <>{displayDate(currentSearch.departureDate)}{currentSearch.tripType === "roundtrip" && <> – {displayDate(currentSearch.returnDate)}</>}<span className="mx-2" aria-hidden="true">·</span>{travelerCount} traveller{travelerCount === 1 ? "" : "s"}<span className="hidden sm:inline"> · {cabin}</span></> : "Update your route, dates, and travellers"}
            </p>
          </div>
          <button ref={button} type="button" aria-expanded={open} aria-controls="modify-flight-search" onClick={() => setOpen((value) => !value)} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-theme bg-theme px-3 text-sm font-semibold text-white transition hover:bg-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-5">
            {open ? <X size={16} aria-hidden="true" /> : <SlidersHorizontal size={16} aria-hidden="true" />}
            <span>{open ? "Close Search" : "Modify Search"}</span>
            {!open && <ChevronDown size={15} className="hidden sm:block" aria-hidden="true" />}
          </button>
        </div>
      </section>
      {open && <section ref={panel} id="modify-flight-search" aria-label="Modify your flight search" className="scroll-mt-[184px] border-b border-subtle bg-light-grey px-4 py-5 md:scroll-mt-[176px] md:py-6">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm text-body">Update your travel details to compare new flight options.</p>
          <FlightSearchForm compact initialValues={toFormValues(currentSearch)} key={formKey} onSearchSuccess={closeSearch} />
        </div>
      </section>}
    </>
  );
};

export default ResultBanner;
