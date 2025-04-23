
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>About QuizCraft</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              QuizCraft is an innovative online platform designed to revolutionize the way students learn and instructors assess knowledge. 
              Our mission is to create an engaging, interactive, and efficient learning environment.
            </p>
            
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="mb-4">
              We aim to transform traditional assessment methods by providing a comprehensive, 
              user-friendly quiz management system that supports both educators and learners.
            </p>
            
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-6">
              <li>Create and manage quizzes with ease</li>
              <li>Comprehensive question bank</li>
              <li>Detailed performance analytics</li>
              <li>Secure and intuitive user experience</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
