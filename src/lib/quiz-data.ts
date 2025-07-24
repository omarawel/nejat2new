
import type { QuizQuestion } from '@/ai/flows/generate-quiz-types';

type StaticQuizData = {
    de: {
        prophets: QuizQuestion[];
        quran: QuizQuestion[];
        sahaba: QuizQuestion[];
    },
    en: {
        prophets: QuizQuestion[];
        quran: QuizQuestion[];
        sahaba: QuizQuestion[];
    }
}

export const staticQuizData: StaticQuizData = {
    de: {
        prophets: [
            {
                question: "Welcher Prophet ist als 'Khalilullah' (Freund Allahs) bekannt?",
                options: ["Musa (as)", "Isa (as)", "Ibrahim (as)", "Muhammad (saws)"],
                correctAnswer: "Ibrahim (as)"
            },
            {
                question: "Welcher Prophet konnte mit Tieren sprechen?",
                options: ["Dawud (as)", "Sulayman (as)", "Yusuf (as)", "Nuh (as)"],
                correctAnswer: "Sulayman (as)"
            },
            {
                question: "Welchem Propheten wurde das Wunder der Spaltung des Meeres gegeben?",
                options: ["Isa (as)", "Musa (as)", "Yunus (as)", "Hud (as)"],
                correctAnswer: "Musa (as)"
            }
        ],
        quran: [
            {
                question: "Wie viele Suren hat der Koran?",
                options: ["114", "100", "124", "99"],
                correctAnswer: "114"
            },
            {
                question: "Welche Sure ist als 'Herz des Korans' bekannt?",
                options: ["Al-Fatiha", "Al-Baqarah", "Yasin", "Al-Ikhlas"],
                correctAnswer: "Yasin"
            },
            {
                question: "In welchem Monat begann die Offenbarung des Korans?",
                options: ["Rajab", "Shawwal", "Dhul-Hijjah", "Ramadan"],
                correctAnswer: "Ramadan"
            }
        ],
        sahaba: [
            {
                question: "Wer war der erste Kalif nach dem Tod des Propheten Muhammad (saws)?",
                options: ["Umar ibn al-Khattab (ra)", "Ali ibn Abi Talib (ra)", "Abu Bakr as-Siddiq (ra)", "Uthman ibn Affan (ra)"],
                correctAnswer: "Abu Bakr as-Siddiq (ra)"
            },
            {
                question: "Welcher Gefährte war als 'Schwert Allahs' bekannt?",
                options: ["Hamza ibn Abd al-Muttalib (ra)", "Khalid ibn al-Walid (ra)", "Zubayr ibn al-Awwam (ra)", "Sa'd ibn Abi Waqqas (ra)"],
                correctAnswer: "Khalid ibn al-Walid (ra)"
            },
            {
                question: "Welche Gefährtin war die erste Ehefrau des Propheten (saws)?",
                options: ["Aisha (ra)", "Hafsa (ra)", "Sawda (ra)", "Khadijah (ra)"],
                correctAnswer: "Khadijah (ra)"
            }
        ]
    },
    en: {
         prophets: [
            {
                question: "Which prophet is known as 'Khalilullah' (Friend of Allah)?",
                options: ["Musa (as)", "Isa (as)", "Ibrahim (as)", "Muhammad (saws)"],
                correctAnswer: "Ibrahim (as)"
            },
            {
                question: "Which prophet could speak to animals?",
                options: ["Dawud (as)", "Sulayman (as)", "Yusuf (as)", "Nuh (as)"],
                correctAnswer: "Sulayman (as)"
            },
            {
                question: "To which prophet was the miracle of splitting the sea given?",
                options: ["Isa (as)", "Musa (as)", "Yunus (as)", "Hud (as)"],
                correctAnswer: "Musa (as)"
            }
        ],
        quran: [
            {
                question: "How many Surahs are there in the Quran?",
                options: ["114", "100", "124", "99"],
                correctAnswer: "114"
            },
            {
                question: "Which Surah is known as the 'Heart of the Quran'?",
                options: ["Al-Fatiha", "Al-Baqarah", "Yasin", "Al-Ikhlas"],
                correctAnswer: "Yasin"
            },
            {
                question: "In which month did the revelation of the Quran begin?",
                options: ["Rajab", "Shawwal", "Dhul-Hijjah", "Ramadan"],
                correctAnswer: "Ramadan"
            }
        ],
        sahaba: [
            {
                question: "Who was the first Caliph after the death of Prophet Muhammad (saws)?",
                options: ["Umar ibn al-Khattab (ra)", "Ali ibn Abi Talib (ra)", "Abu Bakr as-Siddiq (ra)", "Uthman ibn Affan (ra)"],
                correctAnswer: "Abu Bakr as-Siddiq (ra)"
            },
            {
                question: "Which companion was known as the 'Sword of Allah'?",
                options: ["Hamza ibn Abd al-Muttalib (ra)", "Khalid ibn al-Walid (ra)", "Zubayr ibn al-Awwam (ra)", "Sa'd ibn Abi Waqqas (ra)"],
                correctAnswer: "Khalid ibn al-Walid (ra)"
            },
            {
                question: "Which female companion was the first wife of the Prophet (saws)?",
                options: ["Aisha (ra)", "Hafsa (ra)", "Sawda (ra)", "Khadijah (ra)"],
                correctAnswer: "Khadijah (ra)"
            }
        ]
    }
}
