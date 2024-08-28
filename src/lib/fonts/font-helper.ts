import { Lato } from "next/font/google";
import localFont from "next/font/local";

export const latoFont = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const larsseitFont = localFont({
  src: "./assets/Larsseit.woff",
  variable: "--font-larsseit-sans",
});
