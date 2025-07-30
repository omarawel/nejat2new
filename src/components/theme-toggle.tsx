
"use client"

import * as React from "react"
import { Moon, Sun, Paintbrush, Palette } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Theme = "light" | "dark" | "rose" | "blue" | "black" | "teal";
const themes: Theme[] = ["light", "teal", "dark", "rose", "blue", "black"];

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
      <Sun className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all", theme !== 'light' && "hidden")} />
      <Moon className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all", theme !== 'dark' && "hidden")} />
      <Paintbrush className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all", theme !== 'teal' && "hidden")} />
      <Paintbrush className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all", theme !== 'rose' && "hidden")} />
      <Paintbrush className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-blue-400", theme !== 'blue' && "hidden")} />
      <Palette className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all", theme !== 'black' && "hidden")} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
