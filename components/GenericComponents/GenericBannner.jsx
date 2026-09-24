"use client";

import { Suspense } from "react";
import FlightSearchForm from "../FlightSearchForm";

// Props for dynamic content
const GenericBanner = ({
  backgroundImage = "/images/generic-banner.jpg",
  title,
  heading = "Compare Flight Fares With Support",
  subheading = "Review available flight options, itinerary details, and fare information with clear travel support.",
  initialValues = {},
}) => {
  const bannerHeading = title || heading;

  return (
    <section className="w-full">
      <div
        className="
          relative
          hidden md:flex flex-col items-center justify-center
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
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/65 z-0" />

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
            {bannerHeading}
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
            {subheading}
          </p>

          <div className="hidden lg:block">
            <Suspense>
              <FlightSearchForm compact initialValues={initialValues} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="block lg:hidden px-4 mt-4">
        <Suspense>
          <FlightSearchForm compact initialValues={initialValues} />
        </Suspense>
      </div>
    </section>
  );
};

export default GenericBanner;
