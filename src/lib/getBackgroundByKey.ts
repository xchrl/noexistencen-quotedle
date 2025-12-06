import backgrounds from "./backgroundImages";

export function getBackgroundByKey(key: string) {
  const [collection, indexStr] = key.split(":");
  const index = parseInt(indexStr, 10);

  const bg = backgrounds.find((b) => b.value === collection);
  if (!bg) return null;

  const img = bg.images[index];
  if (!img) return null;

  return img.normal.src;
}

export function createKey(collection: string, index: number) {
  return `${collection}:${index}`;
}
