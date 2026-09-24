"use client";

import BookingSidebar from "@/components/Booking/BookingSidebar";
import FlightDetails from "@/components/Booking/FlightDetails";
import PaymentDetails from "@/components/Booking/PaymentDetails";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import axiosInstance from "@/lib/axiosInstance";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/bookings/${bookingId}`);
        setBooking(response.data.data);
      } finally {
        setLoading(false);
      }
    };
    if (bookingId) fetchBooking();
  }, [bookingId]);

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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-light-grey py-8">
        <div className="container">
          <div className="mb-5 text-sm text-light">
            Booking / <span className="text-heading">Payment</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <FlightDetails booking={booking} />
              <PaymentDetails booking={booking} />
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
