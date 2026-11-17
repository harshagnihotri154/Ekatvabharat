// Only fixed event names are sent; record IDs stay in browser storage for deduplication.
const sent = new Set();
export function trackSuccess(event, id) {
  if (!["enquiry_success", "donation_success"].includes(event) || !id) return;
  const key = `ebf-analytics:${event}:${id}`;
  try {
    if (sent.has(key) || sessionStorage.getItem(key)) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event });
    sent.add(key);
    try { sessionStorage.setItem(key, "1"); } catch {}
  } catch {
    // Analytics must never interrupt a saved enquiry or confirmed payment.
  }
}
