import { create } from 'zustand';
import { ticketsApi } from '../api/ticketsApi';

export const useTicketStore = create((set, get) => ({
  // State
  allTickets: [],
  tickets: [],
  filteredTickets: [],
  searchResults: [],
  loading: false,
  error: null,
  currentFilter: 'open',
  searchTerm: '',
  isSearching: false,
  
  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,

  // Actions
  setCurrentFilter: (filter) => set({ currentFilter: filter }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),

  // Fetch all tickets and then filter
  fetchAndFilterTickets: async (status) => {
    console.log('Fetching and filtering tickets for status:', status);
    
    set({ loading: true, error: null, currentFilter: status, isSearching: false, searchTerm: '' });
    
    try {
      const allTickets = await ticketsApi.fetchTickets();
      console.log('All tickets from API:', allTickets);
      
      const filteredTickets = allTickets.filter(ticket => {
        const ticketStatus = ticket.status?.toLowerCase();
        const filterStatus = status.toLowerCase();
        return ticketStatus === filterStatus;
      });
      
      console.log('Filtered tickets:', filteredTickets);
      
      set({ 
        allTickets,
        tickets: filteredTickets,
        filteredTickets: filteredTickets,
        searchResults: [],
        loading: false,
        currentPage: 1
      });
    } catch (error) {
      console.error('Error fetching tickets:', error);
      set({ 
        error: error.message, 
        loading: false 
      });
    }
  },

  // Search tickets by name only
  searchTickets: (searchTerm) => {
    const { filteredTickets } = get();
    
    if (!searchTerm.trim()) {
      set({ 
        searchResults: [],
        isSearching: false,
        searchTerm: ''
      });
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const results = filteredTickets.filter(ticket => {
      return ticket.customer_name?.toLowerCase().includes(searchLower);
    });

    console.log('Search results by name:', results);
    
    set({ 
      searchResults: results,
      isSearching: true,
      searchTerm: searchTerm,
      currentPage: 1
    });
  },

  // Clear search
  clearSearch: () => {
    set({ 
      searchResults: [],
      isSearching: false,
      searchTerm: '',
      currentPage: 1
    });
  },

  // Get paginated tickets (either search results or filtered tickets)
  getPaginatedTickets: () => {
    const { filteredTickets, searchResults, isSearching, currentPage, itemsPerPage } = get();
    const ticketsToShow = isSearching ? searchResults : filteredTickets;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ticketsToShow.slice(startIndex, endIndex);
  },

  // Get total items count
  getTotalItems: () => {
    const { filteredTickets, searchResults, isSearching } = get();
    return isSearching ? searchResults.length : filteredTickets.length;
  }
}));
