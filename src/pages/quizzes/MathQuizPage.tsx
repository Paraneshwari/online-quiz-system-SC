
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock quiz data
const quizData = {
  id: "q2",
  title: "Advanced Mathematics",
  description: "Test your knowledge of advanced mathematical concepts",
  questions: [
    {
      id: 1,
      text: "Solve the equation: 2x² + 5x - 3 = 0",
      options: ["x = -3 and x = 0.5", "x = -3 and x = -0.5", "x = 3 and x = -0.5", "x = 3 and x = 0.5"],
      correctAnswer: "x = -3 and x = 0.5"
    },
    {
      id: 2,
      text: "What is the derivative of f(x) = x³ + 2x² - 4x + 7?",
      options: ["3x² + 4x - 4", "3x² + 4x - 1", "3x² + 2x - 4", "x² + 4x - 4"],
      correctAnswer: "3x² + 4x - 4"
    },
    {
      id: 3,
      text: "Calculate the integral of g(x) = 2x + sin(x)",
      options: ["x² + cos(x) + C", "x² - cos(x) + C", "2x - cos(x) + C", "2x + cos(x) + C"],
      correctAnswer: "x² - cos(x) + C"
    }
  ],
  timeLimit: 30, // minutes
  createdBy: "Dr. Johnson",
  createdAt: "2025-04-12",
};

export default function MathQuizPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit * 60); // in seconds
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time is up
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    // In a real app, we would submit the answers to an API
    // and then navigate to the results page
    navigate("/quiz/q2/results");
  };
  
  // Format the time remaining as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const question = quizData.questions[currentQuestion];
  
  return (
    <PageLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{quizData.title}</h1>
          <div className="bg-primary/10 px-4 py-2 rounded-md">
            <span className="font-semibold">Time Remaining: </span> 
            <span className={timeRemaining < 60 ? "text-destructive font-bold" : ""}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Question {currentQuestion + 1} of {quizData.questions.length}</CardTitle>
              <span className="text-sm text-muted-foreground">
                {Math.floor((currentQuestion + 1) / quizData.questions.length * 100)}% Complete
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{question.text}</h2>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div 
                    key={index}
                    onClick={() => handleSelectAnswer(option)}
                    className={`p-3 border rounded-md cursor-pointer hover:bg-primary/10 transition-colors ${
                      selectedAnswers[currentQuestion] === option ? 'border-primary bg-primary/10' : 'border-muted-foreground/20'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                {currentQuestion < quizData.questions.length - 1 ? (
                  <Button 
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswers[currentQuestion]}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmitQuiz}
                    disabled={!selectedAnswers[currentQuestion]}
                  >
                    Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            {quizData.questions.map((_, index) => (
              <div 
                key={index}
                className={`h-2 w-8 rounded-full ${
                  index === currentQuestion 
                    ? 'bg-primary' 
                    : index < currentQuestion || selectedAnswers[index] 
                      ? 'bg-primary/50' 
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
