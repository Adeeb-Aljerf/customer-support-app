import { useEffect } from "react";
import { useTicketStore } from "../store/useTicketStore";
import { ticketsApi } from "../api/ticketsApi";
import { usePagination } from "./usePagination";
import { useSearch } from "./useSearch";

export const useFetchTickets = () => {
  const { currentFilter, getPaginatedTickets, updateTicketFiltering } =
    useTicketStore();

  const pagination = usePagination();
  const search = useSearch();

  const fetchAndFilterTickets = async (status) => {
    updateTicketFiltering({
      loading: true,
      error: null,
      currentFilter: status,
      isSearching: false,
      searchTerm: "",
    });

    try {
      const allTickets = await ticketsApi.fetchTickets();
      const filteredTickets = allTickets.filter((ticket) => {
        const ticketStatus = ticket.status?.toLowerCase();
        const filterStatus = status.toLowerCase();
        return ticketStatus === filterStatus;
      });

      updateTicketFiltering({
        allTickets,
        tickets: allTickets,
        filteredTickets,
        searchResults: [],
        loading: false,
      });
    } catch (error) {
      updateTicketFiltering({
        error: error.message,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchAndFilterTickets("open");
  }, []);

  return {
    tickets: getPaginatedTickets(),
    loading: useTicketStore((state) => state.loading),
    error: useTicketStore((state) => state.error),
    currentFilter,
    pagination,
    search,
    refetch: () => fetchAndFilterTickets(currentFilter),
    fetchAndFilterTickets,
  };
};
