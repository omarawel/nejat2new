
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/language-provider';
import { Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
  de: {
    title: 'Die Gefährten des Propheten (Sahaba)',
    description: 'Einblicke in das Leben und Vermächtnis der rechtschaffenen Männer und Frauen um den Propheten Muhammad (ﷺ).',
    backToFeatures: "Zurück zu den Funktionen",
    sahaba: [
      {
        name: 'Abu Bakr As-Siddiq (رضي الله عنه)',
        title: 'Der Wahrhaftige & Erster Kalif',
        story: 'Der engste Freund des Propheten (ﷺ) und der erste Mann, der den Islam annahm. Er war bekannt für seine unerschütterliche Loyalität und seinen festen Glauben. Als der Prophet (ﷺ) von seiner Nachtreise (Isra) erzählte, glaubte Abu Bakr ihm ohne zu zögern und erhielt den Titel "As-Siddiq" (der Wahrhaftige). Er begleitete den Propheten auf der Hidschra (Auswanderung) nach Medina und wurde nach dessen Tod zum ersten Kalifen der Muslime gewählt.'
      },
      {
        name: 'Umar ibn al-Khattab (رضي الله عنه)',
        title: 'Al-Faruq & Zweiter Kalif',
        story: 'Umar war anfangs ein erbitterter Gegner des Islam, doch nach dem Hören des Korans wurde sein Herz erweicht und er nahm den Glauben an. Seine Konversion stärkte die Muslime enorm. Er erhielt den Titel "Al-Faruq" (der Unterscheider), weil er klar zwischen Recht und Unrecht unterschied. Als zweiter Kalif erweiterte er das islamische Reich und etablierte viele administrative Institutionen. Er war bekannt für seine Gerechtigkeit, Strenge und Demut.'
      },
      {
        name: 'Uthman ibn Affan (رضي الله عنه)',
        title: 'Dhun-Nurain & Dritter Kalif',
        story: 'Uthman war bekannt für seine Großzügigkeit, Bescheidenheit und Frömmigkeit. Er heiratete zwei Töchter des Propheten (ﷺ) zu verschiedenen Zeiten, weshalb er den Titel "Dhun-Nurain" (Besitzer der zwei Lichter) erhielt. Als dritter Kalif war seine größte Leistung die Standardisierung und Zusammenstellung des Heiligen Korans in einem einzigen Mushaf (Buch), um Abweichungen zu verhindern und seine Authentizität für alle zukünftigen Generationen zu sichern.'
      },
      {
        name: 'Ali ibn Abi Talib (رضي الله عنه)',
        title: 'Tor der Erkenntnis & Vierter Kalif',
        story: 'Ali war der Cousin und Schwiegersohn des Propheten (ﷺ) und wuchs in dessen Haushalt auf. Er war einer der ersten, die den Islam annahmen, und bekannt für seine Tapferkeit auf dem Schlachtfeld, seine immense Weisheit und sein tiefes Wissen über den Islam. Der Prophet (ﷺ) sagte: "Ich bin die Stadt des Wissens und Ali ist ihr Tor." Als vierter Kalif führte er die Muslime in einer Zeit großer politischer Unruhen.'
      },
      {
        name: 'Khadijah bint Khuwaylid (رضي الله عنها)',
        title: 'Die erste Gläubige',
        story: 'Khadijah war die erste Ehefrau des Propheten (ﷺ) und die erste Person überhaupt, die an seine Botschaft glaubte. Sie war eine erfolgreiche und respektierte Geschäftsfrau. Sie war die größte Stütze des Propheten (ﷺ) in den schwierigsten Anfangsjahren seiner Mission, unterstützte ihn emotional und finanziell und schenkte ihm sechs seiner Kinder. Der Prophet (ﷺ) liebte und ehrte sie sein Leben lang.'
      },
      {
        name: 'Aisha bint Abi Bakr (رضي الله عنها)',
        title: 'Mutter der Gläubigen & Gelehrte',
        story: 'Aisha war die Tochter von Abu Bakr und eine der bekanntesten Ehefrauen des Propheten (ﷺ). Sie besaß einen scharfen Verstand und ein außergewöhnliches Gedächtnis, was sie zu einer der wichtigsten Überlieferinnen von Hadithen machte. Nach dem Tod des Propheten (ﷺ) wurde sie zu einer zentralen Autorität in islamischem Recht und Theologie und lehrte viele Männer und Frauen.'
      }
    ]
  },
  en: {
    title: 'The Companions of the Prophet (Sahaba)',
    description: 'Insights into the lives and legacies of the righteous men and women around the Prophet Muhammad (ﷺ).',
    backToFeatures: "Back to Features",
    sahaba: [
      {
        name: 'Abu Bakr As-Siddiq (may Allah be pleased with him)',
        title: 'The Truthful & First Caliph',
        story: 'The closest friend of the Prophet (ﷺ) and the first man to accept Islam. He was known for his unwavering loyalty and firm faith. When the Prophet (ﷺ) spoke of his Night Journey (Isra), Abu Bakr believed him without hesitation and received the title "As-Siddiq" (the Truthful). He accompanied the Prophet on the Hijra (migration) to Medina and was elected the first Caliph of the Muslims after his death.'
      },
      {
        name: 'Umar ibn al-Khattab (may Allah be pleased with him)',
        title: 'Al-Faruq & Second Caliph',
        story: 'Umar was initially a fierce opponent of Islam, but after hearing the Quran, his heart softened and he accepted the faith. His conversion greatly strengthened the Muslims. He was given the title "Al-Faruq" (the aistinguisher) because he clearly distinguished between right and wrong. As the second Caliph, he expanded the Islamic empire and established many administrative institutions. He was known for his justice, strictness, and humility.'
      },
      {
        name: 'Uthman ibn Affan (may Allah be pleased with him)',
        title: 'Dhun-Nurain & Third Caliph',
        story: 'Uthman was known for his generosity, modesty, and piety. He married two of the Prophet\'s daughters at different times, which is why he received the title "Dhun-Nurain" (Possessor of the Two Lights). As the third Caliph, his greatest achievement was the standardization and compilation of the Holy Quran into a single Mushaf (book) to prevent variations and to preserve its authenticity for all future generations.'
      },
      {
        name: 'Ali ibn Abi Talib (may Allah be pleased with him)',
        title: 'Gate of Knowledge & Fourth Caliph',
        story: 'Ali was the cousin and son-in-law of the Prophet (ﷺ) and grew up in his household. He was one of the first to accept Islam and was known for his bravery on the battlefield, his immense wisdom, and his deep knowledge of Islam. The Prophet (ﷺ) said, "I am the city of knowledge and Ali is its gate." As the fourth Caliph, he led the Muslims in a time of great political turmoil.'
      },
      {
        name: 'Khadijah bint Khuwaylid (may Allah be pleased with her)',
        title: 'The First Believer',
        story: 'Khadijah was the first wife of the Prophet (ﷺ) and the very first person to believe in his message. She was a successful and respected businesswoman. She was the Prophet\'s greatest support during the most difficult early years of his mission, supporting him emotionally and financially, and bearing him six of his children. The Prophet (ﷺ) loved and honored her throughout his life.'
      },
      {
        name: 'Aisha bint Abi Bakr (may Allah be pleased with her)',
        title: 'Mother of the Believers & Scholar',
        story: 'Aisha was the daughter of Abu Bakr and one of the most well-known wives of the Prophet (ﷺ). She possessed a sharp mind and an exceptional memory, making her one of the most important narrators of Hadith. After the Prophet\'s death, she became a central authority in Islamic law and theology, teaching many men and women.'
      }
    ]
  }
};


export default function SahabaPage() {
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
            <Users className="h-10 w-10" />
            {c.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
      </header>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto" defaultValue="item-0">
        {c.sahaba.map((sahabi, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl text-left hover:no-underline">
                <div className="flex flex-col">
                    <span>{sahabi.name}</span>
                    <span className="text-sm text-muted-foreground font-normal">{sahabi.title}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 px-4">
              {sahabi.story}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
