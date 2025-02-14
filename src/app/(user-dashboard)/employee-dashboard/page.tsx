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
import { DashboardHeader } from "@/src/components/dashboard-header";

type ColumnItem = {
  id: number;
  content: string;
};

type Column = {
  title: string;
  items: ColumnItem[];
};

export default function DashboardPage() {
  const [columns, setColumns] = useState<Column[]>([
    { title: "Work Experience", items: [] },
    { title: "Skills", items: [] },
    { title: "Projects", items: [] },
    { title: "Certifications", items: [] },
  ]);

  const addItem = (columnIndex: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((column, idx) =>
        idx === columnIndex
          ? {
              ...column,
              items: [
                ...column.items,
                { id: Date.now(), content: `New ${column.title} Item` },
              ],
            }
          : column,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <div className="grid grid-cols-4 gap-4">
        {columns.map((column, index) => (
          <Card key={column.title} className="flex flex-col h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {column.title}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => addItem(index)}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              {column.items.map((item) => (
                <div key={item.id} className="mb-2 p-2 bg-secondary rounded">
                  {item.content}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
