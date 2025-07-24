
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Copy } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const content = {
    de: {
        pageTitle: "Unterstütze Nejat Digital",
        pageDescription: "Deine Spende hilft uns, die App werbefrei zu halten, weiterzuentwickeln und neue nützliche Funktionen für die Ummah bereitzustellen.",
        backToFeatures: "Zurück zu den Funktionen",
        bankTransferTitle: "Banküberweisung (QR-Code)",
        bankTransferDescription: "Scanne den QR-Code mit deiner Banking-App, um direkt an uns zu spenden. Jeder Beitrag, groß oder klein, macht einen Unterschied.",
        paypalTitle: "Spenden über PayPal",
        paypalDescription: "Nutze den sicheren Weg über PayPal. Klicke auf den Button, um zu unserer Spendenseite zu gelangen.",
        paypalButton: "Über PayPal spenden",
        bankDetailsTitle: "Oder per manueller Überweisung",
        recipientLabel: "Empfänger",
        ibanLabel: "IBAN",
        bicLabel: "BIC",
        usageLabel: "Verwendungszweck",
        copy: "Kopieren",
        copied: "Kopiert!",
        mockData: {
            recipient: "Nejat FinTech",
            iban: "DE89 3704 0044 0532 0130 00",
            bic: "COBADEFFXXX",
            usage: "Spende für Nejat Digital"
        }
    },
    en: {
        pageTitle: "Support Nejat Digital",
        pageDescription: "Your donation helps us keep the app ad-free, continue its development, and provide new useful features for the Ummah.",
        backToFeatures: "Back to Features",
        bankTransferTitle: "Bank Transfer (QR Code)",
        bankTransferDescription: "Scan the QR code with your banking app to donate to us directly. Every contribution, big or small, makes a difference.",
        paypalTitle: "Donate via PayPal",
        paypalDescription: "Use the secure way via PayPal. Click the button to go to our donation page.",
        paypalButton: "Donate with PayPal",
        bankDetailsTitle: "Or via Manual Transfer",
        recipientLabel: "Recipient",
        ibanLabel: "IBAN",
        bicLabel: "BIC",
        usageLabel: "Reference",
        copy: "Copy",
        copied: "Copied!",
        mockData: {
            recipient: "Nejat FinTech",
            iban: "DE89 3704 0044 0532 0130 00",
            bic: "COBADEFFXXX",
            usage: "Donation for Nejat Digital"
        }
    }
}

const DetailRow = ({ label, value }: { label: string, value: string }) => {
    const { toast } = useToast()
    const c = content[useLanguage().language];

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        toast({
            title: c.copied,
            description: `${label}: ${value}`,
        });
    }
    return (
        <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-muted-foreground">{label}</span>
            <div className="flex items-center gap-2">
                <span className="font-mono text-sm">{value}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}


export default function SubscribePage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;
  const mock = c.mockData;

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-lg mx-auto">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                 <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <Heart className="h-12 w-12 text-primary" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">{c.pageTitle}</h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.pageDescription}</p>
            </header>
            
            <Card>
                <CardHeader>
                    <CardTitle>{c.bankTransferTitle}</CardTitle>
                    <CardDescription>{c.bankTransferDescription}</CardDescription>
                </CardHeader>
                 <CardContent>
                    <div className="flex justify-center">
                        <Image 
                            src="https://placehold.co/256x256.png" 
                            alt="QR Code for Donation" 
                            width={256} 
                            height={256}
                            className="rounded-lg border p-1"
                            data-ai-hint="qr code"
                        />
                    </div>
                 </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>{c.bankDetailsTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    <DetailRow label={c.recipientLabel} value={mock.recipient} />
                    <DetailRow label={c.ibanLabel} value={mock.iban} />
                    <DetailRow label={c.bicLabel} value={mock.bic} />
                    <DetailRow label={c.usageLabel} value={mock.usage} />
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>{c.paypalTitle}</CardTitle>
                    <CardDescription>{c.paypalDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" disabled>
                        {c.paypalButton}
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
