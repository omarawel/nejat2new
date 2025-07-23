
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/language-provider';
import { Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
  de: {
    title: 'Wunder im Islam',
    description: 'Eine Betrachtung der übernatürlichen Ereignisse und Zeichen, die Allah Seinen Propheten als Beweis ihrer Wahrhaftigkeit gewährt hat.',
    backToFeatures: "Zurück zu den Funktionen",
    miracles: [
      {
        title: 'Die Spaltung des Mondes (Prophet Muhammad ﷺ)',
        story: 'Als die Götzendiener von Mekka ein Zeichen von ihm verlangten, betete der Prophet Muhammad (ﷺ) zu Allah. Der Mond wurde vor ihren Augen in zwei Hälften gespalten, wobei jede Hälfte auf einer Seite des Berges Hira erschien. Dieses Ereignis wird im Koran (Sure 54:1-2) erwähnt und gilt als eines seiner größten Wunder.'
      },
      {
        title: 'Die Nachtreise und Himmelfahrt (Isra & Mi\'raj - Prophet Muhammad ﷺ)',
        story: 'In einer einzigen Nacht reiste der Prophet (ﷺ) von Mekka nach Jerusalem (Isra) auf einem wundersamen Reittier namens Buraq. Von dort stieg er durch die sieben Himmel auf (Mi\'raj), traf frühere Propheten und trat vor die Gegenwart Allahs, wo die fünf täglichen Gebete für die Muslime zur Pflicht wurden.'
      },
      {
        title: 'Der Stab des Musa (عليه السلام)',
        story: 'Als Musa (Moses) dem Pharao und seinen Zauberern gegenüberstand, warf er auf Allahs Befehl seinen Stab nieder, der sich in eine echte, riesige Schlange verwandelte und die Illusionen der Zauberer verschlang. Ein weiteres Wunder war, als Musa mit seinem Stab auf das Rote Meer schlug und es sich teilte, um den Kindern Israels die Flucht vor dem Pharao zu ermöglichen.'
      },
      {
        title: 'Die Wunder des Isa (عليه السلام)',
        story: 'Isa (Jesus) vollbrachte mit Allahs Erlaubnis zahlreiche Wunder. Er wurde ohne Vater von der reinen Jungfrau Maryam geboren, sprach als Baby in der Wiege, heilte Aussätzige und Blinde, formte Vögel aus Ton, hauchte ihnen Leben ein und erweckte Tote zum Leben. Diese Wunder dienten als klare Beweise für sein Prophetentum.'
      },
      {
        title: 'Die Kamelstute des Salih (عليه السلام)',
        story: 'Das Volk der Thamud forderte von ihrem Propheten Salih ein Wunder, um seinen Anspruch zu beweisen. Sie verlangten, dass er eine Kamelstute aus einem massiven Felsen hervorbringen sollte. Allah erhörte Salihs Gebet, und eine riesige, trächtige Kamelstute kam aus dem Felsen. Trotz der Warnung, ihr kein Leid zuzufügen, töteten sie sie und wurden dafür bestraft.'
      },
       {
        title: 'Das größte Wunder: Der Koran',
        story: 'Das größte und beständigste Wunder des Propheten Muhammad (ﷺ) ist der Heilige Koran selbst. Seine sprachliche Perfektion, seine wissenschaftlichen Vorhersagen, seine prophetischen Aussagen und seine unnachahmliche Eloquenz waren und sind für die Araber der damaligen Zeit und für die gesamte Menschheit bis heute unerreichbar. Allah forderte die Menschheit auf, auch nur eine einzige Sure hervorzubringen, die dem Koran ebenbürtig ist, eine Herausforderung, die bis heute unerreicht bleibt.'
      },
    ]
  },
  en: {
    title: 'Miracles in Islam',
    description: 'A look at the supernatural events and signs that Allah granted to His prophets as proof of their truthfulness.',
    backToFeatures: "Back to Features",
    miracles: [
      {
        title: 'The Splitting of the Moon (Prophet Muhammad ﷺ)',
        story: 'When the idolaters of Mecca demanded a sign from him, the Prophet Muhammad (ﷺ) prayed to Allah. The moon was split in two before their eyes, with each half appearing on one side of Mount Hira. This event is mentioned in the Quran (Surah 54:1-2) and is considered one of his greatest miracles.'
      },
      {
        title: 'The Night Journey and Ascension (Isra & Mi\'raj - Prophet Muhammad ﷺ)',
        story: 'In a single night, the Prophet (ﷺ) traveled from Mecca to Jerusalem (Isra) on a miraculous steed called Buraq. From there, he ascended through the seven heavens (Mi\'raj), met previous prophets, and came into the presence of Allah, where the five daily prayers were made obligatory for Muslims.'
      },
      {
        title: 'The Staff of Musa (peace be upon him)',
        story: 'When Musa (Moses) confronted Pharaoh and his sorcerers, by Allah\'s command he threw down his staff, which turned into a real, huge serpent and devoured the illusions of the sorcerers. Another miracle was when Musa struck the Red Sea with his staff, and it parted to allow the Children of Israel to escape from Pharaoh.'
      },
      {
        title: 'The Miracles of Isa (peace be upon him)',
        story: 'Isa (Jesus) performed numerous miracles with Allah\'s permission. He was born without a father to the pure virgin Maryam, spoke as a baby in the cradle, healed the leper and the blind, fashioned birds from clay, breathed life into them, and raised the dead. These miracles served as clear proofs of his prophethood.'
      },
      {
        title: 'The She-Camel of Salih (peace be upon him)',
        story: 'The people of Thamud demanded a miracle from their prophet Salih to prove his claim. They asked him to bring forth a she-camel from a solid rock. Allah answered Salih\'s prayer, and a huge, pregnant she-camel emerged from the rock. Despite the warning not to harm it, they killed it and were punished for it.'
      },
      {
        title: 'The Greatest Miracle: The Quran',
        story: 'The greatest and most enduring miracle of the Prophet Muhammad (ﷺ) is the Holy Quran itself. Its linguistic perfection, scientific predictions, prophetic statements, and inimitable eloquence were and are unattainable for the Arabs of that time and for all of humanity to this day. Allah challenged mankind to produce even a single surah comparable to the Quran, a challenge that remains unmet to this day.'
      },
    ]
  }
};


export default function IslamicMiraclesPage() {
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
            <Star className="h-10 w-10" />
            {c.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
      </header>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {c.miracles.map((item, index) => (
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
