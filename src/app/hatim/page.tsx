
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/components/language-provider';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { getHatimGroups, takeJuz, releaseJuz, type HatimGroup, type Juz } from '@/lib/hatim';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreateHatimForm } from '@/components/hatim/create-hatim-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const content = {
    de: {
        title: "Hatim - Gemeinsames Lesen",
        description: "Organisiere oder nimm an gemeinschaftlichen Koran-Lesungen teil, um die Belohnung zu teilen.",
        backToFeatures: "Zurück zu den Funktionen",
        createHatim: "Neuen Hatim starten",
        takeJuz: "Juz nehmen",
        releaseJuz: "Juz freigeben",
        takenByYou: "Von dir genommen",
        takenBy: "Genommen von:",
        completed: "Abgeschlossen",
        progress: "Fortschritt",
        toastJuzTaken: "Du hast Juz {juzId} genommen!",
        toastJuzReleased: "Du hast Juz {juzId} freigegeben.",
        errorJuz: "Fehler beim Aktualisieren des Juz.",
        loadingGroups: "Hatim-Gruppen werden geladen...",
        noGroups: "Keine Hatim-Gruppen verfügbar. Starte eine neue!",
        loginToParticipate: "Melde dich an, um teilzunehmen.",
        confirmReleaseTitle: "Bist du sicher?",
        confirmReleaseDesc: "Möchtest du Juz {juzId} wirklich freigeben, damit ihn jemand anderes lesen kann?",
        cancel: "Abbrechen",
        confirm: "Freigeben"
    },
    en: {
        title: "Hatim - Communal Reading",
        description: "Organize or join communal Quran readings to share the reward.",
        backToFeatures: "Back to Features",
        createHatim: "Start a New Hatim",
        takeJuz: "Take Juz",
        releaseJuz: "Release Juz",
        takenByYou: "Taken by you",
        takenBy: "Taken by:",
        completed: "Completed",
        progress: "Progress",
        toastJuzTaken: "You have taken Juz {juzId}!",
        toastJuzReleased: "You have released Juz {juzId}.",
        errorJuz: "Error updating Juz.",
        loadingGroups: "Loading Hatim groups...",
        noGroups: "No Hatim groups available. Start a new one!",
        loginToParticipate: "Log in to participate.",
        confirmReleaseTitle: "Are you sure?",
        confirmReleaseDesc: "Do you really want to release Juz {juzId} so someone else can read it?",
        cancel: "Cancel",
        confirm: "Release"
    }
}


export default function HatimPage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    
    const [user, loadingAuth] = useAuthState(auth);
    const [hatimGroups, setHatimGroups] = useState<HatimGroup[]>([]);
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [isCreateFormOpen, setCreateFormOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = getHatimGroups((groups) => {
            setHatimGroups(groups);
            setLoadingGroups(false);
        });
        return () => unsubscribe();
    }, []);


    const handleJuzClick = async (groupId: string, juz: Juz) => {
        if (!user) {
            toast({ title: c.loginToParticipate, variant: 'destructive'});
            return;
        }

        try {
            if (juz.assignedTo === user.displayName) {
                // This will be handled by the AlertDialog now
            } else if (!juz.assignedTo) {
                await takeJuz(groupId, juz.id, user.displayName!);
                toast({ title: c.toastJuzTaken.replace('{juzId}', juz.id.toString()) });
            }
        } catch (e) {
            console.error(e);
            toast({ title: c.errorJuz, variant: 'destructive'});
        }
    };
    
    const handleReleaseJuz = async (groupId: string, juzId: number) => {
        try {
            await releaseJuz(groupId, juzId);
            toast({ title: c.toastJuzReleased.replace('{juzId}', juzId.toString()), variant: 'default' });
        } catch (e) {
            console.error(e);
            toast({ title: c.errorJuz, variant: 'destructive'});
        }
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <Dialog open={isCreateFormOpen} onOpenChange={setCreateFormOpen}>
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
                 <div className="mt-6">
                    <DialogTrigger asChild>
                        <Button size="lg" disabled={!user}>
                            <PlusCircle className="mr-2 h-5 w-5" />
                            {c.createHatim}
                        </Button>
                    </DialogTrigger>
                     {!user && !loadingAuth && <p className="text-sm text-muted-foreground mt-2">{c.loginToParticipate}</p>}
                </div>
            </header>

            {loadingGroups || loadingAuth ? (
                <div className="flex justify-center items-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : hatimGroups.length === 0 ? (
                 <Card className="text-center max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>{c.noGroups}</CardTitle>
                    </CardHeader>
                 </Card>
            ) : (
                <div className="space-y-8">
                    {hatimGroups.map(group => {
                        const completedJuzs = group.juzs.filter(j => j.assignedTo !== null).length;
                        const progress = (completedJuzs / 30) * 100;

                        return (
                            <Card key={group.id} className="shadow-lg">
                                <CardHeader>
                                    <CardTitle>{group.title}</CardTitle>
                                    <CardDescription>{group.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-muted-foreground">{c.progress}</span>
                                            <span className="text-sm font-semibold">{completedJuzs} / 30</span>
                                        </div>
                                        <Progress value={progress} />
                                    </div>
                                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
                                        {group.juzs.map(juz => {
                                            const isTakenByCurrentUser = juz.assignedTo === user?.displayName;
                                            const isTaken = !!juz.assignedTo;
                                            
                                            const buttonContent = (
                                                 <Button
                                                    variant={isTaken ? (isTakenByCurrentUser ? 'default' : 'secondary') : 'outline'}
                                                    className="flex flex-col h-16 w-full"
                                                    onClick={() => !isTakenByCurrentUser && handleJuzClick(group.id, juz)}
                                                    disabled={!user || (isTaken && !isTakenByCurrentUser)}
                                                    title={isTaken ? `${c.takenBy} ${juz.assignedTo}` : c.takeJuz}
                                                >
                                                    <span className="text-lg font-bold">{juz.id}</span>
                                                    {isTaken && <span className="text-xs truncate">{juz.assignedTo}</span>}
                                                </Button>
                                            );

                                            if (isTakenByCurrentUser) {
                                                return (
                                                    <AlertDialog key={juz.id}>
                                                        <AlertDialogTrigger asChild>{buttonContent}</AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>{c.confirmReleaseTitle}</AlertDialogTitle>
                                                                <AlertDialogDescription>{c.confirmReleaseDesc.replace('{juzId}', juz.id.toString())}</AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>{c.cancel}</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleReleaseJuz(group.id, juz.id)}>{c.confirm}</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                )
                                            }
                                            
                                            return <div key={juz.id}>{buttonContent}</div>;
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
             <DialogContent>
                <DialogHeader>
                    <DialogTitle>{c.createHatim}</DialogTitle>
                </DialogHeader>
                <CreateHatimForm onFinished={() => setCreateFormOpen(false)} />
             </DialogContent>
             </Dialog>
        </div>
    );
}
