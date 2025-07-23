"use client"

import * as React from "react"
import { Moon, Sun, Paintbrush } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

type Theme = "light" | "dark" | "rose" | "blue";
const themes: Theme[] = ["light", "dark", "rose", "blue"];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Paintbrush;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:hidden" />
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hidden light:hidden dark:inline-block rose:hidden blue:hidden" />
      <Paintbrush className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hidden rose:inline-block" />
      <Paintbrush className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hidden blue:inline-block text-blue-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
