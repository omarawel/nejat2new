
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, onAuthStateChanged, signOut } from "firebase/auth"
import { LogIn, UserPlus, LogOut, UserCircle } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Logo } from "../icons"
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

export function AppHeader() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      })
      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out. Please try again.",
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
        
        <span className="text-xl font-bold">nejat</span>
      </Link>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        {loading ? (
          <>
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
            <div className="h-9 w-36 animate-pulse rounded-md bg-muted" />
          </>
        ) : user ? (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ""} />
                  <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{user.displayName || "User"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            {/* Login and Signup buttons removed for non-authenticated users */}
          </>
        )}
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  )
}
