
"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { isAdmin } from '@/lib/admin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


const content = {
    de: {
        title: "Kontakt & Feedback",
        description: "Verwalte Nutzeranfragen und sende Nachrichten.",
        backToDashboard: "Zurück zum Admin Dashboard",
        accessDenied: "Zugriff verweigert",
        noAccess: "Du hast keine Berechtigung, auf diese Seite zuzugreifen.",
        goHome: "Zur Startseite",
        loading: "Lade...",
        inDevelopment: "Funktion in Entwicklung",
        inDevelopmentDesc: "Diese Funktion wird derzeit entwickelt. In Kürze kannst du hier Nutzeranfragen einsehen und direkt mit Nutzern kommunizieren.",
    },
    en: {
        title: "Contact & Feedback",
        description: "Manage user inquiries and send messages.",
        backToDashboard: "Back to Admin Dashboard",
        accessDenied: "Access Denied",
        noAccess: "You do not have permission to access this page.",
        goHome: "Go to Homepage",
        loading: "Loading...",
        inDevelopment: "Feature in Development",
        inDevelopmentDesc: "This feature is currently under development. Soon, you will be able to view user inquiries and communicate directly with users here.",
    }
};

export default function AdminContactPage() {
    const { language } = useLanguage();
    const c = content[language];
    const router = useRouter();

    const [user, loadingAuth] = useAuthState(auth);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            router.push('/login');
            return;
        }

        isAdmin(user.uid).then(isAdm => {
            setUserIsAdmin(isAdm);
            setLoading(false);
        });
    }, [user, loadingAuth, router]);


    if (loadingAuth || loading) {
        return (
            <div className="flex-grow flex items-center justify-center p-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!userIsAdmin) {
         return (
            <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>{c.accessDenied}</CardTitle>
                        <CardDescription>{c.noAccess}</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Button asChild>
                           <Link href="/">{c.goHome}</Link>
                       </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-4">
                <div>
                    <Button asChild variant="ghost" className="mb-4">
                        <Link href="/admin/dashboard">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {c.backToDashboard}
                        </Link>
                    </Button>
                    <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center gap-3">
                       <MessageSquare className="h-10 w-10" />
                       {c.title}
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-2xl">{c.description}</p>
                </div>
            </header>

            <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                     <Alert>
                        <Mail className="h-4 w-4" />
                        <AlertTitle>{c.inDevelopment}</AlertTitle>
                        <AlertDescription>
                          {c.inDevelopmentDesc}
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
    );
}
