import FlightsLandingPage from "@/components/Flights/FlightsLandingPage";
import { flightRouteContent, getFlightRouteContent } from "@/lib/flightRouteContent";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(flightRouteContent).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const content = getFlightRouteContent(slug);
  if (!content) notFound();

  const canonical = `/flights/${slug}`;
  const description = flightRouteContent[slug].description;
  return {
    title: content.heading,
    description,
    alternates: { canonical },
    openGraph: {
      locale: "en_US",
      url: canonical,
      title: content.heading,
      description,
    },
    twitter: { title: content.heading, description },
  };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const content = getFlightRouteContent(slug, await searchParams);
  if (!content) notFound();

  return <FlightsLandingPage content={content} />;
}
