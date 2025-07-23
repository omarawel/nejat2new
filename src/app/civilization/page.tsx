
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ArrowLeft, FlaskConical, Star, DraftingCompass, Telescope, Sigma, Eye, Users, Tractor, Music } from 'lucide-react';
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
                content: "Gelehrte wie Ibn Sina (Avicenna) verfassten den 'Kanon der Medizin', ein Standardwerk, das in Europa jahrhundertelang verwendet wurde. Al-Zahrawi (Abulcasis) gilt als Vater der modernen Chirurgie und entwickelte über 200 chirurgische Instrumente.",
            },
            {
                icon: DraftingCompass,
                title: "Architektur und Kunst",
                content: "Von der Alhambra in Spanien bis zum Taj Mahal in Indien schuf die islamische Welt atemberaubende architektonische Meisterwerke, die durch komplexe geometrische Muster, Kalligrafie und innovative Kuppelkonstruktionen gekennzeichnet sind.",
            },
            {
                icon: Star,
                title: "Philosophie und Literatur",
                content: "Philosophen wie Al-Farabi und Ibn Rushd (Averroes) bewahrten und kommentierten die Werke griechischer Denker und beeinflussten maßgeblich die europäische Scholastik. Epische Gedichte und Geschichten wie 'Tausendundeine Nacht' zeugen von einer reichen literarischen Tradition.",
            },
            {
                icon: Telescope,
                title: "Astronomie",
                content: "Islamische Astronomen machten enorme Fortschritte. Sie bauten große Observatorien, wie das in Maragha, und entwickelten präzisere Instrumente wie das Astrolabium. Viele Sterne, wie Aldebaran und Altair, tragen heute noch ihre arabischen Namen. Al-Battani verfeinerte die Messung des Sonnenjahres und der Präzession der Erdachse."
            },
            {
                icon: Sigma,
                title: "Mathematik",
                content: "Der Gelehrte Al-Khwarizmi gilt als Vater der Algebra; sein Name gab dem 'Algorithmus' seinen Namen. Islamische Mathematiker entwickelten das Dezimalsystem weiter, führten die Ziffer Null aus Indien in die westliche Welt ein und leisteten Pionierarbeit in der Trigonometrie, insbesondere bei der Entwicklung der Sinus- und Tangensfunktionen."
            },
            {
                icon: Eye,
                title: "Optik",
                content: "Ibn al-Haytham (Alhazen) revolutionierte das Verständnis des Sehens. In seinem 'Buch der Optik' widerlegte er die antike griechische Theorie, dass das Auge Licht aussendet. Er bewies durch Experimente, dass das Sehen durch Lichtstrahlen erfolgt, die von Objekten in das Auge reflektiert werden. Seine Arbeit legte den Grundstein für die moderne Optik und die wissenschaftliche Methode."
            },
            {
                icon: Users,
                title: "Sozialwissenschaften & Geschichte",
                content: "Ibn Khaldun gilt als einer der Gründerväter der modernen Soziologie, Geschichtsschreibung und Ökonomie. In seinem monumentalen Werk, der 'Muqaddimah', analysierte er die Zyklen des Aufstiegs und Falls von Zivilisationen und betonte die Bedeutung von sozialem Zusammenhalt ('Asabiyyah')."
            },
            {
                icon: Tractor,
                title: "Landwirtschaft & Technik",
                content: "Die islamische Welt erlebte eine 'Agrarrevolution'. Ingenieure entwickelten fortschrittliche Bewässerungssysteme, Dämme und Wassermühlen. Sie führten neue Nutzpflanzen wie Zuckerrohr, Reis, Baumwolle und Zitrusfrüchte in Europa ein, was die Ernährung und Wirtschaft nachhaltig veränderte."
            },
            {
                icon: Music,
                title: "Musik",
                content: "Musiktheoretiker wie Al-Farabi und Al-Kindi übersetzten und erweiterten griechische musiktheoretische Werke. Sie schrieben über die therapeutische Wirkung von Musik und entwickelten die Grundlagen der Tonleiter- und Rhythmustheorie. Instrumente wie die Oud (Laute) und die Rabab wurden weiterentwickelt und fanden ihren Weg nach Europa."
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
                content: "Scholars like Ibn Sina (Avicenna) wrote 'The Canon of Medicine,' a standard text used in Europe for centuries. Al-Zahrawi (Abulcasis) is considered the father of modern surgery and developed over 200 surgical instruments.",
            },
            {
                icon: DraftingCompass,
                title: "Architecture and Art",
                content: "From the Alhambra in Spain to the Taj Mahal in India, the Islamic world created breathtaking architectural masterpieces characterized by complex geometric patterns, calligraphy, and innovative dome constructions.",
            },
            {
                icon: Star,
                title: "Philosophy and Literature",
                content: "Philosophers like Al-Farabi and Ibn Rushd (Averroes) preserved and commented on the works of Greek thinkers, significantly influencing European scholasticism. Epic poems and stories like 'One Thousand and One Nights' testify to a rich literary tradition.",
            },
            {
                icon: Telescope,
                title: "Astronomy",
                content: "Islamic astronomers made enormous progress. They built large observatories, such as the one in Maragha, and developed more precise instruments like the astrolabe. Many stars, like Aldebaran and Altair, still bear their Arabic names today. Al-Battani refined the measurement of the solar year and the precession of the Earth's axis."
            },
            {
                icon: Sigma,
                title: "Mathematics",
                content: "The scholar Al-Khwarizmi is considered the father of algebra; his name gave rise to the term 'algorithm'. Islamic mathematicians further developed the decimal system, introduced the numeral zero from India to the Western world, and pioneered trigonometry, especially in the development of sine and tangent functions."
            },
            {
                icon: Eye,
                title: "Optics",
                content: "Ibn al-Haytham (Alhazen) revolutionized the understanding of vision. In his 'Book of Optics,' he refuted the ancient Greek theory that the eye emits light. He proved through experiments that vision occurs when light rays are reflected from objects into the eye. His work laid the foundation for modern optics and the scientific method."
            },
            {
                icon: Users,
                title: "Social Sciences & History",
                content: "Ibn Khaldun is considered one of the founding fathers of modern sociology, historiography, and economics. In his monumental work, the 'Muqaddimah,' he analyzed the cycles of the rise and fall of civilizations and emphasized the importance of social cohesion ('Asabiyyah')."
            },
            {
                icon: Tractor,
                title: "Agriculture & Technology",
                content: "The Islamic world experienced an 'Agricultural Revolution.' Engineers developed advanced irrigation systems, dams, and water mills. They introduced new crops such as sugarcane, rice, cotton, and citrus fruits to Europe, which permanently changed nutrition and the economy."
            },
            {
                icon: Music,
                title: "Music",
                content: "Music theorists like Al-Farabi and Al-Kindi translated and expanded upon Greek musical theory. They wrote about the therapeutic effects of music and developed the foundations of scale and rhythm theory. Instruments like the Oud (lute) and the Rabab were further developed and found their way to Europe."
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
      
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
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
