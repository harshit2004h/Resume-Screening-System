import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Award, ArrowUp, ArrowDown, TrendingUp, Users, Code, MessagesSquare, PenTool } from "lucide-react";

export default function RankPage() {
  const categories = [
    { id: "Overall", label: "Overall", icon: Award, color: "purple", rank: 87, change: "+5" },
    { id: "TechnicalSkills", label: "Technical Skills", icon: Code, color: "green", rank: 92, change: "+8" },
    { id: "Communication", label: "Communication", icon: MessagesSquare, color: "purple", rank: 78, change: "-2" },
    { id: "Leadership", label: "Leadership", icon: Users, color: "green", rank: 85, change: "+3" },
    { id: "ProblemSolving", label: "Problem Solving", icon: PenTool, color: "purple", rank: 90, change: "+7" },
  ];

  return (
<<<<<<< HEAD
    <div className="space-y-6 p-6 min-h-screen w-full bg-gradient-to-r from-[#D8F9E6] to-[#ECFEF5] dark:from-[#0f1d1b] dark:to-[#132b27]">
      <h1 className="text-3xl font-bold text-[#007F3B] dark:text-green-100">
        Your Rankings
      </h1>
      <Tabs defaultValue="Overall" className="w-full">
        <TabsList className="bg-[#E3FCEF] dark:bg-[#25443f] rounded-xl p-1 flex flex-wrap gap-2 border border-[#CDEBD8] dark:border-[#3a5f59]">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-[#007F3B] data-[state=active]:text-white dark:data-[state=active]:bg-green-700 dark:data-[state=active]:text-white px-4 py-2 rounded-lg text-[#1B4332] dark:text-green-100 hover:bg-[#d4f7e3] dark:hover:bg-[#2a534c]"
            >
              {category}
=======
    <div className="min-h-screen flex flex-col p-4 lg:p-6 bg-white dark:bg-gray-950">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100/30 dark:bg-green-900/10 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Header */}
      <div className="mb-6 mt-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">Your Rankings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View your current ranking and performance across different categories
        </p>
      </div>
      
      {/* Overall Ranking Card */}
      <Card className="bg-white dark:bg-gray-900 shadow-md border border-purple-100 dark:border-purple-900/20 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Overall Ranking</h2>
                <p className="text-gray-600 dark:text-gray-400">Top 15% among all candidates</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                #87
              </div>
              <div className="text-sm flex items-center justify-center mt-1 text-green-600 dark:text-green-400">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+5 this month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="Overall" className="w-full">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-6">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className={`data-[state=active]:bg-${category.color === "purple" ? "purple" : "green"}-100 data-[state=active]:dark:bg-${category.color === "purple" ? "purple" : "green"}-900/20 data-[state=active]:text-${category.color === "purple" ? "purple" : "green"}-700 data-[state=active]:dark:text-${category.color === "purple" ? "purple" : "green"}-400`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
<<<<<<< HEAD
          <TabsContent key={category} value={category}>
            <Card className="bg-white dark:bg-[#1c2d2b] border border-[#CDEBD8] dark:border-[#2f4d49] rounded-2xl shadow-md mt-4">
              <CardHeader>
                <CardTitle className="text-[#007F3B] dark:text-green-100">
                  {category} Ranking
                </CardTitle>
                <CardDescription className="text-[#3C6255] dark:text-green-200">
                  Your current ranking in the {category.toLowerCase()} category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold text-[#007F3B] dark:text-green-200">
                  #{Math.floor(Math.random() * 100) + 1}
                </div>
                <p className="text-[#1B4332] dark:text-green-100">
                  Out of 500 employees
                </p>
                <div className="text-sm text-muted-foreground dark:text-green-300">
                  Last updated: {new Date().toLocaleDateString()}
=======
          <TabsContent key={category.id} value={category.id}>
            <Card className={`bg-white dark:bg-gray-900 shadow-md border border-${category.color === "purple" ? "purple" : "green"}-100 dark:border-${category.color === "purple" ? "purple" : "green"}-900/20`}>
              <CardHeader className={`bg-${category.color === "purple" ? "purple" : "green"}-50/50 dark:bg-${category.color === "purple" ? "purple" : "green"}-900/10 border-b border-${category.color === "purple" ? "purple" : "green"}-100 dark:border-${category.color === "purple" ? "purple" : "green"}-900/20`}>
                <div className="flex items-center">
                  <div className={`p-2 bg-${category.color === "purple" ? "purple" : "green"}-100 dark:bg-${category.color === "purple" ? "purple" : "green"}-900/20 rounded-lg mr-3`}>
                    <category.icon className={`w-5 h-5 text-${category.color === "purple" ? "purple" : "green"}-600 dark:text-${category.color === "purple" ? "purple" : "green"}-400`} />
                  </div>
                  <div>
                    <CardTitle className="text-gray-800 dark:text-gray-200">{category.label} Ranking</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Your current ranking in the {category.label.toLowerCase()} category
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-5xl font-bold text-gray-800 dark:text-gray-200">
                      #{category.rank}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Out of 500 candidates</p>
                  </div>
                  <div className={`flex flex-col items-center justify-center p-4 bg-${category.color === "purple" ? "purple" : "green"}-50 dark:bg-${category.color === "purple" ? "purple" : "green"}-900/10 rounded-lg`}>
                    <div className={`text-xl font-bold ${
                      category.change.startsWith("+") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}>
                      {category.change}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">This month</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Improvement Tips:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Complete your profile to improve visibility</li>
                    <li>Add more details to your work experience</li>
                    <li>Update your skills with the latest technologies</li>
                    <li>Take skill assessments to validate your expertise</li>
                  </ul>
>>>>>>> 15a04a4ebc224d4992a9365ffd4d10cb6e64eefa
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
