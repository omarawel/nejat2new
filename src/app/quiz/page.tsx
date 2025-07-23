
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowLeft, BookOpen, User, Users } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState } from 'react';

const quizTopics = {
    de: [
        { key: "prophets", title: "Die Propheten", icon: Users },
        { key: "quran", title: "Der Koran", icon: BookOpen },
        { key: "sahaba", title: "Die Sahaba", icon: User },
    ],
    en: [
        { key: "prophets", title: "The Prophets", icon: Users },
        { key: "quran", title: "The Quran", icon: BookOpen },
        { key: "sahaba", title: "The Sahaba", icon: User },
    ]
}

const content = {
    de: {
        pageTitle: "Islamisches Quiz",
        pageDescription: "Teste und erweitere dein Wissen über den Islam auf spielerische Weise.",
        backToFeatures: "Zurück zu den Funktionen",
        chooseTopic: "Wähle eine Kategorie, um zu beginnen:",
        startQuiz: "Quiz starten"
    },
    en: {
        pageTitle: "Islamic Quiz",
        pageDescription: "Test and expand your knowledge of Islam in a fun way.",
        backToFeatures: "Back to Features",
        chooseTopic: "Choose a category to start:",
        startQuiz: "Start Quiz"
    }
}


export default function QuizPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const topics = quizTopics[language] || quizTopics.de;
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <Card className="text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <HelpCircle className="h-12 w-12 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                    <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <h3 className="font-semibold">{c.chooseTopic}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {topics.map(topic => {
                            const Icon = topic.icon;
                            return (
                                <Button 
                                    key={topic.key} 
                                    variant={selectedTopic === topic.key ? "default" : "outline"}
                                    className="flex flex-col h-24"
                                    onClick={() => setSelectedTopic(topic.key)}
                                >
                                    <Icon className="h-8 w-8 mb-1"/>
                                    <span>{topic.title}</span>
                                </Button>
                            )
                        })}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" disabled={!selectedTopic}>
                        {c.startQuiz}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
