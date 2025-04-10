import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umbrella.Team",
  description: "A comprehensive team management dashboard for teams and projects.",
  verification: {
    google: "Eo9LKVfTyCUvSRIKO17m-sgVxiXs4e9U3c55HKyq1Oc",
  },
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
