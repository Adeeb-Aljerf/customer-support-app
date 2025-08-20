import { create } from "zustand";
export const useTicketChatStore = create((set) => ({
  ticketChat: [],
  loading: false,
  error: null,

  // Fetch all ticket chat from API
  fetchTicketChat: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`https://openapi.pythonanywhere.com/api/tickets/${id}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log('data', data);
      set({ ticketChat: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

}));


