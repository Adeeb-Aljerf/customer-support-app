import { useTicketStore } from '../store/useTicketStore';

export const usePagination = () => {
  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    getTotalItems
  } = useTicketStore();

  const totalItems = getTotalItems();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // Show only 3 page numbers as per design
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      // Adjust start if we're near the end
      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const getStartIndex = () => {
    return (currentPage - 1) * itemsPerPage + 1;
  };

  const getEndIndex = () => {
    return Math.min(currentPage * itemsPerPage, totalItems);
  };

  return {
    // State
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    canGoNext,
    canGoPrevious,
    
    // Actions
    handlePageChange,
    handleItemsPerPageChange,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    
    // Helpers
    getPageNumbers,
    getStartIndex,
    getEndIndex
  };
};
