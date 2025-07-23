import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const hadiths = [
  {
    id: 1,
    text: "Actions are but by intention and every man shall have but that which he intended. Thus he whose migration was for Allah and His messenger, his migration was for Allah and His messenger, and he whose migration was to achieve some worldly benefit or to take some woman in marriage, his migration was for that for which he migrated.",
    source: "Sahih al-Bukhari 1",
  },
  {
    id: 2,
    text: "Whosoever of you sees an evil, let him change it with his hand; and if he is not able to do so, then with his tongue; and if he is not able to do so, then with his heart — and that is the weakest of faith.",
    source: "Sahih Muslim 49",
  },
  {
    id: 3,
    text: "The best among you are those who have the best manners and character.",
    source: "Sahih al-Bukhari 3559",
  },
  {
    id: 4,
    text: "A man's spending on his family is a deed of charity.",
    source: "Sahih al-Bukhari 55",
  },
];

export default function HadithPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Collection of Hadith</h1>
        <p className="text-muted-foreground mt-2">Guidance from the life and sayings of the Prophet Muhammad (ﷺ).</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {hadiths.map((hadith) => (
          <Card key={hadith.id} className="flex flex-col">
            <CardContent className="p-6 flex-grow">
              <p className="text-lg leading-relaxed">&ldquo;{hadith.text}&rdquo;</p>
            </CardContent>
            <CardFooter className="p-6 bg-accent/50">
              <p className="text-sm font-semibold text-primary">{hadith.source}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
