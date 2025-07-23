
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
import { createHatimGroup } from '@/lib/hatim';

const content = {
    de: {
        titleLabel: "Titel",
        titlePlaceholder: "z.B. Wöchentlicher Familien-Hatim",
        descriptionLabel: "Beschreibung (optional)",
        descriptionPlaceholder: "Eine kurze Beschreibung für die Gruppe...",
        createButton: "Hatim-Gruppe erstellen",
        creatingButton: "Wird erstellt...",
        success: "Hatim-Gruppe erfolgreich erstellt!",
        error: "Fehler beim Erstellen der Gruppe.",
    },
    en: {
        titleLabel: "Title",
        titlePlaceholder: "e.g., Weekly Family Hatim",
        descriptionLabel: "Description (optional)",
        descriptionPlaceholder: "A short description for the group...",
        createButton: "Create Hatim Group",
        creatingButton: "Creating...",
        success: "Hatim group created successfully!",
        error: "Error creating group.",
    }
}

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(100),
  description: z.string().max(200).optional(),
});


export function CreateHatimForm({ onFinished }: { onFinished: () => void }) {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            await createHatimGroup(values.title, values.description || '');
            toast({ title: c.success });
            form.reset();
            onFinished();
        } catch (error) {
            console.error("Error creating hatim group:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: c.error,
            });
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.descriptionLabel}</FormLabel>
                            <FormControl>
                                <Textarea placeholder={c.descriptionPlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {c.creatingButton}
                        </>
                    ) : c.createButton}
                </Button>
            </form>
        </Form>
    );
}

