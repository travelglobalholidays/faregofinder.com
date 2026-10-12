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
      { text: "Check the selected airline baggage allowance", allowed: true },
    ],
  },
  flexi: {
    name: "Additional Assistance",
    price: 49.99,
    features: [
      { text: "Review agency and airline change charges", allowed: true },
      { text: "Cancellation assistance; ticket rules apply", allowed: true },
      { text: "Booking assistance; response times vary", allowed: true },
      { text: "Seat selection guidance; airline fees may apply", allowed: true },
    ],
  },
};

const FareCard = ({ active, badge, fare, id, onSelect, disabled }) => (
  <button
    className={`relative rounded-xl border p-6 text-left transition hover:shadow-theme ${
      active ? "border-blue shadow-theme" : "border-subtle hover:border-blue/40"
    }`}
    onClick={() => onSelect(id)}
    disabled={disabled}
    type="button"
  >
    {badge && (
      <span className="absolute -top-3 left-4 rounded-full bg-blue px-3 py-1 text-xs font-poppins-semibold text-white">
        Additional option
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
  const [error, setError] = useState("");

  const handleFareSelect = async (fareType) => {
    if (loading) return;
    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.put(`/bookings/${bookingId}/fare`, {
        fareType,
      });
      setBooking?.(response.data.data);
      setSelected(fareType);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to save this option. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-xl border border-subtle bg-white p-6 shadow-theme">
      <h2 className="mb-6 font-poppins-semibold text-lg text-heading">
        Review Assistance Options
      </h2>
      <div className="grid gap-5 md:grid-cols-2">
        <FareCard
          active={selected === "standard"}
          fare={fares.standard}
          id="standard"
          onSelect={handleFareSelect}
          disabled={loading}
        />
        <FareCard
          active={selected === "flexi"}
          badge
          fare={fares.flexi}
          id="flexi"
          onSelect={handleFareSelect}
          disabled={loading}
        />
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
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
