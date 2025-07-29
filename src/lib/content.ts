
'use client';

// In a real application, this data would be fetched from a CMS or Firestore.
// This structure is prepared for that.

interface Section {
    key: string;
    title: string;
    content: string;
    image?: string;
    hint?: string;
}

interface LanguageContent {
    title: string;
    description: string;
    sections: Section[];
}

interface PageContent {
    de: LanguageContent;
    en: LanguageContent;
}

const pageContent: Record<string, PageContent> = {
    'islamic-art': {
        de: {
            title: "Islamische Kunst",
            description: "Entdecke die Schönheit und Vielfalt islamischer Kunstformen, die von einem tiefen Glauben und einer reichen Geschichte geprägt sind.",
            sections: [
                 {
                    key: 'calligraphy',
                    title: "Kalligrafie: Die Kunst der schönen Schrift",
                    content: "Die Kalligrafie ist die am höchsten geschätzte Kunstform im Islam. Sie dient der kunstvollen Darstellung des Wortes Allahs aus dem Koran. Stile wie Kufi, Naskh und Thuluth schmücken Moscheen, Manuskripte und Alltagsgegenstände und verwandeln Text in visuelle Poesie.",
                    image: "https://placehold.co/600x400.png",
                    hint: "islamic calligraphy",
                },
                {
                    key: 'geometry',
                    title: "Geometrische Muster (Arabeske)",
                    content: "Islamische Künstler schufen komplexe geometrische Muster, um die Unendlichkeit und die transzendente Natur Allahs darzustellen. Diese Muster, die auf mathematischen Prinzipien basieren, finden sich in Fliesenarbeiten, Holzschnitzereien und Metallarbeiten und symbolisieren die göttliche Ordnung im Universum.",
                    image: "https://placehold.co/600x400.png",
                    hint: "islamic pattern",
                },
                {
                    key: 'architecture',
                    title: "Architektur: Bauten für die Gemeinschaft",
                    content: "Die islamische Architektur, von den majestätischen Moscheen mit ihren Kuppeln und Minaretten bis hin zu prächtigen Palästen und Gärten, ist darauf ausgelegt, ein Gefühl der Ehrfurcht und Gemeinschaft zu schaffen. Merkmale wie der Innenhof (Sahn) und die Gebetsnische (Mihrab) sind zentral für das funktionale und spirituelle Design.",
                    image: "https://placehold.co/600x400.png",
                    hint: "islamic architecture",
                }
            ]
        },
        en: {
            title: "Islamic Art",
            description: "Discover the beauty and diversity of Islamic art forms, shaped by a deep faith and a rich history.",
            sections: [
                {
                    key: 'calligraphy',
                    title: "Calligraphy: The Art of Beautiful Writing",
                    content: "Calligraphy is the most highly regarded art form in Islam. It is used to artistically represent the word of Allah from the Quran. Styles like Kufi, Naskh, and Thuluth adorn mosques, manuscripts, and everyday objects, transforming text into visual poetry.",
                    image: "https://placehold.co/600x400.png",
                    hint: "islamic calligraphy",
                },
                {
                    key: 'geometry',
                    title: "Geometric Patterns (Arabesque)",
                    content: "Islamic artists created complex geometric patterns to represent the infinite and transcendent nature of Allah. These patterns, based on mathematical principles, are found in tilework, woodcarvings, and metalwork, symbolizing the divine order in the universe.",
                    image: "https://placehold.co/600x400.png",
                    hint: "islamic pattern",
                },
                {
                    key: 'architecture',
                    title: "Architecture: Buildings for the Community",
                    content: "Islamic architecture, from the majestic mosques with their domes and minarets to magnificent palaces and gardens, is designed to create a sense of awe and community. Features like the courtyard (Sahn) and the prayer niche (Mihrab) are central to the functional and spiritual design.",
                    image: "https://placehold.co/600x400.png",
                    hint: "islamic architecture",
                }
            ]
        }
    }
}


export const getPageContent = async (pageKey: string, language: 'de' | 'en'): Promise<LanguageContent | null> => {
    // Simulate async fetch
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // In the future, this would fetch from Firestore:
    // const docRef = doc(db, 'pageContent', pageKey);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   return docSnap.data()[language];
    // }
    
    // For now, return mock data
    return pageContent[pageKey]?.[language] || null;
}
