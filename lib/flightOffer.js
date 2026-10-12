export const offerPrice = (offer) => Number(offer?.total_amount ?? offer?.base_amount ?? 0);

export const offerDurationHours = (offer) =>
  (offer?.slices || []).reduce((total, slice) => {
    const match = slice.duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    return total + Number(match?.[1] || 0) + Number(match?.[2] || 0) / 60;
  }, 0);

// Categorize each itinerary by its most-connected leg; two nonstop legs
// of a round trip are still a nonstop itinerary.
export const offerStopCategory = (offer) => {
  const stops = Math.max(0, ...(offer?.slices || []).map((slice) => Math.max(0, (slice.segments?.length || 1) - 1)));
  return stops === 0 ? "non-stop" : stops === 1 ? "one-stop" : "two-stops";
};
