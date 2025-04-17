
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

import { useAuth } from "./contexts/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Routes configuration
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
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
