
import { PageLayout } from "@/components/layout/PageLayout";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, Bell, Shield, Database, Globe, Key } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const { user } = useAuth();
  
  const isAdmin = user?.role === "admin";

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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            {isAdmin && <TabsTrigger value="security">Security</TabsTrigger>}
            {isAdmin && <TabsTrigger value="database">Database</TabsTrigger>}
            {isAdmin && <TabsTrigger value="api">API Keys</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="account">
            <AccountSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationSettings />
              </CardContent>
            </Card>
          </TabsContent>
          
          {isAdmin && (
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Configure security policies and user access</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminSecuritySettings />
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          {isAdmin && (
            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-muted-foreground" />
                    Database Configuration
                  </CardTitle>
                  <CardDescription>Configure database settings and connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <DatabaseSettings />
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          {isAdmin && (
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-muted-foreground" />
                    API Keys
                  </CardTitle>
                  <CardDescription>Manage API keys for external integrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiKeySettings />
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </PageLayout>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Email Notifications</h3>
        <div className="grid gap-4">
          <NotificationOption 
            title="Quiz Submissions" 
            description="Get notified when students submit quizzes"
            defaultChecked={true}
          />
          <NotificationOption 
            title="New Registrations" 
            description="Get notified when new users register"
            defaultChecked={true}
          />
          <NotificationOption 
            title="System Alerts" 
            description="Get notified about important system events"
            defaultChecked={true}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">In-App Notifications</h3>
        <div className="grid gap-4">
          <NotificationOption 
            title="Quiz Activity" 
            description="Show notifications for quiz activity"
            defaultChecked={true}
          />
          <NotificationOption 
            title="Messages" 
            description="Show notifications for new messages"
            defaultChecked={true}
          />
          <NotificationOption 
            title="Updates" 
            description="Show notifications for system updates"
            defaultChecked={false}
          />
        </div>
      </div>
    </div>
  );
}

function NotificationOption({ title, description, defaultChecked }: { 
  title: string; 
  description: string; 
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  
  return (
    <div className="flex items-center justify-between space-x-4">
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div className="w-11 h-6 bg-muted rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>
    </div>
  );
}

function AdminSecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Access Control</h3>
        <div className="border rounded-md p-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="user-role-select" className="block text-sm font-medium">
              Default User Role
            </label>
            <select 
              id="user-role-select" 
              className="w-full p-2 border rounded-md bg-background"
              defaultValue="student"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
            <p className="text-sm text-muted-foreground">
              New users will be assigned this role by default
            </p>
          </div>
          
          <NotificationOption 
            title="Require Email Verification" 
            description="New users must verify their email before accessing the system"
            defaultChecked={true}
          />
          
          <NotificationOption 
            title="Allow Public Registration" 
            description="Allow anyone to register an account"
            defaultChecked={true}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Password Policy</h3>
        <div className="border rounded-md p-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="min-password-length" className="block text-sm font-medium">
              Minimum Password Length
            </label>
            <select 
              id="min-password-length" 
              className="w-full p-2 border rounded-md bg-background"
              defaultValue="8"
            >
              <option value="6">6 characters</option>
              <option value="8">8 characters</option>
              <option value="10">10 characters</option>
              <option value="12">12 characters</option>
            </select>
          </div>
          
          <NotificationOption 
            title="Require Special Characters" 
            description="Passwords must contain at least one special character"
            defaultChecked={true}
          />
          
          <NotificationOption 
            title="Require Numbers" 
            description="Passwords must contain at least one number"
            defaultChecked={true}
          />
          
          <NotificationOption 
            title="Require Mixed Case" 
            description="Passwords must contain both uppercase and lowercase letters"
            defaultChecked={true}
          />
        </div>
      </div>
    </div>
  );
}

function DatabaseSettings() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Configure your database connection and settings. Enter your own database credentials here.
      </p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="db-host" className="text-sm font-medium">Database Host</label>
          <input 
            type="text"
            id="db-host"
            placeholder="Enter database host"
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="db-name" className="text-sm font-medium">Database Name</label>
          <input 
            type="text"
            id="db-name"
            placeholder="Enter database name"
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="db-user" className="text-sm font-medium">Database User</label>
          <input 
            type="text"
            id="db-user"
            placeholder="Enter database username"
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="db-pass" className="text-sm font-medium">Database Password</label>
          <input 
            type="password"
            id="db-pass"
            placeholder="Enter database password"
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="db-port" className="text-sm font-medium">Database Port</label>
          <input 
            type="text"
            id="db-port"
            placeholder="Enter database port"
            className="w-full p-2 border rounded-md bg-background"
            defaultValue="5432"
          />
        </div>
        
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Test Connection
        </button>
        
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Save Database Configuration
        </button>
      </div>
    </div>
  );
}

function ApiKeySettings() {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Main API Key", key: "", created: "Not yet created", lastUsed: "Never" }
  ]);
  
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Generate and manage API keys for external integrations. Keep these keys secure.
      </p>
      
      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <h3 className="text-base font-medium mb-4">Available API Keys</h3>
          
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="flex flex-col space-y-2 p-3 border rounded-md">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{apiKey.name}</h4>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                      Generate
                    </button>
                    <button className="px-2 py-1 text-xs bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20">
                      Revoke
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    value={apiKey.key || "••••••••••••••••••••••••••••••"}
                    readOnly
                    className="w-full p-2 bg-muted border rounded-md text-xs font-mono"
                  />
                  <button className="p-2 bg-muted rounded-md hover:bg-muted/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 text-xs text-muted-foreground">
                  <span>Created: {apiKey.created}</span>
                  <span>Last Used: {apiKey.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h3 className="text-base font-medium mb-4">Create New API Key</h3>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="new-key-name" className="text-sm font-medium">Key Name</label>
              <input 
                type="text"
                id="new-key-name"
                placeholder="Enter key name"
                className="w-full p-2 border rounded-md bg-background"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="new-key-expiry" className="text-sm font-medium">Expiration</label>
              <select 
                id="new-key-expiry" 
                className="w-full p-2 border rounded-md bg-background"
                defaultValue="never"
              >
                <option value="never">Never</option>
                <option value="30days">30 Days</option>
                <option value="90days">90 Days</option>
                <option value="1year">1 Year</option>
              </select>
            </div>
            
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Create New API Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
