
'use server'

export interface Hadith {
  id: number;
  hadithNumber: string;
  englishNarrator: string;
  hadithEnglish: string;
  hadithUrdu: string;
  hadithArabic: string;
  chapter: {
    chapterNumber: string;
    chapterEnglish: string;
    chapterUrdu: string;
    chapterArabic: string;
  };
  book: {
    bookName: string;
    writerName: string;
  };
}

export interface HadithApiResponse {
    hadiths: {
        data: Hadith[];
        next_page_url: string | null;
        prev_page_url: string | null;
        from: number;
        to: number;
        total: number;
    };
}

export async function getHadiths(page: number = 1): Promise<{ hadiths?: HadithApiResponse['hadiths'], error?: string }> {
    try {
        const apiKey = "$2y$10$CyPRMBPY6e9ijyeQ6pvZgT8wmb5ptObUWWDEoJhKbXRDXfkUwJW";
        
        const url = new URL('https://hadithapi.com/api/hadiths');
        url.searchParams.append('apiKey', apiKey);
        url.searchParams.append('page', page.toString());

        const response = await fetch(url.toString());

        if (!response.ok) {
            if (response.status === 401) {
                return { error: "The provided Hadith API key is invalid." };
            }
            const errorText = await response.text();
            return { error: `Failed to fetch Hadiths: ${response.status} ${errorText}` };
        }
        
        const data: HadithApiResponse = await response.json();
        return { hadiths: data.hadiths };

    } catch (err) {
        if (err instanceof Error) {
            return { error: err.message };
        }
        return { error: 'An unknown error occurred while fetching hadiths.' };
    }
}
