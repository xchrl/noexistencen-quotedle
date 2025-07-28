import getUUID from "./getUUID";

type DailyModeStatsType = {
  total_guesses: number;
  correct_guesses: number;
  streak: number;
  personal_best: number;
};

export default function loadLocalStorage() {
  let dailyModeStats = localStorage.getItem("daily_mode_stats");
  if (dailyModeStats == "null" || dailyModeStats == null) {
    const defaultDailyModeStats: DailyModeStatsType = {
      total_guesses: 0,
      correct_guesses: 0,
      streak: 0,
      personal_best: 0,
    };

    localStorage.setItem(
      "daily_mode_stats",
      JSON.stringify(defaultDailyModeStats)
    );

    dailyModeStats = JSON.stringify(defaultDailyModeStats);
  }

  let today = localStorage.getItem("today");

  const todayDefaultObject = {
    guesses: 0,
    correct_guesses: 0,
    quoteData: [],
    date: new Date().toISOString().split("T")[0],
  };

  if (!today) {
    localStorage.setItem("today", JSON.stringify(todayDefaultObject));
    today = JSON.stringify(todayDefaultObject); // update the variable with the same string
  } else {
    try {
      const parsedToday = JSON.parse(today);
      if (parsedToday.date !== new Date().toISOString().split("T")[0]) {
        localStorage.setItem("today", JSON.stringify(todayDefaultObject));
        today = JSON.stringify(todayDefaultObject);
      }
    } catch {
      // If `today` is invalid JSON, reset it
      localStorage.setItem("today", JSON.stringify(todayDefaultObject));
      today = JSON.stringify(todayDefaultObject);
    }
  }

  const uuid = localStorage.getItem("uuid") || getUUID();
  const uuidLocalStorage = localStorage.getItem("uuid");
  if (!uuidLocalStorage) {
    localStorage.setItem("uuid", uuid);
  }

  if (!document.cookie.split("; ").some((c) => c.startsWith("uuid="))) {
    document.cookie = `uuid=${uuidLocalStorage}; path=/; max-age=31536000; SameSite=Lax`;
  }

  let endlessModeStats = localStorage.getItem("endless_mode_stats");
  if (endlessModeStats == "null" || endlessModeStats == null) {
    const defaultEndlessModeStats: DailyModeStatsType = {
      total_guesses: 0,
      correct_guesses: 0,
      streak: 0,
      personal_best: 0,
    };

    localStorage.setItem(
      "endless_mode_stats",
      JSON.stringify(defaultEndlessModeStats)
    );

    endlessModeStats = JSON.stringify(defaultEndlessModeStats);
  }

  let endless = localStorage.getItem("endless");

  const endlessDefaultObject = {
    correct_guesses: 0,
    quote_data: [],
    used_quotes: [],
    finished: false,
  };

  if (!endless) {
    localStorage.setItem("endless", JSON.stringify(endlessDefaultObject));
    endless = JSON.stringify(endlessDefaultObject);
  }

  return {
    dailyModeStats,
    today: JSON.parse(today),
    endlessModeStats,
    endless: JSON.parse(endless),
  };
}
