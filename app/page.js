import Banner from "@/components/Banner";
import FlightBookingDescription from "@/components/FlightBookingDescription";
import Footer from "@/components/Footer";

import Services from "@/components/Services";

import Navbar from "@/components/Headers/Navbar";

import AboutSection from "@/components/AboutSection";
import PopularFlights from "@/components/PopularFlights";

export default function Home() {
  return (
    <>
      <Navbar />

      <Banner />

      <Services />

      <AboutSection />
      <PopularFlights />
      {/* <WhyChooseUs/> */}
      <FlightBookingDescription />
      <Footer />
    </>
  );
}
