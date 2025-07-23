
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BellRing, BellOff, Sun, Moon, BookOpen, Heart, Calendar, BookText, ClipboardList } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const content = {
    de: {
        title: "Islamische Erinnerungen",
        description: "Abonniere gezielte Erinnerungen, um deinen Glauben im Alltag zu stärken. (Feature in Entwicklung)",
        toastEnabled: "Erinnerungen aktiviert!",
        toastDisabled: "Erinnerungen deaktiviert.",
        reminders: [
            {
                key: "verse_of_day",
                title: "Vers des Tages",
                description: "Erhalte jeden Tag einen inspirierenden Vers aus dem Heiligen Koran.",
                icon: BookOpen,
            },
            {
                key: "hadith_of_day",
                title: "Hadith des Tages",
                description: "Eine tägliche Lehre aus dem Leben und den Aussprüchen des Propheten Muhammad (ﷺ).",
                icon: BookOpen,
            },
            {
                key: "morning_dhikr",
                title: "Morgen-Dhikr",
                description: "Eine Erinnerung, deinen Tag mit dem Gedenken an Allah zu beginnen.",
                icon: Sun,
            },
            {
                key: "evening_dhikr",
                title: "Abend-Dhikr",
                description: "Eine Erinnerung, deinen Tag mit dem Gedenken an Allah zu beenden.",
                icon: Moon,
            },
             {
                key: "fasting_mondays_thursdays",
                title: "Fasten am Montag & Donnerstag",
                description: "Werde an die Sunna des freiwilligen Fastens an diesen beiden Tagen erinnert.",
                icon: Calendar,
            },
            {
                key: "surah_kahf_friday",
                title: "Sura Al-Kahf am Freitag",
                description: "Eine wöchentliche Erinnerung, die Sura Al-Kahf am Freitag zu rezitieren.",
                icon: Heart,
            },
            {
                key: "daily_learning",
                title: "Tägliche Lern-Session",
                description: "Eine Erinnerung, sich Zeit für das Studium des Islam zu nehmen.",
                icon: BookText,
            },
            {
                key: "jummah_prep",
                title: "Jumu'ah-Vorbereitung",
                description: "Erinnerung an Ghusl, Parfüm und den frühen Gang zur Moschee am Freitag.",
                icon: ClipboardList,
            }
        ]
    },
    en: {
        title: "Islamic Reminders",
        description: "Subscribe to specific reminders to strengthen your faith in daily life. (Feature in development)",
        toastEnabled: "Reminders enabled!",
        toastDisabled: "Reminders disabled.",
         reminders: [
            {
                key: "verse_of_day",
                title: "Verse of the Day",
                description: "Receive an inspiring verse from the Holy Quran every day.",
                icon: BookOpen,
            },
            {
                key: "hadith_of_day",
                title: "Hadith of the Day",
                description: "A daily teaching from the life and sayings of the Prophet Muhammad (ﷺ).",
                icon: BookOpen,
            },
            {
                key: "morning_dhikr",
                title: "Morning Dhikr",
                description: "A reminder to start your day with the remembrance of Allah.",
                icon: Sun,
            },
            {
                key: "evening_dhikr",
                title: "Evening Dhikr",
                description: "A reminder to end your day with the remembrance of Allah.",
                icon: Moon,
            },
            {
                key: "fasting_mondays_thursdays",
                title: "Fasting on Mondays & Thursdays",
                description: "Be reminded of the Sunnah of voluntary fasting on these two days.",
                icon: Calendar,
            },
            {
                key: "surah_kahf_friday",
                title: "Surah Al-Kahf on Friday",
                description: "A weekly reminder to recite Surah Al-Kahf on Friday.",
                icon: Heart,
            },
            {
                key: "daily_learning",
                title: "Daily Study Session",
                description: "A reminder to set aside time for Islamic studies.",
                icon: BookText,
            },
            {
                key: "jummah_prep",
                title: "Jumu'ah Preparation",
                description: "Reminder for Ghusl, perfume, and going early to the mosque on Friday.",
                icon: ClipboardList,
            }
        ]
    }
};

export default function RemindersPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const { toast } = useToast();

    const [subscriptions, setSubscriptions] = useState<Record<string, boolean>>({});

    const handleSubscriptionChange = (key: string, checked: boolean) => {
        // In a real app, you would handle Push API logic here.
        setSubscriptions(prev => ({...prev, [key]: checked}));
        toast({
            title: checked ? c.toastEnabled : c.toastDisabled,
            description: c.reminders.find(r => r.key === key)?.title,
        })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <Bell className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-2xl mx-auto grid grid-cols-1 gap-6">
                {c.reminders.map((reminder) => {
                    const Icon = reminder.icon;
                    return (
                        <Card key={reminder.key}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-start gap-4">
                                     <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                    <div>
                                        <Label htmlFor={reminder.key} className="text-lg font-semibold cursor-pointer">
                                            {reminder.title}
                                        </Label>
                                        <p className="text-sm text-muted-foreground">{reminder.description}</p>
                                    </div>
                                </div>
                                <Switch
                                    id={reminder.key}
                                    checked={!!subscriptions[reminder.key]}
                                    onCheckedChange={(checked) => handleSubscriptionChange(reminder.key, checked)}
                                    aria-label={`Toggle ${reminder.title} reminders`}
                                />
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
