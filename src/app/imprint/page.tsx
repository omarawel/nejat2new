
"use client"

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ImprintPage() {
    const { language } = useLanguage();
    // Assuming German as default for this static content
    const c = {
        title: "Impressum",
        back: "Zurück",
        provider: "Anbieter",
        providerDetails: [
            "Nejat FinTech",
            "Irenenstr, 66 DÜsseldorf 40468",
            "E-Mail: kontakt@nejat.com",
            "Telefon: +4915906467215"
        ],
        responsible: "Verantwortlich für den Inhalt",
        responsiblePerson: "Omar Awel",
        disclaimer: "Haftungsausschluss",
        disclaimerText: "Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Haftungsansprüche gegen den Anbieter, die auf Schäden materieller oder immaterieller Art beruhen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.",
        privacy: "Datenschutz",
        privacyText: "Details zum Datenschutz finden Sie in unserer Datenschutzerklärung.",
        disputeResolution: "Streitbeilegung",
        disputeResolutionText: "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschutzstelle teilzunehmen."
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
                <section>
                    <h2 className="text-2xl font-semibold">{c.provider}</h2>
                    {c.providerDetails.map((detail, i) => <p key={i} className="my-0">{detail}</p>)}
                </section>
                 <section>
                    <h2 className="text-2xl font-semibold">{c.responsible}</h2>
                    <p>{c.responsiblePerson}</p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold">{c.disclaimer}</h2>
                    <p>{c.disclaimerText}</p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold">{c.privacy}</h2>
                    <p>
                        {c.privacyText.replace('Datenschutzerklärung', `<a href="/privacy" class="text-primary hover:underline">Datenschutzerklärung</a>`)}
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold">{c.disputeResolution}</h2>
                    <p>{c.disputeResolutionText}</p>
                </section>
            </div>
        </div>
    )
}
