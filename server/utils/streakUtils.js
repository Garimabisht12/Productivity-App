export function calculateStreaks(entries = []) {
  if (!entries || entries.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dates = entries
    .map(d => new Date(d).setHours(0, 0, 0, 0))
    .sort((a, b) => a - b);

  let longestStreak = 1;
  let currentStreak = 1;
  let tempStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const diffDays = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      tempStreak++;
    } else if (diffDays > 1) {
      tempStreak = 1;
    }
    if (tempStreak > longestStreak) longestStreak = tempStreak;
  }

  const today = new Date().setHours(0, 0, 0, 0);
  const lastDate = dates[dates.length - 1];

  if (today === lastDate) {
    currentStreak = tempStreak;
  } else if (today - lastDate === 24 * 60 * 60 * 1000) {
    currentStreak = tempStreak;
  } else {
    currentStreak = 0;
  }

  return { currentStreak, longestStreak };
}
