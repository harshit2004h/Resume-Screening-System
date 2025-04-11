import { Button } from "@/src/components/ui/button";
import { Headphones, Mail, Phone, Send, FileQuestion, MessageSquare } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col p-4 lg:p-6 bg-white dark:bg-gray-950">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Header */}
      <header className="mb-10 text-center mt-8">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          Support & Contact Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          We're here to help with any questions you may have about your job search journey.
        </p>
      </header>

      {/* Contact Information */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg transition-shadow">
          <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center">
            <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Call Us</h2>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Helpline:</span> +1 (800) 123-4567
          </p>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Hours:</span> Mon-Fri, 9AM - 6PM
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-green-100 dark:border-green-900/20 hover:shadow-lg transition-shadow">
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-12 h-12 flex items-center justify-center">
            <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Email Us</h2>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Support:</span> support@skillsage.com
          </p>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Careers:</span> careers@skillsage.com
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg transition-shadow">
          <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Live Chat</h2>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Availability:</span> 24/7
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-300">Response Time:</span> ~2 minutes
          </p>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Start Chat Now
          </Button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-green-100 dark:border-green-900/20">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FileQuestion className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-200">FAQs</h2>
          </div>
          
          <div className="space-y-4">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">How do I improve my resume?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Complete all sections and add specific achievements to stand out.</p>
            </div>
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">When will I hear back after applying?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Most employers respond within 1-2 weeks after the application deadline.</p>
            </div>
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">How is my ranking calculated?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rankings are based on skills, experience, and profile completeness.</p>
            </div>
            <Button variant="link" className="text-green-600 dark:text-green-400 p-0 h-auto">
              View all FAQs
            </Button>
          </div>
        </div>
      
        {/* Contact Form */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Send className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-200">Send a Message</h2>
          </div>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="your.email@example.com"
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
                className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="What can we help you with?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Please describe your issue or question"
              />
            </div>
            
            <div className="text-right">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}