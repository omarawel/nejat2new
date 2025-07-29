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
import { auth, db } from "@/lib/firebase"
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, UserCredential, updateProfile } from "firebase/auth"
import { useLanguage } from "@/components/language-provider"
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
})

interface Content {
  title: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  forgotPassword: string;
  loginButton: string;
  noAccount: string;
  signUp: string;
  loginFailed: string;
  userNotFound: string;
  wrongPassword: string;
  invalidCredential: string;
  unexpectedError: string;
  passwordResetSent: string;
  checkInbox: string;
  enterEmailForReset: string;
  error: string;
  noUserFound: string;
  failedToSendResetEmail: string;
  loginSuccess: string;
  welcomeBack: string;
  googleLogin: string;
}

const content: Record<string, Content> = {
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
    welcomeBack: "Willkommen zurück!",
    googleLogin: "Mit Google anmelden",
  },
  en: {
    title: "Login to Nejat Digital",
    description: "Enter your email below to login to your account",
    emailLabel: "Email",
    emailPlaceholder: "m@example.com",
    passwordLabel: "Password",
    forgotPassword: "Forgot your password?",
    loginButton: "Login",
    noAccount: "Don't have an account?",
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
    googleLogin: "Sign in with Google",
  },
}

const handleUserCreation = async (userCred: UserCredential, name?: string) => {
    const user = userCred.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        await setDoc(userDocRef, {
            email: user.email,
            displayName: name || user.displayName,
            createdAt: new Date(),
        });
        if (name && user.displayName !== name) {
            await updateProfile(user, { displayName: name });
        }
    }
};


export default function LoginPage() {
  const { language } = useLanguage();
  const c: Content = content[language as keyof typeof content] || content.de;

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
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
    } catch (err) { // Removed 'any'
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/user-not-found":
          case "auth/invalid-email":
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
      } else if (err instanceof Error) { // Check if it's a standard Error
         setError(err.message || c.unexpectedError);
         console.error(err);
      }
       else {
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
    } catch (err) { // Removed 'any'
        if (err instanceof FirebaseError && err.code === 'auth/user-not-found') {
             toast({
                variant: "destructive",
                title: c.error,
                description: c.noUserFound,
            });
        } else if (err instanceof Error) { // Check if it's a standard Error
             toast({
                variant: "destructive",
                title: c.error,
                description: err.message || c.failedToSendResetEmail,
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

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await handleUserCreation(userCredential);
       toast({
        title: c.loginSuccess,
        description: c.welcomeBack,
      })
      router.push("/");
    } catch (err) { // Removed 'any'
       if (err instanceof Error) {
            setError(err.message);
       } else {
            setError(c.unexpectedError);
       }
       console.error(err);
    } finally {
      setGoogleLoading(false);
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
            <Button type="submit" className="w-full" disabled={loading || googleLoading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {c.loginButton}
            </Button>
             <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">OR</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading || googleLoading}>
              {googleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.991,35.548,44,29.891,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
              )}
              {c.googleLogin}
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
