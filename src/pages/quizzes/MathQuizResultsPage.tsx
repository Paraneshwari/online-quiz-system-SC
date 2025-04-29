
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Download, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock math quiz results data
const quizData = {
  title: "Advanced Mathematics",
  description: "Test your knowledge of advanced mathematical concepts",
  date: "Apr 12, 2025",
  questions: 20,
  submissions: 18,
  avgScore: 72,
  highestScore: 95,
  lowestScore: 42,
  passingRate: 67,
  students: [
    { id: 1, name: "Alex Johnson", score: 85, timeSpent: "18:45", submission: "Apr 13, 2025" },
    { id: 2, name: "Maria Garcia", score: 95, timeSpent: "16:22", submission: "Apr 12, 2025" },
    { id: 3, name: "James Wilson", score: 62, timeSpent: "19:30", submission: "Apr 14, 2025" },
    { id: 4, name: "Sarah Lee", score: 58, timeSpent: "17:15", submission: "Apr 13, 2025" },
    { id: 5, name: "Michael Brown", score: 74, timeSpent: "20:05", submission: "Apr 12, 2025" },
  ],
  questionPerformance: [
    { id: 1, question: "Solve the equation: 2x² + 5x - 3 = 0", correctRate: 65 },
    { id: 2, question: "Find the derivative of f(x) = x³ + 2x² - 4x + 7", correctRate: 72 },
    { id: 3, question: "Calculate the integral of g(x) = 2x + sin(x)", correctRate: 58 },
    { id: 4, question: "If A and B are matrices, when is AB = BA?", correctRate: 45 },
    { id: 5, question: "What is the formula for the area of a circle?", correctRate: 92 },
  ]
};

export default function MathQuizResultsPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{quizData.title}</h1>
            <p className="text-muted-foreground mt-1">{quizData.description}</p>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export Results
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quizData.submissions}</div>
              <p className="text-xs text-muted-foreground">Total responses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quizData.avgScore}%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quizData.passingRate}%</div>
              <p className="text-xs text-muted-foreground">Students who scored 70%+</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Score Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quizData.lowestScore}–{quizData.highestScore}%</div>
              <p className="text-xs text-muted-foreground">Lowest to highest</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students">
          <TabsList>
            <TabsTrigger value="students" className="flex items-center gap-1">
              <Users className="h-4 w-4" /> Student Results
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" /> Question Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Individual student results for this quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Time Spent</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizData.students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.score}%</TableCell>
                        <TableCell>{student.timeSpent}</TableCell>
                        <TableCell>{student.submission}</TableCell>
                        <TableCell>
                          {student.score >= 70 ? (
                            <Badge variant="default">Passed</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive">
                              Failed
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Analysis</CardTitle>
                <CardDescription>Performance breakdown by question</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Correct Response Rate</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizData.questionPerformance.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.question}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  item.correctRate >= 80 
                                    ? "bg-green-500" 
                                    : item.correctRate >= 60 
                                    ? "bg-primary" 
                                    : "bg-destructive"
                                }`} 
                                style={{ width: `${item.correctRate}%` }}
                              ></div>
                            </div>
                            <span>{item.correctRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.correctRate >= 80 ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">Easy</Badge>
                          ) : item.correctRate >= 60 ? (
                            <Badge variant="outline" className="bg-primary/10 text-primary">Moderate</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive">Difficult</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-center">
          <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
        </div>
      </div>
    </PageLayout>
  );
}
