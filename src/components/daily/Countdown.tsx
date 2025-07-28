"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    function updateCountdown() {
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

      const secondsLeft = Math.floor(
        (nextMidnightUTC.getTime() - utcNow.getTime()) / 1000
      );

      if (secondsLeft <= 0) {
        window.location.reload();
      } else {
        const hours = Math.floor(secondsLeft / 3600);
        const minutes = Math.floor((secondsLeft % 3600) / 60);
        const seconds = secondsLeft % 60;
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
