"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "./ui/dropdown";
import { ShinyButton } from "../magicui/shiny-button";
import { ShimmerButton } from "../magicui/shimmer-button";

function Navbar({ className }: { className?: string }) {
  return (
    <>
      <div className="fixed w-full top-5">
        <div className="OuterNavbar flex justify-between bg-gray-300 bg-opacity-45 backdrop-blur-md rounded-full px-5 w-10/12 m-auto py-3 border border-white ">
          <div className="Left flex items-center gap-2">
            <div className="LeftIn flex items-center gap-1 cursor-pointer">
              <Image
                className="rounded-full border border-white "
                src={"/logo.jpg"}
                width={42}
                height={42}
                alt="Product Logo"
              ></Image>
              <Image
                className=""
                src={"/skill-sage.png"}
                width={120}
                height={10}
                alt="Product Name"
              ></Image>
            </div>
            <Link
              href={"/"}
              className="font-semibold text-gray-800 hover:bg-white cursor-pointer hover:rounded-lg px-1.5 py-1"
            >
              Home
            </Link>
            <Dropdown />
            <Link
              href={"/contact"}
              className="font-semibold text-gray-800 hover:bg-white cursor-pointer hover:rounded-lg px-1.5 py-1"
            >
              Contact Us
            </Link>
            <Link
              href={"/about"}
              className="font-semibold text-gray-800 hover:bg-white cursor-pointer hover:rounded-lg px-1.5 py-1"
            >
              About Us
            </Link>
          </div>
          <div className="Right flex items-center gap-2">
            <Link href="/login">
              <ShinyButton>Login</ShinyButton>
            </Link>
            <Link href="/signup">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-m font-bold">
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
