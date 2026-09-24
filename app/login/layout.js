import { createNoIndexMetadata } from "@/lib/seo";

export const metadata = createNoIndexMetadata({
  title: "Sign In",
  description: "Sign in to your FaresGoFinder account.",
  path: "/login",
});

export default function LoginLayout({ children }) {
  return children;
}
