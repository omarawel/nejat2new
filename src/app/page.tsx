import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";
import Link from "next/link";

const tools = [
  { icon: "🕌" },
  { icon: "📖" },
  { icon: "📿" },
  { icon: "🕋" },
  { icon: "🌙" },
  { icon: "🤲" },
  { icon: "🧭" },
  { icon: "📅" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
          Dein digitaler Begleiter
          <br />
          für den <span className="text-primary">islamischen Alltag</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Finde alles, was du für deine spirituelle Reise brauchst: präzise Gebetszeiten,
          den gesamten Koran, eine umfassende Hadith-Sammlung und einzigartige KI-Tools,
          die dein Wissen erweitern.
        </p>
        <div className="mt-8">
          <Button size="lg">
            <Grid className="mr-2 h-5 w-5" />
            Funktionen entdecken
          </Button>
        </div>
      </main>

      <section className="mt-20 w-full max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold">Entdecke mehr</h2>
        <p className="mt-2 text-md sm:text-lg text-muted-foreground">Nützliche Werkzeuge für deinen Alltag.</p>
        <div className="mt-8 grid grid-cols-4 md:grid-cols-8 gap-4">
          {tools.map((tool, index) => (
            <div key={index} className="flex justify-center items-center p-4 border border-border rounded-lg bg-card hover:bg-accent cursor-pointer transition-colors">
              <span className="text-3xl">{tool.icon}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
