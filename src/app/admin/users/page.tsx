
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';
import Link from 'next/link';

export default function AdminUsersPage() {
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
                    <CardTitle className="text-2xl">User Management</CardTitle>
                    <CardDescription>This feature is currently under construction.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The functionality to manage user roles and permissions will be available here soon.</p>
                </CardContent>
            </Card>
        </div>
    )
}
