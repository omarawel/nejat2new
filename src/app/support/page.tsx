
"use client"

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LifeBuoy, HelpCircle, FileText, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupportPage() {
    const { language } = useLanguage();
    // Assuming German as default for this static content
    const c = {
        title: "Unterstützung",
        back: "Zurück",
        helpAndSupport: "Hilfe und Support",
        helpAndSupportText: "Haben Sie Fragen zur Nutzung von Nejat oder technische Probleme? Unser Support-Team hilft Ihnen gerne:",
        supportEmail: "support@nejat.com",
        faqTitle: "Häufige Fragen (FAQ)",
        faqItems: [
            "Qibla-Kompass funktioniert nicht: Überprüfen Sie Ihre Standortberechtigungen und Internetverbindung.",
            "AR-Hajj lädt nicht: Stellen Sie sicher, dass Ihr Gerät die neueste App-Version nutzt.",
            "Abonnement-Probleme: Kontaktieren Sie uns unter support@nejat.com."
        ],
        documentationTitle: "Dokumentation",
        documentationText: "Finden Sie detaillierte Anleitungen und Tipps in unserer Dokumentation.",
        documentationLinkText: "Zur Dokumentation",
        communityTitle: "Community",
        communityText: "Treten Sie unserer Community bei, um von anderen Nutzern zu lernen.",
        communityLinkText: "Zum Community-Forum"
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

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LifeBuoy /> {c.helpAndSupport}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{c.helpAndSupportText}</p>
                        <p className="mt-2">
                            <strong>Support-E-Mail:</strong> <a href={`mailto:${c.supportEmail}`} className="text-primary hover:underline">{c.supportEmail}</a>
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><HelpCircle /> {c.faqTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                           {c.faqItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileText /> {c.documentationTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p>{c.documentationText}</p>
                       <Button asChild variant="link" className="p-0 h-auto mt-2">
                           <Link href="#">{c.documentationLinkText}</Link>
                       </Button>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users /> {c.communityTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p>{c.communityText}</p>
                       <Button asChild variant="link" className="p-0 h-auto mt-2">
                           <Link href="#">{c.communityLinkText}</Link>
                       </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
