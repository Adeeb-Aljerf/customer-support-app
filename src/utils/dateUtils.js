/**
 * Formats a date string into a standardized format: "Apr, 15, 2025, 08:30 AM"
 * @param {string|number|Date} dateInput - The date to format (ISO string, timestamp, or Date object)
 * @param {string} fallback - The string to return if date is invalid (default: "N/A")
 * @returns {string} Formatted date string
 */
export const formatDate = (dateInput, fallback = "N/A") => {
  if (!dateInput) return fallback;

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    return fallback;
  }

  return date
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "")
    .replace(",", ",");
};

/**
 * Formats a date string into a relative time format for tickets (e.g., "2 hrs ago")
 * @param {string|number|Date} dateInput - The date to format
 * @param {Object} ticket - Optional ticket object to get fallback dates from
 * @param {string} fallback - The string to return if date is invalid (default: "N/A")
 * @returns {string} Relative time string
 */
export const formatTicketTime = (
  dateInput,
  ticket = null,
  fallback = "N/A"
) => {
  // Try to get a valid date from various sources
  const dateToUse =
    dateInput ||
    (ticket && (ticket.updated_at || ticket.timestamp || ticket.created_at));

  if (!dateToUse) return fallback;

  const now = new Date();
  const ticketDate = new Date(dateToUse);

  if (isNaN(ticketDate.getTime())) return fallback;

  const diffInMs = now - ticketDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours} hrs ago`;
  return `${diffInDays} days ago`;
};

/**
 * Formats a date string into a relative time format for messages (e.g., "2 hours ago")
 * @param {string|number|Date} dateInput - The date to format
 * @param {string} fallback - The string to return if date is invalid (default: "N/A")
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (dateInput, fallback = "N/A") => {
  if (!dateInput) return fallback;

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(date.getTime())) return fallback;

  const now = new Date();
  const diffInMs = now - date;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return "Just now";
  if (diffInHours < 1) return `${diffInMinutes} min ago`;
  if (diffInDays < 1) return `${diffInHours} hrs ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;

  // If more than a week, return the formatted date
  return formatDate(date);
};
