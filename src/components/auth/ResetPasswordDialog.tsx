
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordDialog() {
  const { loading, resetPassword } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setAuthError(null);
    try {
      await resetPassword(values.email);
      setResetSuccess(true);
      toast({
        title: "Password reset email sent",
        description: "Please check your email for instructions to reset your password.",
      });
    } catch (error) {
      setAuthError((error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" type="button" className="mx-auto">
          Forgot password?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            Enter your email address and we'll send you instructions to reset your password.
          </DialogDescription>
        </DialogHeader>
        {resetSuccess ? (
          <div className="space-y-4">
            <p className="text-green-600">
              Password reset instructions sent! Please check your email inbox.
            </p>
            <p className="text-sm text-muted-foreground">
              If you don't see the email, please check your spam folder. The link in the email will be valid for 24 hours.
            </p>
            <DialogFooter>
              <Button type="button" onClick={() => {
                setIsOpen(false);
                setResetSuccess(false);
                form.reset();
              }}>
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {authError && (
                <div className="text-sm text-destructive">{authError}</div>
              )}
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send reset instructions"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
