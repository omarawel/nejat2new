
"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2, Copy, Check } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { generateDua } from "@/ai/flows/generate-dua";
import type { GenerateDuaInput } from "@/ai/flows/generate-dua-types";


const content = {
    de: {
        title: "Du'a-Generator",
        description: "Erstelle persönliche Bittgebete mit Hilfe von KI.",
        formTitle: "Erstelle dein Bittgebet",
        topicLabel: "Thema",
        topicPlaceholder: "z.B. Prüfung, Gesundheit, Dankbarkeit",
        customTopicLabel: "Benutzerdefiniertes Thema",
        customTopicPlaceholder: "Beschreibe dein Anliegen...",
        lengthLabel: "Länge",
        lengthShort: "Kurz",
        lengthMedium: "Mittel",
        lengthLong: "Lang",
        languageLabel: "Sprache des Bittgebets",
        generateButton: "Bittgebet erstellen",
        generatingButton: "Wird erstellt...",
        resultTitle: "Dein persönliches Bittgebet",
        copy: "Kopieren",
        copied: "Kopiert!",
        error: "Fehler beim Erstellen des Bittgebets. Bitte versuche es erneut."
    },
    en: {
        title: "Du'a Generator",
        description: "Create personalized supplications with the help of AI.",
        formTitle: "Create Your Du'a",
        topicLabel: "Topic",
        topicPlaceholder: "e.g. Exam, Health, Gratitude",
        customTopicLabel: "Custom Topic",
        customTopicPlaceholder: "Describe your need...",
        lengthLabel: "Length",
        lengthShort: "Short",
        lengthMedium: "Medium",
        lengthLong: "Long",
        languageLabel: "Language of the Du'a",
        generateButton: "Generate Du'a",
        generatingButton: "Generating...",
        resultTitle: "Your Personalized Du'a",
        copy: "Copy",
        copied: "Copied!",
        error: "Failed to generate du'a. Please try again."
    }
};

const topics = {
    de: ["Prüfung", "Gesundheit", "Dankbarkeit", "Vergebung", "Reise", "Familie", "Andere"],
    en: ["Exam", "Health", "Gratitude", "Forgiveness", "Travel", "Family", "Other"]
};

export default function DuaGeneratorPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const formTopics = topics[language] || topics.de;

    const [generatedDua, setGeneratedDua] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // We need to create a client-side schema for the form that includes the custom topic logic
    const ClientFormSchema = z.object({
        topic: z.string().min(1),
        customTopic: z.string().optional(),
        length: z.enum(["short", "medium", "long"]),
        language: z.enum(["de", "en", "ar"]),
    }).refine(data => {
        if (data.topic === "Andere" || data.topic === "Other") {
            return !!data.customTopic?.trim();
        }
        return true;
    }, {
        message: language === "de" ? "Bitte beschreibe dein Anliegen." : "Please describe your need.",
        path: ["customTopic"],
    });


    const form = useForm<z.infer<typeof ClientFormSchema>>({
        resolver: zodResolver(ClientFormSchema),
        defaultValues: {
            topic: "",
            length: "medium",
            language: language,
            customTopic: "",
        },
    });

    const selectedTopic = form.watch("topic");

    async function onSubmit(data: z.infer<typeof ClientFormSchema>) {
        setIsLoading(true);
        setError(null);
        setGeneratedDua("");

        try {
            const topicToSend = data.topic === 'Andere' || data.topic === 'Other' ? data.customTopic! : data.topic;
            
            const duaInput: GenerateDuaInput = {
                topic: topicToSend,
                length: data.length,
                language: data.language
            };

            const result = await generateDua(duaInput);
            setGeneratedDua(result.dua);
        } catch (e) {
            console.error(e);
            setError(c.error);
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedDua);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <Wand2 className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>{c.formTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="topic"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{c.topicLabel}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={c.topicPlaceholder} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {formTopics.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {(selectedTopic === "Andere" || selectedTopic === "Other") && (
                                     <FormField
                                        control={form.control}
                                        name="customTopic"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{c.customTopicLabel}</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder={c.customTopicPlaceholder} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <FormField
                                    control={form.control}
                                    name="length"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{c.lengthLabel}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="short">{c.lengthShort}</SelectItem>
                                                    <SelectItem value="medium">{c.lengthMedium}</SelectItem>
                                                    <SelectItem value="long">{c.lengthLong}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="language"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{c.languageLabel}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="de">Deutsch</SelectItem>
                                                    <SelectItem value="en">English</SelectItem>
                                                    <SelectItem value="ar">العربية (Arabic)</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{c.resultTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        {isLoading && (
                            <div className="flex-grow flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        )}
                        {error && <p className="text-destructive">{error}</p>}
                        {generatedDua && (
                            <div className="flex-grow flex flex-col justify-between">
                                <Textarea
                                    readOnly
                                    value={generatedDua}
                                    className="flex-grow text-base leading-relaxed resize-none"
                                    rows={10}
                                />
                                <Button onClick={handleCopy} variant="outline" className="mt-4 self-end">
                                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                                    {copied ? c.copied : c.copy}
                                </Button>
                            </div>
                        )}
                         {!isLoading && !generatedDua && !error && (
                            <div className="flex-grow flex items-center justify-center text-muted-foreground">
                                <p>Your Du'a will appear here.</p>
                            </div>
                         )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
