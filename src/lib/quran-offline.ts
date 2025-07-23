import { get, set, del, keys } from 'idb-keyval';

const SURAH_LIST_KEY = 'quran_surah_list';
const getSurahKey = (surahNumber: number) => `quran_surah_${surahNumber}`;
const getEditionKey = (surahNumber: number, edition: string) => `quran_surah_${surahNumber}_${edition}`;


// --- Surah List ---
export const storeSurahList = (surahs: any[]) => {
    return set(SURAH_LIST_KEY, surahs);
}

export const getSurahList = () => {
    return get(SURAH_LIST_KEY);
}

// --- Individual Surah Editions ---
export const storeSurahEdition = (surahNumber: number, editionIdentifier: string, data: any) => {
    return set(getEditionKey(surahNumber, editionIdentifier), data);
}

export const getSurahEdition = (surahNumber: number, editionIdentifier: string) => {
    return get(getEditionKey(surahNumber, editionIdentifier));
}

export const getSurahWithEditions = async (surahNumber: number, editions: string[]) => {
    const results = await Promise.all(
        editions.map(id => getSurahEdition(surahNumber, id))
    );
    
    // If any of the required editions are missing, return null
    if (results.some(r => !r)) {
        return null;
    }

    return results;
}

// --- Check and Clear ---
export const isQuranDownloaded = async () => {
    const surahList = await getSurahList();
    if (!surahList || surahList.length !== 114) {
        return false;
    }
    // Check if the first and last surah are downloaded as a proxy for the whole quran
    const firstSurah = await getSurahWithEditions(1, ['quran-uthmani', 'en.sahih', 'de.aburida', 'en.transliteration']);
    const lastSurah = await getSurahWithEditions(114, ['quran-uthmani', 'en.sahih', 'de.aburida', 'en.transliteration']);

    return !!firstSurah && !!lastSurah;
}


export const clearOfflineQuranData = async () => {
    const allKeys = await keys();
    const quranKeys = allKeys.filter(key => typeof key === 'string' && key.startsWith('quran_'));
    await Promise.all(quranKeys.map(key => del(key)));
}