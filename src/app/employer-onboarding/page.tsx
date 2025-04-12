"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { X, Plus, Search, Check } from "lucide-react";
import { Uploader } from "@/src/components/uploader";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyUrl: z.string().url("Please enter a valid URL"),
  companyLogo: z.string().optional(),
  post: z.string().min(1, "Your job title/position is required"),
  description: z
    .string()
    .min(50, "Please provide a detailed description (at least 50 characters)"),
  rolesInterestedIn: z.array(z.string()).min(1, "Please add at least one role"),
});

// Common tech job roles for suggestions
const commonJobRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Product Manager",
  "Data Scientist",
  "DevOps Engineer",
  "QA Tester",
  "Project Manager",
  "Marketing Specialist",
  "Sales Representative",
  "Customer Support",
  "HR Manager",
];

export default function EmployerOnboardingPage() {
  const router = useRouter();
  const [newRole, setNewRole] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [profileComplete, setProfileComplete] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyUrl: "",
      companyLogo: "",
      post: "",
      description: "",
      rolesInterestedIn: [],
    },
  });

  const roles = form.watch("rolesInterestedIn");
  const formValues = form.watch();

  // Filter suggestions based on input
  useEffect(() => {
    if (newRole.trim()) {
      const filtered = commonJobRoles.filter(
        (role) =>
          role.toLowerCase().includes(newRole.toLowerCase()) &&
          !roles.includes(role),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [newRole, roles]);

  // Handle typing animation
  useEffect(() => {
    if (newRole) {
      setIsTyping(true);
      const timeout = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [newRole]);

  // Handle outside clicks to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Animation when a role is added
  useEffect(() => {
    if (recentlyAdded) {
      const timeout = setTimeout(() => setRecentlyAdded(null), 2000);
      return () => clearTimeout(timeout);
    }
  }, [recentlyAdded]);

  // Calculate completion percentage based on form validity
  useEffect(() => {
    const currentFormValues = form.getValues();
    let validFields = 0;

    // Count required fields only
    if (currentFormValues.companyName?.length > 0) validFields++;
    if (currentFormValues.post?.length > 0) validFields++;
    try {
      new URL(currentFormValues.companyUrl);
      validFields++;
    } catch {}
    if (currentFormValues.description?.length >= 50) validFields++;
    if (currentFormValues.rolesInterestedIn?.length > 0) validFields++;

    // Calculate percentage based on required fields (5 total fields)
    const percentage = Math.min(100, Math.round((validFields / 5) * 100));

    // Even with all required fields filled (without logo), max out at 80%
    // This keeps the visual indicator showing some room for improvement
    setCompletionPercentage(percentage);

    // Enable form submission when all required fields are completed (even without logo)
    setProfileComplete(validFields >= 4);
  }, [form, formValues]);

  const addRole = (role: string = newRole.trim()) => {
    if (!role) return;
    if (roles.includes(role)) {
      toast.error("This role is already added!");
      return;
    }
    form.setValue("rolesInterestedIn", [...roles, role]);
    setNewRole("");
    setShowSuggestions(false);
    setRecentlyAdded(role);
    toast.success(`Added "${role}" to your hiring needs`);
  };

  const removeRole = (roleToRemove: string) => {
    form.setValue(
      "rolesInterestedIn",
      roles.filter((role) => role !== roleToRemove),
    );
    toast.info(`Removed "${roleToRemove}" from your hiring needs`);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form submitted with values:", values);
      toast.info("Submitting your profile...");

      // Check if API endpoint is defined
      const apiUrl = "/api/employer-onboarding";
      console.log("Submitting to API endpoint:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      console.log("API response status:", response.status);

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        console.log("API response data:", data);
      } else {
        const text = await response.text();
        console.log("API response text:", text);
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to create profile",
        );
      }

      toast.success("Profile created successfully!");
      console.log("Redirecting to dashboard...");
      router.push("/h/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create profile. Please try again.",
      );
    }
  };

  // Handle Enter key press to move to the next field
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    nextFieldName?: string,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // If next field is specified, focus on it
      if (nextFieldName) {
        const nextField = document.querySelector(
          `[name="${nextFieldName}"]`,
        ) as HTMLElement;
        if (nextField) {
          nextField.focus();
        }
      } else {
        // Otherwise find the next form element and focus it
        const formElements = Array.from(
          document.querySelectorAll('input, textarea, button[type="submit"]'),
        );
        const currentIndex = formElements.indexOf(e.currentTarget);
        if (currentIndex !== -1 && currentIndex < formElements.length - 1) {
          (formElements[currentIndex + 1] as HTMLElement).focus();
        }
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-950 px-4 py-10 overflow-hidden">
      <div className="absolute left-0 inset-y-0 w-32 hidden md:block">
        <div className="absolute w-16 h-16 rounded-full bg-emerald-500 opacity-10 animate-[float1_15s_ease-in-out_infinite] top-1/4 left-4"></div>
        <div className="absolute w-12 h-12 rounded-full bg-green-400 opacity-15 animate-[float2_18s_ease-in-out_infinite] top-1/2 left-10"></div>
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 opacity-10 animate-[float3_20s_ease-in-out_infinite] top-3/4 left-6"></div>
        <div className="absolute w-10 h-10 rounded-full bg-teal-500 opacity-15 animate-[float4_12s_ease-in-out_infinite] top-1/3 left-16"></div>
        <div className="absolute w-14 h-14 rounded-full bg-gradient-to-r from-emerald-400 to-green-300 opacity-10 animate-[float5_25s_ease-in-out_infinite] top-2/3 left-2"></div>
      </div>

      <div className="absolute right-0 inset-y-0 w-32 hidden md:block">
        <div className="absolute w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-teal-500 opacity-10 animate-[float3_22s_ease-in-out_infinite] top-1/3 right-8"></div>
        <div className="absolute w-10 h-10 rounded-full bg-emerald-500 opacity-15 animate-[float1_17s_ease-in-out_infinite] top-1/2 right-16"></div>
        <div className="absolute w-16 h-16 rounded-full bg-teal-400 opacity-10 animate-[float5_19s_ease-in-out_infinite] top-2/3 right-4"></div>
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 opacity-10 animate-[float2_24s_ease-in-out_infinite] top-1/4 right-6"></div>
        <div className="absolute w-12 h-12 rounded-full bg-green-500 opacity-15 animate-[float4_14s_ease-in-out_infinite] top-3/4 right-12"></div>
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(15px, 25px) rotate(5deg);
          }
          50% {
            transform: translate(5px, -20px) rotate(-5deg);
          }
          75% {
            transform: translate(-10px, 15px) rotate(3deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          20% {
            transform: translate(-20px, 10px) rotate(-3deg);
          }
          40% {
            transform: translate(15px, 15px) rotate(5deg);
          }
          60% {
            transform: translate(20px, -15px) rotate(3deg);
          }
          80% {
            transform: translate(-10px, -25px) rotate(-5deg);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          30% {
            transform: translate(25px, -15px) rotate(6deg);
          }
          60% {
            transform: translate(-15px, -20px) rotate(-6deg);
          }
          80% {
            transform: translate(10px, 15px) rotate(3deg);
          }
        }
        @keyframes float4 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          20% {
            transform: translate(10px, 20px) rotate(4deg);
          }
          50% {
            transform: translate(-15px, 15px) rotate(-4deg);
          }
          80% {
            transform: translate(20px, -10px) rotate(6deg);
          }
        }
        @keyframes float5 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          15% {
            transform: translate(-15px, -15px) rotate(-3deg);
          }
          35% {
            transform: translate(20px, 10px) rotate(5deg);
          }
          60% {
            transform: translate(10px, 20px) rotate(0deg);
          }
          80% {
            transform: translate(-20px, -10px) rotate(-5deg);
          }
        }
      `}</style>

      <div className="container mx-auto max-w-4xl relative z-10">
        <Card className="rounded-2xl shadow-xl border border-green-100 dark:border-green-900 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
            <CardTitle className="text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
              Complete Your Employer Profile
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Help us better understand your company and hiring needs
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Acme Corporation"
                          {...field}
                          onKeyPress={(e) => handleKeyPress(e, "post")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="post"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Position/Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., HR Manager, CTO, Founder"
                          {...field}
                          onKeyPress={(e) => handleKeyPress(e, "companyUrl")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Website *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.example.com"
                          {...field}
                          onKeyPress={(e) => handleKeyPress(e, "description")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Logo</FormLabel>
                      <FormControl>
                        <Uploader
                          value={field.value ? [field.value] : []}
                          onChange={(urls) => field.onChange(urls[0])}
                          endpoint="companyLogo"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell potential candidates about your company, culture, and what makes it special..."
                          className="min-h-32"
                          {...field}
                          onKeyPress={(e) =>
                            handleKeyPress(e, "rolesInterestedIn")
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rolesInterestedIn"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        Roles You&apos;re Interested In Hiring For *
                      </FormLabel>
                      <div className="relative">
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              value={newRole}
                              onChange={(e) => {
                                setNewRole(e.target.value);
                                setShowSuggestions(true);
                              }}
                              onFocus={() => setShowSuggestions(true)}
                              placeholder="e.g., Frontend Developer"
                              className="pl-8"
                              onKeyPress={(e) => handleKeyPress(e)}
                            />
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            {isTyping && (
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 flex">
                                <span className="animate-pulse mr-0.5 h-1 w-1 rounded-full bg-green-500"></span>
                                <span className="animate-pulse delay-100 mr-0.5 h-1 w-1 rounded-full bg-green-500"></span>
                                <span className="animate-pulse delay-200 h-1 w-1 rounded-full bg-green-500"></span>
                              </span>
                            )}
                          </div>
                          <Button
                            type="button"
                            onClick={() => addRole()}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                          >
                            <Plus className="w-4 h-4 mr-1" /> Add
                          </Button>
                        </div>

                        {/* Role suggestions dropdown */}
                        {showSuggestions && filteredSuggestions.length > 0 && (
                          <div
                            ref={suggestionRef}
                            className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto"
                          >
                            <AnimatePresence>
                              {filteredSuggestions.map((suggestion, i) => (
                                <motion.div
                                  key={suggestion}
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                                  onClick={() => addRole(suggestion)}
                                >
                                  <Plus className="w-3 h-3 mr-2 text-green-500" />
                                  {suggestion}
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <AnimatePresence>
                          {roles.map((role, index) => (
                            <motion.div
                              key={role}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                backgroundColor:
                                  recentlyAdded === role
                                    ? "rgba(34, 197, 94, 0.3)"
                                    : "transparent",
                              }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 25,
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              drag
                              dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                              }}
                              dragElastic={0.1}
                              className="relative"
                            >
                              <Badge
                                variant="secondary"
                                className={`flex items-center gap-1 px-3 py-1.5 text-sm border border-transparent ${
                                  index % 3 === 0
                                    ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                                    : index % 3 === 1
                                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200"
                                      : "bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-200"
                                } ${recentlyAdded === role ? "shadow-md" : ""}`}
                              >
                                {role}
                                <button
                                  type="button"
                                  onClick={() => removeRole(role)}
                                  className="ml-1 rounded-full hover:bg-white/25 p-0.5 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                              {recentlyAdded === role && (
                                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      {roles.length === 0 && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-muted-foreground mt-2 p-3 border border-dashed border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 flex items-center justify-center"
                        >
                          <Search className="w-4 h-4 mr-2 text-muted-foreground" />
                          Add at least one role you&apos;re looking to hire for
                        </motion.p>
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 pb-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {profileComplete
                        ? "Your profile is complete!"
                        : "Complete your profile"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {profileComplete
                        ? "You're ready to launch your hiring portal"
                        : "Fill out all required fields to continue"}
                    </p>
                  </div>

                  {/* Profile completion status */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Profile completion
                      </span>
                      <span
                        className={`font-medium ${
                          completionPercentage < 50
                            ? "text-red-500"
                            : completionPercentage < 100
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {completionPercentage}%
                      </span>
                    </div>

                    {/* Progress bar that automatically updates */}
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative">
                      <motion.div
                        className={`h-full absolute left-0 top-0 ${
                          completionPercentage < 50
                            ? "bg-gradient-to-r from-red-400 to-red-500"
                            : completionPercentage < 100
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                              : "bg-gradient-to-r from-green-400 to-emerald-500"
                        }`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 80,
                          damping: 15,
                        }}
                      />

                      {/* Moving dot on the progress bar */}
                      {completionPercentage > 0 &&
                        completionPercentage < 100 && (
                          <motion.div
                            className="absolute top-0 h-full aspect-square bg-white dark:bg-gray-200 rounded-full shadow-md flex items-center justify-center"
                            style={{
                              left: `calc(${completionPercentage}% - 6px)`,
                            }}
                            animate={{
                              x: [-2, 2, -2],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                            }}
                          >
                            <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                          </motion.div>
                        )}

                      {/* Checkmarks for milestones */}
                      {[25, 50, 75, 100].map(
                        (milestone) =>
                          completionPercentage >= milestone && (
                            <motion.div
                              key={milestone}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring" }}
                              className="absolute top-1/2 -translate-y-1/2"
                              style={{ left: `${milestone}%` }}
                            >
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  milestone === 100
                                    ? "bg-green-200"
                                    : "bg-gray-200"
                                }`}
                              ></div>
                            </motion.div>
                          ),
                      )}
                    </div>

                    {/* Checkpoint markers below progress bar */}
                    <div className="flex justify-between px-1 text-xs text-gray-500">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-1.5 h-1.5 rounded-full mb-1 ${
                            completionPercentage >= 25
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span>Basics</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-1.5 h-1.5 rounded-full mb-1 ${
                            completionPercentage >= 50
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span>Details</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-1.5 h-1.5 rounded-full mb-1 ${
                            completionPercentage >= 75
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span>Roles</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-1.5 h-1.5 rounded-full mb-1 ${
                            completionPercentage >= 100
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <span>Complete</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile status indicator */}
                  <div className="flex items-center justify-center mt-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: profileComplete ? [1, 1.1, 1] : 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: profileComplete ? 1 : 0,
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        profileComplete
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <Check
                        className={`w-6 h-6 ${
                          profileComplete
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Submit button */}
                  <div className="mt-6 text-center">
                    <motion.button
                      type="submit"
                      onClick={(e) => {
                        console.log("Submit button clicked");
                        if (!profileComplete) {
                          e.preventDefault();
                          toast.error("Please complete all required fields");
                        }
                      }}
                      disabled={!profileComplete}
                      className={`px-8 py-3 rounded-full font-medium shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto ${
                        profileComplete
                          ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-green-500/20 hover:shadow-green-600/30 hover:scale-105"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      }`}
                      animate={{
                        scale: profileComplete ? [1, 1.05, 1] : 1,
                        transition: {
                          duration: 0.5,
                          repeat: profileComplete ? Infinity : 0,
                          repeatType: "reverse",
                          repeatDelay: 1.5,
                        },
                      }}
                    >
                      <span>Launch Your Hiring Portal</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
