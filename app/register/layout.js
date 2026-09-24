import { createNoIndexMetadata } from "@/lib/seo";

export const metadata = createNoIndexMetadata({
  title: "Register",
  description: "Create a FaresGoFinder account.",
  path: "/register",
});

export default function RegisterLayout({ children }) {
  return children;
}
