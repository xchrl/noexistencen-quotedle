import quotes from "@/data/quotes.json";
import seedrandom from "seedrandom";
import globals from "./globals";

// Define the structure of a quote object
interface Quote {
  id: number;
  quote: string;
  answers: string[];
  correctAnswer: number;
  from: string;
}

// Type assertion for the imported JSON data
const typedQuotes: Quote[] = quotes as Quote[];

// Helper function to generate set for a specific date (without exclusions)
function generateSetForDate(targetDate: Date): number[] {
  const dateString = targetDate.toISOString().split("T")[0];
  const rng = seedrandom(dateString);
  const availableIds: number[] = typedQuotes.map((item: Quote) => item.id);

  const selectedIds: number[] = [];
  const tempIds: number[] = [...availableIds];
  const setSize: number = Math.min(globals.DAILY_QUOTES, tempIds.length);

  for (let i = 0; i < setSize; i++) {
    const randomIndex: number = Math.floor(rng() * tempIds.length);
    selectedIds.push(tempIds.splice(randomIndex, 1)[0]);
  }

  return selectedIds;
}

// Recursive function to generate set with proper exclusion logic
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateSetWithExclusions(
  targetDate: Date,
  excludedIds: Set<number> = new Set()
): number[] {
  const dateString = targetDate.toISOString().split("T")[0];

  // Get previous 7 days from the target date
  const previousDays: Date[] = [];
  for (let i = 1; i <= 7; i++) {
    const prevDate = new Date(targetDate);
    prevDate.setDate(targetDate.getDate() - i);
    previousDays.push(prevDate);
  }

  // For each previous day, recursively get its set (which will have its own exclusions)
  const newExcludedIds = new Set(excludedIds);
  previousDays.forEach((prevDate: Date) => {
    // Recursively generate the set for this previous date
    const prevDateIds = generateSetWithExclusions(prevDate, new Set());
    prevDateIds.forEach((id: number) => newExcludedIds.add(id));
  });

  // Now generate today's set excluding all the IDs from previous days
  const rng = seedrandom(dateString);
  const availableIds: number[] = typedQuotes
    .map((item: Quote) => item.id)
    .filter((id: number) => !newExcludedIds.has(id));

  if (availableIds.length < globals.DAILY_QUOTES) {
    console.warn(
      `Only ${availableIds.length} questions available for ${dateString} after excluding previous 7 days.`
    );
  }

  const selectedIds: number[] = [];
  const tempIds: number[] = [...availableIds];
  const setSize: number = Math.min(globals.DAILY_QUOTES, tempIds.length);

  for (let i = 0; i < setSize; i++) {
    const randomIndex: number = Math.floor(rng() * tempIds.length);
    selectedIds.push(tempIds.splice(randomIndex, 1)[0]);
  }

  return selectedIds;
}

function generateSet(): number[] {
  // Use the provided date or default to current date
  const date = new Date(new Date().toISOString().split("T")[0]);

  return generateSetMemoized(date);
}

// Memoized version to avoid infinite recursion
const memoCache: Map<string, number[]> = new Map();

function generateSetMemoized(targetDate: Date): number[] {
  const dateString = targetDate.toISOString().split("T")[0];

  // Check if we already computed this date
  if (memoCache.has(dateString)) {
    return memoCache.get(dateString)!;
  }

  // Base case: if we're going too far back, just generate without exclusions
  const baselineDate = new Date("2025-08-01"); // Adjust this to your data start date
  if (targetDate < baselineDate) {
    const result = generateSetForDate(targetDate);
    memoCache.set(dateString, result);
    return result;
  }

  // Get previous 7 days
  const excludedIds: Set<number> = new Set();
  for (let i = 1; i <= 14; i++) {
    const prevDate = new Date(targetDate);
    prevDate.setDate(targetDate.getDate() - i);

    // Recursively get the set for this previous date
    const prevDateIds = generateSetMemoized(prevDate);
    prevDateIds.forEach((id: number) => excludedIds.add(id));
  }

  // Generate set for target date
  const rng = seedrandom(dateString);
  const availableIds: number[] = typedQuotes
    .map((item: Quote) => item.id)
    .filter((id: number) => !excludedIds.has(id));

  if (availableIds.length < globals.DAILY_QUOTES) {
    console.warn(
      `Only ${availableIds.length} questions available for ${dateString} after excluding previous 7 days.`
    );
  }

  const selectedIds: number[] = [];
  const tempIds: number[] = [...availableIds];
  const setSize: number = Math.min(globals.DAILY_QUOTES, tempIds.length);

  for (let i = 0; i < setSize; i++) {
    const randomIndex: number = Math.floor(rng() * tempIds.length);
    selectedIds.push(tempIds.splice(randomIndex, 1)[0]);
  }

  // Cache the result
  memoCache.set(dateString, selectedIds);
  return selectedIds;
}

// Function to clear cache if needed
function clearCache(): void {
  memoCache.clear();
}

// Export the function for use in other modules
export { generateSet, clearCache };
