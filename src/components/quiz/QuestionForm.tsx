
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionType } from "@/types/quiz";
import { X, Plus, Image as ImageIcon } from "lucide-react";

const questionSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  type: z.enum(["multiple-choice", "true-false", "fill-blank"]),
  explanation: z.string().optional(),
  points: z.coerce.number().int().min(1, "Points must be at least 1"),
  image: z.string().optional(),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

interface QuestionFormProps {
  onSave: (question: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

export function QuestionForm({ onSave, onCancel, initialValues }: QuestionFormProps) {
  const [choices, setChoices] = useState<{ id: string; text: string; isCorrect: boolean }[]>(
    initialValues?.choices || [
      { id: "1", text: "", isCorrect: false },
      { id: "2", text: "", isCorrect: false },
    ]
  );
  const [answer, setAnswer] = useState<string>(initialValues?.answer || "");

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      questionText: initialValues?.questionText || "",
      type: initialValues?.type || "multiple-choice",
      explanation: initialValues?.explanation || "",
      points: initialValues?.points || 1,
      image: initialValues?.image || "",
    },
  });

  const questionType = form.watch("type");

  const addChoice = () => {
    setChoices([...choices, { id: `${choices.length + 1}`, text: "", isCorrect: false }]);
  };

  const removeChoice = (id: string) => {
    setChoices(choices.filter((choice) => choice.id !== id));
  };

  const updateChoice = (id: string, text: string) => {
    setChoices(
      choices.map((choice) =>
        choice.id === id ? { ...choice, text } : choice
      )
    );
  };

  const updateCorrectChoice = (id: string) => {
    setChoices(
      choices.map((choice) =>
        choice.id === id
          ? { ...choice, isCorrect: true }
          : { ...choice, isCorrect: false }
      )
    );
  };

  const updateMultipleCorrectChoices = (id: string, isChecked: boolean) => {
    setChoices(
      choices.map((choice) =>
        choice.id === id ? { ...choice, isCorrect: isChecked } : choice
      )
    );
  };

  const onSubmit = (data: QuestionFormValues) => {
    const questionData = {
      ...data,
      choices: questionType === "multiple-choice" ? choices : undefined,
      answer: questionType === "fill-blank" ? answer : undefined,
    };
    onSave(questionData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {initialValues ? "Edit Question" : "Create New Question"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="questionText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your question"
                      className="min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Type</FormLabel>
                  <Select
                    onValueChange={(value: QuestionType) => {
                      field.onChange(value);
                      if (value === "true-false") {
                        setChoices([
                          { id: "1", text: "True", isCorrect: false },
                          { id: "2", text: "False", isCorrect: false },
                        ]);
                      } else if (value === "multiple-choice" && choices.length < 2) {
                        setChoices([
                          { id: "1", text: "", isCorrect: false },
                          { id: "2", text: "", isCorrect: false },
                        ]);
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {questionType === "multiple-choice" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Answer Choices</FormLabel>
                  {choices.length < 6 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addChoice}
                      className="h-8 gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Choice
                    </Button>
                  )}
                </div>
                {choices.map((choice) => (
                  <div
                    key={choice.id}
                    className="flex items-center gap-2 border border-border rounded-md p-3"
                  >
                    <RadioGroup
                      value={choices.find((c) => c.isCorrect)?.id}
                      onValueChange={updateCorrectChoice}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={choice.id}
                          id={`choice-radio-${choice.id}`}
                          aria-label="Mark as correct answer"
                        />
                      </div>
                    </RadioGroup>
                    <Input
                      value={choice.text}
                      onChange={(e) => updateChoice(choice.id, e.target.value)}
                      placeholder="Enter answer choice"
                      className="flex-1"
                    />
                    {choices.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeChoice(choice.id)}
                        className="h-8 w-8 text-muted-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {questionType === "true-false" && (
              <div className="space-y-4">
                <FormLabel>Correct Answer</FormLabel>
                <RadioGroup
                  value={choices.find((c) => c.isCorrect)?.id}
                  onValueChange={updateCorrectChoice}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="true" />
                    <Label htmlFor="true">True</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="false" />
                    <Label htmlFor="false">False</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {questionType === "fill-blank" && (
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Correct Answer</FormLabel>
                  <FormControl>
                    <Input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Enter the correct answer"
                    />
                  </FormControl>
                  <FormDescription>
                    Students will need to type this answer exactly to be marked correct.
                  </FormDescription>
                </FormItem>
              </div>
            )}

            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explanation (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter explanation for the correct answer"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be shown to students after they answer the question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="ml-2"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add an optional image to accompany the question.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 flex justify-between">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {initialValues ? "Update Question" : "Add Question"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
