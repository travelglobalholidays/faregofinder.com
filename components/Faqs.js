"use client";
import Head from "next/head";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { CONTACT_INFO } from "@/config/ContactInfo";

const faqs = [
  {
    question: "Can I book a flight over the phone?",
    answer:
      `Yes! ${CONTACT_INFO.brandName} offers fast and secure phone bookings. Call us at ${CONTACT_INFO.phoneDisplayDashed} and our U.S.-based agents will help you reserve your flight at competitive rates.`,
  },
  {
    question: "Can phone support help me review flight options?",
    answer:
      "Yes. Our support team can help review available routes, dates, fare rules, and booking details before you confirm a reservation.",
  },
  {
    question: "What should I prepare before calling?",
    answer:
      "Be ready with your travel dates, destination, number of passengers, and airline preferences. Our experts will handle the rest.",
  },
  {
    question: "Can I cancel or reschedule by phone?",
    answer:
      "Yes. Our agents can assist with cancellations, flight changes, and refunds as per airline policy.",
  },
  {
    question: "Is booking by phone secure?",
    answer:
      `Yes. ${CONTACT_INFO.brandName} uses encrypted systems and follows strict privacy protocols to protect your personal and payment information.`,
  },
  {
    question: "Is customer support available 24/7?",
    answer:
      "Yes! Our support team is available 24/7 to assist with bookings, flight issues, or any travel-related questions.",
  },
  {
    question: "Can I book for someone else?",
    answer:
      "Yes. Provide their full name, contact details, and travel information — we'll complete the booking and send confirmation instantly.",
  },
  {
    question: "Will I receive confirmation after booking?",
    answer:
      "Yes. You'll get a confirmation email and/or SMS with your ticket and itinerary as soon as the booking is completed.",
  },
  {
    question: "What if I face issues booking online?",
    answer:
      "Call us and our team can help review the booking details or guide you through another available option.",
  },
  {
    question: `Why choose ${CONTACT_INFO.brandName} for my travel needs?`,
    answer:
      `${CONTACT_INFO.brandName} provides independent travel assistance, clear fare information, and customer-focused support for flight planning.`,
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>{`FAQs | ${CONTACT_INFO.brandName}`}</title>
        <meta
          name="description"
          content={`Find answers to frequently asked questions about flight bookings, cancellations, phone support, and more at ${CONTACT_INFO.brandName}.`}
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-[var(--text-primary)] text-white py-20 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl opacity-80">
            Answers to common questions about booking, cancellation, support,
            and more.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-gray-700">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 text-center font-heading">
              General FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left px-5 py-4 bg-gray-50 hover:bg-gray-100 transition duration-200"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-${index}`}
                  >
                    <span className="font-semibold text-[var(--text-primary)]">
                      {faq.question}
                    </span>
                    <span className="text-primary">
                      {openIndex === index ? (
                        <Minus size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div
                      id={`faq-${index}`}
                      className="px-5 py-4 bg-white border-t border-gray-200 text-sm text-neutral-700"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Prompt */}
          <div className="mt-12 border-t pt-8 text-center text-sm text-neutral-600">
            <p>
              Still need help?{" "}
              <a
                href={CONTACT_INFO.emailHref}
                className="text-primary hover:underline"
              >
                {CONTACT_INFO.email}
              </a>{" "}
              or call us at{" "}
              <a
                href={CONTACT_INFO.phoneHref}
                className="text-primary hover:underline"
              >
                {CONTACT_INFO.phoneDisplayDashed}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

