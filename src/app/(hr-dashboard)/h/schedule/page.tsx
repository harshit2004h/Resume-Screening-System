"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  format,
  isSameDay,
  isBefore,
  isAfter,
  differenceInMinutes,
} from "date-fns";
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
  startTime: string; // Start time of the meeting
  endTime: string; // End time of the meeting
};

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [newInterview, setNewInterview] = useState<string>("");
  const [newInterviewStartTime, setNewInterviewStartTime] =
    useState<string>(""); // Start time input
  const [newInterviewEndTime, setNewInterviewEndTime] = useState<string>(""); // End time input
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to control dialog open/close
  const [error, setError] = useState<string | null>(null); // State to handle error messages

  const validateInterviewInterval = (
    newStartTime: string,
    newEndTime: string,
  ) => {
    if (!date) return false;

    const newStartDateTime = new Date(
      `${format(date, "yyyy-MM-dd")}T${newStartTime}`,
    );
    const newEndDateTime = new Date(
      `${format(date, "yyyy-MM-dd")}T${newEndTime}`,
    );

    // Ensure the end time is after the start time
    if (isAfter(newStartDateTime, newEndDateTime)) {
      setError("End time must be after start time.");
      return false;
    }

    // Ensure the meeting duration is at least 30 minutes
    const meetingDuration = differenceInMinutes(
      newEndDateTime,
      newStartDateTime,
    );
    if (meetingDuration < 30) {
      setError("Meetings must be at least 30 minutes long.");
      return false;
    }

    // Check for overlaps with existing meetings
    const existingInterviewsOnSameDay = interviews.filter((interview) =>
      isSameDay(interview.date, date),
    );

    for (const interview of existingInterviewsOnSameDay) {
      const existingStartDateTime = new Date(
        `${format(interview.date, "yyyy-MM-dd")}T${interview.startTime}`,
      );
      const existingEndDateTime = new Date(
        `${format(interview.date, "yyyy-MM-dd")}T${interview.endTime}`,
      );

      // Check if the new meeting overlaps with an existing meeting
      if (
        (isAfter(newStartDateTime, existingStartDateTime) &&
          isBefore(newStartDateTime, existingEndDateTime)) ||
        (isAfter(newEndDateTime, existingStartDateTime) &&
          isBefore(newEndDateTime, existingEndDateTime)) ||
        (isBefore(newStartDateTime, existingStartDateTime) &&
          isAfter(newEndDateTime, existingEndDateTime))
      ) {
        setError("This time interval overlaps with an existing meeting.");
        return false;
      }

      // Ensure a 30-minute gap before and after the new meeting
      const gapBefore = differenceInMinutes(
        newStartDateTime,
        existingEndDateTime,
      );
      const gapAfter = differenceInMinutes(
        existingStartDateTime,
        newEndDateTime,
      );

      if (gapBefore < 30 || gapAfter < 30) {
        setError("There must be a 30-minute gap between meetings.");
        return false;
      }
    }

    setError(null);
    return true;
  };

  const addInterview = () => {
    if (date && newInterview && newInterviewStartTime && newInterviewEndTime) {
      if (
        !validateInterviewInterval(newInterviewStartTime, newInterviewEndTime)
      ) {
        return;
      }

      setInterviews([
        ...interviews,
        {
          id: Date.now().toString(),
          date: date,
          title: newInterview,
          startTime: newInterviewStartTime,
          endTime: newInterviewEndTime,
        },
      ]);
      setNewInterview("");
      setNewInterviewStartTime("");
      setNewInterviewEndTime("");
      setIsDialogOpen(false);
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
      addInterview();
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
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800 text-center">
                Add New Interview
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-center">
                Enter the details for the new interview:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Title Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-lg font-semibold text-gray-800"
                >
                  Title
                </Label>
                <Input
                  id="name"
                  value={newInterview}
                  onChange={(e) => setNewInterview(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter interview title"
                />
              </div>

              {/* Start and End Time Inputs */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="startTime"
                    className="text-lg font-semibold text-gray-800"
                  >
                    Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newInterviewStartTime}
                    onChange={(e) => setNewInterviewStartTime(e.target.value)}
                    className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="endTime"
                    className="text-lg font-semibold text-gray-800"
                  >
                    End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newInterviewEndTime}
                    onChange={(e) => setNewInterviewEndTime(e.target.value)}
                    className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-sm text-red-600 font-medium mt-2 flex items-center gap-2 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={addInterview}
                className="w-full h-11 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                    {format(interview.date, "MMMM d, yyyy")} from{" "}
                    {interview.startTime} to {interview.endTime}
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
