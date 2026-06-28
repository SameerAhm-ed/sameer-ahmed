"use client";

import { useEffect, useState } from "react";

/** Live local time (Pakistan / PKT). Updates every second. */
export default function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Karachi",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // suppressHydrationWarning: time is client-only
  return (
    <span suppressHydrationWarning className="tabular-nums">
      {time} PKT
    </span>
  );
}
