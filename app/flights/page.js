import FlightsLandingPage from "@/components/Flights/FlightsLandingPage";

import { getFlightLandingContent } from "@/lib/flightLandingContent";

export const metadata = {
  title: "",
  description:
    "Search domestic and international flights with FaresGoFinder. Compare routes, schedules, total fares, and booking conditions before choosing your next trip.",
  alternates: { canonical: "/flights" },
  openGraph: { locale: "en_US", url: "/flights" },
};

export default async function Page({ searchParams }) {
  const content = getFlightLandingContent(await searchParams);
  return <FlightsLandingPage content={content} />;
}
