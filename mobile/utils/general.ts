export const debounce = <T,>(
	func: (...args: T[]) => void,
	delay: number,
): ((...args: T[]) => void) => {
	let timer: NodeJS.Timeout;

	return (...args: T[]) => {
		if (timer) {
			clearTimeout(timer); // Clear the previous timeout
		}

		timer = setTimeout(() => {
			func(...args); // Call the function after the delay
		}, delay);
	};
};

export const millisecondsToMinutesAndSeconds = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export const daysToMilliSeconds = (days: number): number => {
  return days * 24 * 60 * 60 * 1000;
}

export const timeStampToDaysFromNow = (timestamp: number): number => {
  return Math.floor((timestamp - Date.now()) / (1000 * 60 * 60 * 24));
};

export const timeStampToFriendlyDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};