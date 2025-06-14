import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from 'react';
 import Loading from '@/app/loading.jsx';
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
  description: "Jarvis is a ai aegant Developed by Pratham vig"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={`${geistSans.variable} ${geistMono.variable} w-full h-full antialiased`}>
       {children}
        <Analytics/>
        <SpeedInsights />
      </body>
    </html>
  );
}