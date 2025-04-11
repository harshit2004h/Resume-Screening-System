"use client";
import { useState } from "react";
import { Plus, FileText, Briefcase, Calendar, Award } from "lucide-react";
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

export default function DashboardPage() {
  const [columns, setColumns] = useState<Column[]>([
    { title: "To Do List", items: [{id: 1, content: "Update resume"}, {id: 2, content: "Apply for web developer position"}] },
    { title: "In Progress", items: [{id: 3, content: "Interview preparation"}] },
    { title: "In Review", items: [{id: 4, content: "Technical test submission"}] },
    { title: "Done", items: [{id: 5, content: "Resume screening"}, {id: 6, content: "Create portfolio"}] },
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
    <div className="min-h-screen flex flex-col p-4 lg:p-6 bg-white dark:bg-gray-950 my-8">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>

      <DashboardHeader />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
        {/* Primary purple theme for primary metrics */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="ml-2 text-sm font-medium text-purple-700 dark:text-purple-400">Applications</h3>
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">12</p>
          <div className="flex items-center mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
            <p className="text-sm text-purple-600 dark:text-purple-400">Active jobs</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="ml-2 text-sm font-medium text-purple-700 dark:text-purple-400">Interviews</h3>
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">3</p>
          <div className="flex items-center mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
            <p className="text-sm text-purple-600 dark:text-purple-400">This week</p>
          </div>
        </div>
        
        {/* Secondary green theme for secondary metrics */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-green-100 dark:border-green-900/20 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="ml-2 text-sm font-medium text-green-700 dark:text-green-400">Profile Rank</h3>
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">87</p>
          <div className="flex items-center mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            <p className="text-sm text-green-600 dark:text-green-400">Top 15%</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-green-100 dark:border-green-900/20 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="ml-2 text-sm font-medium text-green-700 dark:text-green-400">Resume Views</h3>
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">45</p>
          <div className="flex items-center mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            <p className="text-sm text-green-600 dark:text-green-400">Last 30 days</p>
          </div>
        </div>
      </div>
      
      {/* Kanban Board */}
      <div className="mt-8">
        <h2 className="text-base font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <span className="w-1 h-5 bg-purple-500 rounded-full mr-3 inline-block"></span>
          Job Application Tracker
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {columns.map((column, index) => (
            <Card
              key={column.title}
              className="flex flex-col shadow-md rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-900 h-[400px]"
            >
              <CardHeader className={`flex flex-row items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 ${
                index % 2 === 0 ? "bg-purple-50/50 dark:bg-purple-900/10" : "bg-green-50/50 dark:bg-green-900/10"
              }`}>
                <CardTitle className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {column.title}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openDialog(index)}
                  className={`hover:${
                    index % 2 === 0 ? "bg-purple-100 dark:bg-purple-900/20" : "bg-green-100 dark:bg-green-900/20"
                  } rounded-full p-1`}
                >
                  <Plus className={`h-4 w-4 ${
                    index % 2 === 0 ? "text-purple-600 dark:text-purple-400" : "text-green-600 dark:text-green-400"
                  }`} />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 overflow-auto p-3 space-y-2">
                {column.items.length > 0 ? (
                  column.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/30 hover:border-purple-200 dark:hover:border-purple-800/30 transition-colors"
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200">{item.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600 text-sm">
                    No items yet
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog for Adding Items */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Add New Task</DialogTitle>
          </DialogHeader>
          <Input
            value={newItemContent}
            onChange={(e) => setNewItemContent(e.target.value)}
            placeholder="Enter task details..."
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={closeDialog}
              className="border-gray-300 dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={addItem}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
