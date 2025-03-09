"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";

export default function SupportPage() {
  return (
    <div className="min-h-[80vh] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-8 py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Support &amp; Contact Us</h1>
        <p className="text-lg">
          We are here to help. Reach out to us for any assistance.
        </p>
      </header>

      {/* Contact Information */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Helpline</h2>
          <p className="mb-2">
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
          <p className="mb-2">
            <strong>Office Hours:</strong> Mon-Fri, 9AM - 6PM
          </p>
          <p className="mb-2">
            <strong>Emergency:</strong> +1 (800) 765-4321
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Email Support</h2>
          <p className="mb-2">
            <strong>General Inquiries:</strong> support@companyhr.com
          </p>
          <p className="mb-2">
            <strong>Technical Issues:</strong> techsupport@companyhr.com
          </p>
          <p className="mb-2">
            <strong>Feedback:</strong> feedback@companyhr.com
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Send Us a Message</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              placeholder="youremail@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              placeholder="How can we help you today?"
            />
          </div>
          <div className="text-center">
            <Button className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700">
              Submit Message
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}