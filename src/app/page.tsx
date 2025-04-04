"use client";

import { motion } from "framer-motion";
import Navbar from "@/src/app/(Landing-Page)/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-center text-green-700 dark:text-green-400 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          AI-Powered{" "}
          <span className="text-green-600 dark:text-green-300">
            Resume Screening
          </span>{" "}
          System
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-center text-gray-700 dark:text-gray-300 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Automate resume parsing, candidate ranking & interview scheduling
          using the power of AI.
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/upload-resume">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition">
              Upload Resume
            </button>
          </Link>
          <a
            href="https://github.com/harshit2004h/Resume-Screening-System"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              GitHub Repo
            </button>
          </a>
        </motion.div>
      </section>

      {/* Smart Hiring Features */}
      <section className="py-24 px-6 bg-green-100 dark:bg-gray-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-green-800 dark:text-green-300 mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Smart Hiring Features
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "📂 Resume Upload & Parsing",
                desc: "Extracts Skills, Experience, Projects using AI. Supports PDF, DOCX, TXT, JSON formats.",
              },
              {
                title: "🎯 AI Resume Ranking",
                desc: "Matches resumes to job descriptions using Cosine Similarity and LangChain-based RAG.",
              },
              {
                title: "📊 Skill Visualization Dashboard",
                desc: "Interactive dashboard with advanced filtering and Plotly.js-based analytics.",
              },
              {
                title: "💬 Real-Time Chat & Scheduling",
                desc: "Chat between candidate and recruiter with Google Calendar interview booking.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Resume CTA */}
      <section className="py-20 px-6 bg-green-50 dark:bg-gray-800 text-center">
        <motion.h2
          className="text-4xl font-bold text-green-800 dark:text-green-300 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Upload Your Resume?
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Let our AI analyze your resume, extract key skills, and rank it
          smartly.
        </motion.p>

        <Link href="/upload-resume">
          <motion.button
            className="bg-green-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-green-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Now
          </motion.button>
        </Link>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900 text-center">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-green-700 dark:text-green-300 mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Pricing Plans
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Starter",
                price: "Free",
                features: [
                  "Basic Resume Parsing",
                  "Single User",
                  "Limited Support",
                ],
              },
              {
                title: "Pro",
                price: "$29/month",
                features: [
                  "Resume Ranking",
                  "Skill Visualization",
                  "Email Alerts",
                ],
              },
              {
                title: "Enterprise",
                price: "$99/month",
                features: [
                  "Unlimited Access",
                  "Advanced Analytics",
                  "Priority Support",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className="bg-green-50 dark:bg-gray-800 rounded-xl p-8 shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                  {plan.title}
                </h3>
                <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  {plan.features.map((feat, i) => (
                    <li key={i}>✅ {feat}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <section className="py-32 bg-gray-50 dark:bg-gray-800">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl font-semibold text-green-700 dark:text-green-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Still Exploring?
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Discover how our platform can optimize your recruitment workflow and
            deliver top talent efficiently.
          </p>
          <Link href="/upload-resume">
            <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition">
              Try the Demo
            </button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section
        className="py-24 bg-green-600 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hire Smarter with AI.
        </motion.h2>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Save time, reduce bias, and focus on the right talent.
        </motion.p>
        <Link href="/upload-resume">
          <motion.button
            className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Now
          </motion.button>
        </Link>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
