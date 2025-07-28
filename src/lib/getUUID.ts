export default function getUUID() {
  function getCookieValue(name: string): string | null {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key, val] = cookie.split("=");
      if (key === name) return val;
    }
    return null;
  }

  // Check if UUID cookie exists
  const existing = getCookieValue("uuid");
  if (existing) {
    console.log("Found UUID: ", existing);
    return existing;
  }

  const newUuid = crypto.randomUUID();
  document.cookie = `uuid=${newUuid}; path=/; max-age=31536000; SameSite=Lax`;
  console.log("Generated new UUID: ", newUuid);
  return newUuid;
}
