"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Grid, Star, UserPlus, Users, MessageSquareQuote } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { useMemo } from "react";
import { allTools } from "@/lib/tools";
import { AdBanner } from "@/components/ad-banner";
import { cn } from "@/lib/utils";
import { HadithOfTheDayCard } from "@/components/hadith-of-the-day-card";

const FeatureCard = ({ icon, name, toolKey }: { icon: string, name: string, toolKey: string }) => {
  return (
    <div className="flex flex-col justify-center items-center p-2 border border-border rounded-lg bg-card text-card-foreground hover:bg-accent/90 cursor-pointer transition-colors h-24">
      <div className={cn("text-3xl", toolKey === 'ar_qibla' && 'text-primary')}>{icon}</div>
      <div className="mt-2 text-xs text-center font-medium leading-snug break-words">{name}</div>
    </div>
  );
};

const content = {
  de: {
    title: "Dein digitaler Begleiter für den islamischen Alltag",
    description: "Finde alles, was du für deine spirituelle Reise brauchst: den gesamten Koran, eine umfassende Hadith-Sammlung und einzigartige KI-Tools, die dein Wissen erweitern.",
    button: "Registrieren",
    sectionTitle: "Entdecke mehr",
    sectionDescription: "Nützliche Werkzeuge für deinen Alltag.",
    hadithTitle: "Hadith des Tages",
    hadithButton: "Mehr entdecken",
    premiumTitle: "Mehr freischalten mit Premium",
    premiumDescription: "Erhalte Zugang zu exklusiven KI-Funktionen, einer werbefreien Erfahrung und unterstütze die fortlaufende Entwicklung der App.",
    premiumButton: "Jetzt upgraden",
    communityTitle: "Tritt unserer Community bei",
    communityDescription: "Tausche dich mit anderen aus, nimm an Events teil und wachse gemeinsam in deinem Glauben.",
    communityButton: "Zur Community",
  },
  en: {
    title: "Your Digital Companion for your daily Islamic life",
    description: "Find everything you need for your spiritual journey: the entire Quran, a comprehensive Hadith collection, and unique AI tools to expand your knowledge.",
    button: "Sign Up",
    sectionTitle: "Discover More",
    sectionDescription: "Useful tools for your daily life.",
    hadithTitle: "Hadith of the Day",
    hadithButton: "Discover More",
    premiumTitle: "Unlock More with Premium",
    premiumDescription: "Get access to exclusive AI features, an ad-free experience, and support the continued development of the app.",
    premiumButton: "Upgrade Now",
    communityTitle: "Join Our Community",
    communityDescription: "Connect with others, join events, and grow together in your faith.",
    communityButton: "Go to Community",
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
    <div className="flex flex-col items-center justify-center text-center flex-grow py-12 px-4">
       <section className="w-full max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          {c.title}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          {c.description}
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/signup">
              <UserPlus className="mr-2 h-5 w-5" />
              {c.button}
            </Link>
          </Button>
        </div>
      </section>

      <section className="mt-8 w-full max-w-4xl mx-auto">
        <AdBanner slotId="homepage-top-banner" />
      </section>
      
      <section id="features" className="w-full max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold">{c.sectionTitle}</h2>
        <p className="mt-2 text-md sm:text-lg text-muted-foreground">{c.sectionDescription}</p>
        <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-4">
          {localizedTools.map((tool) => {
            const card = <FeatureCard icon={tool.icon} name={tool.name} toolKey={tool.key} />;
            if (tool.href) {
                return <Link key={tool.key} href={tool.href}>{card}</Link>
            }
            return <div key={tool.key} className="opacity-50 cursor-not-allowed">{card}</div>;
          })}
        </div>
      </section>

      <section className="mt-16 w-full max-w-4xl mx-auto">
        <HadithOfTheDayCard />
      </section>

      <section className="mt-16 w-full max-w-4xl mx-auto">
        <AdBanner slotId="homepage-bottom" />
      </section>
      
       <section className="mt-16 w-full max-w-4xl mx-auto">
        <Card className="bg-transparent border-2 border-primary/20 shadow-xl">
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
