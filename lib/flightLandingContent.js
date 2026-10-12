const first = (value) => Array.isArray(value) ? value[0] : value;
const textParam = (value) => typeof first(value) === "string" ? first(value).trim() : "";

const formatTopic = (value) => value.slice(0, 120).replace(/[-_]+/g, " ").replace(/[^a-zA-Z0-9 '&.]/g, "").replace(/\s+/g, " ").trim().replace(/\b[a-zA-Z]+\b/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase());

export function getFlightLandingContent(query = {}) {
  const topic = formatTopic(textParam(query.qstr));
  const campaign = textParam(query.utm_campaign);
  const sample = textParam(query.utm_samp);
  return {
    topic,
    campaign: Boolean(campaign || sample),
    campaignKey: JSON.stringify([topic, campaign, sample]),
    heading: topic || "Explore Your Next Flight",
    subheading: topic ? `Explore flight options for ${topic}, compare itineraries, and review fare conditions with independent FaresGoFinder assistance.` : "Search domestic and international flights, compare itineraries, and review fare conditions before booking.",
    promoDescription: topic ? `Planning travel related to ${topic}? FaresGoFinder helps you review available routes, schedules, and booking options for your trip.` : "FaresGoFinder helps you explore domestic and international routes and choose an itinerary that fits your plans.",
    popupDescription: topic ? `Speak with FaresGoFinder about ${topic} flight options, new bookings, changes, or cancellation requests. Fare and provider conditions apply.` : "Speak with FaresGoFinder about flight options, new bookings, changes, or cancellation requests. Fare and provider conditions apply.",
    callLabel: topic ? `${topic} Flight Assistance` : "Explore options for your flight",
    agentHeading: topic ? `Get Help With ${topic} Flight Options` : "Speak With Our Travel Team",
  };
}
