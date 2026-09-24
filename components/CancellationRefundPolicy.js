import { CONTACT_INFO } from "@/config/ContactInfo";

export default function CancellationRefundPolicy() {
  return (
    <article className="max-w-none space-y-5 leading-7">
      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Cancellation & Refund Policy
        </h2>
        <p>
          This policy explains how {CONTACT_INFO.brandName} helps customers
          with cancellation, change, refund, and travel credit requests. Flight
          tickets are governed by airline and supplier rules, so the outcome
          depends on the ticket type, fare class, route, airline policy, and
          timing of the request.
        </p>
        <p>
          We can review the applicable rules and help submit requests, but the
          airline or supplier decides eligibility, penalties, waivers, credit
          value, and processing timelines.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          How To Start A Request
        </h2>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Contact us promptly with your booking reference and passenger name.</li>
          <li>Tell us if you want to cancel, change dates, request credit, or review refund options.</li>
          <li>We will review the known fare rules and supplier policy.</li>
          <li>Where possible, we will explain fees, restrictions, and next steps before processing.</li>
        </ol>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Refund And Credit Eligibility
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Refundable tickets:</strong> May qualify for a refund under
            airline rules, less any applicable penalty or service fee.
          </li>
          <li>
            <strong>Non-refundable tickets:</strong> Usually do not qualify for
            a cash refund, but airline credit or date changes may be available.
          </li>
          <li>
            <strong>Partially used tickets:</strong> Any remaining value is
            calculated by the airline or supplier.
          </li>
          <li>
            <strong>No-show bookings:</strong> Missing a flight or waiting until
            after departure may remove refund or credit eligibility.
          </li>
          <li>
            <strong>Airline schedule changes:</strong> Major carrier-initiated
            changes may allow rebooking, credit, or refund depending on airline
            policy.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Non-Refundable Charges
        </h2>
        <p>
          Some charges may be non-refundable even when part of a booking is
          eligible for refund. These may include service fees, payment
          processing charges, supplier handling fees, insurance premiums,
          optional add-ons, seat fees, baggage fees, or charges already used.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Refund Timing
        </h2>
        <p>
          Refund timing varies by airline, supplier, bank, and payment method.
          After approval, funds may take several business days or billing cycles
          to appear. Manual review, international travel, multi-airline tickets,
          or disputed payments can take longer.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Credits And Vouchers
        </h2>
        <p>
          Some airlines issue travel credits or vouchers instead of cash
          refunds. These may include expiration dates, passenger restrictions,
          route limits, reissue fees, fare differences, or airline-specific
          conditions. Customers are responsible for using credits before they
          expire.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Customer Responsibilities
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Submit cancellation or change requests before scheduled departure whenever possible.</li>
          <li>Review fare rules and ticket restrictions before purchase.</li>
          <li>Provide accurate booking and passenger details for verification.</li>
          <li>Monitor email and phone communications for airline or agency updates.</li>
        </ul>
      </div>

      <div className="space-y-2 border-t border-neutral-200 pt-6">
        <h2 className="font-heading text-xl font-medium text-dark">
          Contact For Cancellation Or Refund Help
        </h2>
        <p>
          For cancellation or refund assistance, contact{" "}
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
