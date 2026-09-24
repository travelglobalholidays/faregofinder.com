import Footer from "@/components/Footer";
import InnerBanner from "@/components/GenericComponents/InnerBanner";
import Navbar from "@/components/Headers/Navbar";

export const metadata = {
  title: "About FaresGoFinder | Fare Search And Travel Support",
  description:
    "Learn how FaresGoFinder helps travelers compare flight fares, review itinerary details, and understand booking conditions before ticketing.",
};

const AboutUsPage = () => {
  return (
    <div>
      <Navbar />
      <InnerBanner
        title="About FaresGoFinder Fare Support"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <main className="mx-auto max-w-7xl px-4 py-10 text-neutral-700 sm:px-6 lg:px-8 lg:py-14">
        <article className="max-w-none space-y-5 leading-7">
          <div>
            <h2 className="font-heading text-xl font-medium text-dark">
              Fare Guidance For Travelers Who Want Clarity
            </h2>
            <p>
              <strong>FaresGoFinder</strong> was created for travelers who want
              more than a quick list of fares. We help customers review flight
              options, compare itinerary details, and understand the conditions
              attached to a fare before they decide how to move forward.
            </p>
            <p>
              Flight planning can involve multiple airports, schedule windows,
              fare classes, baggage rules, and change restrictions. Our role is
              to organize those details into clearer choices so travelers can
              select an itinerary that fits the trip, not just the search
              result.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-dark">
              What Makes Our Approach Different
            </h2>
            <p>
              We look at the practical parts of a journey: departure time,
              total travel duration, connection risk, cabin selection, route
              flexibility, fare restrictions, and the final cost shown before
              ticketing.
            </p>
            <p>
              That means a traveler comparing two fares can understand why one
              option may be cheaper, why another may be more convenient, and
              what policy details should be reviewed before payment.
            </p>
            <p>
              The final travel choice always remains with the customer. We
              provide guidance, context, and booking support so the decision is
              made with better information.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-dark">
              Independent Travel Assistance
            </h2>
            <p>
              FaresGoFinder is not an airline and does not present itself as an
              official airline website. Airline names, logos, and flight details
              may be referenced only to identify travel options or itinerary
              information.
            </p>
            <p>
              Because we are independent, our focus is on helping travelers
              review available options across relevant providers, subject to the
              information and inventory available at the time of search.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-dark">
              Support That Follows The Details
            </h2>
            <p>
              A useful itinerary depends on the small details: passenger names,
              travel dates, exact airports, connection times, baggage needs,
              cabin type, and how flexible the fare is after purchase.
            </p>
            <p>
              Our team helps customers review those details before ticketing and
              can also guide them through common post-booking questions, subject
              to airline and supplier rules.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-dark">
              Built For Real Travel Questions
            </h2>
            <p>
              Travelers contact us for many reasons: comparing routes, checking
              fare rules, understanding baggage conditions, reviewing schedule
              changes, or confirming what information is needed before booking.
            </p>
            <p>
              We combine fare search with human support so customers have a
              clearer path from interest to confirmation.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-medium text-dark">
              Our Mission
            </h2>
            <p>
              Our mission is to help travelers find fare options with less
              confusion and fewer unanswered questions.
            </p>
            <p>
              FaresGoFinder works to make flight comparison more transparent by
              explaining available options, policy details, and booking steps in
              practical language.
            </p>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <p>
              <strong>Important Disclaimer:</strong> FaresGoFinder is an
              independent travel assistance service and is not an airline. We
              are not affiliated with, endorsed by, or officially connected with
              any airline unless specifically stated otherwise. Airline names,
              logos, trademarks, and other brand identifiers belong to their
              respective owners. Flight availability, schedules, fares, and
              airline policies are determined by the respective airlines or
              travel service providers and may change without notice.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
