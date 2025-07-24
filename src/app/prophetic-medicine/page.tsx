
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { Leaf, Droplets, Utensils, Shield, ArrowLeft, Sun, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
    de: {
        title: "Prophetische Medizin (Tibb an-Nabawi)",
        description: "Ein Einblick in die Lehren des Propheten Muhammad (ﷺ) bezüglich Gesundheit, Heilung und Wohlbefinden.",
        backToFeatures: "Zurück zu den Funktionen",
        sections: [
            {
                icon: Shield,
                title: "Ganzheitlicher Ansatz",
                content: "Die prophetische Medizin betrachtet den Menschen als Ganzes – eine Einheit aus Körper, Geist und Seele. Wahre Gesundheit entsteht aus dem Gleichgewicht dieser drei Aspekte. Die stärkste Medizin ist das Vertrauen auf Allah (Tawakkul) und das Gebet (Dua), ergänzt durch natürliche Heilmittel und eine gesunde Lebensweise."
            },
            {
                icon: Droplets,
                title: "Honig (Asal)",
                content: "Der Koran beschreibt Honig als 'Heilung für die Menschen' (Sure 16:69). Der Prophet (ﷺ) empfahl ihn bei verschiedenen Beschwerden, insbesondere bei Magenschmerzen. Honig ist für seine antibakteriellen und entzündungshemmenden Eigenschaften bekannt und stärkt das Immunsystem."
            },
            {
                icon: Leaf,
                title: "Schwarzkümmel (Habbat as-Sauda)",
                content: "Der Prophet (ﷺ) sagte: 'Im Schwarzkümmel gibt es Heilung für jede Krankheit, außer für den Tod.' (Bukhari). Schwarzkümmelöl und -samen werden seit Jahrhunderten zur Stärkung des Immunsystems und zur Behandlung einer Vielzahl von Krankheiten von Allergien bis hin zu Entzündungen verwendet."
            },
            {
                icon: Utensils,
                title: "Datteln (Tamr)",
                content: "Datteln, insbesondere die Ajwa-Dattel aus Medina, werden für ihren hohen Nährwert und ihre schützenden Eigenschaften geschätzt. Der Prophet (ﷺ) empfahl, den Tag mit Datteln zu beginnen und das Fasten mit ihnen zu brechen. Sie sind reich an Ballaststoffen, Kalium und Antioxidantien."
            },
             {
                icon: Shield,
                title: "Hijama (Schröpfen)",
                content: "Hijama ist eine traditionelle Heilmethode, bei der durch das Anlegen von Schröpfgläsern ein Unterdruck erzeugt wird, um Giftstoffe aus dem Körper zu ziehen. Der Prophet (ﷺ) praktizierte und empfahl diese Methode und bezeichnete sie als eine der besten Heilmethoden."
            },
            {
                icon: Leaf,
                title: "Oliven & Olivenöl (Zaytun)",
                content: "Der Olivenbaum wird im Koran als 'gesegneter Baum' bezeichnet. Der Prophet (ﷺ) empfahl, Olivenöl zu essen und es auf Haut und Haar aufzutragen. Es ist reich an gesunden Fetten und Antioxidantien und gilt als nahrhaft für den gesamten Körper."
            },
            {
                icon: Droplets,
                title: "Wasser (Ma')",
                content: "Wasser ist die Quelle allen Lebens. Der Islam betont die Bedeutung von Reinheit und das Trinken von sauberem Wasser. Dem Zamzam-Wasser aus Mekka wird eine besondere heilende Wirkung zugeschrieben. Der Prophet (ﷺ) sagte: 'Das Zamzam-Wasser ist für das, wofür es getrunken wird.'"
            },
            {
                icon: Utensils,
                title: "Talbina (Gerstenbrei)",
                content: "Talbina ist ein Brei aus Gerstenmehl, Milch und Honig. Der Prophet (ﷺ) empfahl es, um das Herz des Trauernden zu beruhigen und den Kranken zu stärken. Es ist leicht verdaulich und nahrhaft."
            },
            {
                icon: Sprout,
                title: "Feigen (Teen)",
                content: "Die Feige wird im Koran in der gleichnamigen Sure erwähnt, was ihre besondere Stellung unterstreicht. Sie gilt als Frucht des Paradieses und ist bekannt für ihren hohen Gehalt an Ballaststoffen und Mineralien, die die Verdauung fördern."
            },
             {
                icon: Leaf,
                title: "Miswak",
                content: "Der Miswak ist ein Zweig des Arak-Baumes, der als natürliche Zahnbürste verwendet wird. Der Prophet (ﷺ) benutzte ihn regelmäßig und betonte seine Wichtigkeit stark: 'Wäre es für meine Ummah keine Härte, hätte ich ihnen befohlen, den Miswak vor jedem Gebet zu benutzen.' (Bukhari). Er reinigt den Mund, erfreut Allah und stärkt das Zahnfleisch."
            },
             {
                icon: Sprout,
                title: "Ingwer (Zanjabil)",
                content: "Ingwer wird im Koran als eines der Getränke der Paradiesbewohner erwähnt. In der prophetischen Medizin wird er für seine wärmenden Eigenschaften, die Förderung der Verdauung und die Linderung von Übelkeit geschätzt."
            },
             {
                icon: Utensils,
                title: "Kürbis (Dabba')",
                content: "Es wird überliefert, dass der Kürbis eines der Lieblingsgemüse des Propheten Muhammad (ﷺ) war. Er ist reich an Vitaminen und Wasser und gilt als leicht und nahrhaft für den Körper."
            },
            {
                icon: Leaf,
                title: "Costus (Qust al-Hindi)",
                content: "Der Prophet (ﷺ) empfahl Costus als Behandlung für sieben Krankheiten, einschließlich Mandelentzündung und Pleuritis. Es wird als Pulver inhaliert oder mit Öl vermischt verwendet und ist für seine starken antibakteriellen Eigenschaften bekannt."
            },
            {
                icon: Sprout,
                title: "Senna (Sana Makki)",
                content: "Senna wurde vom Propheten (ﷺ) als mildes und effektives Abführmittel empfohlen. Er sagte: 'Wenn es etwas gäbe, das den Tod heilen könnte, wäre es Senna.' (Tirmidhi). Es wird zur Reinigung des Verdauungssystems verwendet."
            },
            {
                icon: Sprout,
                title: "Trüffel (Kam'ah)",
                content: "Der Prophet (ﷺ) lehrte, dass Trüffel eine Art von 'Manna' sind (eine himmlische Gabe) und dass ihr Saft eine Heilung für die Augen ist. Die moderne Forschung untersucht ihre potenziellen medizinischen Vorteile."
            },
            {
                icon: Droplets,
                title: "Essig (Khall)",
                content: "Der Prophet Muhammad (ﷺ) lobte Essig und sagte: 'Welch gutes Gewürz ist Essig.' (Muslim). Er wurde nicht nur zum Würzen verwendet, sondern auch als einfaches Heilmittel zur Förderung der Verdauung."
            },
            {
                icon: Leaf,
                title: "Henna (Hina')",
                content: "Henna wurde nicht nur zum Färben von Haar und Bart verwendet, sondern auch medizinisch. Bei Kopfschmerzen wurde eine Paste auf die Schläfen aufgetragen, und es wurde zur Heilung von kleinen Wunden und Entzündungen an Händen und Füßen genutzt."
            },
            {
                icon: Sprout,
                title: "Granatapfel (Rumman)",
                content: "Im Koran wird der Granatapfel als eine der Früchte des Paradieses erwähnt. Er ist reich an Antioxidantien, Vitaminen und wird in der traditionellen Medizin zur Stärkung des Herzens und zur Verbesserung der Verdauung geschätzt."
            },
            {
                icon: Sprout,
                title: "Weintrauben & Rosinen (Inab & Zabib)",
                content: "Weintrauben und ihre getrocknete Form, die Rosinen, waren beliebte Früchte des Propheten (ﷺ). Sie sind eine gute Energiequelle und reich an Eisen und anderen wichtigen Nährstoffen. Rosinen wurden oft in Wasser eingeweicht, um ein nahrhaftes Getränk namens Nabidh herzustellen."
            }
        ]
    },
    en: {
        title: "Prophetic Medicine (Tibb an-Nabawi)",
        description: "An insight into the teachings of the Prophet Muhammad (ﷺ) regarding health, healing, and well-being.",
        backToFeatures: "Back to Features",
        sections: [
            {
                icon: Shield,
                title: "Holistic Approach",
                content: "Prophetic medicine views a person as a whole – a unity of body, mind, and soul. True health comes from the balance of these three aspects. The most potent medicine is trust in Allah (Tawakkul) and prayer (Dua), supplemented by natural remedies and a healthy lifestyle."
            },
            {
                icon: Droplets,
                title: "Honey (Asal)",
                content: "The Quran describes honey as 'a healing for mankind' (Surah 16:69). The Prophet (ﷺ) recommended it for various ailments, especially for stomach pains. Honey is known for its antibacterial and anti-inflammatory properties and boosts the immune system."
            },
            {
                icon: Leaf,
                title: "Black Seed (Habbat as-Sauda)",
                content: "The Prophet (ﷺ) said: 'In the black seed is a cure for every disease except death.' (Bukhari). Black seed oil and seeds have been used for centuries to strengthen the immune system and treat a variety of diseases from allergies to inflammation."
            },
            {
                icon: Utensils,
                title: "Dates (Tamr)",
                content: "Dates, especially the Ajwa date from Medina, are valued for their high nutritional value and protective properties. The Prophet (ﷺ) recommended starting the day with dates and breaking the fast with them. They are rich in fiber, potassium, and antioxidants."
            },
            {
                icon: Shield,
                title: "Hijama (Cupping)",
                content: "Hijama is a traditional healing method in which a vacuum is created by placing cups on the skin to draw out toxins from the body. The Prophet (ﷺ) practiced and recommended this method, calling it one of the best healing methods."
            },
            {
                icon: Leaf,
                title: "Olives & Olive Oil (Zaytun)",
                content: "The olive tree is described in the Quran as a 'blessed tree'. The Prophet (ﷺ) recommended eating olive oil and applying it to the skin and hair. It is rich in healthy fats and antioxidants and is considered nourishing for the entire body."
            },
            {
                icon: Droplets,
                title: "Water (Ma')",
                content: "Water is the source of all life. Islam emphasizes the importance of purity and drinking clean water. Zamzam water from Mecca is attributed with special healing properties. The Prophet (ﷺ) said: 'Zamzam water is for whatever it is drunk for.'"
            },
            {
                icon: Utensils,
                title: "Talbina (Barley Porridge)",
                content: "Talbina is a porridge made from barley flour, milk, and honey. The Prophet (ﷺ) recommended it to soothe the heart of the grieving and to strengthen the sick. It is easily digestible and nutritious."
            },
            {
                icon: Sprout,
                title: "Figs (Teen)",
                content: "The fig is mentioned in the Quran in the surah of the same name, which underscores its special status. It is considered a fruit of Paradise and is known for its high content of fiber and minerals that promote digestion."
            },
            {
                icon: Leaf,
                title: "Miswak",
                content: "The Miswak is a branch of the Arak tree used as a natural toothbrush. The Prophet (ﷺ) used it regularly and strongly emphasized its importance: 'Were it not that I would be overburdening my Ummah, I would have ordered them to use the Miswak before every prayer.' (Bukhari). It cleanses the mouth, pleases Allah, and strengthens the gums."
            },
            {
                icon: Sprout,
                title: "Ginger (Zanjabil)",
                content: "Ginger is mentioned in the Quran as one of the drinks of the inhabitants of Paradise. In prophetic medicine, it is valued for its warming properties, promoting digestion, and relieving nausea."
            },
            {
                icon: Utensils,
                title: "Pumpkin (Dabba')",
                content: "It is narrated that pumpkin was one of the favorite vegetables of the Prophet Muhammad (ﷺ). It is rich in vitamins and water and is considered light and nutritious for the body."
            },
            {
                icon: Leaf,
                title: "Costus (Qust al-Hindi)",
                content: "The Prophet (ﷺ) recommended Costus as a treatment for seven ailments, including tonsillitis and pleurisy. It is used as an inhaled powder or mixed with oil and is known for its potent antibacterial properties."
            },
            {
                icon: Sprout,
                title: "Senna (Sana Makki)",
                content: "Senna was recommended by the Prophet (ﷺ) as a gentle and effective laxative. He said: 'If there were anything that could cure death, it would be senna.' (Tirmidhi). It is used to cleanse the digestive system."
            },
            {
                icon: Sprout,
                title: "Truffles (Kam'ah)",
                content: "The Prophet (ﷺ) taught that truffles are a type of 'manna' (a heavenly gift) and that their juice is a cure for the eyes. Modern research is exploring their potential medicinal benefits."
            },
            {
                icon: Droplets,
                title: "Vinegar (Khall)",
                content: "Prophet Muhammad (ﷺ) praised vinegar, saying: 'What a good condiment vinegar is.' (Muslim). It was used not only for seasoning but also as a simple remedy to aid digestion."
            },
            {
                icon: Leaf,
                title: "Henna (Hina')",
                content: "Henna was not only used for dyeing hair and beards but also medicinally. A paste was applied to the temples for headaches, and it was used to heal minor wounds and inflammations on the hands and feet."
            },
            {
                icon: Sprout,
                title: "Pomegranate (Rumman)",
                content: "The Quran mentions the pomegranate as one of the fruits of Paradise. It is rich in antioxidants, vitamins, and is valued in traditional medicine for strengthening the heart and improving digestion."
            },
            {
                icon: Sprout,
                title: "Grapes & Raisins (Inab & Zabib)",
                content: "Grapes and their dried form, raisins, were beloved fruits of the Prophet (ﷺ). They are a good source of energy and are rich in iron and other essential nutrients. Raisins were often soaked in water to create a nutritious drink called Nabidh."
            }
        ]
    }
};

export default function PropheticMedicinePage() {
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
                    <Leaf className="h-10 w-10" />
                    {c.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
            </header>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
