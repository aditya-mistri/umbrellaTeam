"use client";
import React,{ useEffect } from "react";
import Navbar from "../components/Navbar/index"; // Adjust the path to match your project structure.
import Sidebar from "../components/Sidebar/index"; // Adjust the path to match your project structure.
import StoreProvider from "./redux";
import { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollabsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector(
    (state) => state.global.isDarkMode,  
  );
  
  useEffect (() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
  

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-gray-900">
      <Sidebar />
      <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg 
      ${isSidebarCollabsed ? "" : "md:pl-64"}`}
      >
        <Navbar />
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
