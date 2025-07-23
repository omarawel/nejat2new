
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/language-provider';
import { Sparkle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
  de: {
    title: 'Wissenschaftliche Wunder im Koran',
    description: 'Eine Untersuchung von Versen, die auf wissenschaftliche Fakten hinweisen, die erst Jahrhunderte nach der Offenbarung entdeckt wurden.',
    backToFeatures: "Zurück zu den Funktionen",
    miracles: [
      {
        title: 'Die Entstehung des Universums (Urknall)',
        verse: 'Haben die Ungläubigen nicht gesehen, dass die Himmel und die Erde eine Einheit waren, die Wir dann zerteilten? Und Wir machten aus dem Wasser alles Lebendige. Wollen sie denn nicht glauben? (Sure 21:30)',
        explanation: 'Dieser Vers beschreibt eine außergewöhnliche Übereinstimmung mit der Urknalltheorie, die besagt, dass das Universum aus einem einzigen, extrem dichten und heißen Punkt entstand und sich seitdem ausdehnt. Die Beschreibung von Himmeln und Erde als "eine Einheit" (ratqan), die dann "zerteilt" (fataqna) wurde, spiegelt das moderne kosmologische Modell wider.'
      },
      {
        title: 'Die Expansion des Universums',
        verse: 'Und den Himmel haben Wir mit Kraft erbaut, und Wir erweitern ihn wahrlich. (Sure 51:47)',
        explanation: 'Das arabische Wort "musi\'un" wird von Gelehrten als "erweitern" oder "expandieren" interpretiert. Dies ist eine direkte Anspielung auf die Expansion des Universums, eine Entdeckung, die erst im 20. Jahrhundert durch Edwin Hubble gemacht wurde. Die Tatsache, dass der Koran dies vor 1400 Jahren erwähnte, ist bemerkenswert.'
      },
      {
        title: 'Die embryonale Entwicklung',
        verse: 'Dann schufen Wir den Samentropfen zu einem Blutklumpen (Alaqa), und schufen den Blutklumpen zu einem Fleischklumpen (Mudghah), und schufen aus dem Fleischklumpen Knochen, und bekleideten die Knochen mit Fleisch. (Sure 23:14)',
        explanation: 'Die im Koran beschriebenen Stadien der menschlichen Embryonalentwicklung – "Alaqa" (etwas, das sich anheftet, wie ein Blutegel), "Mudghah" (etwas Gekautes) – sind erstaunlich präzise und entsprechen den modernen wissenschaftlichen Erkenntnissen. Besonders die Reihenfolge – erst die Bildung von Knochen, dann deren Bekleidung mit Muskeln und Fleisch – wurde erst durch die moderne Embryologie bestätigt.'
      },
      {
        title: 'Die Funktion der Berge',
        verse: 'Haben Wir nicht die Erde zu einem Lager gemacht und die Berge zu Pflöcken? (Sure 78:6-7)',
        explanation: 'Der Koran beschreibt Berge als "Pflöcke" (awtadan), was auf eine tiefe Verankerung in der Erde hindeutet. Die moderne Geologie hat das Prinzip der Isostasie bestätigt, wonach Berge tiefe "Wurzeln" haben, die in den Erdmantel hineinragen und die Erdkruste stabilisieren, ähnlich wie Zeltpflöcke ein Zelt stabilisieren.'
      },
       {
        title: 'Die Barriere zwischen zwei Meeren',
        verse: 'Er hat den beiden Meeren freien Lauf gelassen, die einander begegnen. Zwischen ihnen ist eine Barriere, die sie nicht überschreiten. (Sure 55:19-20)',
        explanation: 'Dieses Phänomen, bekannt als Halokline, wurde von modernen Ozeanographen an Orten wie der Straße von Gibraltar beobachtet, wo das salzigere Mittelmeer auf den weniger salzigen Atlantik trifft. Aufgrund unterschiedlicher Dichten, Temperaturen und Salzgehalte vermischen sich die beiden Gewässer nicht sofort und bilden eine sichtbare Trennlinie oder "Barriere".'
      },
    ]
  },
  en: {
    title: 'Scientific Miracles in the Quran',
    description: 'An examination of verses that point to scientific facts discovered centuries after the revelation.',
    backToFeatures: "Back to Features",
    miracles: [
      {
        title: 'The Origin of the Universe (Big Bang)',
        verse: 'Have not those who disbelieve seen that the heavens and the earth were a jointed entity, and We separated them and made from water every living thing? Then will they not believe? (Surah 21:30)',
        explanation: 'This verse describes an extraordinary agreement with the Big Bang theory, which states that the universe originated from a single, extremely dense and hot point and has been expanding ever since. The description of the heavens and earth as "a jointed entity" (ratqan) which was then "separated" (fataqna) reflects the modern cosmological model.'
      },
      {
        title: 'The Expansion of the Universe',
        verse: 'And the heaven We constructed with strength, and indeed, We are [its] expander. (Surah 51:47)',
        explanation: 'The Arabic word "musi\'un" is interpreted by scholars as "expanding" or "to expand." This is a direct reference to the expansion of the universe, a discovery made only in the 20th century by Edwin Hubble. The fact that the Quran mentioned this 1400 years ago is remarkable.'
      },
      {
        title: 'Embryonic Development',
        verse: 'Then We made the sperm-drop into a clinging clot (Alaqa), and We made the clot into a lump of flesh (Mudghah), and We made from the lump, bones, and We covered the bones with flesh. (Surah 23:14)',
        explanation: 'The stages of human embryonic development described in the Quran—"Alaqa" (something that clings, like a leech), "Mudghah" (something chewed)—are astonishingly accurate and correspond to modern scientific findings. Especially the sequence—first the formation of bones, then covering them with muscle and flesh—was only confirmed by modern embryology.'
      },
      {
        title: 'The Function of Mountains',
        verse: 'Have We not made the earth a resting place? And the mountains as stakes? (Surah 78:6-7)',
        explanation: 'The Quran describes mountains as "stakes" (awtadan), which suggests a deep anchoring in the earth. Modern geology has confirmed the principle of isostasy, according to which mountains have deep "roots" that extend into the Earth\'s mantle and stabilize the Earth\'s crust, much like tent stakes stabilize a tent.'
      },
      {
        title: 'The Barrier Between Two Seas',
        verse: 'He released the two seas, meeting [side by side]. Between them is a barrier which they do not transgress. (Surah 55:19-20)',
        explanation: 'This phenomenon, known as a halocline, has been observed by modern oceanographers in places like the Strait of Gibraltar, where the saltier Mediterranean Sea meets the less salty Atlantic Ocean. Due to different densities, temperatures, and salinities, the two bodies of water do not mix immediately and form a visible dividing line or "barrier".'
      },
    ]
  }
};


export default function QuranMiraclesPage() {
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
            <Sparkle className="h-10 w-10" />
            {c.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
      </header>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {c.miracles.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl text-left">{item.title}</AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 px-4 space-y-4">
              <blockquote className="border-l-4 border-primary pl-4 italic">
                {item.verse}
              </blockquote>
              <p>{item.explanation}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
