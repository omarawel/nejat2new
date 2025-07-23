
"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { getUserDashboard, type DashboardConfig } from '@/lib/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Settings, LayoutGrid, Shield } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { allAdminTools } from '@/lib/admin-tools';
import { isAdmin } from '@/lib/admin';

const content = {
    de: {
        title: "Admin Dashboard",
        description: "Zentrale Verwaltung der Plattform.",
        loading: "Dashboard wird geladen...",
        accessDenied: "Zugriff verweigert",
        noAccess: "Du hast keine Berechtigung, auf diese Seite zuzugreifen.",
        goHome: "Zur Startseite",
        noSelection: "Dein Admin-Dashboard ist noch leer.",
        customize: "Dashboard anpassen",
    },
    en: {
        title: "Admin Dashboard",
        description: "Central management of the platform.",
        loading: "Loading dashboard...",
        accessDenied: "Access Denied",
        noAccess: "You do not have permission to access this page.",
        goHome: "Go to Homepage",
        noSelection: "Your admin dashboard is empty.",
        customize: "Customize Dashboard",
    }
};

const FeatureCard = ({ name, description }: { name: string, description: string }) => {
  return (
    <div className="flex flex-col p-4 border border-border rounded-lg bg-card text-card-foreground hover:bg-accent/90 cursor-pointer transition-colors h-28">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-2 text-sm text-muted-foreground flex-grow">{description}</p>
    </div>
  );
};

export default function AdminDashboardPage() {
    const { language } = useLanguage();
    const c = content[language];

    const [user, loadingAuth] = useAuthState(auth);
    const router = useRouter();
    const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig | null>(null);
    const [loadingDashboard, setLoadingDashboard] = useState(true);
    const [userIsAdmin, setUserIsAdmin] = useState(false);

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            router.push('/login');
            return;
        }

        isAdmin(user.uid).then(isAdm => {
            setUserIsAdmin(isAdm);
            if(isAdm) {
                const unsubscribe = getUserDashboard(user.uid, (config) => {
                    setDashboardConfig(config);
                    setLoadingDashboard(false);
                }, true);
                return () => unsubscribe();
            } else {
                setLoadingDashboard(false);
            }
        });

    }, [user, loadingAuth, router]);

    const displayedTools = allAdminTools.filter(tool => dashboardConfig?.selectedTools.includes(tool.key))
        .map(tool => ({ ...tool, name: tool.name, description: tool.description }))
        .sort((a, b) => a.name.localeCompare(b.name));


    if (loadingAuth || loadingDashboard) {
        return (
            <div className="flex-grow flex items-center justify-center p-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
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
                <div className="text-center sm:text-left">
                    <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center gap-3">
                        <Shield className="h-10 w-10" />
                        {c.title}
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-2xl">{c.description}</p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/admin/dashboard/customize">
                        <Settings className="mr-2 h-4 w-4" />
                        {c.customize}
                    </Link>
                </Button>
            </header>

            {displayedTools.length === 0 ? (
                <div className="text-center">
                    <Card className="max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>{c.noSelection}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href="/admin/dashboard/customize">
                                    <Settings className="mr-2 h-4 w-4" />
                                    {c.customize}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                     {displayedTools.map((tool) => {
                        const card = <FeatureCard name={tool.name} description={tool.description} />;
                        // In a real app, you would link to the actual admin pages.
                        // For now, we just display the card.
                        return <div key={tool.key}>{card}</div>;
                    })}
                </div>
            )}
        </div>
    )
}
