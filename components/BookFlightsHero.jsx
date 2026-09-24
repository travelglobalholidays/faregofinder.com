"use client";

import {
  BadgeCheck,
  CalendarSearch,
  PhoneCall,
  Plane,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { CONTACT_INFO } from "@/config/ContactInfo";

const quickActions = [
  { label: "Same-day changes", icon: RefreshCcw },
  { label: "Cancellations", icon: XCircle },
  { label: "Missed flights", icon: Plane },
  { label: "New bookings", icon: CalendarSearch },
];

export default function BookFlightsHero() {
  return (
    <section className="w-full ">
      <div
        className="
          relative overflow-hidden bg-white
          px-4 py-10
          lg:min-h-[620px] lg:py-14
        "
      >
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-12">
          <div className="text-center lg:col-span-5 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-theme-soft px-4 py-2 text-sm font-medium text-dark ring-1 ring-theme/10">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              Independent Travel Assistance
            </div>

            <h1 className="mt-5 text-[30px] font-semibold leading-tight text-dark sm:text-[36px] lg:text-[44px]">
              Flight Booking With Clear{" "}
              <span className="text-theme2">Travel Support</span>
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-body sm:text-base lg:mx-0">
              Review flight options, fare conditions, route details, and booking
              support with an independent travel assistance team.
            </p>

            <a
              href={CONTACT_INFO.phoneHref}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-theme px-6 py-3 text-sm font-semibold text-white shadow-theme transition hover:bg-[var(--theme-color2)]"
            >
              <PhoneCall className="h-4 w-4" />
              Call Now: {CONTACT_INFO.phoneDisplay}
            </a>

            <div className="mx-auto mt-4 flex max-w-xl items-start gap-2 rounded-lg bg-green-50 px-4 py-3 text-left text-xs font-medium text-dark ring-1 ring-green-200 lg:mx-0">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span>
                Independent travel agency. Not an airline. Not affiliated with
                any airline.
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {quickActions.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 px-3 py-3 text-sm font-medium text-dark ring-1 ring-black/10 lg:justify-start"
                >
                  <Icon className="h-4 w-4 text-theme2" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href={CONTACT_INFO.phoneHref}
        className="fixed bottom-0 left-0 right-0 z-[998] flex items-center justify-center gap-2 bg-theme px-4 py-4 text-center text-base font-semibold text-white shadow-[0_-8px_20px_rgba(0,0,0,0.18)] md:hidden"
      >
        <PhoneCall className="h-5 w-5" />
        Call For Assistance: {CONTACT_INFO.phoneDisplay}
      </a>
    </section>
  );
}
