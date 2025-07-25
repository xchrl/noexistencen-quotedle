"use client";

import getUUID from "./getUUID";

function getCookieValue(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(name + "="));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

export default async function uploadLocalStorage() {
  const settings = localStorage.getItem("settings");
  if (settings) {
    const allowSaving = JSON.parse(settings).storage;
    if (!allowSaving) return;
  }

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

  await fetch("/api/uploadtoblob", {
    method: "POST",
    body: formData,
  });
}
