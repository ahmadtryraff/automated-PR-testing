/**
 * Generates an array of page numbers for pagination with smart ellipsis handling
 * @param currentPage - The current active page
 * @param totalItems - Total number of items
 * @param itemsPerPage - Number of items per page
 * @param maxVisiblePages - Maximum number of page buttons to show (default: 5)
 * @returns Array of page numbers to display
 */
export const getPageNumbers = (
  currentPage: number,
  totalItems: number,
  itemsPerPage: number,
  maxVisiblePages: number = 5
): number[] => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};

/**
 * Calculates total pages based on total items and items per page
 * @param totalItems - Total number of items
 * @param itemsPerPage - Number of items per page
 * @returns Total number of pages
 */
export const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

/**
 * Checks if a page number should show ellipsis before it
 * @param pageNumber - The page number to check
 * @param pageNumbers - Array of visible page numbers
 * @returns True if ellipsis should be shown before this page
 */
export const shouldShowEllipsisBefore = (pageNumber: number, pageNumbers: number[]): boolean => {
  if (pageNumbers.length === 0) return false;
  const firstVisiblePage = pageNumbers[0];
  return pageNumber === firstVisiblePage && firstVisiblePage > 1;
};

/**
 * Checks if a page number should show ellipsis after it
 * @param pageNumber - The page number to check
 * @param pageNumbers - Array of visible page numbers
 * @param totalPages - Total number of pages
 * @returns True if ellipsis should be shown after this page
 */
export const shouldShowEllipsisAfter = (pageNumber: number, pageNumbers: number[], totalPages: number): boolean => {
  if (pageNumbers.length === 0) return false;
  const lastVisiblePage = pageNumbers[pageNumbers.length - 1];
  return pageNumber === lastVisiblePage && lastVisiblePage < totalPages;
}; 