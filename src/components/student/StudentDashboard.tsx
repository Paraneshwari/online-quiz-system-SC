
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for student dashboard
const upcomingQuizzes = [
  { 
    id: "1", 
    title: "Introduction to Biology", 
    subject: "Biology",
    dueDate: "Apr 20, 2025", 
    timeLeft: "3 days" 
  },
  { 
    id: "2", 
    title: "Chemical Reactions", 
    subject: "Chemistry",
    dueDate: "Apr 25, 2025", 
    timeLeft: "8 days" 
  },
];

const completedQuizzes = [
  { 
    id: "3", 
    title: "Cell Structure", 
    subject: "Biology",
    completedDate: "Apr 10, 2025", 
    score: 85, 
    totalQuestions: 15, 
    correctAnswers: 13 
  },
  { 
    id: "4", 
    title: "Forces and Motion", 
    subject: "Physics",
    completedDate: "Apr 5, 2025", 
    score: 92, 
    totalQuestions: 20, 
    correctAnswers: 18 
  },
  { 
    id: "5", 
    title: "Ancient Civilizations", 
    subject: "History",
    completedDate: "Mar 28, 2025", 
    score: 78, 
    totalQuestions: 25, 
    correctAnswers: 19 
  },
];

export function StudentDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {user.name}</h1>
        <p className="text-muted-foreground">
          Your student dashboard shows upcoming quizzes and recent performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming
            </CardTitle>
            <CardDescription>Quizzes due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingQuizzes.length > 0 ? (
                upcomingQuizzes.map((quiz) => (
                  <div 
                    key={quiz.id} 
                    className="border border-border rounded-lg p-3 hover:border-primary/50 transition-colors"
                  >
                    <div className="font-medium mb-1 line-clamp-1">{quiz.title}</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{quiz.subject}</span>
                      <span className="text-primary">{quiz.timeLeft} left</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  No upcoming quizzes
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Recent Results
                </CardTitle>
                <CardDescription>Your recent quiz performance</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/all-quizzes" className="flex items-center gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedQuizzes.length > 0 ? (
                completedQuizzes.map((quiz) => (
                  <div 
                    key={quiz.id} 
                    className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium mb-1">{quiz.title}</div>
                        <div className="text-sm text-muted-foreground">{quiz.subject} • Completed {quiz.completedDate}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-semibold ${
                          quiz.score >= 90 ? "text-green-500" : 
                          quiz.score >= 70 ? "text-primary" : 
                          "text-amber-500"
                        }`}>
                          {quiz.score}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {quiz.correctAnswers}/{quiz.totalQuestions} correct
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          quiz.score >= 90 ? "bg-green-500" : 
                          quiz.score >= 70 ? "bg-primary" : 
                          "bg-amber-500"
                        }`}
                        style={{ width: `${quiz.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No completed quizzes yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle>Performance by Topic</CardTitle>
            <CardDescription>Your quiz results by subject area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-12 bg-primary rounded"></div>
                  <div>
                    <div className="font-medium">Biology</div>
                    <div className="text-sm text-muted-foreground">2 quizzes</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-[200px] bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                  <div className="text-right min-w-[40px]">82%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-12 bg-green-500 rounded"></div>
                  <div>
                    <div className="font-medium">Physics</div>
                    <div className="text-sm text-muted-foreground">1 quiz</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-[200px] bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <div className="text-right min-w-[40px]">92%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-12 bg-amber-500 rounded"></div>
                  <div>
                    <div className="font-medium">History</div>
                    <div className="text-sm text-muted-foreground">1 quiz</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-[200px] bg-muted rounded-full h-2.5">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <div className="text-right min-w-[40px]">78%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Study Suggestions</CardTitle>
            <CardDescription>Areas to focus on</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-3 py-1">
                <div className="font-medium">History: Dates & Timelines</div>
                <p className="text-sm text-muted-foreground">
                  Your recent quiz scores show this as an area for improvement.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-3 py-1">
                <div className="font-medium">Biology: Cell Function</div>
                <p className="text-sm text-muted-foreground">
                  Review cell organelles and their functions.
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/study-resources">View Study Resources</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
