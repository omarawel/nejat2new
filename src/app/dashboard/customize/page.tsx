
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
import { allTools } from '@/lib/tools';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const content = {
    de: {
        title: "Dashboard anpassen",
        description: "Wähle die Funktionen und Fortschrittsanzeigen aus, die du auf deinem persönlichen Dashboard sehen möchtest.",
        loading: "Einstellungen werden geladen...",
        save: "Änderungen speichern",
        saving: "Speichern...",
        savedSuccess: "Dashboard gespeichert",
        savedSuccessDesc: "Deine Einstellungen wurden erfolgreich übernommen.",
        errorSaving: "Fehler beim Speichern.",
        loginRequired: "Du musst angemeldet sein, um dein Dashboard anzupassen.",
        login: "Anmelden",
        backToDashboard: "Zurück zum Dashboard",
        quickAccess: "Schnellzugriff",
        progressTrackers: "Fortschrittsanzeigen"
    },
    en: {
        title: "Customize Dashboard",
        description: "Select the features and progress trackers you want to see on your personal dashboard.",
        loading: "Loading settings...",
        save: "Save Changes",
        saving: "Saving...",
        savedSuccess: "Dashboard Saved",
        savedSuccessDesc: "Your settings have been successfully updated.",
        errorSaving: "Error saving settings.",
        loginRequired: "You need to be logged in to customize your dashboard.",
        login: "Login",
        backToDashboard: "Back to Dashboard",
        quickAccess: "Quick Access Features",
        progressTrackers: "Progress Trackers"
    }
};

export default function CustomizeDashboardPage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();

    const [user, loadingAuth] = useAuthState(auth);
    const router = useRouter();
    
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [loadingSettings, setLoadingSettings] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            setLoadingSettings(false);
            return;
        }

        const unsubscribe = getUserDashboard(user.uid, (config) => {
            setSelectedTools(config?.selectedTools || []);
            setLoadingSettings(false);
        });

        return () => unsubscribe();
    }, [user, loadingAuth]);
    
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
            await updateUserDashboard(user.uid, { selectedTools });
            toast({
                title: c.savedSuccess,
                description: c.savedSuccessDesc,
            });
        } catch (error) {
            console.error("Error saving dashboard config:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: c.errorSaving,
            });
        } finally {
            setIsSaving(false);
        }
    };

    const quickAccessTools = allTools
        .filter(tool => tool.type !== 'progress')
        .map(tool => ({ ...tool, name: tool[language as keyof typeof tool] || tool.en }))
        .sort((a, b) => a.name.localeCompare(b.name));

    const progressTools = allTools
        .filter(tool => tool.type === 'progress')
        .map(tool => ({ ...tool, name: tool[language as keyof typeof tool] || tool.en }))
        .sort((a, b) => a.name.localeCompare(b.name));


    if (loadingAuth || loadingSettings) {
        return (
            <div className="flex-grow flex items-center justify-center p-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
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
             <header className="mb-12">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {c.backToDashboard}
                    </Link>
                </Button>
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                        <Settings className="h-10 w-10" />
                        {c.title}
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
                </div>
            </header>

            <div className="space-y-12 max-w-6xl mx-auto">
                <div>
                    <h2 className="text-2xl font-bold mb-4">{c.progressTrackers}</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {progressTools.map(tool => (
                            <div key={tool.key} className="flex items-start space-x-3 p-4 rounded-md border hover:bg-accent">
                                <Switch
                                    id={tool.key}
                                    checked={selectedTools.includes(tool.key)}
                                    onCheckedChange={() => handleToggleTool(tool.key)}
                                    className="mt-1"
                                />
                                <Label htmlFor={tool.key} className="cursor-pointer flex flex-col">
                                    <span className="font-semibold">{tool.name}</span>
                                    <span className="text-sm text-muted-foreground">({tool.en})</span>
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">{c.quickAccess}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {quickAccessTools.map(tool => (
                            <div key={tool.key} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent border">
                                <Switch
                                    id={tool.key}
                                    checked={selectedTools.includes(tool.key)}
                                    onCheckedChange={() => handleToggleTool(tool.key)}
                                />
                                <Label htmlFor={tool.key} className="cursor-pointer flex flex-col items-start gap-1 text-sm">
                                   <span className="text-xl">{tool.icon}</span> 
                                   <span>{tool.name}</span>
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
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
