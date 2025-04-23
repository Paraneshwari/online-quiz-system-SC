
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

// Demo registered users with their passwords
const registeredUsers = [
  {
    id: 'admin-1',
    email: 'admin@quizcraft.com',
    password: 'Password123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=admin@quizcraft.com',
  },
  {
    id: 'instructor-1',
    email: 'instructor@quizcraft.com',
    password: 'Password123',
    name: 'Instructor User',
    role: 'instructor' as UserRole,
    avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=instructor@quizcraft.com',
  },
  {
    id: 'student-1',
    email: 'student@quizcraft.com',
    password: 'Password123',
    name: 'Student User',
    role: 'student' as UserRole,
    avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=student@quizcraft.com',
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("quizCraftUsers");
    return storedUsers ? JSON.parse(storedUsers) : registeredUsers;
  });

  // Check for stored user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("quizCraftUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Update localStorage whenever users change
  useEffect(() => {
    localStorage.setItem("quizCraftUsers", JSON.stringify(users));
  }, [users]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email and password are provided
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Find user with matching email and password
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Create user object without password
        const loggedInUser: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          avatarUrl: foundUser.avatarUrl,
        };
        
        setUser(loggedInUser);
        localStorage.setItem("quizCraftUser", JSON.stringify(loggedInUser));
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
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
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        role,
        avatarUrl: `https://api.dicebear.com/7.x/thumbs/svg?seed=${email}`,
      };
      
      // Add to users array
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      
      // Set current user and save to localStorage (without password)
      const userWithoutPassword: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatarUrl: newUser.avatarUrl,
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem("quizCraftUser", JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error((error as Error).message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!email) {
        throw new Error("Email is required");
      }
      
      // Check if user exists
      const userExists = users.some(u => u.email === email);
      if (!userExists) {
        throw new Error("No account found with this email address");
      }
      
      // In a real app, we would send an email with a reset link
      console.log(`Password reset instructions sent to ${email}`);
      
      // For demo purposes, let's create instructions on what would happen next
      console.log(`
        Reset instructions:
        1. User would receive an email with a reset link
        2. Link would contain a token valid for a limited time
        3. User would click the link and be directed to a password reset page
        4. After setting a new password, they would be directed to login
      `);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Password reset error:", error);
      throw new Error((error as Error).message || "Password reset failed. Please try again.");
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
