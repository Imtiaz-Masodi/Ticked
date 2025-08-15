import { useEffect, useState } from "react";
import { Breakpoints } from "../utils/enums";

/**
 * Custom hook to check if the current window width matches a certain breakpoint
 * @param query - Media query to check against (e.g., "(max-width: 768px)")
 * @returns boolean indicating if the query matches
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Define listener function
    const handleResize = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [query]);

  return matches;
};

/**
 * Hook to check if the screen is mobile size
 * @param breakpoint - Optional pixel width to define mobile breakpoint (default: 768)
 * @returns boolean indicating if current screen is mobile size
 */
export const useMobileDetect = (breakpoint = Breakpoints.MOBILE): boolean => {
  return useMediaQuery(`(max-width: ${breakpoint}px)`);
};

/**
 * Hook to check if the screen is tablet size
 * @param minBreakpoint - Optional minimum pixel width (default: 768)
 * @param maxBreakpoint - Optional maximum pixel width (default: 1024)
 * @returns boolean indicating if current screen is tablet size
 */
export const useTabletDetect = (minBreakpoint = Breakpoints.MOBILE, maxBreakpoint = Breakpoints.TABLET): boolean => {
  return useMediaQuery(`(min-width: ${minBreakpoint}px) and (max-width: ${maxBreakpoint}px)`);
};

export const useTabletOrAboveDetect = (breakpoint = Breakpoints.TABLET): boolean => {
  return useMediaQuery(`(min-width: ${breakpoint}px)`);
};
