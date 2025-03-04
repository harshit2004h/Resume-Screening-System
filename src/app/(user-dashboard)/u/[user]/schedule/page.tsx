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
};

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [newInterview, setNewInterview] = useState<string>("");

  const addInterview = () => {
    if (date && newInterview) {
      setInterviews([
        ...interviews,
        { id: Date.now().toString(), date: date, title: newInterview },
      ]);
      setNewInterview("");
    }
  };

  const removeInterview = (id: string) => {
    setInterviews(interviews.filter((interview) => interview.id !== id));
  };

  const isDateBusy = (day: Date) => {
    return interviews.some((interview) => isSameDay(interview.date, day));
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4">
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
      <div className="w-1/3 p-4 border-l">
        <h2 className="text-2xl font-bold mb-4">
          Interviews on {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">
              <Plus className="mr-2 h-4 w-4" /> Add Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Interview</DialogTitle>
              <DialogDescription>
                Enter the details for the new interview.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input
                  id="name"
                  value={newInterview}
                  onChange={(e) => setNewInterview(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={addInterview}>
                Add Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <ul className="space-y-2">
          {interviews
            .filter((interview) => date && isSameDay(interview.date, date))
            .map((interview) => (
              <li
                key={interview.id}
                className="flex justify-between items-center p-2 bg-secondary rounded-md"
              >
                <span>{interview.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInterview(interview.id)}
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
