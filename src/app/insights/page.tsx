import { InsightsForm } from "./insights-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Sparkles className="size-8" />
          AI-Powered Insights
        </h1>
        <p className="text-muted-foreground mt-2">
          Ask questions and gain a deeper understanding of Islamic texts through AI.
        </p>
      </header>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
            <CardDescription>Enter a question about Islam, the Quran, or Hadith. The AI will provide an insightful answer based on its knowledge.</CardDescription>
        </CardHeader>
        <CardContent>
            <InsightsForm />
        </CardContent>
      </Card>
    </div>
  );
}
