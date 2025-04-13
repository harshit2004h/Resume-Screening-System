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
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface HeaderProps {
  isSidebarOpen: boolean;
  sidebarWidth: number;
  givenName: string;
  familyName: string;
  picture: string;
}

export function Header({
  isSidebarOpen,
  sidebarWidth,
  givenName,
  familyName,
  picture,
}: HeaderProps) {
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
      className="fixed top-0 left-0 z-50 flex items-center justify-between h-16 px-6 shadow-md transition-all duration-300 border-b 
        bg-[#e6f7ec] dark:bg-[#0d1f1a] 
        border-green-200 dark:border-green-900"
      style={{
        width: `calc(100% - ${isSidebarOpen ? sidebarWidth : 72}px)`,
        marginLeft: isSidebarOpen ? sidebarWidth : 72,
      }}
    >
      {/* Left Section: Welcome Message */}
      <div className="flex flex-col">
        <span className="text-sm text-green-700 dark:text-green-300">Welcome,</span>
        <span className="text-lg font-semibold text-green-900 dark:text-green-100">
          {givenName} {familyName}
        </span>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 dark:text-green-300 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full border border-green-200 dark:border-green-700 
              rounded-full focus:ring-2 focus:ring-green-400 
              bg-white dark:bg-[#1a2c24] 
              text-green-800 dark:text-green-100 transition"
          />
        </div>
      </div>

      {/* Right Section: Dark Mode Toggle & User Menu */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="relative w-14 h-8 flex items-center bg-green-100 dark:bg-green-800 rounded-full p-1 cursor-pointer transition-all duration-300"
        >
          <div
            className={`absolute w-6 h-6 bg-white dark:bg-green-400 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
              darkMode ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {darkMode ? (
              <Moon size={14} className="text-green-900" />
            ) : (
              <Sun size={14} className="text-yellow-500" />
            )}
          </div>
        </div>

        {/* Notifications Button */}
        <Link href="/notifications">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-green-200 dark:hover:bg-green-700 rounded-full transition-all"
          >
            <Bell className="h-6 w-6 text-green-800 dark:text-green-200" />
          </Button>
        </Link>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-green-200 dark:hover:bg-green-700 rounded-full transition-all"
            >
              <Image
                src={picture || "/assets/avatar.png"}
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full object-cover border-2 border-green-300 dark:border-green-700"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white dark:bg-[#1a2c24] shadow-lg rounded-lg w-40 border border-green-200 dark:border-green-800"
          >
            <DropdownMenuItem className="text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-700">
              <Link href={"/u/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-700">
              <Link href="/u/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500 dark:hover:text-black">
              <LogoutLink>Sign out</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
