"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadDropzone } from "@/src/utils/uploadthing";
import { CheckCircle } from "lucide-react";
import Navbar from "../(Landing-Page)/NavBar";
import { useResumeStore } from "@/src/store/resumeStore";
import axios from "axios";
import { fetchUser } from "@/src/lib/getUser";

const UploadResume = () => {
  const [showText, setShowText] = useState(true);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const setPdfUrl = useResumeStore((state) => state.setPdfUrl);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(false);
      setTimeout(() => setShowText(true), 1000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-28 min-h-screen bg-gradient-to-r from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex flex-col md:flex-row items-center justify-center gap-10 px-4 pb-12">
        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-xl shadow-2xl border border-green-200 dark:border-green-800 p-8"
        >
          {!uploadComplete ? (
            <>
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6 text-center">
                Upload Your Resume
              </h2>
              <div className="rounded-xl p-2 border border-green-300 hover:border-green-500 dark:border-green-700 dark:hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md">
                <UploadDropzone
                  endpoint="imageUploader"
                  className="h-[300px] ut-label:text-green-800 ut-button:bg-green-600 ut-button:hover:bg-green-700 ut-upload-icon:text-green-600 ut-border-green-400 ut-bg-white/80 dark:ut-bg-gray-900"
                  onClientUploadComplete={async (res) => {
                    const url = res[0].ufsUrl;
                    const name = res[0].name;
                    const fetchedUser = await fetchUser();
                    const email = fetchedUser.email;
                    setFileUrl(url);
                    setUploadComplete(true);
                    setPdfUrl(url);

                    try {
                      //Send URL to Python backend
                      await axios.post("http://localhost:8000/upload-url", {
                        url: url,
                        name: name,
                        email: email,
                      });
                    } catch (error) {
                      console.error("Error sending PDF URL to backend:", error);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload error:", error.message);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
                className="text-green-600 text-center"
              >
                <CheckCircle className="w-20 h-20 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-center text-green-700 dark:text-green-400 mb-4">
                Resume Uploaded Successfully!
              </h3>
              <div className="rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-md border border-green-300 shadow-xl p-4 w-full h-[400px] overflow-hidden">
                <iframe
                  src={fileUrl!}
                  className="w-full h-full rounded-md"
                  title="Uploaded Resume"
                />
              </div>
              <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-4 italic">
                You can review your resume or re-upload another one.
              </p>
              <button
                onClick={() => {
                  setUploadComplete(false);
                  setFileUrl(null);
                  setPdfUrl(null); // ✅ Clear  global URL
                }}
                className="mt-6 w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md"
              >
                🔁 Reupload Resume
              </button>
            </>
          )}
        </motion.div>

        {/* Animated Text Section */}
        <div className="w-full max-w-lg text-center px-4">
          <AnimatePresence mode="wait">
            {showText && (
              <motion.div
                key="text"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-4xl font-extrabold text-green-900 dark:text-green-200 mb-4 leading-snug">
                  Intelligent Resume Screening
                </h1>
                <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                  Upload resumes and let our AI do the heavy lifting — extract
                  skills, summarize experience, and gain deep insights in
                  seconds.
                </p>
                <p className="mt-4 text-sm text-green-700 dark:text-green-400 italic">
                  Designed for recruiters, optimized for speed.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default UploadResume;
