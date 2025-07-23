
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import Image from 'next/image';

const content = {
    de: {
        title: "Gebetswaschung (Wudu)",
        description: "Eine Schritt-für-Schritt-Anleitung zur rituellen Waschung vor dem Gebet.",
        intention: {
            title: "1. Absicht (Niyyah) & Basmala",
            description: "Fasse im Herzen die Absicht, Wudu zu vollziehen. Beginne mit den Worten „Bismillah“ (Im Namen Allahs).",
            img: "https://placehold.co/600x400.png",
            hint: "intention hands",
        },
        steps: [
            {
                title: "2. Hände waschen",
                description: "Wasche deine Hände dreimal bis zu den Handgelenken. Stelle sicher, dass auch die Bereiche zwischen den Fingern gereinigt werden.",
                img: "https://placehold.co/600x400.png",
                hint: "washing hands water",
            },
            {
                title: "3. Mund ausspülen",
                description: "Nimm Wasser mit der rechten Hand in den Mund, spüle ihn gründlich aus und spucke es wieder aus. Wiederhole dies dreimal.",
                img: "https://placehold.co/600x400.png",
                hint: "rinsing mouth water",
            },
            {
                title: "4. Nase reinigen",
                description: "Nimm Wasser mit der rechten Hand auf, atme es leicht in die Nase ein und schnäuze es mit der linken Hand wieder aus. Wiederhole dies dreimal.",
                img: "https://placehold.co/600x400.png",
                hint: "cleaning nose water",
            },
            {
                title: "5. Gesicht waschen",
                description: "Wasche dein gesamtes Gesicht dreimal, vom Haaransatz bis zum Kinn und von Ohr zu Ohr.",
                img: "https://placehold.co/600x400.png",
                hint: "washing face water",
            },
            {
                title: "6. Arme waschen",
                description: "Wasche deinen rechten Arm dreimal vom Handgelenk bis einschließlich des Ellenbogens, dann den linken Arm auf die gleiche Weise.",
                img: "https://placehold.co/600x400.png",
                hint: "washing arms water",
            },
            {
                title: "7. Kopf streichen (Masah)",
                description: "Befeuchte deine Hände und streiche einmal über deinen Kopf, von der Stirn bis zum Nacken.",
                img: "https://placehold.co/600x400.png",
                hint: "wiping head water",
            },
            {
                title: "8. Ohren reinigen",
                description: "Reinige mit den nassen Zeigefingern die Innenseite deiner Ohren und mit den Daumen die Außenseite. Dies geschieht einmal.",
                img: "https://placehold.co/600x400.png",
                hint: "cleaning ears",
            },
            {
                title: "9. Füße waschen",
                description: "Wasche deinen rechten Fuß dreimal bis einschließlich der Knöchel, dann den linken Fuß auf die gleiche Weise. Achte darauf, die Zehenzwischenräume zu reinigen.",
                img: "https://placehold.co/600x400.png",
                hint: "washing feet water",
            },
        ],
        completion: {
            title: "10. Abschluss-Dua (Shahada)",
            description: "Hebe deinen Blick zum Himmel und sprich das Glaubensbekenntnis: „Aschhadu an la ilaha illallah, wa aschhadu anna Muhammadan abduhu wa rasuluh.“",
            img: "https://placehold.co/600x400.png",
            hint: "praying hands sky",
        }
    },
    en: {
        title: "Ablution (Wudu)",
        description: "A step-by-step guide to the ritual purification before prayer.",
        intention: {
            title: "1. Intention (Niyyah) & Basmala",
            description: "Make the intention in your heart to perform Wudu. Begin by saying \"Bismillah\" (In the name of Allah).",
            img: "https://placehold.co/600x400.png",
            hint: "intention hands",
        },
        steps: [
            {
                title: "2. Wash Hands",
                description: "Wash your hands up to the wrists three times. Ensure that the areas between the fingers are also cleaned.",
                img: "https://placehold.co/600x400.png",
                hint: "washing hands water",
            },
            {
                title: "3. Rinse Mouth",
                description: "Take water into your mouth with your right hand, rinse it thoroughly, and spit it out. Repeat this three times.",
                img: "https://placehold.co/600x400.png",
                hint: "rinsing mouth water",
            },
            {
                title: "4. Cleanse Nose",
                description: "Take water with your right hand, inhale it gently into your nose, and blow it out with your left hand. Repeat this three times.",
                img: "https://placehold.co/600x400.png",
                hint: "cleaning nose water",
            },
            {
                title: "5. Wash Face",
                description: "Wash your entire face three times, from the hairline to the chin and from ear to ear.",
                img: "https://placehold.co/600x400.png",
                hint: "washing face water",
            },
            {
                title: "6. Wash Arms",
                description: "Wash your right arm three times from the wrist up to and including the elbow, then the left arm in the same way.",
                img: "https://placehold.co/600x400.png",
                hint: "washing arms water",
            },
            {
                title: "7. Wipe Head (Masah)",
                description: "Moisten your hands and wipe over your head once, from the forehead to the nape of the neck.",
                img: "https://placehold.co/600x400.png",
                hint: "wiping head water",
            },
            {
                title: "8. Clean Ears",
                description: "With your wet index fingers, clean the inside of your ears, and with your thumbs, the outside. This is done once.",
                img: "https://placehold.co/600x400.png",
                hint: "cleaning ears",
            },
            {
                title: "9. Wash Feet",
                description: "Wash your right foot three times up to and including the ankles, then the left foot in the same way. Be sure to clean between the toes.",
                img: "https://placehold.co/600x400.png",
                hint: "washing feet water",
            },
        ],
        completion: {
            title: "10. Concluding Dua (Shahada)",
            description: "Raise your gaze to the sky and recite the testimony of faith: \"Ashhadu an la ilaha illallah, wa ashhadu anna Muhammadan abduhu wa rasuluh.\"",
            img: "https://placehold.co/600x400.png",
            hint: "praying hands sky",
        }
    }
}

export default function WuduPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  const StepCard = ({ number, title, description, imgSrc, hint }: { number?: string, title: string, description: string, imgSrc: string, hint: string }) => (
    <Card className="flex flex-col md:flex-row items-center overflow-hidden">
        <div className="md:w-1/3 relative w-full h-48 md:h-full">
            <Image 
                src={imgSrc} 
                alt={title} 
                layout="fill"
                objectFit="cover"
                data-ai-hint={hint}
            />
        </div>
        <CardHeader className="md:w-2/3">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{c.description}</p>
      </header>
      
      <div className="space-y-8 max-w-4xl mx-auto">
        <StepCard 
            title={c.intention.title} 
            description={c.intention.description} 
            imgSrc={c.intention.img}
            hint={c.intention.hint}
        />

        {c.steps.map((step, index) => (
            <StepCard 
                key={index}
                title={step.title}
                description={step.description}
                imgSrc={step.img}
                hint={step.hint}
            />
        ))}

        <StepCard 
            title={c.completion.title} 
            description={c.completion.description} 
            imgSrc={c.completion.img}
            hint={c.completion.hint}
        />
      </div>
    </div>
  );
}

    