
"use client"

// This page is deprecated and will be removed in the future.
// The functionality has been moved to /hijri-converter

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function IslamicCalendarPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/hijri-converter');
    }, [router]);

    return (
        <div className="flex-grow flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
}
