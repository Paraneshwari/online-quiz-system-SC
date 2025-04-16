
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertCircle, ChevronLeft, ChevronRight, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Question, QuestionType } from "@/types/quiz";

// Mock quiz data
const mockQuiz = {
  id: "1",
  title: "Introduction to Biology",
  description: "Test your knowledge of basic biology concepts",
  createdBy: "instructor",
  topic: "Biology",
  tags: ["science", "biology", "introduction"],
  timeLimit: 30, // in minutes
  questions: [
    {
      id: "q1",
      questionText: "What is the powerhouse of the cell?",
      type: "multiple-choice" as QuestionType,
      choices: [
        { id: "a1", text: "Mitochondria", isCorrect: true },
        { id: "a2", text: "Nucleus", isCorrect: false },
        { id: "a3", text: "Ribosome", isCorrect: false },
        { id: "a4", text: "Golgi Apparatus", isCorrect: false },
      ],
      explanation: "Mitochondria are organelles that act as the powerhouse of the cell by generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
      points: 1,
    },
    {
      id: "q2",
      questionText: "DNA stands for:",
      type: "multiple-choice" as QuestionType,
      choices: [
        { id: "a1", text: "Deoxyribonucleic Acid", isCorrect: true },
        { id: "a2", text: "Diribonucleic Acid", isCorrect: false },
        { id: "a3", text: "Deoxyribose Nucleic Acid", isCorrect: false },
        { id: "a4", text: "Dinucleotide Acid", isCorrect: false },
      ],
      explanation: "DNA (deoxyribonucleic acid) is a molecule that carries genetic instructions for the development, functioning, growth and reproduction of all known organisms.",
      points: 1,
    },
    {
      id: "q3",
      questionText: "Photosynthesis occurs in which part of the plant cell?",
      type: "multiple-choice" as QuestionType,
      choices: [
        { id: "a1", text: "Chloroplast", isCorrect: true },
        { id: "a2", text: "Mitochondria", isCorrect: false },
        { id: "a3", text: "Nucleus", isCorrect: false },
        { id: "a4", text: "Cell Wall", isCorrect: false },
      ],
      explanation: "Chloroplasts are organelles that conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it into chemical energy.",
      points: 1,
    },
    {
      id: "q4",
      questionText: "All living organisms are made up of cells.",
      type: "true-false" as QuestionType,
      choices: [
        { id: "a1", text: "True", isCorrect: true },
        { id: "a2", text: "False", isCorrect: false },
      ],
      explanation: "Cell theory states that all living organisms are composed of cells, cells are the basic unit of life, and all cells arise from pre-existing cells.",
      points: 1,
    },
    {
      id: "q5",
      questionText: "The process by which plants make food is called ________.",
      type: "fill-blank" as QuestionType,
      answer: "photosynthesis",
      explanation: "Photosynthesis is the process used by plants, algae and certain bacteria to harness energy from sunlight and turn it into chemical energy.",
      points: 2,
    },
  ],
  published: true,
  createdAt: new Date("2025-03-15"),
  updatedAt: new Date("2025-03-15"),
  startDate: new Date("2025-04-15"),
  endDate: new Date("2025-04-20"),
};

export default function QuizTakingPage() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(mockQuiz.timeLimit * 60); // in seconds
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = mockQuiz.questions[currentQuestionIndex];
  const totalQuestions = mockQuiz.questions.length;
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Timer effect
  useEffect(() => {
    if (isQuizSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isQuizSubmitted]);
  
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  
  const isQuestionAnswered = (questionId: string) => {
    return !!answers[questionId];
  };
  
  const handleSubmitQuiz = () => {
    setIsQuizSubmitted(true);
    
    // Calculate score
    let totalScore = 0;
    mockQuiz.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      
      if (question.type === "multiple-choice" || question.type === "true-false") {
        const correctChoice = question.choices?.find((c) => c.isCorrect);
        if (correctChoice && userAnswer === correctChoice.id) {
          totalScore += question.points;
        }
      } else if (question.type === "fill-blank" && question.answer) {
        if (
          typeof userAnswer === "string" &&
          userAnswer.trim().toLowerCase() === question.answer.toLowerCase()
        ) {
          totalScore += question.points;
        }
      }
    });
    
    setScore(totalScore);
  };
  
  const showQuizResults = () => {
    setShowResults(true);
  };

  // Calculate progress percentage
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  if (showResults) {
    // Show results page
    const totalPossibleScore = mockQuiz.questions.reduce(
      (sum, q) => sum + q.points,
      0
    );
    
    const scorePercentage = Math.round((score / totalPossibleScore) * 100);
    
    return (
      <PageLayout>
        <div className="container max-w-4xl mx-auto py-10">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">Quiz Results</h1>
              <p className="text-xl text-muted-foreground">{mockQuiz.title}</p>
            </div>
            
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Your Score</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-10 flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="w-48 h-48 rounded-full border-8 border-primary flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold">{scorePercentage}%</div>
                      <div className="text-sm text-muted-foreground">
                        {score}/{totalPossibleScore} points
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center w-full max-w-md">
                  {scorePercentage >= 80 ? (
                    <div className="text-xl font-medium mb-2 text-green-500 flex justify-center items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Excellent work!
                    </div>
                  ) : scorePercentage >= 60 ? (
                    <div className="text-xl font-medium mb-2 text-primary flex justify-center items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Good job!
                    </div>
                  ) : (
                    <div className="text-xl font-medium mb-2 text-orange-500 flex justify-center items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Keep practicing!
                    </div>
                  )}
                  <p className="text-muted-foreground mb-6">
                    You've completed the quiz. Review your answers below to see what you got right and wrong.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Review Your Answers</h2>
              
              {mockQuiz.questions.map((question, index) => {
                const userAnswer = answers[question.id];
                let isCorrect = false;
                
                if (question.type === "multiple-choice" || question.type === "true-false") {
                  const correctChoice = question.choices?.find((c) => c.isCorrect);
                  isCorrect = correctChoice?.id === userAnswer;
                } else if (question.type === "fill-blank" && question.answer) {
                  isCorrect = 
                    typeof userAnswer === "string" && 
                    userAnswer.trim().toLowerCase() === question.answer.toLowerCase();
                }
                
                return (
                  <Card key={question.id} className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-destructive"}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">
                          Question {index + 1} 
                          <span className="text-muted-foreground ml-2">
                            ({question.points} {question.points === 1 ? "point" : "points"})
                          </span>
                        </CardTitle>
                        {isCorrect ? (
                          <div className="flex items-center text-green-500 gap-1">
                            <CheckCircle className="h-4 w-4" />
                            Correct
                          </div>
                        ) : (
                          <div className="flex items-center text-destructive gap-1">
                            <XCircle className="h-4 w-4" />
                            Incorrect
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 pb-2">
                      <p className="font-medium mb-4">{question.questionText}</p>
                      
                      {question.type === "multiple-choice" && question.choices && (
                        <div className="space-y-2">
                          {question.choices.map((choice) => {
                            const isUserChoice = choice.id === userAnswer;
                            return (
                              <div
                                key={choice.id}
                                className={`p-3 rounded-md border ${
                                  choice.isCorrect
                                    ? "bg-green-50 border-green-300"
                                    : isUserChoice && !choice.isCorrect
                                    ? "bg-red-50 border-red-300"
                                    : "border-border"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {choice.isCorrect ? (
                                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    ) : isUserChoice ? (
                                      <XCircle className="h-4 w-4 text-destructive mr-2" />
                                    ) : (
                                      <div className="w-4 mr-2" />
                                    )}
                                    <span>{choice.text}</span>
                                  </div>
                                  {isUserChoice && (
                                    <span className="text-sm font-medium">Your answer</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {question.type === "true-false" && question.choices && (
                        <div className="flex gap-4">
                          {question.choices.map((choice) => {
                            const isUserChoice = choice.id === userAnswer;
                            return (
                              <div
                                key={choice.id}
                                className={`p-3 rounded-md border flex-1 ${
                                  choice.isCorrect
                                    ? "bg-green-50 border-green-300"
                                    : isUserChoice && !choice.isCorrect
                                    ? "bg-red-50 border-red-300"
                                    : "border-border"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {choice.isCorrect ? (
                                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    ) : isUserChoice ? (
                                      <XCircle className="h-4 w-4 text-destructive mr-2" />
                                    ) : (
                                      <div className="w-4 mr-2" />
                                    )}
                                    <span>{choice.text}</span>
                                  </div>
                                  {isUserChoice && (
                                    <span className="text-sm font-medium">Your answer</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {question.type === "fill-blank" && (
                        <div className="space-y-4">
                          <div
                            className={`p-3 rounded-md border ${
                              isCorrect
                                ? "bg-green-50 border-green-300"
                                : "bg-red-50 border-red-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {isCorrect ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-destructive mr-2" />
                                )}
                                <span>Your answer: {userAnswer || "(No answer provided)"}</span>
                              </div>
                            </div>
                          </div>
                          
                          {!isCorrect && (
                            <div className="p-3 rounded-md border bg-green-50 border-green-300">
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                <span>Correct answer: {question.answer}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                    
                    {question.explanation && (
                      <CardFooter className="pt-2 pb-4">
                        <div className="text-sm bg-muted/50 p-3 rounded-md w-full">
                          <p className="font-medium mb-1">Explanation:</p>
                          <p className="text-muted-foreground">{question.explanation}</p>
                        </div>
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
            </div>
            
            <div className="flex justify-center">
              <Button onClick={() => navigate("/dashboard")}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container max-w-4xl mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{mockQuiz.title}</h1>
            <p className="text-muted-foreground">
              {answeredCount}/{totalQuestions} questions answered
            </p>
          </div>
          <div className="flex items-center gap-2 text-lg font-medium">
            <Clock className="h-5 w-5 text-primary" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
        
        <Progress value={progressPercentage} className="mb-8" />
        
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {currentQuestion.points} {currentQuestion.points === 1 ? "point" : "points"}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-8">
            <p className="text-lg mb-6">{currentQuestion.questionText}</p>
            
            {currentQuestion.image && (
              <div className="mb-6">
                <img 
                  src={currentQuestion.image} 
                  alt="Question image" 
                  className="rounded-md border max-h-60 mx-auto"
                />
              </div>
            )}
            
            {currentQuestion.type === "multiple-choice" && currentQuestion.choices && (
              <RadioGroup
                value={answers[currentQuestion.id] as string || ""}
                onValueChange={(value) =>
                  handleAnswerChange(currentQuestion.id, value)
                }
                className="space-y-3"
              >
                {currentQuestion.choices.map((choice) => (
                  <div
                    key={choice.id}
                    className="flex items-center space-x-2 border border-border p-4 rounded-md hover:bg-muted/50"
                  >
                    <RadioGroupItem
                      value={choice.id}
                      id={`choice-${choice.id}`}
                    />
                    <Label
                      htmlFor={`choice-${choice.id}`}
                      className="flex-grow cursor-pointer"
                    >
                      {choice.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {currentQuestion.type === "true-false" && currentQuestion.choices && (
              <RadioGroup
                value={answers[currentQuestion.id] as string || ""}
                onValueChange={(value) =>
                  handleAnswerChange(currentQuestion.id, value)
                }
                className="flex gap-4"
              >
                {currentQuestion.choices.map((choice) => (
                  <div
                    key={choice.id}
                    className="flex-1 border border-border p-4 rounded-md hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <RadioGroupItem
                        value={choice.id}
                        id={`choice-${choice.id}`}
                      />
                      <Label
                        htmlFor={`choice-${choice.id}`}
                        className="cursor-pointer"
                      >
                        {choice.text}
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {currentQuestion.type === "fill-blank" && (
              <div>
                <Input
                  value={answers[currentQuestion.id] as string || ""}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion.id, e.target.value)
                  }
                  placeholder="Type your answer here"
                  className="max-w-md"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Your answer must exactly match the correct answer.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentQuestionIndex < totalQuestions - 1 ? (
            <Button onClick={goToNextQuestion}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Submit Quiz</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit your answers?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {answeredCount < totalQuestions ? (
                      <div className="flex items-center text-amber-500 gap-2 mb-2">
                        <AlertCircle className="h-5 w-5" />
                        <span>You've only answered {answeredCount} out of {totalQuestions} questions.</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500 gap-2 mb-2">
                        <CheckCircle className="h-5 w-5" />
                        <span>You've answered all {totalQuestions} questions.</span>
                      </div>
                    )}
                    <p>Once submitted, you won't be able to change your answers.</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Review Answers</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    handleSubmitQuiz();
                    showQuizResults();
                  }}>
                    Submit Quiz
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
