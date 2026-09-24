"use client";

import BookingSidebar from "@/components/Booking/BookingSidebar";
import ChooseFareType from "@/components/Booking/ChooseFareType";
import FlightDetails from "@/components/Booking/FlightDetails";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import axiosInstance from "@/lib/axiosInstance";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const LoadingState = () => (
  <>
    <Header />
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto size-10 animate-spin text-blue" />
        <p className="mt-4 text-sm font-poppins-medium text-light">
          Loading booking details...
        </p>
      </div>
    </div>
    <Footer />
  </>
);

export default function BookingPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/bookings/${bookingId}`);
        setBooking(response.data.data);
        setError("");
      } catch (err) {
        console.error("Booking fetch error:", err);
        setError("Failed to load booking details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (bookingId) fetchBooking();
  }, [bookingId]);

  if (loading) return <LoadingState />;

  if (error || !booking) {
    return (
      <>
        <Header />
        <main className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-poppins-semibold text-red-600">
              {error || "Booking not found"}
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-light-grey py-8">
        <div className="container">
          <div className="mb-5 text-sm text-light">
            Booking / <span className="text-heading">Review & Complete</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <FlightDetails booking={booking} />
              <ChooseFareType booking={booking} setBooking={setBooking} />
            </div>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <BookingSidebar booking={booking} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
