import { CONTACT_INFO } from "@/config/ContactInfo";
import Image from "next/image";

export const asset = (name) => `/images/${name}`;
const actions = [
  "Book a Flight",
  "Change My Trip",
  "Cancellation Help",
  "Booking Assistance",
];

export function CallActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((label) => (
        <a
          key={label}
          href={CONTACT_INFO.phoneHref}
          className="rounded-md bg-blue px-2 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-dark"
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export function AgentCall({ heading = "Speak With Our Travel Team" }) {
  return (
    <div className="py-5 text-center">
      <Image
        src={asset("calling-cus.png")}
        alt="Travel assistance specialist"
        width={80}
        height={80}
        className="mx-auto size-20 rounded-full border-4 border-white object-cover shadow-theme"
      />
      <p className="mt-3 font-semibold text-heading">{heading}</p>
      <p className="mt-1 text-sm text-theme">
        Tap the number for booking guidance
      </p>
      <a
        href={CONTACT_INFO.phoneHref}
        className="mx-auto mt-4 block max-w-xs rounded-full bg-blue px-5 py-3 text-white shadow-theme"
      >
        <small className="block">Assistance for your itinerary</small>
        <span className="text-xl font-semibold">
          {CONTACT_INFO.phoneDisplay}
        </span>
      </a>
    </div>
  );
}

export function CallBar({
  bottom = false,
  label = "Explore options for your flight",
}) {
  return (
    <div
      className={`fixed inset-x-0 z-[998] bg-blue px-4 py-3 text-white shadow-lg md:hidden ${bottom ? "bottom-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]" : "top-0"}`}
    >
      <a
        href={CONTACT_INFO.phoneHref}
        className="mx-auto flex max-w-md items-center justify-center gap-3"
      >
        <Image
          src={asset("call-pullu-love.png")}
          alt=""
          width={40}
          height={40}
          className="object-contain motion-safe:animate-pulse"
        />

        <span className="text-lg sm:text-2xl font-semibold">
          {CONTACT_INFO.phoneDisplay}
        </span>
      </a>
    </div>
  );
}
