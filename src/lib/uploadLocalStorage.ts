"use client";

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
  const uuid = getCookieValue("uuid") || crypto.randomUUID();

  const formData = new FormData();
  formData.append("uuid", uuid);
  formData.append("data", blob, "localStorage.json");

  console.log(formData);

  await fetch("/api/uploadtoblob", {
    method: "POST",
    body: formData,
  });
}
