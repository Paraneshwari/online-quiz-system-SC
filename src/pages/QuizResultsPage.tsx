
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Download, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock quiz data
const quizData = {
  "1": {
    title: "Introduction to Biology",
    description: "Basic principles of biology for beginners",
    date: "Apr 15, 2025",
    questions: 15,
    submissions: 24,
    avgScore: 76,
    highestScore: 98,
    lowestScore: 45,
    passingRate: 83,
    students: [
      { id: 1, name: "Alex Johnson", score: 92, timeSpent: "12:34", submission: "Apr 16, 2025" },
      { id: 2, name: "Maria Garcia", score: 88, timeSpent: "15:21", submission: "Apr 15, 2025" },
      { id: 3, name: "James Wilson", score: 76, timeSpent: "18:05", submission: "Apr 16, 2025" },
      { id: 4, name: "Sarah Lee", score: 65, timeSpent: "14:42", submission: "Apr 17, 2025" },
      { id: 5, name: "Michael Brown", score: 93, timeSpent: "11:18", submission: "Apr 15, 2025" },
    ],
    questionPerformance: [
      { id: 1, question: "What is the basic unit of life?", correctRate: 92 },
      { id: 2, question: "Which organelle is responsible for photosynthesis?", correctRate: 88 },
      { id: 3, question: "What is the function of mitochondria?", correctRate: 45 },
      { id: 4, question: "Name the process by which cells divide.", correctRate: 76 },
      { id: 5, question: "What is DNA?", correctRate: 94 },
    ]
  },
  "2": {
    title: "Chemical Reactions",
    description: "Understanding basic chemical reactions",
    date: "Apr 25, 2025",
    questions: 20,
    submissions: 0,
    avgScore: 0,
    highestScore: 0,
    lowestScore: 0,
    passingRate: 0,
    students: [],
    questionPerformance: []
  },
  "3": {
    title: "Cell Structure",
    description: "Detailed study of cell structure and components",
    date: "Apr 10, 2025",
    questions: 15,
    submissions: 28,
    avgScore: 85,
    highestScore: 100,
    lowestScore: 62,
    passingRate: 96,
    students: [
      { id: 1, name: "Alex Johnson", score: 85, timeSpent: "14:22", submission: "Apr 8, 2025" },
      { id: 2, name: "Maria Garcia", score: 92, timeSpent: "13:45", submission: "Apr 9, 2025" },
      { id: 3, name: "James Wilson", score: 78, timeSpent: "16:30", submission: "Apr 8, 2025" },
      { id: 4, name: "Sarah Lee", score: 88, timeSpent: "12:10", submission: "Apr 10, 2025" },
      { id: 5, name: "Michael Brown", score: 100, timeSpent: "15:05", submission: "Apr 9, 2025" },
    ],
    questionPerformance: [
      { id: 1, question: "What is the cell membrane composed of?", correctRate: 89 },
      { id: 2, question: "What is the function of the nucleus?", correctRate: 94 },
      { id: 3, question: "Define the endoplasmic reticulum.", correctRate: 76 },
      { id: 4, question: "How do lysosomes function?", correctRate: 82 },
      { id: 5, question: "What are ribosomes responsible for?", correctRate: 88 },
    ]
  }
};

export default function QuizResultsPage() {
  const { id } = useParams<{ id: string }>();
  
  const quiz = id ? quizData[id as keyof typeof quizData] : null;

  if (!quiz) {
    return (
      <PageLayout>
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold">Quiz Not Found</h1>
          <p className="mt-2">The quiz you are looking for does not exist or has no results yet.</p>
          <Button className="mt-4" asChild>
            <Link to="/quizzes">Return to Quizzes</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{quiz.title}</h1>
            <p className="text-muted-foreground mt-1">{quiz.description}</p>
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
              <div className="text-2xl font-bold">{quiz.submissions}</div>
              <p className="text-xs text-muted-foreground">Total responses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quiz.avgScore}%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quiz.passingRate}%</div>
              <p className="text-xs text-muted-foreground">Students who scored 70%+</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Score Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quiz.lowestScore}–{quiz.highestScore}%</div>
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
                    {quiz.students.map((student) => (
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
                    {quiz.questionPerformance.map((item) => (
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
      </div>
    </PageLayout>
  );
}
