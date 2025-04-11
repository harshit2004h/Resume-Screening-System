import { useState } from "react";
import { CalendarIcon, BellIcon, SearchIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

export function DashboardHeader() {
  const [date, setDate] = useState<Date | undefined>(); // Temporary date selection
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(); // Confirmed interview date

  return (
    <div className="relative">
      {/* Background decorative element - Purple as primary theme */}
      <div className="absolute -top-10 right-0 w-64 h-64 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="px-6 py-5 bg-white dark:bg-gray-900 shadow-md border border-gray-200/50 dark:border-gray-800/50 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section - Primary brand color (purple) */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto">
          <div className="text-center md:text-left w-full md:w-auto">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Welcome back
            </p>
            <h1 className="text-xl font-bold text-purple-700 dark:text-purple-400">
              User Dashboard
            </h1>
          </div>
          
          <div className="text-center md:text-left bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-100 dark:border-gray-700 w-full md:w-auto">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Current Date & Time
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-gray-200">
              {format(new Date(), "PP p")}
            </p>
          </div>
        </div>

        {/* Right Section - Secondary actions with green as accent */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Search Button */}
          <Button
            variant="outline"
            size="icon"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/70"
          >
            <SearchIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </Button>
          
          {/* Notification Button - Purple notification count badge */}
          <Button
            variant="outline"
            size="icon"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/70 relative"
          >
            <BellIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 text-white text-[10px] flex items-center justify-center rounded-full">2</span>
          </Button>
          
          {/* Interview Scheduler - Green accent for actions */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "md:min-w-[200px] flex items-center justify-between text-left font-normal px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-300 dark:hover:border-green-700/50 transition-all duration-200",
                  !selectedDate && "text-gray-500 dark:text-gray-400",
                )}
              >
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <span className="text-sm font-medium truncate">
                    {selectedDate
                      ? format(selectedDate, "PP")
                      : "Schedule Interview"}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 shadow-lg rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Select Interview Date</h3>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="rounded-none border-0"
              />
              <div className="p-2 border-t border-gray-100 dark:border-gray-800">
                <Button
                  onClick={() => setSelectedDate(date)} // Confirm selection
                  variant="default"
                  className="w-full h-9 disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white"
                  disabled={!date}
                >
                  Confirm Date
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
