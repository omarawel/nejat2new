import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Link as LinkIcon, Sparkles } from "lucide-react";
import Link from "next/link";

const helpfulLinks = [
  { name: "Quran.com", url: "https://quran.com", description: "Read and listen to the Quran." },
  { name: "Sunnah.com", url: "https://sunnah.com", description: "The Hadith of the Prophet Muhammad." },
  { name: "Islamic Relief", url: "https://www.islamic-relief.org/", description: "A leading Muslim charity." },
  { name: "Yaqeen Institute", url: "https://yaqeeninstitute.org", description: "In-depth Islamic research." },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome to Nejat Digital</h1>
        <p className="text-muted-foreground mt-2">Your daily companion for Islamic practice and knowledge.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="size-5" /> Prayer Times</CardTitle>
            <CardDescription>View today's prayer schedule for your location.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Link href="/prayer-times" className="w-full">
              <Button className="w-full">
                View Times <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="size-5" /> AI-Powered Insights</CardTitle>
            <CardDescription>Ask questions and gain a deeper understanding of Islamic texts.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
             <Link href="/insights" className="w-full">
              <Button className="w-full">
                Ask the AI <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Helpful Islamic Links</CardTitle>
          <CardDescription>A collection of resources to aid in your journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {helpfulLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 -m-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="bg-primary/10 text-primary p-2 rounded-lg mr-4">
                  <LinkIcon className="size-5" />
                </div>
                <div>
                  <p className="font-semibold">{link.name}</p>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
                <ArrowRight className="ml-auto size-5 text-muted-foreground" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
