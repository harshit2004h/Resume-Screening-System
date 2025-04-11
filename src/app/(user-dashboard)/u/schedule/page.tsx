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
import { toast } from "sonner";

type Interview = {
  id: string;
  date: Date;
  title: string;
  startTime: string;
  endTime: string;
};

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [newInterview, setNewInterview] = useState<string>("");
  const [newInterviewStartTime, setNewInterviewStartTime] = useState<string>("");
  const [newInterviewEndTime, setNewInterviewEndTime] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateInterviewInterval = (
    newStartTime: string,
    newEndTime: string
  ) => {
    if (!date) return false;

    const newStartDateTime = new Date(`${format(date, "yyyy-MM-dd")}T${newStartTime}`);
    const newEndDateTime = new Date(`${format(date, "yyyy-MM-dd")}T${newEndTime}`);

    if (isAfter(newStartDateTime, newEndDateTime)) {
      setError("End time must be after start time.");
      return false;
    }

    const meetingDuration = differenceInMinutes(newEndDateTime, newStartDateTime);
    if (meetingDuration < 30) {
      setError("Meetings must be at least 30 minutes long.");
      return false;
    }

    const existingInterviewsOnSameDay = interviews.filter((interview) =>
      isSameDay(interview.date, date)
    );

    for (const interview of existingInterviewsOnSameDay) {
      const existingStartDateTime = new Date(
        `${format(interview.date, "yyyy-MM-dd")}T${interview.startTime}`
      );
      const existingEndDateTime = new Date(
        `${format(interview.date, "yyyy-MM-dd")}T${interview.endTime}`
      );

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

      const gapBefore = differenceInMinutes(newStartDateTime, existingEndDateTime);
      const gapAfter = differenceInMinutes(existingStartDateTime, newEndDateTime);

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
      if (!validateInterviewInterval(newInterviewStartTime, newInterviewEndTime)) {
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
      toast.success("Interview added successfully!");
      setNewInterview("");
      setNewInterviewStartTime("");
      setNewInterviewEndTime("");
      setIsDialogOpen(false);
    }
  };

  const removeInterview = (id: string) => {
    setInterviews(interviews.filter((interview) => interview.id !== id));
    toast.error("Interview removed.");
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
<<<<<<< HEAD
    <div className="flex h-full p-12 gap-8 bg-gradient-to-r from-[#ECFDF5] via-[#6EE7B7] to-[#047857]">
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-emerald-800">Schedule an Interview</h2>
=======
    <div className="flex flex-col lg:flex-row gap-8 p-6 my-10">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/20 p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span className="w-1 h-5 bg-purple-500 rounded-full mr-3 inline-block"></span>
          Schedule an Interview
        </h2>
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
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
<<<<<<< HEAD
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-emerald-800">
=======
      
      <div className="lg:w-2/5 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-green-100 dark:border-green-900/20 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span className="w-1 h-5 bg-green-500 rounded-full mr-3 inline-block"></span>
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
          Interviews on {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
        </h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
<<<<<<< HEAD
              className="mb-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
=======
              className="mb-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center"
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 rounded-xl shadow-md border border-green-100 dark:border-green-900/20">
            <DialogHeader>
<<<<<<< HEAD
              <DialogTitle className="text-2xl font-bold text-emerald-800 text-center">
                Add New Interview
=======
              <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Schedule New Interview
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Enter the details for the new interview appointment.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="name" className="text-lg font-semibold text-emerald-800">
                  Title
=======
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <UserRound className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                  Candidate Name
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
                </Label>
                <Input
                  id="name"
                  value={newInterview}
                  onChange={(e) => setNewInterview(e.target.value)}
                  onKeyPress={handleKeyPress}
<<<<<<< HEAD
                  className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter interview title"
=======
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter candidate name"
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
<<<<<<< HEAD
                  <Label htmlFor="startTime" className="text-lg font-semibold text-emerald-800">
=======
                  <Label
                    htmlFor="startTime"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
                    Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newInterviewStartTime}
                    onChange={(e) => setNewInterviewStartTime(e.target.value)}
<<<<<<< HEAD
                    className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-lg font-semibold text-emerald-800">
=======
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="endTime"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
                    End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newInterviewEndTime}
                    onChange={(e) => setNewInterviewEndTime(e.target.value)}
<<<<<<< HEAD
                    className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
=======
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
                  />
                </div>
              </div>
              {error && (
<<<<<<< HEAD
                <div className="text-sm text-red-600 font-medium mt-2 flex items-center gap-2 justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
=======
                <div className="text-sm text-red-600 dark:text-red-400 font-medium mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
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
<<<<<<< HEAD
                className="w-full h-11 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
=======
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={!newInterview || !newInterviewStartTime || !newInterviewEndTime}
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
              >
                Schedule Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
<<<<<<< HEAD
        <ul className="space-y-3 mt-6">
          {interviews
            .filter((interview) => date && isSameDay(interview.date, date))
            .map((interview) => (
              <li
                key={interview.id}
                className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-emerald-700">
                    {format(interview.date, "MMMM d, yyyy")} from {interview.startTime} to {interview.endTime}
                  </span>
                  <span className="text-emerald-900 font-medium text-lg">{interview.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInterview(interview.id)}
                  className="text-red-600 hover:bg-red-50"
=======
        
        {interviews.filter((interview) => date && isSameDay(interview.date, date)).length > 0 ? (
          <ul className="space-y-3">
            {interviews
              .filter((interview) => date && isSameDay(interview.date, date))
              .map((interview) => (
                <li
                  key={interview.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/30 hover:border-green-200 dark:hover:border-green-800/30 transition-colors"
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
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