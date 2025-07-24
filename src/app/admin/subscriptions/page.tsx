
"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, PlusCircle, Trash2, Edit } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { isAdmin } from '@/lib/admin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getSubscriptionPlans, deleteSubscriptionPlan, type SubscriptionPlan } from '@/lib/subscriptions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { SubscriptionPlanForm } from '@/components/admin/subscription-plan-form';

const content = {
    de: {
        title: "Abonnement-Pläne verwalten",
        description: "Erstelle, bearbeite und verwalte die Abonnement-Pläne für deine Nutzer.",
        backToDashboard: "Zurück zum Admin Dashboard",
        accessDenied: "Zugriff verweigert",
        noAccess: "Du hast keine Berechtigung, auf diese Seite zuzugreifen.",
        goHome: "Zur Startseite",
        loading: "Pläne werden geladen...",
        addNewPlan: "Neuen Plan hinzufügen",
        editPlan: "Plan bearbeiten",
        name: "Name",
        price: "Preis",
        status: "Status",
        actions: "Aktionen",
        noPlans: "Noch keine Pläne erstellt. Füge einen neuen hinzu, um zu beginnen.",
        confirmDeleteTitle: "Bist du sicher?",
        confirmDeleteDesc: "Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird der Plan dauerhaft gelöscht.",
        cancel: "Abbrechen",
        confirm: "Bestätigen",
        planDeleted: "Plan gelöscht.",
        errorDeleting: "Fehler beim Löschen des Plans.",
        active: "Aktiv",
        inactive: "Inaktiv",
    },
    en: {
        title: "Manage Subscription Plans",
        description: "Create, edit, and manage subscription plans for your users.",
        backToDashboard: "Back to Admin Dashboard",
        accessDenied: "Access Denied",
        noAccess: "You do not have permission to access this page.",
        goHome: "Go to Homepage",
        loading: "Loading plans...",
        addNewPlan: "Add New Plan",
        editPlan: "Edit Plan",
        name: "Name",
        price: "Price",
        status: "Status",
        actions: "Actions",
        noPlans: "No plans created yet. Add a new one to get started.",
        confirmDeleteTitle: "Are you sure?",
        confirmDeleteDesc: "This action cannot be undone. This will permanently delete the plan.",
        cancel: "Cancel",
        confirm: "Confirm",
        planDeleted: "Plan deleted.",
        errorDeleting: "Error deleting plan.",
        active: "Active",
        inactive: "Inactive",
    }
};

export default function AdminSubscriptionsPage() {
    const { language } = useLanguage();
    const c = content[language];
    const router = useRouter();
    const { toast } = useToast();

    const [user, loadingAuth] = useAuthState(auth);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            router.push('/login');
            return;
        }

        isAdmin(user.uid).then(isAdm => {
            setUserIsAdmin(isAdm);
            if (isAdm) {
                 const unsubscribe = getSubscriptionPlans((plans) => {
                    setPlans(plans);
                    setLoading(false);
                });
                return () => unsubscribe();
            } else {
                setLoading(false);
            }
        });
    }, [user, loadingAuth, router]);
    
    const handleOpenForm = (plan: SubscriptionPlan | null = null) => {
        setSelectedPlan(plan);
        setIsFormOpen(true);
    };

    const handleDelete = async (planId: string) => {
        try {
            await deleteSubscriptionPlan(planId);
            toast({ title: c.planDeleted });
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
                        {c.addNewPlan}
                    </Button>
                </header>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40%]">{c.name}</TableHead>
                                    <TableHead>{c.price}</TableHead>
                                    <TableHead>{c.status}</TableHead>
                                    <TableHead className="text-right">{c.actions}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {plans.length > 0 ? (
                                    plans.map(plan => (
                                        <TableRow key={plan.id}>
                                            <TableCell className="font-semibold">{plan.name}</TableCell>
                                            <TableCell>{plan.price}</TableCell>
                                            <TableCell>
                                                <Badge variant={plan.active ? "default" : "secondary"}>
                                                    {plan.active ? c.active : c.inactive}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => handleOpenForm(plan)}><Edit className="h-4 w-4" /></Button>
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
                                                            <AlertDialogAction onClick={() => handleDelete(plan.id)}>{c.confirm}</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            {c.noPlans}
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
                    <DialogTitle>{selectedPlan ? c.editPlan : c.addNewPlan}</DialogTitle>
                </DialogHeader>
                <SubscriptionPlanForm 
                    plan={selectedPlan} 
                    onFinished={() => setIsFormOpen(false)} 
                />
            </DialogContent>
        </Dialog>
    );
}
