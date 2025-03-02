import { useState } from "react";
import { CalendarIcon } from "lucide-react";
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
    <div className="mt-10 px-8 py-6 bg-white/80 dark:bg-[#0d0d0d] backdrop-blur-lg shadow-md border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col md:flex-row items-center justify-between w-full">
      {/* Left Section */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <Button
          variant="outline"
          className="bg-black hover:bg-gray-800 text-white shadow-md transition-all duration-200"
        >
          View Rank
        </Button>
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Current Date & Time
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-200">
            {format(new Date(), "PP p")}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-4 md:mt-0">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Upcoming Interview
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[300px] flex items-center justify-between text-left font-normal px-4 py-2 bg-white/70 dark:bg-[#0d0d0d] backdrop-blur-md shadow-sm rounded-lg transition-all duration-200",
                !selectedDate && "text-gray-400 dark:text-gray-500",
              )}
            >
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                  {selectedDate
                    ? format(selectedDate, "PPP")
                    : "No date selected"}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 shadow-lg rounded-lg bg-white/90 dark:bg-[#171717] backdrop-blur-md border border-gray-200 dark:border-gray-700">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
            <Button
              onClick={() => setSelectedDate(date)} // Confirm selection
              variant="outline"
              className="mt-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!date}
            >
              Confirm Date
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
