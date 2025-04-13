"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Check, Calendar, Clock, User, Bell } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";

interface Task {
  id: number;
  content: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: number;
}

interface Column {
  title: string;
  items: Task[];
}

const columnStyles = [
  {
    bg: "bg-gradient-to-br from-blue-50 via-blue-100/70 to-indigo-100",
    dark: "dark:bg-gradient-to-br dark:from-[#1a2938] dark:via-[#182333] dark:to-[#131d2d]",
    border: "border-blue-200",
    darkBorder: "dark:border-blue-900/40",
    shadow: "shadow-blue-100",
    darkShadow: "dark:shadow-blue-900/10",
    accent: "bg-blue-500",
    hoverAccent: "group-hover:bg-blue-600",
    textAccent: "text-blue-600 dark:text-blue-400",
  },
  {
    bg: "bg-gradient-to-br from-amber-50 via-amber-100/70 to-yellow-100",
    dark: "dark:bg-gradient-to-br dark:from-[#2a2c1a] dark:via-[#252815] dark:to-[#1f2110]",
    border: "border-amber-200",
    darkBorder: "dark:border-amber-900/40",
    shadow: "shadow-amber-100",
    darkShadow: "dark:shadow-amber-900/10",
    accent: "bg-amber-500",
    hoverAccent: "group-hover:bg-amber-600",
    textAccent: "text-amber-600 dark:text-amber-400",
  },
  {
    bg: "bg-gradient-to-br from-pink-50 via-pink-100/70 to-rose-100",
    dark: "dark:bg-gradient-to-br dark:from-[#2d1a26] dark:via-[#281521] dark:to-[#23111c]",
    border: "border-pink-200",
    darkBorder: "dark:border-pink-900/40",
    shadow: "shadow-pink-100",
    darkShadow: "dark:shadow-pink-900/10",
    accent: "bg-pink-500",
    hoverAccent: "group-hover:bg-pink-600",
    textAccent: "text-pink-600 dark:text-pink-400",
  },
  {
    bg: "bg-gradient-to-br from-green-50 via-green-100/70 to-emerald-100",
    dark: "dark:bg-gradient-to-br dark:from-[#1a2d1a] dark:via-[#182818] dark:to-[#132113]",
    border: "border-green-200",
    darkBorder: "dark:border-green-900/40",
    shadow: "shadow-green-100",
    darkShadow: "dark:shadow-green-900/10",
    accent: "bg-green-500",
    hoverAccent: "group-hover:bg-green-600",
    textAccent: "text-green-600 dark:text-green-400",
  },
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
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [newDueDate, setNewDueDate] = useState<string>("");
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<{ id: number; column: number } | null>(null);
  const [draggedItem, setDraggedItem] = useState<{ id: number; column: number } | null>(null);
  const [activePriorityFilter, setActivePriorityFilter] = useState<"low" | "medium" | "high" | null>(null);

  const [userName, setUserName] = useState("User");
  const [userInitials, setUserInitials] = useState("U");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const savedColumns = localStorage.getItem("kanbanColumns");
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setTimeout(() => {
          const name = "Alex Johnson";
          setUserName(name);
          setUserInitials(name.split(' ').map(n => n[0]).join(''));
          setUserImage("");
        }, 500);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const openDialog = (columnIndex: number) => {
    setActiveColumn(columnIndex);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setNewItemContent("");
    setNewTaskPriority("medium");
    setNewDueDate("");
    setActiveColumn(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addItem();
    }
  };

  const addItem = () => {
    if (newItemContent.trim() === "" || activeColumn === null) {
      const inputElement = document.getElementById('task-content-input');
      if (inputElement) {
        inputElement.classList.add('border-red-500', 'dark:border-red-500');
        setTimeout(() => {
          inputElement.classList.remove('border-red-500', 'dark:border-red-500');
        }, 2000);
      }
      return;
    }
    
    setColumns((prevColumns) =>
      prevColumns.map((column, idx) =>
        idx === activeColumn
          ? {
              ...column,
              items: [
                ...column.items,
                { 
                  id: Date.now(), 
                  content: newItemContent,
                  priority: newTaskPriority,
                  dueDate: newDueDate || undefined,
                  createdAt: Date.now()
                },
              ],
            }
          : column
      )
    );
    closeDialog();
  };

  const deleteItem = (columnIndex: number, itemId: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((column, idx) =>
        idx === columnIndex
          ? {
              ...column,
              items: column.items.filter((item) => item.id !== itemId),
            }
          : column
      )
    );
  };

  const startEditingItem = (columnIndex: number, itemId: number, content: string) => {
    setEditingItem({ id: itemId, column: columnIndex });
    setNewItemContent(content);
  };

  const saveEditedItem = () => {
    if (!editingItem || newItemContent.trim() === "") return;

    setColumns((prevColumns) =>
      prevColumns.map((column, idx) =>
        idx === editingItem.column
          ? {
              ...column,
              items: column.items.map((item) =>
                item.id === editingItem.id
                  ? { ...item, content: newItemContent }
                  : item
              ),
            }
          : column
      )
    );

    setEditingItem(null);
    setNewItemContent("");
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setNewItemContent("");
  };

  const handleDragStart = (columnIndex: number, itemId: number) => {
    setDraggedItem({ id: itemId, column: columnIndex });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnIndex: number) => {
    if (!draggedItem) return;

    const sourceColumn = columns[draggedItem.column];
    const item = sourceColumn.items.find((item) => item.id === draggedItem.id);

    if (!item) return;

    const newColumns = columns.map((column, idx) =>
      idx === draggedItem.column
        ? {
            ...column,
            items: column.items.filter((i) => i.id !== draggedItem.id),
          }
        : column
    );

    newColumns[targetColumnIndex] = {
      ...newColumns[targetColumnIndex],
      items: [...newColumns[targetColumnIndex].items, item],
    };

    setColumns(newColumns);
    setDraggedItem(null);
  };

  const getColumnColor = (columnIndex: number | null) => {
    if (columnIndex === null) return {
      bg: "bg-green-50",
      dark: "dark:bg-[#2a4944]",
      border: "border-green-200",
      darkBorder: "dark:border-[#3a5f59]",
      text: "text-green-800",
      darkText: "dark:text-green-100",
    };
    
    return {
      bg: columnStyles[columnIndex].bg,
      dark: columnStyles[columnIndex].dark,
      border: columnStyles[columnIndex].border,
      darkBorder: columnStyles[columnIndex].darkBorder,
      text: columnStyles[columnIndex].textAccent,
      darkText: columnStyles[columnIndex].textAccent,
    };
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isDueSoon = (dateString?: string) => {
    if (!dateString) return false;
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 2;
  };

  const getFilteredItems = (items: Task[]) => {
    if (activePriorityFilter === null) return items;
    return items.filter(item => item.priority === activePriorityFilter);
  };

  const getPriorityCounts = (items: Task[]) => {
    return {
      low: items.filter(item => item.priority === "low").length,
      medium: items.filter(item => item.priority === "medium").length,
      high: items.filter(item => item.priority === "high").length,
    };
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDateRestrictions = (columnIndex: number | null) => {
    if (columnIndex === null) return { min: undefined, max: undefined };
    
    const today = getTodayDateString();
    
    if (columnIndex === 3) {
      return { min: undefined, max: today };
    } else {
      return { min: today, max: undefined };
    }
  };

  const getDateHelpText = (columnIndex: number | null) => {
    if (columnIndex === null) return "";
    if (columnIndex === 3) {
      return "Completed tasks can't have future dates";
    } else {
      return "Date must not be before today";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 dark:from-[#0f1a1a] dark:to-[#0a1414] px-6 py-6 transition-colors">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">
            D
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your tasks efficiently</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 px-4 rounded-full shadow-sm">
            <Avatar className="h-8 w-8 border-2 border-green-200 dark:border-green-900">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback className="bg-gradient-to-br from-green-400 to-teal-500 text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Task Manager</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 mb-6">
        {columns.map((column, index) => {
          const priorityCounts = getPriorityCounts(column.items);
          
          return (
            <div 
              key={`summary-${index}`} 
              className={`p-4 rounded-xl ${columnStyles[index].bg} ${columnStyles[index].dark} 
              border ${columnStyles[index].border} ${columnStyles[index].darkBorder}
              ${columnStyles[index].shadow} ${columnStyles[index].darkShadow}
              backdrop-blur-sm backdrop-saturate-150
              transition-all duration-300 ease-in-out
              hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]`}
            >
              <div className="flex items-center">
                <div className={`w-2 h-10 rounded-full mr-3 ${columnStyles[index].accent} opacity-80`}></div>
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-200">{column.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{column.items.length}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    {priorityCounts.high > 0 && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-300">{priorityCounts.high}</span>
                      </div>
                    )}
                    {priorityCounts.medium > 0 && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-300">{priorityCounts.medium}</span>
                      </div>
                    )}
                    {priorityCounts.low > 0 && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-300">{priorityCounts.low}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
            <span className="h-5 w-1 bg-green-500 rounded-full mr-2"></span>
            Your Tasks
          </h2>
          
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400 mr-1">Filter by:</span>
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {activePriorityFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActivePriorityFilter(null)}
                  className="px-2 py-1 h-7 text-xs text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-md"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActivePriorityFilter("high")}
                className={`px-3 py-1 h-7 text-xs rounded-md flex items-center ${
                  activePriorityFilter === "high" 
                    ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
                }`}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></div>
                High
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActivePriorityFilter("medium")}
                className={`px-3 py-1 h-7 text-xs rounded-md flex items-center ${
                  activePriorityFilter === "medium" 
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
                }`}
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></div>
                Medium
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActivePriorityFilter("low")}
                className={`px-3 py-1 h-7 text-xs rounded-md flex items-center ${
                  activePriorityFilter === "low" 
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
                }`}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                Low
              </Button>
            </div>
          </div>
        </div>
        
        {activePriorityFilter && (
          <div className="bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                activePriorityFilter === "high" ? "bg-red-500" : 
                activePriorityFilter === "medium" ? "bg-yellow-500" : "bg-green-500"
              }`}></div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing tasks with {activePriorityFilter} priority
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActivePriorityFilter(null)}
              className="h-7 px-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear filter
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {columns.map((column, index) => (
          <Card
            key={column.title}
            className={`group flex flex-col rounded-xl overflow-hidden
            ${columnStyles[index].bg} ${columnStyles[index].dark}
            border ${columnStyles[index].border} ${columnStyles[index].darkBorder}
            ${columnStyles[index].shadow} ${columnStyles[index].darkShadow}
            transition-all duration-300 ease-in-out
            hover:shadow-xl min-h-[350px] h-auto max-h-[calc(100vh-250px)]`}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <CardHeader className="flex flex-row items-center justify-between px-4 py-3 border-b border-gray-200/70 dark:border-gray-700/70 backdrop-blur-sm bg-white/30 dark:bg-gray-900/20 sticky top-0 z-10">
              <CardTitle className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                <div className={`w-2 h-2 rounded-full ${columnStyles[index].accent} mr-2 transition-all duration-200 ${columnStyles[index].hoverAccent}`}></div>
                {column.title} 
                <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">({getFilteredItems(column.items).length})</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openDialog(index)}
                className="h-7 w-7 rounded-full hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
              >
                <Plus className={`w-3.5 h-3.5 ${columnStyles[index].textAccent}`} />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto px-3 py-2 space-y-2 backdrop-blur-[2px] h-auto">
              {getFilteredItems(column.items).length === 0 && (
                <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300/50 dark:border-gray-700/50 rounded-lg mt-2 p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {column.items.length === 0 ? "No tasks yet" : "No tasks matching filter"}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {column.items.length === 0 ? "Click + to add a task" : "Try changing your filter"}
                  </p>
                </div>
              )}
              
              {getFilteredItems(column.items).sort((a, b) => {
                if (a.dueDate && b.dueDate) {
                  return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                } else if (a.dueDate) {
                  return -1;
                } else if (b.dueDate) {
                  return 1;
                }
                return b.createdAt - a.createdAt;
              }).map((item) => (
                <div
                  key={item.id}
                  className="group/item p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
                  border border-gray-200/70 dark:border-gray-700/70 rounded-lg 
                  shadow-sm text-xs text-gray-800 dark:text-gray-100 relative 
                  transition-all duration-300 ease-in-out
                  hover:shadow-md hover:bg-white dark:hover:bg-gray-800 
                  hover:-translate-y-0.5"
                  draggable
                  onDragStart={() => handleDragStart(index, item.id)}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg ${
                    item.priority === "high" ? "bg-red-400" : 
                    item.priority === "medium" ? "bg-amber-400" : 
                    item.priority === "low" ? "bg-green-400" : "bg-gray-300"
                  } group-hover/item:w-1.5 transition-all duration-300`}></div>
                  
                  {editingItem && editingItem.id === item.id ? (
                    <div className="flex flex-col gap-1.5 pl-2">
                      <Input
                        value={newItemContent}
                        onChange={(e) => setNewItemContent(e.target.value)}
                        className="text-xs"
                        autoFocus
                      />
                      
                      <div className="flex space-x-2 mt-2">
                        <div className="flex-1">
                          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Due date</label>
                          <input 
                            type="date" 
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                            min={getDateRestrictions(editingItem.column).min}
                            max={getDateRestrictions(editingItem.column).max}
                            className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded"
                          />
                          {getDateHelpText(editingItem.column) && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {getDateHelpText(editingItem.column)}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Priority</label>
                          <select 
                            value={newTaskPriority} 
                            onChange={(e) => setNewTaskPriority(e.target.value as any)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={cancelEditing}
                          className="h-7 px-2"
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={saveEditedItem}
                          className="h-7 px-2"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col pl-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 break-words text-xs">{item.content}</div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 rounded-full"
                            onClick={() => startEditingItem(index, item.id, item.content)}
                          >
                            <Edit className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 rounded-full"
                            onClick={() => deleteItem(index, item.id)}
                          >
                            <Trash2 className="w-3 h-3 text-red-500 dark:text-red-400" />
                          </Button>
                        </div>
                      </div>
                      
                      {item.dueDate && (
                        <div className={`flex items-center mt-1 text-[10px] ${
                          isDueSoon(item.dueDate) ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"
                        }`}>
                          <Calendar className="w-2.5 h-2.5 mr-0.5" />
                          <span>Due: {formatDate(item.dueDate)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className={`${getColumnColor(activeColumn).bg} ${getColumnColor(activeColumn).dark} border ${getColumnColor(activeColumn).border} ${getColumnColor(activeColumn).darkBorder} rounded-2xl shadow-lg`}>
          <DialogHeader>
            <DialogTitle className={`${getColumnColor(activeColumn).text} ${getColumnColor(activeColumn).darkText} font-semibold`}>
              Add Task {activeColumn !== null ? `to ${columns[activeColumn].title}` : ''}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Input
                id="task-content-input"
                value={newItemContent}
                onChange={(e) => setNewItemContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What needs to be done? (required)"
                className="bg-white/80 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 transition-colors"
                required
                aria-required="true"
                autoFocus
              />
              {newItemContent.trim() === "" && (
                <p className="text-xs text-red-500 mt-1">Task description is required</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Due date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    min={getDateRestrictions(activeColumn).min}
                    max={getDateRestrictions(activeColumn).max}
                    className="w-full p-2 bg-white/80 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-md"
                    onKeyDown={handleKeyDown}
                  />
                  <Calendar className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  {getDateHelpText(activeColumn) && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {getDateHelpText(activeColumn)}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Priority <span className="text-xs text-gray-500">(required)</span>
                </label>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setNewTaskPriority("low")}
                    className={`flex-1 ${newTaskPriority === "low" ? "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/50 dark:border-green-600" : ""}`}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Low
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setNewTaskPriority("medium")}
                    className={`flex-1 ${newTaskPriority === "medium" ? "bg-yellow-100 border-yellow-500 text-yellow-700 dark:bg-yellow-900/50 dark:border-yellow-600" : ""}`}
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                    Med
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setNewTaskPriority("high")}
                    className={`flex-1 ${newTaskPriority === "high" ? "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/50 dark:border-red-600" : ""}`}
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                    High
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={closeDialog}
              className="border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={addItem}
              disabled={newItemContent.trim() === ""}
              className={`bg-${activeColumn !== null ? (activeColumn === 0 ? "blue" : activeColumn === 1 ? "yellow" : activeColumn === 2 ? "pink" : "green") : "green"}-600 hover:bg-${activeColumn !== null ? (activeColumn === 0 ? "blue" : activeColumn === 1 ? "yellow" : activeColumn === 2 ? "pink" : "green") : "green"}-500 text-white ${newItemContent.trim() === "" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {editingItem && (
        <div className="hidden">
          <Input
            type="text"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                saveEditedItem();
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
