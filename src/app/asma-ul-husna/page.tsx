import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const names = [
  { arabic: 'الرحمن', transliteration: 'Ar-Rahman', german: 'Der Allerbarmer' },
  { arabic: 'الرحيم', transliteration: 'Ar-Rahim', german: 'Der Barmherzige' },
  { arabic: 'الملك', transliteration: 'Al-Malik', german: 'Der König' },
  { arabic: 'القدوس', transliteration: 'Al-Quddus', german: 'Der Heilige' },
  { arabic: 'السلام', transliteration: 'As-Salam', german: 'Der Frieden' },
  { arabic: 'المؤمن', transliteration: 'Al-Mu\'min', german: 'Der Verleiher der Sicherheit' },
  { arabic: 'المهيمن', transliteration: 'Al-Muhaymin', german: 'Der Wächter' },
  { arabic: 'العزيز', transliteration: 'Al-Aziz', german: 'Der Mächtige' },
  { arabic: 'الجبار', transliteration: 'Al-Jabbar', german: 'Der Unterwerfer' },
  { arabic: 'المتكبر', transliteration: 'Al-Mutakabbir', german: 'Der Stolze' },
  { arabic: 'الخالق', transliteration: 'Al-Khaliq', german: 'Der Schöpfer' },
  { arabic: 'البارئ', transliteration: 'Al-Bari', german: 'Der Gestalter' },
  { arabic: 'المصور', transliteration: 'Al-Musawwir', german: 'Der Former' },
  { arabic: 'الغفار', transliteration: 'Al-Ghaffar', german: 'Der Vergebende' },
  { arabic: 'القهار', transliteration: 'Al-Qahhar', german: 'Der Alles-Besieger' },
  { arabic: 'الوهاب', transliteration: 'Al-Wahhab', german: 'Der Geber' },
  { arabic: 'الرزاق', transliteration: 'Ar-Razzaq', german: 'Der Versorger' },
  { arabic: 'الفتاح', transliteration: 'Al-Fattah', german: 'Der Öffner' },
  { arabic: 'العليم', transliteration: 'Al-Alim', german: 'Der Allwissende' },
  { arabic: 'القابض', transliteration: 'Al-Qabid', german: 'Der die Gaben zurückhält' },
  { arabic: 'الباسط', transliteration: 'Al-Basit', german: 'Der die Gaben großzügig gibt' },
  { arabic: 'الخافض', transliteration: 'Al-Khafid', german: 'Der Erniedriger' },
  { arabic: 'الرافع', transliteration: 'Ar-Rafi', german: 'Der Erhöher' },
  { arabic: 'المعز', transliteration: 'Al-Mu\'izz', german: 'Der Ehre-Gebende' },
  { arabic: 'المذل', transliteration: 'Al-Mudhill', german: 'Der Demütiger' },
  { arabic: 'السميع', transliteration: 'As-Sami', german: 'Der Allhörende' },
  { arabic: 'البصير', transliteration: 'Al-Basir', german: 'Der Allsehende' },
  { arabic: 'الحكم', transliteration: 'Al-Hakam', german: 'Der Richter' },
  { arabic: 'العدل', transliteration: 'Al-Adl', german: 'Der Gerechte' },
  { arabic: 'اللطيف', transliteration: 'Al-Latif', german: 'Der Feinfühlige' },
  { arabic: 'الخبير', transliteration: 'Al-Khabir', german: 'Der Allkundige' },
  { arabic: 'الحليم', transliteration: 'Al-Halim', german: 'Der Nachsichtige' },
  { arabic: 'العظيم', transliteration: 'Al-Azim', german: 'Der Großartige' },
  { arabic: 'الغفور', transliteration: 'Al-Ghafur', german: 'Der Allverzeihende' },
  { arabic: 'الشكور', transliteration: 'Ash-Shakur', german: 'Der Dankbare' },
  { arabic: 'العلي', transliteration: 'Al-Ali', german: 'Der Höchste' },
  { arabic: 'الكبير', transliteration: 'Al-Kabir', german: 'Der Große' },
  { arabic: 'الحفيظ', transliteration: 'Al-Hafiz', german: 'Der Bewahrer' },
  { arabic: 'المقيت', transliteration: 'Al-Muqit', german: 'Der Ernährer' },
  { arabic: 'الحسيب', transliteration: 'Al-Hasib', german: 'Der Abrechner' },
  { arabic: 'الجليل', transliteration: 'Al-Jalil', german: 'Der Erhabene' },
  { arabic: 'الكريم', transliteration: 'Al-Karim', german: 'Der Großzügige' },
  { arabic: 'الرقيب', transliteration: 'Ar-Raqib', german: 'Der Wachsame' },
  { arabic: 'المجيب', transliteration: 'Al-Mujib', german: 'Der Erhörer der Gebete' },
  { arabic: 'الواسع', transliteration: 'Al-Wasi', german: 'Der Allumfassende' },
  { arabic: 'الحكيم', transliteration: 'Al-Hakim', german: 'Der Weise' },
  { arabic: 'الودود', transliteration: 'Al-Wadud', german: 'Der Liebevolle' },
  { arabic: 'المجيد', transliteration: 'Al-Majid', german: 'Der Ruhmreiche' },
  { arabic: 'الباعث', transliteration: 'Al-Ba\'ith', german: 'Der Erwecker der Toten' },
  { arabic: 'الشهيد', transliteration: 'Ash-Shahid', german: 'Der Zeuge' },
  { arabic: 'الحق', transliteration: 'Al-Haqq', german: 'Die Wahrheit' },
  { arabic: 'الوكيل', transliteration: 'Al-Wakil', german: 'Der Vertrauenswürdige' },
  { arabic: 'القوي', transliteration: 'Al-Qawiyy', german: 'Der Starke' },
  { arabic: 'المتين', transliteration: 'Al-Matin', german: 'Der Feste' },
  { arabic: 'الولي', transliteration: 'Al-Waliyy', german: 'Der Schutzherr' },
  { arabic: 'الحميد', transliteration: 'Al-Hamid', german: 'Der Preiswürdige' },
  { arabic: 'المحصي', transliteration: 'Al-Muhsi', german: 'Der alles Aufzeichnende' },
  { arabic: 'المبدئ', transliteration: 'Al-Mubdi', german: 'Der Urheber' },
  { arabic: 'المعيد', transliteration: 'Al-Mu\'id', german: 'Der Wiederhersteller' },
  { arabic: 'المحيي', transliteration: 'Al-Muhyi', german: 'Der Lebensspender' },
  { arabic: 'المميت', transliteration: 'Al-Mumit', german: 'Der Todbringende' },
  { arabic: 'الحي', transliteration: 'Al-Hayy', german: 'Der Lebendige' },
  { arabic: 'القيوم', transliteration: 'Al-Qayyum', german: 'Der Beständige' },
  { arabic: 'الواجد', transliteration: 'Al-Wajid', german: 'Der Finder' },
  { arabic: 'الماجد', transliteration: 'Al-Majid', german: 'Der Glorreiche' },
  { arabic: 'الواحد', transliteration: 'Al-Wahid', german: 'Der Eine' },
  { arabic: 'الصمد', transliteration: 'As-Samad', german: 'Der Unabhängige' },
  { arabic: 'القادر', transliteration: 'Al-Qadir', german: 'Der Fähige' },
  { arabic: 'المقتدر', transliteration: 'Al-Muqtadir', german: 'Der Allmächtige' },
  { arabic: 'المقدم', transliteration: 'Al-Muqaddim', german: 'Der Voranstellende' },
  { arabic: 'المؤخر', transliteration: 'Al-Mu\'akhkhir', german: 'Der Aufschiebende' },
  { arabic: 'الأول', transliteration: 'Al-Awwal', german: 'Der Erste' },
  { arabic: 'الآخر', transliteration: 'Al-Akhir', german: 'Der Letzte' },
  { arabic: 'الظاهر', transliteration: 'Az-Zahir', german: 'Der Offenbare' },
  { arabic: 'الباطن', transliteration: 'Al-Batin', german: 'Der Verborgene' },
  { arabic: 'الوالي', transliteration: 'Al-Wali', german: 'Der Herrscher' },
  { arabic: 'المتعالي', transliteration: 'Al-Muta\'ali', german: 'Der Sich-Erhöhende' },
  { arabic: 'البر', transliteration: 'Al-Barr', german: 'Der Gütige' },
  { arabic: 'التواب', transliteration: 'At-Tawwab', german: 'Der die Reue annimmt' },
  { arabic: 'المنتقم', transliteration: 'Al-Muntaqim', german: 'Der Vergelter' },
  { arabic: 'العفو', transliteration: 'Al-Afuww', german: 'Der Verzeihende' },
  { arabic: 'الرءوف', transliteration: 'Ar-Ra\'uf', german: 'Der Mitleidsvolle' },
  { arabic: 'مالك الملك', transliteration: 'Malik-ul-Mulk', german: 'Der Besitzer der Herrschaft' },
  { arabic: 'ذو الجلال والإكرام', transliteration: 'Dhul-Jalali wal-Ikram', german: 'Der Herr der Majestät und Ehre' },
  { arabic: 'المقسط', transliteration: 'Al-Muqsit', german: 'Der Gerechtigkeit-Übende' },
  { arabic: 'الجامع', transliteration: 'Al-Jami', german: 'Der Sammler' },
  { arabic: 'الغني', transliteration: 'Al-Ghani', german: 'Der Reiche' },
  { arabic: 'المغني', transliteration: 'Al-Mughni', german: 'Der Reich-Machende' },
  { arabic: 'المانع', transliteration: 'Al-Mani', german: 'Der Verhinderer' },
  { arabic: 'الضار', transliteration: 'Ad-Darr', german: 'Der Schädiger' },
  { arabic: 'النافع', transliteration: 'An-Nafi', german: 'Der Nützende' },
  { arabic: 'النور', transliteration: 'An-Nur', german: 'Das Licht' },
  { arabic: 'الهادي', transliteration: 'Al-Hadi', german: 'Der Führer' },
  { arabic: 'البديع', transliteration: 'Al-Badi', german: 'Der Schöpfer aus dem Nichts' },
  { arabic: 'الباقي', transliteration: 'Al-Baqi', german: 'Der Ewige' },
  { arabic: 'الوارث', transliteration: 'Al-Warith', german: 'Der Erbe' },
  { arabic: 'الرشيد', transliteration: 'Ar-Rashid', german: 'Der den rechten Weg weist' },
  { arabic: 'الصبور', transliteration: 'As-Sabur', german: 'Der Geduldige' },
];

export default function AsmaUlHusnaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Asma-Ul Husna</h1>
        <p className="text-muted-foreground mt-2 text-lg">Die 99 schönsten Namen Allahs.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {names.map((name, index) => (
          <Card key={index} className="flex flex-col items-center justify-center p-4 text-center transform transition-all duration-300 hover:scale-105 hover:bg-accent">
            <CardTitle className="text-3xl font-quranic text-primary">{name.arabic}</CardTitle>
            <CardDescription className="mt-2 text-lg font-semibold">{name.transliteration}</CardDescription>
            <CardContent className="p-0 mt-1">
              <p className="text-muted-foreground">{name.german}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
