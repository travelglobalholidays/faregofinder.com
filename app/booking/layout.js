import { createNoIndexMetadata } from "@/lib/seo";
import BookingAccess from "@/components/Booking/BookingAccess";

export const metadata = createNoIndexMetadata({
  title: "Booking",
  description: "Private FaresGoFinder booking pages.",
  path: "/booking",
});

export default function BookingLayout({ children }) {
  return <BookingAccess>{children}</BookingAccess>;
}
