
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const content = {
    de: {
        title: "Gebetswaschung (Wudu)",
        description: "Eine Schritt-für-Schritt-Anleitung zur rituellen Waschung vor dem Gebet.",
        backToFeatures: "Zurück zu den Funktionen",
        intention: {
            title: "1. Absicht (Niyyah) & Basmala",
            description: "Fasse im Herzen die Absicht, Wudu zu vollziehen. Beginne mit den Worten „Bismillah“ (Im Namen Allahs).",
        },
        steps: [
            {
                title: "2. Hände waschen",
                description: "Wasche deine Hände dreimal bis zu den Handgelenken. Stelle sicher, dass auch die Bereiche zwischen den Fingern gereinigt werden.",
            },
            {
                title: "3. Mund ausspülen",
                description: "Nimm Wasser mit der rechten Hand in den Mund, spüle ihn gründlich aus und spucke es wieder aus. Wiederhole dies dreimal.",
            },
            {
                title: "4. Nase reinigen",
                description: "Nimm Wasser mit der rechten Hand auf, atme es leicht in die Nase ein und schnäuze es mit der linken Hand wieder aus. Wiederhole dies dreimal.",
            },
            {
                title: "5. Gesicht waschen",
                description: "Wasche dein gesamtes Gesicht dreimal, vom Haaransatz bis zum Kinn und von Ohr zu Ohr.",
            },
            {
                title: "6. Arme waschen",
                description: "Wasche deinen rechten Arm dreimal vom Handgelenk bis einschließlich des Ellenbogens, dann den linken Arm auf die gleiche Weise.",
            },
            {
                title: "7. Kopf streichen (Masah)",
                description: "Befeuchte deine Hände und streiche einmal über deinen Kopf, von der Stirn bis zum Nacken.",
            },
            {
                title: "8. Ohren reinigen",
                description: "Reinige mit den nassen Zeigefingern die Innenseite deiner Ohren und mit den Daumen die Außenseite. Dies geschieht einmal.",
            },
            {
                title: "9. Füße waschen",
                description: "Wasche deinen rechten Fuß dreimal bis einschließlich der Knöchel, dann den linken Fuß auf die gleiche Weise. Achte darauf, die Zehenzwischenräume zu reinigen.",
            },
        ],
        completion: {
            title: "10. Abschluss-Dua (Shahada)",
            description: "Hebe deinen Blick zum Himmel und sprich das Glaubensbekenntnis: „Aschhadu an la ilaha illallah, wa aschhadu anna Muhammadan abduhu wa rasuluh.“",
            arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ"
        }
    },
    en: {
        title: "Ablution (Wudu)",
        description: "A step-by-step guide to the ritual purification before prayer.",
        backToFeatures: "Back to Features",
        intention: {
            title: "1. Intention (Niyyah) & Basmala",
            description: "Make the intention in your heart to perform Wudu. Begin by saying \"Bismillah\" (In the name of Allah).",
        },
        steps: [
            {
                title: "2. Wash Hands",
                description: "Wash your hands up to the wrists three times. Ensure that the areas between the fingers are also cleaned.",
            },
            {
                title: "3. Rinse Mouth",
                description: "Take water into your mouth with your right hand, rinse it thoroughly, and spit it out. Repeat this three times.",
            },
            {
                title: "4. Cleanse Nose",
                description: "Take water with your right hand, inhale it gently into your nose, and blow it out with your left hand. Repeat this three times.",
            },
            {
                title: "5. Wash Face",
                description: "Wash your entire face three times, from the hairline to the chin and from ear to ear.",
            },
            {
                title: "6. Wash Arms",
                description: "Wash your right arm three times from the wrist up to and including the elbow, then the left arm in the same way.",
            },
            {
                title: "7. Wipe Head (Masah)",
                description: "Moisten your hands and wipe over your head once, from the forehead to the nape of the neck.",
            },
            {
                title: "8. Clean Ears",
                description: "With your wet index fingers, clean the inside of your ears, and with your thumbs, the outside. This is done once.",
            },
            {
                title: "9. Wash Feet",
                description: "Wash your right foot three times up to and including the ankles, then the left foot in the same way. Be sure to clean between the toes.",
            },
        ],
        completion: {
            title: "10. Concluding Dua (Shahada)",
            description: "Raise your gaze to the sky and recite the testimony of faith: \"Ashhadu an la ilaha illallah, wa ashhadu anna Muhammadan abduhu wa rasuluh.\"",
            arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ"
        }
    }
}

export default function WuduPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  const StepCard = ({ title, description, arabic }: { title: string, description: string, arabic?: string }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <CardDescription className="text-base">{description}</CardDescription>
            {arabic && (
                <p className="text-2xl font-quranic text-right mt-4 text-primary">{arabic}</p>
            )}
        </CardContent>
    </Card>
  );

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
        <p className="text-muted-foreground mt-2 text-lg">{c.description}</p>
      </header>
      
      <div className="space-y-6 max-w-2xl mx-auto">
        <StepCard 
            title={c.intention.title} 
            description={c.intention.description} 
        />

        {c.steps.map((step, index) => (
            <StepCard 
                key={index}
                title={step.title}
                description={step.description}
            />
        ))}

        <StepCard 
            title={c.completion.title} 
            description={c.completion.description} 
            arabic={c.completion.arabic}
        />
      </div>
    </div>
  );
}
