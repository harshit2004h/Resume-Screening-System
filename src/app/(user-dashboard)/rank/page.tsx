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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Rankings</h1>
      <Tabs defaultValue="Overall" className="w-full">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle>{category} Ranking</CardTitle>
                <CardDescription>
                  Your current ranking in the {category.toLowerCase()} category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold text-primary">
                  {/* This would be dynamically fetched in a real application */}
                  #{Math.floor(Math.random() * 100) + 1}
                </div>
                <p>Out of 500 employees</p>
                <div className="text-sm text-muted-foreground">
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
