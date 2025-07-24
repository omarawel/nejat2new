
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Plane, ArrowLeft, Sun, HandHeart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Islamische Reise-Etikette (Adab as-Safar)",
        description: "Ein Leitfaden für das Verhalten und die Bittgebete eines Muslims auf Reisen.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: BookOpen,
                title: "Vorbereitung auf die Reise",
                points: [
                    "Gute Absicht: Reise mit einer guten Absicht, sei es für Halal-Arbeit, den Besuch von Verwandten, den Erwerb von Wissen oder die Betrachtung von Allahs Schöpfung.",
                    "Istikhara-Gebet: Verrichte das Istikhara-Gebet, um Allah um Führung für die Reise zu bitten.",
                    "Schulden begleichen: Begleiche deine Schulden und erledige deine Angelegenheiten vor der Abreise.",
                    "Reisegefährten: Es wird empfohlen, nicht alleine zu reisen. Wähle rechtschaffene Reisegefährten.",
                    "Einen Amir ernennen: Wenn man in einer Gruppe von drei oder mehr Personen reist, sollte man einen Anführer (Amir) bestimmen."
                ]
            },
            {
                icon: Plane,
                title: "Bittgebete (Dua) für die Reise",
                points: [
                    "Dua beim Verlassen des Hauses: 'Bismillahi, tawakkaltu 'ala-Llah, wa la hawla wa la quwwata illa billah.' (Im Namen Allahs, ich vertraue auf Allah, es gibt keine Macht noch Kraft außer bei Allah).",
                    "Dua beim Betreten eines Fahrzeugs: 'Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin. Wa inna ila Rabbina lamunqalibun.' (Gepriesen sei Der, Der uns dies dienstbar gemacht hat, und wir wären dazu nicht in der Lage gewesen. Und wahrlich, zu unserem Herrn werden wir zurückkehren).",
                    "Dua des Reisenden: Das Gebet eines Reisenden wird von Allah angenommen. Nutze die Zeit, um für dich selbst und andere zu beten."
                ]
            },
            {
                icon: Sun,
                title: "Erleichterungen beim Gebet",
                points: [
                    "Gebete verkürzen (Qasr): Auf Reisen ist es erlaubt, die Vier-Raka'at-Gebete (Dhuhr, Asr, Isha) auf zwei Raka'at zu verkürzen.",
                    "Gebete zusammenlegen (Jam'): Es ist ebenfalls erlaubt, die Gebete Dhuhr und Asr sowie Maghrib und Isha zusammenzulegen, entweder zur Zeit des ersten oder des zweiten Gebets.",
                    "Beten im Fahrzeug: Wenn es nicht möglich ist anzuhalten, kann man im Fahrzeug (Flugzeug, Zug, Auto) beten, wenn nötig auch im Sitzen."
                ]
            },
            {
                icon: HandHeart,
                title: "Allgemeines Verhalten",
                points: [
                    "Guter Charakter: Sei freundlich, geduldig und hilfsbereit gegenüber deinen Reisegefährten und den Menschen, denen du begegnest.",
                    "Respektiere die lokale Kultur: Achte die Sitten und Gebräuche des Ortes, den du besuchst, solange sie nicht dem Islam widersprechen.",
                    "Vermeide Verschwendung: Gehe sparsam mit Ressourcen um und sei dankbar für die Gaben Allahs.",
                    "Erinnerung an Allah: Gedenke Allahs häufig während deiner Reise (Dhikr).",
                    "Rückkehr: Bei der Rückkehr ist es Sunnah, zuerst in die Moschee zu gehen und zwei Raka'at zu beten, bevor man nach Hause geht."
                ]
            }
        ]
    },
    en: {
        title: "Islamic Travel Etiquette (Adab as-Safar)",
        description: "A guide to the conduct and supplications of a Muslim while traveling.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: BookOpen,
                title: "Preparation for the Journey",
                points: [
                    "Good Intention: Travel with a good intention, whether for Halal work, visiting relatives, acquiring knowledge, or contemplating Allah's creation.",
                    "Istikhara Prayer: Perform the Istikhara prayer to ask Allah for guidance for the journey.",
                    "Settle Debts: Settle your debts and take care of your affairs before departure.",
                    "Travel Companions: It is recommended not to travel alone. Choose righteous travel companions.",
                    "Appoint an Amir: When traveling in a group of three or more, one should appoint a leader (Amir)."
                ]
            },
            {
                icon: Plane,
                title: "Supplications (Dua) for the Journey",
                points: [
                    "Dua when leaving the house: 'Bismillahi, tawakkaltu 'ala-Llah, wa la hawla wa la quwwata illa billah.' (In the name of Allah, I trust in Allah, there is no might nor power except with Allah).",
                    "Dua when boarding a vehicle: 'Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin. Wa inna ila Rabbina lamunqalibun.' (Glory be to Him Who has subjected this to us, and we could never have it by our own efforts. And verily, to Our Lord we are to return).",
                    "Dua of the traveler: The prayer of a traveler is accepted by Allah. Use the time to pray for yourself and others."
                ]
            },
            {
                icon: Sun,
                title: "Concessions in Prayer",
                points: [
                    "Shortening Prayers (Qasr): While traveling, it is permissible to shorten the four-Rak'ah prayers (Dhuhr, Asr, Isha) to two Rak'ah.",
                    "Combining Prayers (Jam'): It is also permissible to combine the Dhuhr and Asr prayers, as well as the Maghrib and Isha prayers, either at the time of the first or the second prayer.",
                    "Praying in a vehicle: If it is not possible to stop, one can pray in the vehicle (plane, train, car), even while sitting if necessary."
                ]
            },
            {
                icon: HandHeart,
                title: "General Conduct",
                points: [
                    "Good Character: Be kind, patient, and helpful to your travel companions and the people you meet.",
                    "Respect Local Culture: Respect the customs and traditions of the place you visit, as long as they do not contradict Islam.",
                    "Avoid Waste: Be frugal with resources and be grateful for Allah's blessings.",
                    "Remembrance of Allah: Remember Allah frequently during your journey (Dhikr).",
                    "Return: Upon returning, it is Sunnah to first go to the mosque and pray two Rak'ah before going home."
                ]
            }
        ]
    }
};

export default function TravelEtiquettePage() {
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
                <h1 className="text-4xl font-bold tracking-tight text-primary">
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-3xl mx-auto space-y-8">
                {c.sections.map((section, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <section.icon className="h-7 w-7 text-primary" />
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-3">
                                {section.points.map((point, pIndex) => (
                                    <li key={pIndex}>{point}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
