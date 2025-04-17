
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

// Mock users for demo purposes
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@quizcraft.com",
    role: "admin",
    avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=admin",
  },
  {
    id: "2",
    name: "Professor Smith",
    email: "instructor@quizcraft.com",
    role: "instructor",
    avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=instructor",
  },
  {
    id: "3",
    name: "John Student",
    email: "student@quizcraft.com",
    role: "student",
    avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=student",
  },
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
      
      // Fix: Make the case-insensitive email comparison
      const foundUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      
      // In a demo system, allow any password for the mock users
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
      if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
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
      
      // In a real app, we'd save this to a database
      // For demo, we'll just set the current user
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
      
      const foundUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (!foundUser) {
        throw new Error("No account found with this email address");
      }
      
      // In a real app, we would send an email with a reset link
      // For this demo, we'll just log success
      console.log(`Password reset email sent to ${email}`);
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
