import { Suspense } from "react";
import FlightSearchForm from "./FlightSearchForm";

export default function Banner() {
  return (
    <section className="w-full">
      {/* HERO */}
      <div
        className="
          relative
          flex flex-col items-center justify-center
          bg-center bg-cover bg-no-repeat
          h-[36vh]
          min-h-[300px]
          sm:h-[40vh]
          sm:min-h-[330px]
          md:h-[46vh]
          md:min-h-[370px]
          lg:h-[62vh]
          lg:min-h-[500px]
          xl:h-[64vh]
          px-4
        "
        style={{ backgroundImage: "url('/images/hero-1.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65 z-0" />

        {/* HERO CONTENT */}
        <div className="relative z-10 w-full max-w-7xl text-center">
          <h1
            className="
              text-white font-heading font-semibold capitalize
              tracking-wide leading-tight
              text-[24px]
              sm:text-[26px]
              md:text-[32px]
              lg:text-[36px]
              xl:text-[40px]
              mb-2
            "
          >
            Find Better Fare Options With Confidence
          </h1>

          <p
            className="
              text-white font-body capitalize
              tracking-wide
              text-[13px]
              sm:text-[14px]
              md:text-[16px]
              lg:text-[17px]
              leading-snug
              mb-5 lg:mb-6
            "
          >
            Compare routes, review fare details, and get support before you
            confirm your next trip.
          </p>

          {/* SEARCH FORM – DESKTOP ONLY */}
          <div className="hidden lg:block">
            <Suspense>
              <FlightSearchForm compact />
            </Suspense>
          </div>
        </div>
      </div>

      {/* SEARCH FORM – MOBILE & TABLET (BELOW HERO) */}
      <div className="block lg:hidden px-4 mt-4">
        <Suspense>
          <FlightSearchForm compact />
        </Suspense>
      </div>
    </section>
  );
}


