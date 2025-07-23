import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const tips = [
  {
    title: 'Setze dir klare Ziele',
    description: 'Beginne mit kurzen Suren oder wenigen Versen. Ein tägliches, kleines Ziel ist effektiver als unregelmäßige, große Lerneinheiten.',
  },
  {
    title: 'Schaffe eine Routine',
    description: 'Lerne jeden Tag zur gleichen Zeit, idealerweise nach dem Fajr-Gebet, wenn der Geist frisch und die Umgebung ruhig ist.',
  },
  {
    title: 'Höre regelmäßig zu',
    description: 'Höre dir die Verse, die du lernen möchtest, von einem Qari mit korrekter Aussprache (Tajwid) an. Dies schult dein Gehör und verbessert deine eigene Rezitation.',
  },
  {
    title: 'Verstehe die Bedeutung',
    description: 'Wenn du die Bedeutung der Verse kennst, schaffst du eine tiefere Verbindung zum Text, was das Behalten erleichtert.',
  },
  {
    title: 'Wiederhole konstant',
    description: 'Wiederholung ist der Schlüssel. Rezitiere die gelernten Verse in deinen täglichen Gebeten, um sie im Gedächtnis zu festigen.',
  },
  {
    title: 'Nutze die "Schreib"-Methode',
    description: 'Schreibe die Verse auf, die du auswendig lernst. Die physische Handlung des Schreibens kann das Erinnerungsvermögen stärken.',
  },
  {
    title: 'Finde einen Lernpartner',
    description: 'Ein Partner kann dich korrigieren, motivieren und dir helfen, am Ball zu bleiben. Ihr könnt euch gegenseitig abfragen.',
  },
  {
    title: 'Mache Dua zu Allah',
    description: 'Bitte Allah (SWT) um Hilfe und Segen für dein Vorhaben. Aufrichtige Bitten können Türen öffnen und das Lernen erleichtern.',
  }
];

export default function MemorizationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Tipps zum Auswendiglernen</h1>
        <p className="text-muted-foreground mt-2 text-lg">Effektive Techniken, um den Koran und Bittgebete zu memorieren.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tips.map((tip, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <div>
                <CardTitle>{tip.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{tip.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
