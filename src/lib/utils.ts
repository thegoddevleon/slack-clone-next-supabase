import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface PaginateMeta {
  currentPage: number;
  previousPage?: number | null;
  totalPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function generateMetaForPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}): PaginateMeta {
  return {
    currentPage: page,
    previousPage: page > 1 ? page - 1 : null,
    totalPage: totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}