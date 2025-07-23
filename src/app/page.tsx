
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
    { key: "prophets", icon: "👨‍👩‍👧‍👦", de: "25 Propheten", en: "25 Prophets", href: "/prophets" },
    { key: "arabic_basics", icon: "✍️", de: "Arabische Grundlagen", en: "Arabic Basics", href: "/arabic-basics" },
    { key: "arabic_numbers", icon: "🔢", de: "Arabische Zahlen", en: "Arabic Numbers", href: "/arabic-numbers" },
    { key: "asmaul_husna", icon: "🙌", de: "Asma-Ul Husna", en: "Asma-Ul Husna", href: "/asma-ul-husna" },
    { key: "memorization", icon: "🧠", de: "Auswendiglernen", en: "Memorization", href: "/memorization" },
    { key: "community", icon: "🎉", de: "Community & Events", en: "Community & Events", href: "/community" },
    { key: "favorites", icon: "⭐", de: "Deine Favoriten", en: "Your Favorites", href: "/favorites" },
    { key: "dhikr", icon: "🙏", de: "Dhikr & Bittgebete", en: "Dhikr & Supplications" },
    { key: "rays_of_islam", icon: "✨", de: "Die Strahlen Des Islam", en: "The Rays Of Islam" },
    { key: "dua_generator", icon: "🤖", de: "Du'a-Generator", en: "Du'a Generator" },
    { key: "dua", icon: "🤲", de: "Dua", en: "Dua" },
    { key: "nikah", icon: "💍", de: "Ehe (Nikah)", en: "Marriage (Nikah)" },
    { key: "reminders", icon: "🔔", de: "Erinnerungen", en: "Reminders" },
    { key: "food_rules", icon: "🍽️", de: "Essensregeln", en: "Food Rules" },
    { key: "finance", icon: "💰", de: "Finanzen", en: "Finances" },
    { key: "jummah", icon: "🕌", de: "Freitagsgebet (Jumu'ah)", en: "Friday Prayer (Jumu'ah)" },
    { key: "prayer_on_time", icon: "⏳", de: "Gebet auf Zeit", en: "Prayer on Time" },
    { key: "wudu", icon: "💧", de: "Gebetswaschung (Wudu)", en: "Ablution (Wudu)", href: "/wudu" },
    { key: "prayer_times", icon: "🌙", de: "Gebetszeiten", en: "Prayer Times", href: "/prayer-times" },
    { key: "greeting_card", icon: "💌", de: "Grußkarte", en: "Greeting Card" },
    { key: "akhlaq", icon: "😊", de: "Gute Manieren (Akhlaq)", en: "Good Manners (Akhlaq)" },
    { key: "hadith", icon: "📚", de: "Hadith Sammlung", en: "Hadith Collection", href: "/hadith" },
    { key: "hadith_of_day", icon: "📜", de: "Hadith des Tages", en: "Hadith of the Day" },
    { key: "halal_haram_checker", icon: "✅", de: "Halal & Haram Checker", en: "Halal & Haram Checker" },
    { key: "hatim", icon: "📖", de: "Hatim", en: "Hatim" },
    { key: "quran", icon: "📖", de: "Heiliger Koran", en: "Holy Quran", href: "/quran" },
    { key: "hijri_converter", icon: "🔄", de: "Hijri Konverter", en: "Hijri Converter" },
    { key: "hisnul_muslim", icon: "🛡️", de: "Hisnul Muslim", en: "Hisnul Muslim" },
    { key: "islamic_education", icon: "🎓", de: "Islamische Erziehung", en: "Islamic Education" },
    { key: "islamic_stories", icon: "📜", de: "Islamische Geschichten", en: "Islamic Stories" },
    { key: "islamic_art", icon: "🎨", de: "Islamische Kunst", en: "Islamic Art" },
    { key: "islamic_fashion", icon: "👚", de: "Islamische Mode", en: "Islamic Fashion" },
    { key: "islamic_months", icon: "🌙", de: "Islamische Monate", en: "Islamic Months" },
    { key: "islamic_names", icon: "👶", de: "Islamische Namen", en: "Islamic Names" },
    { key: "islamic_miracles", icon: "🌟", de: "Islamische Wunder", en: "Islamic Miracles" },
    { key: "islamic_quotes", icon: "💬", de: "Islamische Zitate", en: "Islamic Quotes" },
    { key: "islamic_calendar", icon: "📅", de: "Islamischer Kalender", en: "Islamic Calendar" },
    { key: "khutbah_of_week", icon: "🎤", de: "Khutbah der Woche", en: "Khutbah of the Week" },
    { key: "ai_scholar", icon: "🤖", de: "KI-Gelehrter", en: "AI Scholar", href: "/insights" },
    { key: "compass", icon: "🧭", de: "Kompass", en: "Compass" },
    { key: "reverts_corner", icon: "🤝", de: "Konvertiten-Ecke", en: "Revert's Corner" },
    { key: "quran_recognizer", icon: "🔍", de: "Koran-Erkenner", en: "Quran Recognizer" },
    { key: "verse_of_day", icon: "📜", de: "Koranvers des Tages", en: "Verse of the Day" },
    { key: "ladies_special", icon: "👩", de: "Ladies Special", en: "Ladies Special" },
    { key: "learning_path_generator", icon: "🗺️", de: "Lernpfad-Generator", en: "Learning Path Generator" },
    { key: "mosque_finder", icon: "🕌", de: "Moscheefinder", en: "Mosque Finder" },
    { key: "prophetic_medicine", icon: "🌿", de: "Prophetische Medizin", en: "Prophetic Medicine" },
    { key: "qibla", icon: "🕋", de: "Qibla", en: "Qibla" },
    { key: "quiz", icon: "❓", de: "Quiz", en: "Quiz" },
    { key: "radio", icon: "📻", de: "Radio", en: "Radio" },
    { key: "travel_etiquette", icon: "✈️", de: "Reise-Etikette", en: "Travel Etiquette" },
    { key: "sahaba", icon: "👥", de: "Sahaba", en: "Sahaba" },
    { key: "donations", icon: "💸", de: "Spenden", en: "Donations" },
    { key: "tasbih_counter", icon: "📿", de: "Tasbih Zähler", en: "Tasbih Counter" },
    { key: "janazah", icon: "⚰️", de: "Todesfall (Janazah)", en: "Death (Janazah)" },
    { key: "dream_interpreter", icon: "🌙", de: "Traumdeuter", en: "Dream Interpreter" },
    { key: "dreams_in_islam", icon: "💤", de: "Träume im Islam", en: "Dreams in Islam" },
    { key: "support", icon: "❤️", de: "Unterstützung", en: "Support" },
    { key: "missed_fasts", icon: "🗓️", de: "Verpasste Fastentage", en: "Missed Fasts" },
    { key: "missed_prayers", icon: " نماز", de: "Verpasste Gebete", en: "Missed Prayers" },
    { key: "verse_finder", icon: "🔎", de: "Vers-Finder", en: "Verse Finder" },
    { key: "quran_miracles", icon: "✨", de: "Wunder des Korans", en: "Miracles of the Quran" },
    { key: "zakat_calculator", icon: "💸", de: "Zakat-Rechner", en: "Zakat Calculator" },
    { key: "civilization", icon: "🏛️", de: "Zivilisation", en: "Civilization" }
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
}

export default function Home() {
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] || content.de;

  const localizedTools = useMemo(() => {
    return tools
      .map(tool => ({ ...tool, name: tool[language as keyof typeof tool] || tool.en }))
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

    
