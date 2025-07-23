
"use client"

import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const tools = [
  { icon: "👨‍👩‍👧‍👦", name: "25 Propheten" },
  { icon: "✍️", name: "Arabische Grundlagen" },
  { icon: "🔢", name: "Arabische Zahlen" },
  { icon: "🙌", name: "Asma-Ul Husna" },
  { icon: "🧠", name: "Auswendiglernen" },
  { icon: "🎉", name: "Community & Events" },
  { icon: "⭐", name: "Deine Favoriten" },
  { icon: "🙏", name: "Dhikr & Bittgebete" },
  { icon: "✨", name: "Die Strahlen Des Islam" },
  { icon: "🤖", name: "Du'a-Generator" },
  { icon: "🤲", name: "Dua" },
  { icon: "💍", name: "Ehe (Nikah)" },
  { icon: "🔔", name: "Erinnerungen" },
  { icon: "🍽️", name: "Essensregeln" },
  { icon: "💰", name: "Finanzen" },
  { icon: "🕌", name: "Freitagsgebet (Jumu'ah)" },
  { icon: "⏳", name: "Gebet auf Zeit" },
  { icon: "💧", name: "Gebetswaschung (Wudu)" },
  { icon: "🌙", name: "Gebetszeiten" },
  { icon: "⏰", name: "Gebetszeiten" },
  { icon: "💌", name: "Grußkarte" },
  { icon: "😊", name: "Gute Manieren (Akhlaq)" },
  { icon: "📚", name: "Hadith Sammlung" },
  { icon: "📜", name: "Hadith des Tages" },
  { icon: "✅", name: "Halal & Haram Checker" },
  { icon: "📖", name: "Hatim" },
  { icon: "📖", name: "Heiliger Koran" },
  { icon: "🔄", name: "Hijri Konverter" },
  { icon: "🛡️", name: "Hisnul Muslim" },
  { icon: "🎓", name: "Islamische Erziehung" },
  { icon: "📜", name: "Islamische Geschichten" },
  { icon: "🎨", name: "Islamische Kunst" },
  { icon: "👚", name: "Islamische Mode" },
  { icon: "🌙", name: "Islamische Monate" },
  { icon: "👶", name: "Islamische Namen" },
  { icon: "🌟", name: "Islamische Wunder" },
  { icon: "💬", name: "Islamische Zitate" },
  { icon: "📅", name: "Islamischer Kalender" },
  { icon: "📅", name: "Kalender" },
  { icon: "🎤", name: "Khutbah der Woche" },
  { icon: "🤖", name: "KI-Gelehrter" },
  { icon: "🧭", name: "Kompass" },
  { icon: "🤝", name: "Konvertiten-Ecke" },
  { icon: "📖", name: "Koran" },
  { icon: "🔍", name: "Koran-Erkenner" },
  { icon: "📜", name: "Koranvers des Tages" },
  { icon: "👩", name: "Ladies Special" },
  { icon: "🗺️", name: "Lernpfad-Generator" },
  { icon: "🕌", name: "Moscheefinder" },
  { icon: "🌿", name: "Prophetische Medizin" },
  { icon: "🕋", name: "Qibla" },
  { icon: "❓", name: "Quiz" },
  { icon: "📻", name: "Radio" },
  { icon: "✈️", name: "Reise-Etikette" },
  { icon: "👥", name: "Sahaba" },
  { icon: "💸", name: "Spenden" },
  { icon: "📿", name: "Tasbih" },
  { icon: "📿", name: "Tasbih Zähler" },
  { icon: "⚰️", name: "Todesfall (Janazah)" },
  { icon: "🌙", name: "Traumdeuter" },
  { icon: "💤", name: "Träume im Islam" },
  { icon: "❤️", name: "Unterstützung" },
  { icon: "🗓️", name: "Verpasste Fastentage" },
  { icon: " نماز", name: "Verpasste Gebete" },
  { icon: "🔎", name: "Vers-Finder" },
  { icon: "✨", name: "Wunder des Korans" },
  { icon: "💸", name: "Zakat-Rechner" },
  { icon: "🏛️", name: "Zivilisation" }
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
  }
}

export default function Home() {
  const { language } = useLanguage();
  const c = content[language];

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
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {tools.map((tool, index) => (
            <div key={index} className="flex flex-col justify-center items-center p-4 border border-border rounded-lg bg-card hover:bg-accent cursor-pointer transition-colors w-full h-32">
              <span className="text-3xl">{tool.icon}</span>
              <span className="mt-2 text-sm text-center font-medium">{tool.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
