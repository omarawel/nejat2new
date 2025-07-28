
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';
import Link from 'next/link';

function toTitleCase(str: string) {
    return str.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default function AdminContentPage({ params }: { params: { slug: string } }) {
    const pageTitle = toTitleCase(params.slug);
    
    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Admin Dashboard
                </Link>
            </Button>
            <Card className="text-center">
                <CardHeader>
                     <Construction className="h-12 w-12 mx-auto text-primary" />
                    <CardTitle className="text-2xl">{pageTitle} Content</CardTitle>
                    <CardDescription>This feature is currently under construction.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The functionality to manage the content for the '{pageTitle}' page will be available here soon.</p>
                </CardContent>
            </Card>
        </div>
    )
}
