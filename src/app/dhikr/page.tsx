
"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const content = {
  de: {
    title: "Dhikr & Bittgebete",
    description: "Eine Sammlung von Gedenkformeln und Gebeten für den täglichen Gebrauch.",
    backToFeatures: "Zurück zu den Funktionen",
    dhikrList: [
      {
        title: "SubhanAllah",
        arabic: "سُبْحَانَ ٱللَّٰهِ",
        transliteration: "SubhanAllah",
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
        benefit: "Das Sagen von 'SubhanAllah', 'Alhamdulillah' und 'Allahu Akbar' ist dem Propheten (ﷺ) lieber als alles, worüber die Sonne aufgeht. (Muslim)"
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
      },
      {
        title: "Salawat für den Propheten (ﷺ)",
        arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
        transliteration: "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammad",
        meaning: "O Allah, sende Deine Gnade, Ehre und Barmherzigkeit auf Muhammad und die Familie von Muhammad.",
        benefit: "Der Prophet (ﷺ) sagte: 'Wer einmal Segenswünsche über mich ausspricht, über den wird Allah zehnmal Segenswünsche aussprechen, ihm zehn Sünden vergeben und ihn um zehn Stufen erhöhen.' (an-Nasa'i)"
      },
      {
        title: "Hawqala (Kanz aus dem Paradies)",
        arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ",
        transliteration: "La hawla wa la quwwata illa billah",
        meaning: "Es gibt keine Macht noch Kraft außer bei Allah.",
        benefit: "Dies ist einer der Schätze des Paradieses. (Bukhari, Muslim)"
      },
       {
        title: "Sayyid al-Istighfar",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li, fa'innahu la yaghfirudh-dhunuba illa anta.",
        meaning: "O Allah, You are my Lord, there is no deity but You. You created me and I am Your servant. I abide by Your covenant and promise as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin. So forgive me, for none forgives sins except You.",
        benefit: "Whoever says it during the day with firm faith in it, and dies on the same day before the evening, he will be from the people of Paradise; and if somebody says it at night with firm faith in it, and dies before the morning, he will be from the people of Paradise. (Bukhari)"
      },
       {
        title: "Schutz vor dem Übel der Schöpfung",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq.",
        meaning: "Ich suche Zuflucht bei den vollkommenen Worten Allahs vor dem Übel dessen, was Er erschaffen hat.",
        benefit: "Wer dies dreimal am Abend sagt, dem wird in dieser Nacht kein Unheil widerfahren. (Tirmidhi)"
      },
      {
        title: "Gebet für das Wohl im Dies- und Jenseits",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil 'akhirati hasanatan waqina 'adhaban-nar",
        meaning: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
        benefit: "Anas (RA) reported that the most frequent supplication of the Prophet (ﷺ) was this. (Bukhari, Muslim)"
      },
      {
        title: "Gebet für Rechtleitung und Genügsamkeit",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        transliteration: "Allahumma inni as'alukal-huda, wat-tuqa, wal-'afafa, wal-ghina",
        meaning: "O Allah, I ask You for guidance, piety, abstinence (from the unlawful) and contentment.",
        benefit: "A comprehensive prayer that the Prophet (ﷺ) used to make. (Muslim)"
      },
      {
        title: "Gebet um nützliches Wissen",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        transliteration: "Rabbi zidni 'ilma",
        meaning: "My Lord, increase me in knowledge.",
        benefit: "A Quranic prayer (20:114) that highlights the importance of seeking knowledge."
      }
    ]
  }
}

const DhikrCard = ({ title, arabic, transliteration, meaning, benefit }: { title: string, arabic: string, transliteration: string, meaning: string, benefit: string }) => {
  return (
    <Card className="card-animated">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-2xl font-quranic text-right mt-2 text-primary">{arabic}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">{transliteration}</p>
        <p className="text-muted-foreground">&quot;{meaning}&quot;</p>
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
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {c.backToFeatures}
        </Link>
      </Button>
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
