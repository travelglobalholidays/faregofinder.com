import { decryptSearchParams, encryptSearchParams } from "./encryption";

const normalizeTripType = (value) =>
  value === "roundtrip" || value === "round-trip" || value === "Roundtrip"
    ? "roundtrip"
    : "oneway";

const toPositiveInt = (value, fallback) => {
  const number = Number.parseInt(value, 10);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
};

const validDate = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const validSearch = (search) => {
  const counts = search.passengers;
  return /^[A-Z]{3}$/.test(search.origin || "") && /^[A-Z]{3}$/.test(search.destination || "") &&
    search.origin !== search.destination && validDate(search.departureDate) &&
    Object.values(counts).every((count) => Number.isInteger(count) && count >= 0) && counts.adults >= 1 &&
    counts.adults + counts.children + counts.infants <= 9 &&
    (search.tripType !== "roundtrip" || (validDate(search.returnDate) && search.returnDate >= search.departureDate));
};

export const buildFlightResultUrl = (searchData) => {
  return `/flights/result?q=${encryptSearchParams(searchData)}`;
};

export const parseFlightSearchParams = (searchParams) => {
  const params =
    searchParams instanceof URLSearchParams
      ? searchParams
      : new URLSearchParams(searchParams || "");

  if (params.has("q")) {
    const search = decryptSearchParams(params.get("q"));
    if (!search) return null;
    const passengers = search.passengers || { adults: 1, children: 0, infants: 0 };
    const tripType = normalizeTripType(search.tripType);
    const restored = { ...search, passengers, tripType, returnDate: tripType === "roundtrip" ? search.returnDate : null };
    return validSearch(restored) ? restored : null;
  }

  const origin = params.get("from")?.toUpperCase();
  const destination = params.get("to")?.toUpperCase();
  const departureDate = params.get("depart") || params.get("departureDate");

  if (!origin || !destination || !departureDate) return null;

  const tripType = normalizeTripType(params.get("trip") || params.get("tripType"));
  const returnDate =
    tripType === "roundtrip"
      ? params.get("return") || params.get("returnDate")
      : null;

  const restored = {
    origin,
    destination,
    departureDate,
    returnDate,
    tripType,
    passengers: {
      adults: toPositiveInt(params.get("adults"), 1) || 1,
      children: toPositiveInt(params.get("children"), 0),
      infants: toPositiveInt(params.get("infants"), 0),
    },
    cabinClass: params.get("cabin") || params.get("class") || "economy",
  };
  return validSearch(restored) ? restored : null;
};

export const normalizeFlightOffers = (response) => {
  if (response?.data?.data) {
    if (Array.isArray(response.data.data)) return response.data.data;
    if (Array.isArray(response.data.data.offers)) return response.data.data.offers;
    if (response.data.data.id) return [response.data.data];
  }

  if (Array.isArray(response?.data?.offers)) return response.data.offers;
  if (Array.isArray(response?.data)) return response.data;
  if (response?.data?.id) return [response.data];

  return [];
};
