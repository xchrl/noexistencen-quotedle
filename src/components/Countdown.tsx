"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    function getTimeUntilUTCReset(): number {
      const now = new Date();

      const utcNow = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        )
      );

      const nextMidnightUTC = new Date(
        Date.UTC(
          utcNow.getUTCFullYear(),
          utcNow.getUTCMonth(),
          utcNow.getUTCDate() + 1,
          0,
          0,
          0
        )
      );

      return Math.floor((nextMidnightUTC.getTime() - utcNow.getTime()) / 1000);
    }

    const interval = setInterval(() => {
      const secondsLeft = getTimeUntilUTCReset();

      if (secondsLeft <= 0) {
        window.location.reload(); // Refresh the page when 00:00 UTC hits
      } else {
        const hours = Math.floor(secondsLeft / 3600);
        const minutes = Math.floor((secondsLeft % 3600) / 60);
        const seconds = secondsLeft % 60;
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
