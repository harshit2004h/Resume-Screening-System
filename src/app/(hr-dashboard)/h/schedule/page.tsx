"use client";

import { useState } from "react";
import { Plus, Trash2, Clock, Calendar as CalendarIcon, UserRound } from "lucide-react";
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
    <div className="flex flex-col lg:flex-row gap-8 p-6 my-10">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span className="w-1 h-5 bg-purple-500 rounded-full mr-3 inline-block"></span>
          Schedule an Interview
        </h2>
        <div className="flex justify-center w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-gray-200 dark:border-gray-800/50 shadow-sm bg-white dark:bg-gray-900"
            modifiers={{ busy: isDateBusy }}
            modifiersStyles={{
              busy: {
                backgroundColor: "rgba(147, 51, 234, 0.1)",
                color: "#9333ea",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </div>
      
      <div className="lg:w-2/5 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-green-100 dark:border-green-900/20 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span className="w-1 h-5 bg-green-500 rounded-full mr-3 inline-block"></span>
          Interviews on {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
        </h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="mb-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 rounded-xl shadow-md border border-green-100 dark:border-green-900/20">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Schedule New Interview
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Enter the details for the new interview appointment.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Title Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <UserRound className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                  Candidate Name
                </Label>
                <Input
                  id="name"
                  value={newInterview}
                  onChange={(e) => setNewInterview(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter candidate name"
                />
              </div>

              {/* Start and End Time Inputs */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="startTime"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                    Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newInterviewStartTime}
                    onChange={(e) => setNewInterviewStartTime(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="endTime"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                    End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newInterviewEndTime}
                    onChange={(e) => setNewInterviewEndTime(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-sm text-red-600 dark:text-red-400 font-medium mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30 flex items-center gap-2">
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
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={!newInterview || !newInterviewStartTime || !newInterviewEndTime}
              >
                Schedule Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {interviews.filter((interview) => date && isSameDay(interview.date, date)).length > 0 ? (
          <ul className="space-y-3">
            {interviews
              .filter((interview) => date && isSameDay(interview.date, date))
              .map((interview) => (
                <li
                  key={interview.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/30 hover:border-green-200 dark:hover:border-green-800/30 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {interview.title}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span>{format(interview.date, "MMMM d, yyyy")}</span>
                        <span className="mx-1">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span>
                          {interview.startTime} - {interview.endTime}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInterview(interview.id)}
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            <CalendarIcon className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No interviews scheduled for this day</p>
            <p className="text-sm mt-1">Click the button above to add one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
