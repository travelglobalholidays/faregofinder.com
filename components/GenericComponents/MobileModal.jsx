"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CONTACT_INFO } from "@/config/ContactInfo";

const MobilePromoModal = ({
  bgColor = "bg-secondary",
  phoneNumber = CONTACT_INFO.phoneDisplayDashed,
  phoneHref = CONTACT_INFO.phoneHref,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setShowModal(false);

  if (!showModal) return null;

  return (
    /* FULL SCREEN OVERLAY */
    <div className="fixed inset-0 z-[2147483647] md:hidden bg-black/60">
      {/* FULL SCREEN MODAL */}
      <div className="relative bg-white w-screen h-screen overflow-y-auto">

        {/* 🔹 HEADER BAR */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3">
          {/* Logo */}
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={120}
            height={32}
            priority
          />

          {/* Close Button */}
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="text-gray-600 hover:text-red-500 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* 🔹 CONTENT */}
        <div className="p-4">
          <div className={`${bgColor} text-white py-3 rounded mb-4`}>
            <h3 className="text-lg font-semibold text-center">
              Independent Travel Assistance
            </h3>
          </div>

          {/* Banner Image */}
          <Image
            src="/images/Airline-Ticket.png"
            alt="Flight booking assistance"
            width={500}
            height={300}
            priority
            className="w-full mb-4 rounded"
          />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 text-sm font-fira mb-6">
            {[
              "New Bookings",
              "Changes",
              "Cancellations",
              "Travel Support",
              "Refunds",
              "Upgrades",
            ].map((text) => (
              <a
                key={text}
                href={phoneHref}
                className={`${bgColor} text-white py-3 rounded text-center font-medium`}
              >
                {text}
              </a>
            ))}
          </div>

          {/* Agent Section */}
          <Image
            src="/images/calling-cus.png"
            alt="Agent"
            width={80}
            height={80}
            loading="lazy"
            className="w-20 h-20 object-cover rounded-full border-2 border-black mx-auto mb-2"
          />

          <p className="text-center font-semibold text-gray-900 mb-1">
            Speak With A Travel Assistance Agent
          </p>

          <p className="text-center font-bold text-rose-600 animate-pulse mb-4">
            Click to Call!
          </p>

          {/* Phone CTA */}
          <a
            href={phoneHref}
            className={`${bgColor} text-white rounded-full px-6 py-4 flex justify-center max-w-sm mx-auto`}
          >
            <div className="text-center">
              <small className="block text-sm">
                Flight Booking Assistance
              </small>
              <span className="text-xl font-bold block">
                {phoneNumber}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobilePromoModal;
