"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import { getIslamicInsight } from "@/ai/flows/get-islamic-insight"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Terminal } from "lucide-react"

export function InsightsForm() {
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
      setError("Failed to get insight. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <Textarea
          placeholder="e.g., What is the significance of Laylat al-Qadr?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          className="resize-none"
          disabled={loading}
        />
        <Button type="submit" className="w-full" disabled={loading || !question.trim()}>
          {loading ? "Generating..." : "Get Insight"}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {insight && (
        <Card>
            <CardContent className="p-6">
                <div className="prose prose-invert max-w-none">
                    <p>{insight}</p>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  )
}
