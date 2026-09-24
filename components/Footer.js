import { CONTACT_INFO } from "@/config/ContactInfo";
import Image from "next/image";
import Link from "next/link";
import { FaAngleDoubleRight, FaMapMarkerAlt } from "react-icons/fa";
import {
  FaEnvelope,
  FaFacebookF,
  FaHeadset,
  FaLinkedinIn,
  FaLock,
  FaPaperPlane,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative bg-dark text-white ">
      {/* BACKGROUND IMAGE OVERLAY */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          bg-[url('/images/shape/footer-bg.png')]
          bg-no-repeat bg-center bg-cover
          opacity-[0.08]
          mix-blend-soft-light
          z-0
        "
      />

      <div className="relative z-10">
        {/* TOP */}
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* ABOUT */}
            <div className="lg:col-span-2">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={200}
                height={60}
                className="mb-6 "
              />

              <p className="mb-6 max-w-md text-white/90">
                We provide professional travel booking assistance with a focus
                on transparency, reliability, and personalized support for
                domestic and international journeys.
              </p>

              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <FaHeadset className="text-theme text-4xl shrink-0" />
                  <div>
                    <h6 className="font-bold text-white">24/7 Call Support</h6>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="text-theme font-bold text-lg"
                    >
                      {CONTACT_INFO.phoneDisplayDashed}
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3 text-white/90">
                  <span className="w-8 h-8 rounded-full bg-theme flex items-center justify-center text-white">
                    <FaMapMarkerAlt />
                  </span>
                  73-41 71 PLACE GLENDALE, NY 11385
                </li>

                <li className="flex items-center gap-3 text-white/90">
                  <span className="w-8 h-8 rounded-full bg-theme flex items-center justify-center text-white">
                    <FaEnvelope />
                  </span>
                  <a href={CONTACT_INFO.emailHref}>{CONTACT_INFO.email}</a>
                </li>
              </ul>
            </div>

            {/* OUR COMPANY */}
            <div>
              <FooterTitle>Our Company</FooterTitle>
              <ul className="space-y-3">
                {[
                  { label: "About Us", href: "/about-us" },
                  { label: "Contact Us", href: "/contact-us" },
                  { label: "Terms & Conditions", href: "/terms-conditions" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Advertiser Policy", href: "/advertiser-policy" },
                  {
                    label: "Cancellation Refund Policy",
                    href: "/cancellation-refund-policy",
                  },
                  { label: "Cookies Policy", href: "/cookies-policy" },
                  { label: "Fare Match Review", href: "/price-match-promise" },
                  { label: "Fulfillment Policy", href: "/fulfillment-policy" },
                  { label: "Fare Disclosure", href: "/fare-disclouser" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-white/90 hover:text-theme transition"
                    >
                      <FaAngleDoubleRight className="text-theme text-xs" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div>
              <FooterTitle>Newsletter</FooterTitle>

              <p className="mb-4 text-white/90">
                Subscribe to receive travel updates and important information.
              </p>

              <form className="space-y-4">
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-theme" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full rounded-xl py-3 pl-12 pr-4 text-dark outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-theme text-white rounded-full py-3 flex items-center justify-center gap-2 hover:bg-theme/90 transition"
                >
                  Subscribe Now <FaPaperPlane />
                </button>

                <p className="text-sm flex items-center gap-2 text-white/80">
                  <FaLock /> Your information is safe with us.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-dashed border-white/30">
          <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center md:text-left text-white/90">
              © {new Date().getFullYear()}{" "}
              <span className="text-theme font-medium">FaresGoFinder</span> All
              Rights Reserved.
            </p>

            <div className="flex gap-4">
              {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="
                      w-10 h-10 flex items-center justify-center
                      rounded-full
                      bg-white/10
                      text-theme
                      hover:bg-theme hover:text-white
                      transition
                    "
                  >
                    <Icon />
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* FOOTER TITLE */
const FooterTitle = ({ children }) => (
  <h4 className="relative text-lg font-bold mb-6 pb-4 text-white">
    {children}
    <span className="absolute bottom-0 left-0 w-8 h-[2.5px] bg-theme"></span>
    <span className="absolute bottom-0 left-[36px] w-3 h-[2.5px] bg-theme"></span>
  </h4>
);
