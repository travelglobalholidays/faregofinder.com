import { CONTACT_INFO } from "@/config/ContactInfo";

const reviewItems = [
  "Exact passenger names and dates must be reviewed before ticketing.",
  "Airport codes, layover length, cabin type, and total travel time can affect the trip experience.",
  "Baggage, change, cancellation, and refund rules may differ even when fares look similar.",
  "A fare is final only after the airline or supplier confirms and issues the ticket.",
];

const faqs = [
  {
    question: "Is FaresGoFinder an airline?",
    answer:
      "No. FaresGoFinder is an independent travel assistance service. We help review fare and itinerary options, but we do not operate flights or control airline services.",
  },
  {
    question: "When is my fare locked?",
    answer:
      "A fare is locked only after the airline or supplier confirms the booking and issues the applicable confirmation or ticket details.",
  },
  {
    question: "Why should I compare fare rules?",
    answer:
      "Two fares for the same route can include different baggage, refund, change, or seat conditions. Reviewing rules helps avoid surprises later.",
  },
  {
    question: "What should I review before payment?",
    answer:
      "Review passenger names, travel dates, airports, fare rules, baggage information, cancellation terms, and the total amount before authorizing payment.",
  },
];

export default function BookFlightsDescription() {
  return (
    <section className="bg-[var(--surface-muted)] px-4 py-10 md:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <article className="space-y-7">
          <div>
            <h2 className="text-[30px] font-semibold leading-tight text-dark">
              Book Flights With Fare Review Support
            </h2>
            <div className="mt-3 space-y-3">
              <p className="text-sm leading-relaxed text-body">
                <strong>{CONTACT_INFO.brandName}</strong> helps travelers look
                at the full picture before booking. We assist with fare review,
                route comparison, schedule details, baggage conditions, and
                booking steps so the trip decision is based on more than price
                alone.
              </p>
              <p className="text-sm leading-relaxed text-body">
                We are not an airline and do not control airline inventory.
                Schedules, prices, baggage rules, refunds, cancellations, and
                seat availability remain subject to the applicable airline or
                travel supplier.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-dark">
              How Fare Review Assistance Works
            </h3>
            <div className="mt-3 space-y-3">
              <p className="text-sm leading-relaxed text-body">
                Start by sharing your departure city, destination, dates,
                passenger count, preferred cabin, and schedule needs. Our team
                can help review available options and explain the practical
                differences between fares.
              </p>
              <p className="text-sm leading-relaxed text-body">
                Before payment, travelers should review the total amount, exact
                itinerary, fare restrictions, and airline rules. A reservation
                is confirmed only after the airline or supplier issues the
                applicable confirmation.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-dark">
              Details Worth Checking Before Payment
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-body">
              {reviewItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-dark">
              Independent And Transparent Support
            </h3>
            <div className="mt-3 space-y-3">
              <p className="text-sm leading-relaxed text-body">
                FaresGoFinder provides travel assistance without implying
                airline ownership or official airline status. Airline names and
                trademarks may appear only to identify itinerary options and
                remain the property of their respective owners.
              </p>
              <p className="text-sm leading-relaxed text-body">
                Additional charges may apply for baggage, seat selection,
                changes, cancellations, service assistance, or optional airline
                services. Customers should review all charges and policies
                before confirming a booking.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold text-dark">
              Flight Fare FAQs
            </h3>
            <div className="mt-4 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-t border-black/10 pt-4">
                  <h4 className="text-base font-semibold text-dark">
                    {faq.question}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-body">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
