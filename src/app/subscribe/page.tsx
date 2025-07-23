
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Check, X } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const content = {
    de: {
        pageTitle: "Unterstütze Nejat Digital",
        pageDescription: "Wähle einen Plan, der zu dir passt, um exklusive Funktionen freizuschalten und unsere Mission zu unterstützen.",
        backToFeatures: "Zurück zu den Funktionen",
        monthly: "monatlich",
        mostPopular: "Beliebteste Wahl",
        choosePlan: "Plan wählen",
        plans: [
            {
                name: "Unterstützer",
                price: "2,99€",
                description: "Für Nutzer, die werbefrei lernen und grundlegende KI-Tools mit bis zu 15 Anfragen/Monat nutzen möchten.",
                features: [
                    "Werbefreie Erfahrung",
                    "Lern-Werkzeug (Auswendiglernen)",
                    "Sprachausgabe (Koran, Hadith etc.)",
                    "15 KI-Anfragen / Monat (Dua, Gelehrter...)",
                ]
            },
            {
                name: "Pro",
                price: "4,99€",
                description: "Ideal für Wissbegierige, die mit 40 KI-Anfragen/Monat das volle Potenzial der App ausschöpfen wollen.",
                features: [
                    "Alle Funktionen des Unterstützer-Plans",
                    "40 KI-Anfragen / Monat",
                    "Personalisierter Lernpfad-Generator",
                    "Priorisierter Support",
                ],
                recommended: true
            },
            {
                name: "Patron",
                price: "9,99€",
                description: "Für diejenigen, die mit 100 KI-Anfragen/Monat maßgeblich zum Wachstum der Plattform beitragen möchten.",
                features: [
                    "Alle Funktionen des Pro-Plans",
                    "100 KI-Anfragen / Monat",
                    "Frühzugang zu neuen Features",
                    "Exklusive Community-Abzeichen"
                ]
            }
        ],
        comparison: {
            title: "Vergleiche die Pläne",
            feature: "Funktion",
            free: "Kostenlos",
            supporter: "Unterstützer",
            pro: "Pro",
            patron: "Patron",
            featuresList: [
                { name: "Zugang zu grundlegenden Lerninhalten", value: "✓" },
                { name: "Werbefreie Erfahrung", value: "✓" },
                { name: "Lern-Werkzeug & Sprachausgabe", value: "✓" },
                { name: "KI-Anfragen (Dua, Gelehrter, etc.)", free: "0", supporter: "15/Monat", pro: "40/Monat", patron: "100/Monat" },
                { name: "Personalisierter Lernpfad-Generator", value: "✓" },
                { name: "Priorisierter Support", value: "✓" },
                { name: "Frühzugang & exklusive Features", value: "✓" },
            ]
        }
    },
    en: {
        pageTitle: "Support Nejat Digital",
        pageDescription: "Choose a plan that suits you to unlock exclusive features and support our mission.",
        backToFeatures: "Back to Features",
        monthly: "monthly",
        mostPopular: "Most Popular",
        choosePlan: "Choose Plan",
        plans: [
            {
                name: "Supporter",
                price: "€2.99",
                description: "For users who want an ad-free experience and basic AI tools with up to 15 requests/month.",
                features: [
                    "Ad-free experience",
                    "Memorization Tool",
                    "Voice Output (Quran, Hadith etc.)",
                    "15 AI Requests / Month (Dua, Scholar...)",
                ]
            },
            {
                name: "Pro",
                price: "€4.99",
                description: "Ideal for eager learners who want to unlock the full potential of the app with 40 AI requests/month.",
                features: [
                    "All features of the Supporter plan",
                    "40 AI Requests / Month",
                    "Personalized Learning Path Generator",
                    "Priority Support",
                ],
                recommended: true
            },
            {
                name: "Patron",
                price: "€9.99",
                description: "For those who want to significantly contribute to the platform's growth with 100 AI requests/month.",
                features: [
                    "All features of the Pro plan",
                    "100 AI Requests / Month",
                    "Early access to new features",
                    "Exclusive community badges"
                ]
            }
        ],
         comparison: {
            title: "Compare Plans",
            feature: "Feature",
            free: "Free",
            supporter: "Supporter",
            pro: "Pro",
            patron: "Patron",
            featuresList: [
                { name: "Access to basic learning content", value: "✓" },
                { name: "Ad-free experience", value: "✓" },
                { name: "Memorization Tool & Voice Output", value: "✓" },
                { name: "AI Requests (Dua, Scholar, etc.)", free: "0", supporter: "15/month", pro: "40/month", patron: "100/month" },
                { name: "Personalized Learning Path Generator", value: "✓" },
                { name: "Priority Support", value: "✓" },
                { name: "Early Access & Exclusive Features", value: "✓" },
            ]
        }
    }
}


export default function SubscribePage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  
  const planAccess = {
    free: { "Zugang zu grundlegenden Lerninhalten": true, "Werbefreie Erfahrung": false, "Lern-Werkzeug & Sprachausgabe": false, "Personalisierter Lernpfad-Generator": false, "Priorisierter Support": false, "Frühzugang & exklusive Features": false },
    supporter: { "Zugang zu grundlegenden Lerninhalten": true, "Werbefreie Erfahrung": true, "Lern-Werkzeug & Sprachausgabe": true, "Personalisierter Lernpfad-Generator": false, "Priorisierter Support": false, "Frühzugang & exklusive Features": false },
    pro: { "Zugang zu grundlegenden Lerninhalten": true, "Werbefreie Erfahrung": true, "Lern-Werkzeug & Sprachausgabe": true, "Personalisierter Lernpfad-Generator": true, "Priorisierter Support": true, "Frühzugang & exklusive Features": false },
    patron: { "Zugang zu grundlegenden Lerninhalten": true, "Werbefreie Erfahrung": true, "Lern-Werkzeug & Sprachausgabe": true, "Personalisierter Lernpfad-Generator": true, "Priorisierter Support": true, "Frühzugang & exklusive Features": true },
  };


  return (
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{c.pageTitle}</h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.pageDescription}</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {c.plans.map((plan, index) => (
                    <Card 
                        key={index} 
                        className={cn(
                            "flex flex-col",
                            plan.recommended && "border-primary border-2 shadow-lg"
                        )}
                    >
                        {plan.recommended && (
                            <Badge className="absolute -top-3 self-center">{c.mostPopular}</Badge>
                        )}
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-6">
                            <div className="text-center">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-muted-foreground">/{c.monthly}</span>
                            </div>
                            <ul className="space-y-3">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full"
                                variant={plan.recommended ? 'default' : 'outline'}
                            >
                                {c.choosePlan}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-20">
                <h2 className="text-3xl font-bold text-center mb-8">{c.comparison.title}</h2>
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40%] text-lg">{c.comparison.feature}</TableHead>
                                <TableHead className="text-center text-lg">{c.comparison.free}</TableHead>
                                <TableHead className="text-center text-lg">{c.comparison.supporter}</TableHead>
                                <TableHead className="text-center text-lg">{c.comparison.pro}</TableHead>
                                <TableHead className="text-center text-lg">{c.comparison.patron}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {c.comparison.featuresList.map((feature, index) => {
                                const hasAccess = (plan: 'free' | 'supporter' | 'pro' | 'patron') => {
                                   if (feature.name === 'KI-Anfragen (Dua, Gelehrter, etc.)' || feature.name === 'AI Requests (Dua, Scholar, etc.)') return false;
                                   return planAccess[plan][feature.name as keyof typeof planAccess['free']];
                                }
                                
                                return (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{feature.name}</TableCell>
                                     { (feature.name.startsWith('KI-Anfragen') || feature.name.startsWith('AI Requests')) ? (
                                        <>
                                            <TableCell className="text-center font-medium">{feature.free}</TableCell>
                                            <TableCell className="text-center font-medium">{feature.supporter}</TableCell>
                                            <TableCell className="text-center font-medium">{feature.pro}</TableCell>
                                            <TableCell className="text-center font-medium">{feature.patron}</TableCell>
                                        </>
                                     ) : (
                                        <>
                                            <TableCell className="text-center">{hasAccess('free') ? <Check className="h-6 w-6 text-green-500 mx-auto" /> : <X className="h-6 w-6 text-muted-foreground mx-auto" />}</TableCell>
                                            <TableCell className="text-center">{hasAccess('supporter') ? <Check className="h-6 w-6 text-green-500 mx-auto" /> : <X className="h-6 w-6 text-muted-foreground mx-auto" />}</TableCell>
                                            <TableCell className="text-center">{hasAccess('pro') ? <Check className="h-6 w-6 text-green-500 mx-auto" /> : <X className="h-6 w-6 text-muted-foreground mx-auto" />}</TableCell>
                                            <TableCell className="text-center">{hasAccess('patron') ? <Check className="h-6 w-6 text-green-500 mx-auto" /> : <X className="h-6 w-6 text-muted-foreground mx-auto" />}</TableCell>
                                        </>
                                     )}
                                </TableRow>
                           )})}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    </div>
  );
}
