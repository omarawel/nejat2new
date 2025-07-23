
"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { getFavorites, deleteFavorite, type Favorite } from '@/lib/favorites';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Star, PlusCircle, BrainCircuit, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
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
import { useToast } from '@/hooks/use-toast';

const content = {
    de: {
        title: "Deine Favoriten",
        description: "Hier sind deine gespeicherten Texte zum Auswendiglernen.",
        backToFeatures: "Zurück zu den Funktionen",
        noFavorites: "Du hast noch keine Favoriten gespeichert.",
        addFavorite: "Text zum Lernen hinzufügen",
        loading: "Favoriten werden geladen...",
        delete: "Löschen",
        learn: "Lernen",
        confirmDeleteTitle: "Bist du sicher?",
        confirmDeleteDesc: "Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird dein Favorit dauerhaft gelöscht.",
        cancel: "Abbrechen",
        confirm: "Bestätigen",
        favoriteDeleted: "Favorit gelöscht.",
        errorDeleting: "Fehler beim Löschen des Favoriten.",
        loginRequired: "Du musst angemeldet sein, um deine Favoriten zu sehen.",
        login: "Anmelden",

    },
    en: {
        title: "Your Favorites",
        description: "Here are your saved texts for memorization.",
        backToFeatures: "Back to Features",
        noFavorites: "You haven't saved any favorites yet.",
        addFavorite: "Add text to learn",
        loading: "Loading favorites...",
        delete: "Delete",
        learn: "Learn",
        confirmDeleteTitle: "Are you sure?",
        confirmDeleteDesc: "This action cannot be undone. This will permanently delete your favorite.",
        cancel: "Cancel",
        confirm: "Confirm",
        favoriteDeleted: "Favorite deleted.",
        errorDeleting: "Error deleting favorite.",
        loginRequired: "You need to be logged in to see your favorites.",
        login: "Login",
    }
}


export default function FavoritesPage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();

    const [user, loadingAuth, errorAuth] = useAuthState(auth);
    const router = useRouter();
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            // Optional: Redirect to login if you want to enforce auth on this page
            // router.push('/login');
            setLoadingFavorites(false);
            return;
        }

        const unsubscribe = getFavorites(user.uid, (favs) => {
            setFavorites(favs);
            setLoadingFavorites(false);
        });

        return () => unsubscribe();
    }, [user, loadingAuth, router]);

    const handleDelete = async (id: string) => {
        if (!user) return;
        try {
            await deleteFavorite(user.uid, id);
            toast({
                title: c.favoriteDeleted
            })
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error",
                description: c.errorDeleting
            })
            console.error("Error deleting favorite: ", error);
        }
    }
    
    if (loadingAuth || loadingFavorites) {
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
                           <Link href="/login">
                               {c.login}
                           </Link>
                       </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
    

    return (
        <div className="container mx-auto px-4 py-8">
             <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <Star className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>

            {favorites.length === 0 ? (
                <div className="text-center">
                    <Card className="max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>{c.noFavorites}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href="/memorization">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    {c.addFavorite}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(fav => (
                        <Card key={fav.id} className="flex flex-col">
                            <CardContent className="p-6 flex-grow">
                                <p className="text-muted-foreground whitespace-pre-wrap line-clamp-6">{fav.text}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center p-4 border-t">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={{
                                        pathname: '/memorization',
                                        query: { text: fav.text }
                                    }}>{c.learn}</Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                         <Button variant="destructive" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>{c.confirmDeleteTitle}</AlertDialogTitle>
                                        <AlertDialogDescription>{c.confirmDeleteDesc}</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>{c.cancel}</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(fav.id)}>{c.confirm}</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
