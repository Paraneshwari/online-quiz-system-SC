
import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateQuizPage from "./pages/CreateQuizPage";
import QuizTakingPage from "./pages/QuizTakingPage";
import NotFound from "./pages/NotFound";
import QuestionBankPage from "./pages/QuestionBankPage";
import ProfilePage from "./pages/ProfilePage";
import QuizzesPage from "./pages/QuizzesPage";
import ReportsPage from "./pages/ReportsPage";
import QuizResultsPage from "./pages/QuizResultsPage";
import StudentsPage from "./pages/StudentsPage";
import QuizEditPage from "./pages/QuizEditPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";

// Import the new quiz pages
import BiologyQuizPage from "./pages/quizzes/BiologyQuizPage";
import MathQuizPage from "./pages/quizzes/MathQuizPage";
import HistoryQuizPage from "./pages/quizzes/HistoryQuizPage";

import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-quiz",
    element: (
      <ProtectedRoute>
        <CreateQuizPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quizzes",
    element: (
      <ProtectedRoute>
        <QuizzesPage />
      </ProtectedRoute>
    ),
  },
  // Add routes for specific quiz types
  {
    path: "/quiz/q1",
    element: (
      <ProtectedRoute>
        <BiologyQuizPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz/q2",
    element: (
      <ProtectedRoute>
        <MathQuizPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz/q3",
    element: (
      <ProtectedRoute>
        <HistoryQuizPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quizzes/:id",
    element: (
      <ProtectedRoute>
        <QuizTakingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quizzes/:id/edit",
    element: (
      <ProtectedRoute>
        <QuizEditPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quizzes/:id/results",
    element: (
      <ProtectedRoute>
        <QuizResultsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/question-bank",
    element: (
      <ProtectedRoute>
        <QuestionBankPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <ProtectedRoute>
        <ReportsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/students",
    element: (
      <ProtectedRoute>
        <StudentsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPage />,
  },
  {
    path: "/terms",
    element: <TermsPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
