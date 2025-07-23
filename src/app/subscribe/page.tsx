
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
                description: "Für gelegentliche Nutzer, die die App-Entwicklung unterstützen möchten.",
                features: [
                    "Werbefreie Erfahrung",
                    "KI-Dua-Generator",
                    "Standard-Support"
                ]
            },
            {
                name: "Pro",
                price: "4,99€",
                description: "Ideal für regelmäßige Nutzer, die das volle Potenzial der App ausschöpfen möchten.",
                features: [
                    "Alle Funktionen des Unterstützer-Plans",
                    "KI-Gelehrter & Vers-Finder",
                    "Personalisierter Lernpfad-Generator",
                    "Priorisierter Support"
                ],
                recommended: true
            },
            {
                name: "Patron",
                price: "9,99€",
                description: "Für diejenigen, die maßgeblich zum Wachstum und zur Zukunft der Plattform beitragen möchten.",
                features: [
                    "Alle Funktionen des Pro-Plans",
                    "Frühzugang zu neuen Features",
                    "Direkter Einfluss auf die Entwicklung",
                    "Exklusive Community-Abzeichen"
                ]
            }
        ],
        comparison: {
            title: "Vergleiche die Pläne",
            feature: "Funktion",
            free: "Kostenlos",
            featuresList: [
                { name: "Zugang zu grundlegenden Lerninhalten", free: true, supporter: true, pro: true, patron: true },
                { name: "Werbefreie Erfahrung", free: false, supporter: true, pro: true, patron: true },
                { name: "KI-Dua-Generator", free: false, supporter: true, pro: true, patron: true },
                { name: "Standard-Support", free: false, supporter: true, pro: true, patron: true },
                { name: "KI-Gelehrter & Vers-Finder", free: false, supporter: false, pro: true, patron: true },
                { name: "Personalisierter Lernpfad-Generator", free: false, supporter: false, pro: true, patron: true },
                { name: "Priorisierter Support", free: false, supporter: false, pro: true, patron: true },
                { name: "Frühzugang zu neuen Features", free: false, supporter: false, pro: false, patron: true },
                { name: "Direkter Einfluss auf die Entwicklung", free: false, supporter: false, pro: false, patron: true },
                { name: "Exklusive Community-Abzeichen", free: false, supporter: false, pro: false, patron: true }
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
                description: "For occasional users who want to support the app's development.",
                features: [
                    "Ad-free experience",
                    "AI Dua Generator",
                    "Standard support"
                ]
            },
            {
                name: "Pro",
                price: "€4.99",
                description: "Ideal for regular users who want to unlock the full potential of the app.",
                features: [
                    "All features of the Supporter plan",
                    "AI Scholar & Verse Finder",
                    "Personalized Learning Path Generator",
                    "Priority support"
                ],
                recommended: true
            },
            {
                name: "Patron",
                price: "€9.99",
                description: "For those who want to significantly contribute to the growth and future of the platform.",
                features: [
                    "All features of the Pro plan",
                    "Early access to new features",
                    "Direct influence on development",
                    "Exclusive community badges"
                ]
            }
        ],
         comparison: {
            title: "Compare Plans",
            feature: "Feature",
            free: "Free",
            featuresList: [
                { name: "Access to basic learning content", free: true, supporter: true, pro: true, patron: true },
                { name: "Ad-free experience", free: false, supporter: true, pro: true, patron: true },
                { name: "AI Dua Generator", free: false, supporter: true, pro: true, patron: true },
                { name: "Standard support", free: false, supporter: true, pro: true, patron: true },
                { name: "AI Scholar & Verse Finder", free: false, supporter: false, pro: true, patron: true },
                { name: "Personalized Learning Path Generator", free: false, supporter: false, pro: true, patron: true },
                { name: "Priority support", free: false, supporter: false, pro: true, patron: true },
                { name: "Early access to new features", free: false, supporter: false, pro: false, patron: true },
                { name: "Direct influence on development", free: false, supporter: false, pro: false, patron: true },
                { name: "Exclusive community badges", free: false, supporter: false, pro: false, patron: true }
            ]
        }
    }
}


export default function SubscribePage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

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
                                <TableHead className="text-center text-lg">{c.plans[0].name}</TableHead>
                                <TableHead className="text-center text-lg">{c.plans[1].name}</TableHead>
                                <TableHead className="text-center text-lg">{c.plans[2].name}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {c.comparison.featuresList.map((feature, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{feature.name}</TableCell>
                                    <TableCell className="text-center">{feature.free ? <Check className="h-6 w-6 text-green-500 mx-auto" /> : <X className="h-6 w-6 text-muted-foreground mx-auto" />}</TableCell>
                                    <TableCell className="text-center">{feature.supporter ? <Check className="h-6 w-6 text-green-500 mx-auto" /> : <X className="h-6 w-6 text-muted-foreground mx-auto" />}</TableCell>
                                    <TableCell className="text-center">{feature.pro ? <Check className="h-6 w-6 text-green-500 mx-auto" /> : <X className="h-6 w-6 text-muted-foreground mx-auto" />}</TableCell>
                                    <TableCell className="text-center">{feature.patron ? <Check className="h-6 w-6 text-green-500 mx-auto" /> : <X className="h-6 w-6 text-muted-foreground mx-auto" />}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    </div>
  );
}
