import { getFlightLandingContent } from "./flightLandingContent";

export const flightRouteContent = {
  "airline-reserrvations": {
    topic: "Airline Reservations",
    description: "Explore airline reservations for domestic and international trips. Compare flight schedules, fares, and ticket conditions with independent booking assistance.",
    sections: [
      ["Airline Reservations for Your Next Trip", [
        "Plan an airline reservation by choosing your departure airport, destination, travel dates, and passenger count. Compare available flights and select an itinerary that fits your travel plans.",
        "Review departure and arrival times, connections, and the complete fare before confirming. Reservation availability and ticket prices can change until your booking is confirmed.",
      ]],
      ["Compare Airline Reservation Options", [
        "Compare nonstop and connecting flights alongside cabin classes and fare types. Consider the journey time and included services when reviewing reservation options.",
        "If your schedule allows, search nearby dates or airports. Check the full itinerary and any airport transfers before choosing an alternative route.",
      ]],
      ["Passenger Details and Booking Confirmation", [
        "Enter passenger names as they appear on travel documents and check contact details before submitting your reservation. Accurate details help you receive booking information and itinerary updates.",
        "After confirmation, review your booking reference, flight dates, airports, and ticket details. Keep the confirmation available for check-in and future booking requests.",
      ]],
      ["Baggage and Seats for Airline Reservations", [
        "Baggage allowances and seat selection depend on the airline, route, and ticket type. Review carry-on limits, checked baggage charges, and seat options before booking.",
        "For trips with multiple flights, check the conditions for each part of your journey. Additional services may have separate charges and availability requirements.",
      ]],
      ["Changes and Cancellations for Reservations", [
        "If your plans change, review the fare rules attached to your reservation. Date changes may involve a fare difference or fees and depend on available flights.",
        "Cancellation, refund, and travel credit options vary by ticket and provider. Have your booking reference ready when requesting assistance with an existing reservation.",
      ]],
    ],
  },
  "cheap-flight-deals": {
    topic: "Cheap Flight Deals",
    description: "Explore cheap flight deals by comparing travel dates, routes, and total fares. Review baggage costs and booking conditions to find options that fit your budget.",
    sections: [
      ["Explore Cheap Flight Deals", [
        "Search your preferred route and travel dates to compare available flight deals. Consider the total ticket price, flight schedule, and included services when choosing a budget-friendly itinerary.",
        "Flight deals depend on seat availability, travel dates, and fare conditions. Prices may change, and a particular fare or saving is not guaranteed.",
      ]],
      ["Flexible Dates and Flight Deals", [
        "If your travel plans are flexible, compare departures and returns on nearby dates. Different travel days may offer different fares for the same destination.",
        "Compare nearby airports as well, while accounting for transport costs and travel time. An alternative airport only helps your budget when the complete trip works for you.",
      ]],
      ["Compare the Total Cost of a Flight Deal", [
        "Review baggage, seat selection, and other optional charges alongside the advertised fare. The lowest starting fare may include fewer services than another ticket.",
        "Check the full price for all passengers before confirming. Compare similar baggage and cabin requirements to understand which flight deal suits your trip.",
      ]],
      ["Domestic and International Flight Deals", [
        "Compare domestic and international routes with your preferred schedule and budget in mind. Nonstop flights and connecting itineraries can offer different prices and journey times.",
        "For international trips, review connection times and any transit requirements. Include the practical details of the journey when comparing a lower fare.",
      ]],
      ["Fare Rules for Cheap Flight Deals", [
        "A lower-priced ticket may have restrictions on changes, cancellations, or refunds. Read the fare conditions before choosing a flight deal.",
        "If your plans are uncertain, compare the cost and conditions of more flexible fares. Any changes remain subject to availability, fare differences, and applicable fees.",
      ]],
    ],
  },
  "one-way": {
    topic: "One-Way Flights",
    description: "Compare one-way flights for trips without a fixed return date. Explore routes, schedules, total ticket prices, and fare conditions before booking.",
    sections: [
      ["Plan Your One-Way Flight", [
        "A one-way flight covers travel to your destination without a return flight in the same itinerary. It can suit trips with an open return date or travel that continues to another destination.",
        "Enter your departure airport, arrival airport, and departure date to compare available flights. Select the one-way option in the search form when planning this type of journey.",
      ]],
      ["Compare One-Way Flight Fares", [
        "Review one-way fares across available schedules and nearby dates. Compare the total price alongside journey time, connections, and ticket inclusions.",
        "One-way tickets are not always priced as half of a round-trip fare. If you already know your return plans, compare both booking options before deciding.",
      ]],
      ["Nonstop and Connecting One-Way Flights", [
        "Choose between nonstop routes and connecting flights based on your schedule and budget. Check each departure time and allow suitable time for connections.",
        "Review terminal changes, airport transfers, and baggage arrangements when comparing itineraries. These details can affect the overall cost and convenience of your journey.",
      ]],
      ["International One-Way Travel", [
        "Before booking an international one-way flight, review the destination and transit requirements that apply to your trip and travel documents.",
        "Some destinations or providers may require evidence of onward or return travel. Confirm the requirements for your itinerary before purchasing your ticket.",
      ]],
      ["Baggage and Changes for One-Way Tickets", [
        "Check carry-on and checked baggage allowances for your chosen one-way fare. Seat selection and other optional services may cost extra.",
        "If your departure plans change, the available options depend on the ticket rules. Changes, cancellations, and refunds may involve restrictions or additional charges.",
      ]],
    ],
  },
  "round-trip": {
    topic: "Round-Trip Flights",
    description: "Explore round-trip flights with departure and return dates that fit your plans. Compare complete itineraries, total fares, and ticket conditions.",
    sections: [
      ["Plan Your Round-Trip Flight", [
        "A round-trip itinerary includes an outbound journey and a return journey. Enter your departure and destination airports together with both travel dates to compare options.",
        "Review the schedule for each direction and confirm that the return date suits your plans. Check the complete journey before choosing a round-trip ticket.",
      ]],
      ["Compare Round-Trip Fares", [
        "Compare the total fare for both journeys, including baggage and any optional services you need. Review cabin classes and ticket conditions alongside the price.",
        "If your dates are flexible, try different departure and return combinations. Prices vary with availability, and a round-trip ticket is not always cheaper than separate one-way bookings.",
      ]],
      ["Outbound and Return Flight Schedules", [
        "Check departure times, arrival dates, and connections separately for the outbound and return journeys. Overnight flights and time zone differences can affect your schedule.",
        "Allow time for transfers and review any airport or terminal changes. Make sure both parts of the itinerary fit your accommodation and onward travel plans.",
      ]],
      ["Baggage and Seats on Round-Trip Flights", [
        "Baggage and seat options can differ between the outbound and return flights. Check the allowances and services shown for each part of your itinerary.",
        "Include any extra baggage or seat charges when comparing the full trip cost. Confirm passenger details and preferences before completing your booking.",
      ]],
      ["Changing or Cancelling a Round-Trip Ticket", [
        "Review the rules for changing either part of a round-trip booking. Availability, fare differences, and ticket fees may affect the cost of a new itinerary.",
        "If you cannot take a scheduled flight, check how that affects the remaining flights on the ticket. Cancellation and refund options depend on the applicable fare and provider conditions.",
      ]],
    ],
  },
  "cheap-flight-ticket": {
    topic: "Cheap Flight Tickets",
    description: "Compare cheap flight ticket options for domestic and international travel. Check total prices, baggage allowances, schedules, and fare rules before booking.",
    sections: [
      ["Find Cheap Flight Ticket Options", [
        "Search your route and travel dates to explore flight tickets within your budget. Compare available departures, cabin classes, and total prices before choosing an itinerary.",
        "Ticket prices depend on availability and fare conditions. A low fare may change before confirmation, and the cheapest ticket is not guaranteed for every route or date.",
      ]],
      ["Compare Ticket Prices Across Travel Dates", [
        "Explore nearby departure dates if your plans allow flexibility. Comparing several dates can help you understand the available ticket prices for your destination.",
        "For trips with a return journey, compare round-trip fares and separate one-way tickets. Include the conditions and full cost of each option in your decision.",
      ]],
      ["What Is Included in a Cheap Flight Ticket?", [
        "Check whether your fare includes carry-on baggage, checked bags, and seat selection. Optional services can add to the ticket price.",
        "Compare tickets with similar travel requirements so you can assess the total cost. Review the price for all passengers and flight segments before confirming.",
      ]],
      ["Choosing Routes and Cabin Classes", [
        "Compare nonstop and connecting flights with your preferred arrival time and travel budget. A lower-priced route may involve a longer journey or additional transfers.",
        "Review cabin class and fare type together. Different tickets within the same cabin may offer different baggage allowances and flexibility.",
      ]],
      ["Cheap Ticket Changes and Refund Conditions", [
        "Read the change and cancellation rules before purchasing a lower-priced ticket. Some fares offer limited flexibility or may not be eligible for a refund.",
        "Consider your travel plans when comparing flexible and restricted tickets. Any later changes depend on availability and may involve fees or fare differences.",
      ]],
    ],
  },
};

export function getFlightRouteContent(slug, query = {}) {
  const route = Object.hasOwn(flightRouteContent, slug) ? flightRouteContent[slug] : null;
  if (!route) return null;

  const queryTopic = Array.isArray(query.qstr) ? query.qstr[0] : query.qstr;
  const hasQueryTopic = typeof queryTopic === "string" && queryTopic.trim();
  const content = getFlightLandingContent({ ...query, qstr: hasQueryTopic ? queryTopic : route.topic });

  return {
    ...content,
    mobileHeading: "Airline Reservation",
    heading: hasQueryTopic ? content.heading : route.topic,
    subheading: hasQueryTopic ? content.subheading : route.description,
    campaignKey: JSON.stringify([slug, content.campaignKey]),
    sections: [
      ...route.sections,
      [`Independent Booking Assistance for ${route.topic}`, [
        "FaresGoFinder provides independent flight search and booking assistance. We are not an airline or its official customer service and do not represent any airline.",
        `For help with ${route.topic.toLowerCase()}, have your route, dates, and passenger details ready. Our team can help you review itinerary options and applicable booking conditions.`,
      ]],
      [`Before Booking ${route.topic}`, [
        "Confirm passenger names, travel dates, airports, and the full itinerary before booking. Review the total price and applicable fare rules together with your baggage requirements.",
        "Use the search form or contact our travel team to explore available options. Fares and availability may change until your reservation is confirmed.",
      ]],
    ],
  };
}
