
"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Scale, Milestone, Flame, Smile, Shield, ArrowLeft, AlertTriangle, Disc, Users, Star, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Das Jenseits (Al-Akhirah)",
        description: "Ein Einblick in die islamische Vorstellung vom Leben nach dem Tod, dem Tag des Jüngsten Gerichts und dem endgültigen Bestimmungsort.",
        backToFeatures: "Zurück zu den Funktionen",
        stages: [
            {
                icon: Shield,
                title: "Das Leben im Grab (Barzakh)",
                content: "Nach dem Tod tritt die Seele in eine Zwischenwelt namens Barzakh ein, die bis zum Tag der Auferstehung andauert. Im Grab wird jeder Mensch von den Engeln Munkar und Nakir befragt über seinen Herrn, seine Religion und seinen Propheten. Für die Gläubigen wird das Grab ein friedlicher und weiter Ort, ein Vorgeschmack auf das Paradies. Für die Ungläubigen wird es ein enger und schrecklicher Ort, ein Vorgeschmack auf die Hölle."
            },
            {
                icon: AlertTriangle,
                title: "Die Zeichen des Jüngsten Tages (Alamat as-Sa'ah)",
                content: "Dem Tag des Jüngsten Gerichts gehen bestimmte Zeichen voraus, die in kleine und große Zeichen unterteilt werden. Die kleinen Zeichen sind zahlreich und viele sind bereits eingetreten. Die großen Zeichen sind gewaltige, aufeinanderfolgende Ereignisse, die den unmittelbaren Beginn der Endzeit ankündigen, wie das Erscheinen des Dajjal (Antichrist), die Rückkehr von Isa (Jesus) und das Aufgehen der Sonne im Westen."
            },
            {
                icon: Disc,
                title: "Der Posaunenstoß (As-Sur)",
                content: "Der Engel Israfil wird auf Allahs Befehl hin zweimal in die Posaune (Sur) stoßen. Beim ersten Stoß wird alles im Universum, außer wen Allah will, sterben. Beim zweiten Stoß werden alle Menschen von den ersten bis zu den letzten wiederauferweckt und aus ihren Gräbern hervorkommen."
            },
            {
                icon: Users,
                title: "Die Versammlung (Al-Hashr)",
                content: "Nach der Auferstehung werden alle Menschen barfuß, nackt und unbeschnitten auf einer riesigen Ebene versammelt. Die Sonne wird sehr nahe rücken, und die Menschen werden entsprechend ihrer Taten schwitzen. An diesem langen und schweren Tag werden die Menschen auf den Beginn der Abrechnung warten."
            },
            {
                icon: Scale,
                title: "Der Tag des Jüngsten Gerichts (Yawm al-Qiyamah)",
                content: "An diesem gewaltigen Tag werden alle Menschen für ihre Taten zur Rechenschaft gezogen. Jedem wird sein Buch der Taten gegeben, entweder in die rechte Hand (Zeichen des Erfolgs) oder in die linke (Zeichen des Verlustes). Die Waage (Mizan) wird aufgestellt, um die guten und schlechten Taten mit absoluter Gerechtigkeit abzuwägen."
            },
            {
                icon: Star,
                title: "Die Fürsprache (Ash-Shafa'ah)",
                content: "Allah wird einigen Seiner rechtschaffenen Diener erlauben, Fürsprache einzulegen. Die größte Fürsprache ist die des Propheten Muhammad (ﷺ), der für die gesamte Menschheit bitten wird, damit die Abrechnung beginnt, und später für seine Ummah, damit sie ins Paradies eintreten kann."
            },
            {
                icon: Droplets,
                title: "Der Teich des Propheten (Al-Kawthar)",
                content: "Vor dem Eintritt ins Paradies werden die Gläubigen die Möglichkeit haben, vom Teich (Al-Kawthar) des Propheten Muhammad (ﷺ) zu trinken. Sein Wasser ist weißer als Milch und süßer als Honig. Wer einmal davon trinkt, wird niemals wieder durstig sein."
            },
            {
                icon: Milestone,
                title: "Die Brücke (As-Sirat)",
                content: "Nach der Abrechnung müssen alle Menschen eine Brücke überqueren, die über die Hölle gespannt ist. Für die Gläubigen wird diese Überquerung je nach ihren Taten leicht und schnell sein – einige werden sie mit der Geschwindigkeit eines Blitzes überqueren. Für die Ungläubigen und Sünder wird die Brücke schärfer als ein Schwert und dünner als ein Haar sein, und viele werden von ihr in die Tiefen der Hölle stürzen."
            },
            {
                icon: Smile,
                title: "Das Paradies (Jannah)",
                content: "Jannah ist der ewige Wohnort der Gläubigen, ein Ort unvorstellbarer Schönheit, des Friedens und des Glücks. Es gibt dort keine Krankheit, keinen Schmerz, keinen Tod und keine Sorgen. Die Bewohner des Paradieses werden alles haben, was ihre Herzen begehren, und ihre größte Freude wird es sein, das Angesicht Allahs zu sehen. Es gibt verschiedene Stufen des Paradieses, wobei die höchste Stufe Firdaws ist."
            },
            {
                icon: Flame,
                title: "Die Hölle (Jahannam)",
                content: "Jahannam ist der Ort der ewigen Bestrafung für diejenigen, die Allah verleugnet und Seine Gebote missachtet haben. Es ist ein Ort des unvorstellbaren Leidens, mit loderndem Feuer, kochendem Wasser und bitterer Nahrung. Es ist eine Manifestation des Zorns Allahs über die Ungläubigen. Möge Allah uns davor bewahren."
            }
        ]
    },
    en: {
        title: "The Hereafter (Al-Akhirah)",
        description: "An insight into the Islamic conception of life after death, the Day of Judgment, and the final destination.",
        backToFeatures: "Back to Features",
        stages: [
            {
                icon: Shield,
                title: "Life in the Grave (Barzakh)",
                content: "After death, the soul enters an intermediate world called Barzakh, which lasts until the Day of Resurrection. In the grave, every person will be questioned by the angels Munkar and Nakir about their Lord, their religion, and their prophet. For the believers, the grave will be a peaceful and spacious place, a foretaste of Paradise. For the disbelievers, it will be a narrow and terrible place, a foretaste of Hell."
            },
            {
                icon: AlertTriangle,
                title: "The Signs of the Day of Judgment (Alamat as-Sa'ah)",
                content: "The Day of Judgment is preceded by specific signs, divided into minor and major signs. The minor signs are numerous and many have already occurred. The major signs are tremendous, successive events that herald the immediate onset of the end times, such as the appearance of the Dajjal (Antichrist), the return of Isa (Jesus), and the rising of the sun from the West."
            },
            {
                icon: Disc,
                title: "The Trumpet Blast (As-Sur)",
                content: "The angel Israfil, upon Allah's command, will blow the trumpet (Sur) twice. At the first blast, everything in the universe will die, except whom Allah wills. At the second blast, all people from the first to the last will be resurrected and emerge from their graves."
            },
            {
                icon: Users,
                title: "The Gathering (Al-Hashr)",
                content: "After the resurrection, all people will be gathered, barefoot, naked, and uncircumcised, on a vast plain. The sun will draw very close, and people will sweat according to their deeds. On this long and difficult day, people will wait for the beginning of the reckoning."
            },
            {
                icon: Scale,
                title: "The Day of Judgment (Yawm al-Qiyamah)",
                content: "On this tremendous day, all people will be held accountable for their deeds. Everyone will be given their book of deeds, either in their right hand (a sign of success) or in their left (a sign of loss). The scale (Mizan) will be set up to weigh the good and bad deeds with absolute justice."
            },
            {
                icon: Star,
                title: "The Intercession (Ash-Shafa'ah)",
                content: "Allah will permit some of His righteous servants to intercede. The greatest intercession is that of the Prophet Muhammad (ﷺ), who will plead for all of humanity for the reckoning to begin, and later for his Ummah to enter Paradise."
            },
            {
                icon: Droplets,
                title: "The Pond of the Prophet (Al-Kawthar)",
                content: "Before entering Paradise, the believers will have the opportunity to drink from the Pond (Al-Kawthar) of Prophet Muhammad (ﷺ). Its water is whiter than milk and sweeter than honey. Whoever drinks from it will never be thirsty again."
            },
            {
                icon: Milestone,
                title: "The Bridge (As-Sirat)",
                content: "After the reckoning, all people must cross a bridge that is spanned over Hell. For the believers, this crossing will be easy and swift, depending on their deeds—some will cross it with the speed of lightning. For the disbelievers and sinners, the bridge will be sharper than a sword and thinner than a hair, and many will fall from it into the depths of Hell."
            },
            {
                icon: Smile,
                title: "Paradise (Jannah)",
                content: "Jannah is the eternal abode of the believers, a place of unimaginable beauty, peace, and happiness. There is no sickness, no pain, no death, and no sorrow. The inhabitants of Paradise will have everything their hearts desire, and their greatest joy will be to see the face of Allah. There are different levels of Paradise, with the highest level being Firdaws."
            },
            {
                icon: Flame,
                title: "Hell (Jahannam)",
                content: "Jahannam is the place of eternal punishment for those who denied Allah and disobeyed His commandments. It is a place of unimaginable suffering, with blazing fire, boiling water, and bitter food. It is a manifestation of Allah's wrath upon the disbelievers. May Allah protect us from it."
            }
        ]
    }
};

export default function HereafterPage() {
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
                <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-3xl mx-auto space-y-6">
                {c.stages.map((stage, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <stage.icon className="h-7 w-7 text-primary" />
                                <span>{stage.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{stage.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
