"use client";
import { useState } from "react";
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
import { Search, UserRound, Award, Filter } from "lucide-react";
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

interface Person {
  id: number;
  name: string;
  rank: number;
  role: string;
}

// Sample data for ranking (approx 20 entries)
const sampleRankData: Person[] = [
  { id: 1, name: "John Doe", rank: 5, role: "Frontend Developer" },
  { id: 2, name: "Jane Smith", rank: 3, role: "Backend Developer" },
  { id: 3, name: "Alice Johnson", rank: 8, role: "Designer" },
  { id: 4, name: "Bob Brown", rank: 1, role: "Full Stack Developer" },
  { id: 5, name: "Emma Wilson", rank: 7, role: "Backend Developer" },
  { id: 6, name: "Peter Parker", rank: 10, role: "Frontend Developer" },
  { id: 7, name: "Bruce Wayne", rank: 2, role: "Full Stack Developer" },
  { id: 8, name: "Clark Kent", rank: 12, role: "Backend Developer" },
  { id: 9, name: "Diana Prince", rank: 4, role: "Designer" },
  { id: 10, name: "Tony Stark", rank: 9, role: "Full Stack Developer" },
  { id: 11, name: "Steve Rogers", rank: 15, role: "Frontend Developer" },
  { id: 12, name: "Natasha Romanoff", rank: 11, role: "Backend Developer" },
  { id: 13, name: "Bruce Banner", rank: 14, role: "Full Stack Developer" },
  { id: 14, name: "Wanda Maximoff", rank: 6, role: "Designer" },
  { id: 15, name: "Scott Lang", rank: 13, role: "Frontend Developer" },
  { id: 16, name: "Sam Wilson", rank: 16, role: "Full Stack Developer" },
  { id: 17, name: "Bucky Barnes", rank: 17, role: "Backend Developer" },
  { id: 18, name: "Stephen Strange", rank: 18, role: "Designer" },
  { id: 19, name: "Carol Danvers", rank: 19, role: "Full Stack Developer" },
  { id: 20, name: "T'Challa", rank: 20, role: "Backend Developer" },
];

export default function HirePage() {
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Sort data by rank ascending
  const sortedData = [...sampleRankData].sort((a, b) => a.rank - b.rank);

  // Filter data by both search and role
  const filteredData = sortedData.filter((person) => {
    const matchesRole = selectedRole === "All" || person.role === selectedRole;
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Get unique roles for filter options
  const roles = Array.from(new Set(sampleRankData.map((p) => p.role)));

  // Group data by role for chart
  const roleData = roles.map(role => ({
    name: role,
    count: sampleRankData.filter(p => p.role === role).length
  }));

  return (
    <div className="flex flex-col p-6">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Header Section */}
      <div className="mb-8 my-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">Candidate Rankings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and filter candidates based on their skills and evaluation scores.
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/20">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <UserRound className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Candidates</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{sampleRankData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-green-100 dark:border-green-900/20">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Top Ranked</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {sortedData[0]?.name || "N/A"}
              </p>
            </div>
          </div>
        </div>
        
        {roles.slice(0, 2).map((role, index) => (
          <div 
            key={role}
            className={`bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm ${
              index % 2 === 0 
                ? "border border-purple-100 dark:border-purple-900/20" 
                : "border border-green-100 dark:border-green-900/20"
            }`}
          >
            <div className="flex items-center">
              <div className={`p-2 ${
                index % 2 === 0 
                  ? "bg-purple-100 dark:bg-purple-900/20" 
                  : "bg-green-100 dark:bg-green-900/20"
              } rounded-lg`}>
                <UserRound className={`h-6 w-6 ${
                  index % 2 === 0 
                    ? "text-purple-600 dark:text-purple-400" 
                    : "text-green-600 dark:text-green-400"
                }`} />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {sampleRankData.filter(p => p.role === role).length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            />
          </div>
          
          {/* Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
            >
              <option value="All">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Candidates List */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20">
        <h2 className="text-base font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span className="w-1 h-5 bg-purple-500 rounded-full mr-3 inline-block"></span>
          All Candidates ({filteredData.length})
        </h2>
        
        <div className="overflow-y-auto max-h-[400px]">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredData.map((person) => (
                <div
                  key={person.id}
                  className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/30 hover:border-purple-200 dark:hover:border-purple-800/30 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`h-10 w-10 flex items-center justify-center rounded-full ${
                      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" 
                    } font-medium`}>
                      {person.rank}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800 dark:text-gray-200">{person.name}</p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                          person.role === "Frontend Developer" ? "bg-purple-500" :
                          person.role === "Backend Developer" ? "bg-green-500" :
                          person.role === "Full Stack Developer" ? "bg-blue-500" : "bg-amber-500"
                        }`}></span>
                        {person.role}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-200 dark:border-purple-800/40 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  >
                    View Profile
                  </Button>
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
      </div>
      {/* Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 my-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-green-100 dark:border-green-900/20 h-[400px]">
          <h2 className="text-base font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
            <span className="w-1 h-5 bg-green-500 rounded-full mr-3 inline-block"></span>
            Role Distribution
          </h2>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={roleData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
              <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderColor: '#d1d5db',
                  borderRadius: '0.375rem'
                }} 
              />
              <Bar dataKey="count" fill="url(#colorCount)" barSize={40} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20">
          <h2 className="text-base font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
            <span className="w-1 h-5 bg-purple-500 rounded-full mr-3 inline-block"></span>
            Top 5 Candidates
          </h2>
          <ul className="space-y-3">
            {sortedData.slice(0, 5).map((person) => (
              <li key={person.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center">
                  <div className={`h-8 w-8 flex items-center justify-center rounded-full ${
                    "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  } font-medium`}>
                    {person.rank}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800 dark:text-gray-200">{person.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{person.role}</p>
                  </div>
                </div>
                <div>
                  <Button variant="ghost" size="sm" className="text-purple-600 dark:text-purple-400">View</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}