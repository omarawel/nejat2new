
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

const tips = [
  {
    de: {
      title: 'Setze dir klare Ziele',
      description: 'Beginne mit kurzen Suren oder wenigen Versen. Ein tägliches, kleines Ziel ist effektiver als unregelmäßige, große Lerneinheiten.',
    },
    en: {
      title: 'Set Clear Goals',
      description: 'Start with short Surahs or a few verses. A small, daily goal is more effective than irregular, large study sessions.',
    }
  },
  {
    de: {
      title: 'Schaffe eine Routine',
      description: 'Lerne jeden Tag zur gleichen Zeit, idealerweise nach dem Fajr-Gebet, wenn der Geist frisch und die Umgebung ruhig ist.',
    },
    en: {
        title: 'Create a Routine',
        description: 'Study at the same time every day, ideally after the Fajr prayer when the mind is fresh and the environment is quiet.',
    }
  },
  {
    de: {
      title: 'Höre regelmäßig zu',
      description: 'Höre dir die Verse, die du lernen möchtest, von einem Qari mit korrekter Aussprache (Tajwid) an. Dies schult dein Gehör und verbessert deine eigene Rezitation.',
    },
    en: {
      title: 'Listen Regularly',
      description: 'Listen to the verses you want to learn from a Qari with correct pronunciation (Tajwid). This trains your ear and improves your own recitation.',
    }
  },
  {
    de: {
      title: 'Verstehe die Bedeutung',
      description: 'Wenn du die Bedeutung der Verse kennst, schaffst du eine tiefere Verbindung zum Text, was das Behalten erleichtert.',
    },
    en: {
        title: 'Understand the Meaning',
        description: 'Knowing the meaning of the verses creates a deeper connection to the text, which makes it easier to remember.',
    }
  },
  {
    de: {
      title: 'Wiederhole konstant',
      description: 'Wiederholung ist der Schlüssel. Rezitiere die gelernten Verse in deinen täglichen Gebeten, um sie im Gedächtnis zu festigen.',
    },
    en: {
      title: 'Repeat Consistently',
      description: 'Repetition is key. Recite the learned verses in your daily prayers to solidify them in your memory.',
    }
  },
  {
    de: {
      title: 'Nutze die "Schreib"-Methode',
      description: 'Schreibe die Verse auf, die du auswendig lernst. Die physische Handlung des Schreibens kann das Erinnerungsvermögen stärken.',
    },
    en: {
        title: 'Use the "Writing" Method',
        description: 'Write down the verses you are memorizing. The physical act of writing can strengthen memory.',
    }
  },
  {
    de: {
      title: 'Finde einen Lernpartner',
      description: 'Ein Partner kann dich korrigieren, motivieren und dir helfen, am Ball zu bleiben. Ihr könnt euch gegenseitig abfragen.',
    },
    en: {
        title: 'Find a Study Partner',
        description: 'A partner can correct you, motivate you, and help you stay on track. You can quiz each other.',
    }
  },
  {
    de: {
      title: 'Mache Dua zu Allah',
      description: 'Bitte Allah (SWT) um Hilfe und Segen für dein Vorhaben. Aufrichtige Bitten können Türen öffnen und das Lernen erleichtern.',
    },
    en: {
      title: 'Make Dua to Allah',
      description: 'Ask Allah (SWT) for help and blessings for your endeavor. Sincere supplications can open doors and make learning easier.',
    }
  }
];

const content = {
    de: {
        title: "Tipps zum Auswendiglernen",
        description: "Effektive Techniken, um den Koran und Bittgebete zu memorieren.",
    },
    en: {
        title: "Memorization Tips",
        description: "Effective techniques to memorize the Quran and supplications.",
    }
}


export default function MemorizationPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{c.description}</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tips.map((tip, index) => {
            const localizedTip = tip[language] || tip.de;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>{localizedTip.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{localizedTip.description}</CardDescription>
                </CardContent>
              </Card>
            )
        })}
      </div>
    </div>
  );
}

    