
import { Link } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { PageLayout } from "@/components/layout/PageLayout";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [registeredEmails, setRegisteredEmails] = useState<string[]>([]);

  // Load registered users
  useEffect(() => {
    const storedUsers = localStorage.getItem("quizCraftRegisteredUsers");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      setRegisteredEmails(users.map((u: any) => u.email));
    }
  }, []);

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
          
          <div className="mt-10 border-t border-border pt-4 text-center text-sm text-muted-foreground">
            <p>Demo credentials for testing:</p>
            <div className="mt-2 space-y-1">
              <p><strong>Admin:</strong> admin@quizcraft.com / password</p>
              <p><strong>Instructor:</strong> instructor@quizcraft.com / password</p>
              <p><strong>Student:</strong> student@quizcraft.com / password</p>
            </div>
          </div>

          {registeredEmails.length > 0 && (
            <div className="mt-6 border-t border-border pt-4 text-center text-sm">
              <p className="font-medium text-primary">Your registered emails:</p>
              <div className="mt-2 space-y-1">
                {registeredEmails.map((email, index) => (
                  <p key={index}>{email}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
