"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";
import { AppSidebar } from "@/src/components/hr-sidebar";
import { Header } from "@/src/components/header";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(256); // Default sidebar width
  const params = useParams();
  const hr = Array.isArray(params.hr) ? params.hr[0] : params.hr;

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-[#121212] text-gray-900 dark:text-gray-100`}
      >
        {/* Dark Mode Background */}
        <div className="fixed inset-0 -z-10 transition-all duration-150 dark:bg-black">
          <div className="absolute top-0 h-screen w-screen dark:bg-[radial-gradient(#ffffff20_1px,#000000_1px)] dark:bg-[size:20px_20px]" />
        </div>

        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <AppSidebar
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            sidebarWidth={sidebarWidth}
            setSidebarWidth={setSidebarWidth}
            userName={hr}
          />

          {/* Main content container */}
          <div
            className="flex flex-col flex-1 transition-all ease-in-out"
            style={{
              marginLeft: isSidebarOpen ? sidebarWidth : 72,
            }}
          >
            {/* Navbar (adjusts width dynamically) */}
            <Header isSidebarOpen={isSidebarOpen} sidebarWidth={sidebarWidth} userName={hr} />

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}