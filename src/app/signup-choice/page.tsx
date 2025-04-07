"use client";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import Cookies from "js-cookie";

// Exported helper to check role from cookies
export function isEmployee() {
  return Cookies.get("user_role") === "employee";
}

export default function SignupChoice() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRoleSelect = (role: "employee" | "employer") => {
    Cookies.set("user_role", role); // Session cookie (no expiry)
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-10 relative overflow-hidden">
      {/* Heading */}
      <div className="text-center max-w-4xl w-full z-10">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to SmartHire!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
          Select your role to get started with the best hiring experience.
        </p>

        {/* Role Selection */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Employee */}
          <RegisterLink>
            <div
              onClick={() => handleRoleSelect("employee")}
              className="cursor-pointer w-80 h-80 bg-white dark:bg-gray-800 shadow-2xl rounded-3xl flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <lord-icon
                src="https://cdn.lordicon.com/eszyyflr.json"
                trigger="hover"
                colors="primary:#22c55e,secondary:#14b8a6"
                style={{ width: "120px", height: "120px" }}
              />
              <h2 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                I am an Employee
              </h2>
            </div>
          </RegisterLink>

          {/* Employer */}
          <RegisterLink>
            <div
              onClick={() => handleRoleSelect("employer")}
              className="cursor-pointer w-80 h-80 bg-white dark:bg-gray-800 shadow-2xl rounded-3xl flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <lord-icon
                src="https://cdn.lordicon.com/nocovwne.json"
                trigger="hover"
                colors="primary:#14b8a6,secondary:#22c55e"
                style={{ width: "120px", height: "120px" }}
              />
              <h2 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                I am an Employer
              </h2>
            </div>
          </RegisterLink>
        </div>
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="absolute bottom-6 left-6 flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
