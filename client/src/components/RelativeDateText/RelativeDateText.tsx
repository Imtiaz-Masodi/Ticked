import React from "react";
import { getRelativeDateString } from "../../helpers/dateHelper";

interface RelativeDateTextProps {
  date?: Date | string;
  use24HourFormat?: boolean;
  showTime?: boolean;
  className?: string;
}

/**
 * A component that renders relative date text with conditional colors based on timeComparison value.
 * - Past dates (timeComparison: -1): red color
 * - Current date (timeComparison: 0): amber/orange color
 * - Future dates (timeComparison: 1): default gray color
 *
 * @param date - The date to format
 * @param use24HourFormat - Whether to use 24-hour format for time display (default: true)
 * @param showTime - Whether to show time along with date (default: true)
 * @param className - Additional CSS classes to apply
 */
export const RelativeDateText: React.FC<RelativeDateTextProps> = ({
  date,
  use24HourFormat = false,
  showTime = true,
  className = "",
}) => {
  const relativeDateResult = getRelativeDateString(date, use24HourFormat);
  const { dateString, dateTimeString, timeComparison } = relativeDateResult;

  if (!dateTimeString) {
    return null;
  }

  // Determine what text to display based on showTime prop
  const displayText = showTime ? dateTimeString : dateString;

  if (!displayText) {
    return null;
  }

  // Determine color classes based on timeComparison
  let colorClasses = "";
  if (timeComparison === -1) {
    // Past: red color
    colorClasses = "text-red-600 dark:text-red-400";
  } else if (timeComparison === 0) {
    // Current date: yellow/orange color
    colorClasses = "text-amber-600 dark:text-amber-400";
  } else {
    // Future: default color
    colorClasses = "text-gray-700 dark:text-gray-300";
  }

  const combinedClassName = `${colorClasses} ${className}`.trim();

  return <span className={combinedClassName}>{displayText}</span>;
};

export default RelativeDateText;
