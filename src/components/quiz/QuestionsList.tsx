
import { Question } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, Check, Plus, Trash2 } from "lucide-react";

interface QuestionsListProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
  onAddQuestion: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function QuestionsList({
  questions,
  onEdit,
  onDelete,
  onAddQuestion,
  onBack,
  onSubmit,
}: QuestionsListProps) {
  if (questions.length === 0) {
    return (
      <Card className="bg-muted/50 border-dashed border-2 border-muted p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="font-medium text-lg mb-2">No questions added yet</h3>
          <p className="text-muted-foreground mb-6">
            Start adding questions to build your quiz
          </p>
          <Button onClick={onAddQuestion}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Question
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
        <Button onClick={onAddQuestion}>
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      {questions.map((question, index) => (
        <Card key={question.id}>
          <CardHeader className="pb-2 flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-base">Question {index + 1}</CardTitle>
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
                onClick={() => onEdit(question)}
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
                      onClick={() => onDelete(question.id)}
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
                    <span className={choice.isCorrect ? "font-medium" : ""}>
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

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Details
        </Button>
        <Button onClick={onSubmit} disabled={questions.length === 0}>
          Save & Publish
        </Button>
      </div>
    </div>
  );
}
