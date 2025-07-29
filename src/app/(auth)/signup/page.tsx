
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { auth } from "@/lib/firebase"
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useLanguage } from "@/components/language-provider"


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const content = {
    de: {
        createAccount: "Konto erstellen",
        enterInfo: "Geben Sie Ihre Informationen ein, um ein Konto zu erstellen",
        signupFailed: "Registrierung fehlgeschlagen",
        nameLabel: "Name",
        namePlaceholder: "Ihr Name",
        emailLabel: "Email",
        emailPlaceholder: "m@example.com",
        passwordLabel: "Passwort",
        confirmPasswordLabel: "Passwort bestätigen",
        acceptTerms: "Akzeptieren Sie die Allgemeinen Geschäftsbedingungen",
        termsDescription: "Sie stimmen unseren Nutzungsbedingungen und Datenschutzrichtlinien zu.",
        createAccountButton: "Konto erstellen",
        alreadyHaveAccount: "Haben Sie bereits ein Konto?",
        login: "Anmelden",
        emailInUse: "Diese E-Mail-Adresse wird bereits verwendet.",
        invalidEmail: "Die E-Mail-Adresse ist ungültig.",
        operationNotAllowed: "E-Mail/Passwort-Konten sind nicht aktiviert.",
        weakPassword: "Das Passwort ist zu schwach.",
        unexpectedError: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        accountCreated: "Konto erstellt",
        signedUpSuccess: "Sie haben sich erfolgreich registriert.",
        googleSignup: "Mit Google anmelden",
    },
    en: {
        createAccount: "Create an Account",
        enterInfo: "Enter your information to create an account",
        signupFailed: "Signup Failed",
        nameLabel: "Name",
        namePlaceholder: "Your Name",
        emailLabel: "Email",
        emailPlaceholder: "m@example.com",
        passwordLabel: "Password",
        confirmPasswordLabel: "Confirm Password",
        acceptTerms: "Accept terms and conditions",
        termsDescription: "You agree to our Terms of Service and Privacy Policy.",
        createAccountButton: "Create an account",
        alreadyHaveAccount: "Already have an account?",
        login: "Login",
        emailInUse: "This email address is already in use.",
        invalidEmail: "The email address is not valid.",
        operationNotAllowed: "Email/password accounts are not enabled.",
        weakPassword: "The password is too weak.",
        unexpectedError: "An unexpected error occurred. Please try again.",
        accountCreated: "Account Created",
        signedUpSuccess: "You have been successfully signed up.",
        googleSignup: "Sign up with Google",
    }
};


export default function SignupPage() {
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] || content.de;

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null)
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: values.name,
      });

      toast({
        title: c.accountCreated,
        description: c.signedUpSuccess,
      })
      
      router.push("/");

    } catch (err) {
      if (typeof err === 'object' && err !== null && 'code' in err) {
       const firebaseError = err as { code: string };
       switch (firebaseError.code) {
        case "auth/email-already-in-use":
          setError(c.emailInUse);
          break;
        case "auth/invalid-email":
          setError(c.invalidEmail);
          break;
        case "auth/operation-not-allowed":
          setError(c.operationNotAllowed);
          break;
        case "auth/weak-password":
          setError(c.weakPassword);
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

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
       toast({
        title: c.accountCreated,
        description: c.signedUpSuccess,
      })
      router.push("/");
    } catch (err) {
       if (typeof err === 'object' && err !== null && 'message' in err) {
            setError((err as {message: string}).message);
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
        <CardTitle className="text-2xl text-center">{c.createAccount}</CardTitle>
        <CardDescription className="text-center">
          {c.enterInfo}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
             {error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>{c.signupFailed}</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{c.nameLabel}</FormLabel>
                  <FormControl>
                    <Input placeholder={c.namePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormLabel>{c.passwordLabel}</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{c.confirmPasswordLabel}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                                {c.acceptTerms}
                            </FormLabel>
                            <FormDescription>
                                {c.termsDescription}
                            </FormDescription>
                             <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
            <Button type="submit" className="w-full" disabled={loading || googleLoading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {c.createAccountButton}
            </Button>
          </form>
        </Form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">OR</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogleSignup} disabled={loading || googleLoading}>
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
          {c.googleSignup}
        </Button>
        <div className="mt-4 text-center text-sm">
          {c.alreadyHaveAccount}{" "}
          <Link href="/login" className="underline">
            {c.login}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
