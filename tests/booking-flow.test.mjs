import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const moduleUrl = (source) => `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const encryption = moduleUrl((await read("lib/encryption.js")).replace('"crypto-js"', JSON.stringify(pathToFileURL(require.resolve("crypto-js")).href)));
const searchUrl = moduleUrl((await read("lib/flightSearchUrl.js")).replace('"./encryption"', JSON.stringify(encryption)));
const { buildFlightResultUrl, parseFlightSearchParams, normalizeFlightOffers } = await import(searchUrl);
const { resumeBooking, localRedirect } = await import(moduleUrl(await read("lib/bookingResume.js")));
const { offerStopCategory, offerPrice, offerDurationHours } = await import(moduleUrl(await read("lib/flightOffer.js")));
const { getFlightLandingContent } = await import(moduleUrl(await read("lib/flightLandingContent.js")));
const search = { origin: "JFK", destination: "LAX", departureDate: "2027-01-15", returnDate: "2027-01-20", tripType: "roundtrip", cabinClass: "economy", passengers: { adults: 2, children: 1, infants: 0 } };
const storage = (values = {}) => {
  const entries = new Map(Object.entries(values));
  return { getItem: (key) => entries.get(key) ?? null, removeItem: (key) => entries.delete(key) };
};

test("flight landing content follows qstr while campaign parameters control the popup", () => {
  const generic = getFlightLandingContent();
  assert.equal(generic.heading, "Explore Your Next Flight");
  assert.equal(generic.campaign, false);
  const keywordOnly = getFlightLandingContent({ qstr: "jetblue-airlines" });
  assert.equal(keywordOnly.heading, "Jetblue Airlines");
  assert.equal(keywordOnly.campaign, false);
  const campaign = getFlightLandingContent({ qstr: "jetblue-airlines", utm_campaign: "flight-1" });
  assert.equal(campaign.campaign, true);
  assert.match(campaign.popupDescription, /Jetblue Airlines/);
  assert.notEqual(campaign.campaignKey, getFlightLandingContent({ qstr: "delta-airlines", utm_campaign: "flight-1" }).campaignKey);
  assert.notEqual(campaign.campaignKey, getFlightLandingContent({ qstr: "jetblue-airlines", utm_campaign: "flight-2" }).campaignKey);
  assert.equal(getFlightLandingContent({ utm_samp: "sample-1" }).campaign, true);
  assert.equal(getFlightLandingContent({ utm_campaign: "   " }).campaign, false);
  assert.equal(getFlightLandingContent({ qstr: ["jetblue-airlines", "delta-airlines"] }).topic, "Jetblue Airlines");
});

test("shareable search preserves itinerary and passenger details", () => {
  const link = buildFlightResultUrl(search);
  assert.deepEqual(parseFlightSearchParams(link.split("?")[1]), search);
  assert.equal(parseFlightSearchParams("from=jfk&to=lax&depart=2027-01-15&trip=oneway&adults=2").returnDate, null);
});
test("invalid links, impossible dates, and invalid passenger totals are rejected", () => {
  assert.equal(parseFlightSearchParams("q=broken"), null);
  for (const patch of [{ departureDate: "2027-02-30" }, { destination: "JFK" }, { returnDate: "2027-01-10" }, { passengers: { adults: 0, children: 1, infants: 0 } }, { passengers: { adults: 10, children: 0, infants: 0 } }]) {
    assert.equal(parseFlightSearchParams(buildFlightResultUrl({ ...search, ...patch }).split("?")[1]), null);
  }
});
test("offer totals and stop categories handle round-trip legs correctly", () => {
  const offer = { total_amount: "420.25", slices: [{ duration: "PT2H30M", segments: [{}] }, { duration: "PT3H", segments: [{}] }] };
  assert.equal(offerStopCategory(offer), "non-stop");
  assert.equal(offerDurationHours(offer), 5.5);
  assert.equal(offerPrice(offer), 420.25);
  assert.deepEqual(normalizeFlightOffers({ data: { data: { offers: [offer] } } }), [offer]);
});
test("login/register continuation creates the selected draft and clears pending state", async () => {
  const flight = { id: "offer-test" };
  const saved = storage({ pendingBooking: JSON.stringify({ flight }), redirectAfterLogin: "/flights/result" });
  const destination = await resumeBooking({ post: async (path, payload) => {
    assert.equal(path, "/bookings/draft");
    assert.deepEqual(payload.offer, flight);
    return { data: { data: { _id: "draft-test" } } };
  } }, saved);
  assert.equal(destination, "/booking/draft-test");
  assert.equal(saved.getItem("pendingBooking"), null);
  assert.equal(saved.getItem("redirectAfterLogin"), null);
});
test("failed drafts retain pending selection for retry", async () => {
  const saved = storage({ pendingBooking: JSON.stringify({ flight: { id: "offer-test" } }) });
  await assert.rejects(resumeBooking({ post: async () => { throw new Error("Service unavailable"); } }, saved));
  assert.ok(saved.getItem("pendingBooking"));
});
test("expired offers return to results; redirects stay inside the site", async () => {
  const saved = storage({ pendingBooking: JSON.stringify({ flight: { expires_at: "2000-01-01" } }), redirectAfterLogin: "/flights/result?q=previous" });
  assert.equal(await resumeBooking({ post: () => assert.fail("Expired offers must not be booked") }, saved), "/flights/result?q=previous");
  for (const path of ["https://example.com", "//example.com", "/\\example.com"]) assert.equal(localRedirect(path), "/flights");
});
test("search payload normalizes first class and detects passenger mismatches", async () => {
  const source = (await read("lib/flightSearch.js")).replace('import axiosInstance from "./axiosInstance";', 'const axiosInstance = { post: async () => ({ data: [{ passengers: [{}] }] }) };').replace('"./flightSearchUrl"', JSON.stringify(searchUrl));
  const { toFlightSearchPayload, searchFlights } = await import(moduleUrl(source));
  assert.equal(toFlightSearchPayload({ ...search, cabinClass: "first_class" }).cabinClass, "first");
  await assert.rejects(searchFlights(search), /different number of travelers/);
});

test("API proxy forwards each booking step and preserves authorization and errors", async () => {
  const source = (await read("app/api/[...path]/route.js")).replace('import { NextResponse } from "next/server";', 'const NextResponse = { json: (data, options) => Response.json(data, options) };');
  const proxy = await import(moduleUrl(source));
  const previousFetch = globalThis.fetch;
  const previousBase = process.env.API_URL;
  process.env.API_URL = "https://booking-service.example/api";
  let calls = 0;
  const routes = [["POST", "flights/search"], ["GET", "auth/me"], ["POST", "auth/login"], ["POST", "auth/register"], ["POST", "bookings/draft"], ["GET", "bookings/draft-test"], ["PUT", "bookings/draft-test/fare"], ["PUT", "bookings/draft-test/travellers"], ["POST", "bookings/draft-test/addons"], ["POST", "bookings/draft-test/payment-details"], ["GET", "bookings/reference/TEST123"]];
  try {
    for (const [method, route] of routes) {
      globalThis.fetch = async (url, options) => {
        calls++;
        assert.equal(url, `https://booking-service.example/api/${route}`);
        assert.equal(options.headers.Authorization, "Bearer test-token");
        assert.equal(options.headers.Origin, undefined);
        assert.equal(options.method, method);
        assert.equal(options.body, method === "GET" ? undefined : '{"fixture":true}');
        return Response.json({ message: "Fixture response" }, { status: 401 });
      };
      const request = new Request(`https://faresgofinder.example/api/${route}`, { method, headers: { authorization: "Bearer test-token", origin: "https://faresgofinder.example" }, ...(method === "GET" ? {} : { body: '{"fixture":true}' }) });
      const response = await proxy[method](request, { params: Promise.resolve({ path: route.split("/") }) });
      assert.equal(response.status, 401);
      assert.equal(response.headers.get("cache-control"), "no-store");
    }
    const response = await proxy.GET(new Request("https://faresgofinder.example/api/admin"), { params: Promise.resolve({ path: ["admin"] }) });
    assert.equal(response.status, 404);
    assert.equal(calls, routes.length);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousBase === undefined) delete process.env.API_URL;
    else process.env.API_URL = previousBase;
  }
});
