
"use client";

// A simple client-side progress tracker using localStorage.

export interface LastReadProgress {
    quran?: {
        surah: number;
        surahName: string;
    };
    hadith?: {
        collection: string;
        hadithNumber: string;
    };
    hisnul_muslim?: {
        chapterId: number;
        chapterTitle: string;
    };
    // Can be extended for other features
}

const PROGRESS_KEY = 'nejat_progress';

export const getLastRead = (): LastReadProgress => {
    if (typeof window === 'undefined') {
        return {};
    }
    try {
        const savedProgress = localStorage.getItem(PROGRESS_KEY);
        return savedProgress ? JSON.parse(savedProgress) : {};
    } catch (error) {
        console.error("Error reading progress from localStorage:", error);
        return {};
    }
};

export const setLastRead = (
    type: keyof LastReadProgress, 
    data: LastReadProgress[keyof LastReadProgress]
) => {
     if (typeof window === 'undefined') {
        return;
    }
    try {
        const currentProgress = getLastRead();
        const newProgress = {
            ...currentProgress,
            [type]: data
        };
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    } catch (error) {
         console.error("Error saving progress to localStorage:", error);
    }
};
