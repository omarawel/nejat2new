
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BellRing, BellOff } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';

const content = {
    de: {
        title: "Islamische Erinnerungen",
        description: "Abonniere tägliche Erinnerungen, um deinen Glauben zu stärken. (Feature in Entwicklung)",
        enableNotifications: "Benachrichtigungen aktivieren",
        disableNotifications: "Benachrichtigungen deaktivieren",
        status: "Status:",
        enabled: "Aktiviert",
        disabled: "Deaktiviert",
        permissionGranted: "Benachrichtigungen aktiviert!",
        permissionDenied: "Benachrichtigungen blockiert. Bitte in den Browsereinstellungen ändern.",
        subscriptionSuccess: "Erfolgreich für Erinnerungen angemeldet.",
        subscriptionError: "Fehler beim Anmelden für Erinnerungen.",
        unsubscriptionSuccess: "Erfolgreich von Erinnerungen abgemeldet.",
        unsubscriptionError: "Fehler beim Abmelden von Erinnerungen."
    },
    en: {
        title: "Islamic Reminders",
        description: "Subscribe to daily reminders to strengthen your faith. (Feature in development)",
        enableNotifications: "Enable Notifications",
        disableNotifications: "Disable Notifications",
        status: "Status:",
        enabled: "Enabled",
        disabled: "Disabled",
        permissionGranted: "Notifications enabled!",
        permissionDenied: "Notifications blocked. Please change in your browser settings.",
        subscriptionSuccess: "Successfully subscribed to reminders.",
        subscriptionError: "Failed to subscribe to reminders.",
        unsubscriptionSuccess: "Successfully unsubscribed from reminders.",
        unsubscriptionError: "Failed to unsubscribe from reminders."
    }
};

export default function RemindersPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const { toast } = useToast();

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [isSubscribing, setIsSubscribing] = useState(false);

    // This is a placeholder for the actual subscription logic
    const handleSubscription = async () => {
        setIsSubscribing(true);
        // In a real app, you would handle Push API logic here.
        // For this example, we'll just simulate it.
        if (!notificationsEnabled) {
            // Simulate asking for permission
            await new Promise(res => setTimeout(res, 1000));
            setNotificationsEnabled(true);
            toast({ title: c.permissionGranted, description: c.subscriptionSuccess });
        } else {
            await new Promise(res => setTimeout(res, 500));
            setNotificationsEnabled(false);
            toast({ title: c.unsubscriptionSuccess });
        }
        setIsSubscribing(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <Bell className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>
            
            <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                        {notificationsEnabled ? (
                            <BellRing className="h-12 w-12 text-primary" />
                        ) : (
                            <BellOff className="h-12 w-12 text-muted-foreground" />
                        )}
                    </div>
                    <CardTitle>{notificationsEnabled ? c.enabled : c.disabled}</CardTitle>
                    <CardDescription>{c.status}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button 
                        onClick={handleSubscription} 
                        className="w-full" 
                        disabled={isSubscribing}
                        variant={notificationsEnabled ? 'destructive' : 'default'}
                    >
                        {notificationsEnabled ? c.disableNotifications : c.enableNotifications}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
