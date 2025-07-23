
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/language-provider';
import { ScrollText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const storiesData = {
  de: {
    title: 'Islamische Geschichten',
    description: 'Inspirierende und lehrreiche Erzählungen aus dem Koran und der Sunnah.',
    backToFeatures: "Zurück zu den Funktionen",
    stories: [
      {
        title: 'Die Gefährten der Höhle (Ashab al-Kahf)',
        story: 'Eine Gruppe junger Männer floh vor einem tyrranischen König, der sie zum Götzendienst zwingen wollte, und suchte Zuflucht in einer Höhle. Allah versetzte sie in einen tiefen Schlaf, der über 300 Jahre dauerte. Als sie aufwachten, hatte sich die Gesellschaft zum Monotheismus gewandelt. Ihre Geschichte, die in der Sura Al-Kahf erzählt wird, ist ein Zeichen für Allahs Macht, die Gläubigen zu schützen, und ein Beweis für die Auferstehung.'
      },
      {
        title: 'Die Geschichte von Qarun',
        story: 'Qarun war ein Mann aus dem Volk von Musa (Moses), dem Allah unermesslichen Reichtum schenkte. Anstatt dankbar zu sein, wurde er arrogant und prahlte, er habe den Reichtum durch sein eigenes Wissen erlangt. Er weigerte sich, den Armen zu helfen. Als Strafe für seinen Hochmut und Geiz ließ Allah die Erde ihn und seine Schätze verschlingen. Seine Geschichte ist eine Warnung vor den Gefahren von Stolz und Materialismus.'
      },
      {
        title: 'Der Mann, der 99 Menschen tötete',
        story: 'Ein Mann, der 99 Menschen getötet hatte, suchte verzweifelt nach Reue. Ein Gelehrter sagte ihm, seine Reue sei unmöglich, woraufhin der Mann auch ihn tötete. Er gab die Hoffnung nicht auf und fand einen anderen Gelehrten, der ihm riet, in ein Land zu ziehen, in dem rechtschaffene Menschen lebten. Auf dem Weg dorthin starb der Mann. Die Engel der Barmherzigkeit und die Engel der Strafe stritten um seine Seele. Allah befahl ihnen, die Entfernung zu beiden Ländern zu messen. Da er dem Land der Rechtschaffenheit näher war, wurde ihm vergeben. Dies zeigt die unendliche Barmherzigkeit Allahs und die Bedeutung aufrichtiger Reue.'
      },
      {
        name: 'Der Besitzer der zwei Gärten',
        story: 'Im Koran wird die Geschichte eines Mannes erzählt, dem Allah zwei prächtige Gärten voller Früchte und Wasserläufe schenkte. Er wurde stolz auf seinen Reichtum und glaubte, dieser würde niemals vergehen. Er verleugnete sogar das Jenseits. Sein gläubiger Freund ermahnte ihn zur Dankbarkeit. Doch der Mann hörte nicht darauf. Daraufhin vernichtete Allah seine Gärten vollständig. Reuig erkannte der Mann seinen Fehler, doch es war zu spät. Die Geschichte lehrt über die Vergänglichkeit des weltlichen Besitzes und die Wichtigkeit der Demut.'
      },
    ]
  },
  en: {
    title: 'Islamic Stories',
    description: 'Inspiring and educational narratives from the Quran and Sunnah.',
    backToFeatures: "Back to Features",
    stories: [
      {
        title: 'The Companions of the Cave (Ashab al-Kahf)',
        story: 'A group of young men fled from a tyrannical king who wanted to force them into idolatry and sought refuge in a cave. Allah put them into a deep sleep that lasted for over 300 years. When they woke up, society had converted to monotheism. Their story, told in Surah Al-Kahf, is a sign of Allah\'s power to protect the believers and a proof of the resurrection.'
      },
      {
        title: 'The Story of Qarun',
        story: 'Qarun was a man from the people of Musa (Moses) to whom Allah gave immense wealth. Instead of being grateful, he became arrogant and boasted that he had obtained the wealth through his own knowledge. He refused to help the poor. As a punishment for his pride and avarice, Allah caused the earth to swallow him and his treasures. His story is a warning against the dangers of pride and materialism.'
      },
      {
        title: 'The Man Who Killed 99 People',
        story: 'A man who had killed 99 people desperately sought repentance. A scholar told him his repentance was impossible, whereupon the man killed him too. He did not give up hope and found another scholar who advised him to move to a land where righteous people lived. On the way there, the man died. The angels of mercy and the angels of punishment argued over his soul. Allah commanded them to measure the distance to both lands. As he was closer to the land of righteousness, he was forgiven. This shows the infinite mercy of Allah and the importance of sincere repentance.'
      },
      {
        name: 'The Owner of the Two Gardens',
        story: 'The Quran tells the story of a man to whom Allah gave two magnificent gardens full of fruits and streams. He became proud of his wealth and believed it would never perish. He even denied the Hereafter. His believing friend admonished him to be grateful. But the man did not listen. Then Allah completely destroyed his gardens. Regretfully, the man recognized his mistake, but it was too late. The story teaches about the transience of worldly possessions and the importance of humility.'
      },
    ]
  }
};


export default function IslamicStoriesPage() {
  const { language } = useLanguage();
  const c = storiesData[language as keyof typeof storiesData] || storiesData.de;

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
            <ScrollText className="h-10 w-10" />
            {c.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
      </header>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {c.stories.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl text-left">{item.title}</AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 px-4">
              {item.story}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
