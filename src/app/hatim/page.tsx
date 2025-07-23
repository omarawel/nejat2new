
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, PlusCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/components/language-provider';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Dummy data for demonstration. In a real app, this would come from a database (e.g., Firestore).
const initialHatimGroups = [
    {
        id: 1,
        title: "Weekly Family Hatim",
        description: "Let's complete the Quran together as a family every week.",
        juzs: Array(30).fill(null).map((_, i) => ({ id: i + 1, assignedTo: i < 12 ? `User ${i + 1}` : null })),
        isMember: true,
    },
    {
        id: 2,
        title: "Community Ramadan Challenge",
        description: "Aiming to complete 10 Hatims this Ramadan. Join us for blessings!",
        juzs: Array(30).fill(null).map((_, i) => ({ id: i + 1, assignedTo: i < 28 ? `Member ${i + 1}` : null })),
        isMember: false,
    },
     {
        id: 3,
        title: "In Memory of Grandpa",
        description: "We are reading the Quran for the soul of our beloved grandfather.",
        juzs: Array(30).fill(null).map((_, i) => ({ id: i + 1, assignedTo: i < 5 ? `Family Member ${i + 1}` : null })),
        isMember: false,
    }
];

type Juz = { id: number, assignedTo: string | null };
type HatimGroup = { id: number, title: string, description: string, juzs: Juz[], isMember: boolean };


const content = {
    de: {
        title: "Hatim - Gemeinsames Lesen",
        description: "Organisiere oder nimm an gemeinschaftlichen Koran-Lesungen teil, um die Belohnung zu teilen.",
        createHatim: "Neuen Hatim starten",
        join: "Beitreten",
        leave: "Verlassen",
        joined: "Beigetreten",
        takeJuz: "Juz nehmen",
        takenBy: "Genommen von:",
        completed: "Abgeschlossen",
        progress: "Fortschritt",
        toastJoined: "Du bist der Gruppe beigetreten!",
        toastLeft: "Du hast die Gruppe verlassen.",
        toastJuzTaken: "Du hast Juz {juzId} genommen!",
    },
    en: {
        title: "Hatim - Communal Reading",
        description: "Organize or join communal Quran readings to share the reward.",
        createHatim: "Start a New Hatim",
        join: "Join",
        leave: "Leave",
        joined: "Joined",
        takeJuz: "Take Juz",
        takenBy: "Taken by:",
        completed: "Completed",
        progress: "Progress",
        toastJoined: "You have joined the group!",
        toastLeft: "You have left the group.",
        toastJuzTaken: "You have taken Juz {juzId}!",
    }
}


export default function HatimPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;
    const { toast } = useToast();
    
    // In a real app, you would use user's actual name/ID.
    const currentUser = "You";
    const [hatimGroups, setHatimGroups] = useState<HatimGroup[]>(initialHatimGroups);

    const handleJoinToggle = (groupId: number) => {
        setHatimGroups(prev => prev.map(group => {
            if (group.id === groupId) {
                 toast({ title: !group.isMember ? c.toastJoined : c.toastLeft });
                return { ...group, isMember: !group.isMember };
            }
            return group;
        }));
    };

    const handleTakeJuz = (groupId: number, juzId: number) => {
        setHatimGroups(prev => prev.map(group => {
            if (group.id === groupId) {
                const newJuzs = group.juzs.map(juz => {
                    if (juz.id === juzId && !juz.assignedTo) {
                         toast({ title: c.toastJuzTaken.replace('{juzId}', juzId.toString()) });
                        return { ...juz, assignedTo: currentUser };
                    }
                    return juz;
                });
                return { ...group, juzs: newJuzs };
            }
            return group;
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <BookOpen className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
                 <div className="mt-6">
                    <Button size="lg" disabled>
                        <PlusCircle className="mr-2 h-5 w-5" />
                        {c.createHatim}
                    </Button>
                </div>
            </header>

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
                                    {group.juzs.map(juz => (
                                        <Button
                                            key={juz.id}
                                            variant={juz.assignedTo ? (juz.assignedTo === currentUser ? 'default' : 'secondary') : 'outline'}
                                            className="flex flex-col h-16"
                                            onClick={() => handleTakeJuz(group.id, juz.id)}
                                            disabled={!group.isMember || !!juz.assignedTo}
                                            title={juz.assignedTo ? `${c.takenBy} ${juz.assignedTo}` : c.takeJuz}
                                        >
                                            <span className="text-lg font-bold">{juz.id}</span>
                                            {juz.assignedTo && <span className="text-xs truncate">{juz.assignedTo}</span>}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => handleJoinToggle(group.id)} variant={group.isMember ? 'outline' : 'default'} className="w-full">
                                    {group.isMember ? (
                                        <><CheckCircle className="mr-2 h-4 w-4" /> {c.joined}</>
                                    ) : (
                                        <><Users className="mr-2 h-4 w-4" /> {c.join}</>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

