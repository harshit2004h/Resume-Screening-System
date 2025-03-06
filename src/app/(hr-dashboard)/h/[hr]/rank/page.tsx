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

  return (
    <div className="min-h-[80vh] min-w-[80vw] flex flex-col p-6 my-9">
      <h1 className="text-2xl font-bold mb-6">People Ranking</h1>
      
      {/* Search Input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500"
        />
      </div>
      
      {/* Filter Section */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-semibold">Filter by Job Role:</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500"
        >
          <option value="All">All</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      
      {/* Scrollable List of People */}
      <div className="overflow-y-auto h-[400px] border p-4 rounded">
        {filteredData.map((person) => (
          <div
            key={person.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 mb-2 last:border-0"
          >
            <div>
              <p className="font-semibold">
                {person.name} (Rank: {person.rank})
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {person.role}
              </p>
            </div>
            {/* Optional: a button if needed */}
            <Button variant="outline" className="mt-2 sm:mt-0">
              View Profile
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}