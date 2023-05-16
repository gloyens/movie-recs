import { Anybody } from "@next/font/google";

export const anybody = Anybody({
  variable: "--anybody",
  fallback: ["sans-serif"],
  subsets: ["latin", "latin-ext"],
});

export const fontClasses = [anybody.variable].join(" ");
