import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "NOexistenceN-quotedle",
  description:
    "A `finish the quote` quiz game based on `The NOexistenceN of you AND me`.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const background = cookieStore.get("background");
  const src = background ? decodeURIComponent(background.value) : null;

  return (
    <html lang="pl">
      <body
        className={`${plusJakartaSans.className} ${geistSans.className} ${geistMono.className} antialiased`}
      >
        <div
          id="background"
          className="fixed top-0 left-0 w-screen h-[100lvh] -z-10 bg-cover bg-center"
          style={src ? { backgroundImage: `url(${src})` } : {}}
        ></div>
        <header className="px-4 mt-6 md:px-0">
          <Navbar />
        </header>
        <main className="flex flex-col md:flex-row gap-2 md:gap-8 container mx-auto px-4 md:px-0 my-4">
          {children}
        </main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
