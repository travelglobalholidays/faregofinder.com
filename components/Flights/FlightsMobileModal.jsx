"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { CONTACT_INFO } from "@/config/ContactInfo";
const getPhoneDisplay = () => CONTACT_INFO.phoneDisplay;
const getPhoneHref = () => CONTACT_INFO.phoneHref;
import { asset, CallActions, AgentCall } from "./FlightsCallContent";

export default function FlightsMobileModal({ heading, description, agentHeading }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const timer = window.setTimeout(() => { if (media.matches) setOpen(true); }, 2000);
    const onResize = () => { if (!media.matches) setOpen(false); };
    media.addEventListener("change", onResize);
    return () => { window.clearTimeout(timer); media.removeEventListener("change", onResize); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("button")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const elements = dialogRef.current?.querySelectorAll("a[href], button");
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); previousFocus?.focus(); };
  }, [open]);

  if (!open) return null;
  return <div className="fixed inset-0 z-[2147483647] bg-black/70 md:hidden">
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="flights-campaign-title" aria-describedby="flights-campaign-description" className="h-dvh overflow-y-auto bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-subtle bg-white px-3 py-3">
        <Image src="/images/logo.png" alt="FaresGoFinder" width={120} height={30} className="h-auto w-[120px] object-contain" />
        <a href={getPhoneHref()} className="rounded-md bg-blue px-3 py-2 text-sm font-semibold text-white">{getPhoneDisplay()}</a>
        <button type="button" aria-label="Close window" onClick={() => setOpen(false)} className="rounded-full p-2 text-heading hover:bg-light-grey"><X className="size-5" /></button>
      </div>
      <div className="p-4">
        <h2 id="flights-campaign-title" className="mb-4 rounded-md bg-blue px-3 py-3 text-center text-lg text-white">{heading}</h2>
        <p id="flights-campaign-description" className="mb-4 text-center text-sm leading-relaxed text-body">{description}</p>
        <Image src={asset("Airline-Ticket.png")} alt="Plan your next flight" width={500} height={260} className="mb-4 h-auto w-full rounded-md" />
        <CallActions /><AgentCall heading={agentHeading} />
      </div>
    </div>
  </div>;
}
