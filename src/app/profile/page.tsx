
"use client"

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Loader2, UserCircle, KeyRound, Save, Mail, Palette, Star, LifeBuoy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/components/language-provider';
import { useState, useEffect } from 'react';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const content = {
    de: {
        title: "Dein Profil",
        description: "Verwalte hier deine Kontoinformationen und personalisiere dein Erlebnis.",
        loading: "Profil wird geladen...",
        updateProfile: "Profil aktualisieren",
        name: "Name",
        email: "E-Mail",
        update: "Aktualisieren",
        profileUpdated: "Profil aktualisiert",
        profileUpdateSuccess: "Dein Name wurde erfolgreich geändert.",
        profileUpdateError: "Fehler beim Aktualisieren des Profils.",
        changePassword: "Passwort ändern",
        currentPassword: "Aktuelles Passwort",
        newPassword: "Neues Passwort",
        confirmNewPassword: "Neues Passwort bestätigen",
        passwordUpdated: "Passwort aktualisiert",
        passwordUpdateSuccess: "Dein Passwort wurde erfolgreich geändert.",
        passwordMismatch: "Die neuen Passwörter stimmen nicht überein.",
        passwordUpdateError: "Fehler beim Aktualisieren des Passworts. Möglicherweise musst du dich erneut anmelden.",
        reAuthRequired: "Bitte gib dein aktuelles Passwort ein, um diese Aktion zu bestätigen.",
        loginRequired: "Du musst angemeldet sein, um dein Profil zu sehen.",
        login: "Anmelden",
        themeSettings: "Theme-Einstellungen",
        themeDescription: "Wähle dein bevorzugtes Farbschema für die App.",
        saveTheme: "Theme speichern",
        themeSaved: "Theme gespeichert",
        themes: {
            light: "Hell",
            dark: "Dunkel",
            rose: "Rose",
            blue: "Blau",
            black: "Schwarz",
        },
        manageSubscription: "Abonnement verwalten",
        subscriptionDescription: "Zeige deinen aktuellen Plan an, ändere dein Abonnement oder kündige es.",
        manageSubButton: "Abonnement verwalten",
        contactSupport: "Support kontaktieren",
        contactSupportDescription: "Brauchst du Hilfe? Wende dich an unser Support-Team.",
        contactButton: "Zur Kontaktseite"
    },
    en: {
        title: "Your Profile",
        description: "Manage your account information and personalize your experience here.",
        loading: "Loading profile...",
        updateProfile: "Update Profile",
        name: "Name",
        email: "Email",
        update: "Update",
        profileUpdated: "Profile Updated",
        profileUpdateSuccess: "Your name has been successfully updated.",
        profileUpdateError: "Error updating profile.",
        changePassword: "Change Password",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmNewPassword: "Confirm New Password",
        passwordUpdated: "Password Updated",
        passwordUpdateSuccess: "Your password has been successfully updated.",
        passwordMismatch: "The new passwords do not match.",
        passwordUpdateError: "Error updating password. You may need to log in again.",
        reAuthRequired: "Please enter your current password to confirm this action.",
        loginRequired: "You need to be logged in to view your profile.",
        login: "Login",
        themeSettings: "Theme Settings",
        themeDescription: "Choose your preferred color scheme for the app.",
        saveTheme: "Save Theme",
        themeSaved: "Theme Saved",
         themes: {
            light: "Light",
            dark: "Dark",
            rose: "Rose",
            blue: "Blue",
            black: "Black",
        },
        manageSubscription: "Manage Subscription",
        subscriptionDescription: "View your current plan, change your subscription, or cancel it.",
        manageSubButton: "Manage Subscription",
        contactSupport: "Contact Support",
        contactSupportDescription: "Need help? Contact our support team.",
        contactButton: "Go to Contact Page"
    }
}


export default function ProfilePage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const [user, loadingAuth] = useAuthState(auth);
    const [name, setName] = useState('');
    const [isUpdatingName, setIsUpdatingName] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    
    const [selectedTheme, setSelectedTheme] = useState(theme);

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
        }
         if (!loadingAuth && !user) {
            router.push('/login');
        }
    }, [user, loadingAuth, router]);
    
    useEffect(() => {
        setSelectedTheme(theme);
    }, [theme]);

    const handleNameUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !name.trim()) return;

        setIsUpdatingName(true);
        try {
            await updateProfile(user, { displayName: name });
            toast({ title: c.profileUpdated, description: c.profileUpdateSuccess });
        } catch (error) {
            toast({ variant: 'destructive', title: "Error", description: c.profileUpdateError });
            console.error(error);
        } finally {
            setIsUpdatingName(false);
        }
    };
    
    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !currentPassword || !newPassword) return;
        if (newPassword !== confirmNewPassword) {
            toast({ variant: 'destructive', title: "Error", description: c.passwordMismatch });
            return;
        }

        setIsUpdatingPassword(true);
        try {
            if (user.email) {
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassword);
                toast({ title: c.passwordUpdated, description: c.passwordUpdateSuccess });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            }
        } catch (error) {
             toast({ variant: 'destructive', title: "Error", description: c.passwordUpdateError });
             console.error(error);
        } finally {
            setIsUpdatingPassword(false);
        }
    }

    const handleThemeSave = () => {
        setTheme(selectedTheme);
        toast({ title: c.themeSaved });
    }


    if (loadingAuth || !user) {
        return (
            <div className="flex-grow flex items-center justify-center p-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                <p className="text-muted-foreground mt-2 text-lg">{c.description}</p>
            </header>

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><UserCircle /> {c.updateProfile}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleNameUpdate} className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="email">{c.email}</Label>
                                <Input id="email" type="text" value={user.email ?? ''} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">{c.name}</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <Button type="submit" disabled={isUpdatingName || name === user.displayName}>
                                {isUpdatingName && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <Save className="mr-2 h-4 w-4" />
                                {c.update}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><KeyRound /> {c.changePassword}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordUpdate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">{c.currentPassword}</Label>
                                <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">{c.newPassword}</Label>
                                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="confirmNewPassword">{c.confirmNewPassword}</Label>
                                <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="••••••••" />
                            </div>
                            <Button type="submit" disabled={isUpdatingPassword || !currentPassword || !newPassword}>
                               {isUpdatingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                               <Save className="mr-2 h-4 w-4" />
                               {c.update}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Palette /> {c.themeSettings}</CardTitle>
                        <CardDescription>{c.themeDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                            {(['light', 'dark', 'rose', 'blue', 'black'] as const).map((themeKey) => (
                                <Button
                                    key={themeKey}
                                    variant={selectedTheme === themeKey ? 'default' : 'outline'}
                                    onClick={() => setSelectedTheme(themeKey)}
                                    className={cn("capitalize")}
                                >
                                    {c.themes[themeKey]}
                                </Button>
                            ))}
                        </div>
                         <Button onClick={handleThemeSave} disabled={selectedTheme === theme}>
                            <Save className="mr-2 h-4 w-4" />
                            {c.saveTheme}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Star /> {c.manageSubscription}</CardTitle>
                        <CardDescription>{c.subscriptionDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/subscribe">{c.manageSubButton}</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LifeBuoy /> {c.contactSupport}</CardTitle>
                        <CardDescription>{c.contactSupportDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline">
                            <Link href="/contact">{c.contactButton}</Link>
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
