
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, onAuthStateChanged, signOut } from "firebase/auth"
import { LogIn, UserPlus, LogOut, UserCircle, LayoutGrid, Shield } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "../ui/button"
import { auth } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "../language-provider"
import { isAdmin } from "@/lib/admin"
import { QuotaDisplay } from "../quota-display"
import { Badge } from "../ui/badge"

const content = {
  de: {
    login: "Anmelden",
    signup: "Konto erstellen",
    myAccount: "Mein Konto",
    profile: "Profil",
    dashboard: "Mein Dashboard",
    admin: "Admin",
    logout: "Abmelden",
    loggedOut: "Abgemeldet",
    loggedOutSuccess: "Sie wurden erfolgreich abgemeldet.",
    logoutFailed: "Abmeldung fehlgeschlagen",
    logoutError: "Beim Abmelden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
    user: "Benutzer"
  },
  en: {
    login: "Login",
    signup: "Create Account",
    myAccount: "My Account",
    profile: "Profile",
    dashboard: "My Dashboard",
    admin: "Admin",
    logout: "Log out",
    loggedOut: "Logged Out",
    loggedOutSuccess: "You have been successfully logged out.",
    logoutFailed: "Logout Failed",
    logoutError: "An error occurred while logging out. Please try again.",
    user: "User"
  },
}

export function AppHeader() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] || content.de;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const adminStatus = await isAdmin(currentUser.uid);
        setUserIsAdmin(adminStatus);
      } else {
        setUserIsAdmin(false);
      }
      setLoading(false);
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast({
        title: c.loggedOut,
        description: c.loggedOutSuccess,
      })
      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: c.logoutFailed,
        description: c.logoutError,
      })
    }
  }

  const getInitials = (name?: string | null) => {
    if (!name) return ""
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-8">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl font-bold">Nejat</span>
        <Badge>Pro</Badge>
      </Link>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        {loading ? (
          <>
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
            <div className="h-9 w-36 animate-pulse rounded-md bg-muted" />
          </>
        ) : user ? (
            <>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ""} />
                  <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{user.displayName || c.user}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{c.myAccount}</DropdownMenuLabel>
              <div className="px-2 py-1.5">
                <QuotaDisplay />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                <LayoutGrid className="mr-2 h-4 w-4" />
                <span>{c.dashboard}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>{c.profile}</span>
              </DropdownMenuItem>
              {userIsAdmin && (
                 <DropdownMenuItem onClick={() => router.push('/admin/dashboard')}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>{c.admin}</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{c.logout}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </>
        ) : (
          <>
            <QuotaDisplay />
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/login">
                    <LogIn />
                    {c.login}
                </Link>
            </Button>
             <Button asChild>
                <Link href="/signup">
                    <UserPlus />
                    {c.signup}
                </Link>
            </Button>
          </>
        )}
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  )
}
