
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { QuizDetailsForm } from "@/components/quiz/QuizDetailsForm";
import { QuestionsList } from "@/components/quiz/QuestionsList";
import { QuestionForm } from "@/components/quiz/QuestionForm";
import { QuizScheduling } from "@/components/quiz/QuizScheduling";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

// Mock quiz data
const quizData = {
  "1": {
    title: "Introduction to Biology",
    description: "Learn the basics of biology with this introductory quiz",
    subject: "Biology",
    timeLimit: 30,
    passingScore: 70,
    dueDate: "2025-04-20",
    questions: [
      {
        id: "q1",
        text: "What is the basic unit of life?",
        type: "multiple_choice",
        options: ["Cell", "Tissue", "Organ", "System"],
        correctAnswer: "Cell",
      },
      {
        id: "q2",
        text: "Which organelle is responsible for photosynthesis?",
        type: "multiple_choice",
        options: ["Mitochondria", "Chloroplast", "Golgi Body", "Lysosome"],
        correctAnswer: "Chloroplast",
      },
    ]
  },
  "2": {
    title: "Chemical Reactions",
    description: "Test your knowledge of chemical reactions and equations",
    subject: "Chemistry",
    timeLimit: 45,
    passingScore: 75,
    dueDate: "2025-04-25",
    questions: [
      {
        id: "q1",
        text: "What is the pH of a neutral solution?",
        type: "multiple_choice",
        options: ["0", "7", "14", "4.5"],
        correctAnswer: "7",
      },
      {
        id: "q2",
        text: "What type of reaction is represented by the equation: 2H2 + O2 → 2H2O?",
        type: "multiple_choice",
        options: ["Decomposition", "Single displacement", "Double displacement", "Synthesis"],
        correctAnswer: "Synthesis",
      },
    ]
  }
};

export default function QuizEditPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  
  // Find the quiz data based on ID
  const quiz = id ? quizData[id as keyof typeof quizData] : null;
  
  if (!quiz) {
    return (
      <PageLayout>
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold">Quiz Not Found</h1>
          <p className="mt-2">The quiz you are trying to edit does not exist.</p>
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/quizzes">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Edit Quiz</h1>
          </div>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Quiz Details</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Information</CardTitle>
                <CardDescription>Edit the basic details of your quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <QuizDetailsForm 
                  defaultValues={{
                    title: quiz.title,
                    description: quiz.description,
                    subject: quiz.subject,
                    timeLimit: quiz.timeLimit,
                    passingScore: quiz.passingScore
                  }}
                />
                <div className="flex justify-end mt-6">
                  <Button onClick={() => setActiveTab("questions")}>
                    Continue to Questions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Questions</CardTitle>
                <CardDescription>Add and modify questions for your quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <QuestionsList questions={quiz.questions} />
                <div className="mt-6">
                  <QuestionForm />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setActiveTab("details")}>
                    Back
                  </Button>
                  <Button onClick={() => setActiveTab("scheduling")}>
                    Continue to Scheduling
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduling">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Schedule</CardTitle>
                <CardDescription>Set availability and due dates for your quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <QuizScheduling defaultDate={quiz.dueDate} />
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setActiveTab("questions")}>
                    Back
                  </Button>
                  <Button onClick={() => setActiveTab("settings")}>
                    Continue to Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Settings</CardTitle>
                <CardDescription>Configure additional options for your quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Quiz Visibility</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="public" name="visibility" className="h-4 w-4" checked />
                        <label htmlFor="public">Public - All enrolled students can access</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="private" name="visibility" className="h-4 w-4" />
                        <label htmlFor="private">Private - Only selected students can access</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Results Visibility</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="immediate" name="results" className="h-4 w-4" checked />
                        <label htmlFor="immediate">Show results immediately after completion</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="after-due" name="results" className="h-4 w-4" />
                        <label htmlFor="after-due">Show results after due date</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="hidden" name="results" className="h-4 w-4" />
                        <label htmlFor="hidden">Do not show results to students</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setActiveTab("scheduling")}>
                    Back
                  </Button>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
