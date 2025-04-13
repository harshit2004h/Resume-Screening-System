"use client";

import { useState, useEffect, useTransition } from "react";
import { Inter } from "next/font/google";
import { AppSidebar } from "@/src/components/app-sidebar";
import { Header } from "@/src/components/header";
import type React from "react";
import { fetchUser } from "./getUser";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(256); // Default sidebar width
  const [user, setUser] = useState({
    given_name: "User",
    family_name: "",
    email: "",
    picture: "",
  });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
    });
  }, []);

  return (
    <html lang="en">
      <body
        className={`${inter.className} py-12 bg-gray-100 dark:bg-[#121212] text-gray-900 dark:text-gray-100`}
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
            givenName={user.given_name}
            familyName={user.family_name}
            picture={user.picture} 
            email={user.email}
          />

          {/* Main content container */}
          <div
            className="flex flex-col flex-1 transition-all ease-in-out overflow-y-auto"
            style={{
              marginLeft: isSidebarOpen ? sidebarWidth : 72,
            }}
          >
            {/* Navbar (adjusts width dynamically) */}
            <Header
              isSidebarOpen={isSidebarOpen}
              sidebarWidth={sidebarWidth}
              givenName={user.given_name}
              familyName={user.family_name}
              picture={user.picture} 
            />

            {/* Main content area */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
