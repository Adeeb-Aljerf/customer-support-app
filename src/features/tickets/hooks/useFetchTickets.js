import { useEffect } from 'react';
import { useTicketStore } from '../store/useTicketStore';
import { usePagination } from './usePagination';
import { useSearch } from './useSearch';

export const useFetchTickets = () => {
  const {
    tickets,
    filteredTickets,
    loading,
    error,
    currentFilter,
    fetchAndFilterTickets,
    getPaginatedTickets
  } = useTicketStore();

  const pagination = usePagination();
  const search = useSearch();

  // Fetch tickets on mount
  useEffect(() => {
    fetchAndFilterTickets('open');
  }, []);

  const refetch = () => {
    fetchAndFilterTickets(currentFilter);
  };

  return {
    // Tickets data
    tickets: getPaginatedTickets(),
    allTickets: tickets,
    filteredTickets,
    loading,
    error,
    currentFilter,
    
    // Pagination
    pagination,
    
    // Search
    search,
    
    // Actions
    refetch
  };
};
