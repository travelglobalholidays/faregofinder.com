"use client";

import BookingSidebar from "@/components/Booking/BookingSidebar";
import FlightDetails from "@/components/Booking/FlightDetails";
import ServicesAddons from "@/components/Booking/ServicesAddons";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import axiosInstance from "@/lib/axiosInstance";
import { ArrowRight, Loader2, Lock, Shield } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddonsPage() {
  const { bookingId } = useParams();
  const router = useRouter();
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
            Booking / <span className="text-heading">Add-on Services</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <FlightDetails booking={booking} />
              <ServicesAddons booking={booking} setBooking={setBooking} />
              <div className="flex justify-end">
                <button
                  className="flex items-center gap-2 rounded-lg bg-blue px-7 py-3 font-poppins-semibold text-white transition hover:bg-blue-dark"
                  onClick={() => router.push(`/booking/${bookingId}/payment`)}
                  type="button"
                >
                  Continue to Payment
                  <ArrowRight className="size-4" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-light">
                <Shield className="size-4 text-blue" />
                Secure checkout
                <Lock className="size-4 text-blue" />
              </div>
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
