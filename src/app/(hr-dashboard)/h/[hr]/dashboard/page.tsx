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
import { DashboardHeader } from "@/src/components/hr-dashboard-header";
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

interface Task {
  id: number;
  content: string;
}

interface Column {
  title: string;
  items: Task[];
}

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

export default function DashboardPage() {
  const [columns, setColumns] = useState<Column[]>([
    { title: "To Do List", items: [] },
    { title: "In Progress", items: [] },
    { title: "In Review", items: [] },
    { title: "Done", items: [] },
  ]);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newItemContent, setNewItemContent] = useState("");
  const [activeColumn, setActiveColumn] = useState<number | null>(null);

  const openDialog = (columnIndex: number) => {
    setActiveColumn(columnIndex);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setNewItemContent("");
    setActiveColumn(null);
  };

  const addItem = () => {
    if (newItemContent.trim() === "" || activeColumn === null) return;
    setColumns((prevColumns) =>
      prevColumns.map((column, idx) =>
        idx === activeColumn
          ? {
              ...column,
              items: [
                ...column.items,
                { id: Date.now(), content: newItemContent },
              ],
            }
          : column,
      ),
    );
    closeDialog();
  };

  return (
    <div className="min-h-[60vh] min-w-[80vw] flex flex-col p-6">
      <DashboardHeader />
      
      {/* New Section: Graphs */}
      <div className="flex flex-row gap-4 mt-10">
        <div className="w-1/2 bg-white dark:bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#60a5fa" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 bg-white dark:bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}