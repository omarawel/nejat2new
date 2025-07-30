
"use client"

import { useEffect, useState } from 'react';
import { getAdBySlot, type Ad } from '@/lib/ads';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { getUserSubscription } from '@/lib/user-usage';
import { isAdmin } from '@/lib/admin';

interface AdBannerProps {
  slotId: string;
  className?: string;
}

const transformDropboxUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    try {
        const urlObject = new URL(url);
        if (urlObject.hostname.includes('dropbox.com') && urlObject.searchParams.has('dl')) {
            urlObject.searchParams.set('dl', '1');
            return urlObject.toString();
        }
        return url;
    } catch (e) {
        console.error("Invalid URL for transformation:", url);
        return url;
    }
};

export function AdBanner({ slotId, className }: AdBannerProps) {
  const [user, loadingAuth] = useAuthState(auth);
  const [ad, setAd] = useState<Ad | null>(null);
  const [loadingAd, setLoadingAd] = useState(true);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const checkSubscriptionAndFetchAd = async () => {
        if(loadingAuth) return;

        let hasAdFreePlan = false;
        if (user) {
            const userIsAdmin = await isAdmin(user.uid);
            if (userIsAdmin) {
                hasAdFreePlan = true;
            } else {
                const subscription = await getUserSubscription(user.uid);
                if(subscription?.status === 'active' && (subscription.planId === 'pro' || subscription.planId === 'patron')) {
                    hasAdFreePlan = true;
                }
            }
        }

        if (hasAdFreePlan) {
            setShowAd(false);
            setLoadingAd(false);
            return;
        }

        // If user is not logged in, or has no ad-free plan, show the ad
        setShowAd(true);
        const unsubscribe = getAdBySlot(slotId, (fetchedAd) => {
          if (fetchedAd) {
              if (fetchedAd.imageUrl) {
                fetchedAd.imageUrl = transformDropboxUrl(fetchedAd.imageUrl);
              }
              if (fetchedAd.videoUrl) {
                fetchedAd.videoUrl = transformDropboxUrl(fetchedAd.videoUrl);
              }
          }
          setAd(fetchedAd);
          setLoadingAd(false);
        });

        return () => unsubscribe();
    };
    
    checkSubscriptionAndFetchAd();

  }, [slotId, user, loadingAuth]);

  if (!showAd) {
      return null;
  }
  
  if (loadingAd) {
    return <Skeleton className="w-full h-28" />;
  }

  if (!ad) {
    return null; // Don't render anything if no ad is found for this slot
  }

  return (
    <div className={className}>
        <Card className="bg-muted/50 overflow-hidden">
             <CardContent className="p-4 flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-black rounded-md">
                   {ad.type === 'video' && ad.videoUrl ? (
                        <video 
                            src={ad.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain rounded-md"
                        />
                   ) : ad.imageUrl ? (
                        <Image 
                            src={ad.imageUrl}
                            alt={ad.title}
                            fill
                            className="object-contain rounded-md"
                        />
                   ) : null}
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
    </div> // This is the line before the error
  );
}
