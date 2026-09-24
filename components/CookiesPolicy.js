import { CONTACT_INFO } from "@/config/ContactInfo";

export default function CookiesPolicy() {
  return (
    <article className="max-w-none space-y-5 leading-7">
      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Cookies Policy
        </h2>
        <p>
          This Cookies Policy explains how {CONTACT_INFO.brandName} may use
          cookies, pixels, tags, local storage, analytics identifiers, and
          similar technologies on {CONTACT_INFO.domain}. These tools help the
          site function, measure performance, improve content, and understand
          how visitors use our fare search and travel support pages.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          What Cookies Do
        </h2>
        <p>
          Cookies are small files stored by your browser or device. They may
          remember preferences, support forms and site functions, help with
          security, and provide aggregated information about traffic and page
          performance.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Cookie Categories We May Use
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Essential cookies:</strong> Help pages load, support forms,
            remember basic settings, and maintain security.
          </li>
          <li>
            <strong>Analytics cookies:</strong> Help us understand visits,
            traffic sources, and website navigation patterns.
          </li>
          <li>
            <strong>Performance cookies:</strong> Help identify technical
            issues, load times, and usability opportunities.
          </li>
          <li>
            <strong>Advertising cookies:</strong> May help measure campaign
            performance, limit repeated messages, and show relevant travel
            information where permitted.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Third-Party Tools
        </h2>
        <p>
          We may use tools provided by analytics, advertising, call tracking,
          fraud-prevention, or website service providers. These providers may
          set their own cookies or similar technologies subject to their privacy
          practices.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-heading text-xl font-medium text-dark">
          Your Cookie Controls
        </h2>
        <p>
          Most browsers allow you to block, delete, or manage cookies in
          settings. If cookies are disabled, some forms, preferences, security
          functions, or measurement features may not work as expected.
        </p>
      </div>

      <div className="space-y-2 border-t border-neutral-200 pt-6">
        <h2 className="font-heading text-xl font-medium text-dark">
          Contact
        </h2>
        <p>
          For questions about cookies or tracking technologies, contact{" "}
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
