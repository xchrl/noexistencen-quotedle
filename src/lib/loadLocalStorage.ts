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

  return {
    dailyModeStats,
    today: JSON.parse(today),
  };
}
