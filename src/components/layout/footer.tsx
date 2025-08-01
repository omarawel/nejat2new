"use client"

import Link from "next/link";
import { useLanguage } from "../language-provider";
import { FacebookIcon, InstagramIcon, TwitterIcon, YouTubeIcon, XIcon, TikTokIcon, LinkedInIcon } from "../icons";
import { useEffect, useState } from "react";
import { getFooterContentOnce, type FooterContent, type SocialLink } from "@/lib/footer";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";

const staticContent = {
    de: {
        description: "Erkunde eine umfassende Suite von Tools für deine spirituelle Reise: Koran- und Hadith-Sammlungen, ein Auswendiglern-Werkzeug, einen Zakat-Rechner und KI-gestützte Funktionen wie einen Dua-Generator und einen Gelehrten, der deine Fragen beantwortet.",
        company: "Unternehmen",
        about: "Über uns",
        contact: "Kontakt",
        support: "Unterstützung",
        legal: "Rechtliches",
        terms: "AGB",
        privacy: "Datenschutz",
        imprint: "Impressum",
        followUs: "Folge uns",
        copyright: `© ${new Date().getFullYear()} Nejat Pro. Alle Rechte vorbehalten.`
    },
    en: {
        description: "Explore a comprehensive suite of tools for your spiritual journey: Quran and Hadith collections, a memorization tool, a Zakat calculator, and AI-powered features like a Dua generator and a scholar to answer your questions.",
        company: "Company",
        about: "About Us",
        contact: "Contact",
        support: "Support",
        legal: "Legal",
        terms: "Terms",
        privacy: "Privacy",
        imprint: "Imprint",
        followUs: "Follow Us",
        copyright: `© ${new Date().getFullYear()} Nejat Pro. All rights reserved.`
    }
}

const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    YouTubeIcon,
    XIcon,
    TikTokIcon,
    LinkedInIcon
};

export function Footer() {
    const { language } = useLanguage();
    const [dynamicContent, setDynamicContent] = useState<FooterContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFooterContentOnce().then(data => {
            if (data) {
                setDynamicContent(data);
            }
        }).catch(err => {
            console.error("Failed to load footer content", err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);
    
    const c = dynamicContent?.[language] || staticContent[language];
    const socialLinks = dynamicContent?.socialLinks || [];
    const copyrightText = `© ${new Date().getFullYear()} Nejat Pro. Alle Rechte vorbehalten.`;


    return (
        <footer className="bg-card text-card-foreground border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="relative inline-block mb-2">
                             <Link href="/" className="text-xl font-bold">Nejat</Link>
                            <Badge variant="default" className="absolute -top-3.5 -right-7 h-auto px-1.5 py-0.5 text-[10px] font-bold">Pro</Badge>
                        </div>
                        {loading ? <Skeleton className="h-20 w-full max-w-md" /> : <p className="text-muted-foreground max-w-md">{c.description}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:col-span-1 lg:col-span-2">
                        <div>
                            <h4 className="font-semibold mb-4">{c.company}</h4>
                            <ul className="space-y-2">
                                <li><Link href="/about" className="text-muted-foreground hover:text-primary">{c.about}</Link></li>
                                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">{c.contact}</Link></li>
                                <li><Link href="/support" className="text-muted-foreground hover:text-primary">{c.support}</Link></li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-4">{c.legal}</h4>
                            <ul className="space-y-2">
                                <li><Link href="/terms" className="text-muted-foreground hover:text-primary">{c.terms}</Link></li>
                                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">{c.privacy}</Link></li>
                                <li><Link href="/imprint" className="text-muted-foreground hover:text-primary">{c.imprint}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground order-2 sm:order-1">{copyrightText}</p>
                    <div className="flex items-center gap-4 order-1 sm:order-2">
                        <p className="text-sm font-semibold">{c.followUs}:</p>
                        <div className="flex items-center gap-3">
                           {loading ? <Skeleton className="h-5 w-32" /> : socialLinks.map(social => {
                            const Icon = iconMap[social.icon] || 'div';
                            return (
                             <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                               <Icon className="h-5 w-5" />
                               <span className="sr-only">{social.name}</span>
                             </Link>
                           )})}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
