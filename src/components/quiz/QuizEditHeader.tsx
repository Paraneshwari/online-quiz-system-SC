
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export function QuizEditHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to="/quizzes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Quiz</h1>
      </div>
      <Button className="gap-2">
        <Save className="h-4 w-4" />
        Save Changes
      </Button>
    </div>
  );
}
