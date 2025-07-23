"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import { getIslamicInsight } from "@/ai/flows/get-islamic-insight"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Terminal, Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const content = {
    de: {
        placeholder: "z.B. Was ist die Bedeutung von Laylat al-Qadr?",
        buttonText: "Einblick erhalten",
        buttonLoading: "Wird generiert...",
        errorTitle: "Fehler",
        errorMessage: "Einblick konnte nicht abgerufen werden. Bitte versuche es erneut."
    },
    en: {
        placeholder: "e.g., What is the significance of Laylat al-Qadr?",
        buttonText: "Get Insight",
        buttonLoading: "Generating...",
        errorTitle: "Error",
        errorMessage: "Failed to get insight. Please try again."
    }
}

export function InsightsForm() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  
  const [question, setQuestion] = useState("")
  const [insight, setInsight] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!question.trim()) return

    setLoading(true)
    setError(null)
    setInsight("")

    try {
      const result = await getIslamicInsight({ question })
      setInsight(result.insight)
    } catch (e) {
      console.error(e)
      setError(c.errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <Textarea
          placeholder={c.placeholder}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          className="resize-none"
          disabled={loading}
        />
        <Button type="submit" className="w-full" disabled={loading || !question.trim()}>
          {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {c.buttonLoading}
              </>
          ) : (
            c.buttonText
          )}
        </Button>
      </form>

       {loading && (
          <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      )}

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{c.errorTitle}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {insight && (
        <Card>
            <CardContent className="p-6">
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                    <p>{insight}</p>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  )
}
