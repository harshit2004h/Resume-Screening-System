"use client";
import { useState } from "react";
import { Plus, Search, FileText, UserPlus, ChevronRight, Star, Briefcase, Users } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useRouter } from "next/navigation";

// Sample data for user details with rank and additional users (total 8 users)
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
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.hiringPost.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count users by role
  const roleCount: {[key: string]: number} = {};
  sampleUsers.forEach(user => {
    roleCount[user.hiringPost] = (roleCount[user.hiringPost] || 0) + 1;
  });

  return (
    <div className="flex flex-col p-6">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Header Section */}
      <div className="mb-8 my-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">Hiring Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View previously hired candidates and initiate new hiring processes.
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/20">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Hired</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{sampleUsers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-green-100 dark:border-green-900/20">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Frontend Devs</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {roleCount['Frontend Developer'] || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/20">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Backend Devs</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {roleCount['Backend Developer'] || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-green-100 dark:border-green-900/20">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Rank</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {Math.round(sampleUsers.reduce((acc, user) => acc + user.rank, 0) / sampleUsers.length)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search candidates by name or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            />
          </div>
          
          <Button
            onClick={() => router.push("/h/hire/new")}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Hire New Candidate
          </Button>
        </div>
      </div>
      
      {/* Candidate Cards */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20">
        <h2 className="text-base font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span className="w-1 h-5 bg-purple-500 rounded-full mr-3 inline-block"></span>
          Hired Candidates ({filteredUsers.length})
        </h2>
        
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/30 hover:border-purple-200 dark:hover:border-purple-800/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                      {user.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium">
                        Rank: {user.rank}
                      </span>
                      <span className="text-xs px-2 py-1 ml-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
                        {user.hiringPost}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Skills: </span>
                      {user.skills}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(user.resumeUrl, "_blank")}
                    className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    <FileText className="h-4 w-4 mr-1" /> View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No candidates match your search criteria</p>
          </div>
        )}
      </div>
      
      {/* Floating Action Button (Mobile only) */}
      <div className="md:hidden fixed bottom-6 right-6">
        <Button
          onClick={() => router.push("/h/hire/new")}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          size="icon"
        >
          <UserPlus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}