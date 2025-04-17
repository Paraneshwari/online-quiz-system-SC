import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, BookOpen, FilePlus, Users, ArrowRight, PieChart, FileText, Eye } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for instructor dashboard
const recentQuizzes = [
  { 
    id: "1", 
    title: "Introduction to Biology", 
    status: "active",
    submissions: 24, 
    avgScore: 76,
    dueDate: "Apr 20, 2025" 
  },
  { 
    id: "2", 
    title: "Chemical Reactions", 
    status: "upcoming",
    submissions: 0, 
    avgScore: 0,
    dueDate: "Apr 25, 2025" 
  },
  { 
    id: "3", 
    title: "Cell Structure", 
    status: "ended",
    submissions: 28, 
    avgScore: 85,
    dueDate: "Apr 10, 2025" 
  },
];

export function InstructorDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome, {user.name}</h1>
        <p className="text-muted-foreground">
          Your instructor dashboard shows quiz activity and student performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Quizzes" 
          value="12" 
          description="Published quizzes"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
        />
        <StatsCard 
          title="Active Quizzes" 
          value="3" 
          description="Currently available"
          icon={<FilePlus className="h-5 w-5 text-primary" />}
        />
        <StatsCard 
          title="Total Students" 
          value="45" 
          description="Across all quizzes"
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <StatsCard 
          title="Avg. Score" 
          value="78%" 
          description="Overall performance"
          icon={<BarChart className="h-5 w-5 text-primary" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Recent Quizzes</CardTitle>
                <CardDescription>Status and performance of recent quizzes</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/quizzes" className="flex items-center gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuizzes.map((quiz) => (
                <div 
                  key={quiz.id} 
                  className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{quiz.title}</div>
                        <Badge variant={
                          quiz.status === "active" ? "default" : 
                          quiz.status === "upcoming" ? "outline" : 
                          "secondary"
                        }>
                          {quiz.status === "active" ? "Active" : 
                           quiz.status === "upcoming" ? "Upcoming" : 
                           "Ended"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {quiz.status === "active" ? `Due ${quiz.dueDate}` : 
                         quiz.status === "upcoming" ? `Starts ${quiz.dueDate}` : 
                         `Ended ${quiz.dueDate}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {quiz.submissions} 
                        <span className="text-sm font-normal text-muted-foreground ml-1">responses</span>
                      </div>
                      {quiz.avgScore > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {quiz.avgScore}% avg. score
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    {quiz.status === "active" || quiz.status === "ended" ? (
                      <>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/quizzes/${quiz.id}/results`}>
                            <Eye className="h-4 w-4 mr-1" /> View Results
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/quizzes/${quiz.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/create-quiz">
                <FilePlus className="h-4 w-4 mr-2" />
                Create New Quiz
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Quiz Completion
            </CardTitle>
            <CardDescription>Student quiz completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Introduction to Biology</div>
                  <div className="text-sm font-medium">83%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "83%" }}></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">20/24 students completed</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Cell Structure</div>
                  <div className="text-sm font-medium">100%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">28/28 students completed</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Forces and Motion</div>
                  <div className="text-sm font-medium">65%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">15/23 students completed</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4" asChild>
              <Link to="/students">
                <Users className="h-4 w-4 mr-2" /> View Students
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Performance</CardTitle>
            <CardDescription>Average scores by quiz topic</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-end justify-between gap-4">
              <BarChartItem label="Biology" value={76} color="primary" />
              <BarChartItem label="Chemistry" value={82} color="violet" />
              <BarChartItem label="Physics" value={68} color="amber" />
              <BarChartItem label="Math" value={91} color="green" />
              <BarChartItem label="History" value={84} color="blue" />
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/reports">
                <FileText className="h-4 w-4 mr-2" /> View Detailed Reports
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Question Analysis</CardTitle>
            <CardDescription>Questions with lowest success rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-sm line-clamp-1">What is the function of mitochondria in a cell?</div>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive">32%</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Chemical Reactions quiz</div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-destructive h-1.5 rounded-full" style={{ width: "32%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-sm line-clamp-1">Which equation represents Newton's Second Law of Motion?</div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500">45%</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Forces and Motion quiz</div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-sm line-clamp-1">Calculate the molarity of a solution with 4g of NaOH in 500mL.</div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500">51%</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Chemical Reactions quiz</div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "51%" }}></div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-6" asChild>
              <Link to="/question-analysis">View Full Analysis</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, description, icon }: { 
  title: string; 
  value: string; 
  description: string;
  icon: React.ReactNode;
}) {
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

function BarChartItem({ label, value, color }: { 
  label: string; 
  value: number;
  color: "primary" | "green" | "amber" | "violet" | "blue";
}) {
  const getColorClass = () => {
    switch(color) {
      case "green": return "bg-green-500";
      case "amber": return "bg-amber-500";
      case "violet": return "bg-violet-500";
      case "blue": return "bg-blue-500";
      default: return "bg-primary";
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm font-medium">{value}%</div>
      <div className={`w-12 ${getColorClass()} rounded-t-md`} style={{ height: `${value * 2.4}px` }}></div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
