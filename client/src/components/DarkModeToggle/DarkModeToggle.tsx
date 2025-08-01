import { useDarkMode } from "../../hooks/useDarkMode";

interface DarkModeToggleProps {
  className?: string;
}

export function DarkModeToggle({ className = "" }: DarkModeToggleProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Simple sun/moon emoji for now - you can replace with proper icons later */}
      <span className="text-2xl">{isDarkMode ? "☀️" : "🌙"}</span>
    </button>
  );
}
