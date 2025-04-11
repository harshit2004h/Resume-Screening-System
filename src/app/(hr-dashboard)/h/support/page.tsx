"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Headphones, Mail, Phone, Send } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-[80vh] flex flex-col p-4 lg:p-6 my-8">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          Support & Contact Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          We are here to help. Reach out to us for any assistance with your recruitment needs.
        </p>
      </header>

      {/* Contact Information */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg transition-shadow">
          <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center">
            <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Helpline</h2>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Phone:</span> +1 (800) 123-4567
          </p>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Office Hours:</span> Mon-Fri, 9AM - 6PM
          </p>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Emergency:</span> +1 (800) 765-4321
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-green-100 dark:border-green-900/20 hover:shadow-lg transition-shadow">
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-12 h-12 flex items-center justify-center">
            <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Email Support</h2>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">General:</span> support@skillsage.com
          </p>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Technical:</span> tech@skillsage.com
          </p>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Feedback:</span> feedback@skillsage.com
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg transition-shadow">
          <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center">
            <Headphones className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Live Chat</h2>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Hours:</span> 24/7 Support
          </p>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Average Wait:</span> &lt; 2 minutes
          </p>
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
            Start Chat
          </Button>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto mt-12 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-green-100 dark:border-green-900/20">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span className="w-1 h-5 bg-green-500 rounded-full mr-3 inline-block"></span>
          Send Us a Message
        </h2>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="youremail@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="How can we help you?"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Describe your issue or question in detail"
            />
          </div>
          
          <div className="text-right">
            <Button 
              className="py-2.5 px-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Message
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}