import { create } from "zustand";

export const useTicketsStore = create((set, get) => ({
  tickets: [],
  loading: false,
  error: null,
  currentFilter: "open",  // default status filter
  searchQuery: "",        // search input

  // Fetch all tickets
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

  // Status filter
  setFilter: (status) => set({ currentFilter: status }),

  // Search query
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Get tickets filtered by status
  getTicketsByStatus: (status) => {
    return get().tickets.filter((t) => t.status === status);
  },

  // Get tickets filtered by status AND search query
  getFilteredTickets: () => {
    const { tickets, currentFilter, searchQuery } = get();

    let filtered = tickets.filter((t) => t.status === currentFilter);

    if (searchQuery.trim()) {
      filtered = filtered.filter((t) =>
        t.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  },
}));
