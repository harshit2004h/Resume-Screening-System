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
import { Upload, FileText } from "lucide-react";

export default function ResumePage() {
  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen flex flex-col p-4 lg:p-6 bg-white dark:bg-gray-950">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Header */}
      <div className="mb-8 mt-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">Resume Builder</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your resume or create a new one to increase your chances of being noticed
        </p>
      </div>
      
      <div className="space-y-6">
        <Card className="bg-white dark:bg-gray-900 shadow-md border border-purple-100 dark:border-purple-900/20">
          <CardHeader className="bg-purple-50/50 dark:bg-purple-900/10 border-b border-purple-100 dark:border-purple-900/20">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg mr-3">
                <Upload className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-gray-800 dark:text-gray-200">Upload Resume</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Upload your existing resume or create a new one
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-purple-200 dark:border-purple-800/40"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-4 text-purple-500 dark:text-purple-400" />
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, DOCX (MAX. 5MB)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-900 shadow-md border border-green-100 dark:border-green-900/20">
          <CardHeader className="bg-green-50/50 dark:bg-green-900/10 border-b border-green-100 dark:border-green-900/20">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mr-3">
                <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-gray-800 dark:text-gray-200">Resume Details</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Update your resume information to improve your ranking
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-gray-700 dark:text-gray-300">Professional Summary</Label>
              <Textarea
                id="summary"
                placeholder="Brief overview of your professional experience and skills"
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-gray-700 dark:text-gray-300">Work Experience</Label>
              <Textarea 
                id="experience" 
                placeholder="List your work experience" 
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education" className="text-gray-700 dark:text-gray-300">Education</Label>
              <Textarea
                id="education"
                placeholder="List your educational background"
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-gray-700 dark:text-gray-300">Skills</Label>
              <Input
                id="skills"
                placeholder="Enter your skills, separated by commas"
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end px-6 py-4 border-t border-gray-100 dark:border-gray-800">
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
    </div>
  );
}
