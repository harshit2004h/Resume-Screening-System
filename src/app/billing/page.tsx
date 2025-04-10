"use client";

import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { useEffect } from "react";
import Navbar from "../(Landing-Page)/NavBar";

export default function BillingPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const plans = [
    {
      title: "Starter",
      price: "Free",
      features: ["Basic Resume Parsing", "Single User", "Limited Support"],
      icon: "https://cdn.lordicon.com/upkivhua.json",
    },
    {
      title: "Pro",
      price: "$19/month",
      features: ["Resume Ranking", "Skill Visualization", "Email Alerts"],
      icon: "https://cdn.lordicon.com/kezeezyg.json", // working icon
      
    },
    {
      title: "Enterprise",
      price: "$29/month",
      features: ["Unlimited Access", "Advanced Analytics", "Priority Support"],
      icon: "https://cdn.lordicon.com/kndkiwmf.json"
    },
  ];

  return (
    <>
      <Navbar />
      <main className="h-screen overflow-hidden bg-gradient-to-br from-emerald-100 via-white to-green-200 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-800 dark:text-white">
        <section className="h-full flex flex-col items-center justify-center px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-emerald-700 dark:text-emerald-300 mb-2 mt-20"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Billing Plans
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-300 mb-6 text-md md:text-lg text-center max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Pick a plan that fits your hiring and resume analysis needs. Switch
            anytime.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.title}
                className="group backdrop-blur-lg bg-white/50 dark:bg-white/10 rounded-3xl border border-emerald-300 dark:border-gray-700 shadow-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl p-6 md:p-8 flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <lord-icon
                  src={plan.icon}
                  trigger="hover"
                  colors="primary:#10b981,secondary:#047857"
                  style={{ width: "70px", height: "70px" }}
                ></lord-icon>

                <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mt-4">
                  {plan.title}
                </h3>
                <p className="text-3xl font-extrabold my-3 text-gray-900 dark:text-white">
                  {plan.price}
                </p>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2 mb-4">
                  {plan.features.map((feat, i) => (
                    <li key={i}>✅ {feat}</li>
                  ))}
                </ul>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-md rounded-xl px-6 py-2 transition-all">
                  Choose Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
