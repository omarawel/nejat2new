
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MessageSquare, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';

const content = {
    de: {
        joinCommunity: "Tritt unserer Community bei",
        connect: "Verbinde dich mit Gleichgesinnten, teile Wissen und wachse in deinem Glauben.",
        backToFeatures: "Zurück zu den Funktionen",
        upcomingEvents: "Kommende Events",
        eventsDescription: "Nimm an Online-Vorträgen, Workshops und gemeinsamen Gebeten teil. (Demnächst verfügbar)",
        viewEvents: "Events ansehen",
        studyGroups: "Lerngruppen",
        studyGroupsDescription: "Finde oder gründe Gruppen zum gemeinsamen Studium des Korans, der Hadithe oder der arabischen Sprache. (Demnächst verfügbar)",
        findGroups: "Gruppen finden",
        discussionForums: "Diskussionsforen",
        discussionForumsDescription: "Tausche dich über theologische Fragen, spirituelle Erfahrungen und Alltags-Themen aus. (Demnächst verfügbar)",
        goToForum: "Zum Forum"
    },
    en: {
        joinCommunity: "Join Our Community",
        connect: "Connect with like-minded people, share knowledge, and grow in your faith.",
        backToFeatures: "Back to Features",
        upcomingEvents: "Upcoming Events",
        eventsDescription: "Participate in online lectures, workshops, and communal prayers. (Coming soon)",
        viewEvents: "View Events",
        studyGroups: "Study Groups",
        studyGroupsDescription: "Find or create groups to study the Quran, Hadith, or the Arabic language together. (Coming soon)",
        findGroups: "Find Groups",
        discussionForums: "Discussion Forums",
        discussionForumsDescription: "Discuss theological questions, spiritual experiences, and everyday topics. (Coming soon)",
        goToForum: "Go to Forum"
    }
}


export default function CommunityPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  return (
    <div className="flex-grow flex flex-col p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {c.backToFeatures}
            </Link>
        </Button>
      </div>
      <div className="container mx-auto text-center px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">{c.joinCommunity}</h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">{c.connect}</p>
      </div>

      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              
              <CardTitle className="mt-4">{c.upcomingEvents}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{c.eventsDescription}</CardDescription>
              <Button variant="outline" className="mt-4" disabled>{c.viewEvents}</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
                
              <CardTitle className="mt-4">{c.studyGroups}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{c.studyGroupsDescription}</CardDescription>
              <Button variant="outline" className="mt-4" disabled>{c.findGroups}</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
                
              <CardTitle className="mt-4">{c.discussionForums}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{c.discussionForumsDescription}</CardDescription>
              <Button variant="outline" className="mt-4" disabled>{c.goToForum}</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
