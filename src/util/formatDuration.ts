export function formatDuration(duration: number, decimals = 0) {
  const seconds = duration / 1000;

  if (seconds < 60) {
    return `${seconds.toFixed(decimals)}s`;
  }

  const minutes = seconds / 60;

  if (minutes < 60) {
    return `${minutes.toFixed(decimals)}m`;
  }

  const hours = minutes / 60;

  // Initially I wanted to show days
  // but feels like 52h is more meaningful than 2 days
  //
  // if (hours < 48) {
  return `${hours.toFixed(decimals)}h`;
  // }

  // const days = hours / 24;
  // return `${days.toFixed(decimals)} days`;
}
