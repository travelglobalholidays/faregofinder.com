import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaExchangeAlt } from "react-icons/fa";
import SectionHeading from "./common/Headings";
import { CONTACT_INFO } from "@/config/ContactInfo";

const flights = [
  {
    id: 1,
    image: "/images/popular-flights/01.jpg",
    airline: "/images/airlines-logo/airline-1.png",
    from: "New York (JFK)",
    to: "Los Angeles (LAX)",
    date: "Jan 10, 2026 - Jan 25, 2026",
    price: 320,
  },
  {
    id: 2,
    image: "/images/popular-flights/02.jpg",
    airline: "/images/airlines-logo/airline-2.png",
    from: "Chicago (ORD)",
    to: "Las Vegas (LAS)",
    date: "Feb 05, 2026 - Feb 20, 2026",
    price: 280,
  },
  {
    id: 3,
    image: "/images/popular-flights/03.jpg",
    airline: "/images/airlines-logo/airline-3.png",
    from: "San Francisco (SFO)",
    to: "New York (JFK)",
    date: "Mar 12, 2026 - Mar 28, 2026",
    price: 410,
  },
  {
    id: 4,
    image: "/images/popular-flights/04.jpg",
    airline: "/images/airlines-logo/airline-4.png",
    from: "Miami (MIA)",
    to: "Los Angeles (LAX)",
    date: "Apr 08, 2026 - Apr 22, 2026",
    price: 450,
  },
  {
    id: 5,
    image: "/images/popular-flights/05.jpg",
    airline: "/images/airlines-logo/airline-5.png",
    from: "Dallas (DFW)",
    to: "Orlando (MCO)",
    date: "May 15, 2026 - May 30, 2026",
    price: 260,
  },
  {
    id: 6,
    image: "/images/popular-flights/06.jpg",
    airline: "/images/airlines-logo/airline-6.png",
    from: "Boston (BOS)",
    to: "San Diego (SAN)",
    date: "Jun 02, 2026 - Jun 18, 2026",
    price: 390,
  },
  {
    id: 7,
    image: "/images/popular-flights/07.jpg",
    airline: "/images/airlines-logo/airline-1.png",
    from: "Seattle (SEA)",
    to: "Denver (DEN)",
    date: "Jul 09, 2026 - Jul 24, 2026",
    price: 240,
  },
  {
    id: 8,
    image: "/images/popular-flights/08.jpg",
    airline: "/images/airlines-logo/airline-2.png",
    from: "Atlanta (ATL)",
    to: "Phoenix (PHX)",
    date: "Aug 14, 2026 - Aug 29, 2026",
    price: 310,
  },
];

export default function PopularFlights() {
  return (
    <section className="py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          tagline="Popular Flights"
          title="Most Popular Flights"
          highlight="With Us"
          suffix=""
        />

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white  "
            >
              {/* IMAGE */}
              <Image
                src={flight.image}
                alt={`${flight.from} to ${flight.to}`}
                width={500}
                height={350}
                className="h-48 w-full object-cover"
              />

              {/* CONTENT */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <Image
                    src={flight.airline}
                    alt="airline"
                    width={28}
                    height={28}
                    className="mt-1 h-7 w-7 object-contain"
                  />
                  <h4 className="text-[13px] font-normal  text-dark">
                    <Link href="#" className="transition hover:text-theme">
                      {flight.from}
                      <FaExchangeAlt className="mx-2 inline text-sm text-theme" />
                      {flight.to}
                    </Link>
                  </h4>
                </div>

                {/* FOOTER */}
                <div className="mt-1 flex items-center justify-between border-t border-black/5 pt-2">
                  <div className="font-normal text-dark">
                    From{" "}
                    <span className="text-md font-semibold text-theme2">
                      ${flight.price}
                    </span>
                  </div>
                  <Link
                    href={CONTACT_INFO.phoneHref}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-theme px-4 text-sm font-medium text-white transition hover:bg-theme2"
                  >
                    Book Now
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
