
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useQuestionBank } from "./QuestionBankContext";
import { QuestionForm } from "@/components/quiz/QuestionForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Question } from "@/types/quiz";

export function QuestionBankHeader() {
  const { setSearchQuery, addQuestion } = useQuestionBank();
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const handleSaveQuestion = (questionData: Question) => {
    addQuestion(questionData);
    setIsAddingQuestion(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Question Bank</h1>
        <Button onClick={() => setIsAddingQuestion(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            className="pl-10"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Dialog open={isAddingQuestion} onOpenChange={setIsAddingQuestion}>
        <DialogContent className="max-w-3xl">
          <QuestionForm
            onSave={handleSaveQuestion}
            onCancel={() => setIsAddingQuestion(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
