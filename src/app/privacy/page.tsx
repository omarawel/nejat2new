
"use client"

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
    const { language } = useLanguage();
    // Assuming German as default for this static content
    const c = {
        title: "Datenschutz",
        back: "Zurück",
        sections: [
            {
                title: "1. Datenschutz auf einen Blick",
                content: "Wir legen großen Wert auf den Schutz Ihrer persönlichen Daten. Die Verarbeitung erfolgt ausschließlich auf Grundlage der gesetzlichen Vorschriften (DSGVO, DSG 2018). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung."
            },
            {
                title: "2. Verantwortlicher",
                content: "Nejat FinTech\nIrenenstr, 66 DÜsseldorf 40468\nE-Mail: kontakt@nejat.com\nTelefon: +4915906467215"
            },
            {
                title: "3. Erfassung und Verarbeitung personenbezogener Daten",
                points: [
                    "**Standortdaten**: Beim Einsatz des Qibla-Kompasses oder AR-Funktionen wird Ihre Position abgefragt. Diese Daten werden nur zur Berechnung genutzt und nicht gespeichert, sofern Sie nicht einwilligen.",
                    "**Audio-Daten**: Die Live-Khutba-Übersetzer-Funktion erfordert Audio-Aufnahmen. Diese werden verschlüsselt an Drittanbieter gesendet, nur mit Ihrer Zustimmung, und nach Verarbeitung gelöscht.",
                    "**Cookies**: Unsere Website verwendet Cookies für Funktionen und Werbung. Sie können diese in Ihren Browsereinstellungen ablehnen.",
                    "**Abonnementdaten**: Bei Premium-Abonnements werden Zahlungsdaten über Dritte (z. B. Stripe) verarbeitet."
                ]
            },
            {
                title: "4. Weitergabe von Daten",
                content: "Ihre Daten werden nur an Dritte weitergegeben, wenn dies für die Vertragsdurchführung (z. B. Zahlungen) oder mit Ihrer Einwilligung erforderlich ist. Werbe-Daten werden an Anbieter wie Google AdSense weitergegeben, sofern Sie zustimmen."
            },
            {
                title: "5. Ihre Rechte",
                content: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit. Kontaktieren Sie uns unter kontakt@nejat.com. Beschwerden können Sie bei der zuständigen Aufsichtsbehörde einreichen."
            },
            {
                title: "6. Kontakt zum Datenschutz",
                content: "Für Fragen zum Datenschutz wenden Sie sich an datenschutz@nejat.com."
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
                        {section.content && <p className="whitespace-pre-wrap">{section.content}</p>}
                        {section.points && (
                            <ul className="list-disc pl-5 space-y-2">
                               {section.points.map((point, pIndex) => <li key={pIndex} dangerouslySetInnerHTML={{ __html: point }}></li>)}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </div>
    )
}
