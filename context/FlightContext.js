"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);

  // ✅ Load persisted data when app starts
  useEffect(() => {
    try {
      const savedSearch = sessionStorage.getItem("searchData");
      const savedResults = sessionStorage.getItem("results");
      const savedFiltered = sessionStorage.getItem("filteredResults");
      const savedSelected = sessionStorage.getItem("selectedFlight");

      if (savedSearch) setSearchData(JSON.parse(savedSearch));
      if (savedResults) setResults(JSON.parse(savedResults));
      if (savedFiltered) setFilteredResults(JSON.parse(savedFiltered));
      if (savedSelected) setSelectedFlight(JSON.parse(savedSelected));
    } catch (err) {
      console.error("⚠️ Error loading flight data from sessionStorage:", err);
    }
  }, []);

  // ✅ Persist every time data changes
  useEffect(() => {
    if (searchData)
      sessionStorage.setItem("searchData", JSON.stringify(searchData));
  }, [searchData]);

  useEffect(() => {
    if (results?.length)
      sessionStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    sessionStorage.setItem(
      "filteredResults",
      JSON.stringify(filteredResults || [])
    );
  }, [filteredResults]);

  useEffect(() => {
    if (selectedFlight)
      sessionStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));
  }, [selectedFlight]);

  // ✅ Optional: Clear data if user manually logs out or leaves (helper)
  const clearFlightData = () => {
    sessionStorage.removeItem("searchData");
    sessionStorage.removeItem("results");
    sessionStorage.removeItem("filteredResults");
    sessionStorage.removeItem("selectedFlight");
    setSearchData(null);
    setResults([]);
    setFilteredResults([]);
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
