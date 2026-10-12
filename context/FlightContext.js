"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState(null);
  const [completedSearchKey, setCompletedSearchKey] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);

  // ✅ Load persisted data when app starts
  useEffect(() => {
    try {
      const savedSearch = sessionStorage.getItem("searchData");
      const savedSelected = sessionStorage.getItem("selectedFlight");

      if (savedSearch) setSearchData(JSON.parse(savedSearch));
      if (savedSelected) setSelectedFlight(JSON.parse(savedSelected));
    } catch (err) {
      console.error("⚠️ Error loading flight data from sessionStorage:", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  // ✅ Persist every time data changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (searchData) sessionStorage.setItem("searchData", JSON.stringify(searchData));
      else sessionStorage.removeItem("searchData");
    } catch {
      // Search URLs remain usable when browser storage is unavailable.
    }
  }, [searchData, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (selectedFlight) sessionStorage.setItem("selectedFlight", JSON.stringify({ id: selectedFlight.id, total_amount: selectedFlight.total_amount, total_currency: selectedFlight.total_currency }));
      else sessionStorage.removeItem("selectedFlight");
    } catch {
      // The booking draft is stored by the API.
    }
  }, [selectedFlight, hydrated]);

  // ✅ Optional: Clear data if user manually logs out or leaves (helper)
  const clearFlightData = () => {
    sessionStorage.removeItem("searchData");
    sessionStorage.removeItem("results");
    sessionStorage.removeItem("filteredResults");
    sessionStorage.removeItem("selectedFlight");
    setSearchData(null);
    setResults([]);
    setFilteredResults(null);
    setCompletedSearchKey(null);
    setError("");
    setSelectedFlight(null);
  };

  return (
    <FlightContext.Provider
      value={{
        searchData,
        setSearchData,
        results,
        setResults,
        filteredResults,
        setFilteredResults,
        completedSearchKey,
        setCompletedSearchKey,
        hydrated,
        loading,
        setLoading,
        error,
        setError,
        selectedFlight,
        setSelectedFlight,
        clearFlightData,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => useContext(FlightContext);
