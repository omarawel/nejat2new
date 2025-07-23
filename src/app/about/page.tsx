
"use client"

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const { language } = useLanguage();
    // Assuming German as default for this static content
    const c = {
        title: "Über uns",
        back: "Zurück",
        welcome: "Willkommen bei Nejat",
        welcomeText: "Herzlich willkommen bei Nejat, einer Plattform, die darauf abzielt, Gläubigen weltweit auf ihrer spirituellen Reise zu begleiten. Unser Name „Nejat“, was auf Arabisch „Erlösung“ bedeutet, spiegelt unsere Mission wider: Menschen durch Wissen, Gemeinschaft und innovative Technologie näher an ihren Glauben heranzuführen. Von der präzisen Berechnung der Qibla-Richtung über immersive AR-Erlebnisse für Hajj und Umrah bis hin zum Live-Khutba-Übersetzer – wir bieten Werkzeuge, die Tradition und Moderne verbinden.",
        mission: "Unsere Mission",
        missionText: "Bei Nejat streben wir danach, spirituelle Bildung zugänglich zu machen und eine globale muslimische Gemeinschaft zu stärken. Unsere Wissensbibliothek, Gebetszeiten und interaktiven Features sollen jeden Nutzer inspirieren, seinen Glauben tiefer zu erleben.",
        team: "Unser Team",
        teamMembers: [
            "Omar Awel – Gründer und Entwickler",
            "Rebie Girangi – Berater",
            "Sitra Amdehun – Technischer Leiter"
        ],
        vision: "Unsere Vision",
        visionText: "Wir möchten Nejat zu einer führenden Plattform für islamische Technologien machen, die Innovation und Glauben vereint. Bleiben Sie dran, um mehr über unsere kommenden Projekte zu erfahren!"
    }


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

            <div className="prose dark:prose-invert max-w-none mx-auto space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold">{c.welcome}</h2>
                    <p>{c.welcomeText}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold">{c.mission}</h2>
                    <p>{c.missionText}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2"><Users /> {c.team}</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {c.teamMembers.map(member => <li key={member}>{member}</li>)}
                    </ul>
                </section>

                 <section>
                    <h2 className="text-2xl font-semibold">{c.vision}</h2>
                    <p>{c.visionText}</p>
                </section>
            </div>
        </div>
    )
}
