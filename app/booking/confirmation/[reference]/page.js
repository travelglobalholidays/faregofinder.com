"use client";

import {
  formatDate,
  formatDuration,
  formatMoney,
  formatTime,
  getCurrency,
} from "@/components/Booking/bookingUtils";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import axiosInstance from "@/lib/axiosInstance";
import {
  CheckCircle,
  CreditCard,
  Download,
  Loader2,
  Mail,
  Plane,
  Printer,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingConfirmationPage() {
  const { reference } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/bookings/reference/${reference}`,
        );
        setBooking(response.data.data);
        setError("");
      } catch (err) {
        console.error("Confirmation fetch error:", err);
        setError("Failed to load booking confirmation.");
      } finally {
        setLoading(false);
      }
    };
    if (reference) fetchBooking();
  }, [reference]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="size-10 animate-spin text-blue" />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !booking) {
    return (
      <>
        <Header />
        <main className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <XCircle className="mx-auto mb-3 size-10 text-red-500" />
            <p className="font-poppins-semibold text-red-600">
              {error || "Booking not found"}
            </p>
            <Link
              className="mt-5 inline-flex rounded-lg bg-blue px-5 py-2.5 font-poppins-semibold text-white"
              href="/"
            >
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const snapshot = booking.offerSnapshot || {};
  const currency = getCurrency(booking);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-light-grey py-10">
        <div className="container">
          <div className="mb-8 text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green/10">
              <CheckCircle className="size-10 text-green" />
            </div>
            <h1 className="mt-4 font-poppins-semibold text-3xl text-heading md:text-4xl">
              Booking Confirmed!
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-light">
              Your booking has been completed. A confirmation email has been
              sent to {booking.contactInfo?.email || "your email"}.
            </p>
          </div>

          <div className="mb-8 rounded-xl bg-blue p-6 text-white shadow-theme">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/75">Booking Reference</p>
                <p className="font-mono text-3xl font-bold tracking-wider">
                  {booking.bookingReference}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2"
                  onClick={() => window.print()}
                  type="button"
                >
                  <Printer className="size-4" />
                  Print
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2"
                  type="button"
                >
                  <Download className="size-4" />
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <section className="overflow-hidden rounded-xl border border-subtle bg-white shadow-theme">
                <div className="border-b border-subtle px-6 py-4">
                  <h2 className="flex items-center gap-2 font-poppins-semibold text-lg text-heading">
                    <Plane className="size-5 text-blue" />
                    Flight Details
                  </h2>
                </div>
                <div className="space-y-6 p-6">
                  <div className="flex items-center gap-3 border-b border-subtle pb-4">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-light-grey">
                      <Plane className="size-6 text-blue" />
                    </div>
                    <div>
                      <p className="font-poppins-semibold text-heading">
                        {snapshot.airline?.name || "Airline"}
                      </p>
                      <p className="text-sm text-light">
                        Flight {snapshot.slices?.[0]?.flightNumber || "N/A"}
                      </p>
                    </div>
                  </div>

                  {snapshot.slices?.map((slice, index) => (
                    <div
                      className="rounded-lg border border-subtle p-5"
                      key={`${slice.origin}-${slice.destination}-${index}`}
                    >
                      <div className="mb-4 flex justify-between gap-3">
                        <span className="rounded-full bg-light-grey px-3 py-1 text-sm font-poppins-semibold text-blue">
                          {index === 0 ? "Outbound Flight" : "Return Flight"}
                        </span>
                        <span className="text-sm text-light">
                          {formatDuration(slice.duration)}
                        </span>
                      </div>
                      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                        <div className="text-center">
                          <p className="text-2xl font-poppins-semibold text-heading">
                            {slice.origin}
                          </p>
                          <p className="text-sm text-light-blue">
                            {formatTime(slice.departureTime)}
                          </p>
                          <p className="text-xs text-light">
                            {formatDate(slice.departureTime)}
                          </p>
                        </div>
                        <div className="h-px w-24 bg-subtle" />
                        <div className="text-center">
                          <p className="text-2xl font-poppins-semibold text-heading">
                            {slice.destination}
                          </p>
                          <p className="text-sm text-light-blue">
                            {formatTime(slice.arrivalTime)}
                          </p>
                          <p className="text-xs text-light">
                            {formatDate(slice.arrivalTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-subtle bg-white shadow-theme">
                <div className="border-b border-subtle px-6 py-4">
                  <h2 className="flex items-center gap-2 font-poppins-semibold text-lg text-heading">
                    <User className="size-5 text-blue" />
                    Passenger Details
                  </h2>
                </div>
                <div className="divide-y divide-subtle p-6">
                  {booking.passengers?.map((passenger, index) => (
                    <div className="py-3 first:pt-0 last:pb-0" key={index}>
                      <p className="font-poppins-semibold text-heading">
                        {passenger.title} {passenger.firstName}{" "}
                        {passenger.lastName}
                      </p>
                      <p className="mt-1 text-sm capitalize text-light">
                        {passenger.type} - {passenger.gender} -{" "}
                        {passenger.nationality}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="overflow-hidden rounded-xl border border-subtle bg-white shadow-theme">
                <div className="border-b border-subtle px-6 py-4">
                  <h2 className="font-poppins-semibold text-lg text-heading">
                    Payment Summary
                  </h2>
                </div>
                <div className="space-y-3 p-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-light">Total Paid</span>
                    <span className="font-poppins-semibold text-blue">
                      {formatMoney(booking.totalAmount, currency)}
                    </span>
                  </div>
                  {booking.paymentDetails && (
                    <div className="mt-4 rounded-lg bg-light-grey p-4">
                      <p className="mb-2 flex items-center gap-2 font-poppins-semibold text-heading">
                        <CreditCard className="size-4 text-blue" />
                        Payment Method
                      </p>
                      <p className="text-light-blue">
                        {booking.paymentDetails.maskedCardNumber}
                      </p>
                      <p className="text-light">
                        {booking.paymentDetails.cardHolder}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              <div className="grid gap-3">
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-5 py-3 font-poppins-semibold text-white">
                  <Download className="size-4" />
                  Download E-Ticket
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-5 py-3 font-poppins-semibold text-accent-contrast">
                  <Mail className="size-4" />
                  Email Confirmation
                </button>
                <Link
                  className="inline-flex items-center justify-center rounded-lg bg-heading px-5 py-3 font-poppins-semibold text-white"
                  href="/"
                >
                  Book Another Flight
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
