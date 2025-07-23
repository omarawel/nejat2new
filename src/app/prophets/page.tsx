
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const prophetsData = {
  de: {
    title: 'Die 25 Propheten im Koran',
    description: 'Lerne die Gesandten Allahs und ihre Geschichten kennen.',
    backToFeatures: "Zurück zu den Funktionen",
    prophets: [
      {
        name: 'Adam (عليه السلام)',
        story: 'Adam, der erste Mensch und Prophet, wurde von Allah aus Lehm erschaffen. Allah lehrte ihn die Namen aller Dinge und befahl den Engeln, sich vor ihm niederzuwerfen, was alle taten außer Iblis (Satan). Adam und seine Frau Hawwa (Eva) lebten im Paradies (Jannah), wurden aber nach dem Verzehr der verbotenen Frucht, zu dem Iblis sie verführte, auf die Erde gesandt. Sie bereuten ihre Tat aufrichtig, und Allah vergab ihnen. Ihr Leben auf der Erde markiert den Beginn der Menschheitsgeschichte.'
      },
      {
        name: 'Idris (عليه السلام) - Henoch',
        story: 'Idris war ein Nachkomme von Adam und bekannt für seine außergewöhnliche Weisheit, Frömmigkeit und sein Wissen. Er gilt als der erste, der mit einem Stift schrieb, Kleidung nähte und die Sterne studierte. Der Koran erwähnt, dass Allah ihn an einen hohen Ort erhob, was viele Gelehrte so interpretieren, dass er lebendig in den Himmel aufgenommen wurde.'
      },
      {
        name: 'Nuh (عليه السلام) - Noah',
        story: 'Nuh wurde zu einem Volk gesandt, das dem Götzendienst verfallen war. Über einen Zeitraum von 950 Jahren rief er sie unermüdlich zum Glauben an den einen Gott auf, doch nur eine kleine Schar folgte ihm. Auf Allahs Befehl baute er eine riesige Arche. Eine verheerende Flut wurde gesandt, um die Ungläubigen zu vernichten, während Nuh, seine Familie, die Gläubigen und Paare aller Tiere in der Arche gerettet wurden. Seine Geschichte ist ein Symbol für Geduld und Gottvertrauen.'
      },
      {
        name: 'Hud (عليه السلام)',
        story: 'Hud wurde zum Volk der \'Aad gesandt, einer mächtigen und arroganten Zivilisation, die für ihre beeindruckenden Bauten in Iram bekannt war. Sie verehrten Götzen und ignorierten Huds Warnungen, Allah allein anzubeten. Als Strafe für ihre Hartnäckigkeit und ihren Unglauben sandte Allah einen gewaltigen, vernichtenden Sturm, der das Volk der \'Aad auslöschte.'
      },
      {
        name: 'Salih (عليه السلام)',
        story: 'Salih war ein Prophet, der zu den Thamud, den Nachfolgern der \'Aad, gesandt wurde. Sie waren geschickte Handwerker, die ihre Häuser in die Berge meißelten. Als Zeichen forderten sie von Salih ein Kamel, das auf wundersame Weise aus einem Felsen hervorkam. Trotz der Warnung, dem Kamel kein Leid zuzufügen, töteten sie es. Als Strafe wurden sie durch einen schrecklichen Schrei und ein Erdbeben vernichtet.'
      },
      {
        name: 'Ibrahim (عليه السلام) - Abraham',
        story: 'Ibrahim, bekannt als "Freund Allahs" (Khalilullah), ist eine zentrale Figur im Islam. Er stellte die Götzenanbetung seines Volkes in Frage und wurde dafür ins Feuer geworfen, doch Allah rettete ihn. Seine unerschütterliche Hingabe zeigte sich, als er bereit war, seinen Sohn Ismail auf Allahs Befehl zu opfern, wofür Allah ihm einen Widder als Ersatz schickte. Er baute die Kaaba in Mekka zusammen mit Ismail wieder auf und rief die Menschen zum Monotheismus auf.'
      },
      {
        name: 'Lut (عليه السلام) - Lot',
        story: 'Lut, der Neffe von Ibrahim, wurde als Prophet in die Städte Sodom und Gomorra gesandt. Die Bewohner dieser Städte praktizierten schwere Sünden, insbesondere Homosexualität, und lehnten Luts Ruf zur Rechtschaffenheit ab. Allah befahl Lut, die Stadt mit seinen Anhängern zu verlassen, bevor sie durch einen Regen von Steinen aus gebranntem Ton vernichtet wurde. Seine Frau, die mit den Sündern sympathisierte, blickte zurück und wurde ebenfalls vernichtet.'
      },
      {
        name: 'Ismail (عليه السلام) - Ismael',
        story: 'Ismail war der erstgeborene Sohn von Ibrahim und Hajar. Seine Geschichte ist geprägt von Gehorsam und Opferbereitschaft. Als Kind wurde er mit seiner Mutter in der Wüste zurückgelassen, wo Allah die Quelle Zamzam für sie entspringen ließ. Er war bereit, von seinem Vater für Allah geopfert zu werden. Gemeinsam mit Ibrahim baute er die Kaaba wieder auf. Er gilt als der Stammvater der Araber, aus dessen Linie der Prophet Muhammad (ﷺ) hervorging.'
      },
      {
        name: 'Ishaq (عليه السلام) - Isaak',
        story: 'Ishaq war der zweite Sohn Ibrahims, geboren von seiner Frau Sarah im hohen Alter, als frohe Botschaft von Allah. Er setzte die prophetische Mission seines Vaters fort und war ein Segen für die Kinder Israels. Sein Sohn war Yaqub (Jakob), wodurch er der Großvater der zwölf Stämme Israels wurde.'
      },
      {
        name: 'Yaqub (عليه السلام) - Jakob',
        story: 'Yaqub, auch bekannt als Israel, war der Sohn von Ishaq. Er hatte zwölf Söhne, die zu den Stammvätern der zwölf Stämme Israels wurden. Sein Leben war von Prüfungen geprägt, insbesondere durch den Verlust seines geliebten Sohnes Yusuf. Seine Geschichte lehrt die Tugenden der Geduld, des Vertrauens in Allahs Plan und der Vergebung.'
      },
      {
        name: 'Yusuf (عليه السلام) - Josef',
        story: 'Yusufs Leben ist eine der detailliertesten Geschichten im Koran. Von seinen eifersüchtigen Brüdern in einen Brunnen geworfen und als Sklave nach Ägypten verkauft, stieg er durch seine Weisheit, seine Fähigkeit zur Traumdeutung und seine Standhaftigkeit im Glauben zu einem der höchsten Beamten Ägyptens auf. Er rettete das Land vor einer Hungersnot und vergab schließlich seinen reuigen Brüdern in einer bewegenden Wiedervereinigung.'
      },
      {
        name: 'Ayyub (عليه السلام) - Hiob',
        story: 'Ayyub wurde mit extremen Prüfungen auf die Probe gestellt: Er verlor seinen immensen Reichtum, seine zahlreichen Kinder und litt unter einer schweren, schmerzhaften Krankheit, die ihn über Jahre hinweg plagte. Trotz dieses unvorstellbaren Leids verlor er nie seinen Glauben oder seine Geduld und klagte nicht. Er blieb standhaft im Gebet. Für seine beispiellose Geduld wurde er von Allah reichlich belohnt, indem ihm seine Gesundheit, seine Familie und sein Wohlstand mehrfach zurückgegeben wurden.'
      },
      {
        name: 'Shu\'ayb (عليه السلام)',
        story: 'Shu\'ayb wurde zum Volk von Madyan (Midian) gesandt. Diese Gemeinschaft war für ihre unehrlichen Handelspraktiken bekannt, bei denen sie bei Maß und Gewicht betrogen. Shu\'ayb rief sie zur Gerechtigkeit im Handel und zur Anbetung Allahs auf, doch die meisten lehnten ihn ab und verspotteten ihn. Daraufhin wurden die Ungläubigen durch ein Erdbeben und einen himmlischen Schrei bestraft.'
      },
      {
        name: 'Musa (عليه السلام) - Moses',
        story: 'Musa ist einer der am häufigsten erwähnten Propheten im Koran. Er wurde auserwählt, die Kinder Israels aus der tyrannischen Sklaverei des Pharaos in Ägypten zu befreien. Allah stattete ihn mit Wundern aus, wie dem Stab, der sich in eine Schlange verwandelte, und der Teilung des Roten Meeres. Auf dem Berg Sinai empfing er die Thora, eine heilige Schrift und Rechtleitung für sein Volk. Seine Geschichte ist ein Epos über Mut, Führung und den Kampf gegen Unterdrückung.'
      },
      {
        name: 'Harun (عليه السلام) - Aaron',
        story: 'Harun war der ältere Bruder von Musa. Auf Musas Bitte hin wurde er von Allah ebenfalls zum Propheten ernannt, um ihn bei seiner gewaltigen Mission zu unterstützen. Harun war ein redegewandter Sprecher und half Musa, die Botschaft Allahs dem Pharao und den Kindern Israels zu überbringen. Er stand Musa treu zur Seite, auch als ihr Volk während Musas Abwesenheit das Goldene Kalb anbetete.'
      },
      {
        name: 'Dhul-Kifl (عليه السلام) - Ezechiel',
        story: 'Dhul-Kifl wird im Koran als einer der Geduldigen und Rechtschaffenen erwähnt. Sein Name bedeutet "derjenige, der eine Bürde oder einen Anteil auf sich nimmt". Islamische Überlieferungen beschreiben ihn als einen Propheten oder einen gerechten Mann, der die Verantwortung übernahm, über sein Volk gerecht zu richten und sie zur Anbetung Allahs anzuleiten, wobei er stets geduldig und standhaft blieb.'
      },
      {
        name: 'Dawud (عليه السلام) - David',
        story: 'Dawud wurde sowohl Prophetentum als auch ein Königreich verliehen. Als junger Mann besiegte er den riesigen Krieger Goliath nur mit einer Steinschleuder. Allah gab ihm eine wunderschöne Stimme für die Rezitation der Psalmen (Zabur) und verlieh ihm die Fähigkeit, Eisen mit seinen bloßen Händen zu formen. Er war ein gerechter und weiser Herrscher, der für seine Hingabe im Gebet und im Fasten bekannt war.'
      },
      {
        name: 'Sulayman (عليه السلام) - Salomo',
        story: 'Sulayman, der Sohn von Dawud, erbte das Prophetentum und das Königreich seines Vaters. Allah gewährte ihm beispiellose Macht: Er konnte den Wind kontrollieren, verstand die Sprache der Tiere und befehligte eine Armee aus Menschen, Dschinn und Vögeln. Er erbaute den ersten Tempel in Jerusalem und seine Herrschaft war geprägt von Weisheit, Reichtum und Gerechtigkeit. Seine Geschichte mit der Königin von Saba ist besonders bekannt.'
      },
      {
        name: 'Ilyas (عليه السلام) - Elias',
        story: 'Ilyas wurde zu den Kindern Israels gesandt, die in der Stadt Baalbek lebten und dem Götzendienst verfallen waren, indem sie eine Statue namens Baal anbeteten. Er rief sie eindringlich dazu auf, ihren Götzendienst aufzugeben und zum Glauben an den einen wahren Gott zurückzukehren. Sein Wirken war ein unermüdlicher Kampf gegen die Vielgötterei und für die Wiederherstellung des Monotheismus.'
      },
      {
        name: 'Al-Yasa (عليه السلام) - Elisa',
        story: 'Al-Yasa war der Nachfolger des Propheten Ilyas und setzte dessen Mission bei den Kindern Israels fort. Er war bekannt für seine Frömmigkeit und die Wunder, die Allah durch ihn wirkte. Er führte sein Volk auf dem geraden Weg und erinnerte es an die Lehren des Monotheismus, die er von Ilyas übernommen hatte.'
      },
      {
        name: 'Yunus (عليه السلام) - Jona',
        story: 'Yunus wurde nach Ninive gesandt, um dessen Bewohner vor Strafe zu warnen. Als sie seine Botschaft zunächst ablehnten, verließ er sie zornig und ohne Allahs Erlaubnis. Auf einem Schiff wurde er ins Meer geworfen und von einem riesigen Fisch verschluckt. Im Bauch des Fisches betete er reumütig zu Allah ("La ilaha illa anta, subhanaka, inni kuntu minaz-zalimin"). Allah erhörte sein Gebet, rettete ihn und gab ihm eine zweite Chance. Sein Volk hatte in der Zwischenzeit bereut und wurde ebenfalls gerettet.'
      },
      {
        name: 'Zakariyya (عليه السلام) - Zacharias',
        story: 'Zakariyya war ein Prophet, der sich um Maryam (Maria), die Mutter von Isa, kümmerte. Im hohen Alter, als er und seine Frau kinderlos waren, betete er inbrünstig zu Allah um einen Nachkommen. Allah erhörte sein Gebet auf wundersame Weise und schenkte ihm einen Sohn, Yahya (Johannes), der selbst ein großer Prophet werden sollte. Seine Geschichte ist ein starkes Beispiel für die Kraft des Gebets und die unbegrenzte Macht Allahs.'
      },
      {
        name: 'Yahya (عليه السلام) - Johannes der Täufer',
        story: 'Yahya war der wundersame Sohn von Zakariyya. Schon als Kind wurde ihm Weisheit und das Prophetentum verliehen. Er war bekannt für seine Askese, seine Frömmigkeit und seinen Mut, die Wahrheit zu sprechen, selbst vor ungerechten Herrschern. Er lebte ein einfaches Leben und rief die Menschen zur Reue und zur Einhaltung der Gesetze Allahs auf. Er bestätigte die Ankunft von Isa (Jesus) und bereitete den Weg für dessen Mission.'
      },
      {
        name: 'Isa (عليه السلام) - Jesus',
        story: 'Isa ist einer der bedeutendsten Propheten im Islam. Seine wundersame Geburt ohne Vater von der reinen Jungfrau Maryam ist ein zentrales Zeichen Allahs. Er erhielt die Heilige Schrift, das Indschil (Evangelium), und wirkte mit Allahs Erlaubnis viele Wunder: Er heilte Kranke, gab Blinden das Augenlicht zurück und erweckte Tote zum Leben. Er rief die Kinder Israels zum reinen Monotheismus auf. Muslime glauben, dass er nicht gekreuzigt wurde, sondern von Allah lebendig in den Himmel emporgehoben wurde und vor dem Tag des Jüngsten Gerichts zurückkehren wird.'
      },
      {
        name: 'Muhammad (ﷺ)',
        story: 'Muhammad, das Siegel der Propheten, ist der letzte Gesandte Allahs an die gesamte Menschheit. Er wurde in Mekka geboren und erhielt im Alter von 40 Jahren die erste Offenbarung des Korans durch den Engel Dschibril (Gabriel). Über einen Zeitraum von 23 Jahren empfing er den vollständigen Koran, die letzte und unverfälschte Botschaft Allahs. Sein Leben, seine Lehren und seine Taten (die Sunna) sind die vollkommene Anleitung für Muslime in allen Lebensbereichen. Er vereinte die Stämme Arabiens unter dem Banner des Islam und hinterließ eine Religion, die heute von Milliarden Menschen auf der ganzen Welt praktiziert wird.'
      },
    ]
  },
  en: {
    title: 'The 25 Prophets in the Quran',
    description: 'Learn about the Messengers of Allah and their stories.',
    backToFeatures: "Back to Features",
    prophets: [
      {
        name: 'Adam (peace be upon him)',
        story: 'Adam, the first man and prophet, was created by Allah from clay. Allah taught him the names of all things and commanded the angels to prostrate before him, which all did except Iblis (Satan). Adam and his wife Hawwa (Eve) lived in Paradise (Jannah) but were sent to Earth after eating the forbidden fruit, to which Iblis tempted them. They sincerely repented their actions, and Allah forgave them. Their life on Earth marks the beginning of human history.'
      },
      {
        name: 'Idris (peace be upon him) - Enoch',
        story: 'Idris was a descendant of Adam and was known for his exceptional wisdom, piety, and knowledge. He is considered the first to write with a pen, sew clothes, and study the stars. The Quran mentions that Allah raised him to a high place, which many scholars interpret as him being taken up to heaven alive.'
      },
      {
        name: 'Nuh (peace be upon him) - Noah',
        story: 'Nuh was sent to a people who had fallen into idolatry. Over a period of 950 years, he tirelessly called them to believe in the one God, but only a small group followed him. By Allah\'s command, he built a huge ark. A devastating flood was sent to destroy the disbelievers, while Nuh, his family, the believers, and pairs of all animals were saved in the ark. His story is a symbol of patience and trust in God.'
      },
      {
        name: 'Hud (peace be upon him)',
        story: 'Hud was sent to the people of \'Aad, a powerful and arrogant civilization known for their impressive buildings in Iram. They worshipped idols and ignored Hud\'s warnings to worship Allah alone. As punishment for their stubbornness and disbelief, Allah sent a mighty, destructive storm that wiped out the people of \'Aad.'
      },
      {
        name: 'Salih (peace be upon him)',
        story: 'Salih was a prophet sent to the Thamud, the successors of the \'Aad. They were skilled craftsmen who carved their homes into the mountains. As a sign, they demanded from Salih a she-camel, which miraculously emerged from a rock. Despite the warning not to harm the camel, they killed it. As punishment, they were destroyed by a terrible cry and an earthquake.'
      },
      {
        name: 'Ibrahim (peace be upon him) - Abraham',
        story: 'Ibrahim, known as the "Friend of Allah" (Khalilullah), is a central figure in Islam. He challenged the idol worship of his people and was thrown into a fire for it, but Allah saved him. His unwavering devotion was shown when he was willing to sacrifice his son Ismail at Allah\'s command, for which Allah sent a ram as a substitute. He rebuilt the Kaaba in Mecca with Ismail and called people to monotheism.'
      },
      {
        name: 'Lut (peace be upon him) - Lot',
        story: 'Lut, the nephew of Ibrahim, was sent as a prophet to the cities of Sodom and Gomorrah. The inhabitants of these cities practiced grave sins, especially homosexuality, and rejected Lut\'s call to righteousness. Allah commanded Lut to leave the city with his followers before it was destroyed by a rain of stones of baked clay. His wife, who sympathized with the sinners, looked back and was also destroyed.'
      },
      {
        name: 'Ismail (peace be upon him) - Ishmael',
        story: 'Ismail was the firstborn son of Ibrahim and Hajar. His story is marked by obedience and sacrifice. As a child, he was left in the desert with his mother, where Allah caused the Zamzam spring to gush forth for them. He was willing to be sacrificed by his father for Allah. Together with Ibrahim, he rebuilt the Kaaba. He is considered the ancestor of the Arabs, from whose lineage the Prophet Muhammad (ﷺ) came.'
      },
      {
        name: 'Ishaq (peace be upon him) - Isaac',
        story: 'Ishaq was the second son of Ibrahim, born to his wife Sarah in her old age, as glad tidings from Allah. He continued his father\'s prophetic mission and was a blessing to the Children of Israel. His son was Yaqub (Jacob), making him the grandfather of the twelve tribes of Israel.'
      },
      {
        name: 'Yaqub (peace be upon him) - Jacob',
        story: 'Yaqub, also known as Israel, was the son of Ishaq. He had twelve sons who became the patriarchs of the twelve tribes of Israel. His life was marked by trials, especially the loss of his beloved son Yusuf. His story teaches the virtues of patience, trust in Allah\'s plan, and forgiveness.'
      },
      {
        name: 'Yusuf (peace be upon him) - Joseph',
        story: 'Yusuf\'s life is one of the most detailed stories in the Quran. Thrown into a well by his jealous brothers and sold as a slave in Egypt, he rose to become one of the highest officials in Egypt through his wisdom, his ability to interpret dreams, and his steadfastness in faith. He saved the country from famine and finally forgave his repentant brothers in a moving reunion.'
      },
      {
        name: 'Ayyub (peace be upon him) - Job',
        story: 'Ayyub was tested with extreme trials: he lost his immense wealth, his numerous children, and suffered from a severe, painful illness that afflicted him for years. Despite this unimaginable suffering, he never lost his faith or patience and did not complain. He remained steadfast in prayer. For his unparalleled patience, he was richly rewarded by Allah, with his health, family, and wealth restored to him many times over.'
      },
      {
        name: 'Shu\'ayb (peace be upon him)',
        story: 'Shu\'ayb was sent to the people of Madyan (Midian). This community was known for its dishonest trade practices, cheating in measure and weight. Shu\'ayb called them to justice in trade and to the worship of Allah, but most rejected and mocked him. Consequently, the disbelievers were punished by an earthquake and a heavenly cry.'
      },
      {
        name: 'Musa (peace be upon him) - Moses',
        story: 'Musa is one of the most frequently mentioned prophets in the Quran. He was chosen to free the Children of Israel from the tyrannical slavery of the Pharaoh in Egypt. Allah equipped him with miracles, such as the staff that turned into a snake and the parting of the Red Sea. On Mount Sinai, he received the Torah, a sacred scripture and guidance for his people. His story is an epic of courage, leadership, and the struggle against oppression.'
      },
      {
        name: 'Harun (peace be upon him) - Aaron',
        story: 'Harun was the elder brother of Musa. At Musa\'s request, Allah also appointed him as a prophet to support him in his monumental mission. Harun was an eloquent speaker and helped Musa to deliver Allah\'s message to the Pharaoh and the Children of Israel. He stood faithfully by Musa\'s side, even when their people worshipped the Golden Calf in Musa\'s absence.'
      },
      {
        name: 'Dhul-Kifl (peace be upon him) - Ezekiel',
        story: 'Dhul-Kifl is mentioned in the Quran as one of the patient and righteous. His name means "the one who takes on a burden or a share." Islamic traditions describe him as a prophet or a just man who took on the responsibility of judging his people justly and guiding them to the worship of Allah, always remaining patient and steadfast.'
      },
      {
        name: 'Dawud (peace be upon him) - David',
        story: 'Dawud was granted both prophethood and a kingdom. As a young man, he defeated the giant warrior Goliath with only a slingshot. Allah gave him a beautiful voice for reciting the Psalms (Zabur) and granted him the ability to mold iron with his bare hands. He was a just and wise ruler, known for his devotion in prayer and fasting.'
      },
      {
        name: 'Sulayman (peace be upon him) - Solomon',
        story: 'Sulayman, the son of Dawud, inherited his father\'s prophethood and kingdom. Allah granted him unprecedented power: he could control the wind, understood the language of animals, and commanded an army of humans, jinn, and birds. He built the first temple in Jerusalem, and his reign was marked by wisdom, wealth, and justice. His story with the Queen of Sheba is particularly famous.'
      },
      {
        name: 'Ilyas (peace be upon him) - Elijah',
        story: 'Ilyas was sent to the Children of Israel who lived in the city of Baalbek and had fallen into idolatry, worshipping a statue called Baal. He urgently called on them to abandon their idolatry and return to the faith of the one true God. His work was a tireless struggle against polytheism and for the restoration of monotheism.'
      },
      {
        name: 'Al-Yasa (peace be upon him) - Elisha',
        story: 'Al-Yasa was the successor of the prophet Ilyas and continued his mission among the Children of Israel. He was known for his piety and the miracles that Allah performed through him. He guided his people on the straight path and reminded them of the teachings of monotheism he had inherited from Ilyas.'
      },
      {
        name: 'Yunus (peace be upon him) - Jonah',
        story: 'Yunus was sent to Nineveh to warn its inhabitants of punishment. When they initially rejected his message, he left them in anger and without Allah\'s permission. On a ship, he was thrown into the sea and swallowed by a huge fish. In the belly of the fish, he prayed repentantly to Allah ("La ilaha illa anta, subhanaka, inni kuntu minaz-zalimin"). Allah answered his prayer, saved him, and gave him a second chance. In the meantime, his people had repented and were also saved.'
      },
      {
        name: 'Zakariyya (peace be upon him) - Zacharias',
        story: 'Zakariyya was a prophet who cared for Maryam (Mary), the mother of Isa. In his old age, when he and his wife were childless, he prayed fervently to Allah for a descendant. Allah miraculously answered his prayer and gave him a son, Yahya (John), who would himself become a great prophet. His story is a powerful example of the power of prayer and the unlimited power of Allah.'
      },
      {
        name: 'Yahya (peace be upon him) - John the Baptist',
        story: 'Yahya was the miraculous son of Zakariyya. He was granted wisdom and prophethood even as a child. He was known for his asceticism, piety, and courage to speak the truth, even before unjust rulers. He lived a simple life and called people to repentance and adherence to Allah\'s laws. He confirmed the coming of Isa (Jesus) and prepared the way for his mission.'
      },
      {
        name: 'Isa (peace be upon him) - Jesus',
        story: 'Isa is one of the most significant prophets in Islam. His miraculous birth without a father from the pure virgin Maryam is a central sign of Allah. He received the Holy Scripture, the Injeel (Gospel), and performed many miracles with Allah\'s permission: he healed the sick, gave sight to the blind, and raised the dead. He called the Children of Israel to pure monotheism. Muslims believe that he was not crucified but was raised alive to heaven by Allah and will return before the Day of Judgment.'
      },
      {
        name: 'Muhammad (ﷺ)',
        story: 'Muhammad, the Seal of the Prophets, is the final messenger of Allah to all of humanity. He was born in Mecca and received the first revelation of the Quran at the age of 40 through the angel Jibril (Gabriel). Over a period of 23 years, he received the complete Quran, the final and uncorrupted message of Allah. His life, teachings, and actions (the Sunnah) are the perfect guide for Muslims in all aspects of life. He united the tribes of Arabia under the banner of Islam and left a religion that is practiced today by billions of people around the world.'
      },
    ]
  }
};


export default function ProphetsPage() {
  const { language } = useLanguage();
  const content = prophetsData[language as keyof typeof prophetsData] || prophetsData.de;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {content.backToFeatures}
        </Link>
      </Button>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{content.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{content.description}</p>
      </header>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {content.prophets.map((prophet, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl text-left">{prophet.name}</AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 px-4">
              {prophet.story}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
