
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowLeft, Info, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ZAKAT_RATE = 0.025;

const content = {
    de: {
        pageTitle: "Zakat-Rechner",
        pageDescription: "Berechne deine Zakat einfach und genau gemäß den islamischen Vorschriften.",
        backToFeatures: "Zurück zu den Funktionen",
        nisabTitle: "Was ist Nisab?",
        nisabDescription: "Der Nisab ist der Schwellenwert, den dein Vermögen erreichen muss, damit Zakat fällig wird. Er entspricht dem Wert von 85 Gramm Gold oder 595 Gramm Silber. Wir verwenden hier einen Beispielwert. Bitte überprüfe den aktuellen Gold- oder Silberpreis für eine exakte Berechnung.",
        currentNisab: "Aktueller Nisab-Wert (Beispiel)",
        assetsTitle: "Zakat-pflichtiges Vermögen",
        assetsDescription: "Gib den Wert deines Vermögens ein, das du seit einem vollen islamischen Jahr besitzt.",
        cashLabel: "Bargeld, Bankguthaben",
        goldSilverLabel: "Gold & Silber",
        investmentsLabel: "Investitionen (Handelswaren, Aktien)",
        debtsLabel: "Forderungen (Geld, das dir geschuldet wird)",
        liabilitiesLabel: "Kurzfristige Verbindlichkeiten",
        calculateButton: "Zakat berechnen",
        resultTitle: "Dein Zakat-Betrag",
        totalAssets: "Gesamtvermögen",
        netAssets: "Netto-Vermögen (Zakat-pflichtig)",
        zakatDue: "Zu zahlende Zakat (2.5%)",
        nisabNotMet: "Dein Vermögen liegt unter dem Nisab-Wert. Es ist keine Zakat fällig.",
        reset: "Zurücksetzen"
    },
    en: {
        pageTitle: "Zakat Calculator",
        pageDescription: "Calculate your Zakat easily and accurately according to Islamic rules.",
        backToFeatures: "Back to Features",
        nisabTitle: "What is Nisab?",
        nisabDescription: "Nisab is the threshold your wealth must reach for Zakat to be due. It is equivalent to the value of 85 grams of gold or 595 grams of silver. We are using a sample value here. Please check the current gold or silver price for an exact calculation.",
        currentNisab: "Current Nisab Value (Example)",
        assetsTitle: "Zakat-Eligible Assets",
        assetsDescription: "Enter the value of your assets that you have possessed for one full Islamic year.",
        cashLabel: "Cash, Bank Balances",
        goldSilverLabel: "Gold & Silver",
        investmentsLabel: "Investments (Trade Goods, Stocks)",
        debtsLabel: "Receivables (Money owed to you)",
        liabilitiesLabel: "Short-term Liabilities",
        calculateButton: "Calculate Zakat",
        resultTitle: "Your Zakat Amount",
        totalAssets: "Total Assets",
        netAssets: "Net Assets (Zakat-Eligible)",
        zakatDue: "Zakat Due (2.5%)",
        nisabNotMet: "Your wealth is below the Nisab value. No Zakat is due.",
        reset: "Reset"
    }
}

export default function ZakatCalculatorPage() {
  const { language } = useLanguage();
  const c = content[language] || content.de;

  const [nisab, setNisab] = useState(5000); // Example value
  const [cash, setCash] = useState('');
  const [gold, setGold] = useState('');
  const [investments, setInvestments] = useState('');
  const [debts, setDebts] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [zakatResult, setZakatResult] = useState<{ netAssets: number, zakatDue: number } | null>(null);
  const [nisabMet, setNisabMet] = useState(true);

  const calculateZakat = () => {
    const totalAssets = Number(cash) + Number(gold) + Number(investments) + Number(debts);
    const netAssets = totalAssets - Number(liabilities);
    
    if (netAssets >= nisab) {
        setNisabMet(true);
        const zakatDue = netAssets * ZAKAT_RATE;
        setZakatResult({ netAssets, zakatDue });
    } else {
        setNisabMet(false);
        setZakatResult(null);
    }
  }

  const resetCalculator = () => {
    setCash('');
    setGold('');
    setInvestments('');
    setDebts('');
    setLiabilities('');
    setZakatResult(null);
    setNisabMet(true);
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                 <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <Calculator className="h-10 w-10" />
                    {c.pageTitle}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">{c.pageDescription}</p>
            </header>

            <Alert className="mb-8">
                <Info className="h-4 w-4" />
                <AlertTitle>{c.nisabTitle}</AlertTitle>
                <AlertDescription>{c.nisabDescription}</AlertDescription>
            </Alert>
            
            <Card>
                <CardHeader>
                    <CardTitle>{c.assetsTitle}</CardTitle>
                    <CardDescription>{c.assetsDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cash">{c.cashLabel}</Label>
                            <Input id="cash" type="number" placeholder="€" value={cash} onChange={e => setCash(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gold">{c.goldSilverLabel}</Label>
                            <Input id="gold" type="number" placeholder="€" value={gold} onChange={e => setGold(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="investments">{c.investmentsLabel}</Label>
                            <Input id="investments" type="number" placeholder="€" value={investments} onChange={e => setInvestments(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="debts">{c.debtsLabel}</Label>
                            <Input id="debts" type="number" placeholder="€" value={debts} onChange={e => setDebts(e.target.value)} />
                        </div>
                    </div>
                     <div className="space-y-2 pt-4 border-t">
                        <Label htmlFor="liabilities">{c.liabilitiesLabel}</Label>
                        <Input id="liabilities" type="number" placeholder="€" value={liabilities} onChange={e => setLiabilities(e.target.value)} />
                    </div>
                    <Button className="w-full !mt-6" onClick={calculateZakat}>{c.calculateButton}</Button>
                </CardContent>
            </Card>

            {(zakatResult || !nisabMet) && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>{c.resultTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!nisabMet ? (
                            <p className="text-lg font-semibold text-center">{c.nisabNotMet}</p>
                        ) : zakatResult ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <p>{c.netAssets}:</p>
                                    <p className="font-semibold">{zakatResult.netAssets.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                                </div>
                                <div className="flex justify-between items-center text-primary text-xl p-4 bg-primary/10 rounded-md">
                                    <p className="font-bold">{c.zakatDue}:</p>
                                    <p className="font-bold">{zakatResult.zakatDue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                                </div>
                            </div>
                        ) : null}
                    </CardContent>
                     <CardFooter>
                        <Button variant="outline" className="w-full" onClick={resetCalculator}>
                            <RefreshCw className="mr-2 h-4 w-4"/>
                            {c.reset}
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    </div>
  );
}
