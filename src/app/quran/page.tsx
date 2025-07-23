
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Terminal, Search } from "lucide-react"
import { useEffect, useState, useMemo, FormEvent } from "react"

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

interface SearchResultAyah {
    number: number;
    text: string;
    surah: Surah;
    numberInSurah: number;
}

interface SearchResults {
    count: number;
    matches: SearchResultAyah[];
}

type LanguageEdition = "en.sahih" | "de.aburida" | "am.sadiq"

const SurahDetailContent = ({ surahNumber, languageEdition }: { surahNumber: number, languageEdition: LanguageEdition }) => {
  const [detail, setDetail] = useState<{ arabic: SurahDetail, translation: SurahDetail, transliteration: SurahDetail } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSurahDetail() {
      if (!surahNumber) return
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,${languageEdition},en.transliteration`)
        if (!response.ok) {
          throw new Error('Failed to fetch surah details');
        }
        const data = await response.json()
        if (data.code !== 200 || !data.data || data.data.length < 3) {
            throw new Error('Invalid data received from API');
        }

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
  }, [surahNumber, languageEdition])

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
  const [filter, setFilter] = useState("")
  const [language, setLanguage] = useState<LanguageEdition>("en.sahih")
  const [openSurah, setOpenSurah] = useState<string | undefined>(undefined);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);

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

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setSearchResults(null);

    try {
      const response = await fetch(`https://api.alquran.cloud/v1/search/${searchQuery}/all/${language}`);
      if (!response.ok) {
        throw new Error('Search request failed. Please try again.');
      }
      const data = await response.json();
      if (data.code !== 200) {
        throw new Error(data.data || 'An error occurred during search.');
      }
      setSearchResults(data.data);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSearching(false);
    }
  };


  const filteredSurahs = useMemo(() => {
    if (!filter) return surahs;
    return surahs.filter(surah => 
      surah.englishName.toLowerCase().includes(filter.toLowerCase()) ||
      surah.name.toLowerCase().includes(filter.toLowerCase()) ||
      surah.number.toString().includes(filter)
    );
  }, [surahs, filter]);

  return (
    <div className="space-y-8 flex-grow flex flex-col p-4 sm:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">The Holy Quran</h1>
        <p className="text-muted-foreground mt-2">Browse, read, and reflect upon the words of Allah.</p>
      </header>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="language">Translation Language</Label>
            <Select value={language} onValueChange={(value) => setLanguage(value as LanguageEdition)}>
                <SelectTrigger id="language" className="mt-1">
                    <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en.sahih">English</SelectItem>
                    <SelectItem value="de.aburida">German</SelectItem>
                    <SelectItem value="am.sadiq">Amharic</SelectItem>
                </SelectContent>
            </Select>
          </div>
        <div>
          <Label htmlFor="search-verse">Search Verse or Word</Label>
            <form onSubmit={handleSearch} className="flex items-center gap-2 mt-1">
                <Input
                    id="search-verse"
                    placeholder="e.g. Throne Verse, 2:255, mercy"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" disabled={isSearching}><Search className="h-4 w-4"/></Button>
            </form>
        </div>
      </div>
      
      {isSearching && (
          <div className="flex items-center justify-center py-4">
              <Skeleton className="h-8 w-1/2" />
          </div>
      )}

      {searchError && (
          <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Search Error</AlertTitle>
              <AlertDescription>{searchError}</AlertDescription>
          </Alert>
      )}

      {searchResults && (
          <Card>
              <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Search Results ({searchResults.count} matches)</h2>
                  {searchResults.count > 0 ? (
                      <div className="space-y-4">
                          {searchResults.matches.map(match => (
                              <div key={match.number} className="border-b pb-4">
                                  <p className="font-semibold">{match.surah.name} ({match.surah.englishName}) - Ayah {match.numberInSurah}</p>
                                  <p className="mt-2 text-foreground/90">{match.text}</p>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <p>No results found for your query.</p>
                  )}
              </CardContent>
          </Card>
      )}

      <div className="pt-4">
          <Label htmlFor="search-surah">Filter Surahs</Label>
          <Input 
            id="search-surah"
            placeholder="e.g. Al-Fatihah, 1"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="mt-1"
          />
      </div>

      {error && (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error Loading Surahs</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="flex-grow">
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full" value={openSurah} onValueChange={setOpenSurah}>
            {loading ? (
                [...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4 border-b">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-32" />
                           <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                ))
            ) : (
                filteredSurahs.map((surah) => (
                <AccordionItem value={`item-${surah.number}`} key={surah.number}>
                    <AccordionTrigger className="px-6 py-4 text-lg hover:no-underline">
                    <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">{surah.number}</span>
                        <div>
                        <p className="font-semibold text-left">{surah.name}</p>
                        <p className="text-sm text-muted-foreground text-left">{surah.englishName} ({surah.englishNameTranslation})</p>
                        </div>
                    </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {openSurah === `item-${surah.number}` && (
                          <SurahDetailContent surahNumber={surah.number} languageEdition={language} />
                        )}
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

