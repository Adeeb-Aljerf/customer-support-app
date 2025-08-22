import { create } from "zustand";
export const useTicketChatStore = create((set) => ({
  ticketChat: {},
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

    // Post a reply message
postReply: async (ticketId, message) => {
  set({ error: null });
  try {
    // 1️⃣ Call the API
    const res = await fetch(`https://openapi.pythonanywhere.com/api/tickets/${ticketId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: "agent", // required by API
        message,
      }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log('data', data);
    // 2️⃣ Update the state instantly so the message appears in the UI
    set((state) => ({
      ticketChat: {
        ...state.ticketChat,
        messages: [
          ...state.ticketChat.messages,
          {
            message,               // the text typed by agent
            sender: "agent",
            timestamp: new Date().toISOString(), // current time for immediate UI
          },
        ],
      },

    }));
    
  } catch (err) {
    set({ error: err.message});
  }
},

  //  clear selected ticket
  clearTicketChat: () => set({ ticketChat: null }),



}));


