import React, { createContext, useState, ReactNode, useCallback } from "react";
import { Priority, TaskStatus } from "../utils/enums";

export interface FilterOptions {
  categories: string[];
  priorities: Priority[];
  statuses: TaskStatus[];
  dueDateRange?: {
    start?: string;
    end?: string;
  };
}

export interface SearchFilterState {
  searchQuery: string;
  isSearchActive: boolean;
  filters: FilterOptions;
  isFilterActive: boolean;
}

interface SearchFilterContextType {
  state: SearchFilterState;
  setSearchQuery: (query: string) => void;
  setSearchActive: (active: boolean) => void;
  updateFilters: (filters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
  resetAll: () => void;
  hasActiveFilters: boolean;
}

const initialState: SearchFilterState = {
  searchQuery: "",
  isSearchActive: false,
  filters: {
    categories: [],
    priorities: [],
    statuses: [],
    dueDateRange: undefined,
  },
  isFilterActive: false,
};

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(undefined);

export { SearchFilterContext };

interface SearchFilterProviderProps {
  children: ReactNode;
}

export const SearchFilterProvider: React.FC<SearchFilterProviderProps> = ({ children }) => {
  const [state, setState] = useState<SearchFilterState>(initialState);

  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  const setSearchActive = useCallback((active: boolean) => {
    setState((prev) => ({
      ...prev,
      isSearchActive: active,
      // Clear search when deactivating
      searchQuery: active ? prev.searchQuery : "",
    }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setState((prev) => {
      const updatedFilters = { ...prev.filters, ...newFilters };
      const hasFilters =
        updatedFilters.categories.length > 0 ||
        updatedFilters.priorities.length > 0 ||
        updatedFilters.statuses.length > 0 ||
        updatedFilters.dueDateRange !== undefined;

      return {
        ...prev,
        filters: updatedFilters,
        isFilterActive: hasFilters,
      };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: initialState.filters,
      isFilterActive: false,
    }));
  }, []);

  const resetAll = useCallback(() => {
    setState(initialState);
  }, []);

  const hasActiveFilters =
    state.filters.categories.length > 0 ||
    state.filters.priorities.length > 0 ||
    state.filters.statuses.length > 0 ||
    state.filters.dueDateRange !== undefined;

  const contextValue: SearchFilterContextType = {
    state,
    setSearchQuery,
    setSearchActive,
    updateFilters,
    clearFilters,
    resetAll,
    hasActiveFilters,
  };

  return <SearchFilterContext.Provider value={contextValue}>{children}</SearchFilterContext.Provider>;
};
