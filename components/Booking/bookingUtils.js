export const formatMoney = (amount = 0, currency = "USD") =>
  `${currency} ${Number(amount || 0).toFixed(2)}`;

export const formatDate = (value) => {
  if (!value) return "N/A";
  return new Date(value).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatTime = (value) => {
  if (!value) return "N/A";
  return new Date(value).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDuration = (duration) => {
  if (!duration) return "N/A";
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  const hours = match?.[1] || "0";
  const minutes = match?.[2] || "0";
  return `${hours}h ${minutes}m`;
};

export const getCurrency = (booking) =>
  booking?.offerSnapshot?.currency || "USD";

export const getPassengerCount = (booking) =>
  booking?.passengers?.length || booking?.offerPassengerIds?.length || 1;

export const getBaseAndTaxTotal = (booking) => {
  if (!booking) return 0;
  if (booking.baseTotal || booking.taxTotal) {
    return Number(booking.baseTotal || 0) + Number(booking.taxTotal || 0);
  }
  return Number(booking.offerSnapshot?.totalAmount || booking.totalAmount || 0);
};
