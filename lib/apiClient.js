export async function apiRequest(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeout);

    const data = await response.json().catch(() => ({}));

    // === Handle response status ===
    if (!response.ok) {
      const message =
        data?.message ||
        `API Error (${response.status}): ${response.statusText}`;
      const error = new Error(message);
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw new Error(error.message || "Network error occurred.");
  }
}
