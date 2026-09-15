export function calculateAccurateReadTime(text: string, wpm = 250, imageCount = 0) {
  // Count words by splitting on whitespace
  const words = text.trim().split(/\s+/).length;

  // Base reading time in minutes
  let timeInMinutes = words / wpm;

  // Add time for images (12s for first, 5s for others as a simplified average)
  if (imageCount > 0) {
    timeInMinutes += (imageCount * 5) / 60;
  }

  // Round up to nearest minute
  return Math.ceil(timeInMinutes);
}

export function calculateReadTimeFromWordCount(words: number, wpm = 250, imageCount = 0) {
  let timeInMinutes = words / wpm;

  if (imageCount > 0) {
    timeInMinutes += (imageCount * 5) / 60;
  }

  return Math.ceil(timeInMinutes);
}