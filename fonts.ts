import { Anton, Barlow_Condensed, Bodoni_Moda, Cormorant_Garamond } from "next/font/google";

/**
 * Two families per universe, deliberately picked against each other.
 * Brooklyn gets a compressed poster grotesque over a narrow workhorse.
 * Fifth gets a true Didone over an old-style serif with a real italic.
 * No Inter, Geist, Arial or Roboto anywhere in the build.
 */

export const bkDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bk-display",
});

export const bkBody = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-bk-body",
});

export const ffDisplay = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-ff-display",
});

export const ffBody = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-ff-body",
});

export const fontVars = [
  bkDisplay.variable,
  bkBody.variable,
  ffDisplay.variable,
  ffBody.variable,
].join(" ");
