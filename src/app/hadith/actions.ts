
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
    hadiths: {
        data: Hadith[];
        total: number;
        next_page_url: string | null;
        prev_page_url: string | null;
        current_page: number;
    };
}


export async function getHadiths(page: number = 1, query: string = ''): Promise<{ hadiths?: HadithApiResponse['hadiths'], error?: string }> {
    try {
        const apiKey = "$2y$10$CyPRMBPY6e9ijyeQ6pvZgT8wmb5ptObUWWDEoJhKbXRDXfkUwJW";
        
        let url;
        if (query) {
            url = new URL(`https://hadithapi.com/api/search`);
            url.searchParams.append('query', query);
            url.searchParams.append('page', page.toString());
        } else {
            url = new URL('https://hadithapi.com/api/hadiths');
            url.searchParams.append('page', page.toString());
        }
        
        url.searchParams.append('apiKey', apiKey);

        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorText = await response.text();
            return { error: `Failed to fetch Hadiths: ${response.status} ${errorText}` };
        }
        
        const data = await response.json();

        if (query) {
            const searchData = data as HadithSearchApiResponse;
            // The search API returns a slightly different structure. We normalize it here.
            return {
                hadiths: {
                    data: searchData.hadiths.data,
                    next_page_url: searchData.hadiths.next_page_url,
                    prev_page_url: searchData.hadiths.prev_page_url,
                    from: (searchData.hadiths.current_page - 1) * 25 + 1, // 'from' is not in search response
                    to: (searchData.hadiths.current_page - 1) * 25 + searchData.hadiths.data.length, // 'to' is not in search response
                    total: searchData.hadiths.total
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
