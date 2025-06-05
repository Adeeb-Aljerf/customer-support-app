import { useState } from "react";
import { useTicketStore } from "../store/useTicketStore";

export const useSearch = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const {
    setSearchResults,
    setIsSearching,
    setSearchTerm,
    setCurrentPage,
    filteredTickets,
    isSearching,
    searchTerm: storeSearchTerm,
    searchResults,
    getTotalItems,
  } = useTicketStore();

  const searchTickets = (term) => {
    if (!term.trim()) {
      clearSearch();
      return;
    }

    const searchLower = term.toLowerCase();
    const results = filteredTickets.filter((ticket) => {
      return ticket.customer_name?.toLowerCase().includes(searchLower);
    });

    console.log("Search results by name:", results);

    setSearchResults(results);
    setIsSearching(true);
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setLocalSearchTerm(value);

    if (value.trim() === "") {
      clearSearch();
    } else {
      searchTickets(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      searchTickets(localSearchTerm);
    }
  };

  const handleClearSearch = () => {
    setLocalSearchTerm("");
    clearSearch();
  };

  const performSearch = (term) => {
    setLocalSearchTerm(term);
    searchTickets(term);
  };

  const hasSearchResults = isSearching && searchResults.length > 0;
  const hasNoSearchResults = isSearching && searchResults.length === 0;
  const searchResultsCount = isSearching ? searchResults.length : 0;

  return {
    // State
    searchTerm: localSearchTerm,
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
    setSearchTerm: setLocalSearchTerm,
  };
};
