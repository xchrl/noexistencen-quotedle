"use client";

import uploadLocalStorage from "@/lib/uploadLocalStorage";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const COOLDOWN_TIME = 4 * 60 * 60 * 1000; // 4 hours in ms

export default function SaveDataButton() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const lastClick = localStorage.getItem("last_save_time");
    if (lastClick) {
      const diff = Date.now() - parseInt(lastClick, 10);
      if (diff < COOLDOWN_TIME) {
        setDisabled(true);
        setRemaining(COOLDOWN_TIME - diff);
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (disabled && remaining > 0) {
      timer = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1000) {
            clearInterval(timer);
            setDisabled(false);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [disabled, remaining]);

  const handleClick = () => {
    uploadLocalStorage();
    localStorage.setItem("lastClickTime", Date.now().toString());
    setDisabled(true);
    setRemaining(COOLDOWN_TIME);
  };

  return (
    <Button onClick={handleClick} disabled={disabled}>
      Save your data to an external server
    </Button>
  );
}
