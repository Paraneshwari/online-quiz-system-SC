
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Clock, BookOpen, BarChart4, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-quiz-purple-light/30 to-background pt-16 pb-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
                <span className="bg-gradient-to-r from-quiz-purple to-quiz-purple-dark bg-clip-text text-transparent">
                  Transform assessment
                </span>{" "}
                with beautiful quizzes
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Create engaging quizzes, track student progress, and gain valuable insights with our beautiful, modern assessment platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button asChild size="lg" className="gap-2">
                  <Link to="/register">
                    Start for free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative animate-scale-in" style={{ animationDelay: "0.6s" }}>
              <div className="rounded-2xl bg-gradient-to-tr from-quiz-purple-dark to-quiz-purple p-1 shadow-xl">
                <div className="bg-card rounded-xl p-6">
                  <img
                    src="https://placehold.co/600x400/E5DEFF/7E69AB?text=QuizCraft"
                    alt="QuizCraft Interface Preview"
                    className="rounded-lg shadow-sm w-full"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary rounded-full p-4 shadow-lg">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">Powerful features for modern assessment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-6 w-6 text-quiz-purple" />}
              title="Flexible Question Types"
              description="Create multiple choice, true/false, and fill-in-the-blank questions with ease."
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6 text-quiz-purple" />}
              title="Smart Scheduling"
              description="Schedule quizzes with customizable time limits and availability periods."
            />
            <FeatureCard
              icon={<BarChart4 className="h-6 w-6 text-quiz-purple" />}
              title="Detailed Analytics"
              description="Gain insights into student performance with comprehensive reports and charts."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-quiz-purple" />}
              title="Instant Feedback"
              description="Provide immediate feedback to students with detailed explanations for each answer."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-quiz-purple" />}
              title="Secure Assessment"
              description="Ensure the integrity of your assessments with secure quiz environment."
            />
            <FeatureCard
              icon={<BookOpen className="h-6 w-6 text-quiz-purple" />}
              title="Question Bank"
              description="Manage and organize questions by topic or category for reuse across quizzes."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-quiz-purple/10 to-quiz-purple-light/20 py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your assessments?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of educators who use QuizCraft to create engaging, insightful assessments.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/register">
              Get started today
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4 md:px-6 lg:px-8 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                QuizCraft
              </span>
              <span className="text-sm text-muted-foreground">
                © 2025 All rights reserved
              </span>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all">
      <div className="bg-primary/10 rounded-lg inline-flex p-3 mb-4">{icon}</div>
      <h3 className="font-heading text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
