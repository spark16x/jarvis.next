import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "J.A.R.V.I.S",
    description: "Jarvis is a ai aegant Developed by Pratham vig",openGraph: {
    title: 'J.A.R.V.I.S',
    description: 'Jarvis is a ai aegant Developed by Pratham vig',
    url: 'https://jarvisnext.vercel.app',
    siteName: 'J.A.R.V.I.S',
    }

}