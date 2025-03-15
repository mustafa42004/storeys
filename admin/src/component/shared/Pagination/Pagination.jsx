import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({
  page,
  totalPages,
  hasPrevPage,
  hasNextPage,
  totalDocs,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than max pages to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page range
      let startPage = Math.max(2, page - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 3);

      // Adjust startPage if we're near the end
      if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - (maxPagesToShow - 3));
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add page numbers in range
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  // Handle items per page change
  const handleLimitChange = (e) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing {Math.min((page - 1) * limit + 1, totalDocs)} to{" "}
        {Math.min(page * limit, totalDocs)} of {totalDocs} entries
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(page - 1)}
          disabled={!hasPrevPage}
        >
          Previous
        </button>

        {getPageNumbers().map((pageNum, index) => (
          <button
            key={index}
            className={`pagination-button ${pageNum === page ? "active" : ""} ${
              pageNum === "..." ? "ellipsis" : ""
            }`}
            onClick={() => pageNum !== "..." && handlePageChange(pageNum)}
            disabled={pageNum === "..."}
          >
            {pageNum}
          </button>
        ))}

        <button
          className="pagination-button"
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>

      <div className="pagination-limit">
        <select value={limit} onChange={handleLimitChange}>
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  hasPrevPage: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  totalDocs: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default Pagination;
