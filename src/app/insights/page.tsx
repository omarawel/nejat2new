
"use client"

import { InsightsForm } from "./insights-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const content = {
    de: {
        title: "KI-Gelehrter",
        description: "Stelle Fragen und erlange durch KI ein tieferes Verständnis für islamische Texte.",
        cardTitle: "Stelle eine Frage",
        cardDescription: "Gib eine Frage zum Islam, dem Koran oder Hadithen ein. Die KI wird eine aufschlussreiche Antwort auf Basis ihres Wissens geben.",
        backToFeatures: "Zurück zu den Funktionen",
    },
    en: {
        title: "AI Scholar",
        description: "Ask questions and gain a deeper understanding of Islamic texts through AI.",
        cardTitle: "Ask a Question",
        cardDescription: "Enter a question about Islam, the Quran, or Hadith. The AI will provide an insightful answer based on its knowledge.",
        backToFeatures: "Back to Features",
    }
}

export default function InsightsPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

  return (
    <div className="flex-grow flex flex-col p-4 sm:p-6 lg:p-8 w-full">
      <div className="w-full max-w-2xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {c.backToFeatures}
            </Link>
        </Button>
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {c.title}
          </h1>
          <p className="text-muted-foreground mt-2">
            {c.description}
          </p>
        </header>

        <Card className="mt-8">
          <CardHeader>
              <CardTitle>{c.cardTitle}</CardTitle>
              <CardDescription>{c.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent>
              <InsightsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
