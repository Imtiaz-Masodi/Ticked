import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { useSearchFilter } from "../../hooks";
import { useMobileDetect } from "../../hooks/useMediaQuery";

interface SearchInputProps {
  placeholder?: string;
  onFilterClick: () => void;
  className?: string;
}

const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(
  ({ placeholder = "Search tasks...", onFilterClick, className = "" }, filterIconRef) => {
    const { state, setSearchQuery, setSearchActive, hasActiveFilters } = useSearchFilter();
    const [localQuery, setLocalQuery] = useState(state.searchQuery);
    const inputRef = useRef<HTMLInputElement>(null);
    const isMobile = useMobileDetect();

    // Focus input when search becomes active
    useEffect(() => {
      if (state.isSearchActive && inputRef.current) {
        inputRef.current.focus();
      }
    }, [state.isSearchActive]);

    // Sync local state with context
    useEffect(() => {
      setLocalQuery(state.searchQuery);
    }, [state.searchQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalQuery(value);
      setSearchQuery(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    return (
      <div
        className={`
        relative flex items-center border rounded-lg 
        focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1
        focus-within:shadow-lg focus-within:shadow-slate-200/30 dark:focus-within:shadow-gray-900/20 
        text-slate-700 dark:text-gray-200 
        bg-slate-50/50 dark:bg-gray-700 backdrop-blur-sm transition-all duration-200
        hover:bg-slate-50 dark:hover:bg-gray-600/80
        border-slate-200 dark:border-gray-600 focus-within:outline-slate-400 dark:focus-within:outline-white/40 
        hover:border-slate-300 dark:hover:border-gray-500
        ${isMobile ? "w-full" : "min-w-64"}
        ${className}
      `}
      >
        <div className="absolute left-3">
          <Icon name={Icons.search} className="text-slate-400 dark:text-gray-500 text-sm" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent pl-10 pr-12 py-2.5 rounded-lg text-slate-700 dark:text-gray-200 text-sm focus-visible:outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500"
        />

        <div className="absolute right-3 flex" ref={filterIconRef}>
          <Icon
            name={Icons.close}
            className="p-2 text-sm text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 cursor-pointer"
            onClick={() => setSearchActive(false)}
          />
          <Icon
            name={Icons.filter}
            onClick={onFilterClick}
            className={`cursor-pointer p-2 text-sm transition-colors ${
              hasActiveFilters
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300"
            }`}
          />
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
