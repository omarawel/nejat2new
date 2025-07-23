
"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { getUserDashboard, type DashboardConfig } from '@/lib/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Settings, LayoutGrid } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { allTools } from '@/lib/tools';

const content = {
    de: {
        title: "Mein Dashboard",
        description: "Deine persönliche Zentrale für den schnellen Zugriff auf deine Lieblingsfunktionen.",
        loading: "Dashboard wird geladen...",
        loginRequired: "Du musst angemeldet sein, um dein Dashboard zu sehen.",
        login: "Anmelden",
        noSelection: "Dein Dashboard ist noch leer.",
        customize: "Passe dein Dashboard an",
    },
    en: {
        title: "My Dashboard",
        description: "Your personal hub for quick access to your favorite features.",
        loading: "Loading dashboard...",
        loginRequired: "You need to be logged in to see your dashboard.",
        login: "Login",
        noSelection: "Your dashboard is empty.",
        customize: "Customize Your Dashboard",
    }
};

const FeatureCard = ({ icon, name }: { icon: string, name: string }) => {
  return (
    <div className="flex flex-col justify-center items-center p-2 border border-border rounded-lg bg-card text-card-foreground hover:bg-accent/90 cursor-pointer transition-colors h-24">
      <span className="text-3xl">{icon}</span>
      <span className="mt-2 text-sm text-center font-medium leading-tight">{name}</span>
    </div>
  );
};

export default function DashboardPage() {
    const { language } = useLanguage();
    const c = content[language];

    const [user, loadingAuth] = useAuthState(auth);
    const router = useRouter();
    const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig | null>(null);
    const [loadingDashboard, setLoadingDashboard] = useState(true);

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            setLoadingDashboard(false);
            return;
        }

        const unsubscribe = getUserDashboard(user.uid, (config) => {
            setDashboardConfig(config);
            setLoadingDashboard(false);
        });

        return () => unsubscribe();
    }, [user, loadingAuth]);

    const displayedTools = allTools.filter(tool => dashboardConfig?.selectedTools.includes(tool.key))
        .map(tool => ({ ...tool, name: tool[language] || tool.en }))
        .sort((a, b) => a.name.localeCompare(b.name));


    if (loadingAuth || loadingDashboard) {
        return (
            <div className="flex-grow flex items-center justify-center p-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>{c.title}</CardTitle>
                        <CardDescription>{c.loginRequired}</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Button asChild>
                           <Link href="/login">{c.login}</Link>
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
                        <LayoutGrid className="h-10 w-10" />
                        {c.title}
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-2xl">{c.description}</p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/dashboard/customize">
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
                                <Link href="/dashboard/customize">
                                    <Settings className="mr-2 h-4 w-4" />
                                    {c.customize}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                     {displayedTools.map((tool) => {
                        const card = <FeatureCard icon={tool.icon} name={tool.name} />;
                        if (tool.href) {
                            return <Link key={tool.key} href={tool.href}>{card}</Link>
                        }
                        return <div key={tool.key} className="opacity-50 cursor-not-allowed">{card}</div>;
                    })}
                </div>
            )}
        </div>
    )
}
