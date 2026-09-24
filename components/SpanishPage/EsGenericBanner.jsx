"use client";

import { Suspense } from "react";
import FlightSearchForm from "../FlightSearchForm";

// Props for dynamic content (Spanish)
const EsGenericBanner = ({
  backgroundImage = "/images/generic-banner.jpg",
  heading = "Reserve Boletos de Avión al Mejor Precio",
  subheading = "Su solución confiable para reservas de vuelos y atención al cliente de aerolíneas",
}) => {
  return (
    <div
      className="heroBanner relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="heroOverlay absolute inset-0 bg-black/50 z-0" />

      <div className="heroContent container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24 relative z-10">
        <div className="max-w-6xl mx-auto text-center mt-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            {heading}
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium mb-6 md:mb-8">
            {subheading}
          </p>
        </div>

        <Suspense>
          <FlightSearchForm />
        </Suspense>
      </div>
    </div>
  );
};

export default EsGenericBanner;
