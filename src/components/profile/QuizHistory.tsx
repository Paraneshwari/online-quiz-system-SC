
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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
  {
    id: "3",
    quizTitle: "World History",
    score: 78,
    totalQuestions: 25,
    completedAt: "2025-04-12",
  },
];

export function QuizHistory({ userId }: QuizHistoryProps) {
  // Function to determine score badge color
  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 75) return "secondary";
    if (score >= 60) return "outline";
    return "destructive";
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Quiz History</span>
          <Badge variant="outline">{mockQuizHistory.length} Quizzes</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead className="text-center">Questions</TableHead>
              <TableHead className="text-right">Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockQuizHistory.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell className="font-medium">{quiz.quizTitle}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getScoreBadgeVariant(quiz.score)}>
                    {quiz.score}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{quiz.totalQuestions}</TableCell>
                <TableCell className="text-right">{formatDate(quiz.completedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
