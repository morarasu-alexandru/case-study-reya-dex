"use client";

import { useEffect, useState } from "react";

const formatTime = (date: Date) => {
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const UtcClock = () => {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[1.125rem] text-xs border-r border-reya-mine-shaft-2 pr-6">
      <span className="text-reya-athens-gray">{time} </span>
      <span className="text-reya-tundora">UTC</span>
    </div>
  );
};
