import CryptoJS from "crypto-js";

// Matches Airflighto's shareable search URL format. This is URL encoding,
// not a security boundary: the client-side key is publicly available.
const SECRET_KEY = process.env.NEXT_PUBLIC_SEARCH_SECRET || "your-fallback-secret-key-change-this";

export const encryptSearchParams = (data) =>
  encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString());

export const decryptSearchParams = (cipher) => {
  if (!cipher) return null;
  try {
    const decoded = decodeURIComponent(cipher);
    try {
      const text = CryptoJS.AES.decrypt(decoded, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      if (text) return JSON.parse(text);
    } catch {
      // Retain support for the source project's legacy fallback URLs.
    }
    try {
      return JSON.parse(atob(decoded));
    } catch {
      return JSON.parse(decoded);
    }
  } catch {
    return null;
  }
};
