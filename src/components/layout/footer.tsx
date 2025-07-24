
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
        description: "Von präzisen Gebetszeiten und Qibla-Richtung bis hin zu interaktiven Lern-Tools wie dem Koran, Hadith-Sammlungen und KI-generierten Geschichten. Alles, was du für deine spirituelle Reise brauchst, in einer App.",
        company: "Unternehmen",
        about: "Über uns",
        contact: "Kontakt",
        support: "Unterstützung",
        legal: "Rechtliches",
        terms: "AGB",
        privacy: "Datenschutz",
        imprint: "Impressum",
        followUs: "Folge uns",
        copyright: `© ${new Date().getFullYear()} Nejat Digital. Alle Rechte vorbehalten.`
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
        imprint: "Imprint",
        followUs: "Follow Us",
        copyright: `© ${new Date().getFullYear()} Nejat Digital. All rights reserved.`
    }
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
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
    const [content, setContent] = useState<FooterContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFooterContentOnce().then(data => {
            if (data) {
                setContent(data);
            }
            setLoading(false);
        });
    }, []);
    
    const c = content ? content[language] : staticContent[language];
    const socialLinks = content ? content.socialLinks : [];
    const copyrightText = `© ${new Date().getFullYear()} Nejat Digital. Alle Rechte vorbehalten.`;

    if (loading) {
        return (
            <footer className="bg-card text-card-foreground border-t">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                     <Skeleton className="h-8 w-1/2" />
                 </div>
            </footer>
        )
    }

    return (
        <footer className="bg-card text-card-foreground border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-bold">Nejat</h3>
                            <Badge variant="default">Pro</Badge>
                        </div>
                        <p className="text-muted-foreground max-w-md">{c.description}</p>
                    </div>

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

                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground order-2 sm:order-1">{copyrightText}</p>
                    <div className="flex items-center gap-4 order-1 sm:order-2">
                        <p className="text-sm font-semibold">{c.followUs}:</p>
                        <div className="flex items-center gap-3">
                           {socialLinks.map(social => {
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
