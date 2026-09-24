import { CONTACT_INFO } from "@/config/ContactInfo";

export default function FareDisclouser() {
  return (
    <article className="max-w-none space-y-5 leading-7">
      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Fare Disclosure
        </h2>
        <p>
          This Fare Disclosure explains how prices, availability, taxes, fees,
          and airline rules can affect fare information shown or discussed by
          {CONTACT_INFO.brandName}. Our goal is to help travelers understand
          what should be reviewed before ticketing.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Dynamic Fare Availability
        </h2>
        <p>
          Flight fares are dynamic. They may change because of seat inventory,
          demand, route, dates, cabin, fare class, supplier access, or airline
          rules. A fare is not guaranteed until the booking is confirmed and the
          ticket is issued.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          What A Quote May Include
        </h2>
        <p>
          A quote may include base fare, government taxes, airport charges,
          carrier-imposed fees, supplier fees, and applicable service fees. The
          full amount should be reviewed before payment authorization.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Charges That May Be Separate
        </h2>
        <p>
          Separate charges may apply for checked bags, carry-ons, seats, meals,
          priority boarding, upgrades, insurance, changes, cancellations, refund
          processing, or other optional services. These charges are often set by
          the airline and may be collected separately.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Fare Rules And Restrictions
        </h2>
        <p>
          Each fare may carry restrictions such as refundability, exchange fees,
          advance purchase requirements, minimum or maximum stay, no-show rules,
          baggage conditions, routing limits, or name correction rules.
          Travelers should review these before purchase.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Promotional And Sample Fares
        </h2>
        <p>
          Promotional fares, sample prices, and advertised deals may be limited
          by quantity, route, date, cabin, or availability. If a referenced fare
          is unavailable, our team may help review alternate options for the
          same travel request.
        </p>
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <p>
          {CONTACT_INFO.brandName} is not an airline and does not control
          airline pricing, inventory, schedules, or fare rules. For fare
          disclosure questions, contact{" "}
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
