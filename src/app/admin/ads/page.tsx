
"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, PlusCircle, Trash2, Edit } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { isAdmin } from '@/lib/admin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAds, deleteAd, type Ad } from '@/lib/ads';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { AddAdForm } from '@/components/admin/add-ad-form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const content = {
    de: {
        title: "Werbeanzeigen verwalten",
        description: "Erstelle, bearbeite und verwalte Anzeigen für die gesamte Plattform.",
        backToDashboard: "Zurück zum Admin Dashboard",
        accessDenied: "Zugriff verweigert",
        noAccess: "Du hast keine Berechtigung, auf diese Seite zuzugreifen.",
        goHome: "Zur Startseite",
        loading: "Anzeigen werden geladen...",
        addNewAd: "Neue Anzeige hinzufügen",
        editAd: "Anzeige bearbeiten",
        formDescription: "Fülle die Details aus, um eine neue Anzeige zu erstellen oder eine bestehende zu bearbeiten.",
        slotId: "Slot-IDs",
        image: "Bild",
        titleHeader: "Titel",
        actions: "Aktionen",
        noAds: "Noch keine Anzeigen erstellt. Füge eine neue hinzu, um zu beginnen.",
        confirmDeleteTitle: "Bist du sicher?",
        confirmDeleteDesc: "Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird die Anzeige dauerhaft gelöscht.",
        cancel: "Abbrechen",
        confirm: "Bestätigen",
        adDeleted: "Anzeige gelöscht",
        errorDeleting: "Fehler beim Löschen der Anzeige.",
    },
    en: {
        title: "Manage Advertisements",
        description: "Create, edit, and manage ads across the platform.",
        backToDashboard: "Back to Admin Dashboard",
        accessDenied: "Access Denied",
        noAccess: "You do not have permission to access this page.",
        goHome: "Go to Homepage",
        loading: "Loading ads...",
        addNewAd: "Add New Ad",
        editAd: "Edit Ad",
        formDescription: "Fill in the details to create a new ad or edit an existing one.",
        slotId: "Slot IDs",
        image: "Image",
        titleHeader: "Title",
        actions: "Actions",
        noAds: "No ads created yet. Add a new one to get started.",
        confirmDeleteTitle: "Are you sure?",
        confirmDeleteDesc: "This action cannot be undone. This will permanently delete the ad.",
        cancel: "Cancel",
        confirm: "Confirm",
        adDeleted: "Ad deleted.",
        errorDeleting: "Error deleting ad.",
    }
};

export default function AdManagementPage() {
    const { language } = useLanguage();
    const c = content[language];
    const router = useRouter();
    const { toast } = useToast();

    const [user, loadingAuth] = useAuthState(auth);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState<Ad[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
    
    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            router.push('/login');
            return;
        }

        isAdmin(user.uid).then(isAdm => {
            setUserIsAdmin(isAdm);
            if (isAdm) {
                 const unsubscribe = getAds((ads) => {
                    setAds(ads);
                    setLoading(false);
                });
                return () => unsubscribe();
            } else {
                setLoading(false);
            }
        });
    }, [user, loadingAuth, router]);

    const handleDelete = async (adId: string) => {
        try {
            await deleteAd(adId);
            toast({
                title: c.adDeleted
            });
        } catch(e) {
            console.error(e);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: c.errorDeleting
            })
        }
    }

    const handleOpenForm = (ad: Ad | null = null) => {
        setSelectedAd(ad);
        setIsFormOpen(true);
    };


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
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <div className="container mx-auto px-4 py-8">
                <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-4">
                    <div>
                        <Button asChild variant="ghost" className="mb-4">
                            <Link href="/admin/dashboard">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {c.backToDashboard}
                            </Link>
                        </Button>
                        <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                        <p className="text-muted-foreground mt-2 text-lg max-w-2xl">{c.description}</p>
                    </div>
                     <Button onClick={() => handleOpenForm()}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        {c.addNewAd}
                    </Button>
                </header>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[15%]">{c.image}</TableHead>
                                    <TableHead className="w-[30%]">{c.titleHeader}</TableHead>
                                    <TableHead>{c.slotId}</TableHead>
                                    <TableHead className="text-right w-[15%]">{c.actions}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ads.length > 0 ? (
                                    ads.map(ad => (
                                        <TableRow key={ad.id}>
                                            <TableCell>
                                                <Image 
                                                    src={ad.imageUrl || "https://placehold.co/100x50.png"}
                                                    alt={ad.title}
                                                    width={100}
                                                    height={50}
                                                    className="rounded-md object-cover bg-muted"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-semibold">{ad.title}</p>
                                                <p className="text-xs text-muted-foreground truncate">{ad.description}</p>
                                            </TableCell>
                                             <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {Array.isArray(ad.slotIds) && ad.slotIds.map(id => (
                                                        <Badge key={id} variant="outline">{id}</Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => handleOpenForm(ad)}><Edit className="h-4 w-4" /></Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>{c.confirmDeleteTitle}</AlertDialogTitle>
                                                            <AlertDialogDescription>{c.confirmDeleteDesc}</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>{c.cancel}</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(ad.id)}>{c.confirm}</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            {c.noAds}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
             <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{selectedAd ? c.editAd : c.addNewAd}</DialogTitle>
                    <DialogDescription>{c.formDescription}</DialogDescription>
                </DialogHeader>
                <AddAdForm ad={selectedAd} onFinished={() => setIsFormOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
