"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Is FaresGoFinder an airline?",
    answer:
      "No. FaresGoFinder is an independent travel assistance service. We do not own, operate, or control any flights.",
  },
  {
    question: "Can FaresGoFinder help me compare flight options?",
    answer:
      "Yes. Our team can help travelers explore available airlines, routes, schedules, travel duration, and fare options based on their requirements.",
  },
  {
    question: "Who controls flight schedules and fare changes?",
    answer:
      "Flight schedules, fares, availability, baggage rules, delays, cancellations, and other airline operations are controlled by the respective airline or travel provider.",
  },
  {
    question: "Can I get help with multi-city or connecting journeys?",
    answer:
      "Yes. Travelers may contact us for general assistance with connecting routes, multi-city journeys, itinerary details, and available travel options.",
  },
  {
    question: "What should I verify before travel?",
    answer:
      "Before departure, travelers should verify flight schedules, check-in rules, baggage allowance, terminal details, travel documents, and restrictions directly with the relevant airline.",
  },
];

const FlightDealsDescription = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[var(--surface-muted)] px-4 py-10 md:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-7">
          <div>
            <h2 className="text-[30px] font-semibold leading-tight text-dark">
              Who We Are
            </h2>

            <div className="mt-3 space-y-3">
              <p className="text-sm leading-relaxed text-body">
                <strong>FaresGoFinder</strong> is an independent travel
                assistance service focused on helping travelers explore suitable
                flight options and plan their journeys with greater ease and
                confidence.
              </p>

              <p className="text-sm leading-relaxed text-body">
                We are <strong>not an airline</strong>, and we do not own,
                operate, or control any flights. We are also not affiliated with,
                endorsed by, or officially connected with any airline unless
                specifically stated otherwise. Our role is to independently
                assist travelers in exploring available flight options,
                understanding different itineraries, and planning journeys
                according to their individual travel requirements.
              </p>

              <p className="text-sm leading-relaxed text-body">
                With numerous airlines, routes, schedules, connections, fare
                options, and travel conditions available, finding a suitable
                journey can sometimes become time-consuming. FaresGoFinder aims
                to simplify this process by helping travelers review relevant
                options based on factors such as destination, preferred travel
                dates, schedules, routing, travel duration, and other
                preferences.
              </p>

              <p className="text-sm leading-relaxed text-body">
                Customers can contact our travel assistance team when they need
                help exploring available flight options or planning an
                itinerary. Our team may assist in identifying suitable travel
                choices and explaining relevant information associated with the
                available options.
              </p>

              <p className="text-sm leading-relaxed text-body">
                Our independent approach allows us to focus on the traveler's
                requirements rather than representing any particular airline.
                Depending on the requested journey, customers may be presented
                with options involving different airlines, routes, schedules, or
                connections.
              </p>

              <p className="text-sm leading-relaxed text-body">
                FaresGoFinder does not control airline inventory, schedules,
                fare changes, cancellations, delays, baggage policies, seat
                availability, or other airline operations. Such information and
                conditions are determined by the respective airline or travel
                service provider and may change at any time.
              </p>

              <p className="text-sm leading-relaxed text-body">
                Our objective is to make travel planning easier to understand by
                giving travelers access to helpful information and personalized
                assistance while allowing them to make their own informed travel
                decisions.
              </p>

              <p className="text-sm leading-relaxed text-body">
                We believe every journey is different. Whether you are planning
                a domestic trip, international journey, family vacation, business
                trip, or multi-city itinerary, our goal is to help you explore
                suitable options and organize your travel plans more
                conveniently.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-dark">
              How Our Travel Assistance Works
            </h3>

            <div className="mt-3 space-y-4">
              <div>
                <h4 className="text-[18px] font-medium text-dark">
                  Step 1: Share Your Travel Requirements
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  Start by providing your travel details, such as departure
                  city, destination, preferred travel dates, number of travelers,
                  and any other relevant preferences.
                </p>
              </div>

              <div>
                <h4 className="text-[18px] font-medium text-dark">
                  Step 2: Explore Available Travel Options
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  Based on your requirements, available flight and itinerary
                  options can be explored across relevant airlines and routes.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Our travel assistance team may help you understand different
                  choices based on factors such as:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-body">
                  <li>Available airlines</li>
                  <li>Departure and arrival times</li>
                  <li>Direct or connecting routes</li>
                  <li>Travel duration</li>
                  <li>Available fare options</li>
                  <li>General itinerary preferences</li>
                </ul>
              </div>

              <div>
                <h4 className="text-[18px] font-medium text-dark">
                  Step 3: Compare Suitable Options
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  Travelers can review and compare suitable options according to
                  their individual priorities. Some travelers may prefer shorter
                  travel times, while others may prioritize convenient departure
                  times, fewer connections, or other itinerary requirements.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  FaresGoFinder helps make these choices easier to understand.
                </p>
              </div>

              <div>
                <h4 className="text-[18px] font-medium text-dark">
                  Step 4: Plan Your Journey
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  Once suitable options have been identified, our team can assist
                  you in organizing your preferred itinerary and understanding
                  the relevant travel details.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  The final choice always remains with the traveler.
                </p>
              </div>

              <div>
                <h4 className="text-[18px] font-medium text-dark">
                  Step 5: Review Travel Information
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  Before proceeding with any travel arrangement, customers should
                  carefully review important information associated with their
                  selected option, including:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-body">
                  <li>Travel dates and times</li>
                  <li>Departure and arrival airports</li>
                  <li>Passenger details</li>
                  <li>Airline and flight information</li>
                  <li>Baggage conditions</li>
                  <li>Fare conditions and restrictions</li>
                  <li>Change or cancellation conditions, where applicable</li>
                </ul>
              </div>

              <div>
                <h4 className="text-[18px] font-medium text-dark">
                  Step 6: Proceed With Your Selected Option
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  After reviewing the available information, travelers can decide
                  whether they wish to proceed with their selected travel option
                  through the applicable airline or travel service provider.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Availability and pricing may change until an arrangement is
                  successfully confirmed by the relevant provider.
                </p>
              </div>

              <div>
                <h4 className="text-[18px] font-medium text-dark">
                  Step 7: Keep Your Travel Information
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  Once your travel arrangement has been confirmed by the
                  applicable provider, keep your itinerary, airline confirmation
                  details, and other relevant travel documents available for your
                  journey.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Where an airline confirmation or booking reference is provided,
                  travelers may use it to review applicable reservation
                  information directly with the respective airline.
                </p>
              </div>

              <div>
                <h4 className="text-[18px] font-medium text-dark">
                  Step 8: Prepare for Your Journey
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  Before departure, travelers should verify important
                  information directly with the relevant airline, including
                  flight schedules, check-in requirements, baggage allowances,
                  terminal information, travel documentation, and any applicable
                  travel restrictions.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-dark">
              Travel Assistance When You Need It
            </h3>

            <div className="mt-3 space-y-3">
              <p className="text-sm leading-relaxed text-body">
                Our team is available to help travelers understand their travel
                options and provide general assistance related to journey
                planning.
              </p>

              <p className="text-sm leading-relaxed text-body">
                Depending on the situation, customers may contact us for
                assistance with:
              </p>

              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-body">
                <li>Exploring flight options</li>
                <li>Comparing routes and schedules</li>
                <li>Understanding itinerary details</li>
                <li>Planning connecting or multi-city journeys</li>
                <li>General travel-related questions</li>
                <li>Understanding available options when travel plans change</li>
              </ul>

              <p className="text-sm leading-relaxed text-body">
                Any airline-specific changes, cancellations, refunds, credits,
                baggage matters, schedule changes, or other operational matters
                remain subject to the applicable airline's policies, fare
                conditions, and availability.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-dark">
              Important Information
            </h3>

            <div className="mt-3 space-y-3">
              <p className="text-sm leading-relaxed text-body">
                <strong>
                  FaresGoFinder is an independent travel assistance service and
                  is not an airline.
                </strong>
              </p>

              <p className="text-sm leading-relaxed text-body">
                FaresGoFinder does not own, operate, or control flights and is
                not responsible for airline operations, including schedule
                changes, delays, cancellations, baggage handling, seat
                assignments, or other services controlled by airlines.
              </p>

              <p className="text-sm leading-relaxed text-body">
                Flight schedules, fares, routes, availability, baggage
                allowances, and other travel information may change and are
                ultimately determined by the applicable airline or travel service
                provider.
              </p>

              <p className="text-sm leading-relaxed text-body">
                Airline names, logos, trademarks, and other brand identifiers
                are the property of their respective owners. Their appearance or
                reference on our website does not imply sponsorship,
                endorsement, partnership, or affiliation with FaresGoFinder.
              </p>

              <p className="text-sm leading-relaxed text-body">
                Travelers should carefully review all applicable terms, fare
                conditions, and airline policies before proceeding with any
                travel arrangement and should verify important flight information
                directly with the relevant airline before departure.
              </p>

              <p className="text-sm leading-relaxed text-body">
                <strong>
                  Our purpose is simple: to help travelers explore suitable
                  options, understand their choices, and plan their journeys with
                  greater convenience and confidence.
                </strong>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-[22px] font-semibold text-dark">
            Frequently Asked Questions
          </h3>

          <div className="mt-4 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border border-black/10 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-dark">
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-theme text-white">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-black/10 px-5 py-4">
                      <p className="text-sm leading-relaxed text-body">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightDealsDescription;
