import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function CommunityPage() {
  return (
    <div className="flex-grow flex flex-col">
      <div className="relative h-64 md:h-80 w-full">
         <Image
            src="https://placehold.co/1200x400.png"
            alt="Community Banner"
            layout="fill"
            objectFit="cover"
            className="bg-accent"
            data-ai-hint="community event"
          />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Tritt unserer Community bei</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl">Verbinde dich mit Gleichgesinnten, teile Wissen und wachse in deinem Glauben.</p>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Kommende Events</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Nimm an Online-Vorträgen, Workshops und gemeinsamen Gebeten teil. (Demnächst verfügbar)</CardDescription>
              <Button variant="outline" className="mt-4" disabled>Events ansehen</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                </div>
              <CardTitle className="mt-4">Lerngruppen</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Finde oder gründe Gruppen zum gemeinsamen Studium des Korans, der Hadithe oder der arabischen Sprache. (Demnächst verfügbar)</CardDescription>
              <Button variant="outline" className="mt-4" disabled>Gruppen finden</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-primary" />
                </div>
              <CardTitle className="mt-4">Diskussionsforen</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Tausche dich über theologische Fragen, spirituelle Erfahrungen und Alltags-Themen aus. (Demnächst verfügbar)</CardDescription>
              <Button variant="outline" className="mt-4" disabled>Zum Forum</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
