"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
// Added imports for both graphs
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";

// Sample data for BarChart
const sampleBarData = [
  { name: "A", value: 12 },
  { name: "B", value: 18 },
  { name: "C", value: 8 },
  { name: "D", value: 15 },
];

// Sample data for LineChart
const sampleLineData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 20 },
  { name: "Mar", value: 27 },
  { name: "Apr", value: 23 },
  { name: "May", value: 34 },
];

// Updated sample data for user details with rank and additional users (total 8 users)
const sampleUsers = [
  {
    id: 1,
    rank: 138,
    name: "John Doe",
    skills: "JavaScript, React, Node.js",
    hiringPost: "Frontend Developer",
    resumeUrl: "/resumes/john-doe.pdf",
  },
  {
    id: 2,
    rank: 259,
    name: "Jane Smith",
    skills: "Python, Django, REST",
    hiringPost: "Backend Developer",
    resumeUrl: "/resumes/jane-smith.pdf",
  },
  {
    id: 3,
    rank: 322,
    name: "Alice Johnson",
    skills: "UI/UX, Figma, CSS",
    hiringPost: "Design Specialist",
    resumeUrl: "/resumes/alice-johnson.pdf",
  },
  {
    id: 4,
    rank: 540,
    name: "Bob Brown",
    skills: "Java, Spring Boot, Microservices",
    hiringPost: "Full Stack Developer",
    resumeUrl: "/resumes/bob-brown.pdf",
  },
  {
    id: 5,
    rank: 582,
    name: "Emma Wilson",
    skills: "Ruby, Rails, PostgreSQL",
    hiringPost: "Backend Developer",
    resumeUrl: "/resumes/emma-wilson.pdf",
  },
  {
    id: 6,
    rank: 610,
    name: "Chris Evans",
    skills: "React, Redux, TypeScript",
    hiringPost: "Frontend Developer",
    resumeUrl: "/resumes/chris-evans.pdf",
  },
  {
    id: 7,
    rank: 645,
    name: "Natalie Portman",
    skills: "Python, Flask, SQL",
    hiringPost: "Backend Developer",
    resumeUrl: "/resumes/natalie-portman.pdf",
  },
  {
    id: 8,
    rank: 670,
    name: "Mark Ruffalo",
    skills: "Full Stack, Node.js, MongoDB",
    hiringPost: "Full Stack Developer",
    resumeUrl: "/resumes/mark-ruffalo.pdf",
  },
];

export default function HirePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users by search term (case-insensitive)
  const filteredUsers = sampleUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="min-h-[60vh] min-w-[80vw] flex flex-col p-6 my-9">
        <h1 className="text-2xl font-bold mb-6">Previously Hired</h1>
        
        {/* Search Input */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <h2 className="font-semibold text-xl">
                {user.id}. {user.name}
              </h2>
              <p>
                <span className="font-semibold">Rank: </span>
                {user.rank}
              </p>
              <p>
                <span className="font-semibold">Skills: </span>
                {user.skills}
              </p>
              <p>
                <span className="font-semibold">Hiring Post: </span>
                {user.hiringPost}
              </p>
              <Button
                variant="outline"
                onClick={() => window.open(user.resumeUrl, "_blank")}
                className="mt-2"
              >
                Preview
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => router.push("/hire/new")}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          Hire Now
        </Button>
      </div>
    </>
  );
}