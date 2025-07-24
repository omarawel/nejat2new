
"use client"

import { useState, useEffect, FormEvent } from "react"
import { getHalalHaramRuling, type HalalHaramRuling } from "@/ai/flows/get-halal-haram-ruling"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Sparkles, Terminal, Loader2, MinusCircle, CheckCircle, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { checkAndDecrementQuota, getUserQuota, UserQuota } from '@/lib/user-usage';
import { UpgradeInlineAlert } from '@/components/upgrade-inline-alert';

const content = {
    de: {
        placeholder: "z.B. Gelatine, Musik, Tattoos...",
        buttonText: "Status prüfen",
        buttonLoading: "Wird geprüft...",
        errorTitle: "Fehler",
        errorMessage: "Das Urteil konnte nicht abgerufen werden. Bitte versuche es erneut.",
        ruling: "Urteil",
        explanation: "Erklärung",
        wisdomBenefits: "Weisheit & Vorteile (von Halal)",
        consequencesViolation: "Konsequenzen & Nachteile (von Haram)",
        halal: "Halal",
        haram: "Haram",
        disputed: "Umstritten / Detaillierte Betrachtung nötig"
    },
    en: {
        placeholder: "e.g., Gelatin, Music, Tattoos...",
        buttonText: "Check Status",
        buttonLoading: "Checking...",
        errorTitle: "Error",
        errorMessage: "Failed to get ruling. Please try again.",
        ruling: "Ruling",
        explanation: "Explanation",
        wisdomBenefits: "Wisdom & Benefits (of Halal)",
        consequencesViolation: "Consequences & Disadvantages (of Haram)",
        halal: "Halal",
        haram: "Haram",
        disputed: "Disputed / Requires Detailed Consideration"
    }
}

const RulingDisplay = ({ ruling }: { ruling: HalalHaramRuling }) => {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    
    const rulingMap = {
        'Halal': { text: c.halal, icon: CheckCircle, color: 'text-green-500' },
        'Haram': { text: c.haram, icon: MinusCircle, color: 'text-red-500' },
        'Disputed': { text: c.disputed, icon: AlertTriangle, color: 'text-yellow-500' },
    };
    
    const displayInfo = rulingMap[ruling.status] || rulingMap['Disputed'];
    const Icon = displayInfo.icon;

    return (
         <Card className="mt-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Icon className={cn("h-6 w-6", displayInfo.color)} />
                    {ruling.topic}
                </CardTitle>
                 <CardDescription className={cn("font-bold text-lg", displayInfo.color)}>{displayInfo.text}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-base mb-1">{c.explanation}</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{ruling.explanation}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-base mb-1">{c.wisdomBenefits}</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{ruling.wisdom_benefits}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-base mb-1">{c.consequencesViolation}</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{ruling.consequences_violation}</p>
                </div>
            </CardContent>
         </Card>
    )
}


export function HalalHaramForm() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  const [user, authLoading] = useAuthState(auth);
  const [quota, setQuota] = useState<UserQuota | null>(null);
  
  const [topic, setTopic] = useState("")
  const [ruling, setRuling] = useState<HalalHaramRuling | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading) {
        getUserQuota(user?.uid || null).then(setQuota);
    }
  }, [user, authLoading]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!topic.trim()) return

    setLoading(true)
    setError(null)
    setRuling(null)

    const quotaResult = await checkAndDecrementQuota(user?.uid || null);
    if (!quotaResult.success) {
        setQuota(quotaResult.quota);
        setLoading(false);
        return;
    }
    setQuota(quotaResult.quota);

    try {
      const result = await getHalalHaramRuling({ topic })
      setRuling(result)
    } catch (e) {
      console.error(e)
      setError(c.errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = quota ? quota.remaining > 0 : true;

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          placeholder={c.placeholder}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={loading}
        />
        <UpgradeInlineAlert quota={quota} isLoggedIn={!!user} />
        <Button type="submit" className="w-full" disabled={loading || !topic.trim() || !canSubmit}>
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

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{c.errorTitle}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
          <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      )}

      {ruling && <RulingDisplay ruling={ruling} />}
    </div>
  )
}
