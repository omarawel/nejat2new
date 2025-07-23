
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import Image from 'next/image';

const content = {
    de: {
        title: "Die Strahlen Des Islam",
        author: "von Omar Awel",
        description: "„Die Strahlen des Islam“ ist ein umfassender Leitfaden, der die grundlegenden Lehren und die tiefgründige Schönheit des Islam beleuchtet. Es richtet sich sowohl an Muslime, die ihr Wissen vertiefen möchten, als auch an Nicht-Muslime, die ein klares und authentisches Verständnis der Religion suchen.",
        topicsTitle: "Behandelte Themen umfassen:",
        topics: [
            "Die fünf Säulen des Islam",
            "Die Artikel des Glaubens (Iman)",
            "Die Bedeutung des Korans und der Sunna",
            "Spirituelle Konzepte wie Tawakkul und Sabr",
            "Der Charakter des Propheten Muhammad (ﷺ)"
        ],
        buttonText: "Jetzt auf Kindle lesen",
        link: "https://lesen.amazon.de/kp/kshare?asin=B0F195Y5MY&id=ks6jizhuxvh3xhy2fuvlsjprmi"
    },
    en: {
        title: "The Rays Of Islam",
        author: "by Omar Awel",
        description: "'The Rays of Islam' is a comprehensive guide that illuminates the fundamental teachings and profound beauty of Islam. It is aimed at both Muslims seeking to deepen their knowledge and non-Muslims looking for a clear and authentic understanding of the religion.",
        topicsTitle: "Topics covered include:",
        topics: [
            "The Five Pillars of Islam",
            "The Articles of Faith (Iman)",
            "The importance of the Quran and Sunnah",
            "Spiritual concepts like Tawakkul and Sabr",
            "The character of the Prophet Muhammad (ﷺ)"
        ],
        buttonText: "Read now on Kindle",
        link: "https://www.amazon.com/dp/B0F195Y5MY"
    }
}

export default function RaysOfIslamPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
        <Card className="max-w-2xl w-full">
            <CardHeader className="items-center text-center">
                 <div className="mb-4">
                    <Image 
                        src="https://i.ibb.co/18r6JGr/IMG-20250717-094009-277.jpg"
                        alt="Book cover for The Rays Of Islam"
                        width={200}
                        height={300}
                        className="rounded-md shadow-lg"
                        data-ai-hint="book cover"
                    />
                 </div>
                <CardTitle className="text-3xl font-bold text-primary">{c.title}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{c.author}</CardDescription>
            </CardHeader>
            <CardContent className="text-center px-6 md:px-8">
                <p className="mb-6 text-left">{c.description}</p>

                <div className="text-left bg-accent/50 p-4 rounded-md mb-6">
                    <h3 className="font-semibold mb-2">{c.topicsTitle}</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                       {c.topics.map((topic, index) => <li key={index}>{topic}</li>)}
                    </ul>
                </div>
                
                <Button asChild size="lg">
                    <Link href={c.link} target="_blank" rel="noopener noreferrer">
                        {c.buttonText}
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
