"use client";

import BookingSidebar from "@/components/Booking/BookingSidebar";
import ContactInfo from "@/components/Booking/ContactInfo";
import FlightDetails from "@/components/Booking/FlightDetails";
import TravellersDetails, {
  createInitialTravellers,
  toPassengerPayload,
} from "@/components/Booking/TravellersDetails";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axiosInstance";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const emptyContact = {
  email: "",
  country: "",
  state: "",
  street1: "",
  street2: "",
  city: "",
  zip: "",
  phone: "",
};

export default function TravellersPage() {
  const { bookingId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [travellers, setTravellers] = useState([]);
  const [contact, setContact] = useState(emptyContact);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setFetchLoading(true);
        const response = await axiosInstance.get(`/bookings/${bookingId}`);
        const bookingData = response.data.data;
        setBooking(bookingData);
        setTravellers(createInitialTravellers(bookingData));
        setContact((current) => ({
          ...current,
          email: user?.email || bookingData.contactInfo?.email || "",
          phone: bookingData.contactInfo?.phone || "",
        }));
        setError("");
      } catch (err) {
        console.error("Booking fetch error:", err);
        setError("Failed to load booking details.");
      } finally {
        setFetchLoading(false);
      }
    };
    if (bookingId) fetchBooking();
  }, [bookingId, user?.email]);

  const handleSave = async () => {
    const passengers = toPassengerPayload(travellers);
    const missingPassenger = passengers.some(
      (item) =>
        !item.firstName ||
        !item.lastName ||
        !item.dateOfBirth ||
        !item.gender ||
        !item.nationality,
    );

    if (!contact.email || !contact.phone || missingPassenger) {
      alert("Please complete contact and traveller required fields.");
      return;
    }

    try {
      setSaving(true);
      await axiosInstance.put(`/bookings/${bookingId}/travellers`, {
        contactInfo: {
          email: contact.email,
          phone: contact.phone,
        },
        passengers,
      });
      router.push(`/booking/${bookingId}/addons`);
    } catch (err) {
      console.error("Traveller save error:", err);
      alert(err.response?.data?.message || "Failed to save traveller details");
    } finally {
      setSaving(false);
    }
  };

  if (fetchLoading) {
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
          <p className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            {error || "Booking not found"}
          </p>
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
            Booking / <span className="text-heading">Traveller Details</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <FlightDetails booking={booking} />
              <ContactInfo
                contact={contact}
                setContact={setContact}
                user={user}
              />
              <TravellersDetails
                setTravellers={setTravellers}
                travellers={travellers}
              />
              <div className="flex justify-end">
                <button
                  className="rounded-lg bg-blue px-7 py-3 font-poppins-semibold text-white transition hover:bg-blue-dark disabled:opacity-60"
                  disabled={saving}
                  onClick={handleSave}
                  type="button"
                >
                  {saving ? "Saving..." : "Continue to Add-ons"}
                </button>
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
