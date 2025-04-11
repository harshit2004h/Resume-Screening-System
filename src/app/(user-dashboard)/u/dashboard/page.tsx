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
          : column
      )
    );
    closeDialog();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#D8F9E6] to-[#ECFEF5] dark:from-[#0f1d1b] dark:to-[#132b27] p-6 transition-colors">
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5">
        {columns.map((column, index) => (
          <Card
            key={column.title}
            className="flex flex-col bg-white dark:bg-[#1c2d2b] shadow-md rounded-2xl min-h-[300px] border border-[#CDEBD8] dark:border-[#2f4d49]"
          >
            <CardHeader className="flex flex-row items-center justify-between bg-[#E3FCEF] dark:bg-[#25443f] border-b border-[#CDEBD8] dark:border-[#2f4d49] rounded-t-2xl px-4 py-2">
              <CardTitle className="text-sm font-semibold text-[#007F3B] dark:text-green-100">
                {column.title}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openDialog(index)}
                className="hover:bg-[#D8F9E6] dark:hover:bg-[#2a534c] rounded-full p-2.5"
              >
                <Plus className="h-4 w-4 text-[#007F3B] dark:text-green-100" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto max-h-[400px] p-4 bg-white dark:bg-[#1c2d2b] rounded-b-2xl">
              {column.items.map((item) => (
                <div
                  key={item.id}
                  className="mb-2 p-3 bg-[#E3FCEF] dark:bg-[#2c4843] rounded-lg shadow-sm border border-[#CDEBD8] dark:border-[#3c5e58] text-[#1B4332] dark:text-green-100"
                >
                  {item.content}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#1e302f] border border-[#CDEBD8] dark:border-[#3a5f59] rounded-2xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-[#007F3B] dark:text-green-100 font-semibold">
              Add Item
            </DialogTitle>
          </DialogHeader>
          <Input
            value={newItemContent}
            onChange={(e) => setNewItemContent(e.target.value)}
            placeholder="Enter task details..."
            className="bg-[#E3FCEF] dark:bg-[#2a4944] border border-[#CDEBD8] dark:border-[#4e786f] text-[#1B4332] dark:text-green-100 placeholder-[#60A985] dark:placeholder-green-300"
          />
          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={closeDialog}
              className="border-[#CDEBD8] dark:border-[#3a5f59] text-[#007F3B] dark:text-green-200"
            >
              Cancel
            </Button>
            <Button
              onClick={addItem}
              className="bg-[#007F3B] hover:bg-[#006A34] dark:bg-green-700 dark:hover:bg-green-600 text-white"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
