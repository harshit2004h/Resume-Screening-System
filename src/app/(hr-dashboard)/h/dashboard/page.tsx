"use client";
import { useState } from "react";
import { DashboardHeader } from "@/src/components/hr-dashboard-header";
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
    <div className="h-85% flex flex-col p-4 lg:p-6 bg-white dark:bg-gray-950 my-12 rounded-2xl shadow-lg relative overflow-hidden">
      {/* Primary Theme Color - Purple for decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-86 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-86 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
      
      <DashboardHeader />
      
      {/* Dashboard Stats Overview - Consistent sizing and spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-8">
        {/* Primary purple theme for primary metrics */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium uppercase text-purple-700 dark:text-purple-400">Total Candidates</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">247</p>
          <div className="flex items-center mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
            <p className="text-sm text-purple-600 dark:text-purple-400">+12% from last month</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium uppercase text-purple-700 dark:text-purple-400">Interviews</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">34</p>
          <div className="flex items-center mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
            <p className="text-sm text-purple-600 dark:text-purple-400">Scheduled this week</p>
          </div>
        </div>
        
        {/* Secondary green theme for secondary metrics */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-green-100 dark:border-green-900/20 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium uppercase text-green-700 dark:text-green-400">Job Positions</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">12</p>
          <div className="flex items-center mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            <p className="text-sm text-green-600 dark:text-green-400">Open positions</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-green-100 dark:border-green-900/20 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium uppercase text-green-700 dark:text-green-400">New Applications</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-100">86</p>
          <div className="flex items-center mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            <p className="text-sm text-green-600 dark:text-green-400">+23% from last week</p>
          </div>
        </div>
      </div>
      
      {/* Graphs Section - Improved proportions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Purple theme for the first chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 h-[350px]">
          <h2 className="text-base font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
            <span className="w-1 h-5 bg-purple-500 rounded-full mr-3 inline-block"></span>
            Application Trends
          </h2>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={sampleLineData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
              <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderColor: '#d1d5db',
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ stroke: '#8b5cf6', strokeWidth: 2, fill: 'white', r: 4 }}
                activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Green theme for the second chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-green-100 dark:border-green-900/20 h-[350px]">
          <h2 className="text-base font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
            <span className="w-1 h-5 bg-green-500 rounded-full mr-3 inline-block"></span>
            Department Distribution
          </h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={sampleBarData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
              <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderColor: '#d1d5db',
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }} 
              />
              <Bar 
                dataKey="value" 
                fill="url(#colorBar)" 
                barSize={40}
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Activity Section - Purple theme for main content area */}
      <div className="mt-12 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20">
        <h2 className="text-base font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span className="w-1 h-5 bg-purple-500 rounded-full mr-3 inline-block"></span>
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/30 hover:border-purple-200 dark:hover:border-purple-800/30 transition-colors">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-medium">{item}</span>
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">New candidate application received</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Frontend Developer • {item} hour{item !== 1 ? 's' : ''} ago</p>
              </div>
              <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}