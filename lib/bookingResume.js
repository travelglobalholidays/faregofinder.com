export const localRedirect = (path) =>
  typeof path === "string" && path.startsWith("/") && !path.startsWith("//") && !path.includes("\\") ? path : "/flights";

export async function resumeBooking(api, storage, redirect) {
  const pending = storage.getItem("pendingBooking");
  if (pending) {
    let flight;
    try { flight = JSON.parse(pending).flight; } catch { storage.removeItem("pendingBooking"); }
    if (flight) {
      if (flight.expires_at && new Date(flight.expires_at).getTime() <= Date.now()) {
        storage.removeItem("pendingBooking");
      } else {
        const response = await api.post("/bookings/draft", { offer: flight });
        const bookingId = response?.data?.data?._id;
        if (!bookingId) throw new Error("Unable to start your booking. Please try again.");
        storage.removeItem("pendingBooking");
        storage.removeItem("redirectAfterLogin");
        return `/booking/${bookingId}`;
      }
    }
  }
  const destination = localRedirect(redirect || storage.getItem("redirectAfterLogin"));
  storage.removeItem("redirectAfterLogin");
  return destination;
}
