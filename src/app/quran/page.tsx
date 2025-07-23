
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { useEffect, useState } from "react"

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

interface Ayah {
  number: number
  audio: string
  audioSecondary: string[]
  text: string
  numberInSurah: number
  juz: number
  manzil: number
  page: number
  ruku: number
  hizbQuarter: number
  sajda: boolean
}

interface Edition {
  identifier: string
  language: string
  name: string
  englishName: string
  format: string
  type: string
  direction: string
}

interface SurahDetail extends Surah {
  ayahs: Ayah[]
  edition: Edition
}

const SurahDetailContent = ({ surahNumber }: { surahNumber: number }) => {
  const [detail, setDetail] = useState<{ arabic: SurahDetail, translation: SurahDetail, transliteration: SurahDetail } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSurahDetail() {
      if (!surahNumber) return
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,en.transliteration`)
        if (!response.ok) {
          throw new Error('Failed to fetch surah details');
        }
        const data = await response.json()

        setDetail({
            arabic: data.data[0],
            translation: data.data[1],
            transliteration: data.data[2]
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchSurahDetail()
  }, [surahNumber])

  if (loading) {
    return (
      <div className="divide-y divide-border">
          {[...Array(3)].map((_, i) => (
              <div key={i} className="px-6 py-4 space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
              </div>
          ))}
      </div>
    )
  }

  if (error) {
    return (
        <div className="px-6 py-4">
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    )
  }
  
  if (!detail) return null

  return (
    <div className="divide-y divide-border">
      {detail.arabic.ayahs.map((_, index) => (
        <div key={detail.arabic.ayahs[index].number} className="px-6 py-4 space-y-3">
          <p className="text-2xl font-quranic text-right tracking-wide leading-relaxed">{detail.arabic.ayahs[index].text}</p>
          <p className="text-muted-foreground italic">{detail.transliteration.ayahs[index].text}</p>
          <p className="text-foreground/90">{detail.translation.ayahs[index].text}</p>
        </div>
      ))}
    </div>
  )
}


export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSurahs() {
      setLoading(true)
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah')
        if (!response.ok) {
            throw new Error("Failed to fetch surahs. Please try again later.")
        }
        const data = await response.json()
        setSurahs(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchSurahs()
  }, [])

  return (
    <div className="space-y-8 flex-grow">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">The Holy Quran</h1>
        <p className="text-muted-foreground mt-2">Browse, read, and reflect upon the words of Allah.</p>
      </header>
        
      {error && (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error Loading Surahs</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="flex-grow">
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            {loading ? (
                [...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4 border-b">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-32" />
                           <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                ))
            ) : (
                surahs.map((surah) => (
                <AccordionItem value={`item-${surah.number}`} key={surah.number}>
                    <AccordionTrigger className="px-6 py-4 text-lg hover:no-underline">
                    <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">{surah.number}</span>
                        <div>
                        <p className="font-semibold text-left">{surah.name}</p>
                        <p className="text-sm text-muted-foreground text-left">{surah.englishName}</p>
                        </div>
                    </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <SurahDetailContent surahNumber={surah.number} />
                    </AccordionContent>
                </AccordionItem>
                ))
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
