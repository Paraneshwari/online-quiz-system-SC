
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-orange-500 transition-all" />
      ) : (
        <Moon className="h-5 w-5 text-blue-400 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
