
"use client"

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Play, Pause, Loader } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';
import { textToSpeech } from "@/ai/flows/text-to-speech"

const alphabet = [
  { letter: 'ا', name_de: 'Alif', name_en: 'Alif', forms: { isolated: 'ا', final: 'ـا', medial: 'ـا', initial: 'ا' } },
  { letter: 'ب', name_de: 'Ba', name_en: 'Ba', forms: { isolated: 'ب', final: 'ـب', medial: 'ـبـ', initial: 'بـ' } },
  { letter: 'ت', name_de: 'Ta', name_en: 'Ta', forms: { isolated: 'ت', final: 'ـت', medial: 'ـتـ', initial: 'تـ' } },
  { letter: 'ث', name_de: 'Tha', name_en: 'Tha', forms: { isolated: 'ث', final: 'ـث', medial: 'ـثـ', initial: 'ثـ' } },
  { letter: 'ج', name_de: 'Jim', name_en: 'Jim', forms: { isolated: 'ج', final: 'ـج', medial: 'ـجـ', initial: 'جـ' } },
  { letter: 'ح', name_de: 'Ha', name_en: 'Ha', forms: { isolated: 'ح', final: 'ـح', medial: 'ـحـ', initial: 'حـ' } },
  { letter: 'خ', name_de: 'Kha', name_en: 'Kha', forms: { isolated: 'خ', final: 'ـخ', medial: 'ـخـ', initial: 'خـ' } },
  { letter: 'د', name_de: 'Dal', name_en: 'Dal', forms: { isolated: 'د', final: 'ـد', medial: 'ـد', initial: 'د' } },
  { letter: 'ذ', name_de: 'Dhal', name_en: 'Dhal', forms: { isolated: 'ذ', final: 'ـذ', medial: 'ـذ', initial: 'ذ' } },
  { letter: 'ر', name_de: 'Ra', name_en: 'Ra', forms: { isolated: 'ر', final: 'ـر', medial: 'ـر', initial: 'ر' } },
  { letter: 'ز', name_de: 'Zain', name_en: 'Zain', forms: { isolated: 'ز', final: 'ـز', medial: 'ـز', initial: 'ز' } },
  { letter: 'س', name_de: 'Sin', name_en: 'Sin', forms: { isolated: 'س', final: 'ـس', medial: 'ـسـ', initial: 'سـ' } },
  { letter: 'ش', name_de: 'Shin', name_en: 'Shin', forms: { isolated: 'ش', final: 'ـش', medial: 'ـشـ', initial: 'شـ' } },
  { letter: 'ص', name_de: 'Sad', name_en: 'Sad', forms: { isolated: 'ص', final: 'ـص', medial: 'ـصـ', initial: 'صـ' } },
  { letter: 'ض', name_de: 'Dad', name_en: 'Dad', forms: { isolated: 'ض', final: 'ـض', medial: 'ـضـ', initial: 'ضـ' } },
  { letter: 'ط', name_de: 'Taa', name_en: 'Taa', forms: { isolated: 'ط', final: 'ـط', medial: 'ـطـ', initial: 'طـ' } },
  { letter: 'ظ', name_de: 'Dha', name_en: 'Dha', forms: { isolated: 'ظ', final: 'ـظ', medial: 'ـظـ', initial: 'ظـ' } },
  { letter: 'ع', name_de: 'Ain', name_en: 'Ain', forms: { isolated: 'ع', final: 'ـع', medial: 'ـعـ', initial: 'عـ' } },
  { letter: 'غ', name_de: 'Ghain', name_en: 'Ghain', forms: { isolated: 'غ', final: 'ـغ', medial: 'ـغـ', initial: 'غـ' } },
  { letter: 'ف', name_de: 'Fa', name_en: 'Fa', forms: { isolated: 'ف', final: 'ـف', medial: 'ـفـ', initial: 'فـ' } },
  { letter: 'ق', name_de: 'Qaf', name_en: 'Qaf', forms: { isolated: 'ق', final: 'ـق', medial: 'ـقـ', initial: 'قـ' } },
  { letter: 'ك', name_de: 'Kaf', name_en: 'Kaf', forms: { isolated: 'ك', final: 'ـك', medial: 'ـكـ', initial: 'كـ' } },
  { letter: 'ل', name_de: 'Lam', name_en: 'Lam', forms: { isolated: 'ل', final: 'ـل', medial: 'ـلـ', initial: 'لـ' } },
  { letter: 'م', name_de: 'Mim', name_en: 'Mim', forms: { isolated: 'م', final: 'ـم', medial: 'ـمـ', initial: 'مـ' } },
  { letter: 'ن', name_de: 'Nun', name_en: 'Nun', forms: { isolated: 'ن', final: 'ـن', medial: 'ـنـ', initial: 'نـ' } },
  { letter: 'ه', name_de: 'Ha (Kreis)', name_en: 'Ha (Circle)', forms: { isolated: 'ه', final: 'ـه', medial: 'ـهـ', initial: 'هـ' } },
  { letter: 'و', name_de: 'Waw', name_en: 'Waw', forms: { isolated: 'و', final: 'ـو', medial: 'ـو', initial: 'و' } },
  { letter: 'ي', name_de: 'Ya', name_en: 'Ya', forms: { isolated: 'ي', final: 'ـي', medial: 'ـيـ', initial: 'يـ' } },
];

const otherSymbols = [
    { section: 'short_vowels', title_de: 'Kurzvokale (Harakat)', title_en: 'Short Vowels (Harakat)', items: [
        { symbol: 'ـَ', name: 'Fatha', sound_de: 'kurzer "a" Laut', sound_en: 'short "a" sound' },
        { symbol: 'ـِ', name: 'Kasra', sound_de: 'kurzer "i" Laut', sound_en: 'short "i" sound' },
        { symbol: 'ـُ', name: 'Damma', sound_de: 'kurzer "u" Laut', sound_en: 'short "u" sound' },
    ]},
    { section: 'tanwin', title_de: 'Nunation (Tanwin)', title_en: 'Nunation (Tanwin)', items: [
        { symbol: 'ـً', name: 'Fathatan', sound_de: '"an" Laut', sound_en: '"an" sound' },
        { symbol: 'ـٍ', name: 'Kasratan', sound_de: '"in" Laut', sound_en: '"in" sound' },
        { symbol: 'ـٌ', name: 'Dammatan', sound_de: '"un" Laut', sound_en: '"un" sound' },
    ]},
    { section: 'long_vowels', title_de: 'Langvokale (Madd)', title_en: 'Long Vowels (Madd)', items: [
        { symbol: 'ـَا', name: 'Fatha + Alif', sound_de: 'langer "a" Laut', sound_en: 'long "a" sound' },
        { symbol: 'ـِي', name: 'Kasra + Ya', sound_de: 'langer "i" Laut', sound_en: 'long "i" sound' },
        { symbol: 'ـُو', name: 'Damma + Waw', sound_de: 'langer "u" Laut', sound_en: 'long "u" sound' },
    ]},
    { section: 'other_marks', title_de: 'Andere Zeichen', title_en: 'Other Marks', items: [
        { symbol: 'ـْ', name: 'Sukun', sound_de: 'kein Vokal', sound_en: 'no vowel' },
        { symbol: 'ـّ', name: 'Shadda', sound_de: 'verdoppelt den Konsonanten', sound_en: 'doubles the consonant' },
    ]},
]

const content = {
    de: {
        title: "Arabische Grundlagen",
        description: "Lerne das arabische Alphabet, Vokale und weitere wichtige Zeichen.",
        alphabet: "Das Alphabet",
        letter: "Buchstabe",
        name: "Name",
        initial: "Anfang",
        medial: "Mitte",
        final: "Ende",
        isolated: "Isoliert",
        memorize: "Lernen",
        symbol: "Symbol",
        sound: "Laut",
        play: "Abspielen"
    },
    en: {
        title: "Arabic Basics",
        description: "Learn the Arabic alphabet, vowels, and other important marks.",
        alphabet: "The Alphabet",
        letter: "Letter",
        name: "Name",
        initial: "Initial",
        medial: "Medial",
        final: "Final",
        isolated: "Isolated",
        memorize: "Memorize",
        symbol: "Symbol",
        sound: "Sound",
        play: "Play"
    }
}

export default function ArabicBasicsPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const [hiddenRows, setHiddenRows] = useState<Record<string, boolean>>({});

  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleRowVisibility = (id: string) => {
    setHiddenRows(prev => ({ ...prev, [id]: !prev[id] }));
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
      
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>{c.alphabet}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-lg">{c.letter}</TableHead>
                <TableHead className="text-center">{c.name}</TableHead>
                <TableHead className="text-center">{c.initial}</TableHead>
                <TableHead className="text-center">{c.medial}</TableHead>
                <TableHead className="text-center">{c.final}</TableHead>
                <TableHead className="text-center">{c.isolated}</TableHead>
                <TableHead className="text-center">{c.play}</TableHead>
                <TableHead className="text-center">{c.memorize}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alphabet.map((char) => {
                const id = char.letter;
                const isHidden = hiddenRows[id];
                const isPlaying = playingAudio === id;
                const isLoading = loadingAudio === id;
                const name = language === 'de' ? char.name_de : char.name_en;
                return (
                    <TableRow key={id} className="text-center">
                    <TableCell className="text-3xl font-quranic font-bold text-primary">{char.letter}</TableCell>
                    <TableCell className={cn(isHidden && 'opacity-0')}>{name}</TableCell>
                    <TableCell className={cn("text-2xl font-quranic", isHidden && 'opacity-0')}>{char.forms.initial}</TableCell>
                    <TableCell className={cn("text-2xl font-quranic", isHidden && 'opacity-0')}>{char.forms.medial}</TableCell>
                    <TableCell className={cn("text-2xl font-quranic", isHidden && 'opacity-0')}>{char.forms.final}</TableCell>
                    <TableCell className={cn("text-2xl font-quranic", isHidden && 'opacity-0')}>{char.forms.isolated}</TableCell>
                    <TableCell>
                         <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(name, id)} disabled={isLoading}>
                            {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : (isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />)}
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => toggleRowVisibility(id)}>
                            {isHidden ? <EyeOff /> : <Eye />}
                        </Button>
                    </TableCell>
                    </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {otherSymbols.map(section => {
            const title = language === 'de' ? section.title_de : section.title_en;
            return (
                <Card key={section.section}>
                    <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{c.symbol}</TableHead>
                                    <TableHead>{c.name}</TableHead>
                                    <TableHead>{c.sound}</TableHead>
                                    <TableHead className="text-right">{c.play}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {section.items.map(item => {
                                    const id = item.name;
                                    const sound = language === 'de' ? item.sound_de : item.sound_en;
                                    const isPlaying = playingAudio === id;
                                    const isLoading = loadingAudio === id;
                                    return (
                                        <TableRow key={id}>
                                            <TableCell className="text-3xl font-quranic">{item.symbol}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{sound}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(item.name, id)} disabled={isLoading}>
                                                     {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : (isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />)}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
