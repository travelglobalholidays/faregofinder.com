"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { CONTACT_INFO } from "@/config/ContactInfo";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="block md:hidden bg-white shadow-md">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Image
          src="/images/logo.png"
          width={140}
          height={36}
          alt="Logo"
          priority
        />

        {/* Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="text-3xl text-[var(--text-primary)]"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[400px] border-t" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block font-semibold"
          >
            Home
          </Link>

          <Link
            href="/flights"
            onClick={() => setOpen(false)}
            className="block font-semibold"
          >
            Flights
          </Link>

          <Link
            href="/about-us"
            onClick={() => setOpen(false)}
            className="block font-semibold"
          >
            About Us
          </Link>

          <Link
            href="/contact-us"
            onClick={() => setOpen(false)}
            className="block font-semibold"
          >
            Contact Us
          </Link>

          {/* CTA */}
          <Link
            href={CONTACT_INFO.phoneHref}
            className="block mt-4 rounded-full bg-theme text-white text-center py-3 font-semibold"
          >
            Call Now
          </Link>
        </div>
      </div>
    </div>
  );
}
