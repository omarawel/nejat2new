
"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Terminal, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import type { Hadith, HadithApiResponse } from "./actions"
import { getHadiths } from "./actions"

export default function HadithPage() {
  const [hadiths, setHadiths] = useState<Hadith[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [paginationInfo, setPaginationInfo] = useState<{next: boolean, prev: boolean, from: number, to: number, total: number} | null>(null)
  
  useEffect(() => {
    async function fetchHadiths() {
      setLoading(true)
      setError(null)
      try {
        const data = await getHadiths(currentPage);
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
  }, [currentPage])
  
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

      {error && (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error Loading Hadiths</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-5/6" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      ) : (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hadiths.map((hadith) => (
                    <Card key={hadith.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Hadith {hadith.hadithNumber}</CardTitle>
                            <CardDescription>From the book of {hadith.book.bookName}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-foreground/90">{hadith.hadithEnglish}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {paginationInfo && (
                <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-muted-foreground">
                        Showing {paginationInfo.from} to {paginationInfo.to} of {paginationInfo.total} hadiths
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={!paginationInfo.prev}>
                            <ChevronLeft />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleNextPage} disabled={!paginationInfo.next}>
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
