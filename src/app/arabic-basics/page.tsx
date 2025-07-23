import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

export default function ArabicBasicsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Arabische Grundlagen</h1>
        <p className="text-muted-foreground mt-2 text-lg">Lerne das arabische Alphabet und die Formen der Buchstaben.</p>
      </header>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-lg">Buchstabe</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Anfang</TableHead>
                <TableHead className="text-center">Mitte</TableHead>
                <TableHead className="text-center">Ende</TableHead>
                <TableHead className="text-center">Isoliert</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alphabet.map((char) => (
                <TableRow key={char.name} className="text-center">
                  <TableCell className="text-3xl font-quranic font-bold text-primary">{char.letter}</TableCell>
                  <TableCell>{char.name}</TableCell>
                  <TableCell className="text-2xl font-quranic">{char.forms.initial}</TableCell>
                  <TableCell className="text-2xl font-quranic">{char.forms.medial}</TableCell>
                  <TableCell className="text-2xl font-quranic">{char.forms.final}</TableCell>
                  <TableCell className="text-2xl font-quranic">{char.forms.isolated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
