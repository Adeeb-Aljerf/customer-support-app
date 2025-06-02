import { useState } from 'react';
import { useTicketStore } from '../store/useTicketStore';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    searchTickets,
    clearSearch,
    isSearching,
    searchTerm: storeSearchTerm,
    searchResults,
    getTotalItems
  } = useTicketStore();

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    
    if (value.trim() === '') {
      clearSearch();
    } else {
      searchTickets(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchTickets(searchTerm);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    clearSearch();
  };

  const performSearch = (term) => {
    setSearchTerm(term);
    searchTickets(term);
  };

  const hasSearchResults = isSearching && searchResults.length > 0;
  const hasNoSearchResults = isSearching && searchResults.length === 0;
  const searchResultsCount = isSearching ? searchResults.length : 0;

  return {
    // State
    searchTerm,
    isSearching,
    searchResults,
    hasSearchResults,
    hasNoSearchResults,
    searchResultsCount,
    
    // Actions
    handleSearchChange,
    handleSearchSubmit,
    handleClearSearch,
    performSearch,
    clearSearch,
    
    // Helpers
    setSearchTerm
  };
};