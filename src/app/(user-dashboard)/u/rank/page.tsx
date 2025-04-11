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

export default function RankPage() {
  const categories = [
    "Overall",
    "Technical Skills",
    "Communication",
    "Leadership",
    "Problem Solving",
  ];

  return (
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
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
