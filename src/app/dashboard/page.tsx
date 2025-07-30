
"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { getUserDashboard, type DashboardConfig } from '@/lib/dashboard';
import { getFavorites, type Favorite } from '@/lib/favorites';
import { getHatimGroups, type HatimGroup } from '@/lib/hatim';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Settings, LayoutGrid, Star, BookOpen, ChevronRight, History, BookCopy } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { allTools } from '@/lib/tools';
import { Progress } from '@/components/ui/progress';
import { getLastRead, type LastReadProgress } from '@/lib/progress';
import { ProgressCard } from '@/components/dashboard/progress-card';

const content = {
    de: {
        title: "Mein Dashboard",
        description: "Deine persönliche Zentrale für den schnellen Zugriff und deine Lernfortschritte.",
        loading: "Dashboard wird geladen...",
        loginRequired: "Du musst angemeldet sein, um dein Dashboard zu sehen.",
        login: "Anmelden",
        noSelection: "Dein Dashboard ist noch leer.",
        customize: "Passe dein Dashboard an",
        quickAccess: "Schnellzugriff",
        progressTrackers: "Dein Fortschritt",
    },
    en: {
        title: "My Dashboard",
        description: "Your personal hub for quick access and your learning progress.",
        loading: "Loading dashboard...",
        loginRequired: "You need to be logged in to see your dashboard.",
        login: "Login",
        noSelection: "Your dashboard is empty.",
        customize: "Customize Your Dashboard",
        quickAccess: "Quick Access",
        progressTrackers: "Your Progress",
    }
};

const defaultProgressKeys = ['quran', 'hadith', 'hisnul_muslim', 'favorites', 'hatim'];

const FeatureCard = ({ icon, name, toolKey }: { icon: string, name: string, toolKey: string }) => {
  return (
    <div className="flex flex-col justify-center items-center p-2 border border-border rounded-lg bg-card text-card-foreground hover:bg-accent/90 cursor-pointer transition-colors h-24">
      <span className="text-3xl">{icon}</span>
      <span className="mt-2 text-sm text-center font-medium leading-tight break-words">{name}</span>
    </div>
  );
};

export default function DashboardPage() {
    const { language } = useLanguage();
    const c = content[language];

    const [user, loadingAuth] = useAuthState(auth);
    const router = useRouter();
    const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig | null>(null);
    const [loadingData, setLoadingData] = useState(true);

    // Data for progress cards
    const [lastReadProgress, setLastReadProgress] = useState<LastReadProgress>({});
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [hatimGroups, setHatimGroups] = useState<HatimGroup[]>([]);

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            setLoadingData(false);
            return;
        }

        const unsubDashboard = getUserDashboard(user.uid, setDashboardConfig);
        
        const lastReadData = getLastRead();
        setLastReadProgress(lastReadData);

        const unsubFavorites = getFavorites(user.uid, (favs) => setFavorites(favs.slice(0, 3)));
        const unsubHatim = getHatimGroups((groups) => {
            const userGroups = groups.filter(g => g.juzs.some(j => j.assignedTo === user.displayName));
            setHatimGroups(userGroups);
        });

        setLoadingData(false);

        return () => {
            unsubDashboard();
            unsubFavorites();
            unsubHatim();
        };
    }, [user, loadingAuth]);

    const getDisplayedTools = () => {
        const userHasCustomized = dashboardConfig && dashboardConfig.selectedTools.length > 0;
        
        const toolKeysToShow = userHasCustomized 
            ? dashboardConfig.selectedTools 
            : allTools.filter(tool => tool.type === 'progress').map(t => t.key).concat(['quran', 'hadith', 'hisnul_muslim']); // Default quick links
        
        return allTools
            .filter(tool => toolKeysToShow.includes(tool.key))
            .map(tool => ({ ...tool, name: tool[language as keyof typeof tool] || tool.en }))
            .sort((a, b) => {
                const aIsProgress = a.type === 'progress';
                const bIsProgress = b.type === 'progress';
                if (aIsProgress && !bIsProgress) return -1;
                if (!aIsProgress && bIsProgress) return 1;
                return a.name.localeCompare(b.name);
            });
    };

    const displayedTools = getDisplayedTools();
    const progressTools = displayedTools.filter(t => t.type === 'progress');
    const quickAccessTools = displayedTools.filter(t => t.type !== 'progress');


    if (loadingAuth || loadingData) {
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
    
    const renderCard = (tool: (typeof displayedTools)[0]) => {
        switch(tool.key) {
            case 'quran':
                return <ProgressCard title={tool.name} progress={lastReadProgress.quran} href={tool.href || '#'} icon={BookOpen} />;
            case 'hadith':
                return <ProgressCard title={tool.name} progress={lastReadProgress.hadith} href={tool.href || '#'} icon={BookCopy} />;
            case 'hisnul_muslim':
                return <ProgressCard title={tool.name} progress={lastReadProgress.hisnul_muslim} href={tool.href || '#'} icon={History} />;
            case 'favorites':
                return <ProgressCard title={tool.name} favorites={favorites} href={tool.href || '#'} icon={Star} />;
             case 'hatim':
                return <ProgressCard title={tool.name} hatimGroups={hatimGroups} href={tool.href || '#'} icon={BookOpen} />;
            default:
                const card = <FeatureCard icon={tool.icon} name={tool.name} toolKey={tool.key} />;
                if (tool.href) {
                    return <Link key={tool.key} href={tool.href} className="col-span-1">{card}</Link>
                }
                return <div key={tool.key} className="opacity-50 cursor-not-allowed col-span-1">{card}</div>;
        }
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">
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
                <div className="space-y-12">
                    {progressTools.length > 0 && (
                        <div>
                             <h2 className="text-2xl font-bold mb-4">{c.progressTrackers}</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {progressTools.map(tool => (
                                    <div key={tool.key} className="col-span-1">{renderCard(tool)}</div>
                                ))}
                             </div>
                        </div>
                    )}

                     {quickAccessTools.length > 0 && (
                        <div>
                             <h2 className="text-2xl font-bold mb-4">{c.quickAccess}</h2>
                             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-4">
                                {quickAccessTools.map(tool => renderCard(tool))}
                             </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
