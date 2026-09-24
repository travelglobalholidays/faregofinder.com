import { CONTACT_INFO } from "@/config/ContactInfo";

export default function FulfillmentPolicy() {
  return (
    <article className="max-w-none space-y-5 leading-7">
      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Fulfillment Policy
        </h2>
        <p>
          This Fulfillment Policy explains how {CONTACT_INFO.brandName} handles
          fare review assistance, booking requests, confirmation delivery, and
          post-booking communication. Our services are fulfilled electronically
          through email, phone support, supplier systems, and airline or travel
          provider confirmations.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          How Booking Support Is Fulfilled
        </h2>
        <p>
          After a customer submits a request or speaks with our team, we review
          available options using the trip details provided. A booking request
          is fulfilled only when the airline or supplier confirms the
          reservation and, where applicable, issues a ticket number or booking
          reference.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Delivery Of Confirmations And Travel Documents
        </h2>
        <p>
          Confirmations, itineraries, e-tickets, receipts, or travel documents
          are normally sent to the email address provided by the customer.
          Delivery time can vary because of airline systems, payment
          verification, fraud checks, supplier processing, or manual review.
        </p>
        <p>
          Customers should review delivered documents promptly and notify us of
          any issue with names, dates, airports, schedules, fares, or contact
          details.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Reasons Fulfillment May Be Delayed
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Payment authorization or identity verification is pending.</li>
          <li>The airline fare changes before ticketing is completed.</li>
          <li>The requested seat, fare class, or itinerary becomes unavailable.</li>
          <li>The supplier requires manual review or additional confirmation.</li>
          <li>Customer details are incomplete, inaccurate, or need correction.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          If A Fare Or Itinerary Becomes Unavailable
        </h2>
        <p>
          If a selected fare or itinerary becomes unavailable before ticketing,
          we may offer alternatives, request approval for a revised fare, or
          cancel the pending request. A ticket is not confirmed unless the
          booking can be completed as authorized.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Customer Responsibilities
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Provide accurate passenger, billing, and contact information.</li>
          <li>Check spam or junk folders for booking emails.</li>
          <li>Review airline check-in, baggage, visa, and travel document requirements.</li>
          <li>Contact us promptly if confirmation is not received within the expected time.</li>
        </ul>
      </div>

      <div className="space-y-2 border-t border-neutral-200 pt-6">
        <h2 className="font-heading text-xl font-medium text-dark">
          Fulfillment Support
        </h2>
        <p>
          For fulfillment or booking delivery questions, contact{" "}
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
