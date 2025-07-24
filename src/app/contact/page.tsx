
"use client"

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const content = {
    de: {
        title: "Kontaktieren Sie uns",
        back: "Zurück",
        description: "Haben Sie eine Frage, einen Vorschlag oder benötigen Sie Unterstützung? Füllen Sie das Formular aus und wir werden uns so schnell wie möglich bei Ihnen melden.",
        nameLabel: "Ihr Name",
        namePlaceholder: "Max Mustermann",
        emailLabel: "Ihre E-Mail",
        emailPlaceholder: "max@example.com",
        subjectLabel: "Betreff",
        subjectPlaceholder: "Frage zu...",
        messageLabel: "Ihre Nachricht",
        messagePlaceholder: "Schreiben Sie Ihre Nachricht hier...",
        sendButton: "Nachricht senden",
        sendingButton: "Wird gesendet...",
        successTitle: "Nachricht gesendet!",
        successDescription: "Vielen Dank für Ihre Kontaktaufnahme. Wir werden uns bald bei Ihnen melden.",
        errorTitle: "Fehler",
        errorDescription: "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
    },
    en: {
        title: "Contact Us",
        back: "Back",
        description: "Have a question, a suggestion, or need support? Fill out the form and we will get back to you as soon as possible.",
        nameLabel: "Your Name",
        namePlaceholder: "John Doe",
        emailLabel: "Your Email",
        emailPlaceholder: "john@example.com",
        subjectLabel: "Subject",
        subjectPlaceholder: "Question about...",
        messageLabel: "Your Message",
        messagePlaceholder: "Write your message here...",
        sendButton: "Send Message",
        sendingButton: "Sending...",
        successTitle: "Message Sent!",
        successDescription: "Thank you for contacting us. We will get back to you shortly.",
        errorTitle: "Error",
        errorDescription: "There was an error sending your message. Please try again later.",
    }
};

export default function ContactPage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Form submitted:", values);

        toast({
            title: c.successTitle,
            description: c.successDescription,
        });
        
        form.reset();
        setIsLoading(false);
    }

    return (
         <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.back}
                </Link>
            </Button>

            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl flex items-center justify-center gap-3"><Mail /> {c.title}</CardTitle>
                    <CardDescription>{c.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{c.nameLabel}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={c.namePlaceholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{c.emailLabel}</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder={c.emailPlaceholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                             <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{c.subjectLabel}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={c.subjectPlaceholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{c.messageLabel}</FormLabel>
                                    <FormControl>
                                        <Textarea rows={6} placeholder={c.messagePlaceholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                     {c.sendingButton}
                                    </>
                                ) : (
                                    <>
                                     <Send className="mr-2 h-4 w-4" />
                                     {c.sendButton}
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
