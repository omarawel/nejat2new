
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Landmark, HandCoins, PiggyBank, Briefcase, Handshake, Sprout, TrendingDown, Scale, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Finanzen im Islam",
        description: "Ein Leitfaden zu den ethischen und spirituellen Prinzipien des Umgangs mit Vermögen im Islam.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: HandCoins,
                title: "Zakat (Die Pflichtabgabe)",
                content: "Zakat ist eine der fünf Säulen des Islam und eine obligatorische Abgabe auf bestimmte Arten von Vermögen, die einen bestimmten Schwellenwert (Nisab) überschreiten und ein Mondjahr lang im Besitz waren. Sie dient der Reinigung des eigenen Vermögens, der Bekämpfung von Armut und der Förderung sozialer Gerechtigkeit. Sie wird an acht im Koran festgelegte Gruppen von Bedürftigen verteilt."
            },
            {
                icon: TrendingDown,
                title: "Riba (Zinsen)",
                content: "Riba, was wörtlich 'Zuwachs' oder 'Überschuss' bedeutet, bezieht sich auf Zinsen oder Wucher und ist im Islam strengstens verboten (haram). Das Verbot gilt sowohl für das Nehmen als auch für das Geben von Zinsen. Die Weisheit dahinter ist, Ausbeutung zu verhindern und ein faires Wirtschaftssystem zu fördern, das auf realem Handel und Investitionen basiert, anstatt auf der Vermehrung von Geld durch Geld."
            },
            {
                icon: PiggyBank,
                title: "Sadaqa (Freiwillige Spende)",
                content: "Sadaqa ist jede Form von freiwilliger Wohltätigkeit, die über die Zakat hinausgeht. Sie kann finanzieller oder materieller Natur sein, aber auch ein Lächeln, ein gutes Wort oder das Entfernen eines Hindernisses vom Weg. Sadaqa ist eine Möglichkeit, Dankbarkeit gegenüber Allah zu zeigen, Sünden zu sühnen und Segen (Barakah) im eigenen Leben und Vermögen zu erlangen."
            },
            {
                icon: Briefcase,
                title: "Halal-Einkommen",
                content: "Muslime sind verpflichtet, ihren Lebensunterhalt auf eine Weise zu verdienen, die nach islamischem Recht erlaubt (halal) ist. Dies bedeutet, Berufe und Geschäfte zu meiden, die mit Verbotenem wie Alkohol, Glücksspiel, Zinsen oder Betrug zu tun haben. Das Streben nach einem Halal-Einkommen ist selbst ein Akt der Anbetung und stellt sicher, dass das, was man konsumiert und für seine Familie ausgibt, rein ist."
            },
            {
                icon: Handshake,
                title: "Umgang mit Schulden",
                content: "Der Islam rät davon ab, sich unnötig zu verschulden, erkennt aber an, dass es manchmal notwendig ist. Es wird dringend empfohlen, Schulden schriftlich festzuhalten und so schnell wie möglich zurückzuzahlen. Der Prophet (ﷺ) suchte oft Zuflucht bei Allah vor der Last der Schulden. Dem Gläubiger wird Geduld und Nachsicht empfohlen, und das Erlassen einer Schuld gilt als eine große Wohltat."
            },
            {
                icon: Sprout,
                title: "Investieren und Handel",
                content: "Der Islam ermutigt zum Handel und zu ethischen Investitionen, die der Gesellschaft zugutekommen. Prinzipien wie Transparenz, Ehrlichkeit und Fairness sind von zentraler Bedeutung. Verträge sollten klar und gerecht sein. Investitionen in Industrien, die Haram-Produkte oder -Dienstleistungen anbieten, sind nicht gestattet. Partnerschaftsmodelle wie Mudarabah (Gewinnbeteiligung) und Musharakah (Joint Venture) werden gefördert."
            },
             {
                icon: Scale,
                title: "Vermeidung von Verschwendung (Israf)",
                content: "Verschwendung und übermäßiger Konsum werden im Islam missbilligt. Muslime werden dazu angehalten, in allen Lebensbereichen maßvoll zu sein, einschließlich beim Essen, Trinken und bei Ausgaben. Allah sagt im Koran: '...und seid nicht verschwenderisch. Wahrlich, Er liebt die Verschwender nicht.' (6:141). Dieses Prinzip fördert Dankbarkeit, Nachhaltigkeit und ein Bewusstsein für die Bedürfnisse anderer."
            }
        ]
    },
    en: {
        title: "Finances in Islam",
        description: "A guide to the ethical and spiritual principles of handling wealth in Islam.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: HandCoins,
                title: "Zakat (The Obligatory Charity)",
                content: "Zakat is one of the five pillars of Islam and an obligatory levy on certain types of wealth that exceed a specific threshold (Nisab) and have been held for a lunar year. It serves to purify one's wealth, combat poverty, and promote social justice. It is distributed to eight groups of needy people specified in the Quran."
            },
            {
                icon: TrendingDown,
                title: "Riba (Interest)",
                content: "Riba, which literally means 'increase' or 'excess', refers to interest or usury and is strictly forbidden (haram) in Islam. The prohibition applies to both taking and giving interest. The wisdom behind this is to prevent exploitation and promote a fair economic system based on real trade and investment, rather than the multiplication of money through money."
            },
            {
                icon: PiggyBank,
                title: "Sadaqa (Voluntary Charity)",
                content: "Sadaqa is any form of voluntary charity that goes beyond Zakat. It can be financial or material, but also a smile, a kind word, or removing an obstacle from the path. Sadaqa is a way to show gratitude to Allah, atone for sins, and gain blessings (Barakah) in one's life and wealth."
            },
            {
                icon: Briefcase,
                title: "Halal Income",
                content: "Muslims are obliged to earn their livelihood in a manner that is permissible (halal) under Islamic law. This means avoiding professions and businesses related to prohibited things like alcohol, gambling, interest, or fraud. The pursuit of a Halal income is itself an act of worship and ensures that what one consumes and spends on one's family is pure."
            },
            {
                icon: Handshake,
                title: "Dealing with Debt",
                content: "Islam advises against getting into unnecessary debt but recognizes that it is sometimes necessary. It is strongly recommended to record debts in writing and to repay them as soon as possible. The Prophet (ﷺ) often sought refuge in Allah from the burden of debt. The creditor is advised to be patient and lenient, and forgiving a debt is considered a great act of charity."
            },
            {
                icon: Sprout,
                title: "Investing and Trade",
                content: "Islam encourages trade and ethical investments that benefit society. Principles such as transparency, honesty, and fairness are central. Contracts should be clear and just. Investments in industries that offer Haram products or services are not permitted. Partnership models like Mudarabah (profit-sharing) and Musharakah (joint venture) are encouraged."
            },
            {
                icon: Scale,
                title: "Avoiding Waste (Israf)",
                content: "Wastefulness and excessive consumption are disapproved of in Islam. Muslims are encouraged to be moderate in all aspects of life, including eating, drinking, and spending. Allah says in the Quran: '...and do not be extravagant. Verily, He does not love the extravagant.' (6:141). This principle promotes gratitude, sustainability, and an awareness of the needs of others."
            }
        ]
    }
};

export default function FinancesPage() {
    const { language } = useLanguage();
    const c = content[language] || content.de;

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {c.backToFeatures}
                </Link>
            </Button>
            <header className="text-center mb-12">
                 <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
                    <Landmark className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {c.sections.map((section, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <section.icon className="h-7 w-7 text-primary" />
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{section.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
