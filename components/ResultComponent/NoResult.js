"use client";

import {
  PhoneCall,
  PlaneIcon,
  Search,
  Calendar,
  MapPin,
  Users,
  Star,
  Shield,
  Clock,
} from "lucide-react";
import { CONTACT_INFO } from "@/config/ContactInfo";

export default function NoFlightsFound({
  phone = CONTACT_INFO.phoneDisplayDashed,
  agencyName = CONTACT_INFO.brandName,
}) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-center px-6 py-16">
      {/* === Premium Header Section === */}
      <div className="max-w-2xl mx-auto">
        {/* === Main Title === */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          No Flights Found
          <span className="block text-lg md:text-xl font-semibold text-blue-600 mt-2">
            Let Our Experts Find You The Best Deals
          </span>
        </h1>

        {/* === Enhanced Description === */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            We searched available flight options but could not find a clear
            match for your criteria. The travel support team at{" "}
            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg">
              {agencyName}
            </span>{" "}
            can help you review alternate dates, nearby airports, route options,
            and fare rules.
          </p>
        </div>

        {/* === Solutions Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Flexible Dates</h3>
            <p className="text-sm text-gray-600">
              Try different travel periods for better prices
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Nearby Airports
            </h3>
            <p className="text-sm text-gray-600">
              Explore alternative departure cities
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Expert Help</h3>
            <p className="text-sm text-gray-600">
              Our agents can review alternate search options
            </p>
          </div>
        </div>

        {/* === Trust Indicators === */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-500" />
            <span>Verified Airlines</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>24/7 Support</span>
          </div>
        </div>

        {/* === Enhanced Call-to-Action === */}
        <div className="bg-gradient-to-r from-[var(--theme-color)] via-[var(--text-primary)] to-[var(--theme-color2)] rounded-2xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 mb-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white text-left">
                <h3 className="text-xl font-bold mb-1 text-white">
                  Speak with a Travel Expert
                </h3>
                <p className="text-orange-100 text-sm">
                  Get help reviewing flight options and booking details
                </p>
              </div>
              <a
                href={CONTACT_INFO.phoneHref}
                className="group relative bg-white text-[var(--theme-color)] hover:bg-gray-50 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 min-w-[200px] justify-center"
              >
                <PhoneCall className="w-5 h-5" />
                <span>{phone}</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </a>
            </div>
          </div>
        </div>

        {/* === Additional Benefits === */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">
            Why Call Our Experts?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Help with flexible dates and nearby airports</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Review of airline fare rules and restrictions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Support with booking details before payment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>

        {/* === Footer Note === */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Fares and availability can change until booking is confirmed.
          </p>
        </div>
      </div>
    </div>
  );
}
