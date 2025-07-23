
"use client"

import { HalalHaramForm } from "./insights-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const content = {
    de: {
        title: "Halal & Haram KI-Checker",
        description: "Überprüfe den islamischen Status von Produkten, Zutaten oder Themen.",
        cardTitle: "Thema überprüfen",
        cardDescription: "Gib ein Thema, ein Produkt oder eine Zutat ein (z.B. 'Gelatine', 'Kreditkarte', 'Musik'). Die KI wird eine detaillierte Einschätzung auf Basis islamischer Quellen geben.",
        backToFeatures: "Zurück zu den Funktionen",
    },
    en: {
        title: "Halal & Haram AI Checker",
        description: "Check the Islamic status of products, ingredients, or topics.",
        cardTitle: "Check a Topic",
        cardDescription: "Enter a topic, product, or ingredient (e.g., 'Gelatin', 'Credit Card', 'Music'). The AI will provide a detailed assessment based on Islamic sources.",
        backToFeatures: "Back to Features",
    }
}

export default function HalalHaramCheckerPage() {
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
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center justify-center gap-2">
            <ShieldCheck className="size-8" />
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
              <HalalHaramForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
