import Image from "next/image";
import CommonButton from "./common/CommonButton";
import SectionHeading from "./common/Headings";
export default function AboutSection() {
  return (
    <section className="py-10 lg:py-[70px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10">
          {/* LEFT */}
          <div className="relative lg:col-span-4">
            {/* Images */}
            <div className="mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none">
              <Image
                src="/images/about/01.jpg"
                alt="About"
                width={400}
                height={500}
                className="h-auto w-full rounded-[200px] object-cover"
              />
            </div>
          </div>
          {/* RIGHT */}
          <div className="lg:col-span-8">
            {/* Heading */}
            <SectionHeading
              tagline="About FaresGoFinder"
              title=" Fare Search Support Built Around Real Trip Details"
              suffix=""
            />

            {/* Text */}
            <p className="text-body mb-4">
              FaresGoFinder helps travelers look beyond the first price they
              see. We review routes, dates, cabin preferences, connection
              windows, and fare conditions so customers can compare flight
              choices with more context before moving forward.
            </p>

            <p className="text-body mb-4">
              Our team is independent, which means our role is to explain
              available options clearly rather than push one carrier. From a
              quick domestic visit to a longer international itinerary, we help
              make the details easier to understand.
            </p>

            {/* Button */}
            <CommonButton href="about-us" text="Read More" />
          </div>
        </div>
      </div>
    </section>
  );
}
