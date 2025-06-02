import { Geist, Geist_Mono } from "next/font/google";
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[url(/imgs/bg-desktop.jpg)] antialiased`}>
        
        {children}
      </body>
    </html>
  );
}