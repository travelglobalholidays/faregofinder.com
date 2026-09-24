"use client";

import {
  ShieldCheck,
  Star,
  Globe,
  Headset,
  Lightbulb,
  Users,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { CONTACT_INFO } from "@/config/ContactInfo";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Who We Are */}
      <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-dark mb-6">
            About Fare and Click – Reliable Travel Booking Assistance
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Fare and Click is a professional travel booking service focused on
              helping travelers plan their journeys with clarity and confidence.
              We provide structured booking assistance for domestic and
              international travel, ensuring a smooth and well-informed
              reservation experience.
            </p>
            <p>
              Our approach is centered on transparency, flexibility, and
              dependable customer support. Whether you are planning a business
              trip, family vacation, or international journey, Fare and Click
              works to simplify the booking process and support you at every
              stage of your travel planning.
            </p>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-8 h-full flex items-center justify-center">
          <img
            src="/images/call-center.webp"
            alt="Fare and Click Support Team"
            className="rounded-lg shadow-md w-full h-auto max-h-96 object-cover"
          />
        </div>
      </div>

      {/* Mission and Values */}
      <div className="bg-primary text-white p-10 mb-20 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold mb-8 text-center flex justify-center items-center">
          <Lightbulb className="mr-3 w-8 h-8" />
          Our Mission & Core Values
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-dark p-3 rounded-full mr-4">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Customer-Focused Support
                </h3>
                <p>
                  We focus on understanding traveler needs and providing clear,
                  personalized booking guidance to help customers make informed
                  travel decisions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-dark p-3 rounded-full mr-4">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Wide Travel Access
                </h3>
                <p>
                  Fare and Click offers access to multiple airlines and travel
                  service providers, giving travelers flexible options across
                  various destinations.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-dark p-3 rounded-full mr-4">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Secure & Responsible Practices
                </h3>
                <p>
                  We follow secure booking processes and data protection
                  standards to ensure customer information is handled safely and
                  responsibly.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-dark p-3 rounded-full mr-4">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Continuous Improvement
                </h3>
                <p>
                  Our systems and workflows are regularly updated to align with
                  current travel requirements and provide a smooth booking
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-dark mb-6 text-center">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-2 gap-10 text-gray-700">
          <ul className="space-y-4">
            <li>• Domestic and international flight booking assistance</li>
            <li>• Hotel reservation support in major destinations</li>
            <li>• Car rental and ground transportation options</li>
            <li>• Group and customized travel planning</li>
          </ul>
          <ul className="space-y-4">
            <li>• Support with itinerary planning and booking changes</li>
            <li>• Transparent pricing and secure payment processing</li>
            <li>• Customer support for booking-related questions</li>
            <li>• Information on travel protection options</li>
          </ul>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-blue-50 p-10 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-8 text-dark">
          Why Travelers Choose Fare and Click
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <ShieldCheck className="w-10 h-10 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Reliable Booking</h3>
            <p>
              Our structured booking processes help ensure accuracy,
              transparency, and traveler confidence.
            </p>
          </div>
          <div>
            <Headset className="w-10 h-10 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
            <p>
              Our support team is available to assist with reservations, updates,
              and general travel inquiries.
            </p>
          </div>
          <div>
            <Star className="w-10 h-10 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Clear & Transparent Service
            </h3>
            <p>
              We provide straightforward information so travelers understand
              booking details before confirming their plans.
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="mt-20 bg-white border border-blue-100 p-10 rounded-lg">
        <h2 className="text-3xl font-semibold text-dark mb-6 text-center">
          Contact Us
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-gray-700 text-center">
          <div>
            <Phone className="w-8 h-8 mx-auto text-primary mb-3" />
            <p className="font-medium">24/7 Support</p>
            <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phoneDisplay}</a>
          </div>
          <div>
            <Mail className="w-8 h-8 mx-auto text-primary mb-3" />
            <p className="font-medium">Email</p>
            <a href={CONTACT_INFO.emailHref}>{CONTACT_INFO.email}</a>
          </div>
          <div>
            <MapPin className="w-8 h-8 mx-auto text-primary mb-3" />
            <p className="font-medium">Office Address</p>
            <p>73-41 71 PLACE GLENDALE, NY 11385</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
