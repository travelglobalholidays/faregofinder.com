import { CONTACT_INFO } from "@/config/ContactInfo";

export default function PrivacyPolicy() {
  return (
    <article className="max-w-none space-y-5 leading-7">
      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Privacy Policy
        </h2>
        <p>
          This Privacy Policy describes how {CONTACT_INFO.brandName} collects
          and uses information when you visit {CONTACT_INFO.domain}, search for
          fares, request travel support, speak with our team, or use our booking
          assistance services.
        </p>
        <p>
          We use customer information for practical travel support, security,
          communication, transaction handling, and business record purposes. We
          do not ask for more information than is reasonably needed for those
          purposes.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Information We Collect
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Name, email address, phone number, and preferred contact method.</li>
          <li>Trip details such as cities, dates, passengers, cabin preference, and route needs.</li>
          <li>Passenger details required to support a booking request.</li>
          <li>Billing and verification details handled through payment providers.</li>
          <li>Messages, call notes, support cases, and service communications.</li>
          <li>Device, browser, IP address, cookie, analytics, and site usage data.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          How Information Is Used
        </h2>
        <p>We may use personal information to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Respond to fare search, booking, change, cancellation, or refund questions.</li>
          <li>Share itinerary, confirmation, and service updates.</li>
          <li>Verify identity, payment status, booking details, and fraud signals.</li>
          <li>Coordinate with airlines, suppliers, processors, and support tools.</li>
          <li>Improve website performance, content, security, and usability.</li>
          <li>Meet legal, tax, accounting, dispute, security, and compliance obligations.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Sharing With Providers
        </h2>
        <p>
          To support a customer request, we may share necessary information with
          airlines, booking systems, suppliers, payment processors,
          fraud-prevention vendors, customer support tools, email providers,
          analytics services, and other operational partners.
        </p>
        <p>
          We do not sell personal information as a standalone product. We share
          information when needed to provide services, complete a requested
          transaction, protect customers and our business, or comply with legal
          obligations.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Payment Information
        </h2>
        <p>
          Payment transactions may be handled by third-party payment processors.
          We may receive payment status, billing verification, and transaction
          details, but payment providers may process card data according to
          their own security and privacy practices.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Cookies, Analytics, And Measurement
        </h2>
        <p>
          We may use cookies, pixels, tags, and analytics tools to understand
          website usage, maintain security, measure performance, improve
          content, and evaluate advertising. Browser settings can be used to
          manage cookies, although some features may not work as expected if
          cookies are blocked.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Data Retention
        </h2>
        <p>
          We retain personal information only as long as reasonably necessary
          for booking support, customer service, legal compliance, dispute
          resolution, accounting, fraud prevention, and business records. The
          retention period may vary based on the type of information and the
          purpose for which it was collected.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Data Security
        </h2>
        <p>
          We use reasonable administrative, technical, and organizational
          safeguards designed to protect personal information. No website,
          system, or transmission method can be guaranteed to be completely
          secure, so customers should avoid sending unnecessary sensitive
          information.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Your Choices And Rights
        </h2>
        <p>
          Depending on your location, you may have rights to request access,
          correction, deletion, restriction, or a copy of personal information.
          You may also opt out of marketing communications by using the
          unsubscribe link in an email or contacting us directly.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Children's Privacy
        </h2>
        <p>
          Our services are intended for adults and travel planners. We do not
          knowingly collect personal information from children under 13. If you
          believe a child has provided information to us, contact us so we can
          review and remove it where appropriate.
        </p>
      </div>

      <div className="space-y-2 border-t border-neutral-200 pt-6">
        <h2 className="font-heading text-xl font-medium text-dark">
          Contact For Privacy Requests
        </h2>
        <p>
          For privacy questions, access requests, or data removal requests,
          contact {CONTACT_INFO.brandName} at{" "}
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
