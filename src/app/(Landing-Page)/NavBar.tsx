"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "./ui/dropdown";
import { ShinyButton } from "@/src/components/magicui/shiny-button";
import { ShimmerButton } from "@/src/components/magicui/shimmer-button";
import { Moon, Sun, Menu, X } from "lucide-react";

function Navbar({}: { className?: string }) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10 transition-all duration-150">
        <div className="absolute inset-0 bg-gray-100 dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px] transition-all duration-150"></div>
      </div>

      {/* Navbar */}
      <div className="fixed w-full top-5 z-[9999] px-5">
        <div
          className={`OuterNavbar flex justify-between items-center px-5 md:w-10/12 m-auto py-3 border rounded-full backdrop-blur-md transition-all duration-150 ${
            darkMode
              ? "bg-gray-900/50 text-white border-gray-700"
              : "bg-gray-300/50 text-gray-800 border-white"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                className="rounded-full border border-white"
                src={"/logo.jpg"}
                width={40}
                height={40}
                alt="Product Logo"
              />
              <Image
                src={"/skill-sage.png"}
                width={130}
                height={12}
                alt="Product Name"
                className="dark:invert hidden sm:block"
              />
            </div>

            {/* Menu for larger screens */}
            <div className="hidden md:flex items-center gap-3">
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
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Dark/Light Mode Toggle */}
            <div
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-12 h-7 flex items-center bg-gray-400 dark:bg-gray-800 rounded-full p-1 cursor-pointer shadow-md transition-all duration-150"
            >
              <div
                className={`absolute w-5 h-5 bg-white dark:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-150 ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              >
                {darkMode ? (
                  <Moon size={16} className="text-gray-900" />
                ) : (
                  <Sun size={16} className="text-yellow-500" />
                )}
              </div>
            </div>

            {/* Buttons - hidden in mobile */}
            <div className="hidden md:flex gap-3">
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

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex items-center p-2 rounded-md transition-all duration-150"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className={`md:hidden fixed top-16 right-5 w-56 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 flex flex-col gap-3 border transition-all duration-150 ${
              darkMode ? "border-gray-700 text-white" : "border-gray-300 text-gray-900"
            }`}
          >
            <Link
              href={"/"}
              className="font-semibold py-2 border-b dark:border-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Dropdown />
            <Link
              href={"/contact"}
              className="font-semibold py-2 border-b dark:border-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href={"/about"}
              className="font-semibold py-2 border-b dark:border-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <ShinyButton className="w-full text-center">Login</ShinyButton>
            </Link>
            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              <ShimmerButton className="w-full text-center shadow-2xl">
                Sign Up
              </ShimmerButton>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
