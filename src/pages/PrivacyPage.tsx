
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Information Collection</h2>
            <p className="mb-4">
              We collect personal information that you provide directly to us, 
              such as when you create an account, take a quiz, or update your profile.
            </p>
            
            <h2 className="text-xl font-semibold mb-2">Data Usage</h2>
            <p className="mb-4">
              Your data is used solely for improving your learning experience, 
              providing personalized quiz recommendations, and generating performance reports.
            </p>
            
            <h2 className="text-xl font-semibold mb-2">Data Protection</h2>
            <p className="mb-4">
              We implement industry-standard security measures to protect your personal information 
              from unauthorized access, disclosure, alteration, or destruction.
            </p>
            
            <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
            <ul className="list-disc pl-6">
              <li>Access your personal information</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your account</li>
              <li>Opt-out of non-essential communications</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;
