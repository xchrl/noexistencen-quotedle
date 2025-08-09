"use client";

import { toast } from "sonner";
import getUUID from "./getUUID";

function getCookieValue(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(name + "="));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

export default async function uploadLocalStorage() {
  const localStorageData = JSON.stringify(localStorage);
  const blob = new Blob([localStorageData], { type: "application/json" });
  const uuid =
    getCookieValue("uuid") || localStorage.getItem("uuid") || getUUID();

  const formData = new FormData();
  formData.append("uuid", uuid);
  formData.append("data", blob, "localStorage.json");

  console.log(
    "localStorage changed and user allows sending data, sending localStorage data..."
  );

  try {
    await fetch("/api/uploadtoblob", {
      method: "POST",
      body: formData,
    }).then(() => toast.success("Data uploaded succesfully!"));
  } catch (error) {
    console.error(error);
    toast.error("There was an error when uploading your data.", {
      description: "Check the browser console for more details",
    });
  }
}
