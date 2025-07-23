
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
import { Loader2, Settings, LayoutGrid, Star, BookOpen, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { allTools } from '@/lib/tools';
import { Progress } from '@/components/ui/progress';

const content = {
    de: {
        title: "Mein Dashboard",
        description: "Deine persönliche Zentrale für den schnellen Zugriff auf deine Lieblingsfunktionen.",
        loading: "Dashboard wird geladen...",
        loginRequired: "Du musst angemeldet sein, um dein Dashboard zu sehen.",
        login: "Anmelden",
        noSelection: "Dein Dashboard ist noch leer.",
        customize: "Passe dein Dashboard an",
        yourActivity: "Deine Aktivitäten",
        latestFavorites: "Neueste Favoriten",
        noFavorites: "Keine Favoriten gespeichert.",
        viewAll: "Alle ansehen",
        yourHatimGroups: "Deine Hatim-Gruppen",
        noHatim: "Du nimmst an keinem Hatim teil.",
        completed: "abgeschlossen"
    },
    en: {
        title: "My Dashboard",
        description: "Your personal hub for quick access to your favorite features.",
        loading: "Loading dashboard...",
        loginRequired: "You need to be logged in to see your dashboard.",
        login: "Login",
        noSelection: "Your dashboard is empty.",
        customize: "Customize Your Dashboard",
        yourActivity: "Your Activity",
        latestFavorites: "Latest Favorites",
        noFavorites: "No favorites saved.",
        viewAll: "View All",
        yourHatimGroups: "Your Hatim Groups",
        noHatim: "You are not participating in any Hatim.",
        completed: "completed"
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
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [hatimGroups, setHatimGroups] = useState<HatimGroup[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            setLoadingData(false);
            return;
        }

        const unsubDashboard = getUserDashboard(user.uid, setDashboardConfig);
        const unsubFavorites = getFavorites(user.uid, (favs) => setFavorites(favs.slice(0, 3))); // Get latest 3
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

    const displayedTools = allTools.filter(tool => dashboardConfig?.selectedTools.includes(tool.key))
        .map(tool => ({ ...tool, name: tool[language] || tool.en }))
        .sort((a, b) => a.name.localeCompare(b.name));


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

            {displayedTools.length > 0 && (
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12">
                     {displayedTools.map((tool) => {
                        const card = <FeatureCard icon={tool.icon} name={tool.name} />;
                        if (tool.href) {
                            return <Link key={tool.key} href={tool.href}>{card}</Link>
                        }
                        return <div key={tool.key} className="opacity-50 cursor-not-allowed">{card}</div>;
                    })}
                </div>
            )}
            
            <h2 className="text-3xl font-bold mb-6">{c.yourActivity}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Star /> {c.latestFavorites}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {favorites.length > 0 ? (
                             <ul className="space-y-3">
                                {favorites.map(fav => (
                                    <li key={fav.id} className="p-3 border rounded-md bg-muted/50 text-sm text-muted-foreground truncate">
                                        {fav.text}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-muted-foreground">{c.noFavorites}</p>}
                    </CardContent>
                    <CardFooter>
                         <Button variant="ghost" asChild>
                           <Link href="/favorites">{c.viewAll} <ChevronRight className="ml-1 h-4 w-4" /></Link>
                       </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen /> {c.yourHatimGroups}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         {hatimGroups.length > 0 ? (
                            <ul className="space-y-4">
                                {hatimGroups.map(group => {
                                    const completed = group.juzs.filter(j => j.assignedTo).length;
                                    const progress = (completed / 30) * 100;
                                    return (
                                        <li key={group.id}>
                                            <p className="font-semibold">{group.title}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Progress value={progress} className="w-full" />
                                                <span>{completed}/30 {c.completed}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                         ) : <p className="text-muted-foreground">{c.noHatim}</p>}
                    </CardContent>
                    <CardFooter>
                       <Button variant="ghost" asChild>
                           <Link href="/hatim">{c.viewAll} <ChevronRight className="ml-1 h-4 w-4" /></Link>
                       </Button>
                    </CardFooter>
                </Card>
            </div>

        </div>
    )
}

    