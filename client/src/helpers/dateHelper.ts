import { RelativeDateResult } from "../utils";

export function getTodaysDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function getCurrentTime(): string {
  return new Date().toISOString().split("T")[1].substring(0, 5);
}

export function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export function getUserFriendlyDate(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-IN", options);
}

export function getUserFriendlyDateTime(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = getUserFriendlyDate(dateString);
  const formattedTime = date.toLocaleTimeString("en-IN", timeOptions);

  return `${formattedDate} ${formattedTime}`;
}

export function formatDateToISOString(date?: Date | string): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
}

export function getRelativeDateString(date?: Date | string, use24HourFormat: boolean = true): RelativeDateResult {
  const emptyResult: RelativeDateResult = {
    dateString: "",
    timeString: "",
    dateTimeString: "",
    timeComparison: 0,
  };

  if (!date) return emptyResult;

  const inputDate = new Date(date);
  if (isNaN(inputDate.getTime())) return emptyResult;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

  // Calculate difference in days
  const diffInMs = targetDate.getTime() - today.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  // Determine time comparison
  let timeComparison: RelativeDateResult["timeComparison"];
  if (diffInDays < 0) {
    timeComparison = -1; // Past
  } else if (diffInDays === 0) {
    timeComparison = 0; // Current date
  } else {
    timeComparison = 1; // Future
  }

  // Extract time if available (check if input has time component)
  const hasTime = typeof date === "string" ? date.includes("T") || date.includes(":") : true;
  const timeString = hasTime
    ? inputDate.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !use24HourFormat,
      })
    : "";

  let dateString = "";

  // Handle relative dates
  if (diffInDays === -1) {
    dateString = "Yesterday";
  } else if (diffInDays === 0) {
    dateString = "Today";
  } else if (diffInDays === 1) {
    dateString = "Tomorrow";
  } else if (diffInDays > 1 && diffInDays <= 7) {
    // This [weekday] for dates within the next week
    const weekday = inputDate.toLocaleDateString("en-IN", { weekday: "long" });
    dateString = `This ${weekday}`;
  } else if (diffInDays > 7 && diffInDays <= 14) {
    // Next [weekday] for dates in the following week
    const weekday = inputDate.toLocaleDateString("en-IN", { weekday: "long" });
    dateString = `Next ${weekday}`;
  } else {
    // For dates beyond 2 weeks or in the past (more than yesterday)
    const currentYear = now.getFullYear();
    const targetYear = inputDate.getFullYear();

    if (currentYear === targetYear) {
      // Same year: dd MMM format
      dateString = inputDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
    } else {
      // Different year: dd MMM yyyy format
      dateString = inputDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  }

  // Combine date and time
  const dateTimeString = timeString ? `${dateString} ${timeString}` : dateString;

  return {
    dateString,
    timeString,
    dateTimeString,
    timeComparison,
  };
}
