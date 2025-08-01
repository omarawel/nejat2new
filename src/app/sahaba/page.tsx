
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/language-provider';
import { Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AdBanner } from '@/components/ad-banner';

const content = {
  de: {
    title: 'Die Gefährten des Propheten (Sahaba)',
    description: 'Einblicke in das Leben und Vermächtnis der rechtschaffenen Männer und Frauen um den Propheten Muhammad (ﷺ).',
    backToFeatures: "Zurück zu den Funktionen",
    sahaba: [
      {
        name: 'Abu Bakr As-Siddiq (رضي الله عنه)',
        title: 'Der Wahrhaftige & Erster Kalif',
        story: 'Der engste Freund des Propheten (ﷺ) und der erste Mann, der den Islam annahm. Er war bekannt für seine unerschütterliche Loyalität und seinen festen Glauben. Als der Prophet (ﷺ) von seiner Nachtreise (Isra) erzählte, glaubte Abu Bakr ihm ohne zu zögern und erhielt den Titel "As-Siddiq" (der Wahrhaftige). Er begleitete den Propheten auf der Hidschra (Auswanderung) nach Medina und wurde nach dessen Tod zum ersten Kalifen der Muslime gewählt.'
      },
      {
        name: 'Umar ibn al-Khattab (رضي الله عنه)',
        title: 'Al-Faruq & Zweiter Kalif',
        story: 'Umar war anfangs ein erbitterter Gegner des Islam, doch nach dem Hören des Korans wurde sein Herz erweicht und er nahm den Glauben an. Seine Konversion stärkte die Muslime enorm. Er erhielt den Titel "Al-Faruq" (der Unterscheider), weil er klar zwischen Recht und Unrecht unterschied. Als zweiter Kalif erweiterte er das islamische Reich und etablierte viele administrative Institutionen. Er war bekannt für seine Gerechtigkeit, Strenge und Demut.'
      },
      {
        name: 'Uthman ibn Affan (رضي الله عنه)',
        title: 'Dhun-Nurain & Dritter Kalif',
        story: 'Uthman war bekannt für seine Großzügigkeit, Bescheidenheit und Frömmigkeit. Er heiratete zwei Töchter des Propheten (ﷺ) zu verschiedenen Zeiten, weshalb er den Titel "Dhun-Nurain" (Besitzer der zwei Lichter) erhielt. Als dritter Kalif war seine größte Leistung die Standardisierung und Zusammenstellung des Heiligen Korans in einem einzigen Mushaf (Buch), um Abweichungen zu verhindern und seine Authentizität für alle zukünftigen Generationen zu sichern.'
      },
      {
        name: 'Ali ibn Abi Talib (رضي الله عنه)',
        title: 'Tor der Erkenntnis & Vierter Kalif',
        story: 'Ali war der Cousin und Schwiegersohn des Propheten (ﷺ) und wuchs in dessen Haushalt auf. Er war einer der ersten, die den Islam annahmen, und bekannt für seine Tapferkeit auf dem Schlachtfeld, seine immense Weisheit und sein tiefes Wissen über den Islam. Der Prophet (ﷺ) sagte: "Ich bin die Stadt des Wissens und Ali ist ihr Tor." Als vierter Kalif führte er die Muslime in einer Zeit großer politischer Unruhen.'
      },
       {
        name: 'Khadijah bint Khuwaylid (رضي الله عنها)',
        title: 'Die erste Gläubige',
        story: 'Khadijah war die erste Ehefrau des Propheten (ﷺ) und die erste Person überhaupt, die an seine Botschaft glaubte. Sie war eine erfolgreiche und respektierte Geschäftsfrau. Sie war die größte Stütze des Propheten (ﷺ) in den schwierigsten Anfangsjahren seiner Mission, unterstützte ihn emotional und finanziell und schenkte ihm sechs seiner Kinder. Der Prophet (ﷺ) liebte und ehrte sie sein Leben lang.'
      },
      {
        name: 'Aisha bint Abi Bakr (رضي الله عنها)',
        title: 'Mutter der Gläubigen & Gelehrte',
        story: 'Aisha war die Tochter von Abu Bakr und eine der bekanntesten Ehefrauen des Propheten (ﷺ). Sie besaß einen scharfen Verstand und ein außergewöhnliches Gedächtnis, was sie zu einer der wichtigsten Überlieferinnen von Hadithen machte. Nach dem Tod des Propheten (ﷺ) wurde sie zu einer zentralen Autorität in islamischem Recht und Theologie und lehrte viele Männer und Frauen.'
      },
      {
        name: 'Bilal ibn Rabah (رضي الله عنه)',
        title: 'Der Muezzin des Propheten',
        story: 'Bilal war ein abessinischer Sklave, der einer der ersten war, die den Islam annahmen. Wegen seines Glaubens wurde er von seinem Herrn brutal gefoltert, doch er blieb standhaft und wiederholte nur "Ahadun Ahad" (Einer, Einer). Abu Bakr kaufte ihn frei. Aufgrund seiner wunderschönen Stimme wurde Bilal vom Propheten (ﷺ) als erster Muezzin (Gebetsrufer) des Islam auserwählt. Seine Geschichte ist ein starkes Symbol für Gleichheit und Standhaftigkeit im Islam.'
      },
      {
        name: 'Abd al-Rahman ibn Awf (رضي الله عنه)',
        title: 'Der gesegnete Händler',
        story: 'Als einer der "Zehn, denen das Paradies versprochen wurde", war Abd al-Rahman ibn Awf für seinen außergewöhnlichen Geschäftssinn und seine immense Großzügigkeit bekannt. Nach der Hidschra nach Medina baute er aus dem Nichts ein Handelsimperium auf, gab aber seinen Reichtum großzügig für die Sache Allahs aus. Es wird berichtet, dass eine seiner Karawanen einst ganz Medina füllte und er alles für die Armen spendete.'
      },
      {
        name: 'Salman al-Farsi (رضي الله عنه)',
        title: 'Der Sucher der Wahrheit',
        story: 'Salman stammte aus Persien und begab sich auf eine lange spirituelle Reise auf der Suche nach der wahren Religion, wobei er verschiedenen Priestern und Mönchen diente. Schließlich wurde ihm von einem Propheten erzählt, der in Arabien erscheinen würde. Seine Suche führte ihn nach Medina, wo er den Propheten Muhammad (ﷺ) traf und den Islam annahm. In der Schlacht am Graben (Khandaq) schlug er die strategisch brillante Idee vor, einen Graben um Medina zu ziehen, eine Taktik, die die Muslime rettete.'
      },
      {
        name: 'Abu Ubaydah ibn al-Jarrah (رضي الله عنه)',
        title: 'Der Treuhänder dieser Ummah',
        story: 'Abu Ubaydah war ein weiterer der zehn Gefährten, denen das Paradies versprochen wurde. Der Prophet (ﷺ) verlieh ihm den einzigartigen Titel "Amin al-Ummah" (der Treuhänder dieser Gemeinschaft) wegen seiner außergewöhnlichen Ehrlichkeit und Vertrauenswürdigkeit. Er war ein führender Kommandant während der islamischen Eroberungen und bekannt für seine Bescheidenheit und Führungsqualitäten.'
      },
      {
        name: 'Sa\'d ibn Abi Waqqas (رضي الله عنه)',
        title: 'Der erste Bogenschütze des Islam',
        story: 'Sa\'d war einer der ersten, die den Islam annahmen, und er war der erste, der im Namen des Islam einen Pfeil abschoss. Er war bekannt für seine Treffsicherheit als Bogenschütze und dafür, dass seine Gebete von Allah erhört wurden. Der Prophet (ﷺ) machte einst ein Bittgebet für ihn: "O Allah, erhöre Sa\'ds Gebet, wenn er zu Dir betet." Er war ein wichtiger militärischer Führer, insbesondere in der Schlacht von al-Qadisiyyah.'
      },
      {
        name: 'Hamza ibn Abd al-Muttalib (رضي الله عنه)',
        title: 'Der Löwe Allahs',
        story: 'Hamza war der Onkel des Propheten (ﷺ) und ein Mann von großer Stärke und Mut. Seine Konversion zum Islam war ein Wendepunkt für die frühen Muslime in Mekka, da er sie offen gegen die Quraysh verteidigte. Er war ein furchtloser Krieger und erhielt den Titel "Asadullah" (der Löwe Allahs). Er fiel in der Schlacht von Uhud als Märtyrer und sein Tod betrübte den Propheten (ﷺ) zutiefst.'
      },
      {
        name: 'Zayd ibn Harithah (رضي الله عنه)',
        title: 'Der geliebte Adoptivsohn',
        story: 'Zayd war ein Sklave, der von Khadijah dem Propheten (ﷺ) geschenkt wurde. Der Prophet befreite ihn und adoptierte ihn als seinen Sohn, und er war als Zayd ibn Muhammad bekannt, bis die Adoption im Islam verboten wurde. Zayd war der einzige Gefährte, dessen Name im Koran erwähnt wird (Sure 33:37). Er war ein treuer Anhänger und starb als Kommandant in der Schlacht von Mu\'tah.'
      },
      {
        name: 'Ja\'far ibn Abi Talib (رضي الله عنه)',
        title: 'Der mit den zwei Flügeln',
        story: 'Ja\'far war der ältere Bruder von Ali und der Cousin des Propheten (ﷺ). Er war bekannt für seine Ähnlichkeit mit dem Propheten in Aussehen und Charakter. Er war der Anführer der muslimischen Auswanderer nach Abessinien und überzeugte den christlichen König Negus mit seiner eloquent vorgetragenen Erklärung des Islam. Er fiel als Märtyrer in der Schlacht von Mu\'tah, nachdem ihm beide Arme abgeschlagen wurden. Der Prophet (ﷺ) sagte, Allah habe ihm dafür Flügel im Paradies gegeben.'
      },
      {
        name: 'Mus\'ab ibn Umayr (رضي الله عنه)',
        title: 'Der erste Botschafter des Islam',
        story: 'Mus\'ab stammte aus einer wohlhabenden Familie in Mekka und war für seinen guten Stil und sein Aussehen bekannt. Nachdem er den Islam angenommen hatte, verstieß ihn seine Familie. Der Prophet (ﷺ) schickte ihn als ersten Gesandten nach Medina, um die Menschen dort im Islam zu unterrichten. Durch seine Weisheit und seinen edlen Charakter nahmen viele Menschen in Medina den Islam an, was den Weg für die Hidschra ebnete. Er starb als Fahnenträger in der Schlacht von Uhud.'
      },
       {
        name: 'Anas ibn Malik (رضي الله عنه)',
        title: 'Der Diener des Propheten',
        story: 'Als der Prophet (ﷺ) nach Medina kam, brachte ihn seine Mutter zu ihm und bat den Propheten, für ihn zu beten. Anas diente dem Propheten (ﷺ) zehn Jahre lang und war daher ein intimer Kenner seiner Gewohnheiten und Lehren. Durch das Gebet des Propheten wurde Anas mit einem langen Leben, viel Reichtum und zahlreichen Nachkommen gesegnet. Er wurde zu einem der wichtigsten Überlieferer von Hadithen.'
      }
    ]
  },
  en: {
    title: 'The Companions of the Prophet (Sahaba)',
    description: 'Insights into the lives and legacies of the righteous men and women around the Prophet Muhammad (ﷺ).',
    backToFeatures: "Back to Features",
    sahaba: [
      {
        name: 'Abu Bakr As-Siddiq (may Allah be pleased with him)',
        title: 'The Truthful & First Caliph',
        story: 'The closest friend of the Prophet (ﷺ) and the first man to accept Islam. He was known for his unwavering loyalty and firm faith. When the Prophet (ﷺ) spoke of his Night Journey (Isra), Abu Bakr believed him without hesitation and received the title "As-Siddiq" (the Truthful). He accompanied the Prophet on the Hijra (migration) to Medina and was elected the first Caliph of the Muslims after his death.'
      },
      {
        name: 'Umar ibn al-Khattab (may Allah be pleased with him)',
        title: 'Al-Faruq & Second Caliph',
        story: 'Umar was initially a fierce opponent of Islam, but after hearing the Quran, his heart softened and he accepted the faith. His conversion greatly strengthened the Muslims. He was given the title "Al-Faruq" (the Distinguisher) because he clearly distinguished between right and wrong. As the second Caliph, he expanded the Islamic empire and established many administrative institutions. He was known for his justice, strictness, and humility.'
      },
      {
        name: 'Uthman ibn Affan (may Allah be pleased with him)',
        title: 'Dhun-Nurain & Third Caliph',
        story: 'Uthman was known for his generosity, modesty, and piety. He married two of the Prophet\'s daughters at different times, which is why he received the title "Dhun-Nurain" (Possessor of the Two Lights). As the third Caliph, his greatest achievement was the standardization and compilation of the Holy Quran into a single Mushaf (book) to prevent variations and to preserve its authenticity for all future generations.'
      },
      {
        name: 'Ali ibn Abi Talib (may Allah be pleased with him)',
        title: 'Gate of Knowledge & Fourth Caliph',
        story: 'Ali was the cousin and son-in-law of the Prophet (ﷺ) and grew up in his household. He was one of the first to accept Islam and was known for his bravery on the battlefield, his immense wisdom, and his deep knowledge of Islam. The Prophet (ﷺ) said, "I am the city of knowledge and Ali is its gate." As the fourth Caliph, he led the Muslims in a time of great political turmoil.'
      },
      {
        name: 'Khadijah bint Khuwaylid (may Allah be pleased with her)',
        title: 'The First Believer',
        story: 'Khadijah was the first wife of the Prophet (ﷺ) and the very first person to believe in his message. She was a successful and respected businesswoman. She was the Prophet\'s greatest support during the most difficult early years of his mission, supporting him emotionally and financially, and bearing him six of his children. The Prophet (ﷺ) loved and honored her throughout his life.'
      },
      {
        name: 'Aisha bint Abi Bakr (may Allah be pleased with her)',
        title: 'Mother of the Believers & Scholar',
        story: 'Aisha was the daughter of Abu Bakr and one of the most well-known wives of the Prophet (ﷺ). She possessed a sharp mind and an exceptional memory, making her one of the most important narrators of Hadith. After the Prophet\'s death, she became a central authority in Islamic law and theology, teaching many men and women.'
      },
      {
        name: 'Bilal ibn Rabah (may Allah be pleased with him)',
        title: 'The Muezzin of the Prophet',
        story: 'Bilal was an Abyssinian slave who was among the first to embrace Islam. He was brutally tortured by his master for his faith, but he remained steadfast, repeating only "Ahadun Ahad" (One, One). Abu Bakr freed him. Due to his beautiful voice, Bilal was chosen by the Prophet (ﷺ) to be the first Muezzin (caller to prayer) of Islam. His story is a powerful symbol of equality and steadfastness in Islam.'
      },
      {
        name: 'Abd al-Rahman ibn Awf (may Allah be pleased with him)',
        title: 'The Blessed Merchant',
        story: 'One of the "Ten Promised Paradise," Abd al-Rahman ibn Awf was known for his exceptional business acumen and immense generosity. After migrating to Medina, he built a trade empire from scratch but spent his wealth lavishly for the cause of Allah. It is said one of his caravans once filled the entire city of Medina, and he donated it all to the poor.'
      },
      {
        name: 'Salman al-Farsi (may Allah be pleased with him)',
        title: 'The Seeker of Truth',
        story: 'Salman was from Persia and embarked on a long spiritual journey in search of the true religion, serving various priests and monks. He was eventually told of a prophet who would appear in Arabia. His quest led him to Medina, where he met the Prophet Muhammad (ﷺ) and embraced Islam. He is famous for his brilliant strategic suggestion to dig a trench around Medina in the Battle of the Trench (Khandaq), which saved the Muslims.'
      },
      {
        name: 'Abu Ubaydah ibn al-Jarrah (may Allah be pleased with him)',
        title: 'The Trustee of this Ummah',
        story: 'Abu Ubaydah was another of the ten companions promised Paradise. The Prophet (ﷺ) gave him the unique title "Amin al-Ummah" (the Trustee of this Community) for his exceptional honesty and trustworthiness. He was a leading commander during the Islamic conquests and was known for his humility and leadership.'
      },
      {
        name: 'Sa\'d ibn Abi Waqqas (may Allah be pleased with him)',
        title: 'The First Archer of Islam',
        story: 'One of the first to embrace Islam, Sa\'d was the first person to shoot an arrow in the cause of Islam. He was known for his accuracy as an archer and for having his prayers answered by Allah. The Prophet (ﷺ) once made a supplication for him, "O Allah, answer Sa\'d\'s prayer whenever he prays to You." He was a major military leader, especially in the Battle of al-Qadisiyyah.'
      },
      {
        name: 'Hamza ibn Abd al-Muttalib (may Allah be pleased with him)',
        title: 'The Lion of Allah',
        story: 'Hamza was the uncle of the Prophet (ﷺ) and a man of great strength and courage. His conversion to Islam was a turning point for the early Muslims in Mecca, as he openly defended them against the Quraysh. He was a fearless warrior and earned the title "Asadullah" (the Lion of Allah). He was martyred in the Battle of Uhud, and his death deeply grieved the Prophet (ﷺ).'
      },
      {
        name: 'Zayd ibn Harithah (may Allah be pleased with him)',
        title: 'The Beloved Adopted Son',
        story: 'Zayd was a slave gifted to the Prophet (ﷺ) by Khadijah. The Prophet freed him and adopted him as his son, and he was known as Zayd ibn Muhammad until adoption was prohibited in Islam. Zayd is the only companion whose name is mentioned in the Quran (Surah 33:37). He was a devoted follower and died as a commander in the Battle of Mu\'tah.'
      },
      {
        name: 'Ja\'far ibn Abi Talib (may Allah be pleased with him)',
        title: 'The One with Two Wings',
        story: 'Ja\'far was Ali\'s elder brother and the Prophet\'s cousin. He was known for his resemblance to the Prophet in appearance and character. He was the leader of the Muslim emigrants to Abyssinia and famously convinced the Christian King Negus with his eloquent explanation of Islam. He was martyred in the Battle of Mu\'tah after both his arms were cut off, and the Prophet (ﷺ) said Allah had given him wings in Paradise in their place.'
      },
      {
        name: 'Mus\'ab ibn Umayr (may Allah be pleased with him)',
        title: 'The First Ambassador of Islam',
        story: 'Mus\'ab came from a wealthy family in Mecca and was known for his fine style and appearance. After embracing Islam, his family disowned him. The Prophet (ﷺ) sent him as the first envoy to Medina to teach its people about Islam. Through his wisdom and noble character, many people in Medina embraced Islam, paving the way for the Hijra. He died as the standard-bearer in the Battle of Uhud.'
      },
      {
        name: 'Anas ibn Malik (may Allah be pleased with him)',
        title: 'The Servant of the Prophet',
        story: 'When the Prophet (ﷺ) came to Medina, Anas\'s mother brought him and asked the Prophet to pray for him. Anas served the Prophet (ﷺ) for ten years, becoming an intimate authority on his habits and teachings. Due to the Prophet\'s prayer, Anas was blessed with a long life, abundant wealth, and numerous offspring. He became one of the most prolific narrators of Hadith.'
      }
    ]
  }
};


export default function SahabaPage() {
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
        <h1 className="text-4xl font-bold tracking-tight text-primary">
            {c.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-3xl mx-auto">{c.description}</p>
      </header>
       <div className="max-w-4xl mx-auto my-8">
            <AdBanner slotId="sahaba-page-banner" />
        </div>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto" defaultValue="item-0">
        {c.sahaba.map((sahabi, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl text-left hover:no-underline">
                <div className="flex flex-col">
                    <span>{sahabi.name}</span>
                    <span className="text-sm text-muted-foreground font-normal">{sahabi.title}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 px-4">
              {sahabi.story}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
