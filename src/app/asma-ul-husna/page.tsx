
"use client"

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Loader, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';
import { textToSpeech } from "@/ai/flows/text-to-speech";

const names = [
  { arabic: 'الرحمن', transliteration: 'Ar-Rahman', german: 'Der Allerbarmer', english: 'The All-Merciful' },
  { arabic: 'الرحيم', transliteration: 'Ar-Rahim', german: 'Der Barmherzige', english: 'The Especially Merciful' },
  { arabic: 'الملك', transliteration: 'Al-Malik', german: 'Der König', english: 'The King' },
  { arabic: 'القدوس', transliteration: 'Al-Quddus', german: 'Der Heilige', english: 'The Holy' },
  { arabic: 'السلام', transliteration: 'As-Salam', german: 'Der Frieden', english: 'The Peace' },
  { arabic: 'المؤمن', transliteration: 'Al-Mu\'min', german: 'Der Verleiher der Sicherheit', english: 'The Giver of Faith' },
  { arabic: 'المهيمن', transliteration: 'Al-Muhaymin', german: 'Der Wächter', english: 'The Guardian' },
  { arabic: 'العزيز', transliteration: 'Al-Aziz', german: 'Der Mächtige', english: 'The Almighty' },
  { arabic: 'الجبار', transliteration: 'Al-Jabbar', german: 'Der Unterwerfer', english: 'The Compeller' },
  { arabic: 'المتكبر', transliteration: 'Al-Mutakabbir', german: 'Der Stolze', english: 'The Supreme' },
  { arabic: 'الخالق', transliteration: 'Al-Khaliq', german: 'Der Schöpfer', english: 'The Creator' },
  { arabic: 'البارئ', transliteration: 'Al-Bari', german: 'Der Gestalter', english: 'The Maker of Order' },
  { arabic: 'المصور', transliteration: 'Al-Musawwir', german: 'Der Former', english: 'The Shaper of Beauty' },
  { arabic: 'الغفار', transliteration: 'Al-Ghaffar', german: 'Der Vergebende', english: 'The Forgiving' },
  { arabic: 'القهار', transliteration: 'Al-Qahhar', german: 'Der Alles-Besieger', english: 'The Subduer' },
  { arabic: 'الوهاب', transliteration: 'Al-Wahhab', german: 'Der Geber', english: 'The Giver of All' },
  { arabic: 'الرزاق', transliteration: 'Ar-Razzaq', german: 'Der Versorger', english: 'The Sustainer' },
  { arabic: 'الفتاح', transliteration: 'Al-Fattah', german: 'Der Öffner', english: 'The Opener' },
  { arabic: 'العليم', transliteration: 'Al-Alim', german: 'Der Allwissende', english: 'The Knower of All' },
  { arabic: 'القابض', transliteration: 'Al-Qabid', german: 'Der die Gaben zurückhält', english: 'The Constrictor' },
  { arabic: 'الباسط', transliteration: 'Al-Basit', german: 'Der die Gaben großzügig gibt', english: 'The Reliever' },
  { arabic: 'الخافض', transliteration: 'Al-Khafid', german: 'Der Erniedriger', english: 'The Abaser' },
  { arabic: 'الرافع', transliteration: 'Ar-Rafi', german: 'Der Erhöher', english: 'The Exalter' },
  { arabic: 'المعز', transliteration: 'Al-Mu\'izz', german: 'Der Ehre-Gebende', english: 'The Bestower of Honors' },
  { arabic: 'المذل', transliteration: 'Al-Mudhill', german: 'Der Demütiger', english: 'The Humiliator' },
  { arabic: 'السميع', transliteration: 'As-Sami', german: 'Der Allhörende', english: 'The Hearer of All' },
  { arabic: 'البصير', transliteration: 'Al-Basir', german: 'Der Allsehende', english: 'The Seer of All' },
  { arabic: 'الحكم', transliteration: 'Al-Hakam', german: 'Der Richter', english: 'The Judge' },
  { arabic: 'العدل', transliteration: 'Al-Adl', german: 'Der Gerechte', english: 'The Just' },
  { arabic: 'اللطيف', transliteration: 'Al-Latif', german: 'Der Feinfühlige', english: 'The Subtle One' },
  { arabic: 'الخبير', transliteration: 'Al-Khabir', german: 'Der Allkundige', english: 'The All-Aware' },
  { arabic: 'الحليم', transliteration: 'Al-Halim', german: 'Der Nachsichtige', english: 'The Forbearing' },
  { arabic: 'العظيم', transliteration: 'Al-Azim', german: 'Der Großartige', english: 'The Magnificent' },
  { arabic: 'الغفور', transliteration: 'Al-Ghafur', german: 'Der Allverzeihende', english: 'The Forgiver and Hider of Faults' },
  { arabic: 'الشكور', transliteration: 'Ash-Shakur', german: 'Der Dankbare', english: 'The Rewarder of Thankfulness' },
  { arabic: 'العلي', transliteration: 'Al-Ali', german: 'Der Höchste', english: 'The Highest' },
  { arabic: 'الكبير', transliteration: 'Al-Kabir', german: 'Der Große', english: 'The Greatest' },
  { arabic: 'الحفيظ', transliteration: 'Al-Hafiz', german: 'Der Bewahrer', english: 'The Preserver' },
  { arabic: 'المقيت', transliteration: 'Al-Muqit', german: 'Der Ernährer', english: 'The Nourisher' },
  { arabic: 'الحسيب', transliteration: 'Al-Hasib', german: 'Der Abrechner', english: 'The Accounter' },
  { arabic: 'الجليل', transliteration: 'Al-Jalil', german: 'Der Erhabene', english: 'The Mighty' },
  { arabic: 'الكريم', transliteration: 'Al-Karim', german: 'Der Großzügige', english: 'The Generous' },
  { arabic: 'الرقيب', transliteration: 'Ar-Raqib', german: 'Der Wachsame', english: 'The Watchful One' },
  { arabic: 'المجيب', transliteration: 'Al-Mujib', german: 'Der Erhörer der Gebete', english: 'The Responder to Prayer' },
  { arabic: 'الواسع', transliteration: 'Al-Wasi', german: 'Der Allumfassende', english: 'The All-Comprehending' },
  { arabic: 'الحكيم', transliteration: 'Al-Hakim', german: 'Der Weise', english: 'The Perfectly Wise' },
  { arabic: 'الودود', transliteration: 'Al-Wadud', german: 'Der Liebevolle', english: 'The Loving One' },
  { arabic: 'المجيد', transliteration: 'Al-Majid', german: 'Der Ruhmreiche', english: 'The Majestic One' },
  { arabic: 'الباعث', transliteration: 'Al-Ba\'ith', german: 'Der Erwecker der Toten', english: 'The Resurrector' },
  { arabic: 'الشهيد', transliteration: 'Ash-Shahid', german: 'Der Zeuge', english: 'The Witness' },
  { arabic: 'الحق', transliteration: 'Al-Haqq', german: 'Die Wahrheit', english: 'The Truth' },
  { arabic: 'الوكيل', transliteration: 'Al-Wakil', german: 'Der Vertrauenswürdige', english: 'The Trustee' },
  { arabic: 'القوي', transliteration: 'Al-Qawiyy', german: 'Der Starke', english: 'The Possessor of All Strength' },
  { arabic: 'المتين', transliteration: 'Al-Matin', german: 'Der Feste', english: 'The Forceful One' },
  { arabic: 'الولي', transliteration: 'Al-Waliyy', german: 'Der Schutzherr', english: 'The Governor' },
  { arabic: 'الحميد', transliteration: 'Al-Hamid', german: 'Der Preiswürdige', english: 'The Praised One' },
  { arabic: 'المحصي', transliteration: 'Al-Muhsi', german: 'Der alles Aufzeichnende', english: 'The Appraiser' },
  { arabic: 'المبدئ', transliteration: 'Al-Mubdi', german: 'Der Urheber', english: 'The Originator' },
  { arabic: 'المعيد', transliteration: 'Al-Mu\'id', german: 'Der Wiederhersteller', english: 'The Restorer' },
  { arabic: 'المحيي', transliteration: 'Al-Muhyi', german: 'Der Lebensspender', english: 'The Giver of Life' },
  { arabic: 'المميت', transliteration: 'Al-Mumit', german: 'Der Todbringende', english: 'The Taker of Life' },
  { arabic: 'الحي', transliteration: 'Al-Hayy', german: 'Der Lebendige', english: 'The Ever Living One' },
  { arabic: 'القيوم', transliteration: 'Al-Qayyum', german: 'Der Beständige', english: 'The Self-Existing One' },
  { arabic: 'الواجد', transliteration: 'Al-Wajid', german: 'Der Finder', english: 'The Finder' },
  { arabic: 'الماجد', transliteration: 'Al-Majid', german: 'Der Glorreiche', english: 'The Glorious' },
  { arabic: 'الواحد', transliteration: 'Al-Wahid', german: 'Der Eine', english: 'The One, the All Inclusive, the Indivisible' },
  { arabic: 'الصمد', transliteration: 'As-Samad', german: 'Der Unabhängige', english: 'The Satisfier of All Needs' },
  { arabic: 'القادر', transliteration: 'Al-Qadir', german: 'Der Fähige', english: 'The All-Powerful' },
  { arabic: 'المقتدر', transliteration: 'Al-Muqtadir', german: 'Der Allmächtige', english: 'The Creator of All Power' },
  { arabic: 'المقدم', transliteration: 'Al-Muqaddim', german: 'Der Voranstellende', english: 'The Expediter' },
  { arabic: 'المؤخر', transliteration: 'Al-Mu\'akhkhir', german: 'Der Aufschiebende', english: 'The Delayer' },
  { arabic: 'الأول', transliteration: 'Al-Awwal', german: 'Der Erste', english: 'The First' },
  { arabic: 'الآخر', transliteration: 'Al-Akhir', german: 'Der Letzte', english: 'The Last' },
  { arabic: 'الظاهر', transliteration: 'Az-Zahir', german: 'Der Offenbare', english: 'The Manifest One' },
  { arabic: 'الباطن', transliteration: 'Al-Batin', german: 'Der Verborgene', english: 'The Hidden One' },
  { arabic: 'الوالي', transliteration: 'Al-Wali', german: 'Der Herrscher', english: 'The Protecting Friend' },
  { arabic: 'المتعالي', transliteration: 'Al-Muta\'ali', german: 'Der Sich-Erhöhende', english: 'The Supreme One' },
  { arabic: 'البر', transliteration: 'Al-Barr', german: 'Der Gütige', english: 'The Doer of Good' },
  { arabic: 'التواب', transliteration: 'At-Tawwab', german: 'Der die Reue annimmt', english: 'The Guide to Repentance' },
  { arabic: 'المنتقم', transliteration: 'Al-Muntaqim', german: 'Der Vergelter', english: 'The Avenger' },
  { arabic: 'العفو', transliteration: 'Al-Afuww', german: 'Der Verzeihende', english: 'The Forgiver' },
  { arabic: 'الرءوف', transliteration: 'Ar-Ra\'uf', german: 'Der Mitleidsvolle', english: 'The Clement' },
  { arabic: 'مالك الملك', transliteration: 'Malik-ul-Mulk', german: 'Der Besitzer der Herrschaft', english: 'The Owner of All' },
  { arabic: 'ذو الجلال والإكرام', transliteration: 'Dhul-Jalali wal-Ikram', german: 'Der Herr der Majestät und Ehre', english: 'The Lord of Majesty and Generosity' },
  { arabic: 'المقسط', transliteration: 'Al-Muqsit', german: 'Der Gerechtigkeit-Übende', english: 'The Equitable One' },
  { arabic: 'الجامع', transliteration: 'Al-Jami', german: 'Der Sammler', english: 'The Gatherer' },
  { arabic: 'الغني', transliteration: 'Al-Ghani', german: 'Der Reiche', english: 'The Rich One' },
  { arabic: 'المغني', transliteration: 'Al-Mughni', german: 'Der Reich-Machende', english: 'The Enricher' },
  { arabic: 'المانع', transliteration: 'Al-Mani', german: 'Der Verhinderer', english: 'The Preventer of Harm' },
  { arabic: 'الضار', transliteration: 'Ad-Darr', german: 'Der Schädiger', english: 'The Creator of The Harmful' },
  { arabic: 'النافع', transliteration: 'An-Nafi', german: 'Der Nützende', english: 'The Creator of Good' },
  { arabic: 'النور', transliteration: 'An-Nur', german: 'Das Licht', english: 'The Light' },
  { arabic: 'الهادي', transliteration: 'Al-Hadi', german: 'Der Führer', english: 'The Guide' },
  { arabic: 'البديع', transliteration: 'Al-Badi', german: 'Der Schöpfer aus dem Nichts', english: 'The Incomparable' },
  { arabic: 'الباقي', transliteration: 'Al-Baqi', german: 'Der Ewige', english: 'The Everlasting One' },
  { arabic: 'الوارث', transliteration: 'Al-Warith', german: 'Der Erbe', english: 'The Inheritor of All' },
  { arabic: 'الرشيد', transliteration: 'Ar-Rashid', german: 'Der den rechten Weg weist', english: 'The Righteous Teacher' },
  { arabic: 'الصبور', transliteration: 'As-Sabur', german: 'Der Geduldige', english: 'The Patient One' },
];

const content = {
    de: {
        title: "Asma-Ul Husna",
        description: "Die 99 schönsten Namen Allahs.",
        meaningKey: "german",
        play: "Abspielen",
        memorize: "Lernen"
    },
    en: {
        title: "Asma-Ul Husna",
        description: "The 99 most beautiful names of Allah.",
        meaningKey: "english",
        play: "Play",
        memorize: "Memorize"
    }
}


export default function AsmaUlHusnaPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleVisibility = (id: string) => {
    setHidden(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlayAudio = async (textToPlay: string, id: string) => {
    if (playingAudio === id) {
        audioRef.current?.pause();
        setPlayingAudio(null);
        return;
    }
    setLoadingAudio(id);
    setAudioUrl(null);
    setPlayingAudio(null);

    try {
      const result = await textToSpeech(textToPlay);
      setAudioUrl(result.audio);
      setPlayingAudio(id);
    } catch (err) {
      console.error("Failed to get audio", err);
    } finally {
      setLoadingAudio(null);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [audioUrl]);

  return (
    <div className="container mx-auto px-4 py-8">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setPlayingAudio(null)}
        />
      )}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{c.description}</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {names.map((name, index) => {
            const id = name.transliteration;
            const isHidden = hidden[id];
            const isPlaying = playingAudio === id;
            const isLoading = loadingAudio === id;
            const meaning = name[c.meaningKey as keyof typeof name];

            return (
              <Card key={index} className="flex flex-col justify-between p-4 text-center">
                <div>
                  <CardTitle className="text-3xl font-quranic text-primary">{name.arabic}</CardTitle>
                  <div className={cn("transition-opacity", isHidden ? 'opacity-0' : 'opacity-100')}>
                    <CardDescription className="mt-2 text-lg font-semibold">{name.transliteration}</CardDescription>
                    <CardContent className="p-0 mt-1">
                      <p className="text-muted-foreground">{meaning}</p>
                    </CardContent>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-4 pt-4 border-t">
                    <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(name.transliteration, id)} disabled={isLoading}>
                      {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : (isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />)}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => toggleVisibility(id)}>
                      {isHidden ? <EyeOff /> : <Eye />}
                    </Button>
                </div>
              </Card>
            )
        })}
      </div>
    </div>
  );
}
