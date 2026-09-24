import { CONTACT_INFO } from "@/config/ContactInfo";

export default function AdvertiserPolicy() {
  return (
    <article className="max-w-none space-y-5 leading-7">
      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Advertiser Policy
        </h2>
        <p>
          This Advertiser Policy explains how {CONTACT_INFO.brandName} presents
          travel ads, promotional messages, fare references, and third-party
          travel content on {CONTACT_INFO.domain}. Our standard is simple:
          advertising should be clear, relevant, and not misleading.
        </p>
        <p>
          {CONTACT_INFO.brandName} is not an airline, airport, government
          agency, or official airline website. Airline names, logos, trademarks,
          and brand identifiers belong to their owners and may be used only to
          identify travel options or itinerary information.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Clear Business Identity
        </h2>
        <p>
          Ads and landing pages should make clear that {CONTACT_INFO.brandName}
          is the advertised business. We do not intentionally create content
          that suggests false airline affiliation, endorsement, or official
          carrier status.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Fare And Offer Accuracy
        </h2>
        <p>
          Travel fares can change quickly because inventory, taxes, supplier
          charges, and fare rules are dynamic. Any displayed or advertised fare
          is subject to availability and final confirmation at booking.
        </p>
        <p>
          We aim to avoid expired, unavailable, or misleading offers. If a fare
          referenced in an ad is no longer available, our team may review
          alternate options that match the customer's request.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Pricing Transparency
        </h2>
        <p>
          Pricing messages should not create a false impression of final cost.
          Quotes may include airfare, taxes, carrier-imposed charges, supplier
          fees, and {CONTACT_INFO.brandName} service fees where applicable.
          Optional services such as baggage, seats, insurance, upgrades, and
          add-ons may cost extra.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Third-Party Advertising And Analytics
        </h2>
        <p>
          We may use third-party advertising platforms, analytics tools, call
          tracking, conversion tracking, or remarketing technologies to measure
          campaign performance and improve our services. These tools may use
          cookies or similar technologies as described in our Privacy Policy and
          Cookies Policy.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Advertising Standards
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>We aim to use clear language and avoid deceptive claims.</li>
          <li>We do not guarantee airline approval, refunds, upgrades, or specific fares.</li>
          <li>We do not claim airline ownership or official status.</li>
          <li>We disclose that travel services are subject to airline and supplier rules.</li>
          <li>We keep calls to action relevant to services available through our site or team.</li>
        </ul>
      </div>

      <div className="space-y-2 border-t border-neutral-200 pt-6">
        <h2 className="font-heading text-xl font-medium text-dark">
          Advertiser Contact
        </h2>
        <p>
          For advertising, trademark, or offer accuracy questions, contact{" "}
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
