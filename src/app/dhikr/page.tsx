
"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';

const content = {
  de: {
    title: "Dhikr & Bittgebete",
    description: "Eine Sammlung von Gedenkformeln und Gebeten für den täglichen Gebrauch.",
    dhikrList: [
      {
        title: "Subhan'Allah",
        arabic: "سُبْحَانَ ٱللَّٰهِ",
        transliteration: "Subhan'Allah",
        meaning: "Gepriesen sei Allah.",
        benefit: "Wer dies 100 Mal am Tag sagt, dem werden 1000 gute Taten aufgeschrieben oder 1000 Sünden vergeben. (Muslim)"
      },
      {
        title: "Alhamdulillah",
        arabic: "ٱلْحَمْدُ لِلَّٰهِ",
        transliteration: "Alhamdulillah",
        meaning: "Alles Lob gebührt Allah.",
        benefit: "Füllt die Waagschale (am Tag des Jüngsten Gerichts). (Muslim)"
      },
      {
        title: "Allahu Akbar",
        arabic: "ٱللَّٰهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        meaning: "Allah ist der Größte.",
        benefit: "Das Sagen von 'Subhan'Allah', 'Alhamdulillah' und 'Allahu Akbar' ist dem Propheten (ﷺ) lieber als alles, worüber die Sonne aufgeht. (Muslim)"
      },
      {
        title: "La ilaha illallah",
        arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
        transliteration: "La ilaha illallah",
        meaning: "Es gibt keine Gottheit außer Allah.",
        benefit: "Die beste Form des Dhikr. (Tirmidhi)"
      },
      {
        title: "Astaghfirullah",
        arabic: "أَسْتَغْفِرُ ٱللَّٰهَ",
        transliteration: "Astaghfirullah",
        meaning: "Ich bitte Allah um Vergebung.",
        benefit: "Wer regelmäßig um Vergebung bittet, dem wird Allah aus jeder Bedrängnis einen Ausweg und aus jeder Sorge eine Erleichterung schaffen und ihm Versorgung aus Quellen gewähren, mit denen er nicht rechnet. (Abu Dawud)"
      },
      {
        title: "Das Gebet des Yunus (عليه السلام)",
        arabic: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ ٱلظَّالِمِينَ",
        transliteration: "La ilaha illa anta, subhanaka, inni kuntu minaz-zalimin",
        meaning: "Es gibt keine Gottheit außer Dir! Gepriesen seist Du, ich war wahrlich einer der Ungerechten.",
        benefit: "Kein Muslim bittet mit diesen Worten um etwas, ohne dass Allah sein Gebet erhört. (Tirmidhi)"
      }
    ]
  },
  en: {
    title: "Dhikr & Supplications",
    description: "A collection of remembrances and prayers for daily use.",
    dhikrList: [
      {
        title: "Subhan'Allah",
        arabic: "سُبْحَانَ ٱللَّٰهِ",
        transliteration: "Subhan'Allah",
        meaning: "Glory be to Allah.",
        benefit: "Whoever says this 100 times a day, 1000 good deeds are recorded for him, or 1000 sins are forgiven. (Muslim)"
      },
      {
        title: "Alhamdulillah",
        arabic: "ٱلْحَمْدُ لِلَّٰهِ",
        transliteration: "Alhamdulillah",
        meaning: "All praise is for Allah.",
        benefit: "Fills the scale (on the Day of Judgment). (Muslim)"
      },
      {
        title: "Allahu Akbar",
        arabic: "ٱللَّٰهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        meaning: "Allah is the Greatest.",
        benefit: "Saying 'Subhan'Allah', 'Alhamdulillah', and 'Allahu Akbar' is dearer to the Prophet (ﷺ) than everything over which the sun rises. (Muslim)"
      },
      {
        title: "La ilaha illallah",
        arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
        transliteration: "La ilaha illallah",
        meaning: "There is no deity but Allah.",
        benefit: "The best form of Dhikr. (Tirmidhi)"
      },
      {
        title: "Astaghfirullah",
        arabic: "أَسْتَغْفِرُ ٱللَّٰهَ",
        transliteration: "Astaghfirullah",
        meaning: "I seek forgiveness from Allah.",
        benefit: "Whoever regularly seeks forgiveness, Allah will grant him a way out of every distress and a relief from every anxiety, and will provide for him from sources he does not expect. (Abu Dawud)"
      },
      {
        title: "The Prayer of Yunus (peace be upon him)",
        arabic: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ ٱلظَّالِمِينَ",
        transliteration: "La ilaha illa anta, subhanaka, inni kuntu minaz-zalimin",
        meaning: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        benefit: "No Muslim supplicates with these words for anything, but that Allah will answer his prayer. (Tirmidhi)"
      }
    ]
  }
}

const DhikrCard = ({ title, arabic, transliteration, meaning, benefit }: { title: string, arabic: string, transliteration: string, meaning: string, benefit: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-2xl font-quranic text-right mt-2 text-primary">{arabic}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">{transliteration}</p>
        <p className="text-muted-foreground">"{meaning}"</p>
        <p className="text-sm mt-4 pt-4 border-t border-border/50 text-foreground/80">
          <span className="font-semibold">Benefit:</span> {benefit}
        </p>
      </CardContent>
    </Card>
  )
}

export default function DhikrPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {c.dhikrList.map((dhikr, index) => (
          <DhikrCard 
            key={index}
            title={dhikr.title}
            arabic={dhikr.arabic}
            transliteration={dhikr.transliteration}
            meaning={dhikr.meaning}
            benefit={dhikr.benefit}
          />
        ))}
      </div>
    </div>
  );
}
