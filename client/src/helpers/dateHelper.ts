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
