import { useDarkMode } from "../../hooks/useDarkMode";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

interface DarkModeToggleProps {
  className?: string;
  withBackground?: boolean;
}

export function DarkModeToggle({ className = "", withBackground = false }: DarkModeToggleProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const backgroundClasses = withBackground 
    ? "bg-white/10 dark:bg-gray-800/20 backdrop-blur-md border border-gray-600/10 dark:border-gray-600/30 hover:bg-white/20 dark:hover:bg-gray-700/30"
    : "hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-3 rounded-full transition-all duration-200 aspect-square ${backgroundClasses} ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Icon 
        name={isDarkMode ? Icons.lightMode : Icons.darkMode}
        className="dark:text-yellow-500 text-indigo-500 text-lg"
      />
    </button>
  );
}
