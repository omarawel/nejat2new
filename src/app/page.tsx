
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid, Star } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { useMemo } from "react";
import { allTools } from "@/lib/tools";

const FeatureCard = ({ icon, name }: { icon: string, name: string }) => {
  return (
    <div className="flex flex-col justify-center items-center p-2 border border-border rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer transition-colors h-20">
      <span className="text-2xl">{icon}</span>
      <span className="mt-1 text-xs text-center font-medium leading-tight">{name}</span>
    </div>
  );
};

const content = {
  de: {
    title: "Dein digitaler Begleiter für den islamischen Alltag",
    description: "Finde alles, was du für deine spirituelle Reise brauchst: präzise Gebetszeiten, den gesamten Koran, eine umfassende Hadith-Sammlung und einzigartige KI-Tools, die dein Wissen erweitern.",
    button: "Funktionen entdecken",
    sectionTitle: "Entdecke mehr",
    sectionDescription: "Nützliche Werkzeuge für deinen Alltag.",
    premiumTitle: "Mehr freischalten mit Premium",
    premiumDescription: "Erhalte Zugang zu exklusiven KI-Funktionen, einer werbefreien Erfahrung und unterstütze die fortlaufende Entwicklung der App.",
    premiumButton: "Jetzt upgraden",
  },
  en: {
    title: "Your Digital Companion for your daily Islamic life",
    description: "Find everything you need for your spiritual journey: precise prayer times, the entire Quran, a comprehensive Hadith collection, and unique AI tools to expand your knowledge.",
    button: "Discover Features",
    sectionTitle: "Discover More",
    sectionDescription: "Useful tools for your daily life.",
    premiumTitle: "Unlock More with Premium",
    premiumDescription: "Get access to exclusive AI features, an ad-free experience, and support the continued development of the app.",
    premiumButton: "Upgrade Now",
  },
}

export default function Home() {
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] || content.de;

  const localizedTools = useMemo(() => {
    return allTools
      .map(tool => ({ ...tool, name: tool[language as keyof typeof tool] || tool.en }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [language]);

  return (
    <div className="flex flex-col items-center justify-center text-center flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground" dangerouslySetInnerHTML={{ __html: c.title.replace("islamischen Alltag", `<span class="text-primary">islamischen Alltag</span>`) }}>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          {c.description}
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="#features">
              <Grid className="mr-2 h-5 w-5" />
              {c.button}
            </Link>
          </Button>
        </div>
      </main>

      <section id="features" className="mt-20 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold">{c.sectionTitle}</h2>
        <p className="mt-2 text-md sm:text-lg text-muted-foreground">{c.sectionDescription}</p>
        <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-4">
          {localizedTools.map((tool) => {
            const card = <FeatureCard icon={tool.icon} name={tool.name} />;
            if (tool.href) {
                return <Link key={tool.key} href={tool.href}>{card}</Link>
            }
            return <div key={tool.key} className="opacity-50 cursor-not-allowed">{card}</div>;
          })}
        </div>
      </section>

      <section className="mt-20 w-full max-w-2xl mx-auto">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/20">
          <CardHeader className="items-center text-center p-8">
              <CardTitle className="text-4xl font-bold text-primary">
                {c.premiumTitle}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground max-w-md">
                {c.premiumDescription}
              </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
              <Button size="lg" asChild>
                <Link href="/subscribe">
                    <Star className="mr-2 h-5 w-5" />
                    {c.premiumButton}
                </Link>
              </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
