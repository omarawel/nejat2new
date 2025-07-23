"use client"

import * as React from "react"
import { Moon, Sun, Paintbrush, Palette } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

type Theme = "light" | "dark" | "rose" | "blue" | "black";
const themes: Theme[] = ["light", "dark", "rose", "blue", "black"];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:hidden" />
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hidden light:hidden dark:inline-block rose:hidden blue:hidden black:hidden" />
      <Paintbrush className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hidden rose:inline-block" />
      <Paintbrush className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hidden blue:inline-block text-blue-400" />
      <Palette className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hidden black:inline-block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
