import { create } from "zustand";

export const useTicketsStore = create((set, get) => ({
  tickets: [],
  loading: false,
  error: null,
  currentFilter: "open",

  // Fetch all tickets from API
  fetchTickets: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("https://openapi.pythonanywhere.com/api/tickets");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      set({ tickets: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Set the current filter
  setFilter: (status) => set({ currentFilter: status }),

  // Get filtered tickets based on status
  getTicketsByStatus: (status) => {
    const tickets = get().tickets;
    return tickets.filter((t) => t.status === status);
  },
}));


