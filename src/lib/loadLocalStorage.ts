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

  if (!today) {
    const todayObject = {
      guesses: 0,
      correct_guesses: 0,
      date: "2024-07-26",
    };
    localStorage.setItem("today", JSON.stringify(todayObject));
    today = JSON.stringify(todayObject); // update the variable with the same string
  } else {
    try {
      const parsedToday = JSON.parse(today);
      if (parsedToday.date !== "2025-07-26") {
        const resetToday = {
          guesses: 0,
          correct_guesses: 0,
          date: "2025-07-26",
        };
        localStorage.setItem("today", JSON.stringify(resetToday));
        today = JSON.stringify(resetToday);
      }
    } catch {
      // If `today` is invalid JSON, reset it
      const resetToday = {
        guesses: 0,
        correct_guesses: 0,
        date: "2025-07-26",
      };
      localStorage.setItem("today", JSON.stringify(resetToday));
      today = JSON.stringify(resetToday);
    }
  }

  return {
    dailyModeStats,
    today: JSON.parse(today),
  };
}
