
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

export interface HadithSearchApiResponse {
    hadiths: Hadith[];
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    from: number;
    to: number;
}


export async function getHadiths(page: number = 1, query: string = ''): Promise<{ hadiths?: HadithApiResponse['hadiths'], error?: string }> {
    try {
        const apiKey = "$2y$10$CyPRMBPY6e9ijyeQ6pvZgT8wmb5ptObUWWDEoJhKbXRDXfkUwJW";
        
        let url;
        if (query) {
            url = new URL(`https://hadithapi.com/api/hadiths/search`);
            url.searchParams.append('query', query);
        } else {
            url = new URL('https://hadithapi.com/api/hadiths');
        }
        
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
        
        const data = await response.json();

        // The API returns different structures for general fetch and search
        if (query) {
            const searchData = data as HadithSearchApiResponse;
            return {
                hadiths: {
                    data: searchData.hadiths,
                    next_page_url: searchData.next_page_url,
                    prev_page_url: searchData.prev_page_url,
                    from: searchData.from,
                    to: searchData.to,
                    total: searchData.total
                }
            };
        } else {
            const listData = data as HadithApiResponse;
            return { hadiths: listData.hadiths };
        }


    } catch (err) {
        if (err instanceof Error) {
            return { error: err.message };
        }
        return { error: 'An unknown error occurred while fetching hadiths.' };
    }
}
