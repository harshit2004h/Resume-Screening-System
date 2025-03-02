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
