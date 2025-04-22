
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
import { useForm } from "react-hook-form";
import { Question } from "@/types/quiz";

// Mock quiz data
const quizData = {
  "1": {
    title: "Introduction to Biology",
    description: "Learn the basics of biology with this introductory quiz",
    subject: "Biology",
    topic: "Biology",
    timeLimit: 30,
    passingScore: 70,
    dueDate: "2025-04-20",
    questions: [
      {
        id: "q1",
        questionText: "What is the basic unit of life?",
        type: "multiple-choice" as const,
        choices: [
          { id: "1", text: "Cell", isCorrect: true },
          { id: "2", text: "Tissue", isCorrect: false },
          { id: "3", text: "Organ", isCorrect: false },
          { id: "4", text: "System", isCorrect: false }
        ],
        points: 10
      },
      {
        id: "q2",
        questionText: "Which organelle is responsible for photosynthesis?",
        type: "multiple-choice" as const,
        choices: [
          { id: "1", text: "Mitochondria", isCorrect: false },
          { id: "2", text: "Chloroplast", isCorrect: true },
          { id: "3", text: "Golgi Body", isCorrect: false },
          { id: "4", text: "Lysosome", isCorrect: false }
        ],
        points: 10
      },
    ]
  },
  "2": {
    title: "Chemical Reactions",
    description: "Test your knowledge of chemical reactions and equations",
    subject: "Chemistry",
    topic: "Chemistry",
    timeLimit: 45,
    passingScore: 75,
    dueDate: "2025-04-25",
    questions: [
      {
        id: "q1",
        questionText: "What is the pH of a neutral solution?",
        type: "multiple-choice" as const,
        choices: [
          { id: "1", text: "0", isCorrect: false },
          { id: "2", text: "7", isCorrect: true },
          { id: "3", text: "14", isCorrect: false },
          { id: "4", text: "4.5", isCorrect: false }
        ],
        points: 10
      },
      {
        id: "q2",
        questionText: "What type of reaction is represented by the equation: 2H2 + O2 → 2H2O?",
        type: "multiple-choice" as const,
        choices: [
          { id: "1", text: "Decomposition", isCorrect: false },
          { id: "2", text: "Single displacement", isCorrect: false },
          { id: "3", text: "Double displacement", isCorrect: false },
          { id: "4", text: "Synthesis", isCorrect: true }
        ],
        points: 10
      },
    ]
  }
};

export default function QuizEditPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  
  // Find the quiz data based on ID
  const quiz = id ? quizData[id as keyof typeof quizData] : null;
  
  // Form setup
  const form = useForm({
    defaultValues: {
      title: quiz?.title || "",
      description: quiz?.description || "",
      topic: quiz?.topic || "",
      timeLimit: quiz?.timeLimit || 30,
      passingScore: quiz?.passingScore || 70,
      startDate: undefined,
      endDate: undefined
    }
  });
  
  const handleSaveQuestion = (questionData: any) => {
    console.log("Saving question:", questionData);
    // Here you would add the question to the quiz
  };
  
  const handleCancelQuestion = () => {
    setSelectedQuestion(null);
  };
  
  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question);
  };
  
  const handleDeleteQuestion = (questionId: string) => {
    console.log("Deleting question:", questionId);
    // Here you would remove the question from the quiz
  };
  
  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setActiveTab("questions");
  };
  
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
                  form={form}
                  onNext={() => setActiveTab("questions")}
                />
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
                {selectedQuestion ? (
                  <QuestionForm
                    onSave={handleSaveQuestion}
                    onCancel={handleCancelQuestion}
                    initialValues={selectedQuestion}
                  />
                ) : (
                  <>
                    <QuestionsList 
                      questions={quiz.questions}
                      onEdit={handleEditQuestion}
                      onDelete={handleDeleteQuestion}
                      onAddQuestion={handleAddQuestion}
                      onBack={() => setActiveTab("details")}
                      onSubmit={() => setActiveTab("scheduling")}
                    />
                    <div className="mt-6">
                      <QuestionForm
                        onSave={handleSaveQuestion}
                        onCancel={handleCancelQuestion}
                      />
                    </div>
                  </>
                )}
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
                <QuizScheduling form={form} />
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
                        <input type="radio" id="public" name="visibility" className="h-4 w-4" defaultChecked />
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
                        <input type="radio" id="immediate" name="results" className="h-4 w-4" defaultChecked />
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
