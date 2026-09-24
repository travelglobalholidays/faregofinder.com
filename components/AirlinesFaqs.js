"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { CONTACT_INFO } from "@/config/ContactInfo";

const faqs = [
  {
    question: `How can I book a flight ticket online with ${CONTACT_INFO.brandName}?`,
    answer: `${CONTACT_INFO.brandName} helps you review available flight options based on your route, travel dates, passenger details, and schedule preferences. Once you select an option and payment is processed, confirmation details are sent to your registered email address.`,
  },
  {
    question: "How can I find affordable flight deals online?",
    answer: `${CONTACT_INFO.brandName} helps travelers compare available fares from multiple airlines and travel providers. Fares are subject to availability, taxes, fees, and airline rules, so final pricing is confirmed only at the time of booking.`,
  },
  {
    question: "How do I receive my flight ticket after booking online?",
    answer: "After the booking is confirmed by the airline or supplier, your e-ticket or booking confirmation is sent electronically to the email address provided during booking.",
  },
  {
    question: "When is the best time to book flights online?",
    answer: "Flight prices vary based on demand, route, airline inventory, season, and travel dates. Booking early may provide more options, but no agency can guarantee a specific lowest fare.",
  },
  {
    question: `Is booking flights online with ${CONTACT_INFO.brandName} safe?`,
    answer: `${CONTACT_INFO.brandName} uses reasonable security and customer support practices for booking assistance. Travelers should review all itinerary details, passenger names, fare rules, and payment information before confirming a reservation.`,
  },
];

const AirlinesFaqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--text-primary)] mb-6">
        <span className="inline-flex items-center gap-2 text-[var(--text-primary)]">
          Frequently Asked Questions - {CONTACT_INFO.brandName}
        </span>
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white transition-all duration-300 border rounded-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3 text-[var(--text-primary)] font-medium text-lg">
                <HelpCircle className="w-5 h-5 text-secondary" />
                {faq.question}
              </div>
              {activeIndex === index ? (
                <ChevronUp className="w-5 h-5 text-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "max-h-96 p-5 pt-0" : "max-h-0"
              }`}
            >
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AirlinesFaqs;
