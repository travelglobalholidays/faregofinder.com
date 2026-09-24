"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

const fares = {
  standard: {
    name: "Standard Service",
    price: 0,
    features: [
      { text: "Airline change fees apply", allowed: false },
      { text: "Standard cancellation penalties", allowed: false },
      { text: "Seat selection at check-in", allowed: false },
      { text: "Standard baggage included", allowed: true },
    ],
  },
  flexi: {
    name: "FlexiFly Service",
    price: 49.99,
    features: [
      { text: "No service change fees", allowed: true },
      { text: "Reduced cancellation support", allowed: true },
      { text: "Priority customer support", allowed: true },
      { text: "Free seat selection assistance", allowed: true },
    ],
  },
};

const FareCard = ({ active, badge, fare, id, onSelect }) => (
  <button
    className={`relative rounded-xl border p-6 text-left transition hover:shadow-theme ${
      active ? "border-blue shadow-theme" : "border-subtle hover:border-blue/40"
    }`}
    onClick={() => onSelect(id)}
    type="button"
  >
    {badge && (
      <span className="absolute -top-3 left-4 rounded-full bg-blue px-3 py-1 text-xs font-poppins-semibold text-white">
        Most Popular
      </span>
    )}
    <div className="mb-4 flex justify-between gap-3">
      <h3 className="font-poppins-semibold text-heading">{fare.name}</h3>
      <span
        className={`flex size-5 items-center justify-center rounded-full border-2 ${
          active ? "border-blue" : "border-subtle"
        }`}
      >
        {active && <span className="size-2.5 rounded-full bg-blue" />}
      </span>
    </div>
    <p className="mb-4 text-2xl font-poppins-semibold text-blue">
      ${fare.price.toFixed(2)}
    </p>
    <ul className="space-y-3 text-sm">
      {fare.features.map((feature) => (
        <li className="flex items-start gap-2" key={feature.text}>
          {feature.allowed ? (
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-green" />
          ) : (
            <XCircle className="mt-0.5 size-4 shrink-0 text-light" />
          )}
          <span className={feature.allowed ? "text-heading" : "text-light"}>
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
  </button>
);

export default function ChooseFareType({ booking, setBooking }) {
  const router = useRouter();
  const bookingId = booking?._id;
  const [selected, setSelected] = useState(booking?.fareType || "standard");
  const [loading, setLoading] = useState(false);

  const handleFareSelect = async (fareType) => {
    setSelected(fareType);
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/bookings/${bookingId}/fare`, {
        fareType,
      });
      setBooking?.(response.data.data);
    } catch (error) {
      console.error("Fare update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-xl border border-subtle bg-white p-6 shadow-theme">
      <h2 className="mb-6 font-poppins-semibold text-lg text-heading">
        Choose Your Fare Type
      </h2>
      <div className="grid gap-5 md:grid-cols-2">
        <FareCard
          active={selected === "standard"}
          fare={fares.standard}
          id="standard"
          onSelect={handleFareSelect}
        />
        <FareCard
          active={selected === "flexi"}
          badge
          fare={fares.flexi}
          id="flexi"
          onSelect={handleFareSelect}
        />
      </div>
      <div className="mt-8 flex justify-end">
        <button
          className="rounded-lg bg-blue px-6 py-3 font-poppins-semibold text-white shadow-theme transition hover:bg-blue-dark disabled:opacity-60"
          disabled={loading}
          onClick={() => router.push(`/booking/${bookingId}/travellers`)}
          type="button"
        >
          {loading ? "Saving..." : "Continue to Traveller Info"}
        </button>
      </div>
    </section>
  );
}
