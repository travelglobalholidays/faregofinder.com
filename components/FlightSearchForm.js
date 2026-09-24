"use client";

import { useFlight } from "@/context/FlightContext";
import { CONTACT_INFO } from "@/config/ContactInfo";
import airportData from "@/data/airports.json";
import axiosInstance from "@/lib/axiosInstance";
import {
  buildFlightResultUrl,
  normalizeFlightOffers,
} from "@/lib/flightSearchUrl";
import { addDays, format } from "date-fns";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaUser,
} from "react-icons/fa";
import FlightSearchLoader from "./ResultComponent/FlightLoader";

export default function FlightSearchForm({
  initialValues = {},
  isResultsPage = false,
  compact = false,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    setSearchData,
    setResults,
    setFilteredResults,
    loading,
    setLoading,
    error,
    setError,
  } = useFlight();
  const compactMode = compact && !isResultsPage;

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLargeScreen(window.innerWidth >= 1024);
      const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // ✅ Safe initial state
  const [tripType, setTripType] = useState(
    searchParams?.get("tripType") ||
      (searchParams?.get("trip") === "oneway" ? "One Way" : null) ||
      initialValues.tripType ||
      "Roundtrip",
  );
  const [fromLocation, setFromLocation] = useState(
    searchParams?.get("from") || initialValues.from || "",
  );
  const [toLocation, setToLocation] = useState(
    searchParams?.get("to") || initialValues.to || "",
  );
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [userSearchData, setUserSearchData] = useState(null);

  const formatCabinLabel = (value) => {
    const cabinMap = {
      economy: "Economy",
      premium_economy: "Premium Economy",
      business: "Business",
      first_class: "First Class",
    };

    return cabinMap[value] || value || "Economy";
  };

  const [selectedClass, setSelectedClass] = useState(
    formatCabinLabel(
      searchParams?.get("class") ||
        searchParams?.get("cabin") ||
        initialValues.travelClass ||
        "Economy",
    ),
  );

  const getInitialPassengerCount = () => {
    if (searchParams?.get("passengers")) {
      try {
        return JSON.parse(searchParams.get("passengers"));
      } catch {
        return { adults: 1, children: 0, infants: 0 };
      }
    }
    return initialValues.passengers || { adults: 1, children: 0, infants: 0 };
  };

  const [passengerCount, setPassengerCount] = useState(
    getInitialPassengerCount(),
  );

  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [monthsToShow, setMonthsToShow] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [dateRange, setDateRange] = useState(null);

  // ✅ FIXED: initialize dateRange once (no dependency loop)
  useEffect(() => {
    const startDateParam =
      searchParams?.get("departureDate") || searchParams?.get("depart");
    const endDateParam =
      searchParams?.get("returnDate") || searchParams?.get("return");

    setDateRange([
      {
        startDate: startDateParam
          ? new Date(startDateParam)
          : initialValues.startDate
            ? new Date(initialValues.startDate)
            : new Date(),
        endDate: endDateParam
          ? new Date(endDateParam)
          : initialValues.endDate
            ? new Date(initialValues.endDate)
            : addDays(new Date(), 3),
        key: "selection",
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ only once — prevents infinite re-render

  const passengerRef = useRef(null);
  const classRef = useRef(null);
  const dateRangeRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const totalPassengers =
    passengerCount.adults + passengerCount.children + passengerCount.infants;
  const MAX_PASSENGERS = 9;

  useEffect(() => {
    const handleResize = () => setMonthsToShow(window.innerWidth < 768 ? 1 : 2);
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const updatePassengerCount = (type, operation) => {
    setPassengerCount((prev) => {
      const total = prev.adults + prev.children + prev.infants;
      let newValue = prev[type];

      if (operation === "increment" && total < MAX_PASSENGERS) {
        newValue = prev[type] + 1;
      }

      if (operation === "decrement") {
        newValue =
          type === "adults"
            ? Math.max(1, prev[type] - 1)
            : Math.max(0, prev[type] - 1);
      }

      return { ...prev, [type]: newValue };
    });
  };

  const handleDateChange = (ranges) => setDateRange([ranges.selection]);

  const handleAirportSearch = (query, type) => {
    const filtered = airportData.filter((a) =>
      a.toLowerCase().includes(query.toLowerCase()),
    );
    if (type === "from") setFromSuggestions(filtered);
    else setToSuggestions(filtered);
  };

  const selectAirport = (airport, type) => {
    if (type === "from") {
      setFromLocation(airport);
      setShowFromSuggestions(false);
    } else {
      setToLocation(airport);
      setShowToSuggestions(false);
    }
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const closeOtherDropdowns = (currentDropdown) => {
    if (currentDropdown !== "class") setShowClassDropdown(false);
    if (currentDropdown !== "passenger") setShowPassengerDropdown(false);
    if (currentDropdown !== "date") setShowDateRangePicker(false);
    if (currentDropdown !== "from") setShowFromSuggestions(false);
    if (currentDropdown !== "to") setShowToSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fromLocation || !toLocation)
      return setError("Please fill in both origin and destination.");
    if (fromLocation === toLocation)
      return setError("Origin and destination cannot be the same.");
    if (!dateRange?.[0]?.startDate)
      return setError("Please select a departure date.");
    if (totalPassengers > MAX_PASSENGERS)
      return setError(`Maximum ${MAX_PASSENGERS} passengers allowed.`);

    const extractIata = (str) => {
      if (!str) return "";
      const match = str.match(/^[A-Z]{3}/);
      return match ? match[0] : "";
    };

    const normalizedTripType = tripType === "Roundtrip" ? "roundtrip" : "oneway";
    const cabinClass = selectedClass.toLowerCase().replace(/\s+/g, "_");

    const payload = {
      tripType: normalizedTripType,
      origin: extractIata(fromLocation),
      destination: extractIata(toLocation),
      departureDate: format(dateRange[0].startDate, "yyyy-MM-dd"),
      returnDate:
        tripType === "Roundtrip"
          ? format(dateRange[0].endDate, "yyyy-MM-dd")
          : null,
      cabinClass,
      travelClass: selectedClass,
      passengers: passengerCount,
      fromLocation,
      toLocation,
    };

    setUserSearchData({
      from: payload.origin,
      to: payload.destination,
      departure: format(dateRange[0].startDate, "MMM dd, yyyy"),
      returnDate:
        tripType === "Roundtrip"
          ? format(dateRange[0].endDate, "MMM dd, yyyy")
          : "—",
      passengers: totalPassengers,
    });

    try {
      setIsSubmitting(true);
      setLoading(true);
      const response = await axiosInstance.post("/flights/search", payload);
      const apiData = normalizeFlightOffers(response);
      setSearchData(payload);
      setResults(apiData);
      setFilteredResults([]);
      const searchUrl = buildFlightResultUrl(payload);
      setTimeout(() => {
        setLoading(false);
        router.push(searchUrl);
      }, 1000);
    } catch (err) {
      console.error("❌ Error fetching flights:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong. Try again.",
      );
      setLoading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModifySearch = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  if (loading && userSearchData) {
    return (
      <div
        className="fixed inset-0 bg-white"
        style={{ zIndex: 2147483647 }}
      >
        <FlightSearchLoader
          logo="/images/logo.png"
          agencyName="FaresGoFinder"
          phone={CONTACT_INFO.phoneDisplay}
          from={userSearchData.from}
          to={userSearchData.to}
          departure={userSearchData.departure}
          returnDate={userSearchData.returnDate}
          passengers={userSearchData.passengers}
        />
      </div>
    );
  }

  if (!isMounted || !dateRange) return null;
  return (
    <section className="w-full">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <form
          onSubmit={isResultsPage ? handleModifySearch : handleSubmit}
          className={`${
            compactMode
              ? "space-y-4 bg-white p-4 md:p-5 border border-gray-100 rounded-xl shadow-md"
              : "space-y-6 bg-white p-6 md:p-8 border border-gray-100 rounded-2xl shadow-md"
          }`}
        >
          {error && (
            <p className="text-center text-red-600 bg-red-50 py-2 rounded-md font-semibold">
              {error}
            </p>
          )}

          {/* Show different heading for results page */}
          {isResultsPage && (
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Modify Your Search
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Adjust your search criteria to find different flight options
              </p>
            </div>
          )}

          {/* === TRIP TYPE, CLASS & PASSENGERS === */}
          <div
            className={`${
              compactMode ? "pb-3 gap-3" : "pb-4 gap-4"
            } flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200`}
          >
            <div className="flex items-center gap-6 flex-wrap">
              {["Roundtrip", "One Way"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`${
                    compactMode
                      ? "px-3 py-1.5 text-sm md:text-base"
                      : "px-4 py-2 text-base md:text-lg"
                  } font-medium tracking-wide transition-all ${
                    tripType === type
                      ? "text-[var(--theme-color)] border-b-4 border-[var(--theme-color)]"
                      : "text-gray-600 hover:text-[var(--theme-color)]"
                  }`}
                  onClick={() => setTripType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* === CLASS DROPDOWN === */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative" ref={classRef}>
                <button
                  type="button"
                  className={`${
                    compactMode ? "px-4 py-2 text-sm" : "px-5 py-3"
                  } flex items-center border border-gray-300 text-[var(--text-primary)] font-semibold rounded-md hover:border-[var(--theme-color)]`}
                  onClick={() => {
                    closeOtherDropdowns("class");
                    setShowClassDropdown(!showClassDropdown);
                  }}
                >
                  <span className="mr-2">{selectedClass}</span>
                  <FaChevronDown className="text-[var(--theme-color)]" />
                </button>

                {showClassDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 shadow-xl rounded-lg p-2 z-[999]">
                    {[
                      "Economy",
                      "Premium Economy",
                      "Business",
                      "First Class",
                    ].map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setSelectedClass(item);
                          setShowClassDropdown(false);
                        }}
                        className={`px-3 py-2 text-base font-medium rounded-md cursor-pointer ${
                          selectedClass === item
                            ? "bg-[var(--theme-color)]/20 text-[var(--theme-color)]"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* === PASSENGER DROPDOWN === */}
              <div className="relative" ref={passengerRef}>
                <button
                  type="button"
                  className={`${
                    compactMode ? "px-4 py-2 text-sm" : "px-5 py-3"
                  } flex items-center border border-gray-300 text-[var(--text-primary)] font-semibold rounded-md hover:border-[var(--theme-color)]`}
                  onClick={() => {
                    closeOtherDropdowns("passenger");
                    setShowPassengerDropdown(!showPassengerDropdown);
                  }}
                >
                  <FaUser className="mr-2 text-[var(--theme-color)]" />
                  <span>
                    {totalPassengers} Traveler{totalPassengers > 1 ? "s" : ""}
                  </span>
                </button>

                {showPassengerDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 shadow-xl rounded-lg p-4 z-[999]">
                    {[
                      { type: "adults", label: "Adults (12+ years)", min: 1 },
                      {
                        type: "children",
                        label: "Children (2-11 years)",
                        min: 0,
                      },
                      { type: "infants", label: "Infants (Under 2)", min: 0 },
                    ].map(({ type, label, min }) => (
                      <div
                        key={type}
                        className="flex justify-between items-center mb-3"
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-[var(--text-primary)] capitalize">
                            {type}
                          </div>
                          <div className="text-xs text-gray-500">{label}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-md hover:bg-[var(--theme-color)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() =>
                              updatePassengerCount(type, "decrement")
                            }
                            disabled={passengerCount[type] <= min}
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {passengerCount[type]}
                          </span>
                          <button
                            type="button"
                            className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-md hover:bg-[var(--theme-color)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() =>
                              updatePassengerCount(type, "increment")
                            }
                            disabled={totalPassengers >= MAX_PASSENGERS}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Max passengers warning */}
                    {totalPassengers >= MAX_PASSENGERS && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-xs text-yellow-800 text-center">
                          Maximum {MAX_PASSENGERS} passengers allowed
                        </p>
                      </div>
                    )}

                    <button
                      type="button"
                      className="w-full mt-3 py-2 bg-[var(--theme-color2)] text-white font-semibold rounded-md hover:bg-[var(--text-primary)] transition-colors"
                      onClick={() => setShowPassengerDropdown(false)}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Input Fields */}
          <div
            className={`${
              compactMode ? "gap-3" : "gap-4"
            } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 items-end relative`}
          >
            {/* From */}
            <div className="md:col-span-4 relative" ref={fromRef}>
              <label
                className={`${
                  compactMode
                    ? "text-sm md:text-base mb-1.5"
                    : "text-base md:text-lg mb-2"
                } block text-start font-semibold text-[var(--text-primary)]`}
              >
                <FaPlaneDeparture className="inline mr-2 text-[var(--theme-color)]" />{" "}
                Origin
              </label>
              <input
                type="text"
                placeholder="Enter departure city or airport"
                value={fromLocation}
                onChange={(e) => {
                  setFromLocation(e.target.value);
                  handleAirportSearch(e.target.value, "from");
                  setShowFromSuggestions(true);
                }}
                onFocus={() => {
                  closeOtherDropdowns("from");
                  setShowFromSuggestions(true);
                }}
                className={`${
                  compactMode
                    ? "py-2.5 md:py-3 text-sm md:text-base"
                    : "py-3 md:py-4 text-base md:text-lg"
                } w-full px-4 border border-gray-300 rounded-md text-[var(--text-primary)] font-medium focus:border-[var(--theme-color)] focus:ring-1 focus:ring-[var(--theme-color)]`}
              />
              {showFromSuggestions && (
                <ul className="absolute w-full bg-white border border-gray-200 shadow-md rounded-md mt-1 max-h-56 overflow-y-auto z-50">
                  {fromSuggestions.length > 0 ? (
                    fromSuggestions.map((a, i) => (
                      <li
                        key={i}
                        onClick={() => selectAirport(a, "from")}
                        className="px-3 py-2 hover:bg-[var(--theme-color)]/10 cursor-pointer flex items-center gap-2 text-sm"
                      >
                        <FaMapMarkerAlt className="text-[var(--theme-color)]" />
                        <span className="font-semibold text-[var(--text-primary)]">
                          {a.split(" - ")[0]}
                        </span>
                        <span className="text-gray-600 text-xs">
                          - {a.split(" - ")[1]}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-500 text-sm text-center">
                      No airports found
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Swap Button Centered */}
            <div
              className={`${
                compactMode ? "top-[58px]" : "top-[70px]"
              } hidden md:absolute left-1/3 transform -translate-x-1/2 -translate-y-[30%] md:-translate-y-[60%] z-20`}
            >
              <button
                type="button"
                onClick={swapLocations}
                className={`${
                  compactMode ? "w-10 h-10" : "w-12 h-12"
                } flex items-center justify-center border border-gray-300 rounded-full bg-white hover:bg-gray-50 text-gray-600 hover:text-[var(--theme-color)] shadow-sm transition-all cursor-pointer`}
                title="Swap"
              >
                <FaExchangeAlt className="text-base" />
              </button>
            </div>

            {/* To */}
            <div className="md:col-span-4 relative" ref={toRef}>
              <label
                className={`${
                  compactMode
                    ? "text-sm md:text-base mb-1.5"
                    : "text-base md:text-lg mb-2"
                } block text-start font-semibold text-[var(--text-primary)]`}
              >
                <FaPlaneArrival className="inline mr-2 text-[var(--theme-color)]" />{" "}
                Destination
              </label>
              <input
                type="text"
                placeholder="Enter destination city or airport"
                value={toLocation}
                onChange={(e) => {
                  setToLocation(e.target.value);
                  handleAirportSearch(e.target.value, "to");
                  setShowToSuggestions(true);
                }}
                onFocus={() => {
                  closeOtherDropdowns("to");
                  setShowToSuggestions(true);
                }}
                className={`${
                  compactMode
                    ? "py-2.5 md:py-3 text-sm md:text-base"
                    : "py-3 md:py-4 text-base md:text-lg"
                } w-full px-4 border border-gray-300 rounded-md text-[var(--text-primary)] font-medium focus:border-[var(--theme-color)] focus:ring-1 focus:ring-[var(--theme-color)]`}
              />
              {showToSuggestions && (
                <ul className="absolute w-full bg-white border border-gray-200 shadow-md rounded-md mt-1 max-h-56 overflow-y-auto z-50">
                  {toSuggestions.length > 0 ? (
                    toSuggestions.map((a, i) => (
                      <li
                        key={i}
                        onClick={() => selectAirport(a, "to")}
                        className="px-3 py-2 hover:bg-[var(--theme-color)]/10 cursor-pointer flex items-center gap-2 text-sm"
                      >
                        <FaMapMarkerAlt className="text-[var(--theme-color)]" />
                        <span className="font-semibold text-[var(--text-primary)]">
                          {a.split(" - ")[0]}
                        </span>
                        <span className="text-gray-600 text-xs">
                          - {a.split(" - ")[1]}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-500 text-sm text-center">
                      No airports found
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Date */}
            <div
              className="md:col-span-3 relative text-left"
              ref={dateRangeRef}
            >
              <label
                className={`${
                  compactMode
                    ? "text-sm md:text-base mb-1.5"
                    : "text-base md:text-lg mb-2"
                } block text-start font-semibold text-[var(--text-primary)]`}
              >
                <FaCalendarAlt className="inline mr-2 text-[var(--theme-color)]" />{" "}
                Departure / Return
              </label>
              <button
                type="button"
                className={`${
                  compactMode
                    ? "py-2.5 md:py-3 text-sm md:text-base"
                    : "py-3 md:py-4 text-base md:text-lg"
                } w-full px-4 border border-gray-300 rounded-md flex justify-between items-center text-[var(--text-primary)] font-medium hover:border-[var(--theme-color)]`}
                onClick={() => {
                  closeOtherDropdowns("date");
                  setShowDateRangePicker(!showDateRangePicker);
                }}
              >
                <span>
                  {tripType === "One Way"
                    ? format(dateRange[0].startDate, "MMM d, yyyy")
                    : `${format(dateRange[0].startDate, "MMM d")} - ${format(
                        dateRange[0].endDate,
                        "MMM d, yyyy",
                      )}`}
                </span>
              </button>

              {showDateRangePicker && (
                <div
                  className={`absolute z-[9999] mt-2 bg-white border border-gray-200 p-3 rounded-lg shadow-lg 
                  w-[90vw] sm:w-[450px] md:w-[600px]
                 ${isLargeScreen ? "right-0" : "-left-4 sm:left-0"}
`}
                >
                  <DateRange
                    editableDateInputs
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    minDate={new Date()}
                    months={monthsToShow}
                    direction="horizontal"
                    rangeColors={["#0f766e"]}
                    showDateDisplay={false}
                  />
                </div>
              )}
            </div>
            {/* Travelers & Class (Visible on Mobile) */}
            <div className="md:hidden w-full">
              <div className="grid grid-cols-1 gap-3 w-full">
                {/* ================= CLASS DROPDOWN ================= */}
                <div className="relative w-full" ref={classRef}>
                  <button
                    type="button"
                    className={`${
                      compactMode ? "py-2.5 text-sm" : "py-3"
                    } w-full flex items-center justify-between px-4 border border-gray-300 text-[var(--text-primary)] font-semibold rounded-md hover:border-[var(--theme-color)]`}
                    onClick={() => {
                      closeOtherDropdowns("class");
                      setShowClassDropdown(!showClassDropdown);
                    }}
                  >
                    <span className="truncate">{selectedClass}</span>
                    <FaChevronDown className="text-[var(--theme-color)] shrink-0" />
                  </button>

                  {showClassDropdown && (
                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 shadow-xl rounded-lg p-2 z-[999]">
                      {[
                        "Economy",
                        "Premium Economy",
                        "Business",
                        "First Class",
                      ].map((item) => (
                        <div
                          key={item}
                          className={`px-3 py-3 text-sm font-medium rounded-md cursor-pointer transition ${
                            selectedClass === item
                              ? "bg-[var(--theme-color)]/20 text-[var(--theme-color)]"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                          onClick={() => {
                            setSelectedClass(item);
                            setShowClassDropdown(false);
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ================= PASSENGER DROPDOWN ================= */}
                <div className="relative w-full" ref={passengerRef}>
                  <button
                    type="button"
                    className={`${
                      compactMode ? "py-2.5 text-sm" : "py-3"
                    } w-full flex items-center justify-between px-4 border border-gray-300 text-[var(--text-primary)] font-semibold rounded-md hover:border-[var(--theme-color)]`}
                    onClick={() => {
                      closeOtherDropdowns("passenger");
                      setShowPassengerDropdown(!showPassengerDropdown);
                    }}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FaUser className="text-[var(--theme-color)] shrink-0" />
                      <span className="truncate text-sm">
                        {totalPassengers} Traveler
                        {totalPassengers > 1 ? "s" : ""}
                        {totalPassengers >= MAX_PASSENGERS && " (Max)"}
                      </span>
                    </div>
                  </button>

                  {showPassengerDropdown && (
                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 shadow-xl rounded-lg p-4 z-[999]">
                      <div className="space-y-4">
                        {[
                          {
                            type: "adults",
                            label: "Adults (12+ years)",
                            min: 1,
                          },
                          {
                            type: "children",
                            label: "Children (2–11 years)",
                            min: 0,
                          },
                          {
                            type: "infants",
                            label: "Infants (Under 2)",
                            min: 0,
                          },
                        ].map(({ type, label, min }) => (
                          <div
                            key={type}
                            className="flex justify-between items-center gap-2"
                          >
                            <div className="flex-1">
                              <div className="font-semibold text-[var(--text-primary)] capitalize">
                                {type}
                              </div>
                              <div className="text-xs text-gray-500">
                                {label}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-[var(--theme-color)]/20 disabled:opacity-50"
                                onClick={() =>
                                  updatePassengerCount(type, "decrement")
                                }
                                disabled={passengerCount[type] <= min}
                              >
                                -
                              </button>

                              <span className="w-8 text-center font-semibold">
                                {passengerCount[type]}
                              </span>

                              <button
                                type="button"
                                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-[var(--theme-color)]/20 disabled:opacity-50"
                                onClick={() =>
                                  updatePassengerCount(type, "increment")
                                }
                                disabled={totalPassengers >= MAX_PASSENGERS}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* MAX WARNING */}
                      {totalPassengers >= MAX_PASSENGERS && (
                        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                          <p className="text-xs text-yellow-800 text-center">
                            Maximum {MAX_PASSENGERS} passengers allowed
                          </p>
                        </div>
                      )}

                      <button
                        type="button"
                        className="w-full mt-4 py-2 bg-[var(--theme-color)] text-white font-semibold rounded-md hover:bg-[var(--text-primary)] transition"
                        onClick={() => setShowPassengerDropdown(false)}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className={`${compactMode ? "pt-0" : "pt-4"} md:col-span-1`}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isResultsPage
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-[var(--theme-color2)] hover:bg-[var(--text-primary)]"
                } text-white font-bold ${
                  compactMode
                    ? "py-2.5 md:py-3 px-4 text-sm"
                    : "py-3 md:py-4 px-5 md:px-6 text-base md:text-md"
                } shadow-lg rounded-md transition-all flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Search className="text-white font-medium text-lg md:text-lg" />
                    <span className={compactMode ? "md:hidden" : ""}>
                      {isResultsPage ? "UPDATE SEARCH" : "SEARCH FLIGHTS"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

