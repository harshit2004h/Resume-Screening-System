import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Upload } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="space-y-6 p-6 min-h-screen w-full bg-gradient-to-r from-[#D8F9E6] to-[#ECFEF5] dark:from-[#0f1d1b] dark:to-[#132b27]">
      {/* Upload Resume Card */}
      <Card className="bg-white dark:bg-[#1c2d2b] border border-[#CDEBD8] dark:border-[#2f4d49] rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-[#007F3B] dark:text-green-100">
            Upload Resume
          </CardTitle>
          <CardDescription className="text-[#3C6255] dark:text-green-200">
            Upload your existing resume or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-green-50 dark:bg-[#2a4944] hover:bg-green-100 dark:hover:bg-[#2f4d49] border-[#CDEBD8] dark:border-[#3c5e58] transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-[#5B8F77] dark:text-green-300" />
                <p className="mb-2 text-sm text-[#3C6255] dark:text-green-200">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-[#4F7C66] dark:text-green-300">
                  PDF, DOCX (MAX. 5MB)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Edit Resume Card */}
      <Card className="bg-white dark:bg-[#1c2d2b] border border-[#CDEBD8] dark:border-[#2f4d49] rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-[#007F3B] dark:text-green-100">
            Edit Resume
          </CardTitle>
          <CardDescription className="text-[#3C6255] dark:text-green-200">
            Update your resume information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#1B4332] dark:text-green-100">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              className="bg-green-50 dark:bg-[#2a4944] border border-green-200 dark:border-[#3a5f59] text-[#1B4332] dark:text-green-100 placeholder-green-400 dark:placeholder-green-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#1B4332] dark:text-green-100">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="bg-green-50 dark:bg-[#2a4944] border border-green-200 dark:border-[#3a5f59] text-[#1B4332] dark:text-green-100 placeholder-green-400 dark:placeholder-green-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary" className="text-[#1B4332] dark:text-green-100">
              Professional Summary
            </Label>
            <Textarea
              id="summary"
              placeholder="Brief overview of your professional experience and skills"
              className="bg-green-50 dark:bg-[#2a4944] border border-green-200 dark:border-[#3a5f59] text-[#1B4332] dark:text-green-100 placeholder-green-400 dark:placeholder-green-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-[#1B4332] dark:text-green-100">
              Work Experience
            </Label>
            <Textarea
              id="experience"
              placeholder="List your work experience"
              className="bg-green-50 dark:bg-[#2a4944] border border-green-200 dark:border-[#3a5f59] text-[#1B4332] dark:text-green-100 placeholder-green-400 dark:placeholder-green-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="education" className="text-[#1B4332] dark:text-green-100">
              Education
            </Label>
            <Textarea
              id="education"
              placeholder="List your educational background"
              className="bg-green-50 dark:bg-[#2a4944] border border-green-200 dark:border-[#3a5f59] text-[#1B4332] dark:text-green-100 placeholder-green-400 dark:placeholder-green-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills" className="text-[#1B4332] dark:text-green-100">
              Skills
            </Label>
            <Input
              id="skills"
              placeholder="Enter your skills, separated by commas"
              className="bg-green-50 dark:bg-[#2a4944] border border-green-200 dark:border-[#3a5f59] text-[#1B4332] dark:text-green-100 placeholder-green-400 dark:placeholder-green-300"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-[#007F3B] hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 text-white">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
