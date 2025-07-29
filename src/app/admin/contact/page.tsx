"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Mail, MessageSquare, Trash2, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { isAdmin } from '@/lib/admin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getSubmissions, updateSubmission, deleteSubmission, type ContactSubmission } from '@/lib/contact-submissions';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { de, enUS } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const content = {
    de: {
        title: "Kontakt & Feedback",
        description: "Verwalte Nutzeranfragen und sieh dir Feedback an.",
        backToDashboard: "Zurück zum Admin Dashboard",
        accessDenied: "Zugriff verweigert",
        noAccess: "Du hast keine Berechtigung, auf diese Seite zuzugreifen.",
        goHome: "Zur Startseite",
        loading: "Nachrichten werden geladen...",
        date: "Datum",
        from: "Von",
        subject: "Betreff",
        status: "Status",
        actions: "Aktionen",
        noSubmissions: "Keine Einsendungen gefunden.",
        unread: "Ungelesen",
        read: "Gelesen",
        markAsRead: "Als gelesen markieren",
        markAsUnread: "Als ungelesen markieren",
        delete: "Löschen",
        confirmDeleteTitle: "Bist du sicher?",
        confirmDeleteDesc: "Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird die Nachricht dauerhaft gelöscht.",
        cancel: "Abbrechen",
        confirm: "Bestätigen",
        submissionDeleted: "Nachricht gelöscht.",
        errorDeleting: "Fehler beim Löschen der Nachricht.",
        viewMessage: "Nachricht ansehen",
        replyViaEmail: "Per E-Mail antworten",
        close: "Schließen",
        fullMessage: "Vollständige Nachricht"
    },
    en: {
        title: "Contact & Feedback",
        description: "Manage user inquiries and view feedback.",
        backToDashboard: "Back to Admin Dashboard",
        accessDenied: "Access Denied",
        noAccess: "You do not have permission to access this page.",
        goHome: "Go to Homepage",
        loading: "Loading messages...",
        date: "Date",
        from: "From",
        subject: "Subject",
        status: "Status",
        actions: "Actions",
        noSubmissions: "No submissions found.",
        unread: "Unread",
        read: "Read",
        markAsRead: "Mark as read",
        markAsUnread: "Mark as unread",
        delete: "Delete",
        confirmDeleteTitle: "Are you sure?",
        confirmDeleteDesc: "This action cannot be undone. This will permanently delete the message.",
        cancel: "Cancel",
        confirm: "Confirm",
        submissionDeleted: "Message deleted.",
        errorDeleting: "Error deleting message.",
        viewMessage: "View Message",
        replyViaEmail: "Reply via Email",
        close: "Close",
        fullMessage: "Full Message"
    }
};

export default function AdminContactPage() {
    const { language } = useLanguage();
    const c = content[language];
    const router = useRouter();
    const { toast } = useToast();

    const [user, loadingAuth] = useAuthState(auth);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
    
    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            router.push('/login');
            return;
        }

        isAdmin(user.uid).then(isAdm => {
            setUserIsAdmin(isAdm);
            if (isAdm) {
                 const unsubscribe = getSubmissions((submissions) => {
                    setSubmissions(submissions);
                    setLoading(false);
                });
                return () => unsubscribe();
            } else {
                setLoading(false);
            }
        });
    }, [user, loadingAuth, router]);

    const handleToggleRead = async (submission: ContactSubmission) => {
        try {
            await updateSubmission(submission.id!, { isRead: !submission.isRead });
        } catch (e) {
            console.error(e);
        }
    }
    
    const handleDelete = async (submissionId: string) => {
        try {
            await deleteSubmission(submissionId);
            toast({ title: c.submissionDeleted });
        } catch(e) {
            console.error(e);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: c.errorDeleting
            })
        }
    }

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
        <Dialog open={!!selectedSubmission} onOpenChange={(isOpen) => !isOpen && setSelectedSubmission(null)}>
            <div className="container mx-auto px-4 py-8">
                <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-4">
                    <div>
                        <Button asChild variant="ghost" className="mb-4">
                            <Link href="/admin/dashboard">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {c.backToDashboard}
                            </Link>
                        </Button>
                        <h1 className="text-4xl font-bold tracking-tight text-primary">
                        {c.title}
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg max-w-2xl">{c.description}</p>
                    </div>
                </header>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[150px]">{c.date}</TableHead>
                                    <TableHead className="w-[200px]">{c.from}</TableHead>
                                    <TableHead>{c.subject}</TableHead>
                                    <TableHead className="w-[100px]">{c.status}</TableHead>
                                    <TableHead className="text-right w-[150px]">{c.actions}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {submissions.length > 0 ? (
                                    submissions.map(sub => (
                                        <TableRow key={sub.id} className={!sub.isRead ? 'bg-accent/50' : ''}>
                                            <TableCell>
                                                {format(sub.createdAt.toDate(), 'PP', { locale: language === 'de' ? de : enUS })}
                                            </TableCell>
                                            <TableCell className="font-medium">{sub.name}<br/><span className="text-xs text-muted-foreground">{sub.email}</span></TableCell>
                                            <TableCell>{sub.subject}</TableCell>
                                            <TableCell>
                                                <Badge variant={sub.isRead ? 'secondary' : 'default'}>
                                                    {sub.isRead ? c.read : c.unread}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right space-x-1">
                                                <Button variant="ghost" size="icon" title={c.viewMessage} onClick={() => setSelectedSubmission(sub)}>
                                                    <Mail className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleToggleRead(sub)} title={sub.isRead ? c.markAsUnread : c.markAsRead}>
                                                    {sub.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" title={c.delete}>
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogTitle>{c.confirmDeleteTitle}</AlertDialogTitle>
                                                        <AlertDialogDescription>{c.confirmDeleteDesc}</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                        <AlertDialogCancel>{c.cancel}</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(sub.id!)}>{c.confirm}</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            {c.noSubmissions}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            
            <DialogContent className="sm:max-w-xl">
                 {selectedSubmission && (
                    <>
                        <DialogHeader>
                            <DialogTitle>{selectedSubmission.subject}</DialogTitle>
                            <DialogDescription>
                                Von: {selectedSubmission.name} &lt;{selectedSubmission.email}&gt; am {format(selectedSubmission.createdAt.toDate(), 'PPP p', { locale: language === 'de' ? de : enUS })}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 whitespace-pre-wrap bg-muted p-4 rounded-md">
                            {selectedSubmission.message}
                        </div>
                        <div className="flex justify-end gap-2">
                             <Button variant="outline" onClick={() => setSelectedSubmission(null)}>{c.close}</Button>
                             <Button asChild>
                                <a href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    {c.replyViaEmail}
                                </a>
                             </Button>
                        </div>
                    </>
                 )}
            </DialogContent>
        </Dialog>
    );
}
