"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FlightSearchForm from "./FlightSearchForm";

export default function HeroBanner({
  airline = "American Airlines",
  highlightDiscount = "Up to 70% Off",
  imagePath = "/images/airport-bg.jpg",
  overlayColor = "bg-blue-900/60",
  tagline = "Your Trusted Partner for Affordable Air Travel", // ✅ Dynamic tagline
}) {
  return (
    <section className="relative w-full min-h-[50vh] flex items-center justify-center mt-[5px] text-center">
      {/* ✅ Background Image (Dynamic) */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src={imagePath}
            alt={`${airline} Flight Deals`}
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </motion.div>
        <div className={`absolute inset-0 ${overlayColor}`} />
      </div>

      {/* ✅ Centered Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 py-12 flex flex-col items-center justify-center">
        {/* 🎯 Promotion Title Card */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-primary/90 backdrop-blur-md text-white rounded-md px-8 py-4 inline-block mb-6 shadow-lg border border-white/20"
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-wide text-white">
            Fly with {airline} —{" "}
            <span className="text-red-500 font-bold">{highlightDiscount}</span>
          </h2>
          <p className="text-sm sm:text-base opacity-90 mt-1">
            Exclusive flight offers available now – Search, Compare, and Book
            Instantly
          </p>
        </motion.div>

        {/* ✈️ Dynamic Secondary Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-8"
        >
          {tagline}
        </motion.h2>
      </div>
    </section>
  );
}
