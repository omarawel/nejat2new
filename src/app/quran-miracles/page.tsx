
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

const content = {
  de: {
    title: 'Wissenschaftliche Wunder im Koran',
    description: 'Eine Untersuchung von Versen, die auf wissenschaftliche Fakten hinweisen, die erst Jahrhunderte nach der Offenbarung entdeckt wurden.',
    backToFeatures: "Zurück zu den Funktionen",
    miracles: [
      {
        title: 'Die Entstehung des Universums (Urknall)',
        verse: 'Haben die Ungläubigen nicht gesehen, dass die Himmel und die Erde eine Einheit waren, die Wir dann zerteilten? Und Wir machten aus dem Wasser alles Lebendige. Wollen sie denn nicht glauben? (Sure 21:30)',
        explanation: 'Dieser Vers beschreibt eine außergewöhnliche Übereinstimmung mit der Urknalltheorie, die besagt, dass das Universum aus einem einzigen, extrem dichten und heißen Punkt entstand und sich seitdem ausdehnt. Die Beschreibung von Himmeln und Erde als "eine Einheit" (ratqan), die dann "zerteilt" (fataqna) wurde, spiegelt das moderne kosmologische Modell wider.'
      },
      {
        title: 'Die Expansion des Universums',
        verse: 'Und den Himmel haben Wir mit Kraft erbaut, und Wir erweitern ihn wahrlich. (Sure 51:47)',
        explanation: 'Das arabische Wort "musi\'un" wird von Gelehrten als "erweitern" oder "expandieren" interpretiert. Dies ist eine direkte Anspielung auf die Expansion des Universums, eine Entdeckung, die erst im 20. Jahrhundert durch Edwin Hubble gemacht wurde. Die Tatsache, dass der Koran dies vor 1400 Jahren erwähnte, ist bemerkenswert.'
      },
      {
        title: 'Die embryonale Entwicklung',
        verse: 'Dann schufen Wir den Samentropfen zu einem Blutklumpen (Alaqa), und schufen den Blutklumpen zu einem Fleischklumpen (Mudghah), und schufen aus dem Fleischklumpen Knochen, und bekleideten die Knochen mit Fleisch. (Sure 23:14)',
        explanation: 'Die im Koran beschriebenen Stadien der menschlichen Embryonalentwicklung – "Alaqa" (etwas, das sich anheftet, wie ein Blutegel), "Mudghah" (etwas Gekautes) – sind erstaunlich präzise und entsprechen den modernen wissenschaftlichen Erkenntnissen. Besonders die Reihenfolge – erst die Bildung von Knochen, dann deren Bekleidung mit Muskeln und Fleisch – wurde erst durch die moderne Embryologie bestätigt.'
      },
      {
        title: 'Die Funktion der Berge',
        verse: 'Haben Wir nicht die Erde zu einem Lager gemacht und die Berge zu Pflöcken? (Sure 78:6-7)',
        explanation: 'Der Koran beschreibt Berge als "Pflöcke" (awtadan), was auf eine tiefe Verankerung in der Erde hindeutet. Die moderne Geologie hat das Prinzip der Isostasie bestätigt, wonach Berge tiefe "Wurzeln" haben, die in den Erdmantel hineinragen und die Erdkruste stabilisieren, ähnlich wie Zeltpflöcke ein Zelt stabilisieren.'
      },
      {
        title: 'Die Barriere zwischen zwei Meeren',
        verse: 'Er hat den beiden Meeren freien Lauf gelassen, die einander begegnen. Zwischen ihnen ist eine Barriere, die sie nicht überschreiten. (Sure 55:19-20)',
        explanation: 'Dieses Phänomen, bekannt als Halokline, wurde von modernen Ozeanographen an Orten wie der Straße von Gibraltar beobachtet, wo das salzigere Mittelmeer auf den weniger salzigen Atlantik trifft. Aufgrund unterschiedlicher Dichten, Temperaturen und Salzgehalte vermischen sich die beiden Gewässer nicht sofort und bilden eine sichtbare Trennlinie oder "Barriere".'
      },
      {
        title: 'Die Einzigartigkeit der Fingerabdrücke',
        verse: 'Meint der Mensch etwa, dass Wir seine Knochen nicht sammeln werden? Doch, fürwahr! Wir sind imstande, seine Fingerspitzen wiederherzustellen. (Sure 75:3-4)',
        explanation: 'Der Koran weist darauf hin, dass Allah am Tag der Auferstehung selbst die kleinsten Details wie die Fingerspitzen wiederherstellen kann. Dies unterstreicht die Einzigartigkeit jedes Individuums. Die Daktyloskopie (Fingerabdruck-Identifizierung), die erst im 19. Jahrhundert entwickelt wurde, bestätigte, dass die Fingerabdrücke jedes Menschen absolut einzigartig sind.'
      },
      {
        title: 'Die Umlaufbahn der Sonne',
        verse: 'Und Er ist es, Der die Nacht und den Tag erschaffen hat und die Sonne und den Mond. Alle schweben in einer Umlaufbahn. (Sure 21:33)',
        explanation: 'Der Vers besagt, dass Sonne und Mond sich jeweils in einer eigenen Umlaufbahn (falak) bewegen. Dies widerspricht der antiken Vorstellung einer stillstehenden Erde. Heute wissen wir, dass der Mond um die Erde kreist und die Sonne sich auf einer eigenen Bahn innerhalb der Milchstraße bewegt.'
      },
      {
        title: 'Die schützende Atmosphäre',
        verse: 'Und Wir machten den Himmel zu einem wohlbehüteten Dach, doch von seinen Zeichen wenden sie sich ab. (Sure 21:32)',
        explanation: 'Die Atmosphäre der Erde fungiert als schützendes Dach, das das Leben vor tödlicher solarer Strahlung, Meteoriten und den extremen Temperaturen des Weltraums bewahrt. Dieser Vers beschreibt treffend die schützende Funktion der Atmosphäre, eine wissenschaftliche Erkenntnis, die in der Antike unbekannt war.'
      },
      {
        title: 'Innere Wellen in tiefen Ozeanen',
        verse: 'Oder (die Taten der Ungläubigen sind) wie Finsternisse in einem tiefen Meer, bedeckt von einer Welle, über der eine andere Welle ist, über der Wolken sind. Finsternisse, eine über der anderen. (Sure 24:40)',
        explanation: 'Dieser Vers beschreibt nicht nur die Dunkelheit in den Tiefen des Ozeans, sondern auch das Vorhandensein von inneren Wellen unterhalb der Oberflächenwellen. Dieses Phänomen wurde erst mit modernen U-Booten und Satelliten entdeckt. Diese inneren Wellen treten an den Grenzschichten von Wasser mit unterschiedlicher Dichte auf und sind unsichtbar für das menschliche Auge.'
      },
      {
        title: 'Das Vorderhirn und seine Funktion',
        verse: 'Nein! Wenn er nicht aufhört, werden Wir ihn an der Stirnlocke packen – einer lügenden, sündigen Stirnlocke. (Sure 96:15-16)',
        explanation: 'Der Koran identifiziert den vorderen Teil des Kopfes, die Stirnlocke (Nasiyah), als den Ort des Lügens und Sündigens. Die moderne Neurowissenschaft hat bestätigt, dass der präfrontale Kortex, der sich direkt hinter der Stirn befindet, für die Planung, das Treffen von Entscheidungen und das bewusste Lügen verantwortlich ist.'
      },
      {
        title: 'Die Herkunft des Eisens',
        verse: '...Und Wir sandten das Eisen herab, in dem starke Gewalt und (vielerlei) Nutzen für die Menschen ist... (Sure 57:25)',
        explanation: 'Der Vers besagt, dass Eisen "herabgesandt" wurde. Die Astrophysik hat gezeigt, dass Eisen nicht auf der Erde entstehen kann, da die dafür benötigten Temperaturen die der Sonne übersteigen. Eisen wird im Inneren massereicher Sterne geschmiedet und durch Supernova-Explosionen im gesamten Universum verteilt. Eisen auf der Erde stammt also tatsächlich aus dem Weltraum und wurde "herabgesandt".'
      },
      {
        title: 'Der Wind als Bestäuber',
        verse: 'Und Wir senden die Winde zur Befruchtung... (Sure 15:22)',
        explanation: 'Der Vers beschreibt, dass Winde "befruchtend" (lawāqiḥ) sind. Dies ist eine genaue Beschreibung des Prozesses der Windbestäubung, bei dem Pollen von einer Pflanze zur anderen getragen wird, was für die Fortpflanzung vieler Pflanzenarten unerlässlich ist. Diese biologische Funktion des Windes wurde erst in der Neuzeit vollständig verstanden.'
      },
      {
        title: 'Die Stadien der Regenbildung',
        verse: 'Hast du nicht gesehen, dass Allah die Wolken sanft bewegt, sie dann zusammenfügt, sie dann zu einem Haufen macht, und du siehst den Regen aus ihrer Mitte kommen? (Sure 24:43)',
        explanation: 'Dieser Vers beschreibt den Prozess der Wolken- und Regenbildung in drei präzisen Schritten: 1. Wolken werden vom Wind getrieben. 2. Sie werden zusammengefügt (Koaleszenz). 3. Sie türmen sich auf, wodurch der Regen fällt. Dies entspricht exakt den modernen meteorologischen Erkenntnissen zur Bildung von Kumulonimbuswolken und Regen.'
      },
      {
        title: 'Die Rolle des männlichen Samens bei der Geschlechtsbestimmung',
        verse: 'Und dass Er die beiden Geschlechter erschaffen hat, das männliche und das weibliche, aus einem Samentropfen, wenn er ergossen wird. (Sure 53:45-46)',
        explanation: 'Der Koran legt fest, dass das Geschlecht des Kindes durch den "Samentropfen" (nutfa) bestimmt wird, also durch den Mann. Die moderne Genetik bestätigt, dass die Frau nur das X-Chromosom weitergibt, während der Mann entweder ein X- (weiblich) oder ein Y-Chromosom (männlich) weitergibt und somit das Geschlecht bestimmt.'
      },
      {
        title: 'Die Entstehung der Milch',
        verse: 'Und wahrlich, im Vieh ist für euch eine Lehre. Wir geben euch von dem zu trinken, was in ihren Leibern zwischen Kot und Blut ist: reine Milch, angenehm für die Trinkenden. (Sure 16:66)',
        explanation: 'Dieser Vers beschreibt, dass Milch aus einer Verbindung "zwischen Kot und Blut" entsteht. Dies ist eine bemerkenswert genaue Beschreibung des physiologischen Prozesses. Nährstoffe aus der Verdauung (aus dem Bereich des Kots) werden vom Blutkreislauf aufgenommen und zu den Milchdrüsen transportiert, wo sie in Milch umgewandelt werden. Dieser komplexe Prozess war zur Zeit der Offenbarung unbekannt.'
      },
      {
        title: 'Die Haut als Schmerzorgan',
        verse: 'Wahrlich, diejenigen, die Unsere Zeichen verleugnen, werden Wir in ein Feuer brennen lassen. Jedesmal, wenn ihre Haut verbrannt ist, werden Wir sie gegen eine andere Haut austauschen, damit sie die Strafe kosten. (Sure 4:56)',
        explanation: 'Der Vers impliziert, dass Schmerz hauptsächlich in der Haut empfunden wird, da die Haut erneuert wird, "damit sie die Strafe kosten". Die moderne Biologie hat gezeigt, dass die meisten Schmerzrezeptoren sich in der Haut befinden. Bei schweren Verbrennungen dritten Grades, bei denen die Haut zerstört ist, empfindet eine Person keinen Schmerz mehr in diesem Bereich.'
      },
      {
        title: 'Die Zyklen des Wassers',
        verse: 'Und Wir haben vom Himmel Wasser in einem bestimmten Maß herabgesandt und es in der Erde ruhen lassen. Und Wir sind wahrlich fähig, es wieder wegzunehmen. (Sure 23:18)',
        explanation: 'Der Vers beschreibt den Wasserkreislauf: Wasser kommt vom Himmel (Niederschlag), wird in der Erde gespeichert (Grundwasser) und Allah hat die Macht, es wieder zu entfernen (Verdunstung, Austrocknung). Dies ist eine einfache, aber genaue Darstellung des Wasserkreislaufs, der erst im 16. und 17. Jahrhundert wissenschaftlich formuliert wurde.'
      }
    ]
  },
  en: {
    title: 'Scientific Miracles in the Quran',
    description: 'An examination of verses that point to scientific facts discovered centuries after the revelation.',
    backToFeatures: "Back to Features",
    miracles: [
      {
        title: 'The Origin of the Universe (Big Bang)',
        verse: 'Have not those who disbelieve seen that the heavens and the earth were a jointed entity, and We separated them and made from water every living thing? Then will they not believe? (Surah 21:30)',
        explanation: 'This verse describes an extraordinary agreement with the Big Bang theory, which states that the universe originated from a single, extremely dense and hot point and has been expanding ever since. The description of the heavens and earth as "a jointed entity" (ratqan) which was then "separated" (fataqna) reflects the modern cosmological model.'
      },
      {
        title: 'The Expansion of the Universe',
        verse: 'And the heaven We constructed with strength, and indeed, We are [its] expander. (Surah 51:47)',
        explanation: 'The Arabic word "musi\'un" is interpreted by scholars as "expanding" or "to expand." This is a direct reference to the expansion of the universe, a discovery made only in the 20th century by Edwin Hubble. The fact that the Quran mentioned this 1400 years ago is remarkable.'
      },
      {
        title: 'Embryonic Development',
        verse: 'Then We made the sperm-drop into a clinging clot (Alaqa), and We made the clot into a lump of flesh (Mudghah), and We made from the lump, bones, and We covered the bones with flesh. (Surah 23:14)',
        explanation: 'The stages of human embryonic development described in the Quran—"Alaqa" (something that clings, like a leech), "Mudghah" (something chewed)—are astonishingly accurate and correspond to modern scientific findings. Especially the sequence—first the formation of bones, then covering them with muscle and flesh—was only confirmed by modern embryology.'
      },
      {
        title: 'The Function of Mountains',
        verse: 'Have We not made the earth a resting place? And the mountains as stakes? (Surah 78:6-7)',
        explanation: 'The Quran describes mountains as "stakes" (awtadan), which suggests a deep anchoring in the earth. Modern geology has confirmed the principle of isostasy, according to which mountains have deep "roots" that extend into the Earth\'s mantle and stabilize the Earth\'s crust, much like tent stakes stabilize a tent.'
      },
      {
        title: 'The Barrier Between Two Seas',
        verse: 'He released the two seas, meeting [side by side]. Between them is a barrier which they do not transgress. (Surah 55:19-20)',
        explanation: 'This phenomenon, known as a halocline, has been observed by modern oceanographers in places like the Strait of Gibraltar, where the saltier Mediterranean Sea meets the less salty Atlantic Ocean. Due to different densities, temperatures, and salinities, the two bodies of water do not mix immediately and form a visible dividing line or "barrier".'
      },
      {
        title: 'The Uniqueness of Fingerprints',
        verse: 'Does man think that We will not assemble his bones? Yes. [We are] Able (to put together) in perfect order the very tips of his fingers. (Surah 75:3-4)',
        explanation: 'The Quran points out that on the Day of Resurrection, Allah can recreate even the smallest details like fingertips. This highlights the uniqueness of each individual. Dactyloscopy (fingerprint identification), developed only in the 19th century, confirmed that every human\'s fingerprints are absolutely unique.'
      },
      {
        title: 'The Sun\'s Orbit',
        verse: 'And it is He who created the night and the day and the sun and the moon; all [in an orbit] are swimming. (Surah 21:33)',
        explanation: 'The verse states that the sun and moon each travel in their own orbit (falak). This contradicts the ancient idea of a stationary Earth. Today we know that the moon orbits the Earth, and the sun travels in its own path within the Milky Way galaxy.'
      },
      {
        title: 'The Protective Atmosphere',
        verse: 'And We made the sky a protected ceiling, but they, from its signs, are turning away. (Surah 21:32)',
        explanation: 'The Earth\'s atmosphere acts as a protective ceiling, shielding life from lethal solar radiation, meteorites, and the extreme temperatures of space. This verse aptly describes the protective function of the atmosphere, a scientific fact unknown in antiquity.'
      },
      {
        title: 'Internal Waves in Deep Oceans',
        verse: 'Or [the state of a disbeliever] is like darknesses within a vast deep sea which is covered by waves, upon which are waves, over which are clouds - darknesses, one above another. (Surah 24:40)',
        explanation: 'This verse describes not only the darkness in the depths of the ocean but also the presence of internal waves below the surface waves. This phenomenon was only discovered with modern submarines and satellites. These internal waves occur at the boundaries of water layers with different densities and are invisible to the human eye.'
      },
      {
        title: 'The Forebrain and its Function',
        verse: 'No! If he does not desist, We will surely drag him by the forelock - A lying, sinning forelock. (Surah 96:15-16)',
        explanation: 'The Quran identifies the front of the head, the forelock (Nasiyah), as the site of lying and sinning. Modern neuroscience has confirmed that the prefrontal cortex, located right behind the forehead, is responsible for planning, decision-making, and deliberate lying.'
      },
      {
        title: 'The Origin of Iron',
        verse: '...And We sent down iron, wherein is great military might and benefits for the people... (Surah 57:25)',
        explanation: 'The verse states that iron was "sent down." Astrophysics has shown that iron cannot be formed on Earth, as the required temperatures exceed that of the sun. Iron is forged in the cores of massive stars and distributed throughout the universe via supernova explosions. Thus, iron on Earth indeed originates from space and was "sent down".'
      },
      {
        title: 'Wind as a Pollinator',
        verse: 'And We have sent the fertilizing winds... (Surah 15:22)',
        explanation: 'The verse describes winds as "fertilizing" (lawāqiḥ). This is an accurate description of the process of anemophily (wind pollination), where pollen is carried from one plant to another, which is essential for the reproduction of many plant species. This biological function of wind was only fully understood in modern times.'
      },
      {
        title: 'The Stages of Rain Formation',
        verse: 'Do you not see that Allah drives clouds? Then He brings them together, then He makes them into a mass, and you see the rain emerge from within it. (Surah 24:43)',
        explanation: 'This verse describes the process of cloud and rain formation in three precise steps: 1. Clouds are driven by the wind. 2. They are joined together (coalescence). 3. They are heaped up, causing the rain to fall. This corresponds exactly to modern meteorological findings on the formation of cumulonimbus clouds and rain.'
      },
      {
        title: 'The Role of Male Sperm in Sex Determination',
        verse: 'And that He creates the two mates, the male and the female, from a sperm-drop when it is emitted. (Surah 53:45-46)',
        explanation: 'The Quran specifies that the sex of the child is determined by the "sperm-drop" (nutfa), i.e., from the male. Modern genetics confirms that the female provides only the X chromosome, while the male provides either an X (female) or a Y (male) chromosome, thus determining the sex.'
      },
      {
        title: 'The Formation of Milk',
        verse: 'And indeed, for you in grazing livestock is a lesson. We give you drink from what is in their bellies - between excretion and blood - pure milk, palatable to drinkers. (Surah 16:66)',
        explanation: 'This verse describes milk as originating from a conjunction "between excretion and blood." This is a remarkably accurate description of the physiological process. Nutrients from digestion (from the area of excretion) are absorbed into the bloodstream and transported to the mammary glands, where they are converted into milk. This complex process was unknown at the time of revelation.'
      },
      {
        title: 'The Skin as the Organ of Pain',
        verse: 'Indeed, those who disbelieve in Our verses - We will drive them into a Fire. Every time their skins are roasted through We will replace them with other skins so they may taste the punishment. (Surah 4:56)',
        explanation: 'The verse implies that pain is primarily felt in the skin, as the skin is renewed "so they may taste the punishment." Modern biology has shown that the majority of pain receptors are located in the skin. In severe third-degree burns where the skin is destroyed, a person no longer feels pain in that area.'
      },
      {
        title: 'The Cycles of Water',
        verse: 'And We have sent down rain from the sky in a measured amount and settled it in the earth. And indeed, We are able to take it away. (Surah 23:18)',
        explanation: 'The verse describes the water cycle: water comes from the sky (precipitation), is stored in the earth (groundwater), and Allah has the power to take it away (evaporation, desiccation). This is a simple but accurate depiction of the water cycle, which was only scientifically formulated in the 16th and 17th centuries.'
      }
    ]
  }
};


export default function QuranMiraclesPage() {
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
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {c.miracles.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl text-left hover:no-underline">{item.title}</AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 px-4 space-y-4">
              <blockquote className="border-l-4 border-primary pl-4 italic">
                {item.verse}
              </blockquote>
              <p>{item.explanation}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
