
"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';

const numbers = [
  { number: '١', name: 'Wahid', value: 1 },
  { number: '٢', name: 'Ithnan', value: 2 },
  { number: '٣', name: 'Thalatha', value: 3 },
  { number: '٤', name: 'Arba\'a', value: 4 },
  { number: '٥', name: 'Khamsa', value: 5 },
  { number: '٦', name: 'Sittah', value: 6 },
  { number: '٧', name: 'Sab\'a', value: 7 },
  { number: '٨', name: 'Thamaniyah', value: 8 },
  { number: '٩', name: 'Tis\'a', value: 9 },
  { number: '١٠', name: 'Asharah', value: 10 },
  { number: '١١', name: 'Ahada Ashar', value: 11 },
  { number: '١٢', name: 'Ithna Ashar', value: 12 },
  { number: '١٣', name: 'Thalathata Ashar', value: 13 },
  { number: '١٤', name: 'Arba\'ata Ashar', value: 14 },
  { number: '١٥', name: 'Khamsata Ashar', value: 15 },
  { number: '١٦', name: 'Sittata Ashar', value: 16 },
  { number: '١٧', name: 'Sab\'ata Ashar', value: 17 },
  { number: '١٨', name: 'Thamaniyata Ashar', value: 18 },
  { number: '١٩', name: 'Tis\'ata Ashar', value: 19 },
  { number: '٢٠', name: 'Ishrun', value: 20 },
];

const content = {
    de: {
        title: "Arabische Zahlen",
        description: "Lerne die Zahlen von 1 bis 20 auf Arabisch.",
    },
    en: {
        title: "Arabic Numbers",
        description: "Learn the numbers from 1 to 20 in Arabic.",
    }
}


export default function ArabicNumbersPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{c.description}</p>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {numbers.map((num) => (
          <Card key={num.value} className="text-center transform transition-all duration-300 hover:scale-110 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-6xl font-bold text-primary">{num.number}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-2xl font-semibold">{num.value}</p>
              <p className="text-muted-foreground">{num.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

    