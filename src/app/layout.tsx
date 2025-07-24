import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOexistenceN Hub",
  description:
    "A `finish the quote` quiz game based on `The NOexistenceN of you AND me`.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${plusJakartaSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="background"></div>
        <Navbar />
        <main className="flex flex-col lg:flex-row gap-8 container mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
