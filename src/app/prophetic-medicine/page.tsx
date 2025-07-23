
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Leaf, Droplets, Utensils, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Prophetische Medizin (Tibb an-Nabawi)",
        description: "Ein Einblick in die Lehren des Propheten Muhammad (ﷺ) bezüglich Gesundheit, Heilung und Wohlbefinden.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: Shield,
                title: "Ganzheitlicher Ansatz",
                content: "Die prophetische Medizin betrachtet den Menschen als Ganzes – eine Einheit aus Körper, Geist und Seele. Wahre Gesundheit entsteht aus dem Gleichgewicht dieser drei Aspekte. Die stärkste Medizin ist das Vertrauen auf Allah (Tawakkul) und das Gebet (Dua), ergänzt durch natürliche Heilmittel und eine gesunde Lebensweise."
            },
            {
                icon: Droplets,
                title: "Honig (Asal)",
                content: "Der Koran beschreibt Honig als 'Heilung für die Menschen' (Sure 16:69). Der Prophet (ﷺ) empfahl ihn bei verschiedenen Beschwerden, insbesondere bei Magenschmerzen. Honig ist für seine antibakteriellen und entzündungshemmenden Eigenschaften bekannt und stärkt das Immunsystem."
            },
            {
                icon: Leaf,
                title: "Schwarzkümmel (Habbat as-Sauda)",
                content: "Der Prophet (ﷺ) sagte: 'Im Schwarzkümmel gibt es Heilung für jede Krankheit, außer für den Tod.' (Bukhari). Schwarzkümmelöl und -samen werden seit Jahrhunderten zur Stärkung des Immunsystems und zur Behandlung einer Vielzahl von Krankheiten von Allergien bis hin zu Entzündungen verwendet."
            },
            {
                icon: Utensils,
                title: "Datteln (Tamr)",
                content: "Datteln, insbesondere die Ajwa-Dattel aus Medina, werden für ihren hohen Nährwert und ihre schützenden Eigenschaften geschätzt. Der Prophet (ﷺ) empfahl, den Tag mit Datteln zu beginnen und das Fasten mit ihnen zu brechen. Sie sind reich an Ballaststoffen, Kalium und Antioxidantien."
            },
             {
                icon: Shield,
                title: "Hijama (Schröpfen)",
                content: "Hijama ist eine traditionelle Heilmethode, bei der durch das Anlegen von Schröpfgläsern ein Unterdruck erzeugt wird, um Giftstoffe aus dem Körper zu ziehen. Der Prophet (ﷺ) praktizierte und empfahl diese Methode und bezeichnete sie als eine der besten Heilmethoden."
            }
        ]
    },
    en: {
        title: "Prophetic Medicine (Tibb an-Nabawi)",
        description: "An insight into the teachings of the Prophet Muhammad (ﷺ) regarding health, healing, and well-being.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: Shield,
                title: "Holistic Approach",
                content: "Prophetic medicine views a person as a whole – a unity of body, mind, and soul. True health comes from the balance of these three aspects. The most potent medicine is trust in Allah (Tawakkul) and prayer (Dua), supplemented by natural remedies and a healthy lifestyle."
            },
            {
                icon: Droplets,
                title: "Honey (Asal)",
                content: "The Quran describes honey as 'a healing for mankind' (Surah 16:69). The Prophet (ﷺ) recommended it for various ailments, especially for stomach pains. Honey is known for its antibacterial and anti-inflammatory properties and boosts the immune system."
            },
            {
                icon: Leaf,
                title: "Black Seed (Habbat as-Sauda)",
                content: "The Prophet (ﷺ) said: 'In the black seed is a cure for every disease except death.' (Bukhari). Black seed oil and seeds have been used for centuries to strengthen the immune system and treat a variety of diseases from allergies to inflammation."
            },
            {
                icon: Utensils,
                title: "Dates (Tamr)",
                content: "Dates, especially the Ajwa date from Medina, are valued for their high nutritional value and protective properties. The Prophet (ﷺ) recommended starting the day with dates and breaking the fast with them. They are rich in fiber, potassium, and antioxidants."
            },
            {
                icon: Shield,
                title: "Hijama (Cupping)",
                content: "Hijama is a traditional healing method in which a vacuum is created by placing cups on the skin to draw out toxins from the body. The Prophet (ﷺ) practiced and recommended this method, calling it one of the best healing methods."
            }
        ]
    }
};

export default function PropheticMedicinePage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                 <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <Leaf className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {c.sections.map((section, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <section.icon className="h-7 w-7 text-primary" />
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{section.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
