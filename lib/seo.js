import { CONTACT_INFO } from "@/config/ContactInfo";

export const createNoIndexMetadata = ({ title, description, path = "" }) => ({
  title,
  description,
  robots: "noindex, nofollow",
  alternates: {
    canonical: `${CONTACT_INFO.websiteUrl}${path}`,
  },
});
