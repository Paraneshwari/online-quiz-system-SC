
export type QuestionType = "multiple-choice" | "true-false" | "fill-blank";

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  questionText: string;
  type: QuestionType;
  choices?: Choice[];
  answer?: string; // For fill-in-blank questions
  explanation?: string;
  image?: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  topic: string;
  tags: string[];
  timeLimit: number; // in minutes
  startDate?: Date;
  endDate?: Date;
  questions: Question[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  userId: string;
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
  score: number;
  maxScore: number;
  startedAt: Date;
  submittedAt: Date;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
  startedAt: Date;
  timeRemaining: number; // in seconds
}
