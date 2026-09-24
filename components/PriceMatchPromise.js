import { CONTACT_INFO } from "@/config/ContactInfo";

export default function PriceMatchPromise() {
  return (
    <article className="max-w-none space-y-5 leading-7">
      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Fare Match Review
        </h2>
        <p>
          {CONTACT_INFO.brandName} helps travelers review competitive fare
          options. If you find a lower publicly available fare for the same
          itinerary before ticketing, our team may review it and, where
          available, attempt to match it or identify a comparable option.
        </p>
        <p>
          A fare match is not guaranteed. Airline inventory changes quickly, and
          final availability depends on supplier confirmation at the time of
          review and booking.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          What Makes A Fare Comparable
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>The fare must match the airline, route, dates, flight numbers, cabin, and passenger count.</li>
          <li>The total must include mandatory taxes, fees, and carrier charges.</li>
          <li>The fare must be public, active, and verifiable when we review it.</li>
          <li>Refund rules, baggage, restrictions, and booking conditions must be comparable.</li>
          <li>The request must be made before ticketing or final purchase confirmation.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          When A Match May Not Apply
        </h2>
        <p>
          Fare match review may not apply to expired fares, private membership
          prices, employee fares, reward redemptions, opaque fares, package-only
          rates, coupon-only prices, pricing mistakes, unavailable offers,
          unverifiable screenshots, or fares that change before booking can be
          completed.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          How To Request Review
        </h2>
        <p>
          To request review, provide the competing itinerary, total price, fare
          conditions, and source where the fare can be verified. Our team will
          explain whether a match, alternate option, or different fare is
          available.
        </p>
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <p>
          For fare match review questions, contact {CONTACT_INFO.brandName} at{" "}
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
