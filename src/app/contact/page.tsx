
"use client"

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Share2, Send } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
     const { language } = useLanguage();
    // Assuming German as default for this static content
    const c = {
        title: "Kontakt",
        back: "Zurück",
        contactUs: "Kontaktiere uns",
        contactUsText: "Wir freuen uns über Ihre Anfragen, Vorschläge oder Anliegen. Unser Team steht Ihnen zur Verfügung:",
        addressTitle: "Adresse",
        addressLines: [
            "Nejat FinTech",
            "Irenenstr, 66 DÜsseldorf 40468"
        ],
        socialMediaTitle: "Soziale Medien",
        socialMediaText: "Folge uns für die neuesten Updates:",
        twitter: "Twitter",
        facebook: "Facebook",
        feedbackTitle: "Feedback",
        feedbackText: "Ihre Meinung ist uns wichtig! Senden Sie uns Ihr Feedback über kontakt@nejat.com oder nutzen Sie unser Kontaktformular auf der Support-Seite."
    };

    return (
         <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.back}
                </Link>
            </Button>

            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Mail /> {c.contactUs}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>{c.contactUsText}</p>
                        <p><a href="mailto:kontakt@nejat.com" className="text-primary hover:underline">kontakt@nejat.com</a></p>
                        <p><a href="tel:+4915906467215" className="text-primary hover:underline">+49 1590 6467215</a></p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MapPin /> {c.addressTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {c.addressLines.map((line, i) => <p key={i}>{line}</p>)}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Share2 /> {c.socialMediaTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                       <p>{c.socialMediaText}</p>
                       <p><a href="https://twitter.com/nejatapp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{c.twitter}</a></p>
                       <p><a href="https://facebook.com/nejatapp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{c.facebook}</a></p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Send /> {c.feedbackTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p dangerouslySetInnerHTML={{ __html: c.feedbackText.replace('[support-seite]', '<a href="/support" class="text-primary hover:underline">Support-Seite</a>') }} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
