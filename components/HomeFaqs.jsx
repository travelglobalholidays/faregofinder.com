"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "Can FaresGoFinder help me compare fares?",
    answer:
      "Yes. Our team can review available fare options, route details, cabin choices, and airline rules based on the trip information you provide.",
  },
  {
    question: "Do you support domestic and international trips?",
    answer:
      "Yes. We assist with U.S. domestic routes, international itineraries, connecting flights, and multi-city travel requests where options are available.",
  },
  {
    question: "Why can a fare change before ticketing?",
    answer:
      "Airline inventory is dynamic. A fare is not locked until the airline or supplier confirms the booking and issues the applicable confirmation or ticket details.",
  },
  {
    question: "Can you explain baggage and change rules?",
    answer:
      "Yes. We can help you review the rules connected to an available fare, including baggage, changes, cancellations, and other conditions supplied by the airline or provider.",
  },
  {
    question: "How will I receive confirmation?",
    answer:
      "Once confirmed by the airline or supplier, itinerary and booking details are shared through the contact information provided during the request.",
  },
];

export default function HomeFaqs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={faq.question} className="border border-black/10 bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-dark">
                {faq.question}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-theme text-white">
                {isOpen ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-black/10 px-5 py-4">
                <p className="text-sm leading-relaxed text-body">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
