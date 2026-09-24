"use client";

import { ShieldCheck } from "lucide-react";
import {
  formatMoney,
  getCurrency,
  getPassengerCount,
} from "@/components/Booking/bookingUtils";

const Row = ({ children, value }) => (
  <div className="flex justify-between gap-4 border-b border-subtle pb-2 text-sm">
    <span className="text-light">{children}</span>
    <span className="font-poppins-semibold text-heading">{value}</span>
  </div>
);

export default function BookingSidebar({ booking }) {
  if (!booking) {
    return (
      <aside className="rounded-xl border border-subtle bg-white p-6 shadow-theme">
        <p className="text-center text-sm text-light">
          Loading price details...
        </p>
      </aside>
    );
  }

  const snapshot = booking.offerSnapshot || {};
  const currency = getCurrency(booking);
  const passengerCount = getPassengerCount(booking);

  return (
    <aside className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-subtle bg-white shadow-theme">
        <div className="bg-blue px-5 py-3 font-poppins-semibold text-white">
          Price Details
        </div>
        <div className="space-y-3 p-5">
          <Row
            value={formatMoney(
              booking.baseTotal || snapshot.baseAmount || 0,
              currency,
            )}
          >
            Base Fare ({passengerCount} passenger
            {passengerCount > 1 ? "s" : ""})
          </Row>
          <Row
            value={formatMoney(booking.taxTotal || snapshot.taxAmount || 0, currency)}
          >
            Taxes & Fees
          </Row>
          {booking.fareAmount > 0 && (
            <Row value={formatMoney(booking.fareAmount, currency)}>
              {booking.fareType === "flexi" ? "FlexiFly Service" : "Fare"}
            </Row>
          )}
          {booking.internalAddonsAmount > 0 && (
            <Row value={formatMoney(booking.internalAddonsAmount, currency)}>
              Additional Services
            </Row>
          )}
          <div className="flex justify-between gap-4 border-t border-subtle pt-4 text-lg font-poppins-semibold">
            <span className="text-heading">Total Price</span>
            <span className="text-blue">
              {formatMoney(booking.totalAmount || snapshot.totalAmount, currency)}
            </span>
          </div>
          <p className="border-t border-subtle pt-3 text-xs text-light">
            All taxes and fees included.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-subtle bg-white shadow-theme">
        <div className="bg-blue px-5 py-3 font-poppins-semibold text-white">
          Secure SSL Booking
        </div>
        <div className="p-6 text-center">
          <ShieldCheck className="mx-auto size-12 text-green" />
          <p className="mt-3 text-sm text-light-blue">
            Your transaction is protected with encrypted checkout.
          </p>
        </div>
      </div>
    </aside>
  );
}
