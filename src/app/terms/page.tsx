
"use client"

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
    const { language } = useLanguage();
    // Assuming German as default for this static content
    const c = {
        title: "Allgemeine Geschäftsbedingungen",
        back: "Zurück",
        sections: [
            {
                title: "1. Geltungsbereich",
                content: "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Plattform Nejat, betrieben von Nejat FinTech, im Folgenden „Anbieter“ genannt. Sie regeln die Rechte und Pflichten der Nutzer."
            },
            {
                title: "2. Nutzungsrechte",
                content: "Die Plattform ist kostenlos nutzbar, unterliegt jedoch Einschränkungen durch Werbung, es sei denn, ein Premium-Abonnement wird abgeschlossen. Funktionen wie der Qibla-Kompass, AR-Hajj/Umrah und der Live-Khutba-Übersetzer dürfen nur für persönliche, nicht-kommerzielle Zwecke genutzt werden."
            },
            {
                title: "3. Premium-Abonnement",
                content: "Ein Premium-Abonnement entfernt Werbung und ermöglicht Zugriff auf erweiterte Funktionen (z. B. Offline-Zugriff, AR-Erlebnisse). Die Zahlung erfolgt über Dritte (z. B. Stripe). Das Abonnement ist monatlich oder jährlich kündbar unter support@nejat.com."
            },
            {
                title: "4. Nutzerpflichten",
                content: "Nutzer verpflichten sich, keine unrechtmäßigen Inhalte hochzuladen oder die Plattform für Spam zu missbrauchen. Die Nutzung der Geolocation- und Audio-Aufnahme-Funktionen erfordert ausdrückliche Zustimmung."
            },
            {
                title: "5. Haftungsausschluss",
                content: "Der Anbieter haftet nicht für die Richtigkeit von Qibla-Berechnungen, Gebetszeiten oder Übersetzungen, die von Gerätedaten und Drittanbieter-Diensten abhängen. Schäden aus unsachgemäßer Nutzung gehen zu Lasten des Nutzers."
            },
            {
                title: "6. Änderungen der AGB",
                content: "Änderungen dieser AGB werden den Nutzern mindestens 30 Tage vor Inkrafttreten mitgeteilt. Fortgesetzte Nutzung gilt als Zustimmung."
            },
            {
                title: "7. Schlussbestimmungen",
                content: "Sollten einzelne Bestimmungen unwirksam sein, bleibt die Gültigkeit der übrigen unberührt. Gerichtsstand ist Düsseldorf."
            }
        ]
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

            <div className="prose dark:prose-invert max-w-none mx-auto space-y-6">
                {c.sections.map((section, index) => (
                    <section key={index}>
                        <h2 className="text-2xl font-semibold">{section.title}</h2>
                        <p>{section.content}</p>
                    </section>
                ))}
            </div>
        </div>
    )
}
