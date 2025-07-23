
"use client"

import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { useMemo } from "react";

const FeatureCard = ({ icon, name }: { icon: string, name: string }) => {
  return (
    <div className="flex flex-col justify-center items-center p-2 border border-border rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer transition-colors h-16">
      <span className="text-lg">{icon}</span>
      <span className="mt-1 text-[10px] text-center font-medium leading-tight">{name}</span>
    </div>
  );
};

const tools = [
    { key: "prophets", icon: "👨‍👩‍👧‍👦", de: "25 Propheten", en: "25 Prophets", tr: "25 Peygamber", am: "25 ነቢያት" },
    { key: "arabic_basics", icon: "✍️", de: "Arabische Grundlagen", en: "Arabic Basics", tr: "Arapça Temelleri", am: "የአረብኛ መሰረታዊ ነገሮች" },
    { key: "arabic_numbers", icon: "🔢", de: "Arabische Zahlen", en: "Arabic Numbers", tr: "Arapça Sayılar", am: "የአረብኛ ቁጥሮች" },
    { key: "asmaul_husna", icon: "🙌", de: "Asma-Ul Husna", en: "Asma-Ul Husna", tr: "Esma-ül Hüsna", am: "አስማ-ኡል ሁስና" },
    { key: "memorization", icon: "🧠", de: "Auswendiglernen", en: "Memorization", tr: "Ezberleme", am: "በቃላችን መያዝ" },
    { key: "community", icon: "🎉", de: "Community & Events", en: "Community & Events", tr: "Topluluk ve Etkinlikler", am: "ማህበረሰብ እና ክስተቶች" },
    { key: "favorites", icon: "⭐", de: "Deine Favoriten", en: "Your Favorites", tr: "Favorilerin", am: "የእርስዎ ተወዳጆች" },
    { key: "dhikr", icon: "🙏", de: "Dhikr & Bittgebete", en: "Dhikr & Supplications", tr: "Zikir ve Dualar", am: "ዚክር እና ዱዓዎች" },
    { key: "rays_of_islam", icon: "✨", de: "Die Strahlen Des Islam", en: "The Rays Of Islam", tr: "İslam'ın Işınları", am: "የእስልምና ጨረሮች" },
    { key: "dua_generator", icon: "🤖", de: "Du'a-Generator", en: "Du'a Generator", tr: "Dua Jeneratörü", am: "ዱዓ ጀነሬተር" },
    { key: "dua", icon: "🤲", de: "Dua", en: "Dua", tr: "Dua", am: "ዱዓ" },
    { key: "nikah", icon: "💍", de: "Ehe (Nikah)", en: "Marriage (Nikah)", tr: "Evlilik (Nikah)", am: "ጋብቻ (ኒካህ)" },
    { key: "reminders", icon: "🔔", de: "Erinnerungen", en: "Reminders", tr: "Hatırlatmalar", am: "ማስታወሻዎች" },
    { key: "food_rules", icon: "🍽️", de: "Essensregeln", en: "Food Rules", tr: "Yemek Kuralları", am: "የምግብ ደንቦች" },
    { key: "finance", icon: "💰", de: "Finanzen", en: "Finances", tr: "Finans", am: "ፋይናንስ" },
    { key: "jummah", icon: "🕌", de: "Freitagsgebet (Jumu'ah)", en: "Friday Prayer (Jumu'ah)", tr: "Cuma Namazı", am: "የጁምዓ ሰላት" },
    { key: "prayer_on_time", icon: "⏳", de: "Gebet auf Zeit", en: "Prayer on Time", tr: "Vaktinde Namaz", am: "በሰዓቱ ሰላት" },
    { key: "wudu", icon: "💧", de: "Gebetswaschung (Wudu)", en: "Ablution (Wudu)", tr: "Abdest (Wudu)", am: "ውዱእ" },
    { key: "prayer_times", icon: "🌙", de: "Gebetszeiten", en: "Prayer Times", href: "/prayer-times", tr: "Namaz Vakitleri", am: "የሰላት ጊዜያት" },
    { key: "greeting_card", icon: "💌", de: "Grußkarte", en: "Greeting Card", tr: "Tebrik Kartı", am: "የሰላምታ ካርድ" },
    { key: "akhlaq", icon: "😊", de: "Gute Manieren (Akhlaq)", en: "Good Manners (Akhlaq)", tr: "Güzel Ahlak", am: "መልካም ስነምግባር (አኽላቅ)" },
    { key: "hadith", icon: "📚", de: "Hadith Sammlung", en: "Hadith Collection", href: "/hadith", tr: "Hadis Koleksiyonu", am: "ሐዲስ ስብስብ" },
    { key: "hadith_of_day", icon: "📜", de: "Hadith des Tages", en: "Hadith of the Day", tr: "Günün Hadisi", am: "የዕለቱ ሐዲስ" },
    { key: "halal_haram_checker", icon: "✅", de: "Halal & Haram Checker", en: "Halal & Haram Checker", tr: "Helal ve Haram Denetleyicisi", am: "ሀላል እና ሀራም መፈተሻ" },
    { key: "hatim", icon: "📖", de: "Hatim", en: "Hatim", tr: "Hatim", am: "ሀቲም" },
    { key: "quran", icon: "📖", de: "Heiliger Koran", en: "Holy Quran", href: "/quran", tr: "Kutsal Kur'an", am: "ቅዱስ ቁርኣን" },
    { key: "hijri_converter", icon: "🔄", de: "Hijri Konverter", en: "Hijri Converter", tr: "Hicri Dönüştürücü", am: "የሂጅሪ መቀየሪያ" },
    { key: "hisnul_muslim", icon: "🛡️", de: "Hisnul Muslim", en: "Hisnul Muslim", tr: "Hisnul Muslim", am: "ሂስኑል ሙስሊም" },
    { key: "islamic_education", icon: "🎓", de: "Islamische Erziehung", en: "Islamic Education", tr: "İslami Eğitim", am: "የእስልምና ትምህርት" },
    { key: "islamic_stories", icon: "📜", de: "Islamische Geschichten", en: "Islamic Stories", tr: "İslami Hikayeler", am: "የእስልምና ታሪኮች" },
    { key: "islamic_art", icon: "🎨", de: "Islamische Kunst", en: "Islamic Art", tr: "İslam Sanatı", am: "የእስልምና ጥበብ" },
    { key: "islamic_fashion", icon: "👚", de: "Islamische Mode", en: "Islamic Fashion", tr: "İslami Moda", am: "የእስልምና ፋሽን" },
    { key: "islamic_months", icon: "🌙", de: "Islamische Monate", en: "Islamic Months", tr: "İslami Aylar", am: "የእስልምና ወራት" },
    { key: "islamic_names", icon: "👶", de: "Islamische Namen", en: "Islamic Names", tr: "İslami İsimler", am: "የእስልምና ስሞች" },
    { key: "islamic_miracles", icon: "🌟", de: "Islamische Wunder", en: "Islamic Miracles", tr: "İslami Mucizeler", am: "የእስልምና ተአምራት" },
    { key: "islamic_quotes", icon: "💬", de: "Islamische Zitate", en: "Islamic Quotes", tr: "İslami Alıntılar", am: "የእስልምና ጥቅሶች" },
    { key: "islamic_calendar", icon: "📅", de: "Islamischer Kalender", en: "Islamic Calendar", tr: "İslami Takvim", am: "የእስልምና የቀን መቁጠሪያ" },
    { key: "khutbah_of_week", icon: "🎤", de: "Khutbah der Woche", en: "Khutbah of the Week", tr: "Haftanın Hutbesi", am: "የሳምንቱ ኹጥባ" },
    { key: "ai_scholar", icon: "🤖", de: "KI-Gelehrter", en: "AI Scholar", href: "/insights", tr: "Yapay Zeka Alimi", am: "AI ምሁር" },
    { key: "compass", icon: "🧭", de: "Kompass", en: "Compass", tr: "Pusula", am: "ኮምፓስ" },
    { key: "reverts_corner", icon: "🤝", de: "Konvertiten-Ecke", en: "Revert's Corner", tr: "Mühtedi Köşesi", am: "የሰለመ ሰው ጥግ" },
    { key: "quran_recognizer", icon: "🔍", de: "Koran-Erkenner", en: "Quran Recognizer", tr: "Kur'an Tanıyıcı", am: "ቁርኣን ለዪ" },
    { key: "verse_of_day", icon: "📜", de: "Koranvers des Tages", en: "Verse of the Day", tr: "Günün Ayeti", am: "የዕለቱ አንቀጽ" },
    { key: "ladies_special", icon: "👩", de: "Ladies Special", en: "Ladies Special", tr: "Bayanlara Özel", am: "የሴቶች ልዩ" },
    { key: "learning_path_generator", icon: "🗺️", de: "Lernpfad-Generator", en: "Learning Path Generator", tr: "Öğrenme Yolu Oluşturucu", am: "የመማሪያ መንገድ አመንጪ" },
    { key: "mosque_finder", icon: "🕌", de: "Moscheefinder", en: "Mosque Finder", tr: "Cami Bulucu", am: "መስጊድ ፈላጊ" },
    { key: "prophetic_medicine", icon: "🌿", de: "Prophetische Medizin", en: "Prophetic Medicine", tr: "Nebevi Tıp", am: "የነብያዊ ሕክምና" },
    { key: "qibla", icon: "🕋", de: "Qibla", en: "Qibla", tr: "Kıble", am: "ቂብላ" },
    { key: "quiz", icon: "❓", de: "Quiz", en: "Quiz", tr: "Sınav", am: "ፈተና" },
    { key: "radio", icon: "📻", de: "Radio", en: "Radio", tr: "Radyo", am: "ሬዲዮ" },
    { key: "travel_etiquette", icon: "✈️", de: "Reise-Etikette", en: "Travel Etiquette", tr: "Seyahat Adabı", am: "የጉዞ ሥነ-ምግባር" },
    { key: "sahaba", icon: "👥", de: "Sahaba", en: "Sahaba", tr: "Sahabe", am: "ሰሃባ" },
    { key: "donations", icon: "💸", de: "Spenden", en: "Donations", tr: "Bağışlar", am: "ልገሳዎች" },
    { key: "tasbih_counter", icon: "📿", de: "Tasbih Zähler", en: "Tasbih Counter", tr: "Tesbih Sayacı", am: "ተስቢህ ቆጣሪ" },
    { key: "janazah", icon: "⚰️", de: "Todesfall (Janazah)", en: "Death (Janazah)", tr: "Vefat (Cenaze)", am: "ሞት (ጀናዛ)" },
    { key: "dream_interpreter", icon: "🌙", de: "Traumdeuter", en: "Dream Interpreter", tr: "Rüya Tabircisi", am: "የህልም ተርጓሚ" },
    { key: "dreams_in_islam", icon: "💤", de: "Träume im Islam", en: "Dreams in Islam", tr: "İslam'da Rüyalar", am: "በእስልምና ውስጥ ያሉ ሕልሞች" },
    { key: "support", icon: "❤️", de: "Unterstützung", en: "Support", tr: "Destek", am: "ድጋፍ" },
    { key: "missed_fasts", icon: "🗓️", de: "Verpasste Fastentage", en: "Missed Fasts", tr: "Kaçırılan Oruçlar", am: "ያመለጡ ጾሞች" },
    { key: "missed_prayers", icon: " نماز", de: "Verpasste Gebete", en: "Missed Prayers", tr: "Kaçırılan Namazlar", am: "ያመለጡ ሰላቶች" },
    { key: "verse_finder", icon: "🔎", de: "Vers-Finder", en: "Verse Finder", tr: "Ayet Bulucu", am: "አንቀጽ ፈላጊ" },
    { key: "quran_miracles", icon: "✨", de: "Wunder des Korans", en: "Miracles of the Quran", tr: "Kur'an'ın Mucizeleri", am: "የቁርኣን ተአምራት" },
    { key: "zakat_calculator", icon: "💸", de: "Zakat-Rechner", en: "Zakat Calculator", tr: "Zekat Hesaplayıcı", am: "የዘካ ማስያ" },
    { key: "civilization", icon: "🏛️", de: "Zivilisation", en: "Civilization", tr: "Medeniyet", am: "ሥልጣኔ" }
];

const content = {
  de: {
    title1: "Dein digitaler Begleiter",
    title2: "für den",
    title3: "islamischen Alltag",
    description: "Finde alles, was du für deine spirituelle Reise brauchst: präzise Gebetszeiten, den gesamten Koran, eine umfassende Hadith-Sammlung und einzigartige KI-Tools, die dein Wissen erweitern.",
    button: "Funktionen entdecken",
    sectionTitle: "Entdecke mehr",
    sectionDescription: "Nützliche Werkzeuge für deinen Alltag.",
  },
  en: {
    title1: "Your Digital Companion",
    title2: "for your",
    title3: "daily Islamic life",
    description: "Find everything you need for your spiritual journey: precise prayer times, the entire Quran, a comprehensive Hadith collection, and unique AI tools to expand your knowledge.",
    button: "Discover Features",
    sectionTitle: "Discover More",
    sectionDescription: "Useful tools for your daily life.",
  },
  am: {
    title1: "የእርስዎ ዲጂታል አጋዥ",
    title2: "ለእርስዎ",
    title3: "የዕለት ተዕለት ኢስላማዊ ሕይወት",
    description: "ለመንፈሳዊ ጉዞዎ የሚያስፈልገዎትን ሁሉ ያግኙ፡ ትክክለኛ የሰላት ጊዜያት፣ ሙሉ ቁርኣን፣ አጠቃላይ የሐዲስ ስብስብ፣ እና እውቀትዎን ለማስፋት ልዩ የሆኑ የኤአይ መሳሪያዎች።",
    button: "ባህሪያትን ያግኙ",
    sectionTitle: "ተጨማሪ ያግኙ",
    sectionDescription: "ለዕለት ተዕለት ሕይወትዎ ጠቃሚ መሣሪያዎች።",
  },
  tr: {
    title1: "Dijital Yoldaşınız",
    title2: "senin için",
    title3: "günlük İslami yaşam",
    description: "Manevi yolculuğunuz için ihtiyacınız olan her şeyi bulun: hassas namaz vakitleri, Kuran'ın tamamı, kapsamlı bir Hadis koleksiyonu ve bilginizi genişletmek için benzersiz yapay zeka araçları.",
    button: "Özellikleri Keşfedin",
    sectionTitle: "Daha Fazlasını Keşfedin",
    sectionDescription: "Günlük yaşamınız için kullanışlı araçlar.",
  }
}

export default function Home() {
  const { language } = useLanguage();
  const c = content[language];

  const localizedTools = useMemo(() => {
    return tools
      .map(tool => ({ ...tool, name: tool[language] }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [language]);

  return (
    <div className="flex flex-col items-center justify-center text-center flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
          {c.title1}
          <br />
          {c.title2} <span className="text-primary">{c.title3}</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          {c.description}
        </p>
        <div className="mt-8">
          <Button size="lg">
            <Grid className="mr-2 h-5 w-5" />
            {c.button}
          </Button>
        </div>
      </main>

      <section className="mt-20 w-full max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold">{c.sectionTitle}</h2>
        <p className="mt-2 text-md sm:text-lg text-muted-foreground">{c.sectionDescription}</p>
        <div className="mt-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {localizedTools.map((tool) => {
            const card = <FeatureCard icon={tool.icon} name={tool.name} />;
            if (tool.href) {
                return <Link key={tool.key} href={tool.href}>{card}</Link>
            }
            return <div key={tool.key}>{card}</div>;
          })}
        </div>
      </section>
    </div>
  );
}

    