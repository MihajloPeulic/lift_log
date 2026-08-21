import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  title: "LiftLog",
  description: "Track calories, macros and workouts.",
};

// 1. DODOAT VIEWPORT EXPORT: Sprečava zoom-out i drži 1:1 razmeru na mobilnim telefonima
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-x-hidden antialiased`}
    >
      {/* 2. DODATE OVERFLOW I WIDTH KLASE NA BODY */}
      <body className="flex min-h-full w-full flex-col overflow-x-hidden bg-background text-text">
        {children}
      </body>
    </html>
  );
}