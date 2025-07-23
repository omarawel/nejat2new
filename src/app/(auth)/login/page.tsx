
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { Eye, EyeOff, Loader2, Terminal } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null)
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      })
      router.push("/")
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-credential":
           setError("Invalid credentials. Please check your email and password.");
           break;
        default:
          setError("An unexpected error occurred. Please try again.");
          console.error(error);
          break;
      }
    } finally {
      setLoading(false)
    }
  }

  async function handlePasswordReset() {
    const email = form.getValues("email");
    if (!email) {
      form.setError("email", { type: "manual", message: "Please enter your email to reset password." });
      return;
    }
    
    try {
        await sendPasswordResetEmail(auth, email);
        toast({
            title: "Password Reset Email Sent",
            description: "Please check your inbox to reset your password.",
        });
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
             toast({
                variant: "destructive",
                title: "Error",
                description: "No user found with this email address.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to send password reset email. Please try again later.",
            });
        }
    }
  }


  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <div className="flex justify-center mb-4">
          
        </div>
        <CardTitle className="text-2xl text-center">Login to Nejat Digital</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Login Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Button
                            type="button"
                            variant="link"
                            className="ml-auto h-auto p-0 text-sm"
                            onClick={handlePasswordReset}
                        >
                            Forgot your password?
                        </Button>
                    </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
