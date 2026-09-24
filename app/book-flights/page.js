"use client";

import { Suspense } from "react";

import BookFlightsDescription from "@/components/BookFlightsDescription";
import BookFlightsHero from "@/components/BookFlightsHero";
import Footer from "@/components/Footer";
import GenericBanner from "@/components/GenericComponents/GenericBannner";
import Navbar from "@/components/Headers/Navbar";
import Services from "@/components/Services";

function BookFlightsContent() {
  return (
    <>
      <Navbar />

      <div className="md:hidden">
        <BookFlightsHero />
      </div>

      <GenericBanner
        title="Review Fares Before You Book"
        subheading="Check route options, passenger details, fare rules, and booking support before confirming your trip."
      />

      <Services />
      <BookFlightsDescription />
      <Footer />
    </>
  );
}

export default function BookFlightPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading flights...</div>}>
      <BookFlightsContent />
    </Suspense>
  );
}
