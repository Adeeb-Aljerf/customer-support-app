import { usePagination } from "../../../features/tickets/hooks/usePagination";
import Icon from "../icons/Icon";
import styles from './Pagination.module.css';

export default function Pagination() {
  const {
    currentPage,
    totalItems,
    itemsPerPage,
    canGoNext,
    canGoPrevious,
    goToPreviousPage,
    goToNextPage,
    goToFirstPage,
    goToLastPage,
    handleItemsPerPageChange,
    handlePageChange,
    getPageNumbers
  } = usePagination();

  if (totalItems === 0) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  const handleRowsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      handleItemsPerPageChange(value);
    }
  };

  return (
    <div className={styles.pagination}>
      {/* First container - Rows per page */}
      <div className={styles.rowsContainer}>
        <span className={styles.rowsLabel}>Rows per page:</span>
        <input
          type="number"
          value={itemsPerPage}
          onChange={handleRowsPerPageChange}
          className={styles.rowsInput}
          min="1"
          max="100"
        />
      </div>

      {/* Second container - Navigation */}
      <div className={styles.navigationContainer}>
        {/* First page */}
        <button 
          onClick={goToFirstPage}
          disabled={!canGoPrevious}
          className={styles.navButton}
        >
          <Icon name="chevron-double-left" size={16} />
        </button>

        {/* Previous page */}
        <button 
          onClick={goToPreviousPage}
          disabled={!canGoPrevious}
          className={styles.navButton}
        >
          <Icon name="chevron-left" size={16} />
        </button>

        {/* Page numbers */}
        <div className={styles.pageNumbers}>
          {pageNumbers.map(pageNum => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`${styles.pageNumber} ${
                pageNum === currentPage ? styles.pageNumberActive : styles.pageNumberInactive
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* Next page */}
        <button 
          onClick={goToNextPage}
          disabled={!canGoNext}
          className={styles.navButton}
        >
          <Icon name="chevron-right" size={16} />
        </button>

        {/* Last page */}
        <button 
          onClick={goToLastPage}
          disabled={!canGoNext}
          className={styles.navButton}
        >
          <Icon name="chevron-double-right" size={16} />
        </button>
      </div>
    </div>
  );
}
