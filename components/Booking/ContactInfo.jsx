"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import countriesData from "@/public/data/country-states.json";

const fieldClass =
  "w-full rounded-lg border border-subtle bg-light-grey px-4 py-3 text-sm text-heading outline-none transition focus:border-blue";

export default function ContactInfo({ contact, setContact, user }) {
  const selectedCountry = countriesData.find(
    (country) => country.name === contact.country,
  );
  const states = selectedCountry?.states || [];

  const update = (key, value) => {
    setContact((current) => ({
      ...current,
      [key]: value,
      ...(key === "country" ? { state: "" } : {}),
    }));
  };

  return (
    <section className="overflow-hidden rounded-xl border border-subtle bg-white shadow-theme">
      <div className="flex items-center gap-2 bg-blue px-6 py-4 font-poppins-semibold text-white">
        <MapPin className="size-5" />
        Contact Information
      </div>
      <div className="space-y-4 p-5 md:p-6">
        <label className="flex items-center rounded-lg border border-subtle bg-light-grey px-4 py-3">
          <Mail className="mr-3 size-5 shrink-0 text-blue" />
          <input
            className="w-full bg-transparent text-sm text-heading outline-none"
            onChange={(event) => update("email", event.target.value)}
            placeholder="Email address"
            readOnly={Boolean(user?.email)}
            type="email"
            value={contact.email}
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <select
            className={fieldClass}
            onChange={(event) => update("country", event.target.value)}
            value={contact.country}
          >
            <option value="">Select Country*</option>
            {countriesData.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <select
            className={fieldClass}
            disabled={!states.length}
            onChange={(event) => update("state", event.target.value)}
            value={contact.state}
          >
            <option value="">Select State*</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className={fieldClass}
            onChange={(event) => update("street1", event.target.value)}
            placeholder="Street Address*"
            value={contact.street1}
          />
          <input
            className={fieldClass}
            onChange={(event) => update("street2", event.target.value)}
            placeholder="Apt/Suite (Optional)"
            value={contact.street2}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className={fieldClass}
            onChange={(event) => update("city", event.target.value)}
            placeholder="City*"
            value={contact.city}
          />
          <input
            className={fieldClass}
            onChange={(event) => update("zip", event.target.value)}
            placeholder="ZIP / Postal Code*"
            value={contact.zip}
          />
        </div>

        <label className="flex items-center rounded-lg border border-subtle bg-light-grey px-4 py-3">
          <Phone className="mr-3 size-5 shrink-0 text-blue" />
          <input
            className="w-full bg-transparent text-sm text-heading outline-none"
            onChange={(event) => update("phone", event.target.value)}
            placeholder="Phone Number*"
            type="tel"
            value={contact.phone}
          />
        </label>
      </div>
    </section>
  );
}
