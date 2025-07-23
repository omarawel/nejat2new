
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';

const content = {
    de: {
        title: "Die Strahlen Des Islam",
        author: "von Omar Awel",
        description: "Ein Buch, das Licht auf die Lehren und die Schönheit des Islam wirft. Entdecke inspirierende Einblicke und vertiefe dein Wissen.",
        buttonText: "Jetzt auf Kindle lesen",
        link: "https://lesen.amazon.de/kp/kshare?asin=B0F195Y5MY&id=ks6jizhuxvh3xhy2fuvlsjprmi"
    },
    en: {
        title: "The Rays Of Islam",
        author: "by Omar Awel",
        description: "A book that casts light on the teachings and beauty of Islam. Discover inspiring insights and deepen your knowledge.",
        buttonText: "Read now on Kindle",
        link: "https://www.amazon.com/dp/B0F195Y5MY" // Using a generic Amazon.com link for EN
    }
}

export default function RaysOfIslamPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
            <CardHeader>
                 <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
              </div>
                <CardTitle className="text-3xl font-bold text-primary">{c.title}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{c.author}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-6">{c.description}</p>
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
