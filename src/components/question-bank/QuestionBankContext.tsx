
import { createContext, useContext, useState, ReactNode } from "react";
import { Question } from "@/types/quiz";

interface QuestionBankContextType {
  questions: Question[];
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, question: Question) => void;
  deleteQuestion: (id: string) => void;
  selectedTopics: string[];
  setSelectedTopics: (topics: string[]) => void;
  selectedDifficulty: string[];
  setSelectedDifficulty: (difficulty: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const QuestionBankContext = createContext<QuestionBankContextType | undefined>(undefined);

export function QuestionBankProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addQuestion = (question: Question) => {
    setQuestions([...questions, { ...question, id: `question-${Date.now()}` }]);
  };

  const updateQuestion = (id: string, updatedQuestion: Question) => {
    setQuestions(questions.map(q => q.id === id ? { ...updatedQuestion, id } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <QuestionBankContext.Provider
      value={{
        questions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        selectedTopics,
        setSelectedTopics,
        selectedDifficulty,
        setSelectedDifficulty,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </QuestionBankContext.Provider>
  );
}

export const useQuestionBank = () => {
  const context = useContext(QuestionBankContext);
  if (!context) {
    throw new Error("useQuestionBank must be used within a QuestionBankProvider");
  }
  return context;
};
