import Image from "next/image";
import Link from "next/link";
import { CONTACT_INFO } from "@/config/ContactInfo";

const links = [
  ["Home", "/"], ["Flights", "/flights"], ["About Us", "/about-us"], ["Contact Us", "/contact-us"],
  ["Terms and Conditions", "/terms-conditions"], ["Privacy Policy", "/privacy-policy"],
  ["Cancellations and Refunds", "/cancellation-refund-policy"], ["Cookies Policy", "/cookies-policy"],
  ["Refunds and Travel Credits", "/refund-policy"], ["Advertiser Policy", "/advertiser-policy"],
  ["Price Match Promise", "/price-match-promise"], ["Fare Disclosure", "/fare-disclouser"], ["Fulfillment Policy", "/fulfillment-policy"],
];

export default function FlightsFooter() {
  return <footer className="border-t border-subtle bg-white px-4 py-8 text-dark">
    <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3">
      <div>
        <Link href="/" aria-label={CONTACT_INFO.brandName}><Image src="/images/logo.png" alt={CONTACT_INFO.brandName} width={200} height={50} className="h-auto w-[200px] object-contain" /></Link>
        <p className="mt-3 text-sm leading-relaxed text-body">Independent travel assistance. We are not an airline or its official customer service.</p>
        <a href={CONTACT_INFO.phoneHref} className="mt-3 inline-flex min-h-11 items-center font-semibold text-theme">{CONTACT_INFO.phoneDisplay}</a>
        <a href={CONTACT_INFO.emailHref} className="block text-sm text-body">{CONTACT_INFO.email}</a>
      </div>
      <nav aria-label="Useful links and policies" className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">{links.map(([label, href]) => <Link key={href} href={href} className="text-body hover:text-theme">{label}</Link>)}</nav>
      <div>
        <h2 className="text-base font-semibold">Stay in Touch</h2>
        <form action={CONTACT_INFO.emailHref} method="get" className="mt-3 space-y-3">
          <input type="hidden" name="subject" value="Travel information request" />
          <label htmlFor="flights-contact-email" className="block text-sm">Your email address</label>
          <input id="flights-contact-email" name="body" type="email" required placeholder="name@example.com" className="w-full rounded-md border border-subtle bg-white px-3 py-3 text-sm" />
          <button type="submit" className="min-h-11 w-full rounded-md bg-theme px-4 text-sm font-semibold text-white">Request Information</button>
          <p className="text-xs leading-relaxed text-body">Your email app will open to send your request.</p>
        </form>
      </div>
    </div>
    <p className="mx-auto mt-7 max-w-7xl border-t border-subtle pt-4 text-xs leading-relaxed text-body">© {new Date().getFullYear()} {CONTACT_INFO.brandName}. Fares and availability may change. Review total prices, fees, and conditions before booking.</p>
    <p className="mx-auto mt-4 max-w-7xl text-xs leading-relaxed text-body"><strong>Disclaimer:</strong> {CONTACT_INFO.domain} provides independent travel booking assistance. We are not affiliated with or acting on behalf of any airline or travel provider. Availability, fares, ticket issuance, and travel conditions are determined by the relevant providers. Trademarks and brand names belong to their respective owners.</p>
  </footer>;
}
