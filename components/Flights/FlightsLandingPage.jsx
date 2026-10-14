import FlightSearchForm from "@/components/FlightSearchForm";
import Navbar from "@/components/Headers/Navbar";
import { CONTACT_INFO } from "@/config/ContactInfo";
import { Headphones, Lock, PhoneCall, Users } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { AgentCall, asset, CallActions, CallBar } from "./FlightsCallContent";
import FlightsFooter from "./FlightsFooter";
import FlightsMobileModal from "./FlightsMobileModal";

const services = [
  [
    PhoneCall,
    "One Conversation, More Options",
    "Tell us your destination and dates. Get help comparing flight options that fit your plans and budget.",
  ],
  [
    Lock,
    "Clear Information Before You Book",
    "Review your itinerary, total price, and fare conditions before confirming your reservation.",
  ],
  [
    Headphones,
    "Support for Your Journey",
    "Get answers about a booking or the steps to request changes and cancellations.",
  ],
  [
    Users,
    "Travel That Fits Your Plans",
    "Organize flights for family trips, weekend getaways, and business travel around your needs.",
  ],
];
const sections = [
  [
    "Flight Search and Airline Tickets",
    [
      "Start by entering your departure and arrival airports and travel dates. Compare available itineraries, journey times, connections, and arrival schedules before choosing a flight.",
      "Consider the total fare alongside the route details. The choice between nonstop and connecting flights depends on your schedule, budget, and travel preferences.",
    ],
  ],
  [
    "Compare Flight Fares",
    [
      "If your plans are flexible, explore nearby dates and compare the total cost of each itinerary. Prices depend on availability and provider conditions, and the lowest fare is not guaranteed.",
      "Check what each fare includes. Baggage, seat selection, and other services may cost extra, so a lower starting price may not mean a lower total trip cost.",
    ],
  ],
  [
    "Domestic and International Flight Bookings",
    [
      "Review airports, schedules, and passenger details for every journey. For connecting flights, allow time between departures and consider any terminal or airport changes.",
      "Before confirming, check that passenger names match travel documents. For international journeys, review the entry and transit requirements for your itinerary.",
    ],
  ],
  [
    "Baggage, Seats, and Cabin Classes",
    [
      "Carry-on and checked baggage allowances vary by ticket. Review the applicable limits and any additional charges before preparing for your trip.",
      "Economy, premium economy, business, and first class may include different services. Compare fare information and seat availability with your needs and budget.",
    ],
  ],
  [
    "Flight Changes, Cancellations, and Refunds",
    [
      "If you need to change a booking, have your reservation reference and preferred new dates ready. Changes depend on availability and may involve fare differences and ticket-related fees.",
      "Cancellation and refund options depend on the booking rules. Review eligibility for a refund, travel credit, or another option, together with the required steps and processing times.",
    ],
  ],
  [
    "Independent Flight Booking Assistance",
    [
      "FaresGoFinder provides flight search and independent booking assistance. We are not an airline or its official customer service and do not represent any airline. Our team helps you review reservation options and itineraries.",
      "When requesting help, gather your trip details and explain what you need. Availability, travel conditions, and decisions about changes or refunds depend on the relevant providers and ticket rules.",
    ],
  ],
  [
    "Prepare for Your Next Flight",
    [
      "Use the search form to enter your route, travel dates, passenger count, and cabin class. Compare these details when planning a getaway, family vacation, or business trip.",
      "Before booking, confirm your complete itinerary, total price, and applicable conditions. Fares and availability may change until your reservation is confirmed.",
    ],
  ],
];

export default function FlightsLandingPage({ content }) {
  const {
    heading,
    mobileHeading = heading,
    subheading,
    promoDescription,
    popupDescription,
    callLabel,
    agentHeading,
    campaign,
    campaignKey,
    sections: pageSections = sections,
  } = content;
  return (
    <div
      lang="en"
      className="pb-[calc(96px_+_env(safe-area-inset-bottom))] md:pb-0"
    >
      <CallBar label={callLabel} />
      <section
        className="bg-white px-4 pb-5 pt-24 md:hidden"
        // aria-label="Flight booking phone assistance"
      >
        <h2 className="mb-4 rounded-md bg-blue px-3 py-3 text-center text-xl text-white">
          {mobileHeading}
        </h2>
        <Image
          src="/images/Generic-Banner.png"
          alt="Flight travel and booking options"
          width={500}
          height={300}
          className="mb-4 h-auto w-full rounded-md"
          loading="eager"
        />
        <CallActions />
        <Image
          src={asset("airline-generic.png")}
          alt="Fly to your next destination"
          width={500}
          height={300}
          className="my-5 h-auto w-full rounded-md"
        />
        <h3 className="text-center text-xl text-heading">
          Plan Your Booking by Phone
        </h3>
        <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm text-body">
          <span>Review fare conditions</span>
          <span>Compare your options</span>
        </div>
        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-blue/30" />
        <AgentCall heading={agentHeading} />
        <p className="rounded-md bg-theme-soft p-4 text-center text-sm">
          {promoDescription}
        </p>
      </section>
      <CallBar bottom label={callLabel} />
      <div className="hidden md:block">
        <Navbar compact />
      </div>
      <main>
        <section id="flight-search" className="bg-theme px-4 py-8 md:py-10">
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-xs font-medium text-white/90">
              Independent Travel Assistance
            </p>
            <h1 className="text-2xl font-semibold leading-tight text-white md:text-[30px]">
              {heading}
            </h1>
            <p className="mb-6 mt-3 max-w-3xl text-sm leading-relaxed text-white/90 md:text-base">
              {subheading}
            </p>
            <Suspense>
              <FlightSearchForm
                compact
                initialValues={{ tripType: "Roundtrip" }}
              />
            </Suspense>
            <a
              href={CONTACT_INFO.phoneHref}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-white"
            >
              Prefer to book by phone? Call {CONTACT_INFO.phoneDisplay}
            </a>
          </div>
        </section>
        <section
          id="why-choose-us"
          className="border-y border-subtle bg-white px-4 py-8 md:py-10"
        >
          <div className="mx-auto grid max-w-7xl gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(([Icon, title, description]) => (
              <article key={title} className="flex flex-col items-start">
                <span className="mb-3 flex size-10 items-center justify-center rounded-md bg-theme-soft text-theme">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-base font-semibold text-heading">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="flight-information"
          aria-label="Flight and booking information"
          className="bg-white px-4 py-8 md:py-10"
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {pageSections.map(([title, paragraphs]) => (
              <article
                key={title}
                className="border-b border-subtle pb-6 last:border-0"
              >
                <h2 className="text-xl font-semibold text-heading">{title}</h2>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-sm text-body">
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>
      </main>
      <FlightsFooter />
      {campaign && (
        <FlightsMobileModal
          key={campaignKey}
          heading={heading}
          description={popupDescription}
          agentHeading={agentHeading}
        />
      )}
    </div>
  );
}
