
import { Question } from "@/types/quiz";
import { useQuestionBank } from "./QuestionBankContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { QuestionForm } from "@/components/quiz/QuestionForm";

export function QuestionBankList() {
  const { questions, deleteQuestion } = useQuestionBank();
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Question</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Points</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No questions added yet. Click "Add Question" to create one.
              </TableCell>
            </TableRow>
          ) : (
            questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="font-medium">{question.questionText}</TableCell>
                <TableCell>{question.type}</TableCell>
                <TableCell>{question.points}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(question)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteQuestion(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={!!editingQuestion} onOpenChange={() => setEditingQuestion(null)}>
        <DialogContent className="max-w-3xl">
          {editingQuestion && (
            <QuestionForm
              initialValues={editingQuestion}
              onSave={() => setEditingQuestion(null)}
              onCancel={() => setEditingQuestion(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
