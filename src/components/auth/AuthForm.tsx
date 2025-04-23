
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

type AuthType = "login" | "register";

interface AuthFormProps {
  type: AuthType;
}

export function AuthForm({ type }: AuthFormProps) {
  if (type === "login") {
    return <LoginForm />;
  }

  return <RegisterForm />;
}
