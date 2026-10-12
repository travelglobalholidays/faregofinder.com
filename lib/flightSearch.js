import axiosInstance from "./axiosInstance";
import { normalizeFlightOffers } from "./flightSearchUrl";

export const toFlightSearchPayload = (search) => ({
  origin: search.origin,
  destination: search.destination,
  departureDate: search.departureDate,
  returnDate: search.tripType === "roundtrip" ? search.returnDate : null,
  tripType: search.tripType,
  passengers: search.passengers,
  cabinClass: search.cabinClass === "first_class" ? "first" : search.cabinClass,
});

export const searchFlights = async (search, options = {}) => {
  const response = await axiosInstance.post("/flights/search", toFlightSearchPayload(search), options);
  const offers = normalizeFlightOffers(response);
  const expectedPassengers = search.passengers.adults + search.passengers.children + search.passengers.infants;
  if (offers.some((offer) => Array.isArray(offer.passengers) && offer.passengers.length !== expectedPassengers)) {
    throw new Error(`The booking service returned fares for a different number of travelers than the ${expectedPassengers} selected. Please try again or call for booking assistance.`);
  }
  return offers;
};

export const flightSearchKey = (search) => JSON.stringify(toFlightSearchPayload(search));
