import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { MdOutlinePhoneInTalk, MdOutlineMarkEmailRead } from "react-icons/md";
import { CONTACT_INFO } from "@/config/ContactInfo";

export default function TopBar() {
  return (
    <div className="hidden md:block border-b border-white/20 bg-[var(--text-primary)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 py-2 text-white text-sm">
        
        {/* Social Icons */}
        <div className="flex gap-3">
          {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn].map(
            (Icon, i) => (
              <Link
                key={i}
                href="#"
                className="w-7 h-7 flex items-center justify-center border border-white/40 rounded-full hover:bg-white hover:text-theme transition"
              >
                <Icon className="text-[14px]" />
              </Link>
            )
          )}
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4 text-[14px]">
          <Link
            href={CONTACT_INFO.phoneHref}
            className="flex items-center gap-2 hover-text-theme transition"
          >
            <MdOutlinePhoneInTalk className="w-4 h-4" />
            {CONTACT_INFO.phoneDisplay}
          </Link>
          <Link
            href={CONTACT_INFO.emailHref}
            className="flex items-center gap-2 hover-text-theme transition"
          >
            <MdOutlineMarkEmailRead className="w-4 h-4" />
            {CONTACT_INFO.email}
          </Link>
        </div>
      </div>
    </div>
  );
}
