"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HijriConverterPage() {
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
                    <CardTitle>Hijri Converter (Deprecated)</CardTitle>
                    <CardDescription>This page is no longer in use.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Please use the <Link href="/hijri-calendar" className="text-primary underline">Hijri Calendar</Link>.</p>
                </CardContent>
            </Card>
        </div>
    );
}
