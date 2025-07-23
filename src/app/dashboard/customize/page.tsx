
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
        description: "Wähle die Funktionen aus, die du auf deinem persönlichen Dashboard sehen möchtest.",
        loading: "Einstellungen werden geladen...",
        save: "Änderungen speichern",
        saving: "Speichern...",
        savedSuccess: "Dashboard gespeichert",
        savedSuccessDesc: "Deine Einstellungen wurden erfolgreich übernommen.",
        errorSaving: "Fehler beim Speichern.",
        loginRequired: "Du musst angemeldet sein, um dein Dashboard anzupassen.",
        login: "Anmelden",
        backToDashboard: "Zurück zum Dashboard",
    },
    en: {
        title: "Customize Dashboard",
        description: "Select the features you want to see on your personal dashboard.",
        loading: "Loading settings...",
        save: "Save Changes",
        saving: "Saving...",
        savedSuccess: "Dashboard Saved",
        savedSuccessDesc: "Your settings have been successfully updated.",
        errorSaving: "Error saving settings.",
        loginRequired: "You need to be logged in to customize your dashboard.",
        login: "Login",
        backToDashboard: "Back to Dashboard",
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

    const localizedTools = allTools
        .map(tool => ({ ...tool, name: tool[language] || tool.en }))
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-4 max-w-6xl mx-auto">
                {localizedTools.map(tool => (
                    <div key={tool.key} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                        <Switch
                            id={tool.key}
                            checked={selectedTools.includes(tool.key)}
                            onCheckedChange={() => handleToggleTool(tool.key)}
                        />
                        <Label htmlFor={tool.key} className="cursor-pointer flex items-center gap-2 text-sm">
                           <span className="text-lg">{tool.icon}</span> 
                           <span>{tool.name}</span>
                        </Label>
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

