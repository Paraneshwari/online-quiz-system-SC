
import { useAuth } from "@/contexts/AuthContext";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Mock quiz data for demonstration
const mockQuizzes = [
  {
    id: "q1",
    title: "Introduction to Biology",
    description: "Learn the basics of biology with this introductory quiz",
    questions: 15,
    createdBy: "Professor Smith",
    createdAt: "2025-04-10",
  },
  {
    id: "q2",
    title: "Advanced Mathematics",
    description: "Test your knowledge of advanced mathematical concepts",
    questions: 20,
    createdBy: "Dr. Johnson",
    createdAt: "2025-04-12",
  },
  {
    id: "q3",
    title: "World History Overview",
    description: "A comprehensive quiz on major world history events",
    questions: 25,
    createdBy: "Professor Williams",
    createdAt: "2025-04-15",
  },
];

export default function QuizzesPage() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  
  useEffect(() => {
    // In a real app, we would fetch quizzes from an API
    // For now, we'll use the mock data
    setQuizzes(mockQuizzes);
  }, []);
  
  return (
    <PageLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Available Quizzes</h1>
          {user && (user.role === "admin" || user.role === "instructor") && (
            <Button asChild>
              <Link to="/create-quiz">Create New Quiz</Link>
            </Button>
          )}
        </div>
        
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{quiz.description}</p>
                <div className="flex flex-col space-y-1.5 text-sm">
                  <div>
                    <span className="font-semibold">Questions:</span> {quiz.questions}
                  </div>
                  <div>
                    <span className="font-semibold">Created by:</span> {quiz.createdBy}
                  </div>
                  <div>
                    <span className="font-semibold">Date:</span> {quiz.createdAt}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link to={`/quizzes/${quiz.id}`}>Take Quiz</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
