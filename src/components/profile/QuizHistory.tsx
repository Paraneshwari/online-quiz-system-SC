
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizHistoryProps {
  userId: string;
}

// Mock data for demonstration
const mockQuizHistory = [
  {
    id: "1",
    quizTitle: "Introduction to Biology",
    score: 85,
    totalQuestions: 20,
    completedAt: "2025-04-15",
  },
  {
    id: "2",
    quizTitle: "Chemical Reactions",
    score: 92,
    totalQuestions: 15,
    completedAt: "2025-04-14",
  },
];

export function QuizHistory({ userId }: QuizHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockQuizHistory.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell className="font-medium">{quiz.quizTitle}</TableCell>
                <TableCell>{quiz.score}%</TableCell>
                <TableCell>{quiz.totalQuestions}</TableCell>
                <TableCell>{quiz.completedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
