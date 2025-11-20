import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNavBar from "@/components/BottomNavBar";
import { ColorPaletteProvider } from "@/contexts/ColorPaletteContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DedLift - Fitness Tracking App",
  description: "Track your fitness progress with DedLift",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ColorPaletteProvider>
          <Navbar />
          <main className="pt-24 min-h-screen pb-20 md:pb-0">{children}</main>
          <BottomNavBar />
        </ColorPaletteProvider>
      </body>
    </html>
  );
}
