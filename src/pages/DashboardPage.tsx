
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, Clock, Calendar, BarChart2, Book, CheckCircle2, Plus, ArrowRight } from "lucide-react";

// Mock data for dashboard
const studentQuizzes = [
  { id: "1", title: "Introduction to Biology", dueDate: "Apr 20, 2025", status: "completed", score: "85%" },
  { id: "2", title: "Chemical Reactions", dueDate: "Apr 25, 2025", status: "upcoming" },
  { id: "3", title: "World History: Ancient Civilizations", dueDate: "Apr 30, 2025", status: "upcoming" },
];

const instructorQuizzes = [
  { id: "1", title: "Introduction to Biology", published: true, responses: 24, avgScore: "76%" },
  { id: "2", title: "Chemical Reactions", published: true, responses: 18, avgScore: "82%" },
  { id: "3", title: "World History: Ancient Civilizations", published: false, responses: 0, avgScore: "N/A" },
];

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <PageLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          {user.role !== "student" && (
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Quiz
            </Button>
          )}
        </div>
        <div className="mt-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StatsCard
                  title={user.role === "student" ? "Quizzes Completed" : "Active Quizzes"}
                  value={user.role === "student" ? "5" : "3"}
                  description={user.role === "student" ? "Out of 12 total" : "Currently published"}
                  icon={<Book className="h-6 w-6 text-quiz-purple" />}
                />
                <StatsCard
                  title={user.role === "student" ? "Average Score" : "Total Responses"}
                  value={user.role === "student" ? "78%" : "42"}
                  description={user.role === "student" ? "Across all quizzes" : "From all quizzes"}
                  icon={<BarChart2 className="h-6 w-6 text-quiz-purple" />}
                />
                <StatsCard
                  title="Upcoming Deadlines"
                  value="2"
                  description="In the next 7 days"
                  icon={<Calendar className="h-6 w-6 text-quiz-purple" />}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{user.role === "student" ? "Recent Activity" : "Recent Quizzes"}</CardTitle>
                  <CardDescription>
                    {user.role === "student" 
                      ? "Your recently completed and upcoming quizzes" 
                      : "Your recently created and published quizzes"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.role === "student" 
                      ? studentQuizzes.map((quiz) => (
                          <StudentQuizItem key={quiz.id} quiz={quiz} />
                        ))
                      : instructorQuizzes.map((quiz) => (
                          <InstructorQuizItem key={quiz.id} quiz={quiz} />
                        ))
                    }
                  </div>
                  <Button variant="ghost" className="w-full mt-4 gap-2">
                    View all quizzes <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="quizzes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Quizzes</CardTitle>
                  <CardDescription>
                    {user.role === "student" 
                      ? "Browse all your assigned quizzes" 
                      : "Manage your created quizzes"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This section will display a comprehensive list of all quizzes with filtering and sorting options.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="progress" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Tracking</CardTitle>
                  <CardDescription>
                    {user.role === "student" 
                      ? "Track your performance and improvement over time" 
                      : "Monitor student progress and performance metrics"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This section will display charts and metrics showing performance trends over time.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
}

function StatsCard({ title, value, description, icon }: { title: string; value: string; description: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StudentQuizItem({ quiz }: { quiz: any }) {
  return (
    <div className="flex items-center justify-between p-4 border border-border/40 rounded-lg">
      <div className="flex items-center gap-3">
        {quiz.status === "completed" ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Clock className="h-5 w-5 text-quiz-purple" />
        )}
        <div>
          <h4 className="font-medium">{quiz.title}</h4>
          <p className="text-sm text-muted-foreground">Due: {quiz.dueDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {quiz.status === "completed" ? (
          <div className="text-sm font-semibold">{quiz.score}</div>
        ) : (
          <Button variant="outline" size="sm" className="gap-1">
            <PlayCircle className="h-4 w-4" />
            Start
          </Button>
        )}
      </div>
    </div>
  );
}

function InstructorQuizItem({ quiz }: { quiz: any }) {
  return (
    <div className="flex items-center justify-between p-4 border border-border/40 rounded-lg">
      <div>
        <h4 className="font-medium flex items-center gap-2">
          {quiz.title}
          {!quiz.published && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Draft</span>}
        </h4>
        <p className="text-sm text-muted-foreground">
          {quiz.published 
            ? `${quiz.responses} responses · Avg: ${quiz.avgScore}` 
            : "Not published yet"}
        </p>
      </div>
      <Button variant="outline" size="sm">
        {quiz.published ? "View Results" : "Edit"}
      </Button>
    </div>
  );
}
