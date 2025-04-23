
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using QuizCraft, you agree to comply with and be bound by these terms.
            </p>
            
            <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
            <ul className="list-disc pl-6">
              <li>Maintain account confidentiality</li>
              <li>Provide accurate information</li>
              <li>Use the platform for educational purposes only</li>
              <li>Respect intellectual property rights</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
            <p className="mb-4">
              QuizCraft is not responsible for any damages arising from the use of our platform.
            </p>
            
            <h2 className="text-xl font-semibold mb-2">Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. 
              Continued use of the platform constitutes acceptance of updated terms.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TermsPage;
