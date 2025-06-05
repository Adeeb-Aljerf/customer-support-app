import { create } from "zustand";

export const useTicketStore = create((set, get) => ({
  // Core state
  allTickets: [],
  tickets: [],
  filteredTickets: [],
  searchResults: [],
  loading: false,
  error: null,
  currentFilter: "open",
  searchTerm: "",
  isSearching: false,

  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,

  // Selected ticket and conversation state
  selectedTicket: null,
  conversation: [],
  conversationLoading: false,
  conversationError: null,
  postMessageLoading: false,
  postMessageError: null,

  // Batch update action for ticket filtering
  updateTicketFiltering: (updates) =>
    set((state) => ({
      ...state,
      ...updates,
    })),

  // Pagination actions
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),

  // Ticket selection actions
  setSelectedTicket: (ticket) =>
    set((state) => {
      if (state.selectedTicket?.id === ticket?.id) return state;
      return {
        selectedTicket: ticket,
        conversation: [],
        conversationError: null,
        conversationLoading: false,
        postMessageLoading: false,
        postMessageError: null,
      };
    }),

  clearSelectedTicket: () =>
    set({
      selectedTicket: null,
      conversation: [],
      conversationError: null,
      conversationLoading: false,
      postMessageLoading: false,
      postMessageError: null,
    }),

  // Conversation actions
  setConversation: (conversation) =>
    set((state) => (!state.selectedTicket ? state : { conversation })),

  setConversationLoading: (loading) =>
    set((state) =>
      !state.selectedTicket ? state : { conversationLoading: loading }
    ),

  setConversationError: (error) =>
    set((state) =>
      !state.selectedTicket ? state : { conversationError: error }
    ),

  setPostMessageLoading: (loading) => set({ postMessageLoading: loading }),
  setPostMessageError: (error) => set({ postMessageError: error }),

  // Helper getters
  getPaginatedTickets: () => {
    const {
      filteredTickets,
      searchResults,
      isSearching,
      currentPage,
      itemsPerPage,
    } = get();
    const ticketsToShow = isSearching ? searchResults : filteredTickets;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ticketsToShow.slice(startIndex, endIndex);
  },

  getTotalItems: () => {
    const { filteredTickets, searchResults, isSearching } = get();
    return isSearching ? searchResults.length : filteredTickets.length;
  },
}));
