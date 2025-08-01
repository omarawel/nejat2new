"use client"

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2, Copy, Check, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { generateDua } from "@/ai/flows/generate-dua";
import type { GenerateDuaInput } from "@/ai/flows/generate-dua-types";
import Link from 'next/link';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { checkAndDecrementQuota, getUserQuota, UserQuota } from '@/lib/user-usage';
import { UpgradeInlineAlert } from '@/components/upgrade-inline-alert';


const content = {
    de: {
        title: "Du&apos;a-Generator",
        description: "Erstelle persönliche Bittgebete mit Hilfe von KI.",
        backToFeatures: "Zurück zu den Funktionen",
        formTitle: "Erstelle dein Bittgebet",
        topicLabel: "Thema",
        topicPlaceholder: "z.B. für eine erfolgreiche Prüfung...",
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
        title: "Du&apos;a Generator",
        description: "Create personalized supplications with the help of AI.",
        backToFeatures: "Back to Features",
        formTitle: "Create Your Du&apos;a",
        topicLabel: "Topic",
        topicPlaceholder: "e.g. for success in an exam...",
        lengthLabel: "Length",
        lengthShort: "Short",
        lengthMedium: "Medium",
        lengthLong: "Long",
        languageLabel: "Language of the Du&apos;a",
        generateButton: "Generate Du&apos;a",
        generatingButton: "Generating...",
        resultTitle: "Your Personalized Du&apos;a",
        copy: "Copy",
        copied: "Copied!",
        error: "Failed to generate du&apos;a. Please try again."
    }
};

const FormSchema = z.object({
    topic: z.string().min(3, { message: "Topic must be at least 3 characters." }),
    length: z.enum(["short", "medium", "long"]),
    language: z.enum(["de", "en", "ar"]),
});


export default function DuaGeneratorPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    
    const [user, authLoading] = useAuthState(auth);
    const [quota, setQuota] = useState<UserQuota | null>(null);

    const [generatedDua, setGeneratedDua] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            getUserQuota(user?.uid || null).then(setQuota);
        }
    }, [user, authLoading]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            topic: "",
            length: "medium",
            language: language as "de" | "en" | "ar",
        },
    });


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setError(null);
        setGeneratedDua("");

        const quotaResult = await checkAndDecrementQuota(user?.uid || null);
        if (!quotaResult.success) {
            setQuota(quotaResult.quota);
            setIsLoading(false);
            return;
        }
        setQuota(quotaResult.quota);

        try {
            const duaInput: GenerateDuaInput = {
                topic: data.topic,
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

    const canSubmit = quota ? quota.remaining > 0 : true;

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">
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
                                            <FormControl>
                                                <Input placeholder={c.topicPlaceholder} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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

                                <UpgradeInlineAlert quota={quota} isLoggedIn={!!user} />

                                <Button type="submit" className="w-full" disabled={isLoading || !canSubmit}>
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
                                <p>Your Du&apos;a will appear here.</p>
                            </div>
                         )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
