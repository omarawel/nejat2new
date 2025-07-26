
"use client"

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, PlusCircle, Book, Trash2, Edit } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { getDiaryEntries, deleteDiaryEntry, type DiaryEntry } from '@/lib/diary';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { de, enUS } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription as AlertDialogDesc, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DiaryEntryForm } from '@/components/diary/diary-entry-form';

const content = {
    de: {
        title: "Spirituelles Tagebuch",
        description: "Halte deine täglichen Reflexionen, Dankbarkeitsmomente und spirituellen Erkenntnisse fest.",
        backToFeatures: "Zurück zu den Funktionen",
        loading: "Einträge werden geladen...",
        newEntry: "Neuer Eintrag",
        editEntry: "Eintrag bearbeiten",
        formDescription: "Schreibe deine Gedanken auf, um über deinen Tag zu reflektieren.",
        noEntries: "Noch keine Einträge vorhanden. Erstelle deinen ersten Eintrag!",
        confirmDeleteTitle: "Bist du sicher?",
        confirmDeleteDesc: "Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird dein Tagebucheintrag dauerhaft gelöscht.",
        cancel: "Abbrechen",
        confirm: "Bestätigen",
        entryDeleted: "Eintrag gelöscht.",
        errorDeleting: "Fehler beim Löschen des Eintrags.",
        loginRequired: "Du musst angemeldet sein, um dein Tagebuch zu nutzen.",
        login: "Anmelden"
    },
    en: {
        title: "Spiritual Diary",
        description: "Record your daily reflections, moments of gratitude, and spiritual insights.",
        backToFeatures: "Back to Features",
        loading: "Loading entries...",
        newEntry: "New Entry",
        editEntry: "Edit Entry",
        formDescription: "Write down your thoughts to reflect on your day.",
        noEntries: "No entries yet. Create your first one!",
        confirmDeleteTitle: "Are you sure?",
        confirmDeleteDesc: "This action cannot be undone. This will permanently delete your diary entry.",
        cancel: "Cancel",
        confirm: "Confirm",
        entryDeleted: "Entry deleted.",
        errorDeleting: "Error deleting entry.",
        loginRequired: "You need to be logged in to use your diary.",
        login: "Login"
    }
};

export default function DiaryPage() {
    const { language } = useLanguage();
    const c = content[language];
    const router = useRouter();
    const { toast } = useToast();

    const [user, loadingAuth] = useAuthState(auth);
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
    
    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            setLoading(false);
            return;
        }

        const unsubscribe = getDiaryEntries(user.uid, (entries) => {
            setEntries(entries);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user, loadingAuth]);

    const handleDelete = async (entryId: string) => {
        if (!user) return;
        try {
            await deleteDiaryEntry(user.uid, entryId);
            toast({ title: c.entryDeleted });
        } catch(e) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Error', description: c.errorDeleting });
        }
    }

    const handleOpenForm = (entry: DiaryEntry | null = null) => {
        setSelectedEntry(entry);
        setIsFormOpen(true);
    };

    if (loadingAuth || loading) {
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
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <div className="container mx-auto px-4 py-8">
                <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-4">
                    <div>
                        <Button asChild variant="ghost" className="mb-4">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {c.backToFeatures}
                            </Link>
                        </Button>
                        <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                        <p className="text-muted-foreground mt-2 text-lg max-w-2xl">{c.description}</p>
                    </div>
                     <Button onClick={() => handleOpenForm()}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        {c.newEntry}
                    </Button>
                </header>

                {entries.length === 0 ? (
                     <Card className="text-center max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>{c.noEntries}</CardTitle>
                        </CardHeader>
                         <CardContent>
                            <Button onClick={() => handleOpenForm()}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                {c.newEntry}
                            </Button>
                        </CardContent>
                     </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {entries.map(entry => (
                            <Card key={entry.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="truncate">{entry.title}</CardTitle>
                                    <CardDescription>{format(entry.createdAt.toDate(), 'PP', { locale: language === 'de' ? de : enUS })}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground line-clamp-4 whitespace-pre-wrap">{entry.content}</p>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                     <Button variant="outline" onClick={() => handleOpenForm(entry)}><Edit className="mr-2 h-4 w-4"/> Bearbeiten</Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>{c.confirmDeleteTitle}</AlertDialogTitle>
                                                <AlertDialogDesc>{c.confirmDeleteDesc}</AlertDialogDesc>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>{c.cancel}</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(entry.id!)}>{c.confirm}</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
             <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{selectedEntry ? c.editEntry : c.newEntry}</DialogTitle>
                    <DialogDescription>{c.formDescription}</DialogDescription>
                </DialogHeader>
                <DiaryEntryForm 
                    entry={selectedEntry} 
                    onFinished={() => setIsFormOpen(false)}
                    userId={user.uid}
                />
            </DialogContent>
        </Dialog>
    );
}
