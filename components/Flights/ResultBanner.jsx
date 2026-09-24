"use client";

import FlightSearchForm from "@/components/FlightSearchForm";
import { useFlight } from "@/context/FlightContext";

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
  const formKey = searchData
    ? `${searchData.origin}-${searchData.destination}-${searchData.departureDate}-${searchData.returnDate || "oneway"}`
    : "empty-search";

  return (
    <section className="relative isolate overflow-visible bg-blue px-4 py-7 sm:py-8">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(37,99,235,0.98),rgba(15,23,42,0.94),rgba(249,115,22,0.34))]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-white/20" />
      <div className="container">
        <FlightSearchForm
          compact
          initialValues={toFormValues(searchData)}
          isResultsPage
          key={formKey}
        />
      </div>
    </section>
  );
};

export default ResultBanner;
