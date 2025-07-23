
"use client"

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';

const alphabet = [
  { letter: 'ا', name: 'Alif', forms: { isolated: 'ا', final: 'ـا', medial: 'ـا', initial: 'ا' } },
  { letter: 'ب', name: 'Ba', forms: { isolated: 'ب', final: 'ـب', medial: 'ـبـ', initial: 'بـ' } },
  { letter: 'ت', name: 'Ta', forms: { isolated: 'ت', final: 'ـت', medial: 'ـتـ', initial: 'تـ' } },
  { letter: 'ث', name: 'Tha', forms: { isolated: 'ث', final: 'ـث', medial: 'ـثـ', initial: 'ثـ' } },
  { letter: 'ج', name: 'Jim', forms: { isolated: 'ج', final: 'ـج', medial: 'ـجـ', initial: 'جـ' } },
  { letter: 'ح', name: 'Ha', forms: { isolated: 'ح', final: 'ـح', medial: 'ـحـ', initial: 'حـ' } },
  { letter: 'خ', name: 'Kha', forms: { isolated: 'خ', final: 'ـخ', medial: 'ـخـ', initial: 'خـ' } },
  { letter: 'د', name: 'Dal', forms: { isolated: 'د', final: 'ـد', medial: 'ـد', initial: 'د' } },
  { letter: 'ذ', name: 'Dhal', forms: { isolated: 'ذ', final: 'ـذ', medial: 'ـذ', initial: 'ذ' } },
  { letter: 'ر', name: 'Ra', forms: { isolated: 'ر', final: 'ـر', medial: 'ـر', initial: 'ر' } },
  { letter: 'ز', name: 'Zain', forms: { isolated: 'ز', final: 'ـز', medial: 'ـز', initial: 'ز' } },
  { letter: 'س', name: 'Sin', forms: { isolated: 'س', final: 'ـس', medial: 'ـسـ', initial: 'سـ' } },
  { letter: 'ش', name: 'Shin', forms: { isolated: 'ش', final: 'ـش', medial: 'ـشـ', initial: 'شـ' } },
  { letter: 'ص', name: 'Sad', forms: { isolated: 'ص', final: 'ـص', medial: 'ـصـ', initial: 'صـ' } },
  { letter: 'ض', name: 'Dad', forms: { isolated: 'ض', final: 'ـض', medial: 'ـضـ', initial: 'ضـ' } },
  { letter: 'ط', name: 'Ta', forms: { isolated: 'ط', final: 'ـط', medial: 'ـطـ', initial: 'طـ' } },
  { letter: 'ظ', name: 'Dha', forms: { isolated: 'ظ', final: 'ـظ', medial: 'ـظـ', initial: 'ظـ' } },
  { letter: 'ع', name: 'Ain', forms: { isolated: 'ع', final: 'ـع', medial: 'ـعـ', initial: 'عـ' } },
  { letter: 'غ', name: 'Ghain', forms: { isolated: 'غ', final: 'ـغ', medial: 'ـغـ', initial: 'غـ' } },
  { letter: 'ف', name: 'Fa', forms: { isolated: 'ف', final: 'ـف', medial: 'ـفـ', initial: 'فـ' } },
  { letter: 'ق', name: 'Qaf', forms: { isolated: 'ق', final: 'ـق', medial: 'ـقـ', initial: 'قـ' } },
  { letter: 'ك', name: 'Kaf', forms: { isolated: 'ك', final: 'ـك', medial: 'ـكـ', initial: 'كـ' } },
  { letter: 'ل', name: 'Lam', forms: { isolated: 'ل', final: 'ـل', medial: 'ـلـ', initial: 'لـ' } },
  { letter: 'م', name: 'Mim', forms: { isolated: 'م', final: 'ـم', medial: 'ـمـ', initial: 'مـ' } },
  { letter: 'ن', name: 'Nun', forms: { isolated: 'ن', final: 'ـن', medial: 'ـنـ', initial: 'نـ' } },
  { letter: 'ه', name: 'Ha', forms: { isolated: 'ه', final: 'ـه', medial: 'ـهـ', initial: 'هـ' } },
  { letter: 'و', name: 'Waw', forms: { isolated: 'و', final: 'ـو', medial: 'ـو', initial: 'و' } },
  { letter: 'ي', name: 'Ya', forms: { isolated: 'ي', final: 'ـي', medial: 'ـيـ', initial: 'يـ' } },
];

const content = {
    de: {
        title: "Arabische Grundlagen",
        description: "Lerne das arabische Alphabet und die Formen der Buchstaben.",
        letter: "Buchstabe",
        name: "Name",
        initial: "Anfang",
        medial: "Mitte",
        final: "Ende",
        isolated: "Isoliert",
        memorize: "Auswendiglernen"
    },
    en: {
        title: "Arabic Basics",
        description: "Learn the Arabic alphabet and the forms of the letters.",
        letter: "Letter",
        name: "Name",
        initial: "Initial",
        medial: "Medial",
        final: "Final",
        isolated: "Isolated",
        memorize: "Memorize"
    }
}

export default function ArabicBasicsPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const [hiddenRows, setHiddenRows] = useState<Record<string, boolean>>({});

  const toggleRowVisibility = (letterName: string) => {
    setHiddenRows(prev => ({ ...prev, [letterName]: !prev[letterName] }));
  };
    
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{c.description}</p>
      </header>

      <Card>
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
                <TableHead className="text-center">{c.memorize}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alphabet.map((char) => {
                const isHidden = hiddenRows[char.name];
                return (
                    <TableRow key={char.name} className="text-center">
                    <TableCell className="text-3xl font-quranic font-bold text-primary">{char.letter}</TableCell>
                    <TableCell className={cn(isHidden && 'opacity-0')}>{char.name}</TableCell>
                    <TableCell className={cn("text-2xl font-quranic", isHidden && 'opacity-0')}>{char.forms.initial}</TableCell>
                    <TableCell className={cn("text-2xl font-quranic", isHidden && 'opacity-0')}>{char.forms.medial}</TableCell>
                    <TableCell className={cn("text-2xl font-quranic", isHidden && 'opacity-0')}>{char.forms.final}</TableCell>
                    <TableCell className={cn("text-2xl font-quranic", isHidden && 'opacity-0')}>{char.forms.isolated}</TableCell>
                    <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => toggleRowVisibility(char.name)}>
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
    </div>
  );
}
