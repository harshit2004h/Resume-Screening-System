"use client";
import { useState, useRef, useEffect } from "react";
import {
  Youtube,
  Instagram,
  Mail,
  Twitter,
  Music,
  ChevronDown,
} from "lucide-react";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("English (English)");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    "English (English)",
    "हिन्दी (Hindi)",
    "Español (Spanish)",
    "Français (French)",
    "Deutsch (German)",
    "中文 (Chinese - Mandarin)",
    "日本語 (Japanese)",
    "한국어 (Korean)",
    "Italiano (Italian)",
    "Português (Portuguese)",
    "Русский (Russian)",
    "العربية (Arabic)",
    "বাংলা (Bengali)",
    "Türkçe (Turkish)",
    "Nederlands (Dutch)",
    "Ελληνικά (Greek)",
    "ไทย (Thai)",
    "Svenska (Swedish)",
    "Polski (Polish)",
    "עברית (Hebrew)",
    "Tiếng Việt (Vietnamese)",
    "தமிழ் (Tamil)",
    "اردو (Urdu)",
    "Bahasa Indonesia (Indonesian)",
    "Bahasa Melayu (Malay)",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section */}
        <div>
          {/* Language Dropdown */}
          <div ref={dropdownRef} className="relative w-60">
            <button
              className="bg-gray-800 px-4 py-2 rounded-md w-full text-left flex justify-between items-center hover:bg-gray-700 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {language}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <ul className="absolute left-0 mt-2 w-full bg-gray-800 rounded-md shadow-lg max-h-56 overflow-y-auto transition-opacity custom-scrollbar">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition"
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[Twitter, Youtube, Instagram, Music, Mail].map((Icon, index) => (
              <Icon
                key={index}
                className="w-6 h-6 cursor-pointer hover:text-gray-400 transition"
              />
            ))}
          </div>

          {/* Logo & Description */}
          <div className="mt-8">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              V
            </span>
            <p className="text-sm mt-3">
              The easy way to create stunning videos, add subtitles, and grow
              your audience.
            </p>
          </div>
          <p className="text-xs mt-4 text-gray-400">© Copyright 2025 SKILL SAGE</p>
        </div>

        {/* Video Editor */}
        <div>
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
            Video Editor
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li className="hover:text-gray-400 cursor-pointer">
              Add Music to Video
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Add Subtitles to Video
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Add Text to Video
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Audio to Text
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Auto Subtitle Generator
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Video Compressor
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Video Converter
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Video Translator
            </li>
          </ul>
        </div>

        {/* AI Tools */}
        <div>
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
            AI Tools
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li className="hover:text-gray-400 cursor-pointer">AI Avatars</li>
            <li className="hover:text-gray-400 cursor-pointer">
              AI Image Generator
            </li>
            <li className="hover:text-gray-400 cursor-pointer">AI Video</li>
            <li className="hover:text-gray-400 cursor-pointer">
              AI Voice Generator
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Remove Background Noise
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Text to Speech Video
            </li>
            <li className="hover:text-gray-400 cursor-pointer">Voice Dubber</li>
          </ul>
        </div>

        {/* Product & Company */}
        <div>
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
            Product
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li className="hover:text-gray-400 cursor-pointer">Pricing</li>
            <li className="hover:text-gray-400 cursor-pointer">Enterprise</li>
            <li className="font-semibold mt-3">Resources</li>
            <li className="hover:text-gray-400 cursor-pointer">VEED Blog</li>
            <li className="hover:text-gray-400 cursor-pointer">Articles</li>
            <li className="hover:text-gray-400 cursor-pointer">Webinars</li>
            <li className="hover:text-gray-400 cursor-pointer">Video Guides</li>
          </ul>

          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2 mt-6">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li className="hover:text-gray-400 cursor-pointer">Jobs</li>
            <li className="hover:text-gray-400 cursor-pointer">Privacy</li>
            <li className="hover:text-gray-400 cursor-pointer">Terms</li>
            <li className="hover:text-gray-400 cursor-pointer">Cookies</li>
            <li className="hover:text-gray-400 cursor-pointer">
              Contact Support
            </li>
          </ul>
        </div>
      </div>

      {/* Cookie Settings */}
      <div className="text-xs text-gray-400 mt-8 text-right">
        * Cookie Settings
      </div>

      {/* Custom Scrollbar Styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #9333ea);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7e22ce);
        }
      `}</style>
    </footer>
  );
}
