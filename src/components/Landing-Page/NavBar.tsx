"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "./ui/dropdown";
import { ShinyButton } from "../magicui/shiny-button";
import { ShimmerButton } from "../magicui/shimmer-button";
import { Moon, Sun } from "lucide-react";

function Navbar({ className }: { className?: string }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#121212"; // Dark mode background
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#eceeed"; // Light mode background
    }
  }, [darkMode]);

  return (
    <>
      <div className="fixed w-full top-5 z-[9999]">
        <div
          className={`OuterNavbar flex justify-between px-5 w-10/12 m-auto py-3 border rounded-full backdrop-blur-md transition-all duration-200 ${
            darkMode
              ? "bg-gray-900/50 text-white border-gray-700"
              : "bg-gray-300/50 text-gray-800 border-white"
          }`}
        >
          <div className="Left flex items-center gap-3">
            <div className="LeftIn flex items-center gap-2 cursor-pointer">
              <Image
                className="rounded-full border border-white"
                src={"/logo.jpg"}
                width={48}
                height={48}
                alt="Product Logo"
              />
              <Image
                src={"/skill-sage.png"}
                width={130}
                height={12}
                alt="Product Name"
                className="dark:invert"
              />
            </div>
            <Link
              href={"/"}
              className="font-semibold hover:bg-white/30 dark:hover:bg-gray-700/30 cursor-pointer hover:rounded-lg px-2 py-1"
            >
              Home
            </Link>
            <Dropdown />
            <Link
              href={"/contact"}
              className="font-semibold hover:bg-white/30 dark:hover:bg-gray-700/30 cursor-pointer hover:rounded-lg px-2 py-1"
            >
              Contact Us
            </Link>
            <Link
              href={"/about"}
              className="font-semibold hover:bg-white/30 dark:hover:bg-gray-700/30 cursor-pointer hover:rounded-lg px-2 py-1"
            >
              About Us
            </Link>
          </div>
          <div className="Right flex items-center gap-3">
            {/* Dark/Light Mode Toggle */}
            <div
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-16 h-9 flex items-center bg-gray-400 dark:bg-gray-800 rounded-full p-1 cursor-pointer shadow-md transition-all duration-200"
            >
              <div
                className={`absolute w-7 h-7 bg-white dark:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-200 ${
                  darkMode ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {darkMode ? (
                  <Moon size={18} className="text-gray-900" />
                ) : (
                  <Sun size={18} className="text-yellow-500" />
                )}
              </div>
            </div>
            <Link href="/login">
              <ShinyButton>Login</ShinyButton>
            </Link>
            <Link href="/signup">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm leading-none tracking-tight text-white dark:text-black dark:from-white dark:to-slate-900/10 lg:text-m font-bold">
                  Sign Up
                </span>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
