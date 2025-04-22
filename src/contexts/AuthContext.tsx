
import { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "admin" | "instructor" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for development purposes only
const SAMPLE_USERS: User[] = [
  {
    id: "admin-1",
    name: "Administrator",
    email: "admin@example.com",
    role: "admin",
    avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=admin",
  },
  {
    id: "instructor-1",
    name: "Instructor",
    email: "instructor@example.com",
    role: "instructor",
    avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=instructor",
  },
  {
    id: "student-1",
    name: "Student",
    email: "student@example.com",
    role: "student",
    avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=student",
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("quizCraftUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (case insensitive)
      const foundUser = SAMPLE_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("quizCraftUser", JSON.stringify(foundUser));
      } else {
        throw new Error("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // Simulate API call
    setLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (SAMPLE_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("Email already in use");
      }
      
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        avatarUrl: `https://api.dicebear.com/7.x/thumbs/svg?seed=${email}`,
      };
      
      // Set current user and save to localStorage
      setUser(newUser);
      localStorage.setItem("quizCraftUser", JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user exists
      const foundUser = SAMPLE_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (!foundUser) {
        throw new Error("No account found with this email address");
      }
      
      // In a real app, we would send an email with a reset link
      console.log(`Password reset would be sent to ${email}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("quizCraftUser");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        logout,
        resetPassword,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
