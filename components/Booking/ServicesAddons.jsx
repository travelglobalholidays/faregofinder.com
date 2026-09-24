"use client";

import { CheckCircle, Clock, Luggage, Minus, Plus, Shield, TrendingDown } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { getPassengerCount } from "@/components/Booking/bookingUtils";

const servicePrices = {
  travelInsurance: 33,
  tripProtection: 39,
  priceDropProtection: 21,
  autoCheckIn: 15,
};

const AddonCard = ({ description, icon, onChange, price, selected, title }) => (
  <div
    className={`rounded-xl border bg-white p-6 shadow-theme transition ${
      selected ? "border-blue bg-light-grey" : "border-subtle"
    }`}
  >
    <div className="flex gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-light-grey">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <h3 className="text-lg font-poppins-semibold text-heading">
              {title}
            </h3>
            <p className="mt-1 text-sm text-light">{description}</p>
          </div>
          <p className="text-xl font-poppins-semibold text-blue">
            ${price.toFixed(2)}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            className={`rounded-lg px-5 py-2.5 text-sm font-poppins-semibold text-white transition ${
              selected ? "bg-green hover:bg-green/90" : "bg-blue hover:bg-blue-dark"
            }`}
            onClick={() => onChange(!selected)}
            type="button"
          >
            {selected ? "Added" : "Add Service"}
          </button>
          {selected && (
            <button
              className="rounded-lg border border-subtle px-5 py-2.5 text-sm font-poppins-semibold text-light-blue transition hover:bg-light-grey"
              onClick={() => onChange(false)}
              type="button"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function ServicesAddons({ booking, setBooking }) {
  const { bookingId } = useParams();
  const passengerCount = getPassengerCount(booking);
  const [addons, setAddons] = useState({
    extraBaggageOutbound: booking?.internalAddons?.extraBaggage?.outbound || 0,
    extraBaggageReturn: booking?.internalAddons?.extraBaggage?.return || 0,
    travelInsurance: booking?.internalAddons?.travelInsurance?.selected || false,
    tripProtection: booking?.internalAddons?.tripProtection?.selected || false,
    priceDropProtection:
      booking?.internalAddons?.priceDropProtection?.selected || false,
    autoCheckIn: booking?.internalAddons?.autoCheckIn?.selected || false,
  });

  const updateAddons = async (nextAddons) => {
    setAddons(nextAddons);
    try {
      const response = await axiosInstance.post(
        `/bookings/${bookingId}/addons`,
        nextAddons,
      );
      setBooking(response.data.data);
    } catch (error) {
      console.error("Addon update error:", error);
    }
  };

  const updateBaggage = (key, direction) => {
    const nextValue =
      direction === "increase"
        ? Math.min(addons[key] + 1, 3)
        : Math.max(addons[key] - 1, 0);
    updateAddons({ ...addons, [key]: nextValue });
  };

  const serviceTotal =
    (addons.extraBaggageOutbound + addons.extraBaggageReturn) *
      50 *
      passengerCount +
    (addons.travelInsurance ? servicePrices.travelInsurance * passengerCount : 0) +
    (addons.tripProtection ? servicePrices.tripProtection * passengerCount : 0) +
    (addons.priceDropProtection
      ? servicePrices.priceDropProtection * passengerCount
      : 0) +
    (addons.autoCheckIn ? servicePrices.autoCheckIn * passengerCount : 0);

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-subtle bg-light-grey p-6">
        <h2 className="font-poppins-semibold text-2xl text-heading">
          Enhance Your Journey
        </h2>
        <p className="mt-2 text-sm text-light">
          Add services for comfort, protection, and faster travel support.
        </p>
      </div>

      <div className="rounded-xl border border-subtle bg-white p-6 shadow-theme">
        <div className="flex gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-light-grey">
            <Luggage className="size-6 text-blue" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-poppins-semibold text-heading">
              Additional Baggage
            </h3>
            <p className="mt-1 text-sm text-light">
              Add checked bags at $50 per bag per passenger.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                ["extraBaggageOutbound", "Outbound Flight"],
                ["extraBaggageReturn", "Return Flight"],
              ].map(([key, label]) => (
                <div className="rounded-lg bg-light-grey p-4" key={key}>
                  <div className="mb-3 flex justify-between">
                    <span className="font-poppins-semibold text-heading">
                      {label}
                    </span>
                    <span className="text-sm text-light">
                      ${addons[key] * 50 * passengerCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="flex size-8 items-center justify-center rounded-full border border-subtle text-light-blue disabled:opacity-40"
                      disabled={addons[key] === 0}
                      onClick={() => updateBaggage(key, "decrease")}
                      type="button"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-8 text-center font-poppins-semibold text-heading">
                      {addons[key]}
                    </span>
                    <button
                      className="flex size-8 items-center justify-center rounded-full bg-blue text-white disabled:opacity-40"
                      disabled={addons[key] >= 3}
                      onClick={() => updateBaggage(key, "increase")}
                      type="button"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddonCard
        description="Coverage for cancellation, emergency medical support, and baggage issues."
        icon={<Shield className="size-6 text-green" />}
        onChange={(value) => updateAddons({ ...addons, travelInsurance: value })}
        price={servicePrices.travelInsurance * passengerCount}
        selected={addons.travelInsurance}
        title="Travel Insurance"
      />
      <AddonCard
        description="Protection for delays, interruptions, and missed connections."
        icon={<Clock className="size-6 text-blue" />}
        onChange={(value) => updateAddons({ ...addons, tripProtection: value })}
        price={servicePrices.tripProtection * passengerCount}
        selected={addons.tripProtection}
        title="Trip Protection Plan"
      />
      <AddonCard
        description="If the fare drops after booking, request support for the difference."
        icon={<TrendingDown className="size-6 text-orange-600" />}
        onChange={(value) =>
          updateAddons({ ...addons, priceDropProtection: value })
        }
        price={servicePrices.priceDropProtection * passengerCount}
        selected={addons.priceDropProtection}
        title="Price Drop Protection"
      />
      <AddonCard
        description="We help with check-in and boarding pass delivery."
        icon={<CheckCircle className="size-6 text-green" />}
        onChange={(value) => updateAddons({ ...addons, autoCheckIn: value })}
        price={servicePrices.autoCheckIn * passengerCount}
        selected={addons.autoCheckIn}
        title="Automatic Check-In"
      />

      <div className="rounded-xl border border-subtle bg-light-grey p-6">
        <div className="flex justify-between font-poppins-semibold text-heading">
          <span>Total Add-ons</span>
          <span className="text-blue">${serviceTotal.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}
