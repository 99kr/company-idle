import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const formatter = Intl.NumberFormat("en", {
	notation: "compact",
	compactDisplay: "short",
	maximumSignificantDigits: 3,
	minimumFractionDigits: 2,
});

export function formatNumber(num: number) {
	return formatter.format(num);
}
