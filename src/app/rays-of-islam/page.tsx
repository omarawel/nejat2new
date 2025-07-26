
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import Image from 'next/image';

const content = {
    de: {
        pageTitle: "Die Strahlen Des Islam",
        pageDescription: "Entdecke die umfassenden Leitfäden zum Islam von Omar Awel.",
        backToFeatures: "Zurück zu den Funktionen",
        germanBook: {
            title: "Die Strahlen Des Islam",
            author: "von Omar Awel",
            description: "„Die Strahlen des Islam“ ist ein umfassender Leitfaden, der die grundlegenden Lehren und die tiefgründige Schönheit des Islam beleuchtet. Es richtet sich sowohl an Muslime, die ihr Wissen vertiefen möchten, als auch an Nicht-Muslime, die ein klares und authentisches Verständnis der Religion suchen.",
            topicsTitle: "Behandelte Themen umfassen:",
            topics: [
                "Die fünf Säulen des Islam",
                "Die Artikel des Glaubens (Iman)",
                "Die Bedeutung des Korans und der Sunna",
                "Spirituelle Konzepte wie Tawakkul und Sabr",
                "Der Charakter des Propheten Muhammad (ﷺ)"
            ],
            buttonText: "Jetzt auf Kindle lesen",
            link: "https://lesen.amazon.de/kp/kshare?asin=B0F195Y5MY&id=ks6jizhuxvh3xhy2fuvlsjprmi",
            googlePlayButtonText: "Jetzt auf Google Play lesen",
            googlePlayLink: "https://play.google.com/store/books/details/Omar_Awel_Die_Strahlen_des_Islam?id=jqJNEQAAQBAJ",
            image: "https://dl.dropboxusercontent.com/scl/fi/fwwpjh0x0cqllcocnj3as/IMG_20250717_094009_277.jpg?rlkey=4l9ep5b9el2ri2xuajmo7dqe8&dl=1"
        },
        englishBook: {
            title: "The Rays Of Islam: A Journey Through Faith, Science, and Humanity (English Edition)",
            author: "by Omar Awel",
            description: "'The Rays of Islam' is a comprehensive guide that illuminates the fundamental teachings and profound beauty of Islam. It is aimed at both Muslims seeking to deepen their knowledge and non-Muslims looking for a clear and authentic understanding of the religion.",
            topicsTitle: "Topics covered include:",
            topics: [
                "The Five Pillars of Islam",
                "The Articles of Faith (Iman)",
                "The importance of the Quran and Sunnah",
                "Spiritual concepts like Tawakkul and Sabr",
                "The character of the Prophet Muhammad (ﷺ)"
            ],
            buttonText: "Auf Kindle lesen (Englisch)",
            link: "https://lesen.amazon.de/kp/kshare?asin=B0F1HDQZQ7&id=bd54wv7j75bj5jqer3wa5bv7xu",
            googlePlayButtonText: "Auf Google Play lesen (Englisch)",
            googlePlayLink: "https://play.google.com/store/books/details/Omar_Awel_The_Rays_Of_Islam?id=wNhPEQAAQBAJ",
            image: "https://dl.dropboxusercontent.com/scl/fi/l7itt143gcy7dtusvrelq/IMG_20250717_094013_874.jpg?rlkey=dpp2528r5jyo7n83d1abga1gg&dl=1"
        }
    },
    en: {
        pageTitle: "The Rays Of Islam",
        pageDescription: "Discover the comprehensive guides to Islam by Omar Awel.",
        backToFeatures: "Back to Features",
         germanBook: {
            title: "Die Strahlen Des Islam (German Edition)",
            author: "by Omar Awel",
            description: "'The Rays of Islam' is a comprehensive guide that illuminates the fundamental teachings and profound beauty of Islam. It is aimed at both Muslims seeking to deepen their knowledge and non-Muslims looking for a clear and authentic understanding of the religion.",
            topicsTitle: "Topics covered include:",
            topics: [
                "The Five Pillars of Islam",
                "The Articles of Faith (Iman)",
                "The importance of the Quran and Sunnah",
                "Spiritual concepts like Tawakkul and Sabr",
                "The character of the Prophet Muhammad (ﷺ)"
            ],
            buttonText: "Read on Kindle (German)",
            link: "https://lesen.amazon.de/kp/kshare?asin=B0F195Y5MY&id=ks6jizhuxvh3xhy2fuvlsjprmi",
            googlePlayButtonText: "Read on Google Play (German)",
            googlePlayLink: "https://play.google.com/store/books/details/Omar_Awel_Die_Strahlen_des_Islam?id=jqJNEQAAQBAJ",
            image: "https://dl.dropboxusercontent.com/scl/fi/fwwpjh0x0cqllcocnj3as/IMG_20250717_094009_277.jpg?rlkey=4l9ep5b9el2ri2xuajmo7dqe8&dl=1"
        },
        englishBook: {
            title: "The Rays Of Islam: A Journey Through Faith, Science, and Humanity (English Edition)",
            author: "by Omar Awel",
            description: "'The Rays of Islam' is a comprehensive guide that illuminates the fundamental teachings and profound beauty of Islam. It is aimed at both Muslims seeking to deepen their knowledge and non-Muslims looking for a clear and authentic understanding of the religion.",
            topicsTitle: "Topics covered include:",
            topics: [
                "The Five Pillars of Islam",
                "The Articles of Faith (Iman)",
                "The importance of the Quran and Sunnah",
                "Spiritual concepts like Tawakkul and Sabr",
                "The character of the Prophet Muhammad (ﷺ)"
            ],
            buttonText: "Read on Kindle (English)",
            link: "https://lesen.amazon.de/kp/kshare?asin=B0F1HDQZQ7&id=bd54wv7j75bj5jqer3wa5bv7xu",
            googlePlayButtonText: "Read on Google Play",
            googlePlayLink: "https://play.google.com/store/books/details/Omar_Awel_The_Rays_Of_Islam?id=wNhPEQAAQBAJ",
            image: "https://dl.dropboxusercontent.com/scl/fi/l7itt143gcy7dtusvrelq/IMG_20250717_094013_874.jpg?rlkey=dpp2528r5jyo7n83d1abga1gg&dl=1"
        }
    }
}

const BookCard = ({ book }: { book: any }) => (
    <Card className="w-full flex flex-col">
        <CardHeader className="items-center text-center">
             <div className="mb-4">
                <Image 
                    src={book.image}
                    alt={`Book cover for ${book.title}`}
                    width={200}
                    height={300}
                    className="rounded-md shadow-lg"
                    data-ai-hint="book cover"
                />
             </div>
            <CardTitle className="text-3xl font-bold text-primary">{book.title}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">{book.author}</CardDescription>
        </CardHeader>
        <CardContent className="text-center px-6 md:px-8 flex-grow flex flex-col">
            <p className="mb-6 text-left flex-grow">{book.description}</p>

            <div className="text-left bg-accent/50 p-4 rounded-md mb-6">
                <h3 className="font-semibold mb-2">{book.topicsTitle}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                   {book.topics.map((topic: string, index: number) => <li key={index}>{topic}</li>)}
                </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="flex-1">
                    <Link href={book.link} target="_blank" rel="noopener noreferrer">
                        {book.buttonText}
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                {book.googlePlayLink && (
                     <Button asChild size="lg" variant="outline" className="flex-1">
                        <Link href={book.googlePlayLink} target="_blank" rel="noopener noreferrer">
                            {book.googlePlayButtonText}
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>
        </CardContent>
    </Card>
)

export default function RaysOfIslamPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {c.backToFeatures}
            </Link>
        </Button>
        <header className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-primary">{c.pageTitle}</h1>
            <p className="text-muted-foreground mt-2 text-lg">{c.pageDescription}</p>
        </header>
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8">
            <BookCard book={c.germanBook} />
            <BookCard book={c.englishBook} />
        </div>
    </div>
  );
}
