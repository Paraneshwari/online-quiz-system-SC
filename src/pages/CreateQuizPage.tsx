
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionForm } from "@/components/quiz/QuestionForm";
import { Question } from "@/types/quiz";
import { QuizDetailsForm } from "@/components/quiz/QuizDetailsForm";
import { QuestionsList } from "@/components/quiz/QuestionsList";
import { ArrowLeft, Save } from "lucide-react";

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
            <TabsTrigger value="questions" disabled={!form.formState.isValid}>
              Questions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6 mt-6">
            <QuizDetailsForm 
              form={form} 
              onNext={() => setActiveTab("questions")} 
            />
          </TabsContent>
          
          <TabsContent value="questions" className="mt-6">
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
              <QuestionsList
                questions={questions}
                onEdit={(question) => {
                  setEditingQuestion(question);
                  setIsAddingQuestion(true);
                }}
                onDelete={(id) => setQuestions(questions.filter((q) => q.id !== id))}
                onAddQuestion={() => setIsAddingQuestion(true)}
                onBack={() => setActiveTab("details")}
                onSubmit={form.handleSubmit(onSubmit)}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
