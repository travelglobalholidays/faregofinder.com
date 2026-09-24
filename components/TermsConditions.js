import { CONTACT_INFO } from "@/config/ContactInfo";

export default function TermsConditions() {
  return (
    <article className="max-w-none space-y-5 leading-7">
      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Terms & Conditions
        </h2>
        <p>
          These Terms & Conditions apply when you use {CONTACT_INFO.domain},
          request fare review assistance, contact our team, or authorize a
          travel-related transaction through {CONTACT_INFO.brandName}. Please
          read them before using our services.
        </p>
        <p>
          {CONTACT_INFO.brandName} is an independent travel assistance service,
          not an airline. We help with fare searches, itinerary review, booking
          requests, change guidance, cancellation questions, and customer
          support connected to travel arrangements.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Our Independent Role
        </h2>
        <p>
          We review information made available through airlines, booking
          systems, consolidators, and travel suppliers. Those providers control
          inventory, fares, schedules, baggage rules, seat availability, and
          carrier policies.
        </p>
        <p>
          Our role is to help you understand available options and submit a
          booking request when authorized. A fare, seat, route, schedule, or
          service is not guaranteed until the airline or supplier confirms it.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Booking Requests And Confirmations
        </h2>
        <p>
          Submitting a request does not create a confirmed reservation. A
          booking is confirmed only after the airline or supplier issues a
          confirmation number, ticket number, e-ticket, or written confirmation.
          You must review passenger names, dates, airports, contact details,
          travel documents, baggage rules, and fare conditions before payment.
        </p>
        <p>
          Passenger names must match the identification or passport used for
          travel. Corrections, date changes, routing changes, exchanges, and
          reissues may be restricted and may involve airline or service charges.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Pricing, Taxes, Fees, And Service Charges
        </h2>
        <p>
          A quote may include base fare, taxes, carrier-imposed charges,
          supplier fees, and service fees charged by {CONTACT_INFO.brandName}
          for assistance. We aim to disclose known charges before payment, but
          final pricing is confirmed only at ticketing.
        </p>
        <p>
          Optional costs may apply for baggage, seats, priority boarding, meals,
          insurance, upgrades, exchanges, refund processing, or airline add-ons.
          These costs are usually set by the airline or supplier.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Payment Authorization
        </h2>
        <p>
          By providing payment information, you authorize us or our payment
          processor to charge the amount disclosed for the selected service.
          Third-party payment providers may process the transaction. Identity,
          billing, or fraud-prevention checks may be required before a booking
          is completed.
        </p>
        <p>
          If payment is declined, reversed, flagged, delayed, or incomplete, the
          requested fare may change or become unavailable.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Changes, Cancellations, Credits, And Refunds
        </h2>
        <p>
          Changes, cancellations, refunds, and credits are governed by airline
          fare rules, supplier policies, and applicable fees. Some tickets are
          non-refundable or may qualify only for future travel credit.
        </p>
        <p>
          Refunds, when allowed, are processed only after airline or supplier
          approval. Review our Cancellation & Refund Policy for more detail.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Traveler Responsibilities
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Review all itinerary and passenger details before purchase.</li>
          <li>
            Carry valid identification, passport, visa, and required travel
            documents.
          </li>
          <li>
            Check airline baggage rules, check-in deadlines, and travel
            advisories.
          </li>
          <li>Arrive at the airport within the airline's recommended time.</li>
          <li>Contact us promptly if any booking detail appears incorrect.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Third-Party Providers
        </h2>
        <p>
          Airlines, hotels, car rental companies, insurance providers, and other
          travel suppliers are independent businesses. Their terms, conditions,
          and policies apply to the services they provide.{" "}
          {CONTACT_INFO.brandName} is not responsible for airline delays,
          cancellations, schedule changes, denied boarding, baggage decisions,
          government restrictions, weather events, or supplier service failures.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Website Use
        </h2>
        <p>
          You agree not to misuse this website, submit false information,
          interfere with website functionality, attempt unauthorized access, or
          use our content for unlawful or misleading purposes. Website content
          is provided for general travel assistance and may change without
          notice.
        </p>
      </div>

      <div className="space-y-2 border-t border-neutral-200 pt-6">
        <h2 className="font-heading text-xl font-medium text-dark">
          Contact
        </h2>
        <p>
          For questions about these Terms & Conditions, contact{" "}
          {CONTACT_INFO.brandName} at{" "}
          <a
            href={CONTACT_INFO.emailHref}
            className="font-medium text-theme hover:text-theme2"
          >
            {CONTACT_INFO.email}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
