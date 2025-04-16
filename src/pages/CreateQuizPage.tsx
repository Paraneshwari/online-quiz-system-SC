import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionForm } from "@/components/quiz/QuestionForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CalendarIcon, Clock, Plus, CalendarDays, ArrowLeft, Trash2, Check, Save } from "lucide-react";
import { Question } from "@/types/quiz";
import { QuizScheduling } from "@/components/quiz/QuizScheduling";

const topics = [
  "Mathematics",
  "Science",
  "History",
  "Literature",
  "Computer Science",
  "Art",
  "Music",
  "Physical Education",
  "Foreign Languages",
];

const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  topic: z.string().min(1, "Topic is required"),
  timeLimit: z.coerce.number().int().min(1, "Time limit must be at least 1 minute"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

type QuizFormValues = z.infer<typeof quizSchema>;

export default function CreateQuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      description: "",
      topic: "",
      timeLimit: 30,
    },
  });

  const handleSaveQuestion = (questionData: any) => {
    if (editingQuestion) {
      setQuestions(
        questions.map((q) => (q.id === editingQuestion.id ? { ...questionData, id: q.id } : q))
      );
      setEditingQuestion(null);
    } else {
      const newQuestion = {
        ...questionData,
        id: `question-${Date.now()}`,
      };
      setQuestions([...questions, newQuestion]);
    }
    setIsAddingQuestion(false);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsAddingQuestion(true);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const onSubmit = (data: QuizFormValues) => {
    console.log({
      ...data,
      questions,
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: data.startDate || null,
      endDate: data.endDate || null,
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Create New Quiz</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" type="button">
              Preview
            </Button>
            <Button variant="outline" type="button">
              Save Draft
            </Button>
            <Button type="button" onClick={form.handleSubmit(onSubmit)}>
              <Save className="h-4 w-4 mr-2" />
              Save & Publish
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="details">Quiz Details</TabsTrigger>
            <TabsTrigger value="questions" disabled={!form.formState.isValid}>Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Information</CardTitle>
                <CardDescription>
                  Provide the basic details about your quiz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quiz Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter quiz title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter a description for your quiz" 
                              className="min-h-24"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a brief description of what this quiz covers.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a topic" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {topics.map((topic) => (
                                  <SelectItem key={topic} value={topic}>
                                    {topic}
                                  </SelectItem>
                                ))}
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Limit (minutes)</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Input type="number" min="1" {...field} />
                                <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                              </div>
                            </FormControl>
                            <FormDescription>
                              How long students have to complete the quiz.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div></div>
                <Button onClick={() => setActiveTab("questions")} disabled={!form.formState.isValid}>
                  Next: Add Questions
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schedule (Optional)</CardTitle>
                <CardDescription>
                  Set the availability period for this quiz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuizScheduling form={form} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions" className="mt-6">
            <div className="flex flex-col gap-6">
              {!isAddingQuestion && (
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Questions ({questions.length})
                  </h2>
                  <Button onClick={() => setIsAddingQuestion(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              )}

              {isAddingQuestion ? (
                <QuestionForm
                  onSave={handleSaveQuestion}
                  onCancel={() => {
                    setIsAddingQuestion(false);
                    setEditingQuestion(null);
                  }}
                  initialValues={editingQuestion}
                />
              ) : (
                <>
                  {questions.length > 0 ? (
                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <Card key={question.id}>
                          <CardHeader className="pb-2 flex flex-row items-start justify-between">
                            <div>
                              <CardTitle className="text-base">
                                Question {index + 1}
                              </CardTitle>
                              <CardDescription>
                                {question.type === "multiple-choice"
                                  ? "Multiple Choice"
                                  : question.type === "true-false"
                                  ? "True/False"
                                  : "Fill in the Blank"} • {question.points} points
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditQuestion(question)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                  <path d="m15 5 4 4" />
                                </svg>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this question? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="font-medium mb-2">{question.questionText}</p>
                            
                            {question.type === "multiple-choice" && question.choices && (
                              <ul className="space-y-2">
                                {question.choices.map((choice) => (
                                  <li
                                    key={choice.id}
                                    className={`flex items-center gap-2 p-2 border rounded-md ${
                                      choice.isCorrect
                                        ? "border-primary/30 bg-primary/5"
                                        : "border-border"
                                    }`}
                                  >
                                    {choice.isCorrect && (
                                      <Check className="h-4 w-4 text-primary" />
                                    )}
                                    <span
                                      className={
                                        choice.isCorrect ? "font-medium" : ""
                                      }
                                    >
                                      {choice.text}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            
                            {question.type === "true-false" && question.choices && (
                              <div className="flex gap-4">
                                <div
                                  className={`p-2 border rounded-md ${
                                    question.choices[0].isCorrect
                                      ? "border-primary/30 bg-primary/5"
                                      : "border-border"
                                  }`}
                                >
                                  {question.choices[0].isCorrect && (
                                    <Check className="h-4 w-4 text-primary inline mr-2" />
                                  )}
                                  True
                                </div>
                                <div
                                  className={`p-2 border rounded-md ${
                                    question.choices[1].isCorrect
                                      ? "border-primary/30 bg-primary/5"
                                      : "border-border"
                                  }`}
                                >
                                  {question.choices[1].isCorrect && (
                                    <Check className="h-4 w-4 text-primary inline mr-2" />
                                  )}
                                  False
                                </div>
                              </div>
                            )}
                            
                            {question.type === "fill-blank" && question.answer && (
                              <div className="p-2 border border-primary/30 bg-primary/5 rounded-md inline-block">
                                <Check className="h-4 w-4 text-primary inline mr-2" />
                                {question.answer}
                              </div>
                            )}
                          </CardContent>
                          {question.explanation && (
                            <CardFooter className="pb-4">
                              <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Explanation:</span>{" "}
                                {question.explanation}
                              </p>
                            </CardFooter>
                          )}
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="bg-muted/50 border-dashed border-2 border-muted p-8">
                      <div className="flex flex-col items-center justify-center text-center">
                        <h3 className="font-medium text-lg mb-2">
                          No questions added yet
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Start adding questions to build your quiz
                        </p>
                        <Button onClick={() => setIsAddingQuestion(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Question
                        </Button>
                      </div>
                    </Card>
                  )}

                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={() => setActiveTab("details")}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Details
                    </Button>
                    <Button 
                      onClick={form.handleSubmit(onSubmit)} 
                      disabled={questions.length === 0}
                    >
                      Save & Publish
                    </Button>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
