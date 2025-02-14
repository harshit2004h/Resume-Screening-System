"use client";
import { useState } from "react";
import Navbar from "@/src/app/(Landing-Page)/NavBar";
import Footer from "@/src/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    country: "India",
    department: "Support",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-28 px-4 mb-12">
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg rounded-lg p-6 max-w-5xl w-full">
          <h2 className="text-2xl font-bold text-center mb-4">
            How would you like to contact Skill Sage?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Contact Form */}
            <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-800 shadow-sm rounded-lg w-full max-w-md">
              <h3 className="text-lg font-semibold">Request a call.</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Give us some info so the right person can get back to you.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
              <input
                type="text"
                name="jobTitle"
                placeholder="Job title"
                value={formData.jobTitle}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm mt-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm mt-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm mt-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm mt-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              >
                <option>United States</option>
                <option>India</option>
                <option>United Kingdom</option>
              </select>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="border p-2 rounded w-full text-sm mt-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              >
                <option>Sales</option>
                <option>Support</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                By registering, you agree to the processing of your personal
                data as described in the Privacy Statement.
              </p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold w-full py-2 rounded mt-3">
                CONTACT ME
              </button>
            </div>

            {/* Right: Contact Options */}
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 shadow-sm rounded-lg p-4">
                <h3 className="font-semibold">Give us a call.</h3>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  +91-69696-96969
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Not in the India?{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                  >
                    Find your local office
                  </a>
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 shadow-sm rounded-lg p-4">
                <h3 className="font-semibold">Chat with us.</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get product info, login help, and live chat with an agent.
                </p>
                <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold w-full py-2 rounded mt-2">
                  LET'S CHAT
                </button>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 shadow-sm rounded-lg p-4">
                <h3 className="font-semibold">Leave us some feedback.</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Good or bad, we love to hear it all.
                </p>
                <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold w-full py-2 rounded mt-2">
                  SEND FEEDBACK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
