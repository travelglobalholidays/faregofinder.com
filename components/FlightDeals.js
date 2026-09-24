"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPlaneDeparture } from "react-icons/fa";
import { CONTACT_INFO } from "@/config/ContactInfo";

const routes = [
  {
    from: "New York",
    to: "Los Angeles",
    date: "15 Dec 2025",
    price: "$320",
    image: "/images/new-york.jpg",
  },
  {
    from: "Chicago",
    to: "Miami",
    date: "20 Dec 2025",
    price: "$280",
    image: "/images/chicago.jpg",
  },
  {
    from: "San Francisco",
    to: "Las Vegas",
    date: "05 Feb 2026",
    price: "$190",
    image: "/images/san-francisco.jpg",
  },
  {
    from: "Dallas",
    to: "New York",
    date: "12 Feb 2026",
    price: "$340",
    image: "/images/dallas.jpg",
  },
  {
    from: "Boston",
    to: "Orlando",
    date: "18 Feb 2026",
    price: "$270",
    image: "/images/boston.jpg",
  },
  {
    from: "Seattle",
    to: "Chicago",
    date: "25 Dec 2025",
    price: "$310",
    image: "/images/seattle.jpg",
  },
  {
    from: "Los Angeles",
    to: "Honolulu",
    date: "30 Dec 2025",
    price: "$450",
    image: "/images/los-angeles.jpg",
  },
  {
    from: "Denver",
    to: "Phoenix",
    date: "05 Feb 2026",
    price: "$220",
    image: "/images/denver.jpg",
  },
  {
    from: "Atlanta",
    to: "Tampa",
    date: "08 Feb 2026",
    price: "$200",
    image: "/images/atlanta.jpg",
  },
];

const TFN = CONTACT_INFO.phoneHref;

export default function TrendingRoutes() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-secondary)] text-left">
          Trending Routes With Cheap Prices
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {routes.map((route, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border border-gray-200 p-3 rounded-md bg-white hover:shadow-md transition"
            >
              {/* Thumbnail */}
              <div className="w-20 h-22 relative flex-shrink-0">
                <Image
                  src={route.image}
                  alt={`${route.from} to ${route.to} flight`}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 80px, (max-width: 1200px) 100px, 120px"
                />
              </div>

              {/* Route Info */}
              <div className="flex flex-col flex-1 overflow-hidden">
                <div
                  className="flex items-center gap-1 text-sm sm:text-base font-semibold text-[var(--color-primary)] truncate mb-1"
                  title={`${route.from} → ${route.to}`}
                >
                  <span>{route.from}</span>
                  <FaPlaneDeparture className="text-[var(--color-primary)] shrink-0 mx-1" />
                  <span>{route.to}</span>
                </div>

                <div className="text-xs text-gray-500 mb-1">{route.date}</div>

                {/* Price + Button */}
                <div className="flex items-center justify-between">
                  <div className="text-left font-bold text-[var(--color-primary)] text-sm sm:text-base min-w-[60px]">
                    {route.price}
                  </div>
                  <Link
                    href={TFN}
                    className="bg-[var(--color-primary)] text-white text-xs sm:text-sm px-3 py-1 rounded hover:bg-[var(--color-secondary)] transition-all duration-200"
                  >
                    Call To Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
