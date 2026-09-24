"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useFlight } from "@/context/FlightContext";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Clock,
  Filter,
  Moon,
  Sun,
  Sunset,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function FlightFilterSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isMobileOpen
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [durationRange, setDurationRange] = useState([0, 24]);
  const [departureTimeRange, setDepartureTimeRange] = useState([
    "00:00",
    "23:59",
  ]);
  const [arrivalTimeRange, setArrivalTimeRange] = useState(["00:00", "23:59"]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState([]);
  const [selectedCabins, setSelectedCabins] = useState([]);
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [changeableOnly, setChangeableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [expandedSections, setExpandedSections] = useState({
    stops: true,
    price: true,
    duration: true,
    departure: false,
    arrival: false,
    airlines: true,
    amenities: false,
    timeOfDay: false,
    cabin: false,
    flexibility: false,
  });

  const { results = [], setFilteredResults, searchData } = useFlight();

  // Calculate total passengers
  const totalPassengers = useMemo(() => {
    if (!searchData?.passengers) return 1;
    const { adults = 1, children = 0, infants = 0 } = searchData.passengers;
    return adults + children + infants;
  }, [searchData]);

  // Extract airlines
  const airlines = useMemo(() => {
    if (!results.length) return [];

    const airlineMap = new Map();
    results.forEach((flight) => {
      const airline =
        flight.owner || flight.slices?.[0]?.segments?.[0]?.operating_carrier;
      if (airline) {
        const name = airline.name || "Unknown Airline";
        const code = airline.iata_code || "";
        const existing = airlineMap.get(name) || {
          count: 0,
          minPrice: Infinity,
        };

        airlineMap.set(name, {
          name,
          code,
          count: existing.count + 1,
          minPrice: Math.min(
            existing.minPrice,
            parseFloat(flight.total_amount || 0),
          ),
          logo: `https://images.kiwi.com/airlines/64/${code || "XX"}.png`,
        });
      }
    });

    return Array.from(airlineMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [results]);

  // Calculate stop counts with percentages
  const stopsStats = useMemo(() => {
    if (!results.length)
      return { nonstop: 0, onestop: 0, multistop: 0, percentages: {} };

    let nonstop = 0,
      onestop = 0,
      multistop = 0;
    results.forEach((flight) => {
      const segments =
        flight.slices?.reduce((acc, s) => acc + (s.segments?.length || 0), 0) ||
        0;
      if (segments === 1) nonstop++;
      else if (segments === 2) onestop++;
      else if (segments > 2) multistop++;
    });

    const total = results.length;
    return {
      nonstop,
      onestop,
      multistop,
      percentages: {
        nonstop: Math.round((nonstop / total) * 100),
        onestop: Math.round((onestop / total) * 100),
        multistop: Math.round((multistop / total) * 100),
      },
    };
  }, [results]);

  // Calculate time of day distribution
  const timeOfDayStats = useMemo(() => {
    const times = { morning: 0, afternoon: 0, evening: 0, night: 0 };

    results.forEach((flight) => {
      const depTime = flight.slices?.[0]?.segments?.[0]?.departing_at;
      if (depTime) {
        const hour = new Date(depTime).getHours();
        if (hour >= 5 && hour < 12) times.morning++;
        else if (hour >= 12 && hour < 17) times.afternoon++;
        else if (hour >= 17 && hour < 21) times.evening++;
        else times.night++;
      }
    });

    return times;
  }, [results]);

  // Get available amenities
  const availableAmenities = useMemo(() => {
    const amenities = new Set();
    results.forEach((flight) => {
      flight.slices?.forEach((slice) => {
        slice.segments?.forEach((seg) => {
          const cabin = seg.passengers?.[0]?.cabin?.amenities;
          if (cabin?.wifi?.available) amenities.add("wifi");
          if (cabin?.power?.available) amenities.add("power");
          if (cabin?.entertainment?.available) amenities.add("entertainment");
          if (seg.passengers?.[0]?.baggages?.some((b) => b.type === "meal"))
            amenities.add("meal");
        });
      });
    });
    return Array.from(amenities);
  }, [results]);

  // Price range calculation
  useEffect(() => {
    if (results.length > 0) {
      const prices = results.map((f) => parseFloat(f.total_amount || 0));
      const timeoutId = window.setTimeout(() => {
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
      }, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [results]);

  const activeFilterCount = useMemo(
    () =>
      selectedStops.length +
      selectedAirlines.length +
      selectedAmenities.length +
      selectedTimeOfDay.length +
      (refundableOnly ? 1 : 0) +
      (changeableOnly ? 1 : 0),
    [
      selectedStops,
      selectedAirlines,
      selectedAmenities,
      selectedTimeOfDay,
      refundableOnly,
      changeableOnly,
    ],
  );

  const filterSectionClass =
    "rounded-lg border border-border bg-white px-3.5 py-3 shadow-sm";
  const sectionToggleClass =
    "mb-2 flex w-full items-center justify-between gap-3 text-left";

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle stop selection
  const handleStopChange = (stopType) => {
    setSelectedStops((prev) =>
      prev.includes(stopType)
        ? prev.filter((s) => s !== stopType)
        : [...prev, stopType],
    );
  };

  // Handle airline selection
  const handleAirlineChange = (airlineName) => {
    setSelectedAirlines((prev) =>
      prev.includes(airlineName)
        ? prev.filter((a) => a !== airlineName)
        : [...prev, airlineName],
    );
  };

  // Handle time of day selection
  const handleTimeOfDayChange = (time) => {
    setSelectedTimeOfDay((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    );
  };

  // Handle amenity selection
  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  // Apply filters
  const handleApplyFilters = useCallback(() => {
    if (!results.length) return;

    const filtered = results.filter((flight) => {
      const price = parseFloat(flight.total_amount || 0) * totalPassengers;
      if (price < priceRange[0] || price > priceRange[1]) return false;

      // Duration filter
      const duration =
        flight.slices?.reduce((acc, s) => {
          const hours = parseInt(s.duration?.match(/(\d+)H/)?.[1] || "0");
          return acc + hours;
        }, 0) || 0;
      if (duration < durationRange[0] || duration > durationRange[1])
        return false;

      // Departure time filter
      const depTime = flight.slices?.[0]?.segments?.[0]?.departing_at;
      if (depTime && selectedTimeOfDay.length > 0) {
        const hour = new Date(depTime).getHours();
        const timeSlot =
          hour >= 5 && hour < 12
            ? "morning"
            : hour >= 12 && hour < 17
              ? "afternoon"
              : hour >= 17 && hour < 21
                ? "evening"
                : "night";
        if (!selectedTimeOfDay.includes(timeSlot)) return false;
      }

      // Stops filter
      if (selectedStops.length > 0) {
        const segments =
          flight.slices?.reduce(
            (acc, s) => acc + (s.segments?.length || 0),
            0,
          ) || 0;
        const isNonStop = segments === 1;
        const isOneStop = segments === 2;
        const isMultiStop = segments > 2;

        const stopMatch =
          (selectedStops.includes("non-stop") && isNonStop) ||
          (selectedStops.includes("one-stop") && isOneStop) ||
          (selectedStops.includes("two-stops") && isMultiStop);
        if (!stopMatch) return false;
      }

      // Airlines filter
      if (selectedAirlines.length > 0) {
        const airlineName =
          flight.owner?.name ||
          flight.slices?.[0]?.segments?.[0]?.operating_carrier?.name ||
          "Unknown Airline";
        if (!selectedAirlines.includes(airlineName)) return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAmenities = selectedAmenities.every((amenity) => {
          return flight.slices?.some((slice) =>
            slice.segments?.some(
              (seg) =>
                seg.passengers?.[0]?.cabin?.amenities?.[amenity]?.available,
            ),
          );
        });
        if (!hasAmenities) return false;
      }

      // Flexibility filters
      if (
        refundableOnly &&
        !flight.conditions?.refund_before_departure?.allowed
      )
        return false;
      if (
        changeableOnly &&
        !flight.conditions?.change_before_departure?.allowed
      )
        return false;

      return true;
    });

    // Sort results
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return (
            parseFloat(a.total_amount || 0) - parseFloat(b.total_amount || 0)
          );
        case "price_desc":
          return (
            parseFloat(b.total_amount || 0) - parseFloat(a.total_amount || 0)
          );
        case "duration":
          const aDur =
            a.slices?.reduce(
              (acc, s) =>
                acc + parseInt(s.duration?.match(/(\d+)H/)?.[1] || "0"),
              0,
            ) || 0;
          const bDur =
            b.slices?.reduce(
              (acc, s) =>
                acc + parseInt(s.duration?.match(/(\d+)H/)?.[1] || "0"),
              0,
            ) || 0;
          return aDur - bDur;
        case "departure":
          const aDep = new Date(
            a.slices?.[0]?.segments?.[0]?.departing_at || 0,
          );
          const bDep = new Date(
            b.slices?.[0]?.segments?.[0]?.departing_at || 0,
          );
          return aDep - bDep;
        default:
          return 0;
      }
    });

    setFilteredResults(sorted);
    setIsMobileOpen(false); // Close mobile sidebar after applying
  }, [
    results,
    priceRange,
    durationRange,
    selectedStops,
    selectedAirlines,
    selectedAmenities,
    selectedTimeOfDay,
    refundableOnly,
    changeableOnly,
    sortBy,
    totalPassengers,
    setFilteredResults,
  ]);

  // Clear all filters
  const clearAllFilters = () => {
    if (results.length > 0) {
      const prices = results.map((f) => parseFloat(f.total_amount || 0));
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
    setSelectedStops([]);
    setSelectedAirlines([]);
    setSelectedAmenities([]);
    setSelectedTimeOfDay([]);
    setRefundableOnly(false);
    setChangeableOnly(false);
    setSortBy("recommended");
    setFilteredResults([]);
  };

  // Format helpers
  const formatPrice = (p) => `$${Math.round(p)}`;
  const formatDuration = (h) => `${h}h`;

  return (
    <>
      {/* Mobile Filter Button  */}
      <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 md:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 rounded-full bg-blue px-6 py-3 text-white shadow-theme transition-all hover:bg-blue-dark"
        >
          <Filter size={18} />
          <span className="font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-blue">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Bar   */}
      {activeFilterCount > 0 && !isMobileOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 z-[55] px-4">
          <div className="flex items-center justify-between rounded-lg border border-subtle bg-white p-2 shadow-theme">
            <div className="flex flex-wrap items-center gap-2">
              {selectedStops.length > 0 && (
                <span className="whitespace-nowrap rounded-full bg-blue-soft px-2 py-1 text-xs text-blue">
                  {selectedStops.length} stop filter
                </span>
              )}
              {selectedAirlines.length > 0 && (
                <span className="whitespace-nowrap rounded-full bg-blue-soft px-2 py-1 text-xs text-blue">
                  {selectedAirlines.length} airline
                </span>
              )}
              {selectedTimeOfDay.length > 0 && (
                <span className="whitespace-nowrap rounded-full bg-blue-soft px-2 py-1 text-xs text-blue">
                  {selectedTimeOfDay.length} time
                </span>
              )}
              {(refundableOnly || changeableOnly) && (
                <span className="whitespace-nowrap rounded-full bg-blue-soft px-2 py-1 text-xs text-blue">
                  Flexible
                </span>
              )}
            </div>
            <button
              onClick={clearAllFilters}
              className="px-2 py-1 text-xs text-light-blue hover:text-heading"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Mobile Overlay - Below CTA button */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-[65] md:hidden" />
      )}

      {/* Filter Sidebar  */}
      <div
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-[70] md:static md:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-[86vw] max-w-sm md:w-full md:max-w-none bg-white md:bg-transparent
          overflow-y-auto md:overflow-visible max-h-[100dvh] md:max-h-none shadow-2xl md:shadow-none
        `}
      >
        <Card className="min-h-[100dvh] rounded-none border-0 border-r border-subtle bg-white shadow-none md:min-h-0 md:rounded-lg md:border md:border-border md:bg-white md:shadow-card">
          <CardContent className="space-y-3 p-4 md:p-4">
            {/* Header with Close Button */}
            <div className="rounded-lg border border-blue/10 bg-blue-soft p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue shadow-button">
                    <Filter className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-poppins-semibold text-heading">
                      Filters
                    </h2>
                    <p className="text-xs text-light-blue">
                      {results.length} flights available
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-1 rounded-lg border border-blue/15 bg-white px-2.5 py-1.5 text-xs font-poppins-semibold text-blue transition hover:border-green hover:bg-accent-soft"
                  >
                    <X className="w-3 h-3" />
                    Clear
                  </button>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded p-1 hover:bg-blue-soft md:hidden"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div className={filterSectionClass}>
              <h3 className="font-poppins-semibold text-sm text-heading">Sort by</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-2 w-full rounded-lg border border-subtle bg-white p-2 text-sm text-light-blue focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
              >
                <option value="recommended">Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="duration">Duration</option>
                <option value="departure">Earliest Departure</option>
              </select>
            </div>

            {/* Stops Filter */}
            <div className={filterSectionClass}>
              <button
                onClick={() => toggleSection("stops")}
                className={sectionToggleClass}
              >
                <h3 className="font-poppins-semibold text-sm text-heading">Stops</h3>
                {expandedSections.stops ? (
                  <ChevronUp size={16} className="text-theme" />
                ) : (
                  <ChevronDown size={16} className="text-theme" />
                )}
              </button>
              {expandedSections.stops && (
                <div className="space-y-2">
                  {[
                    {
                      type: "non-stop",
                      label: "Nonstop",
                      count: stopsStats.nonstop,
                      percent: stopsStats.percentages.nonstop,
                    },
                    {
                      type: "one-stop",
                      label: "1 Stop",
                      count: stopsStats.onestop,
                      percent: stopsStats.percentages.onestop,
                    },
                    {
                      type: "two-stops",
                      label: "2+ Stops",
                      count: stopsStats.multistop,
                      percent: stopsStats.percentages.multistop,
                    },
                  ].map((stop) => (
                    <label
                      key={stop.type}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-sm transition group hover:bg-blue/5"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Checkbox
                          checked={selectedStops.includes(stop.type)}
                          onCheckedChange={() => handleStopChange(stop.type)}
                          className="data-[state=checked]:bg-theme data-[state=checked]:border-theme"
                        />
                        <span className="group-hover:text-theme">
                          {stop.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-light">{stop.count}</span>
                        <span className="w-8 text-[10px] text-light">
                          {stop.percent}%
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className={filterSectionClass}>
              <button
                onClick={() => toggleSection("price")}
                className={sectionToggleClass}
              >
                <h3 className="font-poppins-semibold text-sm text-heading">Price</h3>
                {expandedSections.price ? (
                  <ChevronUp size={16} className="text-theme" />
                ) : (
                  <ChevronDown size={16} className="text-theme" />
                )}
              </button>
              {expandedSections.price && (
                <div className="space-y-3">
                  <Slider
                    value={priceRange}
                    min={Math.min(
                      ...results.map((f) => parseFloat(f.total_amount || 0)),
                      0,
                    )}
                    max={Math.max(
                      ...results.map((f) => parseFloat(f.total_amount || 0)),
                      5000,
                    )}
                    step={10}
                    onValueChange={setPriceRange}
                    className="[&_[role=slider]]:bg-theme [&_[role=slider]]:border-theme"
                  />
                  <div className="flex justify-between text-xs font-medium">
                    <span className="rounded bg-blue-soft px-2 py-1 text-dark">
                      {formatPrice(priceRange[0] * totalPassengers)}
                    </span>
                    <span className="rounded bg-blue-soft px-2 py-1 text-dark">
                      {formatPrice(priceRange[1] * totalPassengers)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Duration Filter */}
            <div className={filterSectionClass}>
              <button
                onClick={() => toggleSection("duration")}
                className={sectionToggleClass}
              >
                <h3 className="font-poppins-semibold text-sm text-heading">Duration</h3>
                {expandedSections.duration ? (
                  <ChevronUp size={16} className="text-theme" />
                ) : (
                  <ChevronDown size={16} className="text-theme" />
                )}
              </button>
              {expandedSections.duration && (
                <div className="space-y-3">
                  <Slider
                    value={durationRange}
                    min={0}
                    max={48}
                    step={1}
                    onValueChange={setDurationRange}
                    className="[&_[role=slider]]:bg-theme [&_[role=slider]]:border-theme"
                  />
                  <div className="flex justify-between text-xs font-medium">
                    <span className="rounded bg-blue-soft px-2 py-1 text-dark">
                      {formatDuration(durationRange[0])}
                    </span>
                    <span className="rounded bg-blue-soft px-2 py-1 text-dark">
                      {formatDuration(durationRange[1])}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Time of Day Filter */}
            <div className={filterSectionClass}>
              <button
                onClick={() => toggleSection("timeOfDay")}
                className={sectionToggleClass}
              >
                <h3 className="font-poppins-semibold text-sm text-heading">
                  Departure Time
                </h3>
                {expandedSections.timeOfDay ? (
                  <ChevronUp size={16} className="text-theme" />
                ) : (
                  <ChevronDown size={16} className="text-theme" />
                )}
              </button>
              {expandedSections.timeOfDay && (
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: "morning",
                      label: "Morning",
                      icon: Sun,
                      count: timeOfDayStats.morning,
                      time: "5am - 12pm",
                    },
                    {
                      id: "afternoon",
                      label: "Afternoon",
                      icon: Sunset,
                      count: timeOfDayStats.afternoon,
                      time: "12pm - 5pm",
                    },
                    {
                      id: "evening",
                      label: "Evening",
                      icon: Moon,
                      count: timeOfDayStats.evening,
                      time: "5pm - 9pm",
                    },
                    {
                      id: "night",
                      label: "Night",
                      icon: Clock,
                      count: timeOfDayStats.night,
                      time: "9pm - 5am",
                    },
                  ].map(({ id, label, icon: Icon, count, time }) => (
                    <button
                      key={id}
                      onClick={() => handleTimeOfDayChange(id)}
                      className={`rounded-lg border p-2 text-left transition-all ${
                        selectedTimeOfDay.includes(id)
                          ? "border-theme bg-theme-light shadow-card"
                          : "border-subtle bg-white hover:border-theme/30 hover:bg-blue/5"
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Icon
                          size={14}
                          className={
                            selectedTimeOfDay.includes(id)
                              ? "text-theme"
                              : "text-light"
                          }
                        />
                        <span className="text-xs font-medium text-dark">
                          {label}
                        </span>
                      </div>
                      <p className="text-[10px] text-light">{time}</p>
                      <p className="text-[10px] font-medium text-dark mt-1">
                        {count} flights
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Airlines Filter */}
            <div className={filterSectionClass}>
              <button
                onClick={() => toggleSection("airlines")}
                className={sectionToggleClass}
              >
                <h3 className="font-poppins-semibold text-sm text-heading">Airlines</h3>
                {expandedSections.airlines ? (
                  <ChevronUp size={16} className="text-theme" />
                ) : (
                  <ChevronDown size={16} className="text-theme" />
                )}
              </button>
              {expandedSections.airlines && (
                <div className="space-y-1.5">
                  {airlines.map((airline) => (
                    <label
                      key={airline.name}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-sm transition group hover:bg-blue/5"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Checkbox
                          checked={selectedAirlines.includes(airline.name)}
                          onCheckedChange={() =>
                            handleAirlineChange(airline.name)
                          }
                          className="data-[state=checked]:bg-theme data-[state=checked]:border-theme"
                        />
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-theme/10 px-1 text-[8px] font-semibold uppercase leading-none text-dark">
                          {airline.name.slice(0, 2)}
                        </span>
                        <span className="group-hover:text-theme truncate text-dark">
                          {airline.name}
                        </span>
                      </div>
                      <span className="text-xs text-light ml-2">
                        {airline.count}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Amenities Filter */}
            {availableAmenities.length > 0 && (
              <div className={filterSectionClass}>
                <button
                  onClick={() => toggleSection("amenities")}
                  className={sectionToggleClass}
                >
                  <h3 className="font-poppins-semibold text-sm text-heading">Amenities</h3>
                  {expandedSections.amenities ? (
                    <ChevronUp size={16} className="text-theme" />
                  ) : (
                    <ChevronDown size={16} className="text-theme" />
                  )}
                </button>
                {expandedSections.amenities && (
                  <div className="grid grid-cols-2 gap-2">
                    {availableAmenities.map((amenity) => (
                      <label
                        key={amenity}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-blue/5"
                      >
                        <Checkbox
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => handleAmenityChange(amenity)}
                          className="data-[state=checked]:bg-theme data-[state=checked]:border-theme"
                        />
                        <span className="capitalize text-dark">{amenity}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Flexibility Options */}
            <div className={filterSectionClass}>
              <button
                onClick={() => toggleSection("flexibility")}
                className={sectionToggleClass}
              >
                <h3 className="font-poppins-semibold text-sm text-heading">Flexibility</h3>
                {expandedSections.flexibility ? (
                  <ChevronUp size={16} className="text-theme" />
                ) : (
                  <ChevronDown size={16} className="text-theme" />
                )}
              </button>
              {expandedSections.flexibility && (
                <div className="space-y-2">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-blue/5">
                    <Checkbox
                      checked={refundableOnly}
                      onCheckedChange={() => setRefundableOnly(!refundableOnly)}
                      className="data-[state=checked]:bg-theme data-[state=checked]:border-theme"
                    />
                    <span className="text-dark">Refundable only</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-blue/5">
                    <Checkbox
                      checked={changeableOnly}
                      onCheckedChange={() => setChangeableOnly(!changeableOnly)}
                      className="data-[state=checked]:bg-theme data-[state=checked]:border-theme"
                    />
                    <span className="text-dark">Changeable only</span>
                  </label>
                </div>
              )}
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={handleApplyFilters}
              className="w-full rounded-lg bg-blue px-4 py-3 font-poppins-semibold text-white shadow-button transition-all hover:bg-blue-dark"
            >
              Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            {/* Active Filters Summary */}
            {activeFilterCount > 0 && (
              <div className="text-xs text-light text-center border-t border-gray-100 pt-3">
                <p>
                  {selectedStops.length > 0 &&
                    `${selectedStops.length} stop filters • `}
                  {selectedAirlines.length > 0 &&
                    `${selectedAirlines.length} airlines • `}
                  {selectedTimeOfDay.length > 0 &&
                    `${selectedTimeOfDay.length} time slots`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
