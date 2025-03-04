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
import { DashboardHeader } from "@/src/components/dashboard-header";

interface Task {
  id: number;
  content: string;
}

interface Column {
  title: string;
  items: Task[];
}

const performanceData = [
  { name: "Jan", Team1: 65, Team2: 78, Team3: 82 },
  { name: "Feb", Team1: 59, Team2: 80, Team3: 67 },
  { name: "Mar", Team1: 80, Team2: 85, Team3: 79 },
  { name: "Apr", Team1: 81, Team2: 72, Team3: 86 },
  { name: "May", Team1: 56, Team2: 68, Team3: 75 },
  { name: "Jun", Team1: 55, Team2: 65, Team3: 60 },
  { name: "Jul", Team1: 67, Team2: 70, Team3: 73 },
  { name: "Aug", Team1: 75, Team2: 82, Team3: 80 },
]

const attendanceData = [
  { name: "Mon", present: 45, absent: 2, late: 3 },
  { name: "Tue", present: 47, absent: 1, late: 2 },
  { name: "Wed", present: 44, absent: 3, late: 3 },
  { name: "Thu", present: 48, absent: 0, late: 2 },
  { name: "Fri", present: 46, absent: 2, late: 2 },
]

const projectStatusData = [
  { name: "Completed", value: 12, color: "#10b981" },
  { name: "In Progress", value: 8, color: "#3b82f6" },
  { name: "Delayed", value: 3, color: "#f59e0b" },
  { name: "Not Started", value: 2, color: "#6b7280" },
]

const topPerformers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 98,
    projects: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 95,
    projects: 4,
    status: "Active",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 92,
    projects: 3,
    status: "Active",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 90,
    projects: 4,
    status: "On Leave",
  },
]

const recentActivities = [
  {
    id: 1,
    employee: "Alex Morgan",
    action: "Completed task",
    item: "API Integration",
    time: "10 minutes ago",
  },
  {
    id: 2,
    employee: "Jessica Lee",
    action: "Submitted report",
    item: "Q3 Performance",
    time: "1 hour ago",
  },
  {
    id: 3,
    employee: "Ryan Patel",
    action: "Requested approval",
    item: "New Feature Design",
    time: "2 hours ago",
  },
  {
    id: 4,
    employee: "Sophia Williams",
    action: "Marked as complete",
    item: "Client Meeting",
    time: "3 hours ago",
  },
]

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
      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-4 w-full mt-5">
        {columns.map((column, index) => (
          <Card
            key={column.title}
            className="flex flex-col shadow-lg rounded-lg min-h-[300px] border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between bg-white dark:bg-[#0d0d0d] border-b border-gray-300 dark:border-gray-600 rounded-t-lg px-4 py-2">
              <CardTitle className="text-sm font-semibold text-black dark:text-gray-100">
                {column.title}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openDialog(index)}
                className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-2.5"
              >
                <Plus className="h-4 w-4 text-black dark:text-gray-100" />
              </Button>
            </CardHeader>

            {/* Content */}
            <CardContent className="flex-1 overflow-auto max-h-[400px] p-4 bg-gray-100 dark:bg-[#1a1a1a] rounded-b-lg">
              {column.items.map((item) => (
                <div
                  key={item.id}
                  className="mb-2 p-3 bg-white dark:bg-gray-700 rounded-md shadow-md border border-gray-300 dark:border-gray-600"
                >
                  {item.content}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for Adding Items */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-600">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">Add Item</DialogTitle>
          </DialogHeader>
          <Input
            value={newItemContent}
            onChange={(e) => setNewItemContent(e.target.value)}
            placeholder="Enter task details..."
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={closeDialog}
              className="dark:border-gray-500 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={addItem}
              className="dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}