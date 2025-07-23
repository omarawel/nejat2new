
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ArrowLeft, FlaskConical, Star, DraftingCompass } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import Image from 'next/image';

const content = {
    de: {
        pageTitle: "Das Goldene Zeitalter des Islam",
        pageDescription: "Entdecke die reichen Beiträge der islamischen Zivilisation zu Wissenschaft, Kunst und Kultur während ihrer Blütezeit.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: FlaskConical,
                title: "Wissenschaft und Medizin",
                content: "Gelehrte wie Ibn Sina (Avicenna) verfassten den 'Kanon der Medizin', ein Standardwerk, das in Europa jahrhundertelang verwendet wurde. Al-Khwarizmi gilt als Vater der Algebra, und Astronomen wie Al-Battani verfeinerten die Messung des Sonnenjahres.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic science"
            },
            {
                icon: DraftingCompass,
                title: "Architektur und Kunst",
                content: "Von der Alhambra in Spanien bis zum Taj Mahal in Indien schuf die islamische Welt atemberaubende architektonische Meisterwerke, die durch komplexe geometrische Muster, Kalligrafie und innovative Kuppelkonstruktionen gekennzeichnet sind.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic architecture"
            },
            {
                icon: Star,
                title: "Philosophie und Literatur",
                content: "Philosophen wie Al-Farabi und Ibn Rushd (Averroes) bewahrten und kommentierten die Werke griechischer Denker und beeinflussten maßgeblich die europäische Scholastik. Epische Gedichte und Geschichten wie 'Tausendundeine Nacht' zeugen von einer reichen literarischen Tradition.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic literature"
            }
        ]
    },
    en: {
        pageTitle: "The Golden Age of Islam",
        pageDescription: "Discover the rich contributions of Islamic civilization to science, art, and culture during its golden age.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: FlaskConical,
                title: "Science and Medicine",
                content: "Scholars like Ibn Sina (Avicenna) wrote 'The Canon of Medicine,' a standard text used in Europe for centuries. Al-Khwarizmi is considered the father of algebra, and astronomers like Al-Battani refined the measurement of the solar year.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic science"
            },
            {
                icon: DraftingCompass,
                title: "Architecture and Art",
                content: "From the Alhambra in Spain to the Taj Mahal in India, the Islamic world created breathtaking architectural masterpieces characterized by complex geometric patterns, calligraphy, and innovative dome constructions.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic architecture"
            },
            {
                icon: Star,
                title: "Philosophy and Literature",
                content: "Philosophers like Al-Farabi and Ibn Rushd (Averroes) preserved and commented on the works of Greek thinkers, significantly influencing European scholasticism. Epic poems and stories like 'One Thousand and One Nights' testify to a rich literary tradition.",
                image: "https://placehold.co/600x400.png",
                hint: "islamic literature"
            }
        ]
    }
}

export default function CivilizationPage() {
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
            <Building2 className="h-10 w-10" />
            {c.pageTitle}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.pageDescription}</p>
      </header>
      
      <div className="max-w-4xl mx-auto space-y-12">
        {c.sections.map((section, index) => (
            <Card key={index} className="overflow-hidden md:grid md:grid-cols-2 items-center shadow-lg">
                <div className="p-6 md:order-1">
                    <CardHeader className="p-0">
                        <CardTitle className="flex items-center gap-3">
                            <section.icon className="h-7 w-7 text-primary" />
                            {section.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                        <p className="text-muted-foreground">{section.content}</p>
                    </CardContent>
                </div>
                <div className="h-64 md:h-full w-full md:order-2">
                    <Image 
                        src={section.image} 
                        alt={section.title} 
                        width={600} 
                        height={400} 
                        className="w-full h-full object-cover"
                        data-ai-hint={section.hint}
                    />
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
}
