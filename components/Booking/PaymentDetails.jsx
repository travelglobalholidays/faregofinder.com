"use client";

import { CheckCircle, CreditCard, Loader2, Lock, XCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { formatMoney, getCurrency } from "@/components/Booking/bookingUtils";

const inputClass =
  "w-full rounded-lg border border-subtle bg-light-grey px-4 py-3 text-sm text-heading outline-none transition focus:border-blue";

export default function PaymentDetails({ booking }) {
  const { bookingId } = useParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [payment, setPayment] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const currency = getCurrency(booking);
  const total = booking?.totalAmount || booking?.offerSnapshot?.totalAmount || 0;

  const update = (key, value) => {
    setPayment((current) => ({ ...current, [key]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (payment.cardNumber.length < 16 || payment.cvv.length < 3) {
      alert("Please enter valid card details.");
      return;
    }
    setShowModal(true);
  };

  const confirmPayment = async () => {
    if (processing) return;
    try {
      setProcessing(true);
      const response = await axiosInstance.post(
        `/bookings/${bookingId}/payment-details`,
        { ...payment, paymentMethod: "credit_card" },
      );
      const reference = response.data?.data?.bookingReference;
      if (reference) {
        setPayment({ cardNumber: "", cardHolder: "", expiryMonth: "", expiryYear: "", cvv: "" });
        router.push(`/booking/confirmation/${reference}`);
      } else {
        throw new Error("The booking service did not return a confirmation reference. Please check your booking before trying again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.response?.data?.message || error.message || "Failed to save payment details");
    } finally {
      setProcessing(false);
      setShowModal(false);
    }
  };

  if (booking?.bookingStatus === "confirmed" && booking?.bookingReference) {
    return (
      <section className="rounded-xl border border-subtle bg-white p-8 text-center shadow-theme">
        <CheckCircle className="mx-auto size-14 text-green" />
        <h2 className="mt-4 font-poppins-semibold text-xl text-heading">
          Booking Already Confirmed
        </h2>
        <button
          className="mt-6 rounded-lg bg-blue px-6 py-3 font-poppins-semibold text-white"
          onClick={() => router.push(`/booking/confirmation/${booking.bookingReference}`)}
          type="button"
        >
          View Confirmation
        </button>
      </section>
    );
  }

  return (
    <>
      <section className="overflow-hidden rounded-xl border border-subtle bg-white shadow-theme">
        <div className="bg-blue px-6 py-4 font-poppins-semibold text-white">
          Payment Details
        </div>
        <form className="space-y-5 p-6" onSubmit={submit}>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className={inputClass}
              maxLength={16}
              onChange={(event) =>
                update("cardNumber", event.target.value.replace(/\D/g, ""))
              }
              placeholder="Card Number*"
              required
              value={payment.cardNumber}
            />
            <input
              className={inputClass}
              onChange={(event) => update("cardHolder", event.target.value)}
              placeholder="Card Holder Name*"
              required
              value={payment.cardHolder}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <select
              className={inputClass}
              onChange={(event) => update("expiryMonth", event.target.value)}
              required
              value={payment.expiryMonth}
            >
              <option value="">Month*</option>
              {Array.from({ length: 12 }, (_, index) => {
                const month = String(index + 1).padStart(2, "0");
                return (
                  <option key={month} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
            <select
              className={inputClass}
              onChange={(event) => update("expiryYear", event.target.value)}
              required
              value={payment.expiryYear}
            >
              <option value="">Year*</option>
              {Array.from({ length: 15 }, (_, index) => {
                const year = new Date().getFullYear() + index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <input
              className={inputClass}
              maxLength={4}
              onChange={(event) => update("cvv", event.target.value.replace(/\D/g, ""))}
              placeholder="CVV*"
              required
              type="password"
              value={payment.cvv}
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-light">
            <Lock className="size-4 text-blue" />
            Review the payment amount and booking terms before authorizing payment.
          </div>
          <button
            className="w-full rounded-lg bg-green py-4 font-poppins-semibold text-accent-contrast transition hover:bg-green/90"
            type="submit"
          >
            Review & Complete Booking
          </button>
        </form>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="bg-blue px-6 py-4 text-white">
              <h3 className="flex items-center gap-2 font-poppins-semibold text-xl text-white">
                <CreditCard className="size-5" />
                Confirm Your Payment
              </h3>
            </div>
            <div className="space-y-5 p-6">
              {processing ? (
                <div className="py-8 text-center">
                  <Loader2 className="mx-auto size-12 animate-spin text-blue" />
                  <p className="mt-4 font-poppins-semibold text-heading">
                    Processing payment...
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-lg bg-light-grey p-4">
                    <div className="flex justify-between font-poppins-semibold text-heading">
                      <span>Total to Pay</span>
                      <span className="text-blue">
                        {formatMoney(total, currency)}
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-sm text-light-blue">
                      **** **** **** {payment.cardNumber.slice(-4)}
                    </p>
                  </div>
                  <p className="text-sm text-light">
                    By confirming, you authorize FaresGoFinder to process this
                    booking and save masked payment details.
                  </p>
                </>
              )}
            </div>
            {!processing && (
              <div className="flex justify-end gap-3 border-t border-subtle px-6 py-4">
                <button
                  className="inline-flex items-center gap-2 rounded-lg border border-subtle px-5 py-2.5 text-sm font-poppins-semibold text-light-blue"
                  onClick={() => setShowModal(false)}
                  type="button"
                >
                  <XCircle className="size-4" />
                  Cancel
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2.5 text-sm font-poppins-semibold text-white"
                  onClick={confirmPayment}
                  type="button"
                >
                  <CheckCircle className="size-4" />
                  Confirm & Pay
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
