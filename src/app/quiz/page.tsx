
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowLeft, BookOpen, User, Users, Wand2, Loader2, AlertTriangle, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { generateQuiz, type GenerateQuizOutput, type QuizQuestion } from '@/ai/flows/generate-quiz';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { staticQuizData } from '@/lib/quiz-data';
import { QuizSession } from '@/components/quiz/quiz-session';

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
        startQuiz: "Quiz starten",
        aiTitle: "KI-Quiz-Generator",
        aiDescription: "Gib ein beliebiges Thema ein und lass die KI ein Quiz für dich erstellen.",
        proFeature: "Pro-Funktion",
        topicLabel: "Thema",
        topicPlaceholder: "z.B. Das Leben von Prophet Musa",
        generateButton: "Quiz generieren",
        generatingButton: "Wird generiert...",
        aiError: "Fehler beim Generieren des Quiz.",
        quizResults: "Dein KI-generiertes Quiz",
        backToTopics: "Zurück zu den Themen"
    },
    en: {
        pageTitle: "Islamic Quiz",
        pageDescription: "Test and expand your knowledge of Islam in a fun way.",
        backToFeatures: "Back to Features",
        chooseTopic: "Choose a category to start:",
        startQuiz: "Start Quiz",
        aiTitle: "AI Quiz Generator",
        aiDescription: "Enter any topic and let the AI create a quiz for you.",
        proFeature: "Pro Feature",
        topicLabel: "Topic",
        topicPlaceholder: "e.g., The life of Prophet Musa",
        generateButton: "Generate Quiz",
        generatingButton: "Generating...",
        aiError: "Error generating quiz.",
        quizResults: "Your AI-Generated Quiz",
        backToTopics: "Back to Topics"
    }
}

const aiFormSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters long."),
});


export default function QuizPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const topics = quizTopics[language] || quizTopics.de;
  
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [aiQuiz, setAiQuiz] = useState<QuizQuestion[] | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof aiFormSchema>>({
    resolver: zodResolver(aiFormSchema),
    defaultValues: {
      topic: "",
    },
  });

  const onAiSubmit = async (data: z.infer<typeof aiFormSchema>) => {
    setIsLoading(true);
    setAiError(null);
    setAiQuiz(null);
    try {
        const result = await generateQuiz({ topic: data.topic, count: 5 });
        setAiQuiz(result.questions);
        setQuizStarted(true); // Start the AI quiz
        setSelectedTopic('ai'); // Mark that an AI quiz is active
    } catch (e) {
        console.error(e);
        setAiError(c.aiError);
    } finally {
        setIsLoading(false);
    }
  }
  
  const handleStartQuiz = () => {
    if (selectedTopic && selectedTopic !== 'ai') {
        setQuizStarted(true);
    }
  }

  const handleFinishQuiz = () => {
    setQuizStarted(false);
    setSelectedTopic(null);
    setAiQuiz(null);
  }

  const quizData = selectedTopic === 'ai' 
    ? aiQuiz 
    : staticQuizData[language][selectedTopic as keyof typeof staticQuizData['de']];


  if (quizStarted && quizData) {
    return <QuizSession 
                quizTitle={topics.find(t => t.key === selectedTopic)?.title || form.getValues('topic')} 
                questions={quizData} 
                onFinish={handleFinishQuiz}
                backButtonText={c.backToTopics}
            />
  }

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
                <HelpCircle className="h-10 w-10" />
                {c.pageTitle}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">{c.pageDescription}</p>
        </header>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <Card>
                <CardHeader>
                    <CardTitle>{c.chooseTopic}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Button className="w-full" size="lg" disabled={!selectedTopic || selectedTopic === 'ai'} onClick={handleStartQuiz}>
                        {c.startQuiz}
                    </Button>
                </CardFooter>
            </Card>

            <Card className="border-primary/50 shadow-lg">
                 <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Wand2 />
                            {c.aiTitle}
                        </div>
                        <span className="text-sm font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">{c.proFeature}</span>
                    </CardTitle>
                    <CardDescription>{c.aiDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onAiSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="topic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{c.topicLabel}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={c.topicPlaceholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {c.generatingButton}
                                    </>
                                ) : (
                                    c.generateButton
                                )}
                            </Button>
                        </form>
                    </Form>
                     {aiError && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{aiError}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
