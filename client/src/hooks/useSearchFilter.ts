import { useContext } from "react";
import { SearchFilterContext } from "../contexts/SearchFilterContext";

export type { FilterOptions, SearchFilterState } from "../contexts/SearchFilterContext";

export const useSearchFilter = () => {
  const context = useContext(SearchFilterContext);
  if (!context) {
    throw new Error("useSearchFilter must be used within a SearchFilterProvider");
  }
  return context;
};
