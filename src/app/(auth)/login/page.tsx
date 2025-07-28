
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, sendPasswordResetEmail, FirebaseError } from "firebase/auth"
import { useLanguage } from "@/components/language-provider"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
})

const content = {
  de: {
    title: "Anmelden bei Nejat Digital",
    description: "Geben Sie Ihre E-Mail-Adresse unten ein, um sich bei Ihrem Konto anzumelden",
    emailLabel: "Email",
    emailPlaceholder: "m@example.com",
    passwordLabel: "Passwort",
    forgotPassword: "Haben Sie Ihr Passwort vergessen?",
    loginButton: "Anmelden",
    noAccount: "Sie haben noch kein Konto?",
    signUp: "Registrieren",
    loginFailed: "Anmeldung fehlgeschlagen",
    userNotFound: "Kein Konto mit dieser E-Mail-Adresse gefunden.",
    wrongPassword: "Falsches Passwort. Bitte versuchen Sie es erneut.",
    invalidCredential: "Ungültige Anmeldeinformationen. Bitte überprüfen Sie Ihre E-Mail-Adresse und Ihr Passwort.",
    unexpectedError: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    passwordResetSent: "E-Mail zum Zurücksetzen des Passworts gesendet",
    checkInbox: "Bitte überprüfen Sie Ihren Posteingang, um Ihr Passwort zurückzusetzen.",
    enterEmailForReset: "Bitte geben Sie Ihre E-Mail-Adresse ein, um das Passwort zurückzusetzen.",
    error: "Fehler",
    noUserFound: "Kein Benutzer mit dieser E-Mail-Adresse gefunden.",
    failedToSendResetEmail: "Das Senden der E-Mail zum Zurücksetzen des Passworts ist fehlgeschlagen. Bitte versuchen Sie es später erneut.",
    loginSuccess: "Anmeldung erfolgreich",
    welcomeBack: "Willkommen zurück!"
  },
  en: {
    title: "Login to Nejat Digital",
    description: "Enter your email below to login to your account",
    emailLabel: "Email",
    emailPlaceholder: "m@example.com",
    passwordLabel: "Password",
    forgotPassword: "Forgot your password?",
    loginButton: "Login",
    noAccount: "Don&apos;t have an account?",
    signUp: "Sign up",
    loginFailed: "Login Failed",
    userNotFound: "No account found with this email address.",
    wrongPassword: "Incorrect password. Please try again.",
    invalidCredential: "Invalid credentials. Please check your email and password.",
    unexpectedError: "An unexpected error occurred. Please try again.",
    passwordResetSent: "Password Reset Email Sent",
    checkInbox: "Please check your inbox to reset your password.",
    enterEmailForReset: "Please enter your email to reset password.",
    error: "Error",
    noUserFound: "No user found with this email address.",
    failedToSendResetEmail: "Failed to send password reset email. Please try again later.",
    loginSuccess: "Login Successful",
    welcomeBack: "Welcome back!",
  },
}


export default function LoginPage() {
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] || content.de;

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
        title: c.loginSuccess,
        description: c.welcomeBack,
      })
      router.push("/")
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/user-not-found":
            setError(c.userNotFound);
            break;
          case "auth/wrong-password":
            setError(c.wrongPassword);
            break;
          case "auth/invalid-credential":
            setError(c.invalidCredential);
            break;
          default:
            setError(c.unexpectedError);
            console.error(err);
            break;
        }
      } else {
         setError(c.unexpectedError);
         console.error(err);
      }
    } finally {
      setLoading(false)
    }
  }

  async function handlePasswordReset() {
    const email = form.getValues("email");
    if (!email) {
      form.setError("email", { type: "manual", message: c.enterEmailForReset });
      return;
    }
    
    try {
        await sendPasswordResetEmail(auth, email);
        toast({
            title: c.passwordResetSent,
            description: c.checkInbox,
        });
    } catch (err: unknown) {
        if (err instanceof FirebaseError && err.code === 'auth/user-not-found') {
             toast({
                variant: "destructive",
                title: c.error,
                description: c.noUserFound,
            });
        } else {
            toast({
                variant: "destructive",
                title: c.error,
                description: c.failedToSendResetEmail,
            });
        }
    }
  }


  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <div className="flex justify-center mb-4">
          
        </div>
        <CardTitle className="text-2xl text-center">{c.title}</CardTitle>
        <CardDescription className="text-center">
          {c.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>{c.loginFailed}</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{c.emailLabel}</FormLabel>
                  <FormControl>
                    <Input placeholder={c.emailPlaceholder} {...field} />
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
                        <FormLabel>{c.passwordLabel}</FormLabel>
                        <Button
                            type="button"
                            variant="link"
                            className="ml-auto h-auto p-0 text-sm"
                            onClick={handlePasswordReset}
                        >
                            {c.forgotPassword}
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
              {c.loginButton}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {c.noAccount}{" "}
          <Link href="/signup" className="underline">
            {c.signUp}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
