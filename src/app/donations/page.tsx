
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HandCoins, ArrowLeft, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import Image from 'next/image';

const content = {
    de: {
        pageTitle: "Spenden & Wohltätigkeit (Zakat & Sadaqa)",
        pageDescription: "Unterstütze geprüfte Projekte und erfülle deine Zakat-Pflicht.",
        backToFeatures: "Zurück zu den Funktionen",
        zakatTitle: "Was ist Zakat?",
        zakatDescription: "Zakat ist eine der fünf Säulen des Islam. Es ist eine obligatorische jährliche Spende von 2,5% des eigenen Vermögens, das den Nisab-Schwellenwert überschreitet und ein Jahr lang gehalten wurde. Sie dient der Reinigung deines Vermögens und der Unterstützung von Bedürftigen.",
        sadaqaTitle: "Was ist Sadaqa?",
        sadaqaDescription: "Sadaqa ist eine freiwillige Spende, die jederzeit gegeben werden kann. Sie ist ein Akt der Dankbarkeit und kann Sünden tilgen. Jede gute Tat, selbst ein Lächeln, kann eine Sadaqa sein.",
        projectsTitle: "Empfohlene Projekte",
        calculateZakat: "Zakat-Rechner",
        projects: [
            { name: "MuslimeHelfen", description: "Hilfsprojekte für notleidende Muslime weltweit.", link: "https://muslimehelfen.org/", image: "https://placehold.co/600x400.png", hint: "charity help" },
            { name: "Islamic Relief", description: "Nothilfe, Entwicklungsprojekte und Waisenpatenschaften.", link: "https://www.islamicrelief.de/", image: "https://placehold.co/600x400.png", hint: "children smiling" },
        ]
    },
    en: {
        pageTitle: "Donations & Charity (Zakat & Sadaqa)",
        pageDescription: "Support verified projects and fulfill your Zakat obligation.",
        backToFeatures: "Back to Features",
        zakatTitle: "What is Zakat?",
        zakatDescription: "Zakat is one of the five pillars of Islam. It is an obligatory annual donation of 2.5% of one's wealth that exceeds the Nisab threshold and has been held for a year. It serves to purify your wealth and support those in need.",
        sadaqaTitle: "What is Sadaqa?",
        sadaqaDescription: "Sadaqa is a voluntary donation that can be given at any time. It is an act of gratitude and can erase sins. Every good deed, even a smile, can be a Sadaqa.",
        projectsTitle: "Recommended Projects",
        calculateZakat: "Zakat Calculator",
        projects: [
            { name: "MuslimeHelfen", description: "Aid projects for Muslims in need worldwide.", link: "https://muslimehelfen.org/", image: "https://placehold.co/600x400.png", hint: "charity help" },
            { name: "Islamic Relief", description: "Emergency relief, development projects, and orphan sponsorships.", link: "https://www.islamic-relief.org/", image: "https://placehold.co/600x400.png", hint: "children smiling" },
        ]
    }
}

export default function DonationsPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {c.backToFeatures}
        </Link>
      </Button>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
            
            {c.pageTitle}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.pageDescription}</p>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
            <CardHeader><CardTitle>{c.zakatTitle}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">{c.zakatDescription}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>{c.sadaqaTitle}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">{c.sadaqaDescription}</p></CardContent>
        </Card>
      </div>

       <div className="text-center mb-12">
            <Button size="lg" asChild>
                <Link href="/zakat-calculator">{c.calculateZakat}</Link>
            </Button>
        </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-8">{c.projectsTitle}</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.projects.map(project => (
                <Card key={project.name} className="flex flex-col">
                    <CardHeader>
                        <div className="aspect-video relative w-full mb-4">
                             <Image 
                                src={project.image} 
                                alt={project.description} 
                                fill
                                className="rounded-md object-cover"
                                data-ai-hint={project.hint}
                            />
                        </div>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                        <Button asChild className="w-full">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                Spenden <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
