import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google"; // Fix: Remove Geist
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umbrella.Team", 
  description: "Description of the website", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
