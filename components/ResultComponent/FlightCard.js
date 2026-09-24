"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useFlight } from "@/context/FlightContext";
import axiosInstance from "@/lib/axiosInstance";
import airportData from "@/public/data/airports.json";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MoreHorizontal,
  Plane,
  Tv,
  Utensils,
  Wifi,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import NoFlightsFound from "./NoResult";

export default function FlightCard() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingFlightId, setLoadingFlightId] = useState(null);
  const [bookingError, setBookingError] = useState("");

  const flightsPerPage = 12;
  const router = useRouter();

  const {
    results = [],
    filteredResults = [],
    searchData,
    setSelectedFlight,
  } = useFlight();

  // Determine which results to display
  const displayResults = useMemo(() => {
    const source = filteredResults?.length > 0 ? filteredResults : results;
    return Array.isArray(source) ? source : [];
  }, [filteredResults, results]);

  // Helper function to safely get string value from any input
  const safeString = (value, fallback = "") => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === "string") return value;
    if (typeof value === "number") return value.toString();
    if (typeof value === "object") {
      if (value.name) return value.name;
      if (value.iata_code) return value.iata_code;
      if (value.code) return value.code;
      if (value.id) return value.id;
      return fallback;
    }
    return fallback;
  };

  // Safe airport name lookup
  const findAirportName = useCallback((iata) => {
    if (!iata || typeof iata !== "string") return "Unknown Airport";

    try {
      const airport = airportData.find((a) => {
        if (typeof a === "string") {
          return a.startsWith(iata);
        } else if (a && typeof a === "object") {
          return a.iata_code === iata;
        }
        return false;
      });

      if (!airport) return iata;

      if (typeof airport === "string") {
        const parts = airport.split("-");
        if (parts.length > 1) {
          const namePart = parts[1].split(",")[0].trim();
          return namePart || parts[1].trim();
        }
        return iata;
      }

      if (airport && typeof airport === "object") {
        return airport.name || airport.city_name || airport.city || iata;
      }

      return iata;
    } catch (error) {
      console.error("Error finding airport name:", error);
      return iata;
    }
  }, []);

  // Format duration from PT format
  const formatDuration = useCallback((duffelDuration) => {
    if (!duffelDuration || typeof duffelDuration !== "string") return "N/A";
    const match = duffelDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duffelDuration;
    const hours = match[1] ? `${match[1]}h ` : "";
    const mins = match[2] ? `${match[2]}m` : "";
    return `${hours}${mins}`.trim() || "0m";
  }, []);

  // Format date time
  const formatDateTime = useCallback((dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    try {
      const date = new Date(dateTimeStr);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "N/A";
    }
  }, []);

  // Format date
  const formatDate = useCallback((dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    try {
      const date = new Date(dateTimeStr);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  }, []);

  // Calculate total price
  const calculateTotalPrice = useCallback(
    (flight) => {
      if (!flight) return "0.00";

      const basePrice = parseFloat(
        flight.total_amount || flight.base_amount || 0,
      );
      const totalPassengers = searchData?.passengers
        ? (searchData.passengers.adults || 0) +
          (searchData.passengers.children || 0) +
          (searchData.passengers.infants || 0)
        : 1;

      return (basePrice * totalPassengers).toFixed(2);
    },
    [searchData],
  );

  // Get total stops
  const getTotalStops = useCallback((slices) => {
    if (!Array.isArray(slices)) return 0;
    return slices.reduce((total, slice) => {
      return total + Math.max(0, (slice.segments?.length || 1) - 1);
    }, 0);
  }, []);

  const airportCode = (value, fallback = "N/A") =>
    safeString(value?.iata_code || value?.code || value, fallback);

  const getDepartureTime = (segment, slice) =>
    segment?.departing_at ||
    segment?.departure_time ||
    segment?.departureTime ||
    slice?.departure_time ||
    slice?.departureTime ||
    slice?.departing_at;

  const getArrivalTime = (segment, slice) =>
    segment?.arriving_at ||
    segment?.arrival_time ||
    segment?.arrivalTime ||
    slice?.arrival_time ||
    slice?.arrivalTime ||
    slice?.arriving_at;

  const getFlightNumber = (segment, slice) =>
    segment?.marketing_carrier_flight_number ||
    segment?.flight_number ||
    segment?.flightNumber ||
    slice?.flight_number ||
    slice?.flightNumber ||
    "N/A";

  const getCarrierInfo = (carrier, fallback = {}) => {
    if (carrier && typeof carrier === "object") {
      return {
        name: safeString(carrier.name, fallback.name || "Airline"),
        code: safeString(
          carrier.iata_code || carrier.code,
          fallback.code || "XX",
        ),
        logo: carrier.logo_symbol_url,
      };
    }

    if (typeof carrier === "string" && carrier.trim()) {
      const code = carrier.length <= 3 ? carrier.toUpperCase() : fallback.code;
      return {
        name: carrier,
        code: code || fallback.code || carrier.slice(0, 2).toUpperCase(),
      };
    }

    return {
      name: fallback.name || "Airline",
      code: fallback.code || "XX",
      logo: fallback.logo,
    };
  };

  const getBaggageCount = (source, types, fallback = 0) => {
    const bags = source?.baggages || source?.baggage || source?.baggageIncluded;
    if (!Array.isArray(bags)) return fallback;

    return (
      bags.find((bag) => types.includes(bag.type))?.quantity ||
      bags.find((bag) => types.includes(bag.type))?.pieces ||
      fallback
    );
  };

  // Get airline info safely
  const getAirlineInfo = useCallback((flight, sliceIndex = 0) => {
    const defaultInfo = {
      name: "Airline",
      code: "XX",
      logo: "https://images.kiwi.com/airlines/64/XX.png",
    };

    if (!flight) return defaultInfo;

    if (flight.airline || flight.airline_name) {
      return getCarrierInfo(flight.airline || flight.airline_name, {
        code: flight.airline_code || flight.airline_logo_code || "XX",
      });
    }

    if (typeof flight.owner === "string") {
      return getCarrierInfo(flight.owner, {
        code: flight.airline_logo_code || flight.owner.slice(0, 2).toUpperCase(),
      });
    }

    if (flight.owner && typeof flight.owner === "object") {
      const owner = flight.owner;
      return {
        name: safeString(owner.name, "Airline"),
        code: safeString(owner.iata_code || owner.code, "XX"),
        logo:
          owner.logo_symbol_url ||
          `https://images.kiwi.com/airlines/64/${
            owner.iata_code || owner.code || "XX"
          }.png`,
      };
    }

    const slices = flight.slices || [];
    const slice = slices[sliceIndex];
    const firstSegment = slice?.segments?.[0] || {};

    if (slice?.airline || firstSegment?.airline) {
      return getCarrierInfo(slice?.airline || firstSegment?.airline, {
        code: flight.airline_logo_code || "XX",
      });
    }

    if (firstSegment?.operating_carrier) {
      const info = getCarrierInfo(firstSegment.operating_carrier, {
        code: firstSegment.operating_carrier_code || flight.airline_logo_code,
      });
      return {
        ...info,
        logo: info.logo || `https://images.kiwi.com/airlines/64/${info.code}.png`,
      };
    }

    if (firstSegment?.marketing_carrier) {
      const info = getCarrierInfo(firstSegment.marketing_carrier, {
        code: firstSegment.marketing_carrier_code || flight.airline_logo_code,
      });
      return {
        ...info,
        logo: info.logo || `https://images.kiwi.com/airlines/64/${info.code}.png`,
      };
    }

    return defaultInfo;
  }, []);

  // Get baggage info
  const getBaggageInfo = useCallback((passenger) => {
    return {
      cabin: getBaggageCount(passenger, ["cabin", "carry_on"], 1),
      checked: getBaggageCount(passenger, ["checked"], 0),
    };
  }, []);

  // Handle booking
  const handleBookNow = async (flight) => {
    try {
      const flightKey = flight.id || flight.offerId || "selected-flight";
      setLoadingFlightId(flightKey);
      setBookingError("");
      setSelectedFlight?.(flight);

      const res = await axiosInstance.post("/bookings/draft", {
        offer: flight,
      });

      const bookingId = res?.data?.data?._id;
      if (bookingId) {
        router.push(`/booking/${bookingId}`);
        return;
      }

      throw new Error("Booking draft was not returned by the server.");
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      setBookingError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Unable to start booking. Please try again.",
      );
    } finally {
      setLoadingFlightId(null);
    }
  };

  // Pagination
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = displayResults.slice(
    indexOfFirstFlight,
    indexOfLastFlight,
  );
  const totalPages = Math.max(
    1,
    Math.ceil(displayResults.length / flightsPerPage),
  );

  // Get visible pages for pagination
  const getVisiblePages = useCallback(() => {
    const visiblePages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
    } else {
      visiblePages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) end = 4;
      if (currentPage >= totalPages - 2) start = totalPages - 3;

      if (start > 2) visiblePages.push("ellipsis-start");
      for (let i = start; i <= end; i++) visiblePages.push(i);
      if (end < totalPages - 1) visiblePages.push("ellipsis-end");
      visiblePages.push(totalPages);
    }

    return visiblePages;
  }, [currentPage, totalPages]);

  // Amenity Icon Component
  const AmenityIcon = ({ amenity }) => {
    const icons = {
      WiFi: <Wifi className="w-3 h-3" />,
      Meal: <Utensils className="w-3 h-3" />,
      Entertainment: <Tv className="w-3 h-3" />,
    };

    return (
      <div
        className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-100 rounded-lg shadow-xs"
        title={amenity}
      >
        {icons[amenity] || amenity}
        <span className="text-xs font-medium text-light">{amenity}</span>
      </div>
    );
  };

  // No flights state
  if (!displayResults || displayResults.length === 0) {
    return <NoFlightsFound />;
  }

  // Cheapest price among all results
  const cheapestPrice = Math.min(
    ...displayResults.map((f) =>
      parseFloat(f.total_amount || f.base_amount || 0),
    ),
  );

  // Fastest duration (in minutes)
  const fastestDuration = Math.min(
    ...displayResults.map((f) =>
      f.slices?.reduce((total, slice) => {
        const match = slice.duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
        const hours = parseInt(match?.[1] || 0);
        const mins = parseInt(match?.[2] || 0);
        return total + hours * 60 + mins;
      }, 0),
    ),
  );

  const visiblePages = getVisiblePages();

  return (
    <section className=" mx-auto max-w-full space-y-4 overflow-hidden sm:space-y-6">
      {bookingError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-poppins-medium text-red-700">
          {bookingError}
        </div>
      )}

      {currentFlights.map((flight, index) => {
        const flightId = flight.id || `flight-${index}`;
        const isBookingLoading = loadingFlightId === flightId;

        // ================= CALCULATIONS =================
        const price = parseFloat(
          flight.total_amount || flight.base_amount || 0,
        );

        // Total duration of this flight in minutes
        const flightDuration = flight.slices?.reduce((total, slice) => {
          const match = slice.duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
          const hours = parseInt(match?.[1] || 0);
          const mins = parseInt(match?.[2] || 0);
          return total + hours * 60 + mins;
        }, 0);

        // Total stops
        const totalStops = flight.slices?.reduce(
          (t, s) => t + Math.max(0, (s.segments?.length || 1) - 1),
          0,
        );

        // BADGE FLAGS
        const isCheapest = price === cheapestPrice;
        const isFastest = flightDuration === fastestDuration;
        const isBestValue = price <= cheapestPrice * 1.15 && totalStops <= 1;

        // Other data
        const totalPassengers = searchData?.passengers
          ? (searchData.passengers.adults || 0) +
            (searchData.passengers.children || 0) +
            (searchData.passengers.infants || 0)
          : 1;

        const totalPrice = calculateTotalPrice(flight);
        const travelClass = (searchData?.cabinClass || "Economy")
          .replaceAll("_", " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
        const airlineInfo = getAirlineInfo(flight);
        const slices = flight.slices?.length ? flight.slices : [flight];
        const passengersToShow =
          flight.passengers?.length > 0
            ? flight.passengers
            : [{ type: "adult", cabin: { marketing_name: travelClass } }];

        return (
          <Card
            key={flightId}
            className="group overflow-hidden rounded-lg border border-border bg-white px-4 py-2 shadow-card transition-all duration-300 hover:shadow-card-hover"
          >
            <CardContent className="p-0">
              <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                {/* ================= LEFT SECTION ================= */}
                <div className="min-w-0 space-y-4">
                  {/* ===== TOP BADGES ===== */}
                  <div className="flex flex-wrap gap-1.5">
                    {isCheapest && (
                      <span className="rounded-full bg-green px-2.5 py-1 text-[10px] font-semibold text-white">
                        Cheapest
                      </span>
                    )}
                    {isFastest && (
                      <span className="rounded-full bg-blue px-2.5 py-1 text-[10px] font-semibold text-white">
                        Fastest
                      </span>
                    )}
                    {isBestValue && (
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-semibold text-heading">
                        Best Value
                      </span>
                    )}
                  </div>

                  {slices.map((slice, sliceIndex) => {
                    const segments = slice.segments?.length
                      ? slice.segments
                      : [slice];
                    const firstSegment = segments[0] || {};
                    const lastSegment = segments[segments.length - 1] || {};
                    const sliceOrigin = airportCode(
                      slice.origin || firstSegment.origin,
                    );
                    const sliceDestination = airportCode(
                      slice.destination || lastSegment.destination,
                    );
                    const departureTime = getDepartureTime(firstSegment, slice);
                    const arrivalTime = getArrivalTime(lastSegment, slice);

                    return (
                      <div key={sliceIndex} className="space-y-3">
                        <div className="flex min-w-0 flex-col gap-3 min-[420px]:flex-row min-[420px]:items-start min-[420px]:gap-4">
                          {/* Airline */}
                          <div className="flex min-w-0 items-center gap-2 min-[420px]:min-w-[70px] min-[420px]:flex-col min-[420px]:gap-0">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue/5 px-1 text-center text-[10px] font-semibold leading-tight text-dark">
                              {airlineInfo.code}
                            </span>
                            <span className="min-w-0 max-w-full truncate text-[10px] text-light min-[420px]:mt-1 min-[420px]:max-w-[70px] min-[420px]:text-center">
                              {airlineInfo.name}
                            </span>
                          </div>

                          {/* ROUTE */}
                          <div className="grid min-w-0 flex-1 grid-cols-[minmax(42px,1fr)_minmax(76px,104px)_minmax(42px,1fr)] items-center gap-2 min-[420px]:flex min-[420px]:justify-between">
                            {/* Departure */}
                            <div className="min-w-0 text-left">
                              <p className="truncate text-base font-bold text-dark sm:text-lg">
                                {sliceOrigin}
                              </p>
                              <p className="truncate text-[11px] font-medium text-light sm:text-xs">
                                {formatDateTime(departureTime)}
                              </p>
                            </div>

                            {/* Middle */}
                            <div className="flex min-w-0 flex-col items-center px-1 min-[420px]:px-2 sm:px-3">
                              <span className="max-w-full truncate text-[10px] text-light">
                                {formatDuration(
                                  slice.duration || firstSegment.duration,
                                )}
                              </span>

                              <div className="relative my-1.5 h-[2px] w-full max-w-24 bg-gray-200 sm:max-w-32">
                                <div className="absolute -top-2 right-0 w-4 h-4 text-theme">
                                  <Plane className="w-4 h-4 transform rotate-90" />
                                </div>
                              </div>

                              <span
                                className={`text-[10px] font-semibold ${
                                  segments.length > 1
                                    ? "text-amber-600"
                                    : "text-orange-600"
                                }`}
                              >
                                {segments.length > 1
                                  ? `${segments.length - 1} Stop${segments.length > 2 ? "s" : ""}`
                                  : "Direct"}
                              </span>

                              <div className="flex gap-2 mt-1 text-light">
                                <span
                                  title="In-flight WiFi available"
                                  className="hover:text-theme transition"
                                >
                                  <Wifi className="w-3 h-3 cursor-pointer" />
                                </span>
                                <span
                                  title="Complimentary meals included"
                                  className="hover:text-theme transition"
                                >
                                  <Utensils className="w-3 h-3 cursor-pointer" />
                                </span>
                                <span
                                  title="In-flight entertainment available"
                                  className="hover:text-theme transition"
                                >
                                  <Tv className="w-3 h-3 cursor-pointer" />
                                </span>
                              </div>
                            </div>

                            {/* Arrival */}
                            <div className="min-w-0 text-right">
                              <p className="truncate text-base font-bold text-dark sm:text-lg">
                                {sliceDestination}
                              </p>
                              <p className="truncate text-[11px] font-medium text-light sm:text-xs">
                                {formatDateTime(arrivalTime)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* LAYOVER */}
                        {segments.length > 1 &&
                          segments.map((segment, i) => {
                            if (i === segments.length - 1) return null;

                            const next = segments[i + 1];
                            const arrival = new Date(
                              getArrivalTime(segment, slice),
                            );
                            const departure = new Date(
                              getDepartureTime(next, slice),
                            );
                            const diff = departure - arrival;

                            const hours = Math.floor(diff / (1000 * 60 * 60));
                            const mins = Math.floor((diff / (1000 * 60)) % 60);
                            const overnight =
                              departure.getDate() !== arrival.getDate();

                            return (
                              <div
                                key={i}
                                className="flex flex-col gap-1 rounded-lg border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs sm:flex-row sm:items-center sm:justify-between"
                              >
                                <span className="text-amber-700">
                                  Layover at {airportCode(segment.destination)}
                                </span>
                                <span className="font-medium text-amber-700">
                                  {hours}h {mins}m
                                  {overnight && (
                                    <span className="text-red-600 ml-1 font-semibold">
                                      Overnight
                                    </span>
                                  )}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}

                  {/* SUMMARY BADGES */}
                  <div className="flex flex-wrap gap-1.5 text-xs pt-1">
                    {(() => {
                      const checkedQty = getBaggageCount(
                        flight.passengers?.[0] || flight,
                        ["checked"],
                        0,
                      );

                      return (
                        <span className="bg-theme-light text-theme px-3 py-1 rounded-full text-xs font-medium">
                          {checkedQty > 0
                            ? `${checkedQty} Checked Bag${checkedQty > 1 ? "s" : ""} Included`
                            : "No Checked Baggage"}
                        </span>
                      );
                    })()}

                    {(() => {
                      const cabinQty = getBaggageCount(
                        flight.passengers?.[0] || flight,
                        ["cabin", "carry_on"],
                        1,
                      );

                      return (
                        <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                          {cabinQty > 0
                            ? `${cabinQty} Cabin Bag${cabinQty > 1 ? "s" : ""} Included`
                            : "No Cabin Bag"}
                        </span>
                      );
                    })()}

                    <span className="rounded-full bg-blue-soft px-3 py-1 text-xs font-medium text-blue">
                      Est. CO2: {flight.total_emissions_kg || 0} kg
                    </span>
                  </div>
                </div>

                {/* RIGHT PRICE */}
                <div className="flex min-w-0 flex-col items-center justify-center space-y-3 border-t border-border pt-4 text-center lg:border-l lg:border-t-0 lg:pt-0 lg:pl-6">
                  <div className="max-w-full space-y-2">
                    <p className="break-words text-2xl font-bold text-theme">
                      {flight.total_currency} {totalPrice}
                    </p>
                    <p className="text-xs text-light">
                      Base {flight.base_amount} + Tax {flight.tax_amount}
                    </p>
                    <p className="text-xs text-body">
                      {travelClass} • {totalPassengers} Traveller
                      {totalPassengers > 1 ? "s" : ""} • {totalStops} Stop
                      {totalStops !== 1 ? "s" : ""}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5 text-xs mt-2">
                      {flight.conditions?.refund_before_departure?.allowed ? (
                        <span className="text-orange-700 bg-orange-50 px-3 py-1 rounded-full font-medium">
                          Refundable
                        </span>
                      ) : (
                        <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium">
                          Non-refundable
                        </span>
                      )}
                      {flight.conditions?.change_before_departure?.allowed ? (
                        <span className="text-orange-700 bg-orange-50 px-3 py-1 rounded-full font-medium">
                          Changeable
                        </span>
                      ) : (
                        <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium">
                          Non-changeable
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookNow(flight)}
                    disabled={isBookingLoading}
                    className="w-full bg-theme hover:bg-hover-dark text-white font-semibold py-3 px-4 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBookingLoading ? "Processing..." : "Book Now"}
                  </button>
                </div>
              </div>

              {/* Expand Section */}
              <div
                className="cursor-pointer border-t border-border bg-blue-soft/45 px-2 py-3 transition-all hover:bg-blue-soft"
                onClick={() =>
                  setExpandedCard(expandedCard === index ? null : index)
                }
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-body">
                    Flight Details & Itinerary
                  </span>
                  {expandedCard === index ? (
                    <ChevronUp className="w-4 h-4 text-theme" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-theme" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedCard === index && (
                <div className="space-y-4 border-t border-border bg-light-grey/55 px-2 py-4">
                  {/* FARE SUMMARY */}
                  <div className="rounded-lg border border-border bg-white p-4 text-sm">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <p className="text-light text-xs">Total</p>
                        <p className="font-bold text-dark">
                          {flight.total_currency} {flight.total_amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-light text-xs">Base</p>
                        <p className="text-dark">
                          {flight.total_currency} {flight.base_amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-light text-xs">Tax</p>
                        <p className="text-dark">
                          {flight.total_currency} {flight.tax_amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-light text-xs">CO2</p>
                        <p className="text-dark">
                          {flight.total_emissions_kg || 0} kg
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SEGMENTS */}
                  {slices.map((slice, sIndex) => {
                    const segments = slice.segments?.length
                      ? slice.segments
                      : [slice];

                    return (
                      <div
                        key={sIndex}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {segments.map((segment, segIndex) => {
                          const carrier = getCarrierInfo(
                            segment.operating_carrier ||
                              segment.marketing_carrier ||
                              segment.airline ||
                              slice.airline ||
                              flight.owner,
                            {
                              code:
                                segment.operating_carrier_code ||
                                segment.marketing_carrier_code ||
                                flight.airline_logo_code ||
                                airlineInfo.code,
                              name: airlineInfo.name,
                            },
                          );

                          const nextSegment = segments[segIndex + 1];
                          const segmentOrigin = airportCode(
                            segment.origin || slice.origin,
                          );
                          const segmentDestination = airportCode(
                            segment.destination || slice.destination,
                          );
                          const segmentDeparture = getDepartureTime(
                            segment,
                            slice,
                          );
                          const segmentArrival = getArrivalTime(segment, slice);
                          const segmentDuration =
                            segment.duration || slice.duration;
                          const segmentFlightNumber = getFlightNumber(
                            segment,
                            slice,
                          );

                          return (
                            <div key={segIndex} className="space-y-3 relative">
                              <div className="bg-white border border-gray-100 rounded-lg p-4 text-sm space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex min-w-0 items-center gap-2">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue/5 px-1 text-center text-[9px] font-semibold leading-none text-dark">
                                      {carrier.code || "XX"}
                                    </span>
                                    <div className="min-w-0">
                                      <p className="truncate font-semibold text-dark">
                                        {carrier.name}
                                      </p>
                                      <p className="truncate text-light text-xs">
                                        Flight {segmentFlightNumber}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="shrink-0 font-bold text-theme">
                                    {formatDuration(segmentDuration)}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                  <div className="min-w-0">
                                    <p className="font-bold text-dark">
                                      {segmentOrigin}
                                    </p>
                                    <p className="text-light text-xs">
                                      {formatDateTime(segmentDeparture)}
                                    </p>
                                  </div>
                                  <ArrowRight className="w-4 h-4 shrink-0 text-theme" />
                                  <div className="min-w-0 text-right">
                                    <p className="font-bold text-dark">
                                      {segmentDestination}
                                    </p>
                                    <p className="text-light text-xs">
                                      {formatDateTime(segmentArrival)}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-2 text-xs text-light">
                                  <div className="flex justify-between gap-3">
                                    <span>Cabin Class</span>
                                    <span className="text-right font-medium text-dark">
                                      {segment.passengers?.[0]?.cabin
                                        ?.marketing_name || "Economy Class"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between gap-3">
                                    <span>Fare Type</span>
                                    <span className="text-right font-medium text-dark">
                                      {flight.conditions
                                        ?.refund_before_departure?.allowed
                                        ? "Flexible Fare"
                                        : "Standard Economy Fare"}
                                    </span>
                                  </div>
                                  {(() => {
                                    const cabinQty = getBaggageCount(
                                      segment.passengers?.[0] || segment,
                                      ["cabin", "carry_on"],
                                      1,
                                    );
                                    const checkedQty = getBaggageCount(
                                      segment.passengers?.[0] || segment,
                                      ["checked"],
                                      0,
                                    );

                                    return (
                                      <>
                                        <div className="flex justify-between gap-3">
                                          <span>Cabin Baggage</span>
                                          <span className="text-right font-medium text-dark">
                                            {cabinQty > 0
                                              ? `${cabinQty} cabin bag included`
                                              : "No cabin bag included"}
                                          </span>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                          <span>Checked Baggage</span>
                                          <span className="text-right font-medium text-dark">
                                            {checkedQty > 0
                                              ? `${checkedQty} checked bag included`
                                              : "No checked baggage included"}
                                          </span>
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>

                              {nextSegment && (
                                <div className="mt-2 max-w-full rounded-lg border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs md:absolute md:left-1/2 md:-bottom-[18px] md:mt-0 md:-translate-x-1/2 md:-translate-y-1/2">
                                  {(() => {
                                    const arrival = new Date(
                                      getArrivalTime(segment, slice),
                                    );
                                    const departure = new Date(
                                      getDepartureTime(nextSegment, slice),
                                    );
                                    const diff = departure - arrival;
                                    const hours = Math.floor(
                                      diff / (1000 * 60 * 60),
                                    );
                                    const mins = Math.floor(
                                      (diff / (1000 * 60)) % 60,
                                    );
                                    const overnight =
                                      departure.getDate() !== arrival.getDate();

                                    return (
                                      <>
                                        <span className="font-medium text-amber-700">
                                          Layover: {hours}h {mins}m
                                        </span>
                                        {overnight && (
                                          <span className="text-red-600 ml-1">
                                            Overnight
                                          </span>
                                        )}
                                      </>
                                    );
                                  })()}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}

                  {/* PASSENGER INFO */}
                  <div className="bg-white border border-gray-100 rounded-lg p-4">
                    <h3 className="font-semibold text-dark mb-3">
                      Passenger & Baggage Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                      {passengersToShow.map((passenger, pIndex) => {
                        const baggage = getBaggageInfo(passenger);
                        const passengerLabel =
                          passenger.type === "adult"
                            ? "Adult Passenger"
                            : passenger.type === "child"
                              ? "Child Passenger"
                              : passenger.type === "infant"
                                ? "Infant Passenger"
                                : "Passenger";

                        return (
                          <div
                            key={pIndex}
                            className="border border-gray-100 rounded-lg p-3 bg-gray-50 space-y-2"
                          >
                            <p className="font-semibold text-dark">
                              {passengerLabel}
                            </p>
                            <div className="text-light text-xs">
                              {baggage.cabin > 0 ? (
                                <p className="flex items-center gap-1">
                                  <span className="text-orange-600">✓</span>{" "}
                                  {baggage.cabin} cabin bag included
                                </p>
                              ) : (
                                <p className="flex items-center gap-1 text-red-600">
                                  <span>✗</span> No cabin baggage included
                                </p>
                              )}
                            </div>
                            <div className="text-light text-xs">
                              {baggage.checked > 0 ? (
                                <p className="flex items-center gap-1">
                                  <span className="text-orange-600">✓</span>{" "}
                                  {baggage.checked} checked bag included
                                </p>
                              ) : (
                                <p className="flex items-center gap-1 text-red-600">
                                  <span>✗</span> No checked baggage included
                                </p>
                              )}
                            </div>
                            <div className="text-xs text-light">
                              Travel Class:{" "}
                              <span className="font-medium text-dark">
                                {passenger.cabin?.marketing_name ||
                                  "Economy Class"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8">
          <p className="text-light text-sm">
            Showing {indexOfFirstFlight + 1}-
            {Math.min(indexOfLastFlight, displayResults.length)} of{" "}
            {displayResults.length} flights
          </p>
          <div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              aria-label="Previous page"
              className={`flex h-10 min-w-10 shrink-0 items-center justify-center gap-1 rounded-lg border-2 px-3 text-sm font-bold transition-all sm:px-4 ${
                currentPage === 1
                  ? "text-light border-gray-200 cursor-not-allowed opacity-50"
                  : "text-theme border-theme hover:bg-theme hover:text-white hover:shadow-md"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />{" "}
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex min-w-0 flex-1 items-center justify-center rounded-lg border border-subtle bg-white px-3 py-2 text-sm font-poppins-semibold text-heading sm:hidden">
              Page {currentPage} of {totalPages}
            </div>

            <div className="hidden items-center justify-center gap-1 sm:flex">
              {visiblePages.map((page, i) =>
                typeof page === "number" ? (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border-2 text-sm font-bold transition-all sm:h-10 sm:w-10 ${
                      currentPage === page
                        ? "bg-theme text-white border-theme shadow-md"
                        : "text-dark border-gray-200 hover:border-theme hover:text-theme hover:bg-theme-light"
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span
                    key={i}
                    className="flex h-9 w-9 items-center justify-center text-light sm:h-10 sm:w-10"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </span>
                ),
              )}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              aria-label="Next page"
              className={`flex h-10 min-w-10 shrink-0 items-center justify-center gap-1 rounded-lg border-2 px-3 text-sm font-bold transition-all sm:px-4 ${
                currentPage === totalPages
                  ? "text-light border-gray-200 cursor-not-allowed opacity-50"
                  : "text-theme border-theme hover:bg-theme hover:text-white hover:shadow-md"
              }`}
            >
              <span className="hidden sm:inline">Next</span>{" "}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
