
"use client"

import Link from "next/link";
import { useLanguage } from "../language-provider";
import { Logo } from "../icons";

const content = {
    de: {
        description: "Von präzisen Gebetszeiten und Qibla-Richtung bis hin zu interaktiven Lern-Tools wie dem Koran, Hadith-Sammlungen und KI-generierten Geschichten. Alles, was du für deine spirituelle Reise brauchst, in einer App.",
        company: "Unternehmen",
        about: "Über uns",
        contact: "Kontakt",
        support: "Unterstützung",
        legal: "Rechtliches",
        terms: "AGB",
        privacy: "Datenschutz",
        imprint: "Impressum"
    },
    en: {
        description: "From precise prayer times and Qibla direction to interactive learning tools like the Quran, Hadith collections, and AI-generated stories. Everything you need for your spiritual journey, in one app.",
        company: "Company",
        about: "About Us",
        contact: "Contact",
        support: "Support",
        legal: "Legal",
        terms: "Terms",
        privacy: "Privacy",
        imprint: "Imprint"
    }
}


export function Footer() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

    return (
        <footer className="bg-card text-card-foreground border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-2">nejat</h3>
                        <p className="text-muted-foreground max-w-md">{c.description}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">{c.company}</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-muted-foreground hover:text-primary">{c.about}</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary">{c.contact}</Link></li>
                            <li><Link href="/subscribe" className="text-muted-foreground hover:text-primary">{c.support}</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-4">{c.legal}</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-muted-foreground hover:text-primary">{c.terms}</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary">{c.privacy}</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary">{c.imprint}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
