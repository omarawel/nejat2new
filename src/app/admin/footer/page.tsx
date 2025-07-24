
"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Save, Trash2, PlusCircle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { isAdmin } from '@/lib/admin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { getFooterContent, updateFooterContent, type FooterContent, type SocialLink } from '@/lib/footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const iconOptions = ["FacebookIcon", "TwitterIcon", "InstagramIcon", "YouTubeIcon"];

const content = {
    de: {
        title: "Footer verwalten",
        description: "Bearbeite die Inhalte und Links im Footer deiner Webseite.",
        backToDashboard: "Zurück zum Admin Dashboard",
        accessDenied: "Zugriff verweigert",
        noAccess: "Du hast keine Berechtigung, auf diese Seite zuzugreifen.",
        goHome: "Zur Startseite",
        loading: "Inhalt wird geladen...",
        save: "Änderungen speichern",
        saving: "Wird gespeichert...",
        savedSuccess: "Footer erfolgreich aktualisiert",
        errorSaving: "Fehler beim Speichern.",
        german: "Deutsch",
        english: "Englisch",
        companySection: "Unternehmen & Rechtliches",
        socialSection: "Soziale Medien",
        addSocialLink: "Neuen Social Link hinzufügen",
        icon: "Icon",
        name: "Name",
        url: "URL",
    },
    en: {
        title: "Manage Footer",
        description: "Edit the content and links in your website's footer.",
        backToDashboard: "Back to Admin Dashboard",
        accessDenied: "Access Denied",
        noAccess: "You do not have permission to access this page.",
        goHome: "Go to Homepage",
        loading: "Loading content...",
        save: "Save Changes",
        saving: "Saving...",
        savedSuccess: "Footer updated successfully",
        errorSaving: "Error saving content.",
        german: "German",
        english: "English",
        companySection: "Company & Legal",
        socialSection: "Social Media",
        addSocialLink: "Add New Social Link",
        icon: "Icon",
        name: "Name",
        url: "URL",
    }
};

export default function AdminFooterPage() {
    const { language } = useLanguage();
    const c = content[language];
    const router = useRouter();
    const { toast } = useToast();

    const [user, loadingAuth] = useAuthState(auth);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    const [footerContent, setFooterContent] = useState<Partial<FooterContent>>({});

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            router.push('/login');
            return;
        }

        isAdmin(user.uid).then(isAdm => {
            setUserIsAdmin(isAdm);
            if (isAdm) {
                 const unsubscribe = getFooterContent((data) => {
                    if (data) {
                        setFooterContent(data);
                    }
                    setLoading(false);
                });
                return () => unsubscribe();
            } else {
                setLoading(false);
            }
        });
    }, [user, loadingAuth, router]);

    const handleInputChange = (lang: 'de' | 'en', field: string, value: string) => {
        setFooterContent(prev => ({
            ...prev,
            [lang]: {
                ...prev[lang],
                [field]: value,
            }
        }));
    };

    const handleSocialChange = (index: number, field: keyof SocialLink, value: string) => {
        const updatedLinks = [...(footerContent.socialLinks || [])];
        updatedLinks[index] = { ...updatedLinks[index], [field]: value };
        setFooterContent(prev => ({ ...prev, socialLinks: updatedLinks }));
    };

    const addSocialLink = () => {
        const newLink: SocialLink = { name: '', href: '', icon: 'FacebookIcon' };
        setFooterContent(prev => ({
            ...prev,
            socialLinks: [...(prev.socialLinks || []), newLink]
        }));
    };

    const removeSocialLink = (index: number) => {
        setFooterContent(prev => ({
            ...prev,
            socialLinks: prev.socialLinks?.filter((_, i) => i !== index)
        }));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            await updateFooterContent(footerContent);
            toast({ title: c.savedSuccess });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: c.errorSaving });
        } finally {
            setIsSaving(false);
        }
    }

    if (loadingAuth || loading) {
        return <div className="flex-grow flex items-center justify-center p-4"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;
    }

    if (!userIsAdmin) {
         return <div className="flex-grow flex flex-col items-center justify-center p-4 text-center"><Card className="max-w-md"><CardHeader><CardTitle>{c.accessDenied}</CardTitle><CardDescription>{c.noAccess}</CardDescription></CardHeader><CardContent><Button asChild><Link href="/">{c.goHome}</Link></Button></CardContent></Card></div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-4">
                <div>
                    <Button asChild variant="ghost" className="mb-4"><Link href="/admin/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />{c.backToDashboard}</Link></Button>
                    <h1 className="text-4xl font-bold tracking-tight text-primary">{c.title}</h1>
                    <p className="text-muted-foreground mt-2 text-lg max-w-2xl">{c.description}</p>
                </div>
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{c.saving}</> : <><Save className="mr-2 h-4 w-4" />{c.save}</>}
                </Button>
            </header>

            <Tabs defaultValue="de" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="de">{c.german}</TabsTrigger>
                    <TabsTrigger value="en">{c.english}</TabsTrigger>
                </TabsList>
                <TabsContent value="de" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader><CardTitle>Beschreibung & Sektionen</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2"><Label>Beschreibung</Label><Textarea value={footerContent.de?.description || ''} onChange={(e) => handleInputChange('de', 'description', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Titel 'Unternehmen'</Label><Input value={footerContent.de?.company || ''} onChange={(e) => handleInputChange('de', 'company', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Titel 'Rechtliches'</Label><Input value={footerContent.de?.legal || ''} onChange={(e) => handleInputChange('de', 'legal', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Link 'Über uns'</Label><Input value={footerContent.de?.about || ''} onChange={(e) => handleInputChange('de', 'about', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Link 'Kontakt'</Label><Input value={footerContent.de?.contact || ''} onChange={(e) => handleInputChange('de', 'contact', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Link 'Support'</Label><Input value={footerContent.de?.support || ''} onChange={(e) => handleInputChange('de', 'support', e.target.value)} /></div>
                             <div className="space-y-2"><Label>Link 'AGB'</Label><Input value={footerContent.de?.terms || ''} onChange={(e) => handleInputChange('de', 'terms', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Link 'Datenschutz'</Label><Input value={footerContent.de?.privacy || ''} onChange={(e) => handleInputChange('de', 'privacy', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Link 'Impressum'</Label><Input value={footerContent.de?.imprint || ''} onChange={(e) => handleInputChange('de', 'imprint', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Text 'Folge uns'</Label><Input value={footerContent.de?.followUs || ''} onChange={(e) => handleInputChange('de', 'followUs', e.target.value)} /></div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="en" className="space-y-6 mt-6">
                     <Card>
                        <CardHeader><CardTitle>Description & Sections</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2"><Label>Description</Label><Textarea value={footerContent.en?.description || ''} onChange={(e) => handleInputChange('en', 'description', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Title 'Company'</Label><Input value={footerContent.en?.company || ''} onChange={(e) => handleInputChange('en', 'company', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Title 'Legal'</Label><Input value={footerContent.en?.legal || ''} onChange={(e) => handleInputChange('en', 'legal', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Link 'About Us'</Label><Input value={footerContent.en?.about || ''} onChange={(e) => handleInputChange('en', 'about', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Link 'Contact'</Label><Input value={footerContent.en?.contact || ''} onChange={(e) => handleInputChange('en', 'contact', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Link 'Support'</Label><Input value={footerContent.en?.support || ''} onChange={(e) => handleInputChange('en', 'support', e.target.value)} /></div>
                             <div className="space-y-2"><Label>Link 'Terms'</Label><Input value={footerContent.en?.terms || ''} onChange={(e) => handleInputChange('en', 'terms', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Link 'Privacy'</Label><Input value={footerContent.en?.privacy || ''} onChange={(e) => handleInputChange('en', 'privacy', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Link 'Imprint'</Label><Input value={footerContent.en?.imprint || ''} onChange={(e) => handleInputChange('en', 'imprint', e.target.value)} /></div>
                            <div className="space-y-2"><Label>Text 'Follow Us'</Label><Input value={footerContent.en?.followUs || ''} onChange={(e) => handleInputChange('en', 'followUs', e.target.value)} /></div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            
            <Card className="mt-6">
                <CardHeader><CardTitle>{c.socialSection}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {footerContent.socialLinks?.map((link, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-md">
                            <div className="space-y-2 md:col-span-1"><Label>{c.icon}</Label>
                                <Select value={link.icon} onValueChange={(value) => handleSocialChange(index, 'icon', value)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {iconOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2 md:col-span-1"><Label>{c.name}</Label><Input value={link.name} onChange={(e) => handleSocialChange(index, 'name', e.target.value)} /></div>
                            <div className="space-y-2 md:col-span-2"><Label>{c.url}</Label>
                                <div className="flex items-center gap-2">
                                <Input value={link.href} onChange={(e) => handleSocialChange(index, 'href', e.target.value)} />
                                <Button variant="destructive" size="icon" onClick={() => removeSocialLink(index)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                     <Button variant="outline" onClick={addSocialLink}><PlusCircle className="mr-2 h-4 w-4" />{c.addSocialLink}</Button>
                </CardContent>
            </Card>

        </div>
    );
}
