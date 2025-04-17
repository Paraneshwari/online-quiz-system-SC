
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { FileBarChart, FileText, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for reports
const performanceData = [
  { subject: "Biology", avgScore: 76, quizCount: 3, completionRate: 85 },
  { subject: "Chemistry", avgScore: 82, quizCount: 2, completionRate: 92 },
  { subject: "Physics", avgScore: 68, quizCount: 2, completionRate: 74 },
  { subject: "Math", avgScore: 91, quizCount: 3, completionRate: 96 },
  { subject: "History", avgScore: 84, quizCount: 2, completionRate: 88 },
];

const timeAnalysisData = [
  { quizName: "Introduction to Biology", avgTime: "14:35", quickest: "08:22", longest: "24:12" },
  { quizName: "Chemical Reactions", avgTime: "18:44", quickest: "11:07", longest: "28:56" },
  { quizName: "Cell Structure", avgTime: "12:28", quickest: "07:15", longest: "22:40" },
  { quizName: "Forces and Motion", avgTime: "20:12", quickest: "12:38", longest: "32:17" },
];

export default function ReportsPage() {
  const { user } = useAuth();

  if (!user || (user.role !== "admin" && user.role !== "instructor")) {
    return (
      <PageLayout>
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="mt-2">You don't have permission to view this page.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold tracking-tight">Detailed Reports</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive analytics and reports for all quizzes and students
        </p>

        <Tabs defaultValue="performance" className="mt-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="time-analysis">Time Analysis</TabsTrigger>
            <TabsTrigger value="question-stats">Question Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileBarChart className="h-5 w-5 text-primary" />
                    Subject Performance
                  </CardTitle>
                  <CardDescription>
                    Average scores and completion rates by subject
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">Export Data</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Quiz Count</TableHead>
                      <TableHead>Completion Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.subject}</TableCell>
                        <TableCell>{item.avgScore}%</TableCell>
                        <TableCell>{item.quizCount}</TableCell>
                        <TableCell>{item.completionRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="time-analysis" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Time Analysis
                  </CardTitle>
                  <CardDescription>
                    Time spent by students on each quiz
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">Export Data</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quiz Name</TableHead>
                      <TableHead>Average Time</TableHead>
                      <TableHead>Quickest Completion</TableHead>
                      <TableHead>Longest Completion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeAnalysisData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.quizName}</TableCell>
                        <TableCell>{item.avgTime}</TableCell>
                        <TableCell>{item.quickest}</TableCell>
                        <TableCell>{item.longest}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="question-stats" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Question Statistics
                  </CardTitle>
                  <CardDescription>
                    Individual question performance analysis
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">Export Data</Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select a specific quiz from the dropdown to view question statistics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
