import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const prophets = [
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
