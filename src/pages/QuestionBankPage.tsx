
import { useAuth } from "@/contexts/AuthContext";
import { PageLayout } from "@/components/layout/PageLayout";
import { QuestionBankHeader } from "@/components/question-bank/QuestionBankHeader";
import { QuestionBankList } from "@/components/question-bank/QuestionBankList";
import { QuestionBankProvider } from "@/components/question-bank/QuestionBankContext";

export default function QuestionBankPage() {
  const { user } = useAuth();
  
  if (!user || !["admin", "instructor"].includes(user.role)) {
    return (
      <PageLayout>
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p>You don't have permission to access the Question Bank.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <QuestionBankProvider>
        <div className="container mx-auto py-10 space-y-6">
          <QuestionBankHeader />
          <QuestionBankList />
        </div>
      </QuestionBankProvider>
    </PageLayout>
  );
}
