
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Save } from "lucide-react";

export function QuizSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Settings</CardTitle>
        <CardDescription>Configure additional options for your quiz</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Quiz Visibility</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="radio" id="public" name="visibility" className="h-4 w-4" defaultChecked />
                <label htmlFor="public">Public - All enrolled students can access</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="private" name="visibility" className="h-4 w-4" />
                <label htmlFor="private">Private - Only selected students can access</label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Results Visibility</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="radio" id="immediate" name="results" className="h-4 w-4" defaultChecked />
                <label htmlFor="immediate">Show results immediately after completion</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="after-due" name="results" className="h-4 w-4" />
                <label htmlFor="after-due">Show results after due date</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="hidden" name="results" className="h-4 w-4" />
                <label htmlFor="hidden">Do not show results to students</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={() => window.history.back()} variant="outline">
            Back
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
