
'use client';

import { db } from './firebase';
import { doc, onSnapshot, setDoc, getDoc, Timestamp } from 'firebase/firestore';

export interface SocialLink {
    name: string;
    href: string;
    icon: string;
}

export interface FooterContent {
    de: {
        description: string;
        company: string;
        about: string;
        contact: string;
        support: string;
        legal: string;
        terms: string;
        privacy: string;
        imprint: string;
        followUs: string;
    },
    en: {
        description: string;
        company: string;
        about: string;
        contact: string;
        support: string;
        legal: string;
        terms: string;
        privacy: string;
        imprint: string;
        followUs: string;
    },
    socialLinks: SocialLink[];
    updatedAt?: Timestamp;
}

const FOOTER_DOC_PATH = 'siteContent/footer';

// Get real-time updates for footer content
export const getFooterContent = (callback: (content: FooterContent | null) => void) => {
    const docRef = doc(db, FOOTER_DOC_PATH);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data() as FooterContent);
        } else {
            // Return a default state if no content exists
            callback(null);
        }
    }, (error) => {
        console.error("Error fetching footer content:", error);
        callback(null);
    });

    return unsubscribe;
};

// Get footer content once
export const getFooterContentOnce = async (): Promise<FooterContent | null> => {
    const docRef = doc(db, FOOTER_DOC_PATH);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as FooterContent;
    }
    return null;
}

// Update or create footer content
export const updateFooterContent = (content: Partial<FooterContent>) => {
    const docRef = doc(db, FOOTER_DOC_PATH);
    return setDoc(docRef, {
        ...content,
        updatedAt: Timestamp.now()
    }, { merge: true });
};
