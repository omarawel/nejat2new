
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/language-provider';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
  de: {
    title: 'Todesfall & Bestattung (Janazah)',
    description: 'Ein Leitfaden zu den islamischen Ritualen und Verhaltensweisen bei einem Todesfall.',
    backToFeatures: "Zurück zu den Funktionen",
    sections: [
      {
        title: 'Unmittelbar nach dem Tod',
        points: [
          '**Augen schließen:** Die Augen des Verstorbenen sollten sanft geschlossen werden.',
          '**Kiefer binden:** Der Unterkiefer sollte mit einem Tuch angebunden werden, um den Mund geschlossen zu halten.',
          '**Gelenke lockern:** Die Gelenke sollten gelockert werden, bevor die Totenstarre eintritt.',
          '**Bedecken:** Der gesamte Körper sollte mit einem sauberen Tuch bedeckt werden.',
          '**Dua sprechen:** Man sollte Bittgebete für den Verstorbenen sprechen und um Allahs Vergebung für ihn bitten.',
          '**Schulden begleichen:** Die Schulden des Verstorbenen sollten so schnell wie möglich aus seinem Nachlass beglichen werden.'
        ]
      },
      {
        title: 'Die rituelle Waschung (Ghusl)',
        points: [
          'Der Körper des Verstorbenen muss von Muslimen des gleichen Geschlechts gewaschen werden (Männer waschen Männer, Frauen waschen Frauen). Ein Ehepartner kann seinen verstorbenen Partner waschen.',
          'Die Waschung ähnelt dem Ghusl, der rituellen Ganzkörperwaschung im Leben.',
          'Der Körper wird respektvoll und diskret behandelt, wobei die privaten Teile (Aurah) stets bedeckt bleiben.'
        ]
      },
      {
        title: 'Das Leichentuch (Kafan)',
        points: [
          'Nach der Waschung wird der Körper in ein einfaches, weißes Leichentuch gehüllt.',
          'Für Männer besteht das Tuch üblicherweise aus drei Teilen, für Frauen aus fünf.',
          'Das Tuch sollte sauber sein, aber nicht extravagant. Es symbolisiert die Gleichheit aller Menschen vor Allah.'
        ]
      },
      {
        title: 'Das Totengebet (Salat al-Janazah)',
        points: [
          'Das Totengebet ist eine gemeinschaftliche Pflicht (Fard Kifayah). Es ist ein Bittgebet für den Verstorbenen und hat keine Niederwerfungen (Sujud) oder Verbeugungen (Ruku).',
          'Es wird im Stehen verrichtet und besteht aus vier Takbirat (das Sagen von "Allahu Akbar").',
          'Nach dem ersten Takbir wird die Sure Al-Fatiha rezitiert.',
          'Nach dem zweiten Takbir wird der Salawat auf den Propheten (ﷺ) gesprochen (wie im Tashahhud).',
          'Nach dem dritten Takbir werden aufrichtige Bittgebete für den Verstorbenen, die Muslime und sich selbst gesprochen.',
          'Nach dem vierten Takbir erfolgt der Taslim (Friedensgruß) nach rechts.'
        ]
      },
      {
        title: 'Die Beerdigung (Dafn)',
        points: [
          'Die Beerdigung sollte so schnell wie möglich erfolgen.',
          'Der Verstorbene wird von Männern zum Grab getragen. Es ist eine Sunnah, am Trauerzug teilzunehmen.',
          'Das Grab wird so ausgehoben, dass der Verstorbene auf seiner rechten Seite mit dem Gesicht in Richtung der Qibla (Mekka) liegt.',
          'Während der Beisetzung werden bestimmte Verse und Bittgebete gesprochen.',
          'Nachdem das Grab geschlossen wurde, ist es Sunnah, am Grab zu verweilen und für die Standhaftigkeit des Verstorbenen bei der Befragung durch die Engel zu beten.'
        ]
      },
      {
        title: 'Die Trauerzeit (Iddah für Witwen)',
        points: [
          'Die allgemeine Trauerzeit für Verwandte beträgt drei Tage. Lautes Wehklagen und übermäßige Trauerbekundungen sind nicht erwünscht.',
          'Eine Witwe muss eine spezielle Wartezeit (Iddah) von vier Monaten und zehn Tagen einhalten. Während dieser Zeit darf sie nicht erneut heiraten und sollte ihr Haus nur aus Notwendigkeit verlassen.'
        ]
      }
    ]
  },
  en: {
    title: 'Death & Burial (Janazah)',
    description: 'A guide to Islamic rituals and conduct in the event of a death.',
    backToFeatures: "Back to Features",
    sections: [
      {
        title: 'Immediately After Death',
        points: [
          '**Closing the eyes:** The deceased\'s eyes should be gently closed.',
          '**Binding the jaw:** The lower jaw should be tied with a cloth to keep the mouth closed.',
          '**Loosening the joints:** The joints should be loosened before rigor mortis sets in.',
          '**Covering:** The entire body should be covered with a clean cloth.',
          '**Making Dua:** One should make supplications for the deceased and ask for Allah\'s forgiveness for them.',
          '**Settling debts:** The deceased\'s debts should be settled as soon as possible from their estate.'
        ]
      },
      {
        title: 'The Ritual Washing (Ghusl)',
        points: [
          'The body of the deceased must be washed by Muslims of the same gender (men wash men, women wash women). A spouse can wash their deceased partner.',
          'The washing is similar to the Ghusl, the ritual full-body washing in life.',
          'The body is treated with respect and discretion, with the private parts (Aurah) always covered.'
        ]
      },
      {
        title: 'The Shroud (Kafan)',
        points: [
          'After washing, the body is wrapped in a simple, white shroud.',
          'For men, the shroud usually consists of three pieces; for women, five.',
          'The shroud should be clean but not extravagant. It symbolizes the equality of all people before Allah.'
        ]
      },
      {
        title: 'The Funeral Prayer (Salat al-Janazah)',
        points: [
          'The funeral prayer is a communal obligation (Fard Kifayah). It is a supplication for the deceased and has no prostrations (Sujud) or bows (Ruku).',
          'It is performed while standing and consists of four Takbirat (saying "Allahu Akbar").',
          'After the first Takbir, Surah Al-Fatiha is recited.',
          'After the second Takbir, the Salawat on the Prophet (ﷺ) is recited (as in the Tashahhud).',
          'After the third Takbir, sincere supplications are made for the deceased, the Muslims, and oneself.',
          'After the fourth Takbir, the Taslim (greeting of peace) is made to the right.'
        ]
      },
      {
        title: 'The Burial (Dafn)',
        points: [
          'The burial should take place as soon as possible.',
          'The deceased is carried to the grave by men. It is a Sunnah to participate in the funeral procession.',
          'The grave is dug so that the deceased lies on their right side facing the Qibla (Mecca).',
          'During the burial, specific verses and supplications are recited.',
          'After the grave is closed, it is Sunnah to remain at the grave and pray for the steadfastness of the deceased during the questioning by the angels.'
        ]
      },
      {
        title: 'The Mourning Period (Iddah for Widows)',
        points: [
          'The general mourning period for relatives is three days. Loud wailing and excessive expressions of grief are discouraged.',
          'A widow must observe a special waiting period (Iddah) of four months and ten days. During this time, she may not remarry and should only leave her house out of necessity.'
        ]
      }
    ]
  }
};


export default function JanazahPage() {
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
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {c.sections.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-xl text-left hover:no-underline">{item.title}</AccordionTrigger>
                <AccordionContent className="text-base px-4">
                    <ul className="list-disc list-inside space-y-3">
                        {item.points.map((point, pIndex) => (
                            <li key={pIndex} dangerouslySetInnerHTML={{ __html: point }}></li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
