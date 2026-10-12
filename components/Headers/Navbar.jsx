"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { CONTACT_INFO } from "@/config/ContactInfo";

export default function Navbar({ compact = false }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[999] bg-white shadow-md">
        <div className="bg-dark text-white">
          <div className={`hidden ${compact ? "h-7 text-xs" : "h-9 text-[13px]"} items-center justify-center px-4 text-center font-medium md:flex`}>
            <span>
              <strong>Important:</strong> We are an Independent Travel
              Assistance Platform and are not associated with any airline or any
              company.
            </span>
          </div>

          <div className={`${compact ? "h-7" : "h-8"} overflow-hidden md:hidden`}>
            <div className="topbar-marquee flex h-full items-center whitespace-nowrap text-[12px] font-medium">
              <span className="px-6">
                <strong>Important:</strong> We are an Independent Travel
                Assistance Platform and are not associated with any airline or
                any company.
              </span>
              <span className="px-6">
                <strong>Important:</strong> We are an Independent Travel
                Assistance Platform and are not associated with any airline or
                any company.
              </span>
            </div>
          </div>
        </div>

        <div className={`${compact ? "mx-auto max-w-7xl h-[60px] md:h-16 gap-3" : "container mx-auto py-3 md:py-4"} flex items-center justify-between px-4`}>

          {/* Logo */}
          <Image
            src="/images/logo.png"
            width={160}
            height={40}
            alt={CONTACT_INFO.brandName}
            className={compact ? "h-auto w-[125px] md:w-[140px] object-contain" : "h-auto w-[140px] md:w-[160px] object-contain"}
          />

          {/* DESKTOP MENU */}
          <ul className={`hidden lg:flex items-center ${compact ? "gap-5 text-sm" : "gap-8"} font-medium`}>
            <li>
              <Link href="/" className={`${compact ? "text-sm" : "text-[16px]"} text-[var(--text-primary)] hover:text-theme`}>
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/flights"
                className={`${compact ? "text-sm" : "text-[16px]"} text-[var(--text-primary)] hover:text-theme`}
              >
                Flights
              </Link>
            </li>

            <li>
              <Link href="/about-us" className={`${compact ? "text-sm" : "text-[16px]"} text-[var(--text-primary)] hover:text-theme`}>
                About Us
              </Link>
            </li>

            <li>
              <Link href="/contact-us" className={`${compact ? "text-sm" : "text-[16px]"} text-[var(--text-primary)] hover:text-theme`}>
                Contact Us
              </Link>
            </li>
          </ul>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link
              href={CONTACT_INFO.phoneHref}
              className={`${compact ? "h-11 px-4 rounded-md" : "h-[48px] md:h-[56px] px-6 rounded-full shadow-theme"} flex items-center gap-2 bg-theme text-white hover:bg-[var(--theme-color2)]`}
            >
              <Image
                src="/images/icons/customer-support.png"
                width={20}
                height={20}
                alt="Support"
              />
              <span className="text-[14px] md:text-[15px] font-medium">
                {CONTACT_INFO.phoneDisplay}
              </span>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="lg:hidden text-3xl text-[var(--text-primary)]"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden bg-white shadow transition-all duration-300 ${
            open ? "max-h-[400px] py-4" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="px-6 space-y-4">
            <Link href="/" onClick={() => setOpen(false)} className="block font-semibold">
              Home
            </Link>

            <Link
              href="/flights"
              onClick={() => setOpen(false)}
              className="block font-semibold"
            >
              Flights
            </Link>

            <Link href="/about-us" onClick={() => setOpen(false)} className="block font-semibold">
              About Us
            </Link>

            <Link href="/contact-us" onClick={() => setOpen(false)} className="block font-semibold">
              Contact Us
            </Link>

            <Link
              href={CONTACT_INFO.phoneHref}
              className="block mt-4 rounded-full bg-theme text-white text-center py-3 font-semibold"
            >
              Call Now
            </Link>
          </div>
        </div>
      </nav>

      {/* SPACER */}
      <div className={compact ? "h-[88px] md:h-[92px]" : "h-[104px] md:h-[124px]"} />
    </>
  );
}
