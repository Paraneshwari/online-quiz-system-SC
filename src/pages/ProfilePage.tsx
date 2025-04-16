
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { QuizHistory } from "@/components/profile/QuizHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("details");

  if (!user) {
    return (
      <PageLayout>
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p>Please log in to view your profile.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-10 space-y-8">
        <ProfileHeader user={user} />
        
        <Tabs defaultValue="details" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="details">Profile Details</TabsTrigger>
            <TabsTrigger value="history">Quiz History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-6">
            <ProfileDetails user={user} />
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <QuizHistory userId={user.id} />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
