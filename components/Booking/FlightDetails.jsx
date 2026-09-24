"use client";

import { AlertCircle, Briefcase, Clock, Plane } from "lucide-react";
import {
  formatDate,
  formatDuration,
  formatTime,
} from "@/components/Booking/bookingUtils";

const FlightDetails = ({ booking }) => {
  const snapshot = booking?.offerSnapshot;

  if (!snapshot) {
    return (
      <section className="rounded-xl border border-subtle bg-white p-6 shadow-theme">
        <p className="text-sm text-light">Loading flight details...</p>
      </section>
    );
  }

  const checked =
    snapshot.baggageIncluded?.find((item) => item.type === "checked")
      ?.quantity || 0;
  const cabin =
    snapshot.baggageIncluded?.find((item) =>
      ["carry_on", "cabin"].includes(item.type),
    )?.quantity || 1;

  return (
    <section className="overflow-hidden rounded-xl border border-subtle bg-white shadow-theme">
      <div className="flex items-center justify-between bg-blue px-5 py-4 text-white">
        <h2 className="font-poppins-semibold text-base text-white">
          Flight Summary
        </h2>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs">
          {snapshot.fareBrandName || snapshot.cabinClass || "Selected fare"}
        </span>
      </div>

      <div className="space-y-6 p-5 md:p-6">
        <div className="flex items-center gap-3 border-b border-subtle pb-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-light-grey">
            <Plane className="size-6 text-blue" />
          </div>
          <div>
            <p className="font-poppins-semibold text-heading">
              {snapshot.airline?.name || "Airline"}
            </p>
            <p className="text-xs uppercase text-light">
              Cabin: {snapshot.cabinClass || "Economy"}
            </p>
          </div>
        </div>

        {snapshot.slices?.map((slice, index) => (
          <div
            className="rounded-lg border border-subtle p-5"
            key={`${slice.origin}-${slice.destination}-${index}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle pb-3 text-sm">
              <span className="font-poppins-semibold text-heading">
                {index === 0 ? "Departure Flight" : "Return Flight"}
              </span>
              <span className="flex items-center gap-1 text-light">
                <Clock className="size-4 text-blue" />
                {formatDuration(slice.duration)}
              </span>
            </div>

            <div className="mt-5 grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
              <div className="text-center">
                <p className="text-3xl font-poppins-semibold text-heading">
                  {slice.origin}
                </p>
                <p className="mt-2 text-sm font-poppins-medium text-heading">
                  {formatTime(slice.departureTime)}
                </p>
                <p className="text-xs text-light">
                  {formatDate(slice.departureTime)}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Plane className="size-6 rotate-90 text-blue" />
                <div className="my-2 h-px w-24 bg-subtle" />
                <span className="text-xs text-light">
                  Flight {slice.flightNumber || "N/A"}
                </span>
              </div>

              <div className="text-center">
                <p className="text-3xl font-poppins-semibold text-heading">
                  {slice.destination}
                </p>
                <p className="mt-2 text-sm font-poppins-medium text-heading">
                  {formatTime(slice.arrivalTime)}
                </p>
                <p className="text-xs text-light">
                  {formatDate(slice.arrivalTime)}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="rounded-lg border border-subtle bg-light-grey p-5">
          <p className="flex items-center gap-2 font-poppins-semibold text-heading">
            <Briefcase className="size-4 text-blue" />
            Baggage Allowance
          </p>
          <div className="mt-3 space-y-1 text-sm text-light-blue">
            <p>Cabin Bag: {cabin} piece per passenger</p>
            <p>
              Checked Bag:{" "}
              {checked > 0 ? `${checked} bag included` : "Not included"}
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>
            This fare can expire soon. Complete your booking to secure the
            selected price.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlightDetails;
