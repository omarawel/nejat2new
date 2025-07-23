"use client"

import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const tools = [
  { icon: "🕌" },
  { icon: "📖" },
  { icon: "📿" },
  { icon: "🕋" },
  { icon: "🌙" },
  { icon: "🤲" },
  { icon: "🧭" },
  { icon: "📅" },
];

const content = {
  de: {
    title1: "Dein digitaler Begleiter",
    title2: "für den",
    title3: "islamischen Alltag",
    description: "Finde alles, was du für deine spirituelle Reise brauchst: präzise Gebetszeiten, den gesamten Koran, eine umfassende Hadith-Sammlung und einzigartige KI-Tools, die dein Wissen erweitern.",
    button: "Funktionen entdecken",
    sectionTitle: "Entdecke mehr",
    sectionDescription: "Nützliche Werkzeuge für deinen Alltag.",
  },
  en: {
    title1: "Your Digital Companion",
    title2: "for your",
    title3: "daily Islamic life",
    description: "Find everything you need for your spiritual journey: precise prayer times, the entire Quran, a comprehensive Hadith collection, and unique AI tools to expand your knowledge.",
    button: "Discover Features",
    sectionTitle: "Discover More",
    sectionDescription: "Useful tools for your daily life.",
  }
}

export default function Home() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <div className="flex flex-col items-center justify-center text-center flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
          {c.title1}
          <br />
          {c.title2} <span className="text-primary">{c.title3}</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          {c.description}
        </p>
        <div className="mt-8">
          <Button size="lg">
            <Grid className="mr-2 h-5 w-5" />
            {c.button}
          </Button>
        </div>
      </main>

      <section className="mt-20 w-full max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold">{c.sectionTitle}</h2>
        <p className="mt-2 text-md sm:text-lg text-muted-foreground">{c.sectionDescription}</p>
        <div className="mt-8 grid grid-cols-4 md:grid-cols-8 gap-4">
          {tools.map((tool, index) => (
            <div key={index} className="flex justify-center items-center p-4 border border-border rounded-lg bg-card hover:bg-accent cursor-pointer transition-colors">
              <span className="text-3xl">{tool.icon}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
