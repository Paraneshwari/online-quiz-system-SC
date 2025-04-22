
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
    setLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would call an API to log in
      if (email && password) {
        // Create a dummy user for demonstration 
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: email.includes('admin') ? 'admin' : email.includes('instructor') ? 'instructor' : 'student',
          avatarUrl: `https://api.dicebear.com/7.x/thumbs/svg?seed=${email}`,
        };
        
        setUser(newUser);
        localStorage.setItem("quizCraftUser", JSON.stringify(newUser));
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would call an API to register
      
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
    } catch (error) {
      throw new Error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we would call an API to reset the password
      if (!email) {
        throw new Error("Email is required");
      }
      
      // In a real app, we would send an email with a reset link
      console.log(`Password reset would be sent to ${email}`);
      return Promise.resolve();
    } catch (error) {
      throw new Error("Password reset failed. Please try again.");
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
