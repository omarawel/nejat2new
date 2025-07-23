
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
import { Terminal } from "lucide-react"
import { useEffect, useState, useMemo } from "react"

interface Collection {
  name: string;
  hasBooks: boolean;
  hasChapters: boolean;
  collection: {
      name: string;
      title: string;
      totalHadith: number;
  }[];
}

interface Book {
    book: {
        id: number;
        bookName: string;
        writerName: string;
        aboutWriter: string;
        writerDeath: string;
    }[];
    id: {
        collection: string;
        book: string;
    };
    bookNumber: string;
    bookName: string;
    numberOfhadith: number;
    hadith: Hadith[];
}

interface Hadith {
  chapterId: string;
  chapterTitle: string;
  urn: number;
  hadithNumber: string;
  englishNarrator: string;
  hadithText: string;
  similar: any[];
}


const CollectionDetailContent = ({ collectionName }: { collectionName: string }) => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openBook, setOpenBook] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchCollectionBooks() {
      if (!collectionName) return
      setLoading(true)
      setError(null)
      try {
        const apiKey = process.env.NEXT_PUBLIC_SUNNAH_API_KEY;
        if (!apiKey) {
            throw new Error('Sunnah.com API key is missing. Please add it to your environment variables.');
        }

        const response = await fetch(`https://api.sunnah.com/v1/collections/${collectionName}/books`, {
            headers: { 'X-API-Key': apiKey }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch collection books');
        }
        const data = await response.json()
        setBooks(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchCollectionBooks()
  }, [collectionName])

  if (loading) {
    return (
      <div className="divide-y divide-border">
          {[...Array(5)].map((_, i) => (
              <div key={i} className="px-6 py-4 space-y-3">
                  <Skeleton className="h-6 w-full" />
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
  
  if (!books) return null

  return (
    <div className="divide-y divide-border">
      <Accordion type="single" collapsible className="w-full" value={openBook} onValueChange={setOpenBook}>
      {books.map((book) => (
        <AccordionItem value={`book-${book.bookNumber}`} key={book.bookNumber}>
            <AccordionTrigger className="px-6 py-4 text-lg hover:no-underline">
              <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">{book.bookNumber}</span>
                  <div>
                    <p className="font-semibold text-left">{book.bookName}</p>
                    <p className="text-sm text-muted-foreground text-left">{book.numberOfhadith} Hadiths</p>
                  </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
                {/* Here you could fetch and display hadiths for the specific book */}
                <div className="px-6 py-4 text-muted-foreground">
                    Hadith listing for this book is not yet implemented.
                </div>
            </AccordionContent>
        </AccordionItem>
      ))}
      </Accordion>
    </div>
  )
}

export default function HadithPage() {
  const [collections, setCollections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("")
  const [openCollection, setOpenCollection] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchCollections() {
      setLoading(true)
      try {
        const apiKey = process.env.NEXT_PUBLIC_SUNNAH_API_KEY;
        if (!apiKey) {
            throw new Error('Sunnah.com API key is missing. Please add NEXT_PUBLIC_SUNNAH_API_KEY to your environment variables.');
        }

        const response = await fetch('https://api.sunnah.com/v1/collections', {
            headers: { 'X-API-Key': apiKey }
        })
        if (!response.ok) {
             if (response.status === 401) {
                throw new Error("Invalid Sunnah.com API key. Please check your environment variables.");
            }
            throw new Error("Failed to fetch Hadith collections. Please try again later.")
        }
        const data = await response.json()
        setCollections(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchCollections()
  }, [])

  const filteredCollections = useMemo(() => {
    if (!filter) return collections;
    return collections.filter(collection => 
      collection.title.toLowerCase().includes(filter.toLowerCase()) ||
      collection.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [collections, filter]);

  return (
    <div className="space-y-8 flex-grow flex flex-col p-4 sm:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Collection of Hadith</h1>
        <p className="text-muted-foreground mt-2">Guidance from the life and sayings of the Prophet Muhammad (ﷺ).</p>
      </header>

      <div className="pt-4">
          <Label htmlFor="search-collection">Filter Collections</Label>
          <Input 
            id="search-collection"
            placeholder="e.g. Bukhari, Muslim"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="mt-1"
          />
      </div>

      {error && (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error Loading Collections</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="flex-grow">
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full" value={openCollection} onValueChange={setOpenCollection}>
            {loading ? (
                [...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4 border-b">
                        <Skeleton className="h-10 w-24 rounded-md" />
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-48" />
                           <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                ))
            ) : (
                filteredCollections.map((collection) => (
                <AccordionItem value={`item-${collection.name}`} key={collection.name}>
                    <AccordionTrigger className="px-6 py-4 text-lg hover:no-underline">
                    <div className="flex items-center gap-4">
                        <span className="flex h-10 items-center justify-center rounded-md bg-primary/10 text-primary font-bold px-4">{collection.name}</span>
                        <div>
                          <p className="font-semibold text-left">{collection.title}</p>
                          <p className="text-sm text-muted-foreground text-left">{collection.totalHadith} Hadiths</p>
                        </div>
                    </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {openCollection === `item-${collection.name}` && (
                          <CollectionDetailContent collectionName={collection.name} />
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
