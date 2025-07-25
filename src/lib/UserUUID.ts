"use client";

import { useEffect } from "react";

export default function UserUUID() {
  useEffect(() => {
    const cookieName = "uuid";

    // Function to get cookie by name
    function cookieExists(name: string) {
      return document.cookie
        .split("; ")
        .some((cookie) => cookie.startsWith(name + "="));
    }

    // Check if UUID cookie exists
    const uuidCookie = cookieExists(cookieName);
    if (!uuidCookie) {
      // Generate new UUID
      const uuid = crypto.randomUUID();

      // Save cookie for 1 year
      document.cookie = `${cookieName}=${uuid}; path=/; max-age=${
        60 * 60 * 24 * 365
      }; SameSite=Lax`;

      console.log("New UUID created:", uuid);
    } else {
      console.log("Existing UUID found:", uuidCookie);
    }
  }, []);

  return null; // This component doesn’t render anything visible
}
