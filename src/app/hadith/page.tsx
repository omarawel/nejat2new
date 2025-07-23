
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
import { Terminal, ChevronLeft, ChevronRight, Search, Eye, EyeOff, Play, Pause, Loader } from "lucide-react"
import { useEffect, useState, useMemo, FormEvent, useRef } from "react"
import { Hadith, getHadiths } from "./actions";
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
import { textToSpeech } from "@/ai/flows/text-to-speech"


type Language = "eng" | "urd" | "ara";

const HadithContent = ({ hadith, language }: { hadith: Hadith, language: Language }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<number | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const getText = () => {
    switch(language) {
      case "urd":
        return hadith.hadithUrdu
      case "ara":
        return hadith.hadithArabic
      case "eng":
      default:
        return hadith.hadithEnglish
    }
  }
  
  const getLanguageDirection = () => {
    switch(language) {
        case "urd":
        case "ara":
            return "rtl";
        default:
            return "ltr";
    }
  }

  const handlePlayAudio = async (hadithText: string, hadithId: number) => {
    if (playingAudio === `hadith-${hadithId}`) {
        audioRef.current?.pause();
        setPlayingAudio(null);
        return;
    }
    setLoadingAudio(hadithId);
    setAudioUrl(null);
    setPlayingAudio(null);

    try {
      const result = await textToSpeech(hadithText);
      setAudioUrl(result.audio);
      setPlayingAudio(`hadith-${hadithId}`);
    } catch (err) {
      console.error("Failed to get audio", err);
    } finally {
      setLoadingAudio(null);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [audioUrl]);

  const hadithText = getText();
  const isPlaying = playingAudio === `hadith-${hadith.id}`;
  const isLoading = loadingAudio === hadith.id;

  return (
    <div className="px-6 py-4 space-y-3 relative">
       {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setPlayingAudio(null)}
        />
      )}
        <div className="flex justify-between items-start">
            <p className={cn("text-foreground/90 flex-1", getLanguageDirection() === 'rtl' ? "text-right" : "", isHidden ? "opacity-0" : "opacity-100")}>{hadithText}</p>
            <div className="flex items-center ml-4">
                <Button variant="ghost" size="icon" onClick={() => handlePlayAudio(hadithText, hadith.id)} disabled={isLoading}>
                    {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : (isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />)}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsHidden(!isHidden)}>
                    {isHidden ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
            </div>
        </div>
    </div>
  )
}


export default function HadithPage() {
  const [hadiths, setHadiths] = useState<Hadith[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paginationInfo, setPaginationInfo] = useState<{currentPage: number, lastPage: number, from: number, to: number, total: number} | null>(null)
  const [openHadith, setOpenHadith] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [language, setLanguage] = useState<Language>("eng");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  useEffect(() => {
    async function fetchHadiths() {
      setLoading(true)
      setError(null)
      try {
        const data = await getHadiths(page, submittedSearchTerm);
        if (data.error) {
            throw new Error(data.error);
        }
        if (!data.hadiths) {
            throw new Error("No hadiths data received.");
        }
        
        const hadithsData = data.hadiths.data;

        setHadiths(hadithsData)
        
        const total = data.hadiths.total;
        const perPage = hadithsData.length > 0 ? (data.hadiths.to - data.hadiths.from + 1) : 25;
        const lastPage = Math.ceil(total / perPage);
        const from = data.hadiths.from;
        const to = data.hadiths.to;

        setPaginationInfo({
            currentPage: page,
            lastPage,
            from,
            to,
            total,
        })

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchHadiths()
  }, [page, submittedSearchTerm])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSubmittedSearchTerm(searchTerm);
  };

  const handleNextPage = () => {
    if (paginationInfo && paginationInfo.currentPage < paginationInfo.lastPage) {
      setPage(p => p + 1);
    }
  }

  const handlePrevPage = () => {
    if (paginationInfo && paginationInfo.currentPage > 1) {
      setPage(p => p - 1);
    }
  }

  const handleGoToPage = (e: FormEvent) => {
      e.preventDefault();
      const pageNum = parseInt(pageInput, 10);
      if (paginationInfo && !isNaN(pageNum) && pageNum >= 1 && pageNum <= paginationInfo.lastPage) {
          setPage(pageNum);
      } else {
         setPageInput(page.toString()); // Reset input to current page if invalid
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
                        <SelectItem value="eng">English</SelectItem>
                        <SelectItem value="urd">Urdu</SelectItem>
                        <SelectItem value="ara">Arabic</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div>
                <Label htmlFor="search-hadith">Search collection</Label>
                <form onSubmit={handleSearch} className="flex items-center gap-2 mt-1">
                    <Input
                        id="search-hadith"
                        placeholder="e.g. bukhari, muslim..."
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
            <Card className="flex-grow overflow-hidden">
                <CardContent className="p-0 h-full overflow-y-auto">
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
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={paginationInfo.currentPage <= 1 || loading}>
                            <ChevronLeft />
                        </Button>
                        <form onSubmit={handleGoToPage} className="flex items-center gap-1">
                           <Input 
                             type="number"
                             value={pageInput}
                             onChange={e => setPageInput(e.target.value)}
                             className="w-16 h-9 text-center"
                             min="1"
                             max={paginationInfo.lastPage}
                           />
                           <span className="text-muted-foreground text-sm">/ {paginationInfo.lastPage}</span>
                           <Button type="submit" variant="outline" size="sm" className="h-9">Go</Button>
                        </form>
                        <Button variant="outline" size="icon" onClick={handleNextPage} disabled={paginationInfo.currentPage >= paginationInfo.lastPage || loading}>
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
