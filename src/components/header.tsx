import React, { useState, useEffect } from "react";
import { Bell, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  isSidebarOpen: boolean;
  sidebarWidth: number;
}

export function Header({ isSidebarOpen, sidebarWidth }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header
      className="fixed top-0 left-0 z-50 flex items-center justify-between h-16 border-b shadow transition-all bg-gray-50 dark:bg-black border-gray-200 dark:border-gray-700"
      style={{
        width: `calc(100% - ${isSidebarOpen ? sidebarWidth : 72}px)`,
        marginLeft: isSidebarOpen ? sidebarWidth : 72,
      }}
    >
      {/* Left Section: Welcome Message */}
      <div className="flex flex-col px-6">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Welcome,
        </span>
        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Angela White
        </span>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-300 transition"
          />
        </div>
      </div>

      {/* Right Section: Dark Mode Toggle & User Menu */}
      <div className="flex items-center space-x-3 px-6">
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="relative w-12 h-7 flex items-center bg-gray-300 dark:bg-gray-800 rounded-full p-1 cursor-pointer shadow-md transition-all duration-200"
        >
          <div
            className={`absolute w-5 h-5 bg-white dark:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-200 ${
              darkMode ? "translate-x-5" : "translate-x-0"
            }`}
          >
            {darkMode ? (
              <Moon size={12} className="text-gray-900" />
            ) : (
              <Sun size={12} className="text-yellow-500" />
            )}
          </div>
        </div>

        <Link href="/user/notifications">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </Button>
        </Link>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Image
                src="/avatar.png"
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white dark:bg-[#000000] shadow-lg rounded-lg w-36 border border-gray-200 dark:border-gray-700 dark:shadow-lg dark:ring-1 dark:ring-gray-700"
          >
            <DropdownMenuItem className="text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-150">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-150">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500 dark:hover:text-black transition-all duration-150">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
