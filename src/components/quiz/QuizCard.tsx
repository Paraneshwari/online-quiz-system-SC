
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { BookOpen, Clock, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/types/quiz";

interface QuizCardProps {
  quiz: Quiz;
  view: "student" | "instructor";
}

export function QuizCard({ quiz, view }: QuizCardProps) {
  const isActive = quiz.startDate && quiz.endDate && 
    new Date() >= new Date(quiz.startDate) && 
    new Date() <= new Date(quiz.endDate);
  
  const isFuture = quiz.startDate && new Date() < new Date(quiz.startDate);
  
  const isPast = quiz.endDate && new Date() > new Date(quiz.endDate);
  
  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
      {quiz.published ? (
        <div className="bg-primary/10 h-2 w-full">
          {isActive && <div className="bg-primary h-full w-1/2" />}
          {isFuture && <div className="bg-quiz-blue h-full w-1/4" />}
          {isPast && <div className="bg-muted h-full w-full" />}
        </div>
      ) : (
        <div className="bg-muted h-2 w-full" />
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1 text-lg">{quiz.title}</CardTitle>
          <Badge variant={quiz.published ? "default" : "outline"}>
            {quiz.published ? "Published" : "Draft"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate">{quiz.topic}</p>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2 text-sm">
          <p className="line-clamp-2 h-10 text-muted-foreground">
            {quiz.description}
          </p>
          <div className="flex justify-between pt-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{quiz.questions.length} questions</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{quiz.timeLimit} min</span>
            </div>
          </div>
          
          {quiz.startDate && quiz.endDate && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {isActive && "Active until "}
                {isFuture && "Starts in "}
                {isPast && "Ended "}
                {isActive && formatDistanceToNow(new Date(quiz.endDate), { addSuffix: true })}
                {isFuture && formatDistanceToNow(new Date(quiz.startDate), { addSuffix: true })}
                {isPast && formatDistanceToNow(new Date(quiz.endDate), { addSuffix: true })}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        {view === "student" ? (
          <Button
            variant={isActive ? "default" : "outline"}
            className="w-full"
            disabled={!isActive}
            asChild
          >
            <Link to={`/quizzes/${quiz.id}`}>
              {isActive ? "Start Quiz" : isFuture ? "Not Available Yet" : "Closed"}
            </Link>
          </Button>
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>24 submissions</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/quizzes/${quiz.id}/edit`}>
                {quiz.published ? "Manage" : "Edit"}
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
