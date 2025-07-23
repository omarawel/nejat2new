import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const prophets = [
  { name: 'Adam (عليه السلام)', story: 'Der erste Mensch, von Allah erschaffen. Er lebte im Paradies, wurde aber nach dem Essen von der verbotenen Frucht auf die Erde geschickt.' },
  { name: 'Idris (عليه السلام) - Henoch', story: 'Bekannt für seine Weisheit und sein Wissen. Es wird gesagt, dass er in den Himmel aufgenommen wurde, ohne den Tod zu schmecken.' },
  { name: 'Nuh (عليه السلام) - Noah', story: 'Baute auf Allahs Befehl eine Arche, um die Gläubigen und Tierpaare vor der großen Flut zu retten.' },
  { name: 'Hud (عليه السلام)', story: 'Gesandt zum Volk der Aad, die trotz seiner Warnungen an ihrem Götzendienst festhielten und durch einen Sturm vernichtet wurden.' },
  { name: 'Salih (عليه السلام)', story: 'Gesandt zu den Thamud, die ein Kamel als Zeichen forderten, es aber verletzten und dafür bestraft wurden.' },
  { name: 'Ibrahim (عليه السلام) - Abraham', story: 'Zerstörte die Götzen seines Volkes und bewies seine unerschütterliche Hingabe, indem er bereit war, seinen Sohn zu opfern.' },
  { name: 'Lut (عليه السلام) - Lot', story: 'Warnte die Menschen von Sodom vor ihrem sündhaften Verhalten, doch nur er und seine Töchter wurden gerettet.' },
  { name: 'Ismail (عليه السلام) - Ismael', story: 'Der Sohn von Ibrahim, der bereit war, für Allah geopfert zu werden. Aus seiner Nachkommenschaft ging der Prophet Muhammad (ﷺ) hervor.' },
  { name: 'Ishaq (عليه السلام) - Isaak', story: 'Der zweite Sohn von Ibrahim und Vater von Yaqub. Ein wichtiger Prophet für die Kinder Israels.' },
  { name: 'Yaqub (عليه السلام) - Jakob', story: 'Auch bekannt als Israel. Vater der zwölf Stämme Israels und ein Vorbild an Geduld und Gottvertrauen.' },
  { name: 'Yusuf (عليه السلام) - Josef', story: 'Wurde von seinen Brüdern verkauft, stieg aber in Ägypten zu großer Macht auf und vergab ihnen schließlich.' },
  { name: 'Ayyub (عليه السلام) - Hiob', story: 'Verlor seinen Reichtum, seine Kinder und seine Gesundheit, blieb aber standhaft in seinem Glauben und wurde reich belohnt.' },
  { name: 'Shu\'ayb (عليه السلام)', story: 'Predigte den Midianitern über Ehrlichkeit im Handel, wurde aber von ihnen abgelehnt.' },
  { name: 'Musa (عليه السلام) - Moses', story: 'Führte die Israeliten aus der Sklaverei in Ägypten, empfing die Thora und sprach direkt mit Allah.' },
  { name: 'Harun (عليه السلام) - Aaron', story: 'Der Bruder von Musa, der ihn bei seiner Mission unterstützte und als Sprecher für ihn diente.' },
  { name: 'Dhul-Kifl (عليه السلام) - Ezechiel', story: 'Ein Prophet, der für seine Geduld und sein unerschütterliches Vertrauen in Allahs Versprechen bekannt war.' },
  { name: 'Dawud (عليه السلام) - David', story: 'Besiegte Goliath, wurde König von Israel und erhielt die Psalmen (Zabur) von Allah.' },
  { name: 'Sulayman (عليه السلام) - Salomo', story: 'Ein weiser König, der über Menschen, Dschinn und Tiere herrschte und den Tempel in Jerusalem erbaute.' },
  { name: 'Ilyas (عليه السلام) - Elias', story: 'Kämpfte gegen den Götzendienst von Baal und rief sein Volk zur Anbetung des einen wahren Gottes auf.' },
  { name: 'Al-Yasa (عليه السلام) - Elisa', story: 'Der Nachfolger von Ilyas, der mit vielen Wundern gesegnet war und die Lehren des Monotheismus fortsetzte.' },
  { name: 'Yunus (عليه السلام) - Jona', story: 'Verließ zornig sein Volk, wurde von einem Wal verschluckt und rief im Bauch des Fisches zu Allah, woraufhin er gerettet wurde.' },
  { name: 'Zakariyya (عليه السلام) - Zacharias', story: 'Betete im hohen Alter für einen Sohn und Allah schenkte ihm Yahya, obwohl seine Frau unfruchtbar war.' },
  { name: 'Yahya (عليه السلام) - Johannes der Täufer', story: 'Ein Prophet, der zu einem asketischen Leben aufrief und die Ankunft von Isa vorbereitete.' },
  { name: 'Isa (عليه السلام) - Jesus', story: 'Geboren von der Jungfrau Maryam, vollbrachte viele Wunder, erhielt das Evangelium (Indschil) und wurde von Allah in den Himmel gehoben.' },
  { name: 'Muhammad (ﷺ)', story: 'Der letzte Prophet, der den Koran empfing. Sein Leben und seine Lehren sind ein Leitfaden für die gesamte Menschheit.' },
];

export default function ProphetsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Die 25 Propheten im Koran</h1>
        <p className="text-muted-foreground mt-2 text-lg">Lerne die Gesandten Allahs und ihre Geschichten kennen.</p>
      </header>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {prophets.map((prophet, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl text-primary">{prophet.name}</AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 px-4">
              {prophet.story}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
