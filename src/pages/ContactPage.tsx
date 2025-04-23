
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const ContactPage = () => {
  const contacts = [
    {
      name: "Sahana J G",
      email: "231001172@rajalakshmi.edu.in",
    },
    {
      name: "Sameeha A",
      email: "231001176@rajalakshmi.edu.in",
    },
    {
      name: "Saiswetha M",
      email: "231001174@rajalakshmi.edu.in",
    },
    {
      name: "Paraneshwari Muniyandi",
      email: "231001141@rajalakshmi.edu.in",
    },
    {
      name: "Pushpa G",
      email: "231001158@rajalakshmi.edu.in",
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              For any queries or support, please reach out to our team members:
            </p>
            
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center space-x-4 bg-muted p-4 rounded-lg">
                  <div>
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <a 
                        href={`mailto:${contact.email}`} 
                        className="text-blue-600 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
