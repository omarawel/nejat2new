"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Logo } from "../icons"
import Link from "next/link"
import { Button } from "../ui/button"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-8">
      <div className="flex items-center gap-2">
        <Logo className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold">nejat</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
            <Link href="/login">Anmelden</Link>
        </Button>
        <Button asChild>
            <Link href="/signup">Konto erstellen</Link>
        </Button>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  )
}
