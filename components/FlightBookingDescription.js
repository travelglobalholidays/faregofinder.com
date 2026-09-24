"use client";

import { ChevronRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { CONTACT_INFO } from "@/config/ContactInfo";
import HomeFaqs from "./HomeFaqs";

const contentBlocks = [
  {
    title: "Fare Search That Starts With Your Trip",
    paragraphs: [
      "A useful flight search is not only about the lowest number on the screen. Dates, airports, connection time, baggage rules, cabin type, and fare restrictions all affect the real value of a trip.",
      "FaresGoFinder helps travelers review those details before they decide, with support for both domestic and international routes.",
    ],
  },
  {
    title: "Clearer Choices Before Ticketing",
    paragraphs: [
      "Airline pricing can move quickly, and similar-looking fares may carry very different rules. Our assistance is designed to help you understand what is included, what may cost extra, and what should be checked before payment.",
      "You can compare available options with practical context instead of sorting through fare details alone.",
    ],
  },
  {
    title: "Support For Different Travel Priorities",
    paragraphs: [
      "Some travelers want shorter layovers. Others need flexible dates, late departures, family-friendly schedules, or a specific cabin. We shape the review around what matters for your trip.",
      "Our goal is to help you choose with confidence, not rush through the fine print.",
    ],
  },
  {
    title: "Plan With Better Information",
    paragraphs: [
      "Whether you are planning a simple one-way ticket or a multi-stop journey, better information can make the booking process smoother from the first search to confirmation.",
    ],
  },
];

const highlights = [
  "Fare and itinerary comparison help",
  "Route, baggage, and policy guidance",
  "Support before and after ticketing",
  "Independent travel assistance",
];

const FlightBookingDescription = () => {
  return (
    <section className="bg-[var(--surface-muted)] px-4 py-10 md:px-8 lg:py-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="text-sm font-semibold uppercase tracking-[2px] text-theme">
            Fare Finder Support
          </span>
          <h2 className="mt-2 text-[30px] font-semibold leading-tight text-dark">
            Flight planning with fewer blind spots
          </h2>

          <div className="mt-2 space-y-5">
            {contentBlocks.map((block) => (
              <div key={block.title}>
                <h3 className=" text-[18px] font-normal text-dark">
                  {block.title}
                </h3>
                <div className="space-y-2">
                  {block.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-relaxed text-body"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <HomeFaqs />
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h3 className="text-xl font-semibold text-dark">
              What we help review
            </h3>
            <ul className="mt-5 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-gray-700">
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-theme" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={CONTACT_INFO.phoneHref}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-theme px-5 py-3 text-sm font-semibold text-white"
            >
              <PhoneCall className="h-4 w-4" />
              Call For Fare Help
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FlightBookingDescription;
