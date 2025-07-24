
"use client"

import { useEffect, useState } from 'react';
import { getAdBySlot, type Ad } from '@/lib/ads';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';

interface AdBannerProps {
  slotId: string;
  className?: string;
}

// Function to transform Dropbox URL to a direct link
const transformDropboxUrl = (url: string): string => {
    try {
        const urlObject = new URL(url);
        if (urlObject.hostname === 'www.dropbox.com') {
            urlObject.hostname = 'dl.dropboxusercontent.com';
            // Remove parameters like 'rlkey', 'st', 'dl=0' which are for the preview page
            urlObject.search = ''; 
        }
        return urlObject.toString();
    } catch (e) {
        console.error("Invalid URL for transformation:", url);
        return url; // Return original URL if parsing fails
    }
};

export function AdBanner({ slotId, className }: AdBannerProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getAdBySlot(slotId, (fetchedAd) => {
      if (fetchedAd) {
        // Transform the imageUrl if it's a Dropbox link
        fetchedAd.imageUrl = transformDropboxUrl(fetchedAd.imageUrl);
      }
      setAd(fetchedAd);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [slotId]);

  if (loading) {
    return <Skeleton className="w-full h-24" />;
  }

  if (!ad) {
    return null; // Don't render anything if no ad is found for this slot
  }

  return (
    <div className={className}>
        <Card className="bg-muted/50">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-32 h-32 sm:h-20 flex-shrink-0">
                    <Image 
                        src={ad.imageUrl}
                        alt={ad.title}
                        fill
                        className="rounded-md object-cover"
                    />
                </div>
                <div className="flex-grow text-center sm:text-left">
                    <h4 className="font-bold text-lg">{ad.title}</h4>
                    <p className="text-sm text-muted-foreground">{ad.description}</p>
                </div>
                <Button asChild className="w-full sm:w-auto flex-shrink-0">
                    <Link href={ad.linkUrl} target="_blank" rel="noopener noreferrer">
                        {ad.actionButtonText}
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
