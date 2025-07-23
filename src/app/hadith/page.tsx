
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Terminal, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useEffect, useState, useMemo, FormEvent } from "react"
import type { Hadith } from "./actions"
import { getHadiths } from "./actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Language = "english" | "urdu" | "arabic" | "amharic" | "turkish" | "german";

const HadithContent = ({ hadith, language }: { hadith: Hadith, language: Language }) => {
  const getText = () => {
    switch(language) {
      case "urdu":
        return hadith.hadithUrdu
      case "arabic":
        return hadith.hadithArabic
      case "amharic":
        // Assuming the API might support these in the future, or we add a different API
        return `Amharic translation for: ${hadith.hadithEnglish}`;
      case "turkish":
        return `Turkish translation for: ${hadith.hadithEnglish}`;
      case "german":
        return `German translation for: ${hadith.hadithEnglish}`;
      case "english":
      default:
        return hadith.hadithEnglish
    }
  }
  
  const getLanguageDirection = () => {
    switch(language) {
        case "urdu":
        case "arabic":
            return "rtl";
        default:
            return "ltr";
    }
  }

  return (
    <div className="px-6 py-4 space-y-3">
        <p className={cn("text-foreground/90", getLanguageDirection() === 'rtl' ? "text-right" : "")}>{getText()}</p>
    </div>
  )
}


export default function HadithPage() {
  const [hadiths, setHadiths] = useState<Hadith[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [paginationInfo, setPaginationInfo] = useState<{next: boolean, prev: boolean, from: number, to: number, total: number} | null>(null)
  const [openHadith, setOpenHadith] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [language, setLanguage] = useState<Language>("english");

  
  useEffect(() => {
    async function fetchHadiths() {
      setLoading(true)
      setError(null)
      try {
        const data = await getHadiths(currentPage, submittedSearchTerm);
        if (data.error) {
            throw new Error(data.error);
        }
        if (!data.hadiths) {
            throw new Error("No hadiths data received.");
        }
        
        setHadiths(data.hadiths.data)
        setPaginationInfo({
            next: !!data.hadiths.next_page_url,
            prev: !!data.hadiths.prev_page_url,
            from: data.hadiths.from,
            to: data.hadiths.to,
            total: data.hadiths.total,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchHadiths()
  }, [currentPage, submittedSearchTerm])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    setSubmittedSearchTerm(searchTerm);
  };
  
  const handleNextPage = () => {
    if (paginationInfo?.next) {
        setCurrentPage(prev => prev + 1);
    }
  }

  const handlePrevPage = () => {
    if (paginationInfo?.prev) {
        setCurrentPage(prev => prev - 1);
    }
  }

  return (
    <div className="space-y-8 flex-grow flex flex-col p-4 sm:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Collection of Hadith</h1>
        <p className="text-muted-foreground mt-2">Guidance from the life and sayings of the Prophet Muhammad (ﷺ).</p>
      </header>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="language">Translation Language</Label>
                <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                    <SelectTrigger id="language" className="mt-1">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="urdu">Urdu</SelectItem>
                        <SelectItem value="arabic">Arabic</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="turkish">Turkish</SelectItem>
                        <SelectItem value="amharic">Amharic</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="search-hadith">Search collection</Label>
                 <form onSubmit={handleSearch} className="flex items-center gap-2 mt-1">
                    <Input
                        id="search-hadith"
                        placeholder="e.g. bukhari, muslim, tirmidhi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit" variant="outline" size="icon" disabled={loading}><Search className="h-4 w-4"/></Button>
                </form>
            </div>
      </div>

      {error && (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error Loading Hadiths</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
                 <Skeleton key={i} className="h-12 w-full" />
            ))}
        </div>
      ) : hadiths.length === 0 ? (
        <Card>
            <CardContent className="p-6 text-center">
                <p>No hadiths found for your search term.</p>
            </CardContent>
        </Card>
      ) : (
        <>
            <Card className="flex-grow">
                <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full" value={openHadith} onValueChange={setOpenHadith}>
                        {hadiths.map((hadith) => (
                        <AccordionItem value={`item-${hadith.id}`} key={hadith.id}>
                            <AccordionTrigger className="px-6 py-4 text-lg hover:no-underline">
                                <div className="flex items-center gap-4 text-left">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold shrink-0">{hadith.hadithNumber}</span>
                                    <div>
                                        <p className="font-semibold">{hadith.book.bookName}</p>
                                        <p className="text-sm text-muted-foreground">Chapter: {hadith.chapter.chapterEnglish}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {openHadith === `item-${hadith.id}` && (
                                    <HadithContent hadith={hadith} language={language} />
                                )}
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            {paginationInfo && paginationInfo.total > 0 && (
                <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-muted-foreground">
                        Showing {paginationInfo.from} to {paginationInfo.to} of {paginationInfo.total} hadiths
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={!paginationInfo.prev || loading}>
                            <ChevronLeft />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleNextPage} disabled={!paginationInfo.next || loading}>
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            )}
        </>
      )}
    </div>
  );
}
