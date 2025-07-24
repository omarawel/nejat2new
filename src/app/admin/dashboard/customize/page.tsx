
"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { getUserDashboard, updateUserDashboard, type DashboardConfig } from '@/lib/dashboard';
import { Button } from '@/components/ui/button';
import { Loader2, Save, Settings, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { allAdminTools } from '@/lib/admin-tools';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { isAdmin } from '@/lib/admin';

const content = {
    de: {
        title: "Admin Dashboard anpassen",
        description: "Wähle die Verwaltungsmodule aus, die du auf deinem Dashboard sehen möchtest.",
        loading: "Einstellungen werden geladen...",
        save: "Änderungen speichern",
        saving: "Speichern...",
        savedSuccess: "Dashboard gespeichert",
        savedSuccessDesc: "Deine Einstellungen wurden erfolgreich übernommen.",
        errorSaving: "Fehler beim Speichern.",
        accessDenied: "Zugriff verweigert",
        noAccess: "Du hast keine Berechtigung, auf diese Seite zuzugreifen.",
        goHome: "Zur Startseite",
        backToDashboard: "Zurück zum Admin Dashboard",
    },
    en: {
        title: "Customize Admin Dashboard",
        description: "Select the management modules you want to see on your dashboard.",
        loading: "Loading settings...",
        save: "Save Changes",
        saving: "Saving...",
        savedSuccess: "Dashboard Saved",
        savedSuccessDesc: "Your settings have been successfully updated.",
        errorSaving: "Error saving settings.",
        accessDenied: "Access Denied",
        noAccess: "You do not have permission to access this page.",
        goHome: "Go to Homepage",
        backToDashboard: "Back to Admin Dashboard",
    }
};

export default function CustomizeAdminDashboardPage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();

    const [user, loadingAuth] = useAuthState(auth);
    const router = useRouter();
    
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [loadingSettings, setLoadingSettings] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
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
                    setSelectedTools(config?.selectedTools || []);
                    setLoadingSettings(false);
                }, true); // Use isAdmin flag
                return () => unsubscribe();
            } else {
                setLoadingSettings(false);
            }
        });
    }, [user, loadingAuth, router]);
    
    const handleToggleTool = (toolKey: string) => {
        setSelectedTools(prev => 
            prev.includes(toolKey) 
                ? prev.filter(key => key !== toolKey)
                : [...prev, toolKey]
        );
    };

    const handleSaveChanges = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            await updateUserDashboard(user.uid, { selectedTools }, true); // Use isAdmin flag
            toast({
                title: c.savedSuccess,
                description: c.savedSuccessDesc,
            });
        } catch (error) {
            console.error("Error saving admin dashboard config:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: c.errorSaving,
            });
        } finally {
            setIsSaving(false);
        }
    };

    const sortedTools = allAdminTools.sort((a, b) => a.name.localeCompare(b.name));

    if (loadingAuth || loadingSettings) {
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
             <header className="mb-12">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/admin/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {c.backToDashboard}
                    </Link>
                </Button>
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">
                        {c.title}
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {sortedTools.map(tool => (
                    <div key={tool.key} className="flex items-start space-x-3 p-4 rounded-md border hover:bg-accent">
                        <Switch
                            id={tool.key}
                            checked={selectedTools.includes(tool.key)}
                            onCheckedChange={() => handleToggleTool(tool.key)}
                            className="mt-1"
                        />
                        <div className="flex flex-col">
                            <Label htmlFor={tool.key} className="cursor-pointer font-semibold">
                               {tool.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <Button size="lg" onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {c.saving}
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            {c.save}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
