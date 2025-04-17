
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, Clock, Calendar, BarChart2, Book, CheckCircle2, Plus, ArrowRight, Users, FilePlus, Settings, BarChart } from "lucide-react";

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

const adminStats = [
  { title: "Total Users", value: "127", description: "Active accounts", icon: <Users className="h-6 w-6 text-quiz-purple" /> },
  { title: "Total Quizzes", value: "56", description: "Published quizzes", icon: <Book className="h-6 w-6 text-quiz-purple" /> },
  { title: "Completions", value: "432", description: "Quiz submissions", icon: <CheckCircle2 className="h-6 w-6 text-quiz-purple" /> },
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
            <Button className="gap-2" onClick={() => navigate("/create-quiz")}>
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
                {user.role === "admin" ? (
                  // Admin stats
                  adminStats.map((stat, index) => (
                    <StatsCard
                      key={index}
                      title={stat.title}
                      value={stat.value}
                      description={stat.description}
                      icon={stat.icon}
                    />
                  ))
                ) : user.role === "instructor" ? (
                  // Instructor stats
                  <>
                    <StatsCard
                      title="Active Quizzes"
                      value="3"
                      description="Currently published"
                      icon={<Book className="h-6 w-6 text-quiz-purple" />}
                    />
                    <StatsCard
                      title="Total Responses"
                      value="42"
                      description="From all quizzes"
                      icon={<BarChart2 className="h-6 w-6 text-quiz-purple" />}
                    />
                    <StatsCard
                      title="Question Bank"
                      value="24"
                      description="Available questions"
                      icon={<FilePlus className="h-6 w-6 text-quiz-purple" />}
                    />
                  </>
                ) : (
                  // Student stats
                  <>
                    <StatsCard
                      title="Quizzes Completed"
                      value="5"
                      description="Out of 12 total"
                      icon={<Book className="h-6 w-6 text-quiz-purple" />}
                    />
                    <StatsCard
                      title="Average Score"
                      value="78%"
                      description="Across all quizzes"
                      icon={<BarChart2 className="h-6 w-6 text-quiz-purple" />}
                    />
                    <StatsCard
                      title="Upcoming Deadlines"
                      value="2"
                      description="In the next 7 days"
                      icon={<Calendar className="h-6 w-6 text-quiz-purple" />}
                    />
                  </>
                )}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {user.role === "admin" ? "System Activity" : 
                     user.role === "instructor" ? "Recent Quizzes" : "Recent Activity"}
                  </CardTitle>
                  <CardDescription>
                    {user.role === "admin" 
                      ? "Recent platform activity and statistics" 
                      : user.role === "instructor"
                      ? "Your recently created and published quizzes"
                      : "Your recently completed and upcoming quizzes"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.role === "student" 
                      ? studentQuizzes.map((quiz) => (
                          <StudentQuizItem key={quiz.id} quiz={quiz} />
                        ))
                      : user.role === "instructor" 
                      ? instructorQuizzes.map((quiz) => (
                          <InstructorQuizItem key={quiz.id} quiz={quiz} />
                        ))
                      : (
                        // Admin activity items
                        <>
                          <AdminActivityItem
                            action="Quiz created"
                            description="New quiz 'Advanced Mathematics' was created"
                            user="Professor Smith"
                            time="2 hours ago"
                          />
                          <AdminActivityItem
                            action="User registered"
                            description="New student account was created"
                            user="Maria Johnson"
                            time="5 hours ago"
                          />
                          <AdminActivityItem
                            action="Quiz completed"
                            description="15 students completed 'Chemistry Basics'"
                            user="Various students"
                            time="Yesterday"
                          />
                        </>
                      )
                    }
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 gap-2"
                    onClick={() => navigate("/quizzes")}
                  >
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
                  <div className="space-y-4">
                    {user.role === "student" 
                      ? (
                        studentQuizzes.map((quiz) => (
                          <StudentQuizItem key={quiz.id} quiz={quiz} />
                        ))
                      ) : (
                        instructorQuizzes.map((quiz) => (
                          <InstructorQuizItem key={quiz.id} quiz={quiz} />
                        ))
                      )
                    }
                  </div>
                  <div className="mt-6 text-center">
                    {user.role !== "student" && (
                      <Button 
                        onClick={() => navigate("/create-quiz")}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Create New Quiz
                      </Button>
                    )}
                  </div>
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
                  {user.role === "student" ? (
                    <div className="space-y-6">
                      <div className="border border-border/40 rounded-lg p-6">
                        <h3 className="font-medium mb-4">Performance Summary</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Average Score</p>
                            <p className="text-2xl font-bold">78%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                            <p className="text-2xl font-bold">92%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                            <p className="text-2xl font-bold">5/12</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Time per Quiz</p>
                            <p className="text-2xl font-bold">14 min</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="border border-border/40 rounded-lg p-6">
                        <h3 className="font-medium mb-4">Class Performance</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Average Score</p>
                            <p className="text-2xl font-bold">72%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                            <p className="text-2xl font-bold">85%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Top Performing Quiz</p>
                            <p className="text-xl font-bold">Biology 101</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Most Challenging</p>
                            <p className="text-xl font-bold">Chemistry</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate("/reports")}
                      >
                        <BarChart className="h-4 w-4 mr-2" />
                        View Detailed Reports
                      </Button>
                    </div>
                  )}
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

function AdminActivityItem({ action, description, user, time }: { action: string; description: string; user: string; time: string }) {
  return (
    <div className="flex items-center justify-between p-4 border border-border/40 rounded-lg">
      <div>
        <h4 className="font-medium">{action}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">By: {user} • {time}</p>
      </div>
      <Button variant="outline" size="sm">
        Details
      </Button>
    </div>
  );
}
