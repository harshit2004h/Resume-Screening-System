"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

type Interview = {
  id: string;
  date: Date;
  title: string;
  time: string; // Add time field
};

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [newInterview, setNewInterview] = useState<string>("");
  const [newInterviewTime, setNewInterviewTime] = useState<string>(""); // State for time input
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to control dialog open/close

  const addInterview = () => {
    if (date && newInterview && newInterviewTime) {
      setInterviews([
        ...interviews,
        {
          id: Date.now().toString(),
          date: date,
          title: newInterview,
          time: newInterviewTime, // Include time in the interview object
        },
      ]);
      setNewInterview("");
      setNewInterviewTime(""); // Reset time input
      setIsDialogOpen(false); // Close the dialog after adding the interview
    }
  };

  const removeInterview = (id: string) => {
    setInterviews(interviews.filter((interview) => interview.id !== id));
  };

  const isDateBusy = (day: Date) => {
    return interviews.some((interview) => isSameDay(interview.date, day));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addInterview(); // This will also close the dialog
    }
  };

  return (
    <div className="flex h-full p-12 gap-8">
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Schedule an Interview
        </h2>
        <div className="flex justify-center w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
            modifiers={{ busy: isDateBusy }}
            modifiersStyles={{
              busy: {
                backgroundColor: "rgba(220, 38, 38, 0.1)",
                color: "#DC2626",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </div>
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Interviews on {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="mb-6 w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsDialogOpen(true)} // Open the dialog
            >
              <Plus className="mr-2 h-4 w-4" /> Add Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-md">
            <DialogHeader>
              <DialogTitle className="text-xxl font-bold text-gray-800">
                Add New Interview
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Enter the details for the new interview:
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap- py-4">
              <div className="grid items-center gap-4">
                <Label htmlFor="name" className="text-xl text-left text-gray-700">
                  Title
                </Label>
                <Input
                  id="name"
                  value={newInterview}
                  onChange={(e) => setNewInterview(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="grid-cols-8 col-span-3 h-10  w-full"
                  placeholder="Enter interview title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-xl text-left text-gray-700">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newInterviewTime}
                  onChange={(e) => setNewInterviewTime(e.target.value)}
                  className="col-span-3 h-10 w-full"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={addInterview}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <ul className="space-y-3 mt-6">
          {interviews
            .filter((interview) => date && isSameDay(interview.date, date))
            .map((interview) => (
              <li
                key={interview.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-150 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">
                    {format(interview.date, "MMMM d, yyyy")} at {interview.time}
                  </span>
                  <span className="text-gray-700 font-medium text-lg">
                    {interview.title}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInterview(interview.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}