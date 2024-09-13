import { format, toZonedTime } from "date-fns-tz";

export const updateTime = (timezone: string) => {
  const currentDateTime = new Date(); // Current date and time in local timezone
  const zonedDateTime = toZonedTime(currentDateTime, timezone); // Convert to the specified timezone
  const formattedTime = format(zonedDateTime, "HH:mm:ss", {
    timeZone: timezone,
  }); // Format time in the specified timezone
  return formattedTime;
};
