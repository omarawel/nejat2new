
"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { addDiaryEntry, updateDiaryEntry, type DiaryEntry } from '@/lib/diary';

const content = {
    de: {
        titleLabel: "Titel",
        titlePlaceholder: "z.B. Ein Tag der Dankbarkeit",
        contentLabel: "Inhalt",
        contentPlaceholder: "Was geht dir durch den Kopf...",
        createButton: "Eintrag erstellen",
        updateButton: "Eintrag aktualisieren",
        submittingButton: "Wird gespeichert...",
        successCreate: "Eintrag erfolgreich erstellt",
        successUpdate: "Eintrag erfolgreich aktualisiert",
        error: "Fehler beim Speichern des Eintrags",
    },
    en: {
        titleLabel: "Title",
        titlePlaceholder: "e.g., A Day of Gratitude",
        contentLabel: "Content",
        contentPlaceholder: "What's on your mind...",
        createButton: "Create Entry",
        updateButton: "Update Entry",
        submittingButton: "Submitting...",
        successCreate: "Entry created successfully",
        successUpdate: "Entry updated successfully",
        error: "Error saving entry",
    }
}

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100),
  content: z.string().min(10, "Content must be at least 10 characters."),
});

interface DiaryEntryFormProps {
    entry: DiaryEntry | null;
    userId: string;
    onFinished: () => void;
}

export function DiaryEntryForm({ entry, userId, onFinished }: DiaryEntryFormProps) {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: entry?.title || "",
            content: entry?.content || "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            if (entry) {
                await updateDiaryEntry(userId, entry.id!, values);
                toast({ title: c.successUpdate });
            } else {
                await addDiaryEntry(userId, values);
                toast({ title: c.successCreate });
            }
            form.reset();
            onFinished();
        } catch (error) {
            console.error("Error saving diary entry:", error);
            toast({ variant: 'destructive', title: 'Error', description: c.error });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.titleLabel}</FormLabel>
                            <FormControl>
                                <Input placeholder={c.titlePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.contentLabel}</FormLabel>
                            <FormControl>
                                <Textarea rows={8} placeholder={c.contentPlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {c.submittingButton}</>
                    ) : (entry ? c.updateButton : c.createButton)}
                </Button>
            </form>
        </Form>
    );
}
