import { createNoIndexMetadata } from "@/lib/seo";
export const metadata = createNoIndexMetadata({title:"Your Flight Search",description:"View flight options for your selected itinerary with FaresGoFinder.",path:"/flights/search"});
export default function Layout({children}) { return children; }
