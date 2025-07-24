
"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QiblaPage() {
    return (
        <div className="container mx-auto px-4 py-8">
             <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Features
                </Link>
            </Button>
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Qibla Page (Deprecated)</CardTitle>
                    <CardDescription>This page is no longer in use.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Please use the <Link href="/compass" className="text-primary underline">Qibla Compass</Link> or the <Link href="/ar-qibla" className="text-primary underline">AR Qibla Finder</Link>.</p>
                </CardContent>
            </Card>
        </div>
    );
}
