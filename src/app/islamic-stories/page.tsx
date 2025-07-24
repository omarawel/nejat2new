
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/language-provider';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const storiesData = {
  de: {
    title: 'Islamische Geschichten',
    description: 'Inspirierende und lehrreiche Erzählungen aus dem Koran und der Sunnah.',
    backToFeatures: "Zurück zu den Funktionen",
    stories: [
      {
        title: 'Die Gefährten der Höhle (Ashab al-Kahf)',
        story: 'Eine Gruppe junger Männer floh vor einem tyrranischen König, der sie zum Götzendienst zwingen wollte, und suchte Zuflucht in einer Höhle. Allah versetzte sie in einen tiefen Schlaf, der über 300 Jahre dauerte. Als sie aufwachten, hatte sich die Gesellschaft zum Monotheismus gewandelt. Ihre Geschichte, die in der Sura Al-Kahf erzählt wird, ist ein Zeichen für Allahs Macht, die Gläubigen zu schützen, und ein Beweis für die Auferstehung.'
      },
      {
        title: 'Die Geschichte von Qarun',
        story: 'Qarun war ein Mann aus dem Volk von Musa (Moses), dem Allah unermesslichen Reichtum schenkte. Anstatt dankbar zu sein, wurde er arrogant und prahlte, er habe den Reichtum durch sein eigenes Wissen erlangt. Er weigerte sich, den Armen zu helfen. Als Strafe für seinen Hochmut und Geiz ließ Allah die Erde ihn und seine Schätze verschlingen. Seine Geschichte ist eine Warnung vor den Gefahren von Stolz und Materialismus.'
      },
      {
        title: 'Der Mann, der 99 Menschen tötete',
        story: 'Ein Mann, der 99 Menschen getötet hatte, suchte verzweifelt nach Reue. Ein Gelehrter sagte ihm, seine Reue sei unmöglich, woraufhin der Mann auch ihn tötete. Er gab die Hoffnung nicht auf und fand einen anderen Gelehrten, der ihm riet, in ein Land zu ziehen, in dem rechtschaffene Menschen lebten. Auf dem Weg dorthin starb der Mann. Die Engel der Barmherzigkeit und die Engel der Strafe stritten um seine Seele. Allah befahl ihnen, die Entfernung zu beiden Ländern zu messen. Da er dem Land der Rechtschaffenheit näher war, wurde ihm vergeben. Dies zeigt die unendliche Barmherzigkeit Allahs und die Bedeutung aufrichtiger Reue.'
      },
      {
        title: 'Der Besitzer der zwei Gärten',
        story: 'Im Koran wird die Geschichte eines Mannes erzählt, dem Allah zwei prächtige Gärten voller Früchte und Wasserläufe schenkte. Er wurde stolz auf seinen Reichtum und glaubte, dieser würde niemals vergehen. Er verleugnete sogar das Jenseits. Sein gläubiger Freund ermahnte ihn zur Dankbarkeit. Doch der Mann hörte nicht darauf. Daraufhin vernichtete Allah seine Gärten vollständig. Reuig erkannte der Mann seinen Fehler, doch es war zu spät. Die Geschichte lehrt über die Vergänglichkeit des weltlichen Besitzes und die Wichtigkeit der Demut.'
      },
      {
        title: 'Die Leute des Grabens (Ashab al-Ukhdud)',
        story: 'Ein gläubiger Junge wurde von einem tyrranischen König verfolgt. Jedes Mal, wenn der König versuchte, ihn zu töten, rettete Allah ihn auf wundersame Weise. Schließlich riet der Junge dem König, einen Pfeil im Namen Allahs abzuschießen. Der König tat dies, traf den Jungen und dieser starb. Als das Volk dieses Wunder sah, nahmen sie den Glauben an. Wütend befahl der König, einen Graben mit Feuer zu füllen und alle Gläubigen hineinzuwerfen, die sich weigerten, ihrem Glauben abzuschwören. Sie blieben standhaft und wählten den Märtyrertod. Ihre Geschichte ist ein Symbol für Standhaftigkeit im Glauben.'
      },
      {
        title: 'Die Königin von Saba (Bilqis)',
        story: 'Die Geschichte von Prophet Sulayman (Salomo) und der Königin von Saba ist eine Erzählung über Weisheit und Macht. Sulayman, der mit den Vögeln kommunizieren konnte, erfuhr von der sonnenanbetenden Königin. Er sandte ihr eine Botschaft, sie zur Anbetung des einen wahren Gottes einzuladen. Beeindruckt von seiner Weisheit und den Wundern, die sie erlebte, wie die wundersame Versetzung ihres Throns nach Jerusalem, nahm sie schließlich den Glauben an.'
      },
      {
        title: 'Die Geschichte von Habil und Qabil (Abel und Kain)',
        story: 'Die Söhne Adams, Habil und Qabil, brachten beide ein Opfer dar. Allah nahm das Opfer des frommen Habil an, aber nicht das von Qabil. Aus Neid und Eifersucht tötete Qabil seinen Bruder Habil. Dies war der erste Mord in der Geschichte der Menschheit. Qabil wurde von Reue geplagt und wusste nicht, was er mit der Leiche seines Bruders tun sollte, bis Allah ihm einen Raben schickte, der ihm zeigte, wie man ihn begräbt. Die Geschichte warnt vor den Konsequenzen von Neid und Sünde.'
      },
      {
        title: 'Musa und al-Khidr',
        story: 'Im Koran (Sure Al-Kahf) wird die Reise des Propheten Musa mit einem weisen Diener Allahs, bekannt als al-Khidr, erzählt. Al-Khidr vollbrachte drei scheinbar seltsame Taten: Er bohrte ein Loch in ein Boot, tötete einen Jungen und baute eine Mauer in einer Stadt wieder auf, die ihnen die Gastfreundschaft verweigerte. Jede Tat hatte eine verborgene Weisheit, die auf Allahs umfassendem Plan beruhte und die Grenzen des menschlichen Wissens aufzeigte. Sie lehrt Geduld und Vertrauen in die göttliche Weisheit.'
      },
      {
        title: 'Dhul-Qarnayn und die Mauer von Gog und Magog',
        story: 'Dhul-Qarnayn war ein gerechter und mächtiger Herrscher. Auf seinen Reisen erreichte er ein Volk, das zwischen zwei Bergen lebte und von den zerstörerischen Stämmen Gog und Magog geplagt wurde. Sie baten ihn, eine Barriere zu errichten. Mit ihrer Hilfe baute Dhul-Qarnayn eine mächtige Mauer aus Eisen und geschmolzenem Kupfer, die Gog und Magog bis zum von Allah bestimmten Tag einschloss. Die Geschichte betont die Bedeutung von Führung, Zusammenarbeit und dem Schutz der Schwachen.'
      },
      {
        title: 'Der Prophet und die vergebene Prostituierte',
        story: 'Der Prophet Muhammad (ﷺ) erzählte von einer Prostituierten aus den Kindern Israels, die an einem heißen Tag an einem Brunnen vorbeikam. Sie sah einen Hund, der vor Durst die feuchte Erde leckte. Aus Mitleid zog sie mit ihrem Schuh Wasser aus dem Brunnen und gab dem Hund zu trinken. Allah war mit dieser barmherzigen Tat so zufrieden, dass Er ihr all ihre Sünden vergab. Diese Geschichte unterstreicht die immense Bedeutung von Barmherzigkeit gegenüber allen Geschöpfen.'
      },
      {
        title: 'Die drei Männer in der Höhle',
        story: 'Drei Männer suchten auf ihrer Reise Schutz in einer Höhle, als ein Felsbrocken den Eingang verschloss. Sie erkannten, dass nur ihre aufrichtigsten Taten sie retten konnten. Jeder von ihnen machte ein Bittgebet und nannte eine rechtschaffene Tat, die er allein um Allahs willen vollbracht hatte: der eine seine außergewöhnliche Güte zu seinen Eltern, der zweite seine absolute Fairness gegenüber einem Arbeiter und der dritte seine Furcht vor Allah, die ihn von einer Sünde abhielt. Nach jedem Gebet bewegte sich der Fels ein Stück, bis der Ausgang schließlich frei war. Dies lehrt die Kraft aufrichtiger Taten.'
      },
      {
        title: 'Uways al-Qarani und die Liebe zur Mutter',
        story: 'Uways al-Qarani lebte zur Zeit des Propheten (ﷺ), traf ihn aber nie persönlich, da er sich hingebungsvoll um seine alte Mutter im Jemen kümmerte. Der Prophet (ﷺ) kannte ihn jedoch und lobte seine Frömmigkeit und seinen Gehorsam gegenüber seiner Mutter so sehr, dass er seine Gefährten anwies, Uways zu bitten, für sie um Vergebung zu beten. Seine Geschichte ist das ultimative Beispiel für die hohe Stellung der Eltern im Islam, insbesondere der Mutter.'
      },
      {
        title: 'Die Spaltung des Mondes',
        story: 'Als die Götzendiener von Mekka ein klares Zeichen vom Propheten Muhammad (ﷺ) forderten, um seine Wahrhaftigkeit zu beweisen, betete er zu Allah. Daraufhin spaltete sich der Mond vor ihren Augen in zwei Hälften, wobei jede Hälfte auf einer Seite eines Berges erschien. Dieses überwältigende Wunder, das im Koran erwähnt wird, sollte ein unbestreitbarer Beweis sein, doch viele der Götzendiener blieben in ihrem Unglauben verharrt und nannten es Zauberei.'
      },
       {
        title: 'Barira und ihr Ehemann Mughith',
        story: 'Barira war eine Sklavin, die von Aisha (ra) befreit wurde. Als freie Frau hatte sie das Recht, sich von ihrem Ehemann Mughith, der noch ein Sklave war, scheiden zu lassen, und sie tat es. Mughith war untröstlich und folgte ihr weinend durch die Straßen Medinas, seine Tränen benetzten seinen Bart. Der Prophet (ﷺ) war von seiner tiefen Liebe bewegt und versuchte, bei Barira zu vermitteln. Er fragte sie, ob sie zu ihm zurückkehren würde. Sie fragte: "O Gesandter Allahs, befiehlst du mir das?" Er antwortete: "Nein, ich lege nur Fürsprache ein." Sie sagte: "Dann brauche ich ihn nicht." Diese Geschichte zeigt das Recht der Frau auf Wahl und die Barmherzigkeit des Propheten, während sie gleichzeitig die Tiefe menschlicher Emotionen beleuchtet.'
      },
    ]
  },
  en: {
    title: 'Islamic Stories',
    description: 'Inspiring and educational narratives from the Quran and Sunnah.',
    backToFeatures: "Back to Features",
    stories: [
      {
        title: 'The Companions of the Cave (Ashab al-Kahf)',
        story: 'A group of young men fled from a tyrannical king who wanted to force them into idolatry and sought refuge in a cave. Allah put them into a deep sleep that lasted for over 300 years. When they woke up, society had converted to monotheism. Their story, told in Surah Al-Kahf, is a sign of Allah\'s power to protect the believers and a proof of the resurrection.'
      },
      {
        title: 'The Story of Qarun',
        story: 'Qarun was a man from the people of Musa (Moses) to whom Allah gave immense wealth. Instead of being grateful, he became arrogant and boasted that he had obtained the wealth through his own knowledge. He refused to help the poor. As a punishment for his pride and avarice, Allah caused the earth to swallow him and his treasures. His story is a warning against the dangers of pride and materialism.'
      },
      {
        title: 'The Man Who Killed 99 People',
        story: 'A man who had killed 99 people desperately sought repentance. A scholar told him his repentance was impossible, whereupon the man killed him too. He did not give up hope and found another scholar who advised him to move to a land where righteous people lived. On the way there, the man died. The angels of mercy and the angels of punishment argued over his soul. Allah commanded them to measure the distance to both lands. As he was closer to the land of righteousness, he was forgiven. This shows the infinite mercy of Allah and the importance of sincere repentance.'
      },
      {
        title: 'The Owner of the Two Gardens',
        story: 'The Quran tells the story of a man to whom Allah gave two magnificent gardens full of fruits and streams. He became proud of his wealth and believed it would never perish. He even denied the Hereafter. His believing friend admonished him to be grateful. But the man did not listen. Then Allah completely destroyed his gardens. Regretfully, the man recognized his mistake, but it was too late. The story teaches about the transience of worldly possessions and the importance of humility.'
      },
      {
        title: 'The People of the Ditch (Ashab al-Ukhdud)',
        story: 'A believing boy was persecuted by a tyrannical king. Every time the king tried to kill him, Allah miraculously saved him. Finally, the boy advised the king to shoot an arrow in the name of Allah. The king did so, hit the boy, and he died. When the people saw this miracle, they accepted the faith. Enraged, the king commanded a ditch to be filled with fire and all believers who refused to renounce their faith to be thrown into it. They remained steadfast and chose martyrdom. Their story is a symbol of steadfastness in faith.'
      },
      {
        title: 'The Queen of Sheba (Bilqis)',
        story: 'The story of Prophet Sulayman (Solomon) and the Queen of Sheba is a tale of wisdom and power. Sulayman, who could communicate with birds, learned of the sun-worshipping queen. He sent her a message inviting her to worship the one true God. Impressed by his wisdom and the miracles she witnessed, such as the miraculous transportation of her throne to Jerusalem, she eventually accepted the faith.'
      },
      {
        title: 'The Story of Habil and Qabil (Abel and Cain)',
        story: 'The sons of Adam, Habil and Qabil, both offered a sacrifice. Allah accepted the sacrifice of the pious Habil, but not that of Qabil. Out of envy and jealousy, Qabil killed his brother Habil. This was the first murder in human history. Qabil was plagued by remorse and did not know what to do with his brother\'s body until Allah sent a raven to show him how to bury it. The story warns against the consequences of envy and sin.'
      },
      {
        title: 'Musa and al-Khidr',
        story: 'In the Quran (Surah Al-Kahf), the journey of Prophet Musa with a wise servant of Allah, known as al-Khidr, is recounted. Al-Khidr performed three seemingly strange acts: he made a hole in a boat, killed a boy, and rebuilt a wall in a city that refused them hospitality. Each act had a hidden wisdom based on Allah\'s comprehensive plan, demonstrating the limits of human knowledge. It teaches patience and trust in divine wisdom.'
      },
      {
        title: 'Dhul-Qarnayn and the Wall of Gog and Magog',
        story: 'Dhul-Qarnayn was a just and powerful ruler. On his travels, he reached a people living between two mountains who were plagued by the destructive tribes of Gog and Magog. They asked him to build a barrier. With their help, Dhul-Qarnayn built a mighty wall of iron and molten copper, which enclosed Gog and Magog until the day appointed by Allah. The story emphasizes the importance of leadership, cooperation, and protecting the weak.'
      },
      {
        title: 'The Prophet and the Forgiven Prostitute',
        story: 'The Prophet Muhammad (ﷺ) told of a prostitute from the Children of Israel who passed by a well on a hot day. She saw a dog licking the moist earth out of thirst. Out of compassion, she drew water from the well with her shoe and gave it to the dog to drink. Allah was so pleased with this merciful act that He forgave all her sins. This story highlights the immense importance of mercy towards all creatures.'
      },
      {
        title: 'The Three Men in the Cave',
        story: 'Three men on a journey sought shelter in a cave when a boulder blocked the entrance. They realized that only their most sincere deeds could save them. Each of them made a supplication, mentioning a righteous deed he had done solely for Allah\'s sake: one his exceptional kindness to his parents, the second his absolute fairness to a worker, and the third his fear of Allah that kept him from a sin. After each prayer, the boulder moved a little, until the exit was finally clear. This teaches the power of sincere deeds.'
      },
      {
        title: 'Uways al-Qarani and the Love for a Mother',
        story: 'Uways al-Qarani lived during the time of the Prophet (ﷺ) but never met him personally because he was devotedly caring for his elderly mother in Yemen. However, the Prophet (ﷺ) knew of him and praised his piety and obedience to his mother so much that he instructed his companions to ask Uways to pray for their forgiveness. His story is the ultimate example of the high status of parents in Islam, especially the mother.'
      },
      {
        title: 'The Splitting of the Moon',
        story: 'When the idolaters of Mecca demanded a clear sign from the Prophet Muhammad (ﷺ) to prove his truthfulness, he prayed to Allah. The moon then split in two before their eyes, with each half appearing on one side of a mountain. This overwhelming miracle, mentioned in the Quran, was intended to be an undeniable proof, yet many of the idolaters remained in their disbelief, calling it magic.'
      },
       {
        title: 'Barira and her Husband Mughith',
        story: 'Barira was a female slave who was freed by Aisha (ra). As a free woman, she had the right to divorce her husband, Mughith, who was still a slave, and she did. Mughith was heartbroken and followed her through the streets of Medina, weeping, his tears wetting his beard. The Prophet (ﷺ) was moved by his deep love and tried to mediate with Barira. He asked her if she would return to him. She asked, "O Messenger of Allah, are you commanding me?" He replied, "No, I am only interceding." She said, "Then I have no need of him." This story shows the woman\'s right to choose and the mercy of the Prophet, while also highlighting the depth of human emotions.'
      },
    ]
  }
};


export default function IslamicStoriesPage() {
  const { language } = useLanguage();
  const c = storiesData[language as keyof typeof storiesData] || storiesData.de;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {c.backToFeatures}
        </Link>
      </Button>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
            {c.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">{c.description}</p>
      </header>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {c.stories.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl text-left">{item.title || item.name}</AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 px-4">
              {item.story}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
