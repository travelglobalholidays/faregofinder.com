"use client";
import { Phone, CheckCircle, Zap } from "lucide-react";
import { CONTACT_INFO } from "@/config/ContactInfo";

export default function CTASection() {
  return (
    <section className="relative bg-primary overflow-hidden py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex gap-12 items-center">
          {/* Content */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="flex items-center bg-amber-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-6 w-fit">
              <Zap className="h-4 w-4 mr-2 fill-current" />
              INDEPENDENT TRAVEL ASSISTANCE
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Get Clear Support For Your Next Flight Booking
            </h2>

            <ul className="space-y-3 mb-8">
              {[
                "Clear fare and itinerary guidance",
                "Independent booking assistance",
                "Support for travel questions",
              ].map((item) => (
                <li key={item} className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 text-amber-400 mr-2" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-center justify-center px-8 py-3 text-lg font-bold rounded-lg border-2 border-amber-400 text-amber-400 hover:bg-secondary/50 transition-all"
              >
                <Phone className="mr-2 h-5 w-5" /> CALL FOR BOOKING ASSISTANCE
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative h-64 lg:h-80 rounded-xl overflow-hidden shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center"></div>

            {/* Overlay with content */}
            <div className="absolute inset-0  flex items-center justify-center">
              <div className="text-center p-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
