
import { PageLayout } from "@/components/layout/PageLayout";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </div>
          <Settings2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <AccountSettings />
      </div>
    </PageLayout>
  );
}
