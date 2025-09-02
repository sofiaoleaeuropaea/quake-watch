import { useEffect, useMemo, useState } from 'react';

export interface UsePaginationProps<Item> {
  items: Item[];
  itemsPerPage: number;
  initialPage?: number;
}

export interface UsePaginationResult<Item> {
  currentItems: Item[];
  currentPage: number;
  totalPages: number;
  navigateToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

export const usePagination = <Item,>({
  items,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps<Item>): UsePaginationResult<Item> => {
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(
    Math.min(Math.max(initialPage, 1), totalPages),
  );

  // Used to make sure the current page stays valid if the number of pages changes .
  useEffect(() => {
    setCurrentPage((p) => Math.min(Math.max(p, 1), totalPages));
  }, [totalPages]);

  const currentItems = useMemo(
    () =>
      items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [items, currentPage, itemsPerPage],
  );

  const navigateToPage = (page: number) =>
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const previousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return {
    currentItems,
    currentPage,
    totalPages,
    navigateToPage,
    nextPage,
    previousPage,
  };
};
