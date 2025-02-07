"use client"
import React, { useState } from "react";
import Image from "next/image";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dropdown Trigger */}
      <div className="flex items-center gap-2 hover:bg-white cursor-pointer hover:rounded-lg px-1.5 py-1">
        <div  className="text-gray-800 font-semibold">
          Services
        </div>
        <Image
          className={`transition-transform duration-300 ${
            isOpen ? "invert rotate-180" : ""
          }`}
          src={isOpen ? "/chevron-up-solid.svg" : "/chevron-down-solid.svg"}
          width={12}
          height={12}
          alt="Dropdown"
        />
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0  duration-200 pt-2 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`w-56 bg-gray-100 shadow-lg rounded-lg p-2 z-10 transition-opacity duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <p className="text-gray-500 font-bold px-3 py-2">SERVICES</p>
          <ul className="space-y-2">
            <li className="px-3 py-1 hover:bg-white rounded-lg cursor-pointer">
            AI Resume Screening
            </li>
            <li className="px-3 py-1 hover:bg-white rounded-lg cursor-pointer">
            Smart Candidate Matching
            </li>
            <li className="px-3 py-1 hover:bg-white rounded-lg cursor-pointer">
            Automated Interview Scheduling
            </li>
            <li className="px-3 py-1 hover:bg-white rounded-lg cursor-pointer">
            Employer-Candidate Chat
            </li>
            <li className="px-3 py-1 hover:bg-white rounded-lg cursor-pointer">
            HR Analytics Dashboard
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
