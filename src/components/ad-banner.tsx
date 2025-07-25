
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
    return <Skeleton className="w-full h-28" />;
  }

  if (!ad) {
    return null; // Don't render anything if no ad is found for this slot
  }

  return (
    <div className={className}>
        <Card className="bg-muted/50 overflow-hidden">
             <CardContent className="p-4 flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                    <Image 
                        src={ad.imageUrl}
                        alt={ad.title}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
                <div className="text-left flex-grow">
                    <h4 className="font-bold text-base">{ad.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-2 line-clamp-2">{ad.description}</p>
                    <Button asChild size="sm" variant="outline">
                        <Link href={ad.linkUrl} target="_blank" rel="noopener noreferrer">
                            {ad.actionButtonText}
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
