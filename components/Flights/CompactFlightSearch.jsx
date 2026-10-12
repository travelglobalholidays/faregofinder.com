"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeftRight, CalendarDays, ChevronDown, Search, Users, X } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { Calendar, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import airports from "@/data/airports.json";
const searchCopy = () => (text) => text;


function AirportField({ id, label, value, setValue, disabled, locale = "en" }) {
  const t = searchCopy(locale);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef(null);
  const query = value.trim().toLowerCase();
  const matches = query ? airports.filter((airport) => airport.toLowerCase().includes(query)) : [];
  const options = [...matches.filter((airport) => airport.toLowerCase().startsWith(query)), ...matches.filter((airport) => !airport.toLowerCase().startsWith(query))].slice(0, 8);
  const select = (airport) => { setValue(airport); setOpen(false); setActive(-1); };
  useEffect(() => {
    const outside = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return (
    <div ref={root} className="relative min-w-0" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <div className="rounded-md border border-gray-300 bg-white px-3 py-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <label htmlFor={id} className="mb-1 block text-xs text-gray-600">{t(label)}</label>
        <input id={id} type="text" role="combobox" aria-autocomplete="list" aria-expanded={open && options.length > 0} aria-controls={`${id}-list`} aria-activedescendant={open && active >= 0 && options[active] ? `${id}-option-${active}` : undefined} value={value} disabled={disabled} placeholder={t(label === "From" ? "Origin" : "Destination")} autoComplete="off" spellCheck={false} className="!w-full !rounded-none !border-0 !bg-transparent !p-0 !text-sm !font-medium !text-dark !outline-none !ring-0 placeholder:!text-sm" onFocus={() => { setOpen(true); setActive(-1); }} onChange={(event) => { setValue(event.target.value); setOpen(true); setActive(-1); }} onKeyDown={(event) => {
          if (event.key === "Escape") { setOpen(false); setActive(-1); }
          if ((event.key === "ArrowDown" || event.key === "ArrowUp") && options.length) { event.preventDefault(); setOpen(true); setActive((previous) => event.key === "ArrowDown" ? (previous + 1) % options.length : previous <= 0 ? options.length - 1 : previous - 1); }
          if (event.key === "Enter" && open && options.length) { event.preventDefault(); select(options[active >= 0 ? active : 0]); }
        }} />
      </div>
      <ul id={`${id}-list`} role="listbox" aria-label={`${label} airports`} hidden={!open || !options.length} className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
        {options.map((airport, index) => <li role="option" aria-selected={active === index} id={`${id}-option-${index}`} key={airport} onPointerDown={(event) => event.preventDefault()} onClick={() => select(airport)} className={`cursor-pointer px-3 py-3 text-xs leading-relaxed text-dark hover:bg-blue-50 ${active === index ? "bg-blue-50" : ""}`}><strong className="mr-2 text-theme">{airport.slice(0, 3)}</strong>{airport.slice(4).replaceAll("-", ", ")}</li>)}
      </ul>
      {open && query && !options.length && <p role="status" className="mt-1 text-xs text-gray-600">{t("No airports found. Try a city or airport code.")}</p>}
    </div>
  );
}

export default function CompactFlightSearch({ locale = "en", tripType, setTripType, fromLocation, setFromLocation, toLocation, setToLocation, swapLocations, dateRange, setDateRange, selectedClass, setSelectedClass, passengerCount, updatePassengerCount, totalPassengers, isSubmitting, handleSubmit, error }) {
  const t = searchCopy(locale);
  const id = useId();
  const [open, setOpen] = useState(false);
  const travelers = useRef(null);
  const travelerButton = useRef(null);
  const calendar = useRef(null);
  const calendarTrigger = useRef(null);
  const [months, setMonths] = useState(1);
  const [focusedRange, setFocusedRange] = useState([0, 0]);
  useEffect(() => {
    const resize = () => setMonths(window.innerWidth >= 768 ? 2 : 1);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => {
      if (event.type === "keydown" && event.key === "Escape") { setOpen(false); travelerButton.current?.focus(); }
      if (event.type === "pointerdown" && !travelers.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", dismiss); };
  }, [open]);
  const start = dateRange[0].startDate;
  const end = dateRange[0].endDate;
  const openCalendar = (event, isReturn) => {
    calendarTrigger.current = event.currentTarget;
    setOpen(false);
    setFocusedRange([0, isReturn ? 1 : 0]);
    calendar.current?.showModal();
  };
  const closeCalendar = () => calendar.current?.close();
  return (
    <form onSubmit={handleSubmit} noValidate aria-label={t("Flight search")} aria-busy={isSubmitting} className="rounded-lg border border-gray-200 bg-white p-4 text-left text-dark shadow-sm md:p-5 lg:p-6">
      <fieldset disabled={isSubmitting} className="min-w-0 border-0 p-0">
        <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <div><label className="sr-only" htmlFor={`${id}-trip`}>{t("Trip type")}</label><select id={`${id}-trip`} value={tripType} onChange={(event) => setTripType(event.target.value)} className="min-h-11 max-w-full rounded bg-white pr-2 font-medium focus-visible:outline-2 focus-visible:outline-primary"><option value="Roundtrip">{t("Roundtrip")}</option><option value="One Way">{t("One Way")}</option></select></div>
          <div ref={travelers} className="relative" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
            <button ref={travelerButton} type="button" aria-expanded={open} aria-controls={`${id}-travelers`} onClick={() => setOpen(!open)} className="flex min-h-11 items-center gap-2 rounded font-medium focus-visible:outline-2 focus-visible:outline-primary"><Users size={17} aria-hidden="true" />{totalPassengers} {t("Traveler")}{totalPassengers > 1 ? "s" : ""}<ChevronDown size={15} aria-hidden="true" /></button>
            {open && <div id={`${id}-travelers`} className="absolute left-0 top-full z-40 w-[280px] max-w-[calc(100vw-64px)] rounded-md border border-gray-200 bg-white p-4 shadow-lg"><p className="mb-3 text-xs text-gray-600">{t("Maximum 9 travelers")}</p>{[["adults", "Adults", "12+ years", 1], ["children", "Children", "2–11 years", 0], ["infants", "Infants", "Under 2 years", 0]].map(([key, label, age, min]) => <div key={key} className="mb-3 flex items-center justify-between gap-2"><span className="text-sm font-medium">{t(label)}<small className="block text-xs font-normal text-gray-600">{t(age)}</small></span><div className="flex items-center gap-2"><button type="button" aria-label={`Remove ${label.toLowerCase()}`} disabled={passengerCount[key] <= min} onClick={() => updatePassengerCount(key, "decrement")} className="h-10 w-10 rounded border border-gray-300 disabled:opacity-40">−</button><output className="min-w-4 text-center" aria-live="polite" aria-label={`${label} count`}>{passengerCount[key]}</output><button type="button" aria-label={`Add ${label.toLowerCase()}`} disabled={totalPassengers >= 9} onClick={() => updatePassengerCount(key, "increment")} className="h-10 w-10 rounded border border-gray-300 disabled:opacity-40">+</button></div></div>)}<button type="button" onClick={() => { setOpen(false); travelerButton.current?.focus(); }} className="min-h-11 w-full rounded-md bg-theme text-sm font-semibold text-white">{t("Done")}</button></div>}
          </div>
          <div><label className="sr-only" htmlFor={`${id}-cabin`}>{t("Cabin class")}</label><select id={`${id}-cabin`} value={selectedClass} onChange={(event) => setSelectedClass(event.target.value)} className="min-h-11 max-w-full rounded bg-white pr-2 font-medium focus-visible:outline-2 focus-visible:outline-primary">{["Economy", "Premium Economy", "Business", "First Class"].map((cabin) => <option key={cabin} value={cabin}>{t(cabin)}</option>)}</select></div>
        </div>
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div className="relative"><AirportField locale={locale} id={`${id}-origin`} label="From" value={fromLocation} setValue={setFromLocation} disabled={isSubmitting} /><button type="button" aria-label={t("Swap origin and destination")} onClick={swapLocations} className="absolute -bottom-5 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-theme text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:-right-[22px] sm:bottom-auto sm:top-[22px]"><ArrowLeftRight size={16} aria-hidden="true" /></button></div>
          <AirportField locale={locale} id={`${id}-destination`} label="To" value={toLocation} setValue={setToLocation} disabled={isSubmitting} />
          <button type="button" id={`${id}-departure`} aria-haspopup="dialog" aria-controls={`${id}-calendar`} onClick={(event) => openCalendar(event, false)} className="min-h-[68px] min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><span className="mb-1 block text-xs text-gray-600">{t("Departure")}</span><span className="flex items-center justify-between gap-2 text-sm font-medium"><span>{start ? format(start, "EEE, d MMM yyyy", {}) : t("Select date")}</span><CalendarDays size={16} className="shrink-0 text-theme" aria-hidden="true" /></span></button>
          <button type="button" id={`${id}-return`} aria-haspopup="dialog" aria-controls={`${id}-calendar`} disabled={tripType === "One Way"} onClick={(event) => openCalendar(event, true)} className="min-h-[68px] min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:bg-gray-50 disabled:text-gray-500"><span className="mb-1 block text-xs text-gray-600">{t("Return")}</span><span className="flex items-center justify-between gap-2 text-sm font-medium"><span>{tripType === "One Way" ? t("Not needed") : end ? format(end, "EEE, d MMM yyyy", {}) : t("Select date")}</span><CalendarDays size={16} className="shrink-0 text-theme" aria-hidden="true" /></span></button>
          <button type="submit" className="flex min-h-[68px] items-center justify-center gap-2 rounded-md bg-theme px-5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 sm:col-span-2 lg:col-span-1"><Search size={19} aria-hidden="true" />{isSubmitting ? t("Searching…") : t("Search Flights")}</button>
        </div>
      </fieldset>
      <dialog ref={calendar} id={`${id}-calendar`} aria-labelledby={`${id}-calendar-title`} style={{ width: tripType === "One Way" ? 360 : 640 }} onClose={() => calendarTrigger.current?.focus()} onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeCalendar(); } }} className="fixed inset-0 m-auto max-h-[90dvh] max-w-[calc(100vw-32px)] overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 text-dark shadow-xl backdrop:bg-black/40">
        <div className="mb-2 flex items-center justify-between gap-3"><h2 id={`${id}-calendar-title`} className="text-base font-semibold">{tripType === "One Way" ? t("Select departure date") : t("Select departure and return dates")}</h2><button type="button" onClick={closeCalendar} aria-label={t("Close calendar")} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-primary"><X size={20} aria-hidden="true" /></button></div>
        <div className={`[&_.rdrCalendarWrapper]:w-full [&_.rdrMonth]:!min-w-0 [&_.rdrMonth]:!w-full [&_.rdrMonth]:!px-0 [&_.rdrMonths]:w-full ${tripType === "Roundtrip" ? "md:[&_.rdrMonth]:!w-1/2" : ""}`}>
          {tripType === "One Way" ? <Calendar  date={start || new Date()} minDate={startOfDay(new Date())} color="#0f766e" onChange={(date) => { setDateRange([{ ...dateRange[0], startDate: date, endDate: end && end >= date ? end : date }]); closeCalendar(); }} /> : <DateRange  ranges={[{ ...dateRange[0], startDate: start || new Date(), endDate: end || start || new Date(), key: "selection" }]} onChange={({ selection }) => setDateRange([selection])} focusedRange={focusedRange} onRangeFocusChange={setFocusedRange} minDate={startOfDay(new Date())} months={months} direction="horizontal" moveRangeOnFirstSelection={false} rangeColors={["#0f766e"]} showDateDisplay={false} />}
        </div>
        <button type="button" onClick={closeCalendar} className="mt-3 min-h-11 w-full rounded-md bg-theme px-4 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{t("Done")}</button>
      </dialog>
      {error && <p role="alert" className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm leading-relaxed text-red-700">{error}</p>}
    </form>
  );
}
