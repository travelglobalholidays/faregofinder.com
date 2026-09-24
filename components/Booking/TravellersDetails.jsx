"use client";

import { Plus, Trash2, User } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-subtle bg-light-grey px-3 py-2.5 text-sm text-heading outline-none transition focus:border-blue";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "Germany",
  "France",
  "Mexico",
  "United Arab Emirates",
  "Saudi Arabia",
  "Singapore",
  "Pakistan",
  "Bangladesh",
].sort();

const emptyTraveller = (type, index) => ({
  id: `${type}-${index}-${Math.random().toString(36).slice(2)}`,
  title: "Mr",
  gender: "",
  type,
  firstName: "",
  middleName: "",
  lastName: "",
  month: "",
  day: "",
  year: "",
  nationality: "",
});

const formatPassenger = (traveller) => ({
  title: traveller.title,
  gender: traveller.gender,
  type: traveller.type,
  firstName: traveller.firstName,
  middleName: traveller.middleName,
  lastName: traveller.lastName,
  dateOfBirth:
    traveller.year && traveller.month && traveller.day
      ? `${traveller.year}-${String(months.indexOf(traveller.month) + 1).padStart(2, "0")}-${traveller.day}`
      : "",
  nationality: traveller.nationality,
});

const TravellerCard = ({ index, onRemove, onUpdate, traveller }) => (
  <div className="relative rounded-xl border border-subtle bg-white p-5 shadow-sm">
    {index > 0 && (
      <button
        aria-label="Remove traveller"
        className="absolute right-4 top-4 rounded-full p-1.5 text-red-500 transition hover:bg-red-50"
        onClick={onRemove}
        type="button"
      >
        <Trash2 className="size-4" />
      </button>
    )}
    <p className="mb-4 inline-flex rounded-full bg-light-grey px-3 py-1 text-xs font-poppins-semibold text-blue">
      Traveller {index + 1}: {traveller.type}
    </p>
    <div className="grid gap-3 md:grid-cols-4">
      <select
        className={inputClass}
        onChange={(event) => onUpdate("title", event.target.value)}
        value={traveller.title}
      >
        {["Mr", "Mrs", "Ms", "Miss", "Dr"].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        className={inputClass}
        onChange={(event) => onUpdate("firstName", event.target.value)}
        placeholder="First Name*"
        value={traveller.firstName}
      />
      <input
        className={inputClass}
        onChange={(event) => onUpdate("middleName", event.target.value)}
        placeholder="Middle Name"
        value={traveller.middleName}
      />
      <input
        className={inputClass}
        onChange={(event) => onUpdate("lastName", event.target.value)}
        placeholder="Last Name*"
        value={traveller.lastName}
      />
    </div>
    <div className="mt-3 grid gap-3 md:grid-cols-4">
      <select
        className={inputClass}
        onChange={(event) => onUpdate("month", event.target.value)}
        value={traveller.month}
      >
        <option value="">Month*</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select
        className={inputClass}
        onChange={(event) => onUpdate("day", event.target.value)}
        value={traveller.day}
      >
        <option value="">Day*</option>
        {Array.from({ length: 31 }, (_, index) => {
          const day = String(index + 1).padStart(2, "0");
          return (
            <option key={day} value={day}>
              {day}
            </option>
          );
        })}
      </select>
      <select
        className={inputClass}
        onChange={(event) => onUpdate("year", event.target.value)}
        value={traveller.year}
      >
        <option value="">Year*</option>
        {Array.from({ length: 100 }, (_, index) => {
          const year = new Date().getFullYear() - index;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      <select
        className={inputClass}
        onChange={(event) => onUpdate("gender", event.target.value)}
        value={traveller.gender}
      >
        <option value="">Gender*</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
    <select
      className={`${inputClass} mt-3`}
      onChange={(event) => onUpdate("nationality", event.target.value)}
      value={traveller.nationality}
    >
      <option value="">Nationality*</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  </div>
);

const Group = ({ onAdd, onRemove, onUpdate, title, travellers, type }) => (
  <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle pb-3">
      <h3 className="font-poppins-semibold text-heading">{title} Travellers</h3>
      <button
        className="inline-flex items-center gap-2 rounded-lg border border-blue px-3 py-2 text-sm font-poppins-semibold text-blue transition hover:bg-light-grey"
        onClick={() => onAdd(type)}
        type="button"
      >
        <Plus className="size-4" />
        Add {title}
      </button>
    </div>
    {travellers.length ? (
      travellers.map((traveller, index) => (
        <TravellerCard
          index={index}
          key={traveller.id}
          onRemove={() => onRemove(type, index)}
          onUpdate={(key, value) => onUpdate(type, index, key, value)}
          traveller={traveller}
        />
      ))
    ) : (
      <p className="text-sm text-light">No {title.toLowerCase()} travellers added.</p>
    )}
  </div>
);

export const createInitialTravellers = (booking) => {
  const count = booking?.offerPassengerIds?.length || 1;
  return Array.from({ length: count }, (_, index) =>
    emptyTraveller("adult", index),
  );
};

export const toPassengerPayload = (travellers) =>
  travellers.map(formatPassenger);

export default function TravellersDetails({ travellers, setTravellers }) {
  const updateTraveller = (type, index, key, value) => {
    setTravellers((current) =>
      current.map((traveller) => {
        const sameTypeIndex = current
          .filter((item) => item.type === type)
          .findIndex((item) => item.id === traveller.id);
        return traveller.type === type && sameTypeIndex === index
          ? { ...traveller, [key]: value }
          : traveller;
      }),
    );
  };

  const addTraveller = (type) => {
    setTravellers((current) => [...current, emptyTraveller(type, current.length)]);
  };

  const removeTraveller = (type, index) => {
    setTravellers((current) => {
      const typeItems = current.filter((item) => item.type === type);
      if (type === "adult" && typeItems.length <= 1) return current;
      const target = typeItems[index];
      return current.filter((item) => item.id !== target.id);
    });
  };

  const adults = travellers.filter((item) => item.type === "adult");
  const children = travellers.filter((item) => item.type === "child");
  const infants = travellers.filter((item) => item.type === "infant");

  return (
    <section className="overflow-hidden rounded-xl border border-subtle bg-white shadow-theme">
      <div className="flex items-center gap-2 bg-blue px-6 py-4 font-poppins-semibold text-white">
        <User className="size-5" />
        Traveller Details
      </div>
      <div className="space-y-8 p-5 md:p-6">
        <Group
          onAdd={addTraveller}
          onRemove={removeTraveller}
          onUpdate={updateTraveller}
          title="Adult"
          travellers={adults}
          type="adult"
        />
        <Group
          onAdd={addTraveller}
          onRemove={removeTraveller}
          onUpdate={updateTraveller}
          title="Child"
          travellers={children}
          type="child"
        />
        <Group
          onAdd={addTraveller}
          onRemove={removeTraveller}
          onUpdate={updateTraveller}
          title="Infant"
          travellers={infants}
          type="infant"
        />
      </div>
    </section>
  );
}
