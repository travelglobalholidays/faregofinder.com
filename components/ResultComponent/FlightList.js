// FlightList.jsx
"use client";

import { Suspense } from "react";
import FlightFilterSidebar from "./FilterSidebar";
import FlightCard from "./FlightCard";

export default function FlightList() {
  return (
    <main className="min-h-screen bg-light-grey">
      <div className="container py-5 sm:py-6 md:py-8">
        <div className="grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-[minmax(280px,320px)_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
          {/* ===== Sidebar (Filters) ===== */}
          <aside className="w-full">
            <Suspense
              fallback={
                <div className="rounded-xl border border-subtle bg-white p-6 text-center text-light-blue shadow-theme">
                  Loading filters...
                </div>
              }
            >
              <FlightFilterSidebar />
            </Suspense>
          </aside>

          {/* ===== Main Content (Flight Results) ===== */}
          <section className="min-w-0">
            <FlightCard />
          </section>
        </div>
      </div>
    </main>
  );
}
