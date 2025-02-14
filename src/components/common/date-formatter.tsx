"use client";
import React from "react";

interface DateFormatterProps {
  dateString: string;
  timeZone?: string;
  format?: Intl.DateTimeFormatOptions;
}

const DateFormatter: React.FC<DateFormatterProps> = ({
  dateString,
  timeZone = "Asia/Kolkata", // Default timezone (change as needed)
  format = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  },
}) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    ...format,
    timeZone,
  }).format(new Date(dateString));

  return (
    <span className="uppercase text-[12px]">
      {formattedDate.replace(",", "")}
    </span>
  );
};

export default DateFormatter;
