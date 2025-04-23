
import { Link, Navigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { PageLayout } from "@/components/layout/PageLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  
  // Redirect if user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          <div className="w-full mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="w-full">
            <AuthForm type="login" />
            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:text-primary-dark underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
