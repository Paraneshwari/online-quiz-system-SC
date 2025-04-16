
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LogOut, 
  User, 
  Settings, 
  BarChart,
  BookOpen,
  ListChecks,
  FilePlus,
  Users,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', roles: ['admin', 'instructor', 'student'] },
    { name: 'Quizzes', path: '/quizzes', roles: ['admin', 'instructor', 'student'] },
    { name: 'Create Quiz', path: '/create-quiz', roles: ['admin', 'instructor'] },
    { name: 'Students', path: '/students', roles: ['admin', 'instructor'] },
    { name: 'Question Bank', path: '/question-bank', roles: ['admin', 'instructor'] },
    { name: 'Reports', path: '/reports', roles: ['admin', 'instructor'] },
  ];
  
  const navIcons: Record<string, React.ReactNode> = {
    'Dashboard': <BarChart className="h-4 w-4 mr-2" />,
    'Quizzes': <BookOpen className="h-4 w-4 mr-2" />,
    'Create Quiz': <FilePlus className="h-4 w-4 mr-2" />,
    'Students': <Users className="h-4 w-4 mr-2" />,
    'Question Bank': <ListChecks className="h-4 w-4 mr-2" />,
    'Reports': <BarChart className="h-4 w-4 mr-2" />,
  };
  
  const filteredNavItems = isAuthenticated && user 
    ? navItems.filter(item => item.roles.includes(user.role)) 
    : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              QuizCraft
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {isAuthenticated && filteredNavItems.map(item => (
              <Link 
                key={item.path}
                to={item.path} 
                className="transition-colors hover:text-primary flex items-center"
              >
                {navIcons[item.name]}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                      <AvatarFallback>{user?.name ? getInitials(user.name) : '?'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">{user?.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile navigation */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2 mb-8" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                      QuizCraft
                    </span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {filteredNavItems.map(item => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center py-2 text-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {navIcons[item.name]}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    <Link
                      to="/profile"
                      className="flex items-center py-2 text-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center py-2 text-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Settings</span>
                    </Link>
                    <button 
                      className="flex items-center py-2 text-foreground hover:text-primary"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Log out</span>
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
